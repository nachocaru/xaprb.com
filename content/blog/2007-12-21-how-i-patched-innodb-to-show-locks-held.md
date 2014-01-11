---
title: How I patched InnoDB to show locks held
  <p>I've written before about how to figure out <a href="http://www.xaprb.com/blog/2007/09/18/how-to-debug-innodb-lock-waits/">which connection is holding the InnoDB locks</a> for which other connections are waiting.  In other words, how to figure out who's blocking you from getting work done.  The short and sweet: turn on the InnoDB lock monitor and use <a href="http://innotop.sourceforge.net/">innotop</a> to look at the locks held and waited-for.  This has some disadvantages, so I made a patch to solve the issue the way I like it.  The result is significantly more ability to find and solve InnoDB lock wait issues.</p>
permalink: /2007/12/21/how-i-patched-innodb-to-show-locks-held/
description:
  - I patched MySQL and InnoDB to let you troubleshoot InnoDB lock contention.
tags:
  - InnoDB
  - lock contention
  - MySQL
  - patch
  - SQL
---
I've written before about how to figure out [which connection is holding the InnoDB locks][1] for which other connections are waiting. In other words, how to figure out who's blocking you from getting work done when you get InnoDB lock timeouts or other InnoDB lock contention. The short and sweet: turn on the InnoDB lock monitor and use [innotop][2] to look at the locks held and waited-for.

The InnoDB lock monitor has a few major disadvantages, though:

*   It spews InnoDB status dumps into your log files
*   It prints tons of lock information you don't want to see (it prints three lines of text for every row that's locked, each of them in several formats just in case you need it!)
*   It can be so verbose that it crowds out the rest of the InnoDB status output, or even causes you not to see anything but a single lock

Basically, it's written for the InnoDB developers, not for a MySQL DBA.

Fixing this requires changing the server and/or storage engine; there's no configuration you can change. The easiest solution, in my view, is to a) turn off the verbose output b) print the locks held by default. Sure there are better ways, such as using `INFORMATION_SCHEMA` tables, but this is by far the lowest-hanging fruit.

By the way, I think the InnoDB developers are working on exporting some status to pluggable `INFORMATION_SCHEMA` tables in future releases.

Since MySQL is Free Software, I was able to patch InnoDB and MySQL the way I want them. The patch is attached to my [feature request for fixing InnoDB lock output][3]. It's unlikely to be included in the MySQL server itself, but perhaps it'll help someone else too.

With this patch, you get two new server variables, which you can set in either your `my.cnf` file, or dynamically via SET GLOBAL. By default, they are as follows:

<pre>mysql> show variables like 'innodb_show%';
+---------------------------+-------+
| Variable_name             | Value |
+---------------------------+-------+
| innodb_show_locks_held    | 10    | 
| innodb_show_verbose_locks | 0     | 
+---------------------------+-------+</pre>

The first is the number of locks to print for each transaction. The second is whether to print the verbose record dumps for each lock. (My advice is to leave the second variable at 0).

Now when you run `SHOW INNODB STATUS`, you'll see something like the following in the TRANSACTIONS section:

<pre>---TRANSACTION 0 268216580, ACTIVE 27 sec, process no 16382, OS thread id 2424191888
2 lock struct(s), heap size 320
MySQL thread id 8, query id 949 localhost 192.168.0.5 xaprb
TABLE LOCK table `test/t1` trx id 0 268216580 lock mode IX
RECORD LOCKS space id 0 page no 2670602 n bits 72 index `PRIMARY` of table `test/t1` trx id 0 268216580 lock_mode X locks rec but not gap</pre>

I caused that output by doing a `SELECT FOR UPDATE` query on an InnoDB table in a transaction.

If this were all I did, it would still be a big help in figuring out who's blocking whom. But I also made [innotop][2] smarter to take advantage of the new output. Now it aggregates locks held and waited-for in L mode, so you can see very quickly "something is waiting for a lock on this table, and something else has a lock on the same table." This works fine even when you haven't applied my patch, but my patch lets you debug lock waits much more cleanly.

And as a bonus, it'll prevent your `SHOW INNODB STATUS` from being completely overwritten when you have a big deadlock.

All in all, it's been a huge relief to have this applied to the servers I manage. Sometimes InnoDB's status output used to drive me nuts. I stopped complaining and did something about it!

 [1]: http://www.xaprb.com/blog/2007/09/18/how-to-debug-innodb-lock-waits/
 [2]: http://code.google.com/p/innotop/
 [3]: http://bugs.mysql.com/bug.php?id=29126
