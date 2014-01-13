---
title: Version 3.0 of mysqlreport released
date: "2006-12-08"
permalink: /blog/2006/12/08/version-30-of-mysqlreport-released/
categories:
  - Databases
---
Daniel Nichter has released version 3.0 of [mysqlreport][1], one of my favorite tools for quickly comprehending the overall state of a MySQL server. The new version prints out the most important information about InnoDB.

It looks like this:

<pre>$ perl mysqlreport --innodb-only
MySQL 5.0.26-standard-l  uptime 3 9:57:51       Fri Dec  8 17:29:07 2006

__ InnoDB Buffer Pool __________________________________________________
Usage           1.25G of   1.25G  %Used: 100.00
Read ratio      0.002
Pages
  Free              1            %Total:   0.00
  Data         78.94k                     96.37 %Drty:   0.01
  Misc           2976                      3.63
  Latched           0                      0.00
Reads           3.47G   11.7k/s
  From file     6.30M    21.4/s            0.18
  Ahead Rnd    216772     0.7/s
  Ahead Sql    181211     0.6/s
Writes        811.05M    2.7k/s
Flushes         4.16M    14.1/s
Wait Free           0       0/s

__ InnoDB Lock _________________________________________________________
Waits             680     0.0/s
Current             0
Time acquiring
  Total        492478 ms
  Average         724 ms
  Max            5182 ms</pre>

As always, very helpful&#8230; just the facts, nothing more. I have 1.25 GB of buffer pool, 100% used, very small percentage of dirty pages, etc etc. You can see it all at a glance.

It pulls the data from `SHOW STATUS`, which means it only works on newer versions of MySQL. Those variables are available in 5.0.3 and later, if memory serves me.

 [1]: http://www.hackmysql.com/mysqlreport
