---
title: How to profile a query in MySQL
date: "2006-10-12"
url: /blog/2006/10/12/how-to-profile-a-query-in-mysql/
categories:
  - Databases
---
When people discuss query optimization on MySQL, or say a query doesn't perform well, they usually mention execution time. Execution time is important, but it's not the only metric to use (or even the best). There are many other ways to measure the work a query requires. This article explains how to really profile a query -- what to measure, how to do it as accurately as possible, and what it means.

> Note: I wrote this article in 2006, when I didn't have a clear understanding
> of even simple concepts such as *what performance really is*. Since then I
> have learned a lot from wise people such as Cary Millsap. In 2012 I founded
> [VividCortex, the best database performance optimization and database monitoring platform](https://vividcortex.com/)
> to chase away the kind of ignorance I display in the article below. Enjoy this
> trip down memory lane.

This is the first article in a series. In upcoming articles I'll demonstrate some hands-on profiling with concrete examples, and give you a tool to automate the job.

### Why profile queries?

Why should you profile your queries? After all, if it only takes a hundredth of a second, isn't that good enough? Even if you could make it twice as fast, do you care about such a small amount of time?

Absolutely, unless you only run that query once in a while. Your queries will probably follow the 90/10 rule. 90% of your work will be caused by 10% of the queries. You need to optimize whatever causes most of the work, and in my experience, it's often sub-millisecond queries being run thousands or millions of times. Optimize queries that are expensive because they run all the time, *and* those that are expensive because they cause a lot of work. You can't just do one and really reduce the overall load on your server.

Here's an example from my work: We currently have many [archiving and purging jobs][1] running nightly, pruning tables with thousands or millions of tiny queries. I recently profiled one job's query and found it was using indexes badly. I rewrote the query, and instead of taking dozens of seconds per thousand rows, it now takes one or two, plus it causes a lot less disk activity. Each individual query, according to the `mysql` command-line client, takes 0.00 seconds before and after optimization -- so if I didn't profile that query, I wouldn't have an effective way to optimize it, except watching it run for a while (which, by the way, does not count as profiling).

You need to profile your queries so you know how they really perform.

### Tool 1: `EXPLAIN`

MySQL provides two main tools for understanding query performance: [`EXPLAIN`][2] and [`SHOW STATUS`][3]. Most MySQL developers know about `EXPLAIN`, and with some experience and lots of reading in the MySQL manual, you can learn a truly surprising amount about a query with `EXPLAIN`.

If you're new to MySQL but have experience with another system such as Microsoft SQL Server, you may think `EXPLAIN` doesn't tell you much, but reserve your judgement for a while. As you learn more about MySQL, you may change your mind. I did, though it took me a long time. There's a lot to know.

`EXPLAIN` shows the *estimated execution plan* of a `SELECT` query. It explains how indexes will be used, in what order a join is performed, estimated number of rows accessed, and so forth. Together with execution time, this is a good first approximation to a query's performance. There are some limitations, though.

The biggest problem is that you can only use it with `SELECT` queries. It is possible, if you really know what you're doing, to rewrite some non-`SELECT` queries so `EXPLAIN` can approximate what rows might be accessed. For example, you might rewrite an `UPDATE` as a `SELECT`, but you have to really understand how the query is going to use indexes, what columns it needs to access, and so forth (this is non-trivial, and depends on lots of factors, like the storage engine). Then you'll have a rough guess at how the server might *find* the rows it wants to update, but finding rows to update is not the same thing as updating them. Updates may cause all sorts of work -- page splits, row re-ordering, index re-balancing, and so on. So, though `EXPLAIN` can give an idea of how a non-`SELECT` query might work, it's quite crude.

The next limitation is that you're only getting an estimate. This is based on MySQL's index statistics and whatever else it can learn about the query and tables at query compile and optimization time. This can be very far from the reality it discovers at run time. Index statistics can be out of date, or based on unevenly distributed entries. And the query may find things out at run time and decide to take a different strategy. A good example of this is a join with a range check.

### Tool 2: `SHOW STATUS`

The other tool at your disposal is [`SHOW STATUS`][3], which displays MySQL's internal counters. MySQL increments these as it executes each query. For instance, every time the query handler advances from one entry to the next in an index, it increments a counter. One thing you can use these counters for is to get a sense of what types of operations your server does in aggregate (see the excellent [mysqlreport][4] tool for help with this). Another use is to figure out how much work an individual query did. If you run `SHOW STATUS`, execute a query, and run `SHOW STATUS` again you can see how much the counters have incremented, and thus how much work the query did.

`SHOW STATUS` is after-the-fact. It is not estimated, as `EXPLAIN` is. The numbers really reflect the work the server has done. For this reason, it can tell you much more about your query's performance than `EXPLAIN`. You can also see how non-`SELECT` queries perform. Knowing how to interpret these results is what separates power users from novices.

Since it's the least discussed and understood, I'll devote the rest of this article to the fine art of measuring and interpreting `SHOW STATUS`.

### What to measure

The [MySQL manual's section on server status variables][5] explains all the various status variables. Many of them are version-dependent, but the following important ones are related to the work a query really did. I'll explain them below:

*   Bytes_received
*   Bytes_sent
*   Created\_tmp\_disk_tables
*   Created\_tmp\_files
*   Created\_tmp\_tables
*   Handler_
*   Innodb_
*   Key\_read\_requests
*   Key_reads
*   Key\_write\_requests
*   Key_writes
*   Last\_query\_cost
*   Select_
*   Sort_
*   Table\_locks\_immediate
*   Table\_locks\_waited

Some of these are pretty self-explanatory, and others are covered well in the manual, but here's a quick overview of the less-obvious ones. The `Handler_` variables track what the MySQL server does internally. For instance, every time MySQL reads the first row in an index, it increments `Handler_read_first`; this usually indicates it is doing something like beginning an index scan, or satisfying a `MIN()` query. You can get a good idea of what the query really did by watching these variables. In particular, you should try to get the `Handler_read` statistics as low as possible (some kinds of reads are more desirable than others, and you should prefer those).

The InnoDB storage engine tracks a lot of counters for its own internals, which are sometimes redundant to the `Handler_` counters. There are too many, and InnoDB is too specialized, to cover adequately here.

The `Key_read` and `Key_write` variables give additional information about key usage. The `Last_query_cost` variable reports how expensive MySQL's query optimizer considered the last query to be. It's only available in new versions of MySQL.

The `Select_` counters get incremented every time a different type of `SELECT` operation happens. You can use these counters to determine if there is a table scan (`Select_scan`), a join that scanned a range of an index, and so forth. These are not per-row variables, in contrast to the `Handler_` variables -- they record a single event. If you write a many-row table scan, you'll see `Handler_read_next` or `Handler_read_rnd_next` incremented a lot, but `Select_scan` will only get incremented by one, because it was only a single query.

On the other hand, the `Sort_` variables are a mixed bag. `Sort_merge_passes` is related to the merge-sort algorithm, and may get incremented multiple times per query. `Sort_range` and `Sort_scan` increment once per query if the results were sorted by a range or a scan. `Sort_rows` is the number of sorted rows. Side note: here is an excellent article on [how to understand the `Select_` and `Sort_` variables][6].

Finally, the `Table_locks` variables show how many table locks have been acquired, and how many were granted immediately without a wait.

That's just a quick overview of the variables! There is certainly a lot to know about them. However, if you group them together logically, as I'm about to do, you can use them to answer questions about your query's performance.

### How to measure accurately

Before I discuss how to measure and analyze these variables, I need to go over some complexities. It gets a little ugly, but you need to know this, or you won't get anything useful.

The first thing to know is many of these variables are global. That means if there are other things working on the server at the same time as you run your server, you will have no means of distinguishing the work your query did from the work the other queries did. In new versions of MySQL, some of the variables have a default session scope. That means these variables are private to your connection, not affected by anything else on the server. That actually makes things *more* complicated, not less, because now you have to know which things are global and which aren't.

Regardless of your version, by far the easiest way to get un-polluted numbers is to run your queries on a completely quiet server, with only one connection: yours. Unfortunately, this means you can't test your query under load, so you won't get to see any effects of concurrency (waiting for table locks, for example). With new versions of MySQL you can "sort of" do this with session variables, but again not all variables have session scope. What you really ought to do is run your query on a quiet server, and then run it on a busy server and see what the differences are.

Even running `SHOW STATUS` causes the server to do some work, so if you really want to know how much work your query did, you have to figure out how much work `SHOW STATUS` causes, and subtract that from the work your query did.

You should also [turn off the query cache][7] if you have it enabled, so you don't get any cache hits or inserts. You can do this either by setting your session query cache type (`SET SESSION query_cache_type = OFF;`), or using `SQL_NO_CACHE` in any `SELECT` queries. Finally, if you intend to get an accurate view of how much I/O your query really needs, you should either make sure your server is "warmed up" by running the query to fetch everything into memory, or make sure you are "starting cold" by flushing everything to disk with [`FLUSH TABLES`][8].

### The technique

It's time to bring everything I've discussed together. When I profile a query, I do the following:

1.  Run the query a few times to "warm up" the server.
2.  Run `SHOW STATUS` and save the result.
3.  Run the query.
4.  Run `SHOW STATUS` again and get the differences from the first time I ran it.
5.  Optionally, if I'm on a quiet server, I subtract the work `SHOW STATUS` itself causes (don't do this on a busy server; you'll just add insult to injury). I run `SHOW STATUS` twice and subtract each variable to get a baseline, then subtract this amount from the results I got above.

At this point, the numbers are the best I know how to get. Let's look at how to analyze them.

### How to analyze the results

As I've shown you, there are a lot of different numbers to consider. I would break the results down into logical sections as follows:

1.  Overall
2.  Table, index, and sorting
3.  Row-level operations
4.  I/O operations
5.  InnoDB operations, if applicable

First, two important overall measurements are the query's time and if available, `Last_query_cost`. These two numbers can give you a high-level view of a query performance.

Next, look at how the query affected tables, indexes, files and sorting. To start with, look at the `Select_` variables to see how many table and index scans you had, and how many range scans and joins with or without checks. The `Sort_` variables tell you more about sorting. You're striving for as few table and index scans as possible, and it's best to sort as few rows as possible. By the way, you should also examine `EXPLAIN` to see what kind of sorting is used (for example, index sorts may be better than filesorts).

Row operation statistics come from the `Handler_` variables. You can see not only reads, but writes as well. Sometimes you'll see a lot of `Handler_write` events even in a plain `SELECT` query. This happens while the handler generates the result set -- it doesn't necessarily mean rows in your base tables got updated. `GROUP BY` queries that have to accumulate a result set are a typical scenario. Temporary tables are another, and sometimes results are materialized as intermediate temporary tables. Subqueries in the `FROM` clause are an example.

The fewer writes, the better -- unless those writes enable many fewer reads. For example, materializing an intermediate temporary table and writing to it can save a lot of reads in grouped queries. If you rewrite a correlated, grouped subquery as a grouped subquery in the `FROM` clause, you only have to do the `GROUP BY` against the base table once, as opposed to the correlated subquery, which will probe into the base table once for every row in the outer table. In that case, the writes to the temporary table are a good trade-off. But don't take my word for it, profile some queries and see!

I/O operations include the `Key_` and `Created_` variables, which tell you how much index, temp table, and temp file I/O happened. This is where you'll see the temporary tables I just mentioned. Temp files may be the result of filesort operations. `Key_read_requests` and `Key_write_requests` tell you how many times the server asked to read or write a key block from or to the key cache. `Key_reads` and `Key_writes` tell you how often the operation had to go to disk (i.e. fetching more data from and index, or flushing an index write to disk). If you are using indexes well, it is normal to see high request values here. If your server is configured well, it is normal for virtually 100% of key read requests to be satisfied from the cache, and not have to go to disk. Even if the server isn't configured well, each key read request should bring a block of the index into memory, which can be used to satisfy some subsequent number of read requests, so if you are seeing much less than 100% key cache hit, something is very wrong.

The InnoDB operations are much more complicated than I want to cover in this article, but some of them are pretty easy to understand. For example, `Innodb_rows_deleted` is basically the InnoDB equivalent of `Handler_delete`. You only care about these variables if you're using InnoDB, and if you're optimizing queries for InnoDB, you should prepare to study the manual, for with great power comes great responsibility -- InnoDB is pretty complex, and it will take some work to understand how it executes queries. There are 43 `Innodb_` variables alone in MySQL 5.0.21.

### What a pain!

That's a lot of manual work, isn't it? Why hasn't anyone written a tool to do this automatically? Well, if you've been reading my blog for a while, you already know what I'm about to say: I *have* written such a tool. I'm putting the finishing touches on it, but I think you'll like how it does all this work for you, and formats the results in a way you can use instantly. I'll release it in a few days.

### Conclusion

That's a basic overview, but it's all I can offer in this article. You could easily write a small book on the subject. If you're new to profiling queries, I would suggest you just spend some time doing it. Take queries that you've optimized for speed in the past, and re-evaluate them by measuring the status variables, so you can see what kinds of improvements really caused the speed increases. You need to become familiar with typical numbers, which metrics matter for your queries, and so forth. I can't be much more specific without writing that book, because your server, your application, your data, and your queries are so unique.

Regardless of how much homework you have left to do, I hope this article has given you some insight into the level of detailed statistics available to you. Don't limit yourself to `EXPLAIN` and centi-second-granularity execution times in the `mysql` command-line client. That's only the tip of the iceberg.

If you have any comments, please leave them below. I'm especially interested in learning what you know about query optimization and profiling, as I am myself only a self-taught beginner! And if you'd like to stay current with my upcoming articles, especially the upcoming release of the MySQL query profiler I promised, please [subscribe via e-mail or feeds][9].

**Update** Peter has a very good article, which demonstrates some real profiling measurements, on [optimizing loose index scans with `UNION`][10]. Well worth a read.

 [1]: http://www.xaprb.com/blog/2006/05/02/how-to-write-efficient-archiving-and-purging-jobs-in-sql/
 [2]: http://dev.mysql.com/doc/refman/5.0/en/explain.html
 [3]: http://dev.mysql.com/doc/refman/5.0/en/show-status.html
 [4]: http://hackmysql.com/mysqlreport/
 [5]: http://dev.mysql.com/doc/refman/5.0/en/server-status-variables.html
 [6]: http://www.hackmysql.com/selectandsort
 [7]: http://dev.mysql.com/doc/refman/5.0/en/query-cache-configuration.html
 [8]: http://dev.mysql.com/doc/refman/5.0/en/flush.html
 [9]: http://www.xaprb.com/index.xml
 [10]: http://www.mysqlperformanceblog.com/2006/08/14/mysql-followup-on-union-for-query-optimization-query-profiling/
