---
title: Estimating column cardinality the damn cool way
date: "2012-09-22"
url: /blog/2012/09/22/estimating-column-cardinality-the-damn-cool-way/
categories:
  - Databases
---
Have you seen [Damn Cool Algorithms: Cardinality Estimation][1] yet? If not, take a few minutes and read through it. Now, what if we try using that approach instead of COUNT(DISTINCT) in MySQL to see how many distinct values there are in a column?

I recently needed this information in real life, and the table is large with many duplicate values. The column is some 32-character hex string, a hash value that represents a session ID. I'll call the column `sess_id`. I wanted to know how many distinct values it had, but I thought it would be cool (damn cool, really) to try this approach and see what happened.

I read the blog post, convinced myself that it made sense, and tried to code it. Here's my rough translation of the algorithm into MySQL-speak. Note that I'm using `crc32()`, which may not be a great choice for a hash. (The value in the column is already a hash, so in theory I could just use the value, but I wanted to see how this would work if implemented in a way that can be applied generically.)

I decided to use a hard-coded 1024 "buckets", and instead of an array, I used a temporary table.

<pre>create temporary table buckets(
  id int not null primary key,
  max_zeroes int not null default 0,
  rowcount int not null default 0
)engine=memory;</pre>

Here's the single pass over the values. I'm using a user-defined variable `@c` to avoid recomputing the hash. Let me know if you see any mistakes in my code.

<pre>insert into buckets(id, max_zeroes, rowcount)
select
   (@c := crc32(sess_id)) &amp; 1023,
   if(@c &lt; 1024, 22, instr(reverse(bin(@c >> 10)), '1') -1),
   1
from tbl1
on duplicate key update
   max_zeroes=greatest(max_zeroes, values(max_zeroes)),
   rowcount = rowcount + 1;</pre>


That query took 32 minutes; by comparison, a similar query using COUNT(DISTINCT) took 46 minutes. So far, so good. Now here's the final bit, to combine the "buckets" and get the cardinality estimate. Again, flag errors if you see any:

<pre>
select pow(sum(max_zeroes) / 1024, 2) * 1024 * 0.79402 from buckets;
+-------------------------------------------------+
| pow(sum(max_zeroes) / 1024, 2) * 1024 * 0.79402 |
+-------------------------------------------------+
|                              151741.65811039635 |
+-------------------------------------------------+
</pre>


That's not even close. I happen to know that there are more than 10122796 distinct values, and 21669591 rows overall.

Did I do something wrong? I'm trying to decide whether my error is more likely to be that I'm using CRC32, a little coding mistake, the way MySQL handles numbers internally&#8230; something else? I'm not sure what's most likely. I ran this one step at a time when I wrote the code, and all of the hashing and bit-counting seems to be correct, but the aggregate results are just way off.

 [1]: http://blog.notdot.net/2012/09/Dam-Cool-Algorithms-Cardinality-Estimation
