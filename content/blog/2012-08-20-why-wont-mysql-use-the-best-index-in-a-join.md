---
title: 'Why won't MySQL use the best index in a join?'
author: Baron Schwartz
layout: post
permalink: /2012/08/20/why-wont-mysql-use-the-best-index-in-a-join/
categories:
  - SQL
---
Someone recently asked me why the wrong index was being used for a JOIN, making the query run very slowly. We ran EXPLAIN and saw this abridged output:

`<pre>
explain select [columns] from m
   left join u on m.intcol = u.intcol and m.url = u.url
where u.url is null\G
*************************** 1. row ***************************
  select_type: SIMPLE
        table: m
         type: ALL
         rows: 2717
*************************** 2. row ***************************
  select_type: SIMPLE
        table: u
         type: ref
          key: idx_intcol
      key_len: 2
          ref: m.intcol
         rows: 64486
        Extra: Using where; Not exists
</pre>` 
The column is a 2-byte unsigned integer. Here is the relevant part of the table definition:

``<pre>
CREATE TABLE `u` (
  `intcol` smallint(5) unsigned NOT NULL,
  `url` varchar(760) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  UNIQUE KEY `url` (`url`,`intcol`),
  KEY `idx_intcol` (`intcol`),
) ENGINE=InnoDB</pre>`` 
As you can see, the `url` index looks like it should be a better index for the query, with two columns instead of one. The shortcut I often use to diagnose issues like this is EXPLAIN EXTENDED, followed by SHOW WARNINGS. The resulting warning message is often revealing:

``<pre>select 1 AS `1` from... on...
  (`m`.`url` = <strong>convert(`u`.`url` using utf8)</strong>)))...</pre>`` 
Now it's easy to see that the index can't be used because of a character set mismatch. The 'm' table indeed has a different character set and collation:

``<pre>CREATE TABLE `m` (
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8</pre>`` 
The easiest solution in this case was to change the 'm' table's definition, because it is a scratch table used as part of an import process.
