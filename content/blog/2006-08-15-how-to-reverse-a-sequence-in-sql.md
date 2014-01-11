---
title: How to reverse a sequence in SQL
author: Baron Schwartz
excerpt: |
  <p>I wrote an article a while back about <a href="http://www.xaprb.com/blog/2006/06/16/how-to-avoid-unique-index-violations-on-updates-in-mysql/">how to order updates in MySQL so you don't violate a unique index</a>.  I said I'd write another article on how to swap numbers in a sequence with a unique index.  This is that article, but I'm going to make it a little more generic: how to reverse a (possibly ordered) sequence.</p>
  
  <p>I've been thinking about this for a while, wondering if there's a way I can do it in-place in one statement (I like to pile challenge upon difficulty).  I've thought of a number of techniques, some using one statement, some using more, some that won't work on MySQL, some that will.</p>
layout: post
permalink: /2006/08/15/how-to-reverse-a-sequence-in-sql/
description:
  - Describes a variety of ways to reverse a sequence of numbers in SQL.
---
I wrote an article a while back about [how to order updates in MySQL so you don&#8217;t violate a unique index][1]. I said I&#8217;d write another article on how to swap numbers in a sequence with a unique index. This is that article, but I&#8217;m going to make it a little more generic: how to reverse a (possibly ordered) sequence.

I&#8217;ve been thinking about this for a while, wondering if there&#8217;s a way I can do it in-place in one statement (I like to pile challenge upon difficulty). I&#8217;ve thought of a number of techniques, some using one statement, some using more, some that won&#8217;t work on MySQL, some that will.

This article assumes a sequence of non-negative numbers in the following table:

<pre>create table t (
   pk int not null auto_increment primary key,
   i int not null,
   unique key(i)
);
insert into t(i) values (1), (2), (3), (4), (5);</pre>

The `pk` column is so there&#8217;s something to compare the original ordering against, and I will not use it in any query other than to show the original order. I don&#8217;t assume the sequence is composed of adjacent numbers &#8212; there could be gaps, and they don&#8217;t have to be strictly increasing.

### Method 1: in-place, one statement

The most straightforward way to reverse a sequence is to do it in-place, in one statement, with a little subtraction. First, here&#8217;s a SELECT statement to reverse the sequence:

<pre>select pk, (select min(i) from t) + (select max(i) from t) - i from t;</pre>

Given that statement, you can write an `UPDATE` statement based on it:

<pre>update t set i = (select min(i) from t) + (select max(i) from t) - i;</pre>

That is valid SQL, and will work on other RDBMSs, but for a number of reasons it won&#8217;t work in MySQL. The first problem is &#8220;ERROR 1093 (HY000): You can&#8217;t specify target table &#8216;t&#8217; for update in FROM clause.&#8221; You can solve this with variables:

<pre>select @min := min(i) from t;
select @max := max(i) from t;
update t set i = @min + @max - i;</pre>

Now you get the [unique index violation][2]: &#8220;ERROR 1062 (23000): Duplicate entry &#8217;5&#8242; for key 1.&#8221; There&#8217;s just no way around this in MySQL. You must turn to more devious methods!

### Method 2: bitwise XOR

Ah, here&#8217;s a solution in search of a problem! Let&#8217;s see, bitwise `XOR` is really cool, what can you use it for today?

Well, you can use it to swap some numbers, for starters. As you may know, [you can `XOR` two numbers together three times and they will magically trade places][3]. It&#8217;s a great way to swap numbers without using a temporary variable for extra storage, though that&#8217;s really of dubious value here. In any case, it&#8217;s a fun exercise to write in one statement. Can you do it more simply than the following?

<pre>select pk, ((i ^ (@min + @max - i)) ^ ((i ^ (@min + @max - i)) ^ (@min + @max - i))) from t;</pre>

Unfortunately, once you&#8217;ve proven you can use `XOR` to reverse the sequence, the problem of assigning it back to `t` is still the same; you can&#8217;t do that in MySQL without violating unique indexes.

### Method 3: mirror, delete and shift

Another method is to copy the sequence back into the table, with an offset so the unique index isn&#8217;t violated, then delete the original sequence and shift the copy back into its place (or some variation of this scheme). This will work as long as the column&#8217;s data type has enough room to store the copy. In this case, the sequence is non-negative, so negative numbers are a good place to hold the copy. 
<pre>insert into t(i) select -i from t;
delete from t where i between @min and @max;
update t set i = @max + 1 + i;</pre>

This is the first method I&#8217;ve shown that will work on MySQL. Other variations on this method include copying the rows off to a temporary table. Regardless, the basic thing that makes this work on MySQL is deleting the entire original sequence before trying to put anything back in its place. If you don&#8217;t do that, the index will be violated.

### Other methods

Besides variations on method 3, there are some other creative things you could do:

*   Add another column, reverse the sequence into that column, then delete the original column and rename the new.
*   Use the `XOR` technique on only half the table at once: `XOR` the bottom half against the top, the top against the bottom, and the bottom against the top again. This doesn&#8217;t work if there&#8217;s a unique index, as in the example I give.
*   Use an `ORDER BY` clause to reverse the numbers. For my examples shown here, this is the obvious solution, but it doesn&#8217;t work if the numbers aren&#8217;t in increasing order.
*   Allow `NULL`s in the column, then instead of deleting in method 3, just set to `NULL` temporarily.

### Summary

I just showed you a bunch of different ways to reverse a sequence in SQL, something that may or may not be useful. I&#8217;ve been amusing myself for months trying to find fund and different ways to solve this problem. I&#8217;m interested in any ideas you have too.

 [1]: http://www.xaprb.com/blog/2006/06/16/how-to-avoid-unique-index-violations-on-updates-in-mysql/
 [2]: /blog/2006/06/16/how-to-avoid-unique-index-violations-on-updates-in-mysql/
 [3]: http://www.xaprb.com/blog/2005/09/28/bitwise-arithmetic/

 *[RDBMS]: Relational Database Management System