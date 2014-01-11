---
title: Formatting mysqladmin extended-status nicely
author: Baron Schwartz
layout: post
permalink: /2009/04/11/formatting-mysqladmin-extended-status-nicely/
categories:
  - Coding
  - SQL
  - Tools
tags:
  - mext
  - MySQL
  - Ryan Lowe
---
I always say that the ultimate MySQL tuning script is an expert human. To that end, I generally try to build tools that help a human be more productive with the raw information from MySQL. One of the things [we look at during a performance audit][1] is the MySQL status counters. It&#8217;s useful to look at a) absolute values and b) several incremental snapshots. I&#8217;ve written a small shell script called &#8220;mext&#8221; that can make this a little easier.

It looks like this:

<pre>baron@kanga:~$ mext -- mysqladmin ext -ri1 -c3
Aborted_clients                               1      0      0
Aborted_connects                              0      0      0
Binlog_cache_disk_use                         0      0      0
Binlog_cache_use                              0      0      0
Bytes_received                             1167     35     35
Bytes_sent                                38926   6337   6337
....
</pre>

This isn&#8217;t an original idea. Ryan Lowe made a Perl version of this first. I used his version for a while, but after working on a few machines that didn&#8217;t have the necessary Perl libraries (maybe one of them didn&#8217;t even have Perl, I forget) I decided to do it in shell.

There&#8217;s an added feature. It&#8217;ll do incremental/differential/relative output for you. The mysqladmin that ships with MySQL 5.1 has a [bug that stops it from iterating with -r][2]. So the script I wrote can accept a -r option, which can then be left off the arguments to mysqladmin:

<pre>baron@kanga:~$ mext -r -- mysqladmin ext -i1 -c3
</pre>

It&#8217;s kind of a generic tool that you could use with other things besides mysqladmin, but it&#8217;s also kind of tweaked for that purpose. You can [get mext here][3].

 [1]: http://www.mysqlperformanceblog.com/2008/11/24/how-percona-does-a-mysql-performance-audit/
 [2]: http://bugs.mysql.com/bug.php?id=40395
 [3]: http://www.xaprb.com/mext