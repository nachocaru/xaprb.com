---
title: Timing queries in the 21st century
author: Baron Schwartz
layout: post
permalink: /2011/02/07/timing-queries-in-the-21st-century/
categories:
  - SQL
---
What is wrong with the following?

<pre>mysql&gt; select 'hello world';
+-------------+
| hello world |
+-------------+
| hello world | 
+-------------+
1 row in set (0.00 sec)
</pre>

Centisecond resolution for query times belongs to the last century. I want at least millisecond resolution &#8212; microsecond is better. Fortunately, this is as simple as changing a printf format specifier in the mysql client program.

**Edit**: I thought that maybe I could fix this by changing the printf format specifier with sed, but it looks like I was wrong:

<pre>$ sed -e 's/%\.2f sec/%.6f sec/' bin/mysql &gt; bin/mysql-precision</pre>

Now when I enter commands, I actually do see 6 digits after the decimal point, but it looks like I still get only 2 digits of precision:

<pre>mysql> select sleep(.009);
+-------------+
| sleep(.009) |
+-------------+
|           0 |
+-------------+
1 row in set (0.010000 sec)
mysql> select sleep(.0001);
+--------------+
| sleep(.0001) |
+--------------+
|            0 |
+--------------+
1 row in set (0.000000 sec)
</pre>

Alas, elsewhere in the code I now see that times() is used for timing, rather than a higher-resolution mechanism such as gettimeofday(). Bummer &#8212; I thought the sed trick could be such a neat hack.