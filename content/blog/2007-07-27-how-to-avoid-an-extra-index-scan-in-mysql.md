---
title: How to avoid an extra index scan in MySQL
date: "2007-07-27"
permalink: /2007/07/27/how-to-avoid-an-extra-index-scan-in-mysql/
description:
  - >
    Specifying indexed columns as NOT NULL whenever possible lets MySQL avoid an
    extra index scan for certain queries.
tags:
  - explain
  - join strategy
  - MySQL
  - 'null'
  - query plan
  - sakila
  - SQL
---
Is your MySQL server doing an extra index scan on queries that need to check a key for matches or NULL? It's easy for this to happen accidentally, but it's also easy to fix, especially in MySQL 5.0 and up. Here's how.

If you read the [manual page for EXPLAIN][1], you'll see the ref\_or\_null "join type" (I think "access type" is really a better term) mentioned. If you see this in EXPLAIN, it means MySQL has to search the index for matches, then search again for NULLs. If there are no NULLs in that column, and MySQL knew that, it could avoid the extra search.

You might see this in subqueries or when you use elaborate JOIN clauses, or even when you use a simple WHERE clause. For example, here's a query that will do a ref\_or\_null access plan on the [Sakila sample database][2]:

<pre>explain select * from sakila.film
where original_language_id = 3 or original_language_id is null\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: film
         type: ref_or_null
possible_keys: idx_fk_original_language_id
          key: idx_fk_original_language_id
      key_len: 2
          ref: const
         rows: 476
        Extra: Using where</pre>

Why does this happen? Simple: the indexed column is defined as NULLable. Here's a query you can use to find all such columns:

<pre>select c.table_schema, c.table_name, c.column_name
from information_schema.columns as c
   inner join information_schema.key_column_usage using(table_schema, table_name, column_name)
where c.table_schema = 'sakila' and c.is_nullable = 'yes';
+--------------+------------+----------------------+
| table_schema | table_name | column_name          |
+--------------+------------+----------------------+
| sakila       | film       | original_language_id | 
| sakila       | payment    | rental_id            | 
+--------------+------------+----------------------+</pre>

If the column shouldn't be allowed to be NULL, make sure you specify that in the column's options! In fact, the original\_language\_id column probably *should* be defined as NULLable, but I commonly see columns defined as NULLable when they shouldn't be. The performance penalty isn't the end of the world, but it's still worth fixing.

 [1]: http://dev.mysql.com/doc/refman/5.0/en/explain.html
 [2]: http://dev.mysql.com/doc/
