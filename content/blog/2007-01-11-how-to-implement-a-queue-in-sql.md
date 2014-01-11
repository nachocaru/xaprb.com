---
title: How to implement a queue in SQL
author: Baron Schwartz
excerpt: "<p>This article explains how to create a fixed-size FIFO (first-in, first-out) queue in SQL, where  rows added after a threshold will cause the oldest row to be deleted.  There are several ways to do this, but <code>MERGE</code> on Oracle and DB2, and MySQL's non-standard extensions to SQL, make an elegant solution easy.</p>"
layout: post
permalink: /2007/01/11/how-to-implement-a-queue-in-sql/
description:
  - 'Explains how to create a FIFO queue in SQL which grows to a fixed size, then deletes old entries.</p>'
tags:
  - fifo
  - MySQL
  - PostgreSQL
  - queue
  - SQL
  - user defined variables
---
This article explains how to create a fixed-size FIFO (first-in, first-out) queue in SQL, where rows added after a threshold will cause the oldest row to be deleted. There are several ways to do this, but `MERGE` on Oracle and DB2, and MySQL&#8217;s non-standard extensions to SQL, make an elegant solution easy.

**Update** a PostgreSQL blogger pointed out the [obvious method][1] I missed: triggers! There&#8217;s also a really neat PG-specific feature that allows it to work even more elegantly on that platform. Well worth a read. I sometimes wish I worked at a PostgreSQL shop so I could have time to learn as much about it as I&#8217;ve learned about MySQL.

### Method one: do it with a single query in MySQL

Since I&#8217;m most familiar with MySQL, I&#8217;ll explain it in detail for MySQL. I&#8217;m sure a competent Oracle or DB2 developer can translate it to those platforms.

It is not possible to simultaneously `INSERT` and `DELETE` in standard SQL. However, in MySQL it is possible to simultaneously `INSERT` and `UPDATE`, with the `ON DUPLICATE KEY UPDATE` syntax. Another way to do it is with `REPLACE`, which actually works as a `DELETE` and `INSERT`. I&#8217;ve written about these before ([flexible `INSERT` and `UPDATE` statements in MySQL][2] &#8212; one of my most popular articles). You may not like them because they&#8217;re non-standard, but they&#8217;re available. I believe in using what my tools give me.

For these queries to work, you need to let inserts proceed as normal until the limit (say, 5) is reached. After that, new inserts need to create a unique index violation, and then the two-things-at-once functionality of the statement kicks in.

There are probably many ways to do this, but for this article, I&#8217;m going to imagine the table as a fixed-size, fixed-order queue. Once the list is full, new inserts &#8220;wrap around&#8221; and begin again at the bottom, travelling up through the rows one at a time. Each new insert then over-writes an existing row until it reaches the top and wraps around again.

For simplicity&#8217;s sake, I&#8217;m also going to imagine that nothing ever deletes any rows from this table. That way there&#8217;ll be no gaps in the sequence I&#8217;ll use to make the wrap-around work.

Here&#8217;s the table definition:

<pre>CREATE TABLE q (
   id int NOT NULL,
   modulo int NOT NULL,
   fruit varchar(10) NOT NULL,
   PRIMARY KEY(id),
   UNIQUE KEY(modulo)
)</pre>

This table has two unique keys: one to serve as a monotonically increasing &#8220;row number,&#8221; and one to cause the wrap-around effect to work. The only real data is the `fruit` column. Here&#8217;s a query to insert &#8220;apples&#8221; into the queue:

<pre>insert into q(id, modulo, fruit)
   select
      (coalesce(max(id), -1) + 1),
      (coalesce(max(id), -1) + 1) mod 5,
      'apples'
   from q
      on duplicate key update
         id    = values(id),
         fruit = values(fruit)</pre>

Here&#8217;s what the query does: it finds the maximum value of `id` in the table, which ought to be efficient since it&#8217;s indexed. If there are no rows, the result will be `NULL`, which `COALESCE()` converts into -1. Then it adds one to that value, which will become the next largest value in the `id` sequence. What I&#8217;m really doing here is rolling my own `AUTO_INCREMENT`, with a slight twist: the sequence starts at zero, not one.

The sequence needs to start at zero to make the modulo arithmetic easy to understand and work with. At the same time I&#8217;m inserting that value into `id`, I&#8217;m also dividing it by the desired size of the table, and inserting the remainder into the `modulo` column. When the table gets &#8220;full,&#8221; that column will already contain the calculated value, and there&#8217;ll be a unique index violation. Then the `ON DUPLICATE KEY UPDATE` clause will fire and update the existing row instead of inserting a new one.

Here&#8217;s what the table contains after the above insert:

<pre>select * from q;
+----+--------+--------+
| id | modulo | fruit  |
+----+--------+--------+
|  0 |      0 | apples |
+----+--------+--------+</pre>

Let me now insert four more rows for oranges, peaches, cherries and pears, so the queue is full:

<pre>insert into q(id, modulo, fruit)
   select
      (coalesce(max(id), -1) + 1),
      (coalesce(max(id), -1) + 1) mod 5,
      'oranges'
   from q
      on duplicate key update
         id    = values(id),
         fruit = values(fruit);

insert into q(id, modulo, fruit)
   select
      (coalesce(max(id), -1) + 1),
      (coalesce(max(id), -1) + 1) mod 5,
      'peaches'
   from q
      on duplicate key update
         id    = values(id),
         fruit = values(fruit);

insert into q(id, modulo, fruit)
   select
      (coalesce(max(id), -1) + 1),
      (coalesce(max(id), -1) + 1) mod 5,
      'cherries'
   from q
      on duplicate key update
         id    = values(id),
         fruit = values(fruit);

