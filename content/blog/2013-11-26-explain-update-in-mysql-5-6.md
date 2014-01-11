---
title: EXPLAIN UPDATE in MySQL 5.6
date: "2013-11-26"
permalink: /2013/11/26/explain-update-in-mysql-5-6/
categories:
  - SQL
---
I just tried out EXPLAIN UPDATE in MySQL 5.6 and found unexpected results. This query has no usable index: `<pre>
EXPLAIN UPDATE ... WHERE col1 = 9 AND col2 = 'something'\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: foo
         type: index
possible_keys: NULL
          key: PRIMARY
      key_len: 55
          ref: NULL
         rows: 51
        Extra: Using where
</pre>` 
The EXPLAIN output makes it seem like a perfectly fine query, but it's a full table scan. If I do the old trick of rewriting it to a SELECT I see that: `<pre>
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: foo
         type: ALL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 51
        Extra: Using where
</pre>` 
Should I file this as a bug? It seems like one to me.
