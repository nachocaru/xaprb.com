---
title: Introducing MySQL Table Maintainer
author: Baron Schwartz
excerpt: "<p>MySQL Table Maintainer is a new utility to help you run table maintenance commands (ANALYZE, CHECK, OPTIMIZE, REPAIR) on your MySQL tables.  It's part of the MySQL toolkit.</p>"
layout: post
permalink: /2007/03/25/introducing-mysql-table-maintainer/
description:
  - >
    MySQL Table Maintainer makes it convenient to run complex maintenance jobs, such
    as ANALYZE, CHECK, OPTIMIZE and REPAIR.
---
<p class="download">
  <a href="http://code.google.com/p/maatkit">Download MySQL Table Maintainer</a>
</p>

MySQL Table Maintainer is a new utility to help you run table maintenance commands (ANALYZE, CHECK, OPTIMIZE, REPAIR) on your MySQL tables. It's part of the MySQL toolkit.

### Overview

This tool is designed to help you run maintenance commands on your MySQL tables. There is a MySQL-provided tool ([myisamchk][1]) that fills some of the same purposes, but there are important advantages to doing it with SQL commands instead. Unlike using myisamchk, you don't have to ensure this tool has exclusive access to the tables! Plus, MySQL Table Maintainer gives you lots of options, such as the ability to

*   Check first, then repair if anything is wrong
*   Check tables before optimizing them, and skip if they have problems
*   Do tables based on storage engine, size, age, time since last checking/optimizing etc&#8230; am I missing anything?
*   Compact repeated output, and add table status information to help you understand what's happening
*   Prevent or allow the statements to go into the binlog so they get executed on slave servers
*   Do (or don't do) views as well

Here's sample output:

<pre>$ mysql-table-maintainer -ac
DATABASE TABLE                   ENGINE    SIZE   ROWS OP       TYPE     CNT TIME MSG
test     __cmp006arz0EZC992_d__0 InnoDB   32.0k  94.0  analyze  status     1    0 OK
test     __cmp006arz0EZC992_d__0 InnoDB   32.0k  94.0  check    status     1    0 OK
test     __cmp006arz0EZC992_d__1 InnoDB   32.0k  16.0  analyze  status     1    0 OK
test     __cmp006arz0EZC992_d__1 InnoDB   32.0k  16.0  check    status     1    0 OK
test     __cmp006arz0EZC992_d__2 InnoDB   32.0k   1.0  analyze  status     1    0 OK
test     __cmp006arz0EZC992_d__2 InnoDB   32.0k   1.0  check    status     1    0 OK
test     __cmp006arz0EZC992_d__3 InnoDB   32.0k   4.0  analyze  status     1    0 OK
test     __cmp006arz0EZC992_d__3 InnoDB   32.0k   4.0  check    status     1    0 OK
test     __cmp006arz0EZC992_d__4 InnoDB   32.0k   1.0  analyze  status     1    0 OK
test     __cmp006arz0EZC992_d__4 InnoDB   32.0k   1.0  check    status     1    0 OK
test     __cmp006arz0EZC992_s__0 InnoDB   32.0k  94.0  analyze  status     1    0 OK
test     __cmp006arz0EZC992_s__0 InnoDB   32.0k  94.0  check    status     1    0 OK
test     __cmp006arz0EZC992_s__1 InnoDB   32.0k  16.0  analyze  status     1    0 OK
test     __cmp006arz0EZC992_s__1 InnoDB   32.0k  16.0  check    status     1    1 OK
test     __cmp006arz0EZC992_s__2 InnoDB   32.0k   1.0  analyze  status     1    0 OK
test     __cmp006arz0EZC992_s__2 InnoDB   32.0k   1.0  check    status     1    0 OK
test     __cmp006arz0EZC992_s__3 InnoDB   32.0k   4.0  analyze  status     1    0 OK
test     __cmp006arz0EZC992_s__3 InnoDB   32.0k   4.0  check    status     1    0 OK
test     __cmp006arz0EZC992_s__4 InnoDB   32.0k   1.0  analyze  status     1    0 OK
test     __cmp006arz0EZC992_s__4 InnoDB   32.0k   1.0  check    status     1    0 OK
test     bighist                 InnoDB   66.1M 490.4k analyze  status     1    0 OK
test     bighist                 InnoDB   66.1M 490.4k check    status     1   14 OK
test     deadlocks               InnoDB   16.0k   2.0  analyze  status     1    0 OK
test     deadlocks               InnoDB   16.0k   2.0  check    status     1    0 OK
test     foo                     MyISAM    0.0    0.0  analyze  status     1    0 Table is already up to date
test     foo                     MyISAM    0.0    0.0  check    status     1    0 OK
test     smallhist2              InnoDB   32.0k  89.0  analyze  status     1    0 OK
test     smallhist2              InnoDB   32.0k  89.0  check    status     1    0 OK</pre>

### How this is different from myisamchk

This tool is different from myisamchk, and is therefore needed (I hate writing tools that have already been written!) because it does the job online, without taking your server offline or locking tables. You have to be careful with myisamchk. From the manual:

<blockquote cite="http://dev.mysql.com/doc/refman/5.0/en/myisamchk.html">
  <p>
    <strong>Important</strong>
  </p>
  
  <p>
    You must ensure that no other program is using the tables while you are running myisamchk. The most effective means of doing so is to shut down the MySQL server while running myisamchk, or to lock all tables that myisamchk is being used on&#8230; However, the easiest way to avoid this problem is to use CHECK TABLE instead of myisamchk to check tables.
  </p>
</blockquote>

There are also implications for fulltext indexes and so on. Of course there are times when you need to use myisamchk, especially when you are repairing corrupted tables, but this tool will probably be more convenient for many users.

### It sure is handy

I wrote this tool because one of my employer's replicated InnoDB clusters was looking a little fragmented, probably because of archiving. It took a couple evenings to write the tool, but yesterday I connected to the office and ran it with the &#8211;checkoptimize option. We got great results. As I suspected, the tables were fragmented, and the heavily archived tables shrunk by 25% or more. As a bonus, we now have a lot more free space in that InnoDB tablespace.

### About MySQL Toolkit

[MySQL Toolkit][2] is a set of essential tools for MySQL users, developers and administrators. The project's goal is to make high-quality command-line tools that follow the UNIX philosophy of doing one thing and doing it well. They are designed for scriptability and ease of processing with standard command-line utilities such as `awk` and `sed`. Other tools in the toolkit include a table checksummer and a duplicate key checker.

 [1]: http://dev.mysql.com/doc/refman/5.0/en/myisamchk.html
 [2]: http://code.google.com/p/maatkit
