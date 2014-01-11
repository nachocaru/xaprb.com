---
title: How to delete duplicate rows with SQL, Part 2
author: Baron Schwartz
excerpt: |
  <p>By reader request, this article explains ways to remove duplicate rows when they are completely identical, and you don't have a primary key or other criterion to identify which rows to "save."</p>
layout: post
permalink: /2007/02/06/how-to-delete-duplicate-rows-with-sql-part-2/
description:
  - Explains how to delete all but one completely identical duplicated SQL rows.
tags:
  - MySQL
  - SQL
  - user defined variables
---
By reader request, this article explains ways to remove duplicate rows when they are completely identical, and you don&#8217;t have a primary key or other criterion to identify which rows to &#8220;save.&#8221;

This is a special case of deleting duplicates. I&#8217;ve written another article about the more general case, so I assume you have the background it gives. If not, you should probably go read my article about [how to delete duplicate rows in SQL][1].

### Introduction

In general, this is a hard problem. Suppose you have the following data, and you want to delete everything but the first row of its type (you don&#8217;t care which, because all duplicate rows are completely identical).

<table class="borders compact collapsed">
  <tr>
    <th>
      Fruit
    </th>
  </tr>
  
  <tr>
    <td>
      Oranges
    </td>
  </tr>
  
  <tr>
    <td>
      Oranges
    </td>
  </tr>
  
  <tr>
    <td>
      Oranges
    </td>
  </tr>
  
  <tr>
    <td>
      Apples
    </td>
  </tr>
  
  <tr>
    <td>
      Apples
    </td>
  </tr>
  
  <tr>
    <td>
      Apples
    </td>
  </tr>
  
  <tr>
    <td>
      Apples
    </td>
  </tr>
  
  <tr>
    <td>
      Apples
    </td>
  </tr>
</table>

When you&#8217;re done, you want just two rows in the table:

<table class="borders compact collapsed">
  <tr>
    <th>
      Fruit
    </th>
  </tr>
  
  <tr>
    <td>
      Oranges
    </td>
  </tr>
  
  <tr>
    <td>
      Apples
    </td>
  </tr>
</table>

### Why this is hard

This is hard because there is no way to do this in standard SQL (correct me if I&#8217;m wrong). SQL is based on relational algebra, and duplicates cannot occur in relational algebra, because duplicates are not allowed in a set. That&#8217;s why SQL doesn&#8217;t give you tools to solve this problem.

No database product is truly relational, so in real life it&#8217;s possible for duplicates to occur. When it happens, you will have to resort to platform-specific methods to solve it. There should always be a way to do it, because there is always a difference between apparently identical rows. It might be an internal row ID, for example (as in Oracle). If nothing else, the rows have different memory and disk locations in the computer.

### The easy way

The easiest thing to do is add a column with a unique number. This is called something different on every platform: it&#8217;s an `IDENTITY` column in SQL Server, an `AUTO_INCREMENT` column in MySQL, a `SERIAL` in PostgreSQL, and so on. Look at your platform&#8217;s documentation for instructions how to do it.

Once you&#8217;ve done that, you&#8217;re on easy street. Now go read my [previous article][1] to do the actual deleting.

### If that won&#8217;t do&#8230;

Build a new table with distinct values from the old table, then drop and rename:

<pre>CREATE TABLE new_fruits ...;

INSERT INTO new_fruits(fruit)
   SELECT DISTINCT fruit FROM fruits;

DROP TABLE fruits;

RENAME TABLE new_fruits fruits;</pre>

### If you can&#8217;t do that&#8230;

Perhaps you simply can&#8217;t do either of the above. Maybe your table is too large, for example. In that case you&#8217;re going to have to use some sort of iterative technique to do it; loop through the rows one at a time and delete every row you see more than once. This is also going to be a platform-specific solution; you may need to use a `WHILE` loop or server-side cursor. Consult your platform&#8217;s documentation for more; I can&#8217;t possibly cover all the bases here.

### Two examples for MySQL

Here&#8217;s a quick technique that uses [advanced user-variable techniques on MySQL][2] to delete the rows. MySQL&#8217;s server-side cursors are read-only, so some other technique has to be used. User-variables can do the trick, if you write the statement just right &#8212; it&#8217;s very touchy.

<pre>set @num := 0, @type := '';

delete from fruits
where greatest(0,
   @num := if(type = @type, @num + 1, 0),
   least(0, length(@type := type))) &gt; 1
order by type;</pre>

If you don&#8217;t understand that, go read the article :-) This can be very efficient because it doesn&#8217;t require any `GROUP BY` clause. If your rows are &#8220;naturally ordered&#8221; with all the duplicates adjacent to each other, you can even omit the `ORDER BY` clause (if your rows aren&#8217;t &#8220;sorted naturally,&#8221; you will miss some duplicate rows).

The other obvious option is to repeatedly identify a duplicated row, find how many times it&#8217;s duplicated, and delete one less than that many rows. You will need to either do this in a stored routine, or get help from some programming language. For example, in pseudo-code:

<pre>set @num := 0;

select @type := type, @num := count(*)
   from fruits
   group by type
   having count(*) > 1
   limit 1;

while @num > 0

   delete from fruits where type = 'type'
      limit @num - 1;

   set @num := 0;
   select @type := type, @num := count(*)
      from fruits
      group by type
      having count(*) &gt; 1
      limit 1;

end while</pre>

That is pseudo-code, by the way; if you&#8217;re doing this in a stored procedure, you&#8217;re going to have to concatenate strings together to make an executable statement and execute it. If you&#8217;re using an external programming language, you&#8217;ll need to fetch the values that are duplicated and dynamically build a statement that deletes all but one row.

### Summary

In this article I explained how to solve the special-case problem of removing duplicate rows with no distinguishing columns at all. It&#8217;s a harder case of the general problem, and SQL has no built-in way to solve it, so you have to learn your platform&#8217;s tricks to solve it. I showed you how to add a unique column so you can use the &#8220;easy&#8221; techniques I explained in an earlier article. You might also be able to put the rows into another table and drop the original table. Failing that, you have to use something like cursors. As a bonus, I explained two ways to do this in MySQL, one of them sneaky and the other not.

 [1]: /blog/2006/10/11/how-to-delete-duplicate-rows-with-sql/
 [2]: /blog/2006/12/15/advanced-mysql-user-variable-techniques/