---
title: Sanity-check features in MySQL
author: Baron Schwartz
layout: post
permalink: /2009/12/25/sanity-check-features-in-mysql/
categories:
  - SQL
tags:
  - MySQL
---
MySQL has a couple of sanity-check features to help keep you from doing dumb things.

*   [max\_join\_size][1] is a configuration option for the mysqld server program. It throws an error if you write a query that the optimizer estimates will examine more than this number of rows.
*   [&#8211;safe-updates][2] is a command-line option to the mysql client program. It throws an error if you write an UPDATE or DELETE without a) a WHERE clause that refers to an indexed column or b) a LIMIT clause. It also sets the max\_join\_size and select_limit variables.

The &#8211;safe-updates mysql client option actually sets three variables server-side. Let's see the effects. First, the defaults:

`<pre>
$ mysql -e 'select @@sql_safe_updates, @@sql_select_limit, @@sql_max_join_size\G'
*************************** 1. row ***************************
 @@sql_safe_updates: 0
 @@sql_select_limit: -1
@@sql_max_join_size: -1
</pre>` 
With &#8211;safe-updates we get different results:

`<pre>
$ mysql --safe-updates -e 'select @@sql_safe_updates, @@sql_select_limit, @@sql_max_join_size\G'
*************************** 1. row ***************************
 @@sql_safe_updates: 1
 @@sql_select_limit: 1000
@@sql_max_join_size: 1000000
</pre>` 
The following demonstrates what happens if you now try to do something silly that might be expensive or dangerous:

`<pre>
mysql> create table t(a int primary key, b int);
Query OK, 0 rows affected (0.01 sec)

mysql> delete from t;
ERROR 1175 (HY000): You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column
mysql> delete from t where b = 5;
ERROR 1175 (HY000): You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column
mysql> delete from t where a = 5;
Query OK, 0 rows affected (0.01 sec)
</pre>` 
Alas, you can't set sql\_select\_limit or sql\_safe\_updates through the server configuration file (my.cnf or my.ini) directly. But you can do that through the [init_connect][3] directive.

 [1]: http://dev.mysql.com/doc/refman/5.1/en/server-system-variables.html#sysvar_max_join_size
 [2]: http://mysql.openmirrors.org/doc/refman/5.1/en/safe-updates.html
 [3]: http://dev.mysql.com/doc/refman/5.1/en/server-system-variables.html#sysvar_init_connect
