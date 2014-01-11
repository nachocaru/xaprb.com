---
title: How to subtract in SQL over samples that wrap
date: "2007-02-19"
permalink: /2007/02/19/how-to-subtract-in-sql-over-samples-that-wrap/
categories:
  - Databases
---
This article explains how to do subtraction in SQL over samples that wrap back to zero when they exceed a boundary.

A reader wrote in with a question about how to find how much traffic has passed through a network interface. The reader has a script that samples the interface's statistics and stores them in a database. The statistics wrap back around when they exceed the maximum size of an integer, so it's not a strictly increasing sequence. The question, paraphrased, is "how can I find out how much traffic has gone through the interface in any given time period?"

A key assumption is that the counter never wraps back to zero more than once between samples. If it does, all hope is lost.

### Setup

To simplify the math, pretend the counter wraps at 1,000 and you have the following table:

<pre>create table samples(
   num int not null auto_increment primary key,
   bytes int not null
);

insert into samples(bytes) values
   (100), (900),
   (230), (700), (982),
   (163), (600);

select * from samples;
+-----+-------+
| num | bytes |
+-----+-------+
|   1 |   100 | 
|   2 |   900 | 
|   3 |   230 | 
|   4 |   700 | 
|   5 |   982 | 
|   6 |   163 | 
|   7 |   600 | 
+-----+-------+</pre>

### How much traffic?

A manual calculation is easier than it looks, and solving this by hand is the key to solving it in SQL. You don't have to do a bunch of nasty math, like subtracting 982 from 163 (that's already too hard for me). You just have to notice where the counter wraps. You can find these places by seeing where the number decreases from one sample to the next. In the example, the counter wraps twice: from 900 to 230, and from 982 to 163. Here's the data, graphed with wraps "unrolled."

<img src="/articles/images/samples-that-wrap.png" width="450" height="400" alt="Graph of sample data" />

There are several ways to proceed from here. One way is to calculate the traffic as 1,000 times the number of wraps. Then you just do a little math to "clean up the edges:" subtract the first number in the sequence, and then add the last number. This gives (2 * 1000) &#8211; 100 + 600, which is 2500.

Another approach is to go row by row, summing the differences from the previous row and the last row. When the counter wraps, you add 1000 before taking the difference. This math gives the same answer. This is a lot harder to do by hand.

Either technique works given an arbitrary start and end point in the sequence. Now let's see how to do these in SQL.

### Problem: find the "previous" row

While these methods seem easy to humans, they resist many relational solutions because of the notion of "previous row." SQL is set-oriented, and doesn't do iterative row-by-row data manipulation. If you try to do this by grouping each strictly increasing set of data together and using aggregate functions like `SUM`, you'll have trouble. You need the values from the "previous set" to do that, and that doesn't work like you might want it to.

However, it's not that hard to get the current and last row matched up side-by-side so you can operate upon them within the context of a single row:

<pre>select cur.num, cur.bytes, prev.bytes as prev_bytes
from samples as cur
   left outer join samples as prev on cur.num = prev.num + 1;
+-----+-------+------------+
| num | bytes | prev_bytes |
+-----+-------+------------+
|   1 |   100 |       NULL | 
|   2 |   900 |        100 | 
|   3 |   230 |        900 | 
|   4 |   700 |        230 | 
|   5 |   982 |        700 | 
|   6 |   163 |        982 | 
|   7 |   600 |        163 | 
+-----+-------+------------+</pre>

Once you think of "previous" in SQL terms, it becomes easy. Armed with this tool, we are ready to take on the queries.

### Technique 1: count wraps and clean up the edges

Now that we've figured out how to find the "previous row," how can we express the "count wraps and clean up edges" algorithm in SQL? Brace yourself:

<pre>select 1000 * sum(t1.wraps) - t2.start + o.bytes as total
from samples as o
   inner join (
      select cur.num, count(prev.num) as wraps
      from samples as cur
         left outer join samples as prev on cur.num = prev.num + 1
            and cur.bytes &lt; prev.bytes
      group by cur.num
   ) as t1 on t1.num &lt;= o.num
   cross join (
      select bytes as start from samples order by num limit 1
   ) as t2
where o.num = 7
group by o.num</pre>

Anything I say about that query will probably make it harder to understand, so I'll just count on you reading it carefully. It may help to remove some of it so you can see the intermediate results:

