---
title: How to write efficient archiving and purging jobs in SQL
date: "2006-05-02"
permalink: /blog/2006/05/02/how-to-write-efficient-archiving-and-purging-jobs-in-sql/
categories:
  - Databases
---
Sometimes it's a terrible idea to do set-based operations in SQL. There are real-world constraints, especially in heavily used OLTP or large databases, that require doing things a tiny bit at a time. In this article I'll show you how to write a job that can purge data from a huge table without impacting critical processes, filling up the transaction log, or causing deadlocks.

I have released a tool that does a fantastic job of archiving and purging MySQL tables, as part of [MySQL Toolkit][1]. If you're using MySQL, you should take a look at it. Not only can it automatically design efficient queries, it handles a lot of tricky edge cases and allows plugins too.

### Motivation

Mission-critical database servers can't be taken offline for maintenance tasks such as purging or archiving historical data, yet high-volume OLTP databases need to be small to stay responsive, which creates the need for purging or archiving. The requirements of OLTP and purging processes are quite different. OLTP processes must have immediate access to the database, with nothing else getting long-standing locks that could cause waits, timeouts or deadlocks. Purging is necessary to keep the server fast, but if something else is in the way, the purge processes should yield -- and once a purge process gets access to the data, it should not hold a lock for long.

At my current and previous employers, we've used similar tactics to purge and archive old data without detrimentally impacting the database server. In my current job, we have a set of very large, heavily-used tables that have never been purged or archived until recently. At my previous employer, purge and archive jobs were standard procedure, and moved data steadily off the OLTP servers to analysis servers.

### First try: failure

When I started work at my current job, nothing was failing, but queries were too slow. One person was already attempting to solve the problem by archiving off all but the most recent data to another database, in MyISAM tables for better performance. The procedure was to dump a table to a file and load it into a MyISAM table in another database, using `LOAD DATA INFILE` because it's very fast. But loading 6 gigabytes into a table is slow no matter what. It took several hours -- I don't know exactly how long -- to load with the indexes disabled. Then came the disaster: enabling the indexes. It never completed, so several days later we killed the query, which completely corrupted the table. We had no idea how long it would have taken, either. We might have been two seconds or two weeks away from success.

The problem is, that wouldn't have helped much anyway. We still needed to delete the unwanted data from the original table. That in itself would take a very long time. We decided to try the approach that worked well at my former employer.

### In my previous life&#8230;

At my former employer, an all-Microsoft shop, expert DBAs had developed a strategy that worked well for archiving and purging data from Microsoft SQL Server in a variety of situations. The approach was to scan the clustered index linearly through the table, archiving one (or sometimes a few) rows at a time. The jobs I wrote, which were patterned after other jobs and guided by the DBAs, were stored procedures that looked something like this:

<pre>create procedure archive_table as
declare @id int
-- Find the minimum value that satisfies the archive condition
select @id = min(id) from table where [conditions]
while @id is not null
begin
    begin transaction
    insert into archive_table
        select * from table where id = @id
    delete from table where id = @id
    commit transaction
    -- Find the next greater minimum value
    select min(id) from table where id &gt; @id and [conditions]
end</pre>

The important points to notice are:

1.  The initial find-min-value query is a table scan along the clustered index. As soon as it finds one row that satisfies the conditions, it's done scanning.
2.  The get-next-row query is not a full table scan -- or should not be, anyway (always check the query plan!). There are two parts to the `WHERE` clause. One of them should be useful for seeking *into the clustered index*. The other should be the archive conditions. This query should be a clustered index seek, then a scan over a certain range of the clustered index.
3.  The get-next-row query is the really important one to optimize.
4.  The actual changes to the database are very small -- usually just one row at a time, but sometimes a few, depending on the data.

Note: I'll use the terms "scan" and "seek" very specifically in this article. Scanning is reading through rows, trying to find one that satisfies a condition. Seeking is using the index to navigate quickly to a desired row.

We found these archive jobs worked well even when the rows being archived were in the middle of the table. This is because of the seek-first-then-scan query plan. The jobs took a while to run, but they had almost zero impact on the system, even if they ran for hours or even days, or if many jobs were running at the same time.

### Applying these principles to MySQL

