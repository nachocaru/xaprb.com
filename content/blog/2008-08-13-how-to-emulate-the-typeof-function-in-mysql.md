---
title: How to emulate the TYPEOF() function in MySQL
date: "2008-08-13"
permalink: /2008/08/13/how-to-emulate-the-typeof-function-in-mysql/
categories:
  - Databases
---
Want to know the type of an arbitrary expression in MySQL? Someday in the far far future in version 7.1, you might be able to with the [TYPEOF()][1] function.

For now you can try this:

<!--more-->

<pre>CREATE TEMPORARY TABLE typeof AS SELECT [expression] AS col;</pre>

For example, let's see what the type of CRC32 is.

<pre>mysql> CREATE TEMPORARY TABLE typeof AS SELECT CRC32('hello world') AS col;
mysql> DESCRIBE typeof;
+-------+------------------+------+-----+---------+-------+
| Field | Type             | Null | Key | Default | Extra |
+-------+------------------+------+-----+---------+-------+
| col   | int(10) unsigned | NO   |     | 0       |       | 
+-------+------------------+------+-----+---------+-------+
</pre>

This is one possible way to programmatically determine the type of an expression &#8212; even an arbitrarily complex one.

Not beautiful, but it might get the job done. Other ideas?

 [1]: http://forge.mysql.com/worklog/task.php?id=1299
