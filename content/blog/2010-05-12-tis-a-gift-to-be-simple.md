---
title: Tis a gift to be simple
date: "2010-05-12"
permalink: /2010/05/12/tis-a-gift-to-be-simple/
categories:
  - Maatkit
  - SQL
---
I was just reading up on the [syntax for index hints in MySQL][1], and noticed this:

> An index_name value need not be a full index name. It can be an unambiguous prefix of an index name. If a prefix is ambiguous, an error occurs.
I actually prefer not to have extra "syntactic sugar" features such as this. It helps avoid bugs and unexpected behavior. Even if I don't use it intentionally, I can get bitten by it, if someone adds another index whose name has the same prefix as one that I already use:

`<pre>
mysql> create table t(a int primary key);
mysql> select * from t force index(PRIMAR);
Empty set (0.00 sec)

mysql> alter table t add key PRIMARY_2(a);

mysql> select * from t force index(PRIMAR);
ERROR 1176 (HY000): Key 'PRIMAR' doesn't exist in table 't'
</pre>` 
I actually considered adding support for prefixes of command-line options to Maatkit, once upon a time. This way you'd be able to say `--rep` instead of spelling out the full option name; some of the options are very long-winded. This is pretty standard behavior, and even the MySQL command-line tools let you do it. But I came to my senses quickly when I realized that this would never let us rest easy about backwards and forwards compatibility. Even if it weren't a potential problem, I think there are more important things to work on in Maatkit.

 [1]: http://dev.mysql.com/doc/refman/5.0/en/index-hints.html
