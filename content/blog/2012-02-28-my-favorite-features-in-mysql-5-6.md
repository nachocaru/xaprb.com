---
title: My favorite features in MySQL 5.6
permalink: /2012/02/28/my-favorite-features-in-mysql-5-6/
categories:
  - SQL
---
MySQL 5.6 is going to have a lot of [improvements][1]. I want to mention a few things I think are uniquely valuable for a large set of typical MySQL users.

The first is [index condition pushdown][2]. If you've read High Performance MySQL, you saw a lengthy "indexing case study" in the chapter on indexing. It's many pages of if-this-then-that kinds of things: you have to include this column in the index, but then in that order, but only for this query because for this other query you need these other indexes with columns in these orders, and this index can be suitable for these queries if you combine some other things, and it just goes on and on. Why? Largely because of something that we call the left-prefix rule. It imposes a lot of limitations, and you end up juggling indexes, queries, and table design. And you sometimes need techniques such as [delayed joins][3] to avoid doing work on data that will ultimately be filtered out anyway.

MySQL 5.6 improves this situation a lot. Indexes become much more useful and the optimizer is able to use them in many more scenarios. MySQL 5.6 is going to make these catch-22 indexing scenarios much less painful. (Index condition pushdown isn't 100% unique to MySQL 5.6, but the magic requires both optimizer and storage engine changes, and no other version of MySQL currently has both.)

The second thing I'm looking forward to is making [ORDER BY with LIMIT][4] cheaper. It's fair to say that "everyone knows" that when EXPLAIN shows "Using temporary; using filesort" for such queries, you have a bad query plan. MySQL generates the whole result set, sorts it, and throws away most of the rows. Queries such as these are extremely common for paginated displays, leaderboards, and so on. They can easily build into a serious problem for the server, including storms of high-concurrency queries all fighting for resources, using a lot of disk and memory. MySQL 5.6 uses a fixed-size buffer to hold the top N rows, discarding the unwanted ones as it goes &#8212; much more efficient.

Why do I think these two optimizations, out of the [many][1] that are implemented in MySQL 5.6, are so important? It's because MySQL is still largely the database of web users, and web users &#8212; especially those who are not top-level experts in query optimization &#8212; commonly write queries that MySQL struggles to execute well in exactly these two areas. Take any off-the-shelf software, such as WordPress or Drupal, and you're going to get queries that don't perform well on MySQL today. Write any web application in some framework, add a couple of common UI elements such as the top items or a search interface, and again you're going to have problems. I look forward to being able to say "this is fixed in the new version."

 [1]: http://dev.mysql.com/doc/refman/5.6/en/mysql-nutshell.html
 [2]: http://dev.mysql.com/doc/refman/5.6/en/index-condition-pushdown-optimization.html
 [3]: http://www.mysqlperformanceblog.com/2007/04/06/using-delayed-join-to-optimize-count-and-limit-queries/
 [4]: http://dev.mysql.com/doc/refman/5.6/en/limit-optimization.html
