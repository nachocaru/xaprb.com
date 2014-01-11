---
title: 'MySQL's FEDERATED storage engine: Part 1'
author: Baron Schwartz
excerpt: "<p>MySQL's <code>FEDERATED</code> storage engine is a fascinating example of the flexibility gained by abstracting the storage engine layer away from the rest of the server.  <code>FEDERATED</code> tables allow you to access a table on another server as though it exists on the local server.  However, the manual doesn't say much about how it really works.  This article peeks under the hood of the <code>FEDERATED</code> storage engine.</p>"
layout: post
permalink: /2007/01/29/mysqls-federated-storage-engine-part-1/
description:
  - "A detailed examination and explanation of how MySQL's FEDERATED storage engine really works."
---
[MySQL's `FEDERATED` storage engine][1] is a fascinating example of the flexibility gained by abstracting the storage engine layer away from the rest of the server. `FEDERATED` tables allow you to access a table on another server as though it exists on the local server. However, the manual doesn't say much about how it really works, MySQL's only developer article about it is [vague and unrealistic][2], and there are more questions than answers on the net about the engine's features and behavior. This series of articles will help you understand the engine and its uses. This first article demonstrates its behavior with a series of experimental queries.

At the end of this article, you will have a clear picture of how the storage engine accesses data on the remote server. In the next article I give a [summary of the `FEDERATED` engine's strengths and weaknesses][3], and what it's most useful for.

Note: Recently I seem to be accidentally writing about some similar topics as Giuseppe Maxia! Maybe we were separated at birth? I wrote this series before noticing that Giuseppe has written the [MySQL Federated Tables Missing Manual][4]. We cover a lot of different material, so you should read his article, too.

### Setup

The remote server I'm using is 5.0.27 on Windows; the local server is 5.0.24a on Ubuntu. On the remote server, I created the following table:

<pre>create table fed_remote(
   i int not null primary key,
   j int not null
);
insert into fed_remote(i, j)
   values(1, 4), (2, 5), (3, 6);</pre>

### Creating the federated tables on the local server

According the the manual, the local table has to be created exactly the same as the remote table. However, this turns out not to be quite true. Indexes don't need to match. `NULL`ability doesn't need to match. Data types don't need to match. Umm&#8230; column order doesn't need to match! Wait a second, you don't even have to have the same columns &#8212; and you can mis-name the columns! You can even create a local table with one column *based on a remote table with two columns*. For that matter, you can give the local table three columns, and when you `SELECT` from the table, the columns which have no data on the remote server simply get filled in with default values!

As I experimented with different options to the `CREATE TABLE`, I began to suspect that the columns are strictly positional. For example, if I create a table with only the `j` column and then select the data from it, I get the data from the `i` column on the remote server.

I think it's safe to say the rules are a little unclear at this point. You should probably not rely on any of what I just wrote remaining true forever. I'd probably see something different if I tried this on the latest development code, too.

Here's what happens when you create a federated table. To get this data, I enabled the general query log on the remote machine. By the way, I omit the usual status messages about rows affected and so forth, as they mimic exactly what you get from any other storage engine:

<pre>-- Local:

CREATE TABLE fed_local (
  i int(11) NOT NULL,
  j int(11) NOT NULL,
  PRIMARY KEY  (i)
) ENGINE=FEDERATED
 CONNECTION='mysql://user:pass@192.168.1.2/test/fed_remote';

-- Remote:

8 Connect     user@tigger.holmes on test
8 Query       SELECT *  FROM `fed_remote` WHERE  1=0
8 Quit</pre>

You can see that the statement opened a connection and then closed it on the remote server. This doesn't happen for every query against the table, just for the `CREATE`. A small clarification to the manual: the remote table must exist before *creating* the local table, not before *accessing* it.

### Connections to the remote server

As you see above, when I issued the `CREATE TABLE`, the local server made a normal client connection to the remote server, which issued a query apparently just to check that the table exists and the user has permission to access it.

After this, the first access to the table opens a new connection, which stays open forever and services future requests. This is just a normal client connection, which shows up in the process list. If you kill it on the remote server and then issue another query on the local server, you get "ERROR 1030 (HY000): Got error 1 from storage engine." If you then issue another query, the connection is re-established.

More connections will be opened in some cases, as you'll see below.

Connections are standard client connections, which means they are subject to normal rules about inactivity timeouts and other options on the remote server.

### How data is fetched from the remote server

According to the manual, the storage engine opens a client connection to the remote server and then does `SELECT * FROM tbl_name` on the remote server. This might make you think the storage engine fetches the entire contents of the data and caches it locally, but that's not the case, as you'll see below. The data is fetched a row at a time, and all columns are included every time, whether they are all needed or not. This is a missed optimization in my opinion. It transfers unnecessary data and defeats covering indexes, for one thing. However, I assume it's done because the local copy of the fetched row has to be re-constituted into an entire row in memory.

Perhaps it'd be more efficient to fetch only the needed columns, then populate the missing columns with `NULL`s. I haven't looked at the code, so don't give my opinion too much weight!

### Some simple queries

Let's look at a query or two:

<pre>-- Local:

select * from fed_local;

-- Remote:

9 Query       SHOW TABLE STATUS LIKE 'fed_remote'
9 Query       SELECT `i`, `j` FROM `fed_remote`</pre>

The first thing that always happens on the remote server is a `SHOW TABLE STATUS`. In fact, for short queries, this seems to show up in the processlist for longer than the query itself. Otherwise this query holds no surprises.

<pre>-- Local:

select i from fed_local;

-- Remote:

9 Query       SHOW TABLE STATUS LIKE 'fed_remote'
9 Query       SELECT `i`, `j` FROM `fed_remote`</pre>

As I said already, every column is always fetched from the remote server, whether it's needed or not.

<pre>-- Local:

select i from fed_local where i = 1;

-- Remote:

9 Query       SHOW TABLE STATUS LIKE 'fed_remote'
9 Query       SELECT `i`, `j` FROM `fed_remote` WHERE  (`i` = 1)</pre>

Nothing surprising here, so I'll try something more complicated:

<pre>-- Local:

select i from fed_local where i = (select min(i) from fed_local);

-- Remote:

18 Connect     user@tigger.holmes on test
 9 Query       SHOW TABLE STATUS LIKE 'fed_remote'
18 Query       SHOW TABLE STATUS LIKE 'fed_remote'
18 Query       SELECT `i`, `j` FROM `fed_remote`
 9 Query       SELECT `i`, `j` FROM `fed_remote` WHERE  (`i` = 1)</pre>

Very interesting! It opened a new connection, scanned the whole table, and then plugged the value 1 into the `WHERE` clause. I'm not terribly surprised by the table scan (obviously the aggregate query can't be pushed through as-is, since the row that results isn't in the local table's row format and therefore isn't compatible with the handler), but I'm surprised by the new connection. I suppose if it opens the table more than once in a query, it has to create a new connection. Does it re-use that newly opened connection? It turns out it does; if I re-issue the query, connections 9 and 18 are used again (Brian Aker wrote about [connection caching for the `FEDERATED` engine][5], if you want to know how it works).

Here's a nasty cross join, which I guess will open the table three times:

<pre>-- Local:

select * from fed_local as f0, fed_local as f1, fed_local as f2;

-- Remote:

19 Connect     user@tigger.holmes on test
18 Query       SHOW TABLE STATUS LIKE 'fed_remote'
 9 Query       SHOW TABLE STATUS LIKE 'fed_remote'
19 Query       SHOW TABLE STATUS LIKE 'fed_remote'
18 Query       SELECT `i`, `j` FROM `fed_remote`
 9 Query       SELECT `i`, `j` FROM `fed_remote`
19 Query       SELECT `i`, `j` FROM `fed_remote`</pre>

I guessed right. I'll leave this for a moment and discuss some other things I found out.

### Remote data is not cached at all

Rows retrieved from the remote storage don't seem to be cached even for an instant. For example, if you issue a join against a remote table where the local table contains repeated data, the matching rows will be fetched over and over again from the remote table. One consequence is that if something updates the remote table while this is happening, you will see an inconsistent view of it, even within a single query.

Here's an example:

<pre>-- Local:

create table local_nums(i int);
insert into local_nums(i)
   values(1), (2), (1);

select fed_local.* from local_nums
   inner join fed_local using(i);

-- Remote:

SHOW TABLE STATUS LIKE 'fed_remote'
SELECT `i`, `j` FROM `fed_remote` WHERE  (`i` = 1)
SELECT `i`, `j` FROM `fed_remote` WHERE  (`i` = 2)
SELECT `i`, `j` FROM `fed_remote` WHERE  (`i` = 1)</pre>

This is a bit surprising. However, if I inserted `(1), (1), (2)` into the table, there's one less call to the remote server:

<pre>-- Local:

create table local_nums(i int);
insert into local_nums(i)
   values(1), (1), (2);

select fed_local.* from local_nums
   inner join fed_local using(i);

-- Remote:

SHOW TABLE STATUS LIKE 'fed_remote'
SELECT `i`, `j` FROM `fed_remote` WHERE  (`i` = 1)
SELECT `i`, `j` FROM `fed_remote` WHERE  (`i` = 2)</pre>

I don't know what to say about this, except it strikes me as non-optimal. I think either transforming the remote query into a `WHERE... IN()`, or putting the returned rows into a hashtable to avoid repeated queries to the remote server, might be better. As it stands, not caching the returned data even for the duration of a single query is both inefficient and a little scary.

### What about IN() queries?

This exercise prompted me to see how `IN()` and similar queries are performed. This is kind of interesting:

<pre>-- Local:

select * from fed_local where i in(1, 2);

-- Remote:

19 Query       SHOW TABLE STATUS LIKE 'fed_remote'
19 Query       SELECT `i`, `j` FROM `fed_remote` WHERE  ( (`i` = 1) ) AND ( (`i` &lt;= 1) )
19 Query       SELECT `i`, `j` FROM `fed_remote` WHERE  ( (`i` = 2) ) AND ( (`i` &lt;= 2) )</pre>

That's a little weird. There's nothing incorrect about it, but the `WHERE` clause is sort of strange.

The fact that it uses two queries is a bit more bothersome. I would think the `WHERE` clause could be pushed through to the remote server un-altered, as long as certain criteria are met (e.g. no references to other tables). As it turns out, `WHERE` clauses aren't handled optimally. You'll see this more clearly in some later examples.

What about a `BETWEEN` query?

<pre>-- Local:

select * from fed_local where i between 1 and 3;

-- Remote:

19 Query       SHOW TABLE STATUS LIKE 'fed_remote'
19 Query       SELECT `i`, `j` FROM `fed_remote` WHERE  ( (`i` >= 1) ) AND ( (`i` &lt;= 3) )</pre>

I don't really understand why that query's `WHERE` clause made it through okay, but the `IN()` query got split into two. I suppose it has to do with the optimizer rewriting the `IN()` list on the local machine.

Do `LIMIT` clauses get sent to the remote server?

<pre>-- Local:

select * from fed_local limit 1;

-- Remote:

19 Query       SHOW TABLE STATUS LIKE 'fed_remote'
19 Query       SELECT `i`, `j` FROM `fed_remote`</pre>

No, they do not. Rows are limited on the local server after retrieving everything across the network. That's not very efficient.

### Indexes

How are indexes used? Are index statistics available to the optimizer for making decisions about the best query plan? It turns out they aren't, but the query optimizer on the local machine tries to optimize the query anyway. Index definitions, but not index statistics, seem to be available to the optimizer on the local machine.

Let's see this in action. First, I'll demonstrate that dropping an index on the local table makes the query behave differently. To drop the index, I have to drop and re-create the federated table, because there's no support for `ALTER TABLE` on federated tables:

<pre>-- Local:

drop table fed_local;

CREATE TABLE fed_local (
  i int(11) NOT NULL,
  j int(11) NOT NULL
) ENGINE=FEDERATED
 CONNECTION='mysql://user:pass@192.168.1.2/test/fed_remote';

select * from fed_local where i = 1;

-- Remote:

20 Connect     user@tigger.holmes on test
20 Query       SELECT *  FROM `fed_remote` WHERE  1=0
20 Quit       
21 Connect     user@tigger.holmes on test
21 Query       SHOW TABLE STATUS LIKE 'fed_remote'
21 Query       SELECT `i`, `j` FROM `fed_remote`</pre>

Why didn't the `WHERE` clause get pushed through to the remote server? Apparently the query optimizer thinks it should strip the `WHERE` clause if the column isn't indexed. As it happens, the remote table still has an index on that column, so in fact a table scan isn't needed on the remote server. Even if it were, it would be much better to scan and eliminate rows on the remote server than to send them all over the network and then eliminate them. I'm sure it's just a matter of time before this is addressed, if it isn't already.

This brings up a related point: what happens when I `EXPLAIN` a query?

<pre>-- Local:

explain select * from fed_local where i = 5\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: fed_local
         type: ALL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 3
        Extra: Using where

-- Remote:

21 Query       SHOW TABLE STATUS LIKE 'fed_remote'</pre>

Interesting -- from the local index definitions (or lack thereof), it decided nothing better than a table scan is possible, and didn't do anything on the remote server but check for table existence. (Notice that I used `i = 5`, which will return no rows). If I re-add the primary key as it exists on the remote server, it's a little different:

<pre>-- Local:

explain select * from fed_local where i = 5\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: NULL
         type: NULL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: NULL
        Extra: Impossible WHERE noticed after reading const tables

-- Remote:

23 Query       SHOW TABLE STATUS LIKE 'fed_remote'
23 Query       SELECT `i`, `j` FROM `fed_remote` WHERE  (`i` = 5)</pre>

You might think, from looking at the result, that it has index statistics, but then you see it actually issues the query you're trying to `EXPLAIN` on the remote server.

Notice what's happening: you might think you're just asking for a query plan, but in reality it's executing the query on the remote server. Warning! Don't `EXPLAIN` queries on federated tables; they get executed! Fortunately there's no `EXPLAIN DELETE`. That would be bad.

### Subqueries

Because I can't resist harping on this, here's another demonstration of how column subqueries in the `IN()` clause are badly optimized on MySQL:

<pre>-- Local:

select * from fed_local where i in(select i from local_nums);

-- Remote:

23 Query       SHOW TABLE STATUS LIKE 'fed_remote'
23 Query       SELECT `i`, `j` FROM `fed_remote`

-- Local:

select * from local_nums where i in (select i from fed_local);

Remote:

23 Query       SHOW TABLE STATUS LIKE 'fed_remote'
23 Query       SELECT `i`, `j` FROM `fed_remote` WHERE  (`i` = 1)
23 Query       SELECT `i`, `j` FROM `fed_remote` WHERE  (`i` = 2)
23 Query       SELECT `i`, `j` FROM `fed_remote` WHERE  (`i` = 1)</pre>

Moral of the story, as ever: use joins, not subqueries, for this type of query.

### What about writing to the remote table?

Let's see what happens with some queries that write data to the remote table:

<pre>-- Local:

insert into fed_local(i, j) values(4, 7);

-- Remote:

26 Query       INSERT INTO `fed_remote` (i, j) VALUES  (4, 7)</pre>

The rows show up okay on the remote system; the insert was fine. The interesting thing here is the insert was a single query on the remote system. No call to `SHOW TABLE STATUS` first. I'm curious about duplicate keys; how are they handled?

<pre>-- Local:

insert into fed_local(i, j) values(4, 7);
ERROR 1296 (HY000): Got error 10000
   'Error on remote system: 1062: Duplicate entry
   '4' for key 1' from FEDERATED

-- Remote:

26 Query       INSERT INTO `fed_remote` (i, j) VALUES  (4, 7)</pre>

A reasonable error, though perhaps something could be done about the proliferation of error messages and codes there. What about inserting multiple rows?

<pre>-- Local:

insert into fed_local(i, j) values(5, 7), (6, 7);
Query OK, 2 rows affected (0.11 sec)
Records: 2  Duplicates: 0  Warnings: 0

-- Remote:

26 Query       INSERT INTO `fed_remote` (i, j) VALUES  (5, 7)
26 Query       INSERT INTO `fed_remote` (i, j) VALUES  (6, 7)</pre>

So the storage engine actually made one call per row. The manual mentions that this will happen; there is no speedup from making bulk inserts. What happens when I omit a column in the INSERT?

<pre>-- Local:

insert into fed_local(i) values(8);
ERROR 1296 (HY000): Got error 10000 'Error on remote system: 1364: Field 'j' doesn't have a default value' from FEDERATED

-- Remote:

26 Query       INSERT INTO `fed_remote` (i) VALUES  (8)</pre>

The storage engine deferred error checking to the remote server, which feels inconsistent to me, since it doesn't defer index checking. I also find it odd that columns can be omitted from such a query, yet the engine always *reads* all columns even when not all columns are specified for a `SELECT`.

### Deletes

Here's what happens when you delete rows:

<pre>-- Local:

delete from fed_local limit 1;

-- Remote:

29 Query       SHOW TABLE STATUS LIKE 'fed_remote'
29 Query       SELECT `i`, `j` FROM `fed_remote`
29 Query       DELETE  FROM `fed_remote` WHERE i = 1 AND j = 4 LIMIT 1</pre>

It reads before it deletes. What happens when you delete by primary key?

<pre>-- Local:

delete from fed_local where i = 2;

-- Remote:

29 Query       SHOW TABLE STATUS LIKE 'fed_remote'
29 Query       SELECT `i`, `j` FROM `fed_remote` WHERE  ( (`i` = 2) ) AND ( (`i` &lt;= 2) )
29 Query       DELETE  FROM `fed_remote` WHERE i = 2 AND j = 5 LIMIT 1</pre>

In fact it always seems to read first and then put a LIMIT clause on the DELETE. What happens when you delete multiple rows? There are three rows where j = 7 in the table.

<pre>-- Local:

delete from fed_local where j = 7;

-- Remote:

29 Query       SHOW TABLE STATUS LIKE 'fed_remote'
29 Query       SELECT `i`, `j` FROM `fed_remote`
29 Query       DELETE  FROM `fed_remote` WHERE i = 4 AND j = 7 LIMIT 1
29 Query       DELETE  FROM `fed_remote` WHERE i = 5 AND j = 7 LIMIT 1
29 Query       DELETE  FROM `fed_remote` WHERE i = 6 AND j = 7 LIMIT 1</pre>

It looks like `DELETE` isn't very efficient with more than one row.

### Updates

Updates work about the same as deletes: it reads the rows and then issues `UPDATE` statements for each, one at a time, with all columns included:

<pre>-- Local:

update fed_local set j = 5;

-- Remote:

29 Query       SHOW TABLE STATUS LIKE 'fed_remote'
29 Query       SELECT `i`, `j` FROM `fed_remote`
29 Query       UPDATE `fed_remote` SET i = 3, j = 5 WHERE i = 3 AND j = 6
29 Query       UPDATE `fed_remote` SET i = 7, j = 5 WHERE i = 7 AND j = 8
29 Query       UPDATE `fed_remote` SET i = 8, j = 5 WHERE i = 8 AND j = 8
29 Query       UPDATE `fed_remote` SET i = 9, j = 5 WHERE i = 9 AND j = 8
29 Query       UPDATE `fed_remote` SET i = 10, j = 5 WHERE i = 10 AND j = 8</pre>

No real surprises there; I'm getting accustomed to that. I was sort of expecting to see a `LIMIT` on each query, though.

There's a special case for `UPDATE`s, though: `TIMESTAMP` columns. What happens to them -- do they auto-update to `CURRENT_TIMESTAMP` as expected? To find out, I added the column on the remote table, then dropped and re-created the local table with the new column definition added. The `UPDATE` statement sets them to their present value, so they don't auto-update:

<pre>-- Local:

update fed_local set j = 5;

-- Remote:

35 Query       SHOW TABLE STATUS LIKE 'fed_remote'
35 Query       SELECT `i`, `j`, `ts` FROM `fed_remote`
35 Query       UPDATE `fed_remote` SET i = 3, j = 5, ts = '2007-01-26 22:18:52' WHERE i = 3 AND j = 6 AND ts = '2007-01-26 22:18:52'
35 Query       UPDATE `fed_remote` SET i = 7, j = 5, ts = '2007-01-26 22:18:52' WHERE i = 7 AND j = 6 AND ts = '2007-01-26 22:18:52'
35 Query       UPDATE `fed_remote` SET i = 8, j = 5, ts = '2007-01-26 22:18:52' WHERE i = 8 AND j = 6 AND ts = '2007-01-26 22:18:52'
35 Query       UPDATE `fed_remote` SET i = 9, j = 5, ts = '2007-01-26 22:18:52' WHERE i = 9 AND j = 6 AND ts = '2007-01-26 22:18:52'
35 Query       UPDATE `fed_remote` SET i = 10, j = 5, ts = '2007-01-26 22:18:52' WHERE i = 10 AND j = 6 AND ts = '2007-01-26 22:18:52'</pre>

So no, `TIMESTAMP` columns will not behave as you might expect. They act just like normal columns. The auto-update magic doesn't work.

### REPLACE and cousins

Next I tried to see how some of the more advanced variations of the basic commands work.

<pre>-- Local:

replace into fed_local(i, j) values(3, 4);
ERROR 1296 (HY000): Got error 10000 'Error on remote system: 1062: Duplicate entry '3' for key 1' from FEDERATED

-- Remote:

41 Query       INSERT INTO `fed_remote` (i, j) VALUES  (3, 4)</pre>

Not so good! `INSERT IGNORE` and `INSERT.. ON DUPLICATE KEY UPDATE` give the same error. Apparently these variations aren't implemented at all.

### Auto-increment columns

I mentioned that the `mysql` client prints out the normal information about rows affected and so on. If I make the primary key `AUTO_INCREMENT` on the remote server, will I have access to `LAST_INSERT_ID()` information after an `INSERT` just as though the table were local, too? To answer this question I logged into the remote server and changed the table definition, then inserted:

<pre>-- Local:

insert into fed_local(j) values(8);
Query OK, 1 row affected, 1 warning (0.03 sec)

+---------+------+----------------------------------------+
| Level   | Code | Message                                |
+---------+------+----------------------------------------+
| Warning | 1364 | Field 'i' doesn't have a default value |
+---------+------+----------------------------------------+

-- Remote:

26 Query       INSERT INTO `fed_remote` (j) VALUES  (8)

-- Local:

select last_insert_id();
+------------------+
| last_insert_id() |
+------------------+
|                0 |
+------------------+</pre>

So I didn't get a value there. I didn't really expect to, but I want to see if that warning is just caused by the local table not knowing the remote table's column is `AUTO_INCREMENT`, and I also wonder whether this has anything to do with `LAST_INSERT_ID()`. To satisfy my curiosity, I dropped and re-created the local table with the `AUTO_INCREMENT` attribute on that column, then repeated the experiment.

Not surprisingly, the warning went away, but this time I was very surprised to see that `LAST_INSERT_ID()` worked!

<pre>-- Local:

-- drop and recreate with auto_increment primary key
insert into fed_local(j) values(1);
select last_insert_id();
+------------------+
| last_insert_id() |
+------------------+
|                8 |
+------------------+
1 row in set (0.00 sec)</pre>

I didn't expect that at all. Once more it shows that the behavior varies depending on what I told the local server about the remote table in the `CREATE TABLE` statement, not what the remote table's definition actually is.

### Tables with too many columns

I mentioned earlier that if you define the local table with more columns than the remote, it'll work anyway:

<pre>-- Local:

CREATE TABLE fed_local (
  i int(11) NOT NULL,
  j int(11) NOT NULL,
  k int(11) NOT NULL,
  PRIMARY KEY  (i)
) ENGINE=FEDERATED
 CONNECTION='mysql://user:pass@192.168.1.2/test/fed_remote';

select * from fed_local2;
+---+---+---+
| i | j | k |
+---+---+---+
| 1 | 4 | 0 |
... omitted ...
| 8 | 8 | 0 |
+---+---+---+

insert into fed_local2(j) values(8);
Query OK, 1 row affected, 1 warning (0.40 sec)

show warnings;
+---------+------+----------------------------------------+
| Level   | Code | Message                                |
+---------+------+----------------------------------------+
| Warning | 1364 | Field 'k' doesn't have a default value |
+---------+------+----------------------------------------+

-- Remote:

30 Connect     user@tigger.holmes on test
30 Query       SELECT *  FROM `fed_remote` WHERE  1=0
30 Quit       
31 Connect     user@tigger.holmes on test
31 Query       SHOW TABLE STATUS LIKE 'fed_remote'
31 Query       SELECT `i`, `j` FROM `fed_remote`
31 Query       INSERT INTO `fed_remote` (j) VALUES  (8)</pre>

The extra columns don't cause errors, strangely. They just don't get sent over the client connection. However, if I try to insert or update a column that doesn't exist on the remote table, it will throw an error.

### Privileges

As far as I can tell, all privileges are defined in terms of the user used for the `CONNECTION` clause of the `CREATE TABLE` statement. You might think this is stating the obvious, but who knows. If `LAST_INSERT_ID()` works but `TIMESTAMP` columns don't auto-update, who knows.

`SHOW FULL COLUMNS` shows privileges on the local copy of the table, and doesn't ask the remote server what privileges the user has there.

### Miscellaneous

Some miscellaneous commands I tried, which all do a `SHOW TABLE STATUS` on the remote server:

<pre>-- Local:

SHOW TABLE STATUS LIKE 'fed_local';
SHOW INDEX FROM 'fed_local';
DESC fed_local;
SHOW FULL COLUMNS FROM fed_local;
SELECT TABLE_NAME FROM INFORMATION_SCHEMA;</pre>

### Summary

In this article I've demonstrated a series of queries against a `FEDERATED` table in MySQL. I've tried fairly standard queries for all four major types of queries (`SELECT`, `INSERT`, `UPDATE`, `DELETE`), and explored the behavior of some special-case queries, like updating `TIMESTAMP` columns.

As I ran these queries and observed the results, patterns began to emerge. These reveal how the storage engine works. In the next article in this series, I'll summarize the lessons I learned, and give my opinions on the engine's strengths and weaknesses. This will help interested readers decide whether the `FEDERATED` storage engine makes sense for a specific use case.

 [1]: http://dev.mysql.com/doc/refman/5.0/en/federated-storage-engine.html
 [2]: http://dev.mysql.com/tech-resources/articles/mysql-federated-storage.html
 [3]: /blog/2007/01/31/mysqls-federated-storage-engine-part-2/
 [4]: http://www.oreillynet.com/pub/a/databases/2006/08/10/mysql-federated-tables.html
 [5]: http://krow.livejournal.com/362079.html
