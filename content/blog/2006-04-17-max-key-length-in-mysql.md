---
title: How to understand key length limitations in MySQL
date: "2006-04-17"
permalink: /2006/04/17/max-key-length-in-mysql/
---
Suppose I try to create a table with a primary key that's varchar(500), and MySQL complains the key length is longer than the maximum of 1000 bytes. 500 is less than 1000. What's happening? In this article I'll explain why I, not MySQL, am wrong. Plus, I'll show you a tasty (yet apparently harmless) bug in MySQL.

Here's a statement that will fail on my server:

<pre>create table test(c varchar(250), d varchar(250), primary key(c,d));
ERROR 1071 (42000): Specified key was too long; max key length is 1000 bytes</pre>

Why does it fail? Simple; my default character set is multi-byte:

<pre>show variables like '%char%';
+--------------------------+----------------------------+
| Variable_name            | Value                      |
+--------------------------+----------------------------+
| character_set_client     | latin1                     |
| character_set_connection | latin1                     |
| character_set_database   | utf8                       |
| character_set_filesystem | binary                     |
| character_set_results    | latin1                     |
| character_set_server     | utf8                       |
| character_set_system     | utf8                       |
| character_sets_dir       | /usr/share/mysql/charsets/ |
+--------------------------+----------------------------+</pre>

While most characters will fit in one or two bytes, the `utf8` encoding of [Unicode][1], as implemented by MySQL can require up to 3 bytes per character, so MySQL must be pessimistic and assume the worst-case scenario of every character requiring 3 bytes. It's easy to see this by trying to create a table with a single `VARCHAR(334)` primary key. It will fail, but `VARCHAR(333)` will succeed, because 3 * 333 is less than 1000 bytes.

Here's a fun bug ([bug #18927][2]):

<pre>mysql&gt; create table test(c varchar(250), d varchar(250),primary key(c,d));
ERROR 1071 (42000): Specified key was too long; max key length is 1000 bytes
mysql&gt; create table test(c varchar(334), d varchar(334), primary key(c,d));
ERROR 1071 (42000): Specified key was too long; max key length is 999 bytes</pre>

Sometimes it says 999, sometimes 1000. I have no idea why.

It may be a good idea to check the default character set to get the best performance out of a database. If there's no need for multi-byte encodings, switching to a single-byte encoding might be significantly more efficient. It's especially important to keep indexes as small as possible.

 [1]: http://www.unicode.org/
 [2]: http://bugs.mysql.com/18927
