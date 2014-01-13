---
title: How to avoid unique index violations on updates in MySQL
date: "2006-06-16"
permalink: /blog/2006/06/16/how-to-avoid-unique-index-violations-on-updates-in-mysql/
categories:
  - Databases
---
There is a [bug in MySQL that causes an `UPDATE` to fail with a unique index violation][1], even though the statement doesn't create duplicate values. In this article I'll explain when this bug can happen, and how to work around it.

### The bug

This is easiest to demonstrate with SQL:

<pre>create table t (i int not null primary key);
insert into t(i) values (1), (2), (3), (4);
update t set i = i + 1;
-- ERROR 1062 (23000): Duplicate entry '2' for key 1</pre>

The bug is caused by MySQL's method of updating the values. It updates the first row (in index order), then checks for index violations. Since there is now a duplicate row, it fails. The correct standards-compliant behavior would be to update all the rows, then check for violations, but that is much more difficult and less efficient, so MySQL does not follow the standard.

### The workaround

The solution is to update the rows in a different order. MySQL allows an `ORDER BY` clause on `UPDATE` statements:

<pre>update t set i = i + 1 order by i desc;</pre>

Now the query updates 4 to 5, then 3 to 4, and so on, avoiding any conflicts.
### More complex cases

There are cases where the workaround can't be as simple as the above:

<pre>update t set i = case when i &gt; 2 then i + 1 else i - 1 end;
-- ERROR 1062 (23000): Duplicate entry '4' for key 1
update t set i = case when i &gt; 2 then i + 1 else i - 1 end order by i desc;
-- ERROR 1062 (23000): Duplicate entry '1' for key 1</pre>

I can't find a foolproof way to work around this. Here's one statement that works on this particular situation:

<pre>update t
   set i = case when i &gt; 2 then i + 1 else i - 1 end
   order by case when i &gt; 2 then 1000 - i else i end</pre>

Depending on the data, it might not be that easy. There are cases where no ordering can work at all, such as when swapping numbers:

<pre>update t
   set i = case when i = 1 then 2 else 1 end
   where i in (1,2);</pre>

I'll write another post on swapping numbers in MySQL.

### Beware a half-updated table

Unfortunately, this bug can sometimes cause the table to be left in an inconsistent state. In the more complex example above, if the table is InnoDB, the entire update is rolled back when it fails. If the table is MyISAM, half the updates are successful and half fail. This is the case with all updates or inserts that fail in MyISAM, since the storage engine is not transactional.

 [1]: http://bugs.mysql.com/?id=18913
