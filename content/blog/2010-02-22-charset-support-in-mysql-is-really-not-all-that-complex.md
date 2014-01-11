---
title: Charset support in MySQL is really not all that complex
author: Baron Schwartz
layout: post
permalink: /2010/02/22/charset-support-in-mysql-is-really-not-all-that-complex/
categories:
  - SQL
tags:
  - charset
  - collation
  - latin1
  - MySQL
  - utf8
---
The headline is flame-bait, don't take it. I just wanted to point something out about character sets and collations in MySQL.

To the uninitiated, it may seem overwhelming. Everything has a character set! Everything has a collation! And they act weirdly! The server has one. The database has one (oh, and it changes magically as I USE different databases.) Every table has one, and columns too. Is that all? NO! My connection has one! Kill me now!

Relax. In truth, only *one kind of thing* actually has a charset/collation. That is *values*. And values are stored in columns. *The only thing that really has a charset/collation is a column*.[1]

What about all the rest of those things &#8212; connection, database, server, table? Those are just defaults, which determine what charset/collation a value gets if it isn't overridden. So if the table's default charset is utf8, and you add a column without saying what it should be &#8212; why, it'll be utf8. If the database's default is latin1 and you add a table without saying what its default should be, it'll be latin1.

[1] It's not quite true. Literal values in SQL statements are values too, as are @user_variables. But if your connection's charset is latin1 and you say `SELECT "xaprb"`, without an explicit *introducer*, you're really saying `SELECT _latin1 "xaprb"`. Again, the only thing that really *has* a charset/collation is a value. Other things are just defaults.
