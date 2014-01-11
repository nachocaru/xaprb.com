---
title: 'A challenge: partition a character set in MySQL'
author: Baron Schwartz
excerpt: "<p>How good are your SQL and/or general coding skills?  I have a specific challenge I'd like your help solving.  I am not sure it's possible, but I'd love to be proven wrong.</p>"
layout: post
permalink: /2007/06/11/a-challenge-partition-a-character-set-in-mysql/
description:
  - 'A challenge: find endpoints of ranges that will partition a character column into subsets of approximately X rows'
tags:
  - algorithm
  - challenge
  - character_data
  - checksum
  - Coding
  - divide_and_conquer
  - MySQL
  - mysqltoolkit
  - partition
  - SQL
---
How good are your SQL and/or general coding skills? I have a specific challenge I'd like your help solving. I am not sure it's possible, but I'd love to be proven wrong.

I'll explain some background for the problem first, and then pose the challenge at the end of the article.

### The problem

Several of the algorithms I've been implementing require data to be partitioned for a divide-and-conquer approach. This is easy enough with numeric and even with temporal data, but character data is more difficult, and I don't have a good strategy yet.

The problem is how to work on only part of the data at a time, yet not miss any of it. In geeky terms, I want to [partition the set][1], which means to divide it into disjoint subsets that complete a [cover][2] over the set.

To give a little more context, I need to use this in several ways. In one application, I want to [checksum tables][3] a little at a time. The idea is to reduce the impact on the server, with a sleep between the checksums. Another application, which [finds and resolves differences between MySQL tables][3], needs to partition coarsely at first, then further subdivide partitions that are "interesting."

At the moment, I think doing this efficiently requires finding the partition endpoints. This is easy with numeric data. It's very efficient to select the `MIN()` and `MAX()` from an indexed column, `EXPLAIN` a query to see how many rows the query optimizer thinks are in it, and do a little subtraction and division to find the endpoint of each range. These can then go into a `BETWEEN` clause to implement the partitioning.

I can treat temporal data the same way. Instead of subtracting numbers, I can use `DATEDIFF()` or similar to find out how large the range is, and then use other date math functions to generate successive endpoints.

Character data isn't so simple. Character sets and collations seem to make it harder to find endpoints and be assured of a cover over the set. If the characters were restricted to 0-9 and A-F, of course I could just treat them as hexadecimal and do ordinary math. Even generating a cover isn't all that hard, but making sure they are disjoint strikes me as hard.

One idea is a binary search, or trial and error, to find endpoints. I could use `EXPLAIN` to ask how many rows are greater than some value, and vary the value to discover the approximate distribution of the data, choosing endpoints along the way. I think this path is fraught with difficulties, though.

### A challenge

The above paragraphs should give you an idea what I've been considering for this problem. It might make it easier for people to help me if I give a specific example and ask for a solution. Here we go:

*   You have a single table in MySQL with a `varchar(50)` primary key.
*   The minimum value in the primary key is 'aardvark' and the maximum is 'Ð‘ÑŠÐ»Ð³Ð°Ñ€ÑÐºÐ¸.' I intentionally won't say any more about the data; your solution must be able to figure out what to do based on limited knowledge, such as using EXPLAIN to access index statistics.
*   The charset is utf8 and the collation is case-insensitive.
*   There are 18 million rows, more or less, in the table.
*   You want to select the data in chunks of approximately a million rows, as explained above.
*   The solution must generate about 18 separate queries of around a million rows each, and each query **must not** examine and discard, or scan through, any rows it does not include in the result. I think you want to do this with successive BETWEEN clauses, but if there is another way that is efficient and correct, that's good too. 
    *   LIMIT with OFFSET is out of the question, because it actually selects and discards part of its results.
    *   A single GROUP BY is no good either, because it will run in one query, not 18.
*   You do not have to do this in pure SQL. You can bring any scripting or programming language to your aid, to help generate queries or do some math or whatever.
*   You may not create temporary tables, triggers, views, or stored procedures. Your solution must result in SQL queries beginning with the word "SELECT" that a user can run without altering anything about the server; the server is read-only for purposes of this challenge. Likewise, you may not alter the table in any way.

Can you think of any solutions?

 [1]: http://en.wikipedia.org/wiki/Partition_of_a_set
 [2]: http://en.wikipedia.org/wiki/Cover_(topology)
 [3]: http://code.google.com/p/maatkit
