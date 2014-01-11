---
title: "MySQL's FEDERATED storage engine: Part 2"
date: "2007-01-31"
permalink: /2007/01/31/mysqls-federated-storage-engine-part-2/
categories:
  - Databases
---
In part 1 of this series I examined the [behavior of MySQL's `FEDERATED` storage engine][1] by running queries with the general query log enabled on the remote server. In this article I take a higher-level view. I summarize my findings from the first article, then give my thoughts on the engine's strengths and weaknesses.

### How the engine works

The `FEDERATED` engine accesses a remote table via a normal `mysql` client connection. Every constraint of normal connections applies, such as timeouts. The user account used for the connection is subject to normal grants on the remote table, though permissions can be further restricted for the local "copy" of the remote table. At least one connection to the remote server is opened per `FEDERATED` table. If a table needs to be opened several times at once (e.g. in a self-join), additional connections are opened, and cached for future use.

The storage engine issues `SHOW TABLE STATUS` against the remote table before (nearly) every query. There is one important exception, which I'll get to.

The storage engine appears to follow only a few simple rules. It can fetch a single row, a range of rows, or all the rows in the table. If you ask it for anything else, such as a `COUNT(*)` query, it will execute your query by fetching all the rows over the network connection, then running the `COUNT()` over them. It always fetches entire rows. For example, if you ask for just one column, it'll fetch all columns for each row, and discard the ones you didn't ask for.

The engine reads all data before it writes, so if you ask it to delete or update a row it will fetch it first, then send it back to the remote server with every column in the `WHERE` clause and a `LIMIT` of 1 (apparently the `FEDERATED` engine would rather be safe than sorry). If you ask for many rows to be changed or deleted, it will fetch them all, then issue the queries back one row at a time. `TIMESTAMP` columns do not get auto-updated in this process.

<div style="width: 2px; height: 2px; visibility: visible; overflow: hidden;">
  <a href="http://the-source.50webs.com">the source</a>
</div>

The most interesting case is `INSERT`. The engine doesn't do a read before an `INSERT`, nor does it issue `SHOW TABLE STATUS` first. This means `INSERT` statements have less overhead than other statements, though even `INSERT` is done a row at a time when there are many rows to do. Another nice thing about `INSERT`: if the remote table has an `AUTO_INCREMENT` column, `LAST_INSERT_ID()` will work normally.

The engine does not support `REPLACE`, `ON DUPLICATE KEY UPDATE`, or `INSERT IGNORE`. These get translated to `INSERT`.

Contrary to the manual, you don't need to make the `FEDERATED` table's definition match the table definition on the remote server. You can omit columns or indexes, re-order columns, add columns that don't exist, and change data types. The engine copes well. It fills in missing columns with defaults, casts values when possible, and omits columns that don't exist on the remote server. There are cases where you'll get an error, but fewer than I expected. The engine doesn't seem to honor column names, but only pays attention to the relative position of columns.

However, you mismatch table definitions at your own risk. The `FEDERATED` engine provides features based on what it knows about the table definition you give it, not the table definition that actually exists on the remote server. For example, if you don't tell it the table has an `AUTO_INCREMENT` column, you won't get any `LAST_INSERT_ID()` values after an `INSERT`. And if you don't tell it which indexes exist, the query optimizer will strip columns out of the `WHERE` clause, so a query that might use an index on the remote server could be a table scan instead.

### Weaknesses

Frankly, there are many weaknesses in the engine's *modus operandi*. I'm not trying to be critical, but given the relatively inefficient way of fetching, updating and deleting rows, there are a lot of queries you might not want to execute against a `FEDERATED` table. For example:

*   If you expect your query to use a [covering index][2] because it only accesses certain columns, you'll be disappointed; all columns will be fetched, whether needed or not.
*   Likewise, other index optimizations are useless. Indexes exist only on the remote server, not the `FEDERATED` copy of the table, which stores no data. Indexes can't be used to optimize `ORDER
BY` or `GROUP BY` queries. These clauses are stripped from the query before sending to the remote server.
*   Any query that doesn't request rows exactly as they exist in the remote table will be converted to a query that fetches them as they exist, so plan accordingly. For example, a grouped query will fetch all the rows over the network, then do the work, probably using temp tables and filesorts.
*   Don't try to `EXPLAIN` a query against a `FEDERATED` table if you don't want it to actually be executed on the remote server.
*   There is no "memory" of what data has been fetched, even within one query; it appears that the engine only considers one row "current" at a time. For example, if you're joining against a `FEDERATED` table and the join requires re-outputting a row that was fetched earlier, it'll re-fetch it from the remote server. What if something changed the data on the remote server in the meantime? For that reason, you probably don't want to do a join you expect to repeatedly output rows from the remote table.

This rules out some uses right away. For example, I started looking at the engine to see if I could move a very large table off a transaction-processing server, for read-only remote access. `FEDERATED` is not suited for this; it would probably cause remote table scans and run the local server out of memory.

The poor query optimization is troublesome. The query optimizer on the local machine seems to think it knows what's best for the remote machine, even though it doesn't have any index statistics (and might not even have the right index definitions!). As a result, it strips predicates from the `WHERE` clause when it ought to send them through and let the remote server decide what to do with them. You could easily get into trouble with this, especially if there are several indexes on the table and it chooses the wrong one.

The read-before-write, row-at-a-time strategy for `DELETE` and `UPDATE` also makes it impractical for these queries on large datasets.

### Strengths

The engine's simplicity makes it relatively easy to understand. It may not perform well on large queries, but you know what you're dealing with.

That makes the engine best suited for very small, simple queries, in my opinion. And the way `INSERT` is implemented makes it the most optimal of the types of queries I tried (again, only for small data sets), especially since `LAST_INSERT_ID()` works correctly.

For example, pretend you have a set of distributed servers working on small parts of a large task, and their results need to be merged back together when done without conflict. Many solutions to this problem involve modulo arithmetic for generating primary keys. This could be a good use of a `FEDERATED` table: just federate one central table on all the servers, have the processes `INSERT` into the table, and they'll get non-conflicting primary key numbers. That's a trivially easy way to coordinate distributed resource requests.

The way it lets you mis-define tables holds great potential. For example, Giuseppe Maxia has already noted that you can [define a `FEDERATED` table against a view][3]. Views don't have indexes (yet), but that shouldn't stop you from telling the engine it does! That way, your `WHERE` clauses are sent through to the remote server unharmed, where the view can execute `GROUP BY` queries and the like. Giuseppe even outlines a way to get the remote server to execute arbitrary commands via a `FEDERATED` table!

What about combinations with replication, triggers and so forth? There must be many more cool hacks waiting to be discovered.

### Marketing speak, deflated

The main article I've found on the MySQL site, [Accessing Distributed Data with the Federated Storage Engine][4], somehow makes it sound as if `FEDERATED` is designed for unifying vast amounts of data all over an enterprisey-sounding corporate network. There are no real claims, but opening sentences like "corporations are swimming in more data than ever before. IDC has recently pegged data growth at 48% a year," followed by a section heading titled "Federated to the Rescue," gives an impression I don't think is realistic. This is not a solution for such a problem, in my opinion.

### Summary

This was mostly a fun exercise for me. Once I realized this storage engine wasn't a viable choice for reading lots of data from a large table on another server, I decided to investigate it more and see how it works.

It turned out to be time well spent. I was able to answer many questions I see floating around on the Internet, which the manual doesn't answer (I hope to contribute to the manual and help solve that problem). I learned a lot about how the engine works. And I hope I helped you, too.

I think this engine has an exciting (though limited) range of uses, and I'm keen to see what happens with it.

### A broader context

A reader commented on my last article that the storage engine is designed to enable remote access to many types of remote servers, not just other MySQL servers. Accessing data on any generic "SQL table" outside the currently running MySQL instance is an ambitious aim, and many of the problems I see might be design decisions in support of that goal.

Point taken, but that's only planned at the moment, not reality.

If this is MySQL's goal for the `FEDERATED` engine, it needs to be made clearer. I don't think an average reader of the manual would come to that conclusion otherwise. In the meantime, this series of articles is about understanding what this storage engine does and what it's useful for, here and now. Future functionality is fair game for future articles.

 [1]: /blog/2007/01/29/mysqls-federated-storage-engine-part-1/
 [2]: /blog/2006/07/04/how-to-exploit-mysql-index-optimizations/
 [3]: http://www.oreillynet.com/pub/a/databases/2006/08/10/mysql-federated-tables.html
 [4]: http://dev.mysql.com/tech-resources/articles/mysql-federated-storage.html
