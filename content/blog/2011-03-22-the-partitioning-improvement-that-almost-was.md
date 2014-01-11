---
title: The partitioning improvement that almost was
date: "2011-03-22"
permalink: /2011/03/22/the-partitioning-improvement-that-almost-was/
categories:
  - SQL
---
Today I was looking for the ALTER TABLE EXCHANGE PARTITION feature for a customer, and it looks like it did not get included into MySQL 5.5, although [there is a hint of it in the documentation index][1], and you can find quite a few blog posts and presentations about it. The command simply throws a syntax error:

<pre>alter table t exchange partition p1 with table t2;</pre>

The [worklog][2] is still open, although a related bug report it mentions is closed and pushed into trunk. (It confused me for a moment until I realized that what was pushed into trunk, and released in 5.5, was TRUNCATE PARTITION support.)

Here's hoping this gets included in a future release &#8212; this is a great feature that can make partitions much more amenable to operational tasks such as moving data from one partitioned table to another, or exporting a partition to a table, then exporting the table with xtrabackup and importing it onto another server.

 [1]: http://dev.mysql.com/doc/refman/5.5/en/dynindex-statement.html
 [2]: http://forge.mysql.com/worklog/task.php?id=4445