<pre>select sum(t1.wraps) as wraps, t2.start, o.bytes
from samples as o
   inner join (
      select cur.num, count(prev.num) as wraps
      from samples as cur
         left outer join samples as prev on cur.num = prev.num + 1
            and cur.bytes &lt; prev.bytes
      group by cur.num
   ) as t1 on t1.num &lt;= o.num
   cross join (
      select bytes as start from samples order by num limit 1
   ) as t2
group by o.num;
+-------+-------+-------+
| wraps | start | bytes |
+-------+-------+-------+
|     0 |   100 |   100 | 
|     0 |   100 |   900 | 
|     1 |   100 |   230 | 
|     1 |   100 |   700 | 
|     1 |   100 |   982 | 
|     2 |   100 |   163 | 
|     2 |   100 |   600 | 
+-------+-------+-------+</pre>

You can also write it as a correlated subquery, instead of a subquery in the `FROM` clause:

<pre>select 1000 * (
      select count(*) from samples as cur
         inner join samples as prev on cur.num = prev.num + 1
            and cur.bytes &lt; prev.bytes
      where cur.num &lt;= samples.num
   )
   - (select bytes from samples order by num limit 1)
   + samples.bytes as total
from samples
where num = 7</pre>

Both queries need `WHERE` clauses in multiple places to make them behave if you want anything other than the full range of data summed up. For example, if you want to sum over rows 3 through 6, the first query becomes

<pre>select 1000 * sum(t1.wraps) - t2.start + o.bytes as total
from samples as o
   inner join (
      select cur.num, count(prev.num) as wraps
      from samples as cur
         left outer join samples as prev on cur.num = prev.num + 1
            and cur.bytes &lt; prev.bytes
      where cur.num &gt; 3
      group by cur.num
   ) as t1 on t1.num &lt;= o.num
   cross join (
      select bytes as start from samples where num &gt;= 3 order by num limit 1
   ) as t2
where o.num = 6
group by o.num</pre>

The problem with both queries is the `<=` predicate, which turns them into O(n<sup>2</sup>) algorithms. They're essentially a cross-join. Plus, they're hard to understand. It turns out that the simplest method by hand is complicated in SQL.

### Method 2: Adjust when there's a wrap

The second method I showed above is more complex for humans, but it's actually simpler to do in SQL:

<pre>select sum(
   if (cur.bytes &gt;= prev.bytes,
      cur.bytes - prev.bytes,
      cur.bytes - prev.bytes + 1000)) as total
from samples as cur
   inner join samples as prev on cur.num = prev.num + 1
-- optional WHERE clause for choosing start/end:
-- where cur.num &gt; 3 and cur.num &lt;= 6</pre>

A slightly more compact way to write this is

<pre>select sum(
   cur.bytes - prev.bytes + if(cur.bytes &gt;= prev.bytes, 0, 1000)) as total
from samples as cur
   inner join samples as prev on cur.num = prev.num + 1
-- where cur.num &gt; 3 and cur.num &lt;= 6</pre>

This query is both simpler and more efficient than the first method I showed. If your platform doesn't support `IF()`, use a `CASE` statement.

### Method 3: do it with user-variables in MySQL

It's possible to do even better than the simple join technique on MySQL. Using some MySQL-specific tricks, you can make this query a once-through, low-cost algorithm, much the way you might do it by hand or in a programming language that supports iteration. If you want to know how this works, and why the query has to be written in such a contorted way, read my article on [advanced user-variable techniques in MySQL][1].

<pre>set @last_bytes := null;

select sum(greatest(
      if(bytes &gt;= @last_bytes,
         bytes - @last_bytes,
         coalesce(bytes + 1000 - @last_bytes, 0)),
      least(0, @last_bytes := bytes)
   )) as bytes
from samples order by num;</pre>

This is a bit trickier to write than some of the other user-variable examples I've shown, because you can't use `@last_bytes is null` in any `IF()` or `CASE` statement. If you do, the query optimizer will look at `@last_bytes` at compile time, see that the statement can be optimized out and replaced with a constant, and your query will not work as you expect it to.

### Summary

In this article I've shown you three methods to do SQL math on a counter that wraps around to zero when it reaches a limit. I showed them to you in order of increasing efficiency, but the second method is both the simplest and the most platform-independent (and probably the most sane).

Can you think of any other ways to do this, or any other uses for these kinds of techniques? Write into the comments!

 [1]: /blog/2006/12/15/advanced-mysql-user-variable-techniques/
