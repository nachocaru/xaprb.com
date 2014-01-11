---
title: How to select the first/least/max row per group in SQL
author: Baron Schwartz
excerpt: |
  <p>Here are some common SQL problems, all of which have related solutions:  how do I find the most recent log entry for each program?  How do I find the most popular item from each category?  How do I find the top score for each player?  In general, these types of "select the extreme from each group" queries can be solved with the same techniques.  I'll explain how to do that in this article, including the harder problem of selecting the top N entries, not just the top 1.</p>
layout: post
permalink: /2006/12/07/how-to-select-the-firstleastmax-row-per-group-in-sql/
description:
  - >
    Shows how to find the top N rows in each group with a variety of techniques,
    including some very efficient methods for MySQL.
categories:
  - SQL
tags:
  - Ranked data
---
Here are some common SQL problems, all of which have related solutions: how do I find the most recent log entry for each program? How do I find the most popular item from each category? How do I find the top score for each player? In general, these types of "select the extreme from each group" queries can be solved with the same techniques. I'll explain how to do that in this article, including the harder problem of selecting the top N entries, not just the top 1.

This topic is related to numbering rows, which I just wrote about (see my articles about [MySQL-specific][1] and [generic techniques][2] to assign a number to each row in a group). Therefore I'll use nearly the same table and data as I used in those articles, with the addition of a `price` column:

<pre>+--------+------------+-------+
| type   | variety    | price |
+--------+------------+-------+
| apple  | gala       |  2.79 | 
| apple  | fuji       |  0.24 | 
| apple  | limbertwig |  2.87 | 
| orange | valencia   |  3.59 | 
| orange | navel      |  9.36 | 
| pear   | bradford   |  6.05 | 
| pear   | bartlett   |  2.14 | 
| cherry | bing       |  2.55 | 
| cherry | chelan     |  6.33 | 
+--------+------------+-------+
</pre>

### Selecting the one maximum row from each group

Let's say I want to select the most recent log entry for each program, or the most recent changes in an audit table, or something of the sort. This question comes up over and over on IRC channels and mailing lists. I'll re-phrase the question in terms of fruits. I want to select the cheapest fruit from each type. Here's the desired result:

<pre>+--------+----------+-------+
| type   | variety  | price |
+--------+----------+-------+
| apple  | fuji     |  0.24 | 
| orange | valencia |  3.59 | 
| pear   | bartlett |  2.14 | 
| cherry | bing     |  2.55 | 
+--------+----------+-------+</pre>

There are a few common solutions to this problem. All involve two steps: finding the desired value of `price`, and then selecting the rest of the row based on that.

One common solution is a so-called self-join. Step one is to group the fruits by type (apple, cherry etc) and choose the minimum price:

<pre>select type, min(price) as minprice
from fruits
group by type;
+--------+----------+
| type   | minprice |
+--------+----------+
| apple  |     0.24 | 
| cherry |     2.55 | 
| orange |     3.59 | 
| pear   |     2.14 | 
+--------+----------+</pre>

Step two is to select the rest of the row by joining these results back to the same table. Since the first query is grouped, it needs to be put into a subquery so it can be joined against the non-grouped table:

<pre>select f.type, f.variety, f.price
from (
   select type, min(price) as minprice
   from fruits group by type
) as x inner join fruits as f on f.type = x.type and f.price = x.minprice;
+--------+----------+-------+
| type   | variety  | price |
+--------+----------+-------+
| apple  | fuji     |  0.24 | 
| cherry | bing     |  2.55 | 
| orange | valencia |  3.59 | 
| pear   | bartlett |  2.14 | 
+--------+----------+-------+</pre>

Another common way to do this is with a correlated subquery. This can be much less efficient, depending on how good your system's query optimizer is. You might find it clearer, though.

<pre>select type, variety, price
from fruits
where price = (select min(price) from fruits as f where f.type = fruits.type);
+--------+----------+-------+
| type   | variety  | price |
+--------+----------+-------+
| apple  | fuji     |  0.24 | 
| orange | valencia |  3.59 | 
| pear   | bartlett |  2.14 | 
| cherry | bing     |  2.55 | 
+--------+----------+-------+</pre>

Both queries are logically equivalent, though they may not perform the same.

### Select the top N rows from each group

This is a slightly harder problem to solve. Finding a single row from each group is easy with SQL's aggregate functions (`MIN()`, `MAX()`, and so on). Finding the first several from each group is not possible with that method because aggregate functions only return a single value. Still, it's possible to do.

Let's say I want to select the two cheapest fruits from each type. Here's a first try:

<pre>select type, variety, price
from fruits
where price = (select min(price) from fruits as f where f.type = fruits.type)
   or price = (select min(price) from fruits as f where f.type = fruits.type
      and price &gt; (select min(price) from fruits as f2 where f2.type = fruits.type));
