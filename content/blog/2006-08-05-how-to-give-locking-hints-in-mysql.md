---
title: How to give locking hints in MySQL
date: "2006-08-05"
permalink: /2006/08/05/how-to-give-locking-hints-in-mysql/
---
I worked with Microsoft SQL Server 2000 at my previous employer, and was accustomed to explicitly defining the locking mode I wanted, by providing lock hints on queries. MySQL gives less control over locking, but there are ways to control the type of locks a query will acquire. This article explores those techniques.

I've been trying to learn more about MySQL locks and deadlocks, and have written several articles on the topic recently, so I'm keen to hear your feedback.

### The lock hints I used on SQL Server

The two most common lock hints I used on queries at my former employer were `nolock` and `updlock holdlock`. The first hint tells the server not to acquire any locks at all on a query:

<pre>select col1, col2 from tbl1(<strong>nolock</strong>)</pre>

That's a big efficiency win, because locks are extra overhead. The side effect is you could be reading another transaction's uncommitted data.

The second method was useful for avoiding lock escalation deadlocks. Suppose I read from a table into a temporary table, did some manipulation, and then updated the base table again. Without any lock hints, the initial read would acquire shared read locks, which would be escalated later for writing. If something else acquired shared locks in the meantime, the escalation would cause at least a block, and possibly a deadlock. To avoid this, our DBA's coding standard was to acquire and hold those write locks as early as possible in the transaction: at the first read. For instance,

<pre>create table #temp ...
insert into #temp... select col1, col2
   from tbl1(<strong>updlock holdlock</strong>)</pre>

### Transaction isolation levels

One way to get the same effect in MySQL is to use SQL standard transaction isolation levels (see [SET TRANSACTION syntax][1]). For example, to avoid any locks at all, and allow a transaction to read dirty, possibly inconsistent data, use `READ UNCOMMITTED`. (You can do the same thing in SQL Server 2000, and then omit the `(nolock)` hint. In SQL Server 2005, I believe more of the standard isolation levels are supported, which provides better multi-versioning. I'm no expert on this, and I don't keep up with new developments in the SQL Server world anymore, so you'll have to read elsewhere to find out more.)

MySQL's default isolation level is `REPEATABLE READ`. You should read the manual to understand what this really means. It is fairly complex and has interesting implications. A good place to start is on the page [InnoDB and TRANSACTION ISOLATION LEVEL][2].

If you use the `SERIALIZABLE` isolation level in MySQL, a `SELECT` statement locks rows in shared mode, similar to the default behavior I discussed above in Microsoft SQL Server.

### Lock hints in queries

MySQL does allow you to specify directly what locks should be acquired in a `SELECT`, with the lock hints `FOR UPDATE` and `LOCK IN SHARE MODE`. Basically, `FOR UPDATE` gets write locks, and `LOCK IN SHARE MODE` gets shared read locks on the rows read. You can read more about this on the manual page [SELECT &#8230; FOR UPDATE and SELECT &#8230; LOCK IN SHARE MODE Locking Reads][3].

It's not the same level of granularity as in SQL Server, because for example you can't apply a different locking hint to each table involved in a join, but it's certainly useful.

### Server version and configuration

Finally, server version and configuration affects how and when locks are acquired. Not only is the default transaction isolation level configurable, but options that affect replication and binary logging come into play. There's some discussion about this in the comments on my [previous article on deadlocks][4].

### Is there more?

Are there more ways to control locking than I know about? Please post in the comments.

 [1]: http://dev.mysql.com/doc/refman/5.0/en/set-transaction.html
 [2]: http://dev.mysql.com/doc/refman/5.0/en/innodb-transaction-isolation.html
 [3]: http://dev.mysql.com/doc/refman/5.0/en/innodb-locking-reads.html
 [4]: /blog/2006/08/03/a-little-known-way-to-cause-a-database-deadlock/
