---
title: The difference between a unique index and primary key in MySQL
date: "2009-09-12"
url: /blog/2009/09/12/the-difference-between-a-unique-index-and-primary-key-in-mysql/
categories:
  - Databases
---
There's a really important difference between a unique index (MySQL's answer to a "unique constraint") and a primary key in MySQL. Please take a look at this:

<pre>CREATE TABLE `t` (
  `a` int,
  `b` int,
  `c` int,
  UNIQUE KEY `a` (`a`,`b`)
)</pre>

The combination of columns `a, b` should uniquely identify any tuple in the table, right?

<pre>select * from t;
+------+------+------+
| a    | b    | c    |
+------+------+------+
|    1 |    2 |    3 | 
| NULL | NULL |    1 | 
| NULL | NULL |    1 | 
| NULL | NULL |    1 | 
+------+------+------+
</pre>

Wrong. Our arch-enemy `NULL` [messes things up][1] again:

<blockquote cite="http://dev.mysql.com/doc/en/create-index.html">
  <p>
    A UNIQUE index creates a constraint such that all values in the index must be distinct. An error occurs if you try to add a new row with a key value that matches an existing row. This constraint does not apply to NULL values except for the BDB storage engine. For other engines, a UNIQUE index allows multiple NULL values for columns that can contain NULL
  </p>
</blockquote>

MySQL doesn't let you define a primary key over nullable columns, for this reason. This is as of version 4.0, I believe -- I recall that in version 3.23 there was nothing special about a primary key; it was just a unique non-nullable index named PRIMARY.

 [1]: http://dev.mysql.com/doc/en/create-index.html