+--------+----------+-------+
| type   | variety  | price |
+--------+----------+-------+
| apple  | gala     |  2.79 | 
| apple  | fuji     |  0.24 | 
| orange | valencia |  3.59 | 
| orange | navel    |  9.36 | 
| pear   | bradford |  6.05 | 
| pear   | bartlett |  2.14 | 
| cherry | bing     |  2.55 | 
| cherry | chelan   |  6.33 | 
+--------+----------+-------+</pre>

Yuck! That can be written as a self-join, but it's just as bad (I leave it as an exercise for the reader). This gets worse as you go to higher numbers (top 3, top 4&#8230;). There are other ways to phrase the statement, but they all boil down to the same thing, and they're all pretty unwieldy and inefficient.

There's a better way: select the variety from each type where the variety is no more than the second-cheapest of that type.

<pre>select type, variety, price
from fruits
where (
   select count(*) from fruits as f
   where f.type = fruits.type and f.price &lt;= fruits.price
) &lt;= 2;</pre>

This is elegant, and lets you vary N without rewriting your query (a very good thing!), but it's functionally the same as the previous query. Both are essentially a quadratic algorithm relative to the number of varieties in each type. And again, some query optimizers may not do well with this and make it quadratic with respect to the number of rows in the table overall (especially if no useful index is defined), and the server might get clobbered. Are there better ways? Can it be done with one pass through the data, instead of the many passes required by a correlated subquery? You know it can, or I wouldn't be writing this, now would I?

### Use `UNION`

If there's an index on (type, price), and there are many more records to eliminate than to include in each group, a more efficient single-pass method (especially for MySQL, but also for some other RDBMSs) is to break the queries out separately and put a limit on each, then `UNION` them all back together. Here's the syntax you need for MySQL:

<pre>(select * from fruits where type = 'apple' order by price limit 2)
union all
(select * from fruits where type = 'orange' order by price limit 2)
union all
(select * from fruits where type = 'pear' order by price limit 2)
union all
(select * from fruits where type = 'cherry' order by price limit 2)</pre>

[Peter Zaitsev has written in detail about this technique][3], so I won't go into it too much more here. If it suits your purposes, it can be a very good solution.

One note: use `UNION ALL`, not just `UNION`. It prevents the server sorting the results to eliminate duplicates before returning them. In this case there will be no duplicates, so I'm telling the server to skip that (useless, expensive) step.

### Do it with user variables on MySQL

The `UNION` trick is an especially good idea when the results are a small fraction of the rows in the table and there is an index that can be used for sorting the rows. Another linear-time technique, which might be a good option in cases where you are selecting most of the rows from the table anyway, is user variables. This is MySQL-specific. Please refer to my previous post on [how to number rows in MySQL][1] for the gory details of why this works:

<pre>set @num := 0, @type := '';

select type, variety, price
from (
   select type, variety, price,
      @num := if(@type = type, @num + 1, 1) as row_number,
      @type := type as dummy
  from fruits
  order by type, price
) as x where x.row_number &lt;= 2;</pre>

This isn't one pass through the table, by the way. The subquery is implemented as a temporary table behind the scenes, so filling it with data is one pass; then selecting every row from it and applying the `WHERE` clause is another. However, twice through is still O(n) with respect to the table size. That's a lot better than correlated subqueries, which are O(n<sup>2</sup>) with respect to the group size &#8212; even moderate group sizes cause bad performance (say there are five varieties of each fruit. That's on the order of 25 passes through the table, all told).

### One-pass technique on MySQL&#8230; maybe?

If you want to leave your queries up the the query optimizer's whims, you can try this technique, which builds no temporary tables and makes just one pass through:

<pre>set @num := 0, @type := '';

select type, variety, price,
      @num := if(@type = type, @num + 1, 1) as row_number,
      @type := type as dummy
from fruits
group by type, price, variety
having row_number &lt;= 2;</pre>

This theoretically ought to work if MySQL orders by the `GROUP BY` criteria, which it sometimes does for efficiency and to produce the expected results. Does it work? Here's what it returns on MySQL 5.0.27 on Windows:

<pre>+--------+----------+-------+------------+--------+
| type   | variety  | price | row_number | dummy  |
+--------+----------+-------+------------+--------+
| apple  | gala     |  2.79 |          1 | apple  |
| apple  | fuji     |  0.24 |          3 | apple  |
| orange | valencia |  3.59 |          1 | orange |
| orange | navel    |  9.36 |          3 | orange |
| pear   | bradford |  6.05 |          1 | pear   |
| pear   | bartlett |  2.14 |          3 | pear   |
| cherry | bing     |  2.55 |          1 | cherry |
| cherry | chelan   |  6.33 |          3 | cherry |
+--------+----------+-------+------------+--------+</pre>

