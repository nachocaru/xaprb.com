---
title: How to select from an update target in MySQL
author: Baron Schwartz
excerpt: "<p>MySQL doesn't allow referring to a table that's targeted for update in a <code>FROM</code> clause, which can be frustrating.  There's a better way than creating endless temporary tables, though.  This article explains how to update a table while selecting from it in a subquery.</p>"
layout: post
permalink: /2006/06/23/how-to-select-from-an-update-target-in-mysql/
description:
  - Explains how to specify a target table for update in the FROM clause in MySQL.
---
MySQL doesn't allow referring to a table that's targeted for update in a `FROM` clause, which can be frustrating. There's a better way than creating endless temporary tables, though. This article explains how to update a table while selecting from it in a subquery.

### The problem

Suppose I want to update a table with data from a subquery that refers to the same table. I might want to do this for a variety of reasons, such as trying to populate a table with its own aggregate data (this would require assignment from a grouped subquery), updating one row from another row's data [without using non-standard syntax][1], and so on. Here's a contrived example:

<pre>create table apples(variety char(10) primary key, price int);

insert into apples values('fuji', 5), ('gala', 6);

update apples
    set price = (select price from apples where variety = 'gala')
    where variety = 'fuji';</pre>

The error message is `ERROR 1093 (HY000): You can't specify target table 'apples' for update in FROM clause`. The MySQL manual mentions this at the bottom of the [UPDATE documentation][2]: "Currently, you cannot update a table and select from the same table in a subquery."

It's pretty easy to work around the problem in this contrived example, but there are times when it's not possible to write the query without subqueries that refer to the update target. There is a workaround, though.

### The workaround

Since MySQL materializes subqueries in the `FROM` clause (["derived tables"][3]) as temporary tables, wrapping the subquery into another inner subquery in the FROM clause causes it to be executed and stored into a temporary table, then referenced implicitly in the outer subquery. The following statement will succeed:

<pre>update apples
   set price = (
      select price from (
         select * from apples
      ) as x
      where variety = 'gala')
   where variety = 'fuji';</pre>

If you want to know more about how this works, read the relevant section in the [MySQL Internals Manual][4].

### Problems this trick doesn't avoid

One common frustration this doesn't solve is the issue of badly optimized queries in the `IN()` clause, which are rewritten as correlated subqueries, sometimes (usually?) causing terrible performance. Wrapping the subquery in another subquery doesn't prevent the optimizer from rewriting it as a correlated subquery, though, unless I go to extremes. In any case it's better to just [rewrite such a query as a join][5].

Another thing it won't do is allow a query to refer to a temporary table more than once. Neither of these issues is solvable with the "wrap it in a subquery" trick because they are created at query compile time, whereas the update issue I was able to solve above happens at query run time.

If you enjoyed this article, [subscribe via feeds or e-mail][6] to receive my articles regularly.

**Update 2006-08-29** The queries I've given here are sloppy, performance-wise. You don't want to just `select * from table` in the subquery in real life; I just wanted to keep the examples simple. In reality you should only be selecting the columns you need in that innermost query, and adding a good `WHERE` clause to limit the results, too.

 [1]: /blog/2006/03/11/many-to-one-problems-in-sql/
 [2]: http://dev.mysql.com/doc/refman/5.0/en/update.html
 [3]: /blog/2005/09/26/sql-subqueries-and-derived-tables/
 [4]: http://dev.mysql.com/doc/internals/en/select-derived.html
 [5]: /blog/2006/04/30/how-to-optimize-subqueries-and-joins-in-mysql/
 [6]: /blog/subscribe/
