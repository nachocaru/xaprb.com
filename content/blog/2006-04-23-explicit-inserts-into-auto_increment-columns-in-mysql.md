---
title: How MySQL decides to AUTO_INCREMENT a value
date: "2006-04-23"
permalink: /2006/04/23/explicit-inserts-into-auto_increment-columns-in-mysql/
description:
  - >
    Explains how MySQL decides whether to generate an AUTO_INCREMENT value for a
    row, and how to avoid the confusing behavior that results.
---
It is possible to explicitly insert values into an `AUTO_INCREMENT` in MySQL, but sometimes these inserts cause confusing behavior. In this article I'll explain that behavior.

### Background

Suppose I have the following table:

<pre>create table number (
    number int not null auto_increment primary key
) ;</pre>

Now suppose I insert some values into the primary key explicitly, bypassing the `AUTO_INCREMENT` feature:

<pre>insert into number(number) values (-100);
select * from number;
+--------+
| number |
+--------+
| -100   |
+--------+</pre>

So far, so good. Now, I'll try to insert the value 0:

<pre>insert into number(number) values (0);
select * from number;
+--------+
| number |
+--------+
| -100   |
| 1      |
+--------+</pre>

Why is the value 1? It turns out that, by default, MySQL generates the next AUTO_INCREMENT value for the column when either `NULL` or 0 is inserted. The next value is *not* the maximum value plus one; it is the next value larger than an internal counter MySQL maintains, which starts at 0 by default.

This can be configured. It's possible to set the [NO\_AUTO\_VALUE\_ON\_ZERO][1] so it allows explicitly inserted zero values, as follows: <blockquote cite="http://dev.mysql.com/doc/refman/5.0/en/server-sql-mode.html">
  <p>
    NO_AUTO_VALUE_ON_ZERO affects handling of AUTO_INCREMENT columns. Normally, you generate the next sequence number for the column by inserting either NULL or 0 into it. NO_AUTO_VALUE_ON_ZERO suppresses this behavior for 0 so that only NULL generates the next sequence number.
  </p>
</blockquote>

The MySQL manual also has more detailed information on [`AUTO_INCREMENT` behavior][2].

 [1]: http://dev.mysql.com/doc/refman/5.0/en/server-sql-mode.html
 [2]: http://dev.mysql.com/doc/refman/5.0/en/example-auto-increment.html