Look closely&#8230; it's returning rows one and three from each group, and they're not numbered in order of increasing price? Huh? But the `HAVING` clause says the row_number should be no greater than 2! Here's what it returns on version 5.0.24a on Ubuntu:

<pre>+--------+------------+-------+------------+--------+
| type   | variety    | price | row_number | dummy  |
+--------+------------+-------+------------+--------+
| apple  | fuji       |  0.24 |          1 | apple  |
| apple  | gala       |  2.79 |          1 | apple  |
| apple  | limbertwig |  2.87 |          1 | apple  |
| cherry | bing       |  2.55 |          1 | cherry |
| cherry | chelan     |  6.33 |          1 | cherry |
| orange | valencia   |  3.59 |          1 | orange |
| orange | navel      |  9.36 |          1 | orange |
| pear   | bartlett   |  2.14 |          1 | pear   |
| pear   | bradford   |  6.05 |          1 | pear   |
+--------+------------+-------+------------+--------+</pre>

Look, this time everything is numbered 1 and every row is returned. Wonky. This is exactly what the [MySQL manual page on user variables][4] warns about.

This technique is pretty much non-deterministic, because it relies on things that you and I don't get to control directly, such as which indexes MySQL decides to use for grouping. However, if you need to use it &#8212; and I know there are some folks out there who do, because I've consulted for them &#8212; you can still tweak it. We're getting into the realm of really bastardizing SQL, but the results above came from a table without indexes other than the primary key on (`type, variety`). What happens if I add an index MySQL can use for grouping?

<pre>alter table fruits add key(type, price);</pre>

Nothing changes, and `EXPLAIN` shows why: the query doesn't use the index I just added. Why? Because the grouping is on three columns, and the index is only on two. In fact, the query is using a temp table and filesort anyway, so this is still not achieving the once-through goal. I can force it to use the index:

<pre>set @num := 0, @type := '';

select type, variety, price,
      @num := if(@type = type, @num + 1, 1) as row_number,
      @type := type as dummy
from fruits <strong>force index(type)</strong>
group by type, price, variety
having row_number &lt;= 2;</pre>

Let's see if that works:

<pre>+--------+----------+-------+------------+--------+
| type   | variety  | price | row_number | dummy  |
+--------+----------+-------+------------+--------+
| apple  | fuji     |  0.24 |          1 | apple  | 
| apple  | gala     |  2.79 |          2 | apple  | 
| cherry | bing     |  2.55 |          1 | cherry | 
| cherry | chelan   |  6.33 |          2 | cherry | 
| orange | valencia |  3.59 |          1 | orange | 
| orange | navel    |  9.36 |          2 | orange | 
| pear   | bartlett |  2.14 |          1 | pear   | 
| pear   | bradford |  6.05 |          2 | pear   | 
+--------+----------+-------+------------+--------+</pre>

Ah, now we're cooking! It did what I wanted, without a filesort or temporary table. Another way to do this, by the way, is to take `variety` out of the `GROUP BY` so it uses the index on its own. Because this selects a [non-grouped column from a grouped query][5], this only works if you are running with [`ONLY_FULL_GROUP_BY` mode turned off][6], which I hope you are not doing without good reason.

### Other methods

Be sure to check the comments for user-contributed methods. There are some really novel approaches. I always learn so much from your comments&#8230; thank you!

### Conclusion

Well, that's it. I've shown you several ways of solving the common "get the extreme row from each group" query, and then moved on to how you can get the top N rows from each group in various ways. Then I dove into MySQL-specific techniques which some (including myself, depending on my mood) would regard as mildly foolish to utterly stupid. But if you need the last bit of speed out of your server, you sometimes have to know when to break the rules. And for those who think this is just MySQL foolishness, it's not; I've seen people desperately do these types of things on other platforms too, such as SQL Server. There are hacks and tweaks on every platform, and people who need to use them.

I hope you've enjoyed and profited from this discussion. If you did, maybe you'd like to [subscribe][7] for convenient notification of future articles. Happy coding!

 [1]: /blog/2006/12/02/how-to-number-rows-in-mysql/
 [2]: /blog/2005/09/27/simulating-the-sql-row_number-function/
 [3]: http://www.mysqlperformanceblog.com/2006/08/10/using-union-to-implement-loose-index-scan-to-mysql/
 [4]: http://dev.mysql.com/doc/refman/5.0/en/user-variables.html
 [5]: /blog/2006/03/11/many-to-one-problems-in-sql/
 [6]: http://dev.mysql.com/doc/refman/5.0/en/server-sql-mode.html
 [7]: /blog/subscribe/

 *[RDBMS]: Relational Database Management System
