---
title: How to select the first or last row per group in SQL
author: Baron Schwartz
excerpt: |
  <p>There is no "first" or "last" aggregate function in SQL.  Sometimes you can use <code>MIN()</code> or <code>MAX()</code>, but often that won't work either. There are a couple of ways to solve this vexing non-relational problem.</p>
  
  <p>First, let's be clear: I am posing a very non-relational problem.  This is not about the minimum, maximum, top, most, least or any other relationally valid extreme in the group.  It's the first or last, in whatever order the rows happen to come.  And we all know rows aren't ordered -- in theory.  But in practice they are, and sometimes you need the first or last row in a group.  This article shows how.</p>
layout: post
permalink: /2007/08/21/how-to-select-the-first-or-last-row-per-group-in-sql/
description:
  - >
    Demonstrates how to select the first or last row (not the minimum or maximum) in
    a grouped SQL query.
tags:
  - checksum
  - MySQL
  - Ranked data
  - ROW_NUMBER
  - SQL
  - SQL Mode
  - user defined variables
---
There is no "first" or "last" aggregate function in SQL. Sometimes you can use `MIN()` or `MAX()`, but often that won't work either. There are a couple of ways to solve this vexing non-relational problem. Read on to find out how.

First, let's be clear: I am posing a very non-relational problem. This is not about the minimum, maximum, top, most, least or any other relationally valid extreme in the group. It's the first or last, in whatever order the rows happen to come. And we all know rows aren't ordered &#8212; in theory. But in practice they are, and sometimes you need the first or last row in a group.

If you have a question this article doesn't answer, you might like to read [how to select the first/least/max row per group in SQL][1] and [how to find the maximum row per group in SQL without subqueries][2].

### A MySQL user-variable solution

I'll show a MySQL-specific solution with one of the queries I developed for [MySQL Table Checksum][3].

Here's the idea: crush an entire table down to a single checksum value by checksumming each row, mushing it together with the previous row's checksum, and then checksumming the result again. It's fairly easy to do this, but it's hard to get the final result in one statement. This is necessary to use the statement in an `INSERT .. SELECT`, which I needed to do.

An example might clarify:

<pre>select * from fruit;
+---------+
| variety |
+---------+
| apple   | 
| orange  | 
| lemon   | 
| pear    | 
+---------+

set @crc := '';

select variety, @crc := md5(concat(@crc, md5(variety))) from fruit;
+---------+-----------------------------------------+
| variety | @crc := md5(concat(@crc, md5(variety))) |
+---------+-----------------------------------------+
| apple   | ae6d32585ecc4d33cb8cd68a047d8434        | 
| orange  | 7ec613c796f44ef5ccb0e24e94323e38        | 
| lemon   | a2475f37be12cebf733ebfc7ee2ee473        | 
| pear    | ec98fe57833bbd91790ebc7ccf84c7e9        | 
+---------+-----------------------------------------+</pre>

I want the "last" value of `@crc` after the statement is done processing. How can I do this? The solution I found is to use a counter variable. I'll demonstrate:

<pre>set @crc := '', @cnt := 0;

select variety,
   @cnt := @cnt + 1 as cnt,
   @crc := md5(concat(@crc, md5(variety))) as crc
from fruit;
+---------+------+----------------------------------+
| variety | cnt  | crc                              |
+---------+------+----------------------------------+
| apple   |    1 | ae6d32585ecc4d33cb8cd68a047d8434 | 
| orange  |    2 | 7ec613c796f44ef5ccb0e24e94323e38 | 
| lemon   |    3 | a2475f37be12cebf733ebfc7ee2ee473 | 
| pear    |    4 | ec98fe57833bbd91790ebc7ccf84c7e9 | 
+---------+------+----------------------------------+</pre>

The counter variable might make you want to write something like `HAVING cnt = MAX(cnt)`, but that won't work (try it!). Instead, I prefixed the checksum with the count so the last row is the stringwise maximum:

<pre>select variety,
   @crc := concat(lpad(@cnt := @cnt + 1, 10, '0'),
      md5(concat(right(@crc, 32), md5(variety)))) as crc
from fruit;
+---------+--------------------------------------------+
| variety | crc                                        |
+---------+--------------------------------------------+
| apple   | 0000000001ae6d32585ecc4d33cb8cd68a047d8434 | 
| orange  | 00000000027ec613c796f44ef5ccb0e24e94323e38 | 
| lemon   | 0000000003a2475f37be12cebf733ebfc7ee2ee473 | 
| pear    | 0000000004ec98fe57833bbd91790ebc7ccf84c7e9 | 
+---------+--------------------------------------------+
</pre>

You can see I also left-padded the count so a lexical sort will agree with a numeric sort, and so I can predict how many extra characters I'll need to remove to get back the original value. Now I can use the `MAX()` function to select the last row, and simply lop off the leftmost ten digits (I use the `RIGHT()` function for convenience, but generally you want to use `SUBSTRING()`):

<pre>select right(max(
   @crc := concat(lpad(@cnt := @cnt + 1, 10, '0'),
      md5(concat(right(@crc, 32), md5(variety))))
   ), 32) as crc
from fruit;
+----------------------------------+
| crc                              |
+----------------------------------+
| ec98fe57833bbd91790ebc7ccf84c7e9 | 
+----------------------------------+</pre>

*Et voila*, I got the last value in the group. By the way, this will work with ONLY\_FULL\_GROUP_BY in the server's [SQL mode][4].

### Other methods

My solution relies on a MySQL user variable to do the counting, but there are many ways to number rows in SQL: you could [simulate the ROW_NUMBER() function][5], for instance, or use techniques mentioned in the comments on [how to number rows in MySQL][6] (one of the comments shows a particularly clever solution with subqueries, but I didn't want to use it because MySQL doesn't support subqueries in older versions). Any of these should work one way or another. Of course, if you are using a product such as Microsoft SQL server 2005, which actually has the ROW_NUMBER() function, you can use that!

### Conclusion

Finding the first or last row is a bit unintuitive, and it's definitely non-relational, but sometimes it's what you need. The technique I demonstrated in this article is easily adaptable to many kinds of queries. I hope it helped you!

If this article didn't solve your problem, please read these before posting questions to the comments: [how to select the first/least/max row per group in SQL][1] and [how to find the maximum row per group in SQL without subqueries][2].

 [1]: /blog/2006/12/07/how-to-select-the-firstleastmax-row-per-group-in-sql/
 [2]: /blog/2007/03/14/how-to-find-the-max-row-per-group-in-sql-without-subqueries/
 [3]: http://code.google.com/p/maatkit
 [4]: http://dev.mysql.com/doc/refman/5.0/en/server-sql-mode.html
 [5]: /blog/2005/09/27/simulating-the-sql-row_number-function/
 [6]: /blog/2006/12/02/how-to-number-rows-in-mysql/
