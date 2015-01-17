---
title: "MySQL challenge: LIMIT rows accessed, not rows returned"
date: "2008-06-28"
url: /blog/2008/06/28/mysql-challenge-limit-rows-accessed-not-rows-returned/
categories:
  - Databases
  - Programming
---
Dear reader, this is a challenge. How's your MySQL prowess? You know about LIMIT: it cuts off the results at the specified number.

<pre>mysql&gts; select actor_id from sakila.actor where actor_id % 5 = 0 limit 5;
+----------+
| actor_id |
+----------+
|        5 | 
|       10 | 
|       15 | 
|       20 | 
|       25 | 
+----------+
5 rows in set (0.00 sec)</pre>

But that query actually accessed 25 rows. What if I want to say "return up to 5 rows, but don't read any more than 20 rows to find them?"

Right now I've got the following:

<pre>mysql&gt; select actor_id, @rows
    -&gt; from actor, (select @rows := 0) as x where
    -&gt;    ((@rows := @rows + 1) &lt;= 20)
    -&gt;    and actor_id % 5 = 0 
    -&gt; limit 5;
+----------+-------+
| actor_id | @rows |
+----------+-------+
|        5 | 5     | 
|       10 | 10    | 
|       15 | 15    | 
|       20 | 20    | 
+----------+-------+
4 rows in set (0.00 sec)</pre>

The derived table subquery `x` is only there to initialize the user variable at the beginning of the query.

This appears to work, but it doesn't. If you profile this with SHOW STATUS, you see that it reads every row in the table (Handler\_read\_next = 200). This is actually worse, not better, than just LIMIT.

Any ideas?

I've got a few. But I don't like them for various reasons. Extra props for really efficient solutions that don't involve subqueries (so it'll work on pre-4.0) or things that add extra overhead (subqueries, for example). I guess you probably see the direction I want to go with this -- I don't want to use subqueries.
