---
title: Optimizing IN() queries against a compound index
date: "2012-08-22"
permalink: /2012/08/22/optimizing-in-queries-against-a-compound-index/
categories:
  - SQL
---
Unfortunately, MySQL 5.5 doesn't generate a very good query execution plan for IN() queries against a compound (multi-column) index, such as the following query that should be able to use the 2-column primary key:

`<pre>
explain select * from tbl1
where (col1, col2) in (
      (732727758,102),(732728118,102),(732728298,102),(732728478,102),
      (732735678,102),(962074728,102),(964153098,102),(2027956818,102),
      (2034233178,102),(2034233538,102))\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: tbl1
         type: ALL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 1379
        Extra: Using where
</pre>` 
Queries such as this should usually be rewritten to a form such as the following, which accesses only the 10 rows specified instead of scanning the table:

`<pre>
explain select * from tbl1
where (col1=732727758 and col2=102)
   OR (col1=732728118 and col2=102)
   OR (col1=732728298 and col2=102)
   OR (col1=732728478 and col2=102)
   OR (col1=732735678 and col2=102)
   OR (col1=962074728 and col2=102)
   OR (col1=964153098 and col2=102)
   OR (col1=2027956818 and col2=102)
   OR (col1=2034233178 and col2=102)
   OR (col1=2034233538 and col2=102)\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: tbl1
         type: range
possible_keys: PRIMARY
          key: PRIMARY
      key_len: 10
          ref: NULL
         rows: 10
        Extra: Using where
</pre>`