insert into q(id, modulo, fruit)
   select
      (coalesce(max(id), -1) + 1),
      (coalesce(max(id), -1) + 1) mod 5,
      'pears'
   from q
      on duplicate key update
         id    = values(id),
         fruit = values(fruit);</pre>

Each row I inserted caused MySQL to print the following back to the command prompt:

<pre>Query OK, 1 row affected (0.05 sec)
Records: 1  Duplicates: 0  Warnings: 0</pre>

And now, the contents of the table:

<pre>select * from q;
+----+--------+----------+
| id | modulo | fruit    |
+----+--------+----------+
|  0 |      0 | apples   |
|  1 |      1 | oranges  |
|  2 |      2 | peaches  |
|  3 |      3 | cherries |
|  4 |      4 | pears    |
+----+--------+----------+</pre>

Now I&#8217;ll insert another row for bananas:

<pre>insert into q(id, modulo, fruit)
   select
      (coalesce(max(id), -1) + 1),
      (coalesce(max(id), -1) + 1) mod 5,
      'bananas'
   from q
      on duplicate key update
         id    = values(id),
         fruit = values(fruit);</pre>

That query should have wrapped around to the beginning of the queue and triggered the unique index violation. As a result, MySQL should have overwritten the &#8216;apples&#8217; row. In fact, the messages at the command prompt indicate something did happen:

<pre>Query OK, 2 rows affected (0.03 sec)
Records: 1  Duplicates: 1  Warnings: 0</pre>

Two rows were &#8220;affected&#8221; because of the duplicate key (you can read the MySQL manual for more on what &#8220;rows affected&#8221; really means). And there was indeed a duplicate row. Here&#8217;s what&#8217;s in the table now:

<pre>select * from q order by modulo;
+----+--------+----------+
| id | modulo | fruit    |
+----+--------+----------+
|  5 |      0 | bananas  |
|  1 |      1 | oranges  |
|  2 |      2 | peaches  |
|  3 |      3 | cherries |
|  4 |      4 | pears    |
+----+--------+----------+</pre>

Notice I ordered that query by `modulo` to show the entries in the same order as before. The &#8220;oldest&#8221; row, which is at the &#8220;front&#8221; of the queue, is now the one with the smallest value of `id`, so to see them &#8220;in queue order,&#8221; you can order by `id`:

<pre>select * from q order by id;
+----+--------+----------+
| id | modulo | fruit    |
+----+--------+----------+
|  1 |      1 | oranges  |
|  2 |      2 | peaches  |
|  3 |      3 | cherries |
|  4 |      4 | pears    |
|  5 |      0 | bananas  |
+----+--------+----------+</pre>

### Method two: use `REPLACE` on MySQL

If it&#8217;s easier to write your query this way, or you need support on older versions of MySQL, you can use `REPLACE` instead of `INSERT... ON DUPLICATE KEY UPDATE`. Here&#8217;s an example:

<pre>replace into q(id, modulo, fruit)
   select
      (coalesce(max(id), -1) + 1),
      (coalesce(max(id), -1) + 1) mod 5,
      'bananas'
   from q;</pre>

The query *may* be more or less efficient, depending on your MySQL version, the storage engine you chose, and so forth. If I were doing this in production, I&#8217;d test it.

### Methods three and four: on other platforms

Another option, which will allow the same easy single-query solution, is to use `MERGE` on Oracle and DB2. `MERGE`, `REPLACE` and friends are what we database folks call [upsert queries][3], because they insert or update. If this functionality is available on other platforms, let me know. It looks like it&#8217;s still on the TODO list for PostgreSQL, and I&#8217;m fairly certain it&#8217;s not in SQL Server 2005. Perhaps a future release of one of these products will offer it.

Till then, I think the best option on these platforms would be a transaction with a couple statements to check the table and either insert or update (or delete and then insert, depending on how you want to do it). This fourth method can be made completely portable across platforms, if that&#8217;s important for your use case.

### Things to think about

If you implement a system like this, consider the edge cases. Are you ever going to delete rows from the queue? If so, does that mess with the desired behavior of new inserts? Are there any ways you can get a hole in the sequence? If so, what happens &#8212; do you get too few rows in the queue, overwrite something other than the oldest row, or something else? If you need to &#8220;process&#8221; items in the queue, maybe you can just mark them as processed rather than deleting them.

What if you want to insert multiple rows at once? If you need to go that route on MySQL, my past articles might help. You could use [advanced user variable techniques][4] to [number several rows at once][5]. I also talked about related techniques in [how to write `INSERT IF NOT EXISTS` queries][6].

### Conclusion

In this article I showed you several ways to let a table grow to a fixed size, after which new rows replace old rows. I haven&#8217;t personally used this in production; this article grew out of a reader&#8217;s question (thanks for the stimulating topic!). If this article helped you, you should consider [subscribing][7] for future updates via email or feeds. It&#8217;s free and convenient.

 [1]: http://people.planetpostgresql.org/greg/index.php?/archives/89-Implementing-a-queue-in-SQL-Postgres-version.html
 [2]: /blog/2006/02/21/flexible-insert-and-update-in-mysql/
 [3]: /blog/2006/06/17/3-ways-to-write-upsert-and-merge-queries-in-mysql/
 [4]: /blog/2006/12/15/advanced-mysql-user-variable-techniques/
 [5]: /blog/2006/12/02/how-to-number-rows-in-mysql/
 [6]: /blog/2005/09/25/insert-if-not-exists-queries-in-mysql/
 [7]: /blog/subscribe/