With this background in mind, I wrote a Perl script that emulates these stored procedures from my past employer. The script goes through pretty much the same steps as above, with the additional step of printing the rows to a file as they are moved or deleted. Since I wrote it for work, of course I can't post it here, but it's pretty simple, so I'm sure you can write your own if you want. Most of the time I spent on the script was analyzing MySQL's behavior to see if it is similar to SQL Server's, and that part I consider very appropriate and valuable to share here.

I wanted to answer several questions. Will MySQL use the clustered index to seek before scanning? Will one-at-a-time delete transactions be cheap and fast, and avoid blocking or other contention among queries?

To answer the first question, I wrote my get-next-row query's `WHERE` clause to find only every tenth row in the table, based on a non-indexed column. That meant it would delete a row, skip nine rows, delete a row&#8230; pretty soon it would be working in the middle of the table, not at the beginning. If it seeks before scanning, the speed ought to stay fairly constant as it goes through the table. If it starts a scan at at the beginning every time, it ought to get slower as it goes (ignoring a slight speed increase due to the table getting smaller).

After testing a variety of scenarios, I concluded that MySQL will indeed seek, then start scanning. Within the limits of my ability to detect, the speed seemed to stay fairly constant as the query progressed through the table.

Once satisfied that the query is efficient, I ran several at once and observed their impact on the system. While it's harder to profile MySQL than SQL Server, I was able to observe some impact on the system. Specifically, committing the `DELETE` statement seems to cause most of the work. When several instances of the program were archiving various tables simultaneously, I noticed I/O saturation on the disk, even though the CPU was running pretty cool. The archiving tasks slowed down noticeably, too; when one ran alone, it might process 1,000 rows in 14 to 20 seconds during periods of little activity, but three running together slowed that same process down to 30 or so seconds. I should mention that the server was under heavy load from other processes during most of my tests.

### Good, better, best

While the queries seem to do OK archiving rows from the middle of the table, there's an even better scenario. If the query can simply pop rows off the beginning of the table, it doesn't have to do much work at all -- the first row it finds is always the one it wants. It will be weeks before the tables are down to a reasonable size, so in the meantime I chose an absolute max value for the clustered index. That means I can rewrite the queries so they don't include any non-clustered columns in the `WHERE` clause. Until these tables are pretty small, the get-next-row query looks like this:

<pre>select min(id)
from table
where id &lt; ?</pre>

This is very efficient indeed. `EXPLAIN` says "Select tables optimized away," which means the table is completely optimized out of the query. You can't get any better than that.

### Keep it small

There are several reasons to work a row at a time. One is that it avoids creating lots of locks. Locks are expensive to create, and they impact other queries. Keeping the transaction small also helps keep things low-impact. Changing a bunch of rows at a time requires putting lots of data into the transaction log, which is definitely something to avoid if possible. Ideally, the transaction log can be flushed to the disk in small bits at a time, which really helps keep things moving freely. And finally, if there's a deadlock for some reason, rolling back the transaction needs to be as cheap as possible.

There's also the issue of table scans. I'm not sure how MySQL does it, but in SQL Server a table scan will block at the first exclusive lock it comes to. If a table scan (whether it's an archiving query or another query) can can seek to a point in the table before scanning, it might not block on any locks held elsewhere in the table. Archiving a row at a time means less chance of a) blocking other table scans and b) being blocked by another table scan. Even if the archive does block another query, it's only going to delete a single row from the table, so in theory it should be getting out of the way very quickly, without causing the other query to time out.

### Keep it large enough

(This section added after considerably more experience).

It turns out things will sometimes do much better if transactions aren't committed after every row. We found that tons of tiny transactions are actually a bottleneck. We're still archiving a row at a time, but only committing occasionally (the commit interval varies from 50 to 1000 rows).

### A scary possibility

I want to discuss an alternate outcome here. Imagine the query is smart enough to seek before scanning, but isn't smart enough to recognize that the first row it finds to satisfy the `WHERE` clause actually has to be the minimum value for the clustered index in the rest of the table. In this case, the query would continue scanning to the end of the table, and conclude the obvious: the first row it found in step 2 is the minimum. In general, this is no worse than scanning from the beginning every time. In either case, the query would be scanning, on average, half the table (ignoring table shrinkage due to archiving). That is, it would scan `(n * (n/2)) - n` rows, which is O(n<sup>2</sup>) -- too slow.

Though this scenario is no worse in the general case, in the specific case for which I'm writing my archiving queries, it would be worst-case. I want my queries to pop the first row off the table; if the hypothetical "stupid" query insisted on scanning through the rest of the table, this would be a disaster. Not only would it be scanning, but it'd be starting the scan at the very first row.

You may think this is silly, and no query would be that badly optimized, but read through my past articles and you'll see some queries that are optimized even worse than this. My point is, it's absolutely necessary to test and see. Assuming the query will be efficient is a very bad idea.

How can I tell if the query is scanning the rest of the table, rather than stopping at the first row it finds? Simple: `EXPLAIN` the query and see if it's using a table scan. Also, if this were happening, the delete-every-tenth-row query would get faster as it went, because it would have less and less of the table to scan each time, but that's just a heuristic; I don't need to rely on that because I can use `EXPLAIN` to get right to the truth.

### Optimizing the table scans

After it occurred to me that MySQL might not optimize the scan along the clustered index, as I mentioned above, I decided to test it. I used `EXPLAIN` to look at the query plans. Lo and behold, it said it would scan the entire table rather than stopping at the first row! This was very bad news. I wasn't sure if it would really do that, or if that was just the anticipated query plan, so I tested by looking at the very first row in a large table and writing a `WHERE` clause it would satisfy. For example, suppose my table had a clustered key called `id` and an un-indexed column called `name`. The first row is `(1, 'Xaprb')`, followed by a few million rows. I wrote the following query:

<pre>select min(id) from table
where name = 'Xaprb'</pre>

This query's plan was a table scan, and it took several minutes to finish, indicating it read through the entire table to find the first row. I tried some other variations to encourage it to use the clustered index:

<pre>select min(id) from table
where name = 'Xaprb' and id > 0</pre>

No dice. This time, the query plan said it would use the clustered index and the `WHERE` clause, but it estimated it would have to scan exactly half the table, which just means it's doing the math and saying its best guess is average-case. The performance and query plan are actually identical.

Why isn't it smart enough to scan the clustered index and stop at the first row that satisfies, which is guaranteed to be the minimum? I think the answer might be that InnoDB is the only storage engine that even *has* a clustered index, and the optimizer isn't engine-specific, so it only uses optimizations that would apply to all storage engines.

The good news is, there's a way to get around these n<sup>2</sup> performance penalties! Since *I* know the first row it finds is the one it wants, even though *it* doesn't know that, I can tell it to scan the clustered index and stop after one row. Here's the query:

<pre>select id from table
where name = 'Xaprb' limit 1;</pre>

Notice *I'm no longer using the `MIN()` function*. This is really important. If I use `MIN()`, it **will** scan the rest of the table.

In this case I don't have to do anything to tell it to scan the clustered index -- it is already doing that on its own -- but in some queries I might have to use `FORCE INDEX` or `IGNORE INDEX` to make it do so. Adding an `ORDER BY id` might also work.

### Know when you're really done

After some experience with this technique, I discovered that using the `LIMIT 1` optimization can have unintuitive results. In some cases, the query will start on a row with value 5 (for example). The "get next greater, limit one" query may then skip rows when it gets the next value. I haven't understood yet how this happens, but it may, for example, get a row with 8 as its value, skipping over 6 and 7. At some point it returns no results, even though there may actually be more archive-able rows in the table.

This is basically an artifact of not using `MIN()`, which causes the table scans I desperately need to avoid.

This hasn't impacted the archiving I'm doing at this point. When I need to be really sure the archiving is clean, I restart the job and let it clean out the rows it missed, continuing until there is no result for the "get-first-row" query. If I don't do this, there's a "ragged edge" in the data. For my purposes, the speed trade-off makes this a completely acceptable compromise.

### Acknowledgements

I didn't do this myself&#8230; I'm standing on the shoulders of giants, particularly my co-worker John, who taught me about this stuff and went through all this analysis with me. So, even though I say "I" a lot in this article, it's not really just me.

 *[OLTP]: Online transaction processing
 *[DBA]: Database Administrator
 *[I/O]: Input/output
 *[CPU]: Central Processing Unit

 [1]: http://code.google.com/p/maatkit/
