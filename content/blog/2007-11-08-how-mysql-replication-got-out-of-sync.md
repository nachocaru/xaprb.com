---
title: How MySQL replication got out of sync
author: Baron Schwartz
excerpt: |
  <p>I created <a href="http://mysqltoolkit.sourceforge.net/">MySQL Table Checksum</a> because I was certain replication slaves were slowly drifting out of sync with their masters, and there was no way to prove it.   Once I could prove it, I was able to show that replication gets out of sync for lots of people, lots of times.  (If you really want to hear war stories, you should probably talk to one of the MySQL support staff or consulting team members; I'm sure they see this a lot more than I do).</p>
  
  <p>I finally figured out what was causing one of my most persistent and annoying out-of-sync scenarios.  It turns out to be nothing earth-shaking; it's just an easy-to-overlook limitation of statement-based replication.  You could call it a bug, but as far as I can see, there's no way to fix it with statement-based replication.  (I'd love to be proven wrong).  Read on for the details.</p>
layout: post
permalink: /2007/11/08/how-mysql-replication-got-out-of-sync/
description:
  - Why MySQL replication gets out of sync on the slave
tags:
  - checksums
  - MySQL
  - queue
  - replication
  - slave corruption
  - SQL
---
I created [MySQL Table Checksum][1] because I was certain replication slaves were slowly drifting out of sync with their masters, and there was no way to prove it. Once I could prove it, I was able to show that replication gets out of sync for lots of people, lots of times. (If you really want to hear war stories, you should probably talk to one of the MySQL support staff or consulting team members; I'm sure they see this a lot more than I do).

I finally figured out what was causing one of my most persistent and annoying out-of-sync scenarios. It turns out to be nothing earth-shaking; it's just an easy-to-overlook limitation of statement-based replication. You could call it a bug, but as far as I can see, there's no way to fix it with statement-based replication. (I'd love to be proven wrong). Read on for the details.

### The setup

Here's the table I saw getting out of sync, usually within hours of being synced:

<pre>CREATE TABLE `workpriority` (
  `client` smallint(5) unsigned NOT NULL,
  `workunit` bigint(20) NOT NULL,
  `priority` float NOT NULL,
  `processor` int unsigned NOT NULL default '0',
  PRIMARY KEY  (`client`,`workunit`),
  KEY `priority` (`priority`),
  KEY `processor` (`processor`,`priority`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1</pre>

This table is essentially a queue of work that needs to be done, along with the priority of each item (`workunit` refers to another table, where the application retrieves the work to do). Applications work against this table in parallel. They run an `UPDATE` statement to claim some work for themselves, then fetch the rows the statement affected. To avoid any race conditions, the "token" is the result of the `CONNECTION_ID()` function. Here's the statement:

<pre>update workpriority as p
   inner join (
      select client, workunit
      from workpriority
      where processor = 0
      order by priority desc
      limit 10
   ) as chosen using(client, workunit)
   set p.processor = $cxn_id;</pre>

The nested `SELECT` statement finds 10 unclaimed (`processor = 0`) rows in order of descending priority. The outer `UPDATE` statement claims these rows by setting `processor` to `CONNECTION_ID()`.

Now the application can find out what work it claimed with a simple `SELECT` with the token in the `WHERE` clause. Later, after the application processes each row, it issues the following statement to clean out the table:

<pre>delete from workpriority where client = ? and workunit = ? and processor = ?;</pre>

### The problem

The problem seemed to be that some binary log events were not getting replayed on the slave. This table accumulated extra rows on the slaves, as though the DELETE statements weren't getting to the slaves. To test this, I compared the logs and determined that it's not a logging issue; the binary log events are getting to the slave and replaying just fine. I can see them in the slave's relay log and in the slave's binary log (I have `log_slave_updates` enabled).

So if that's not the problem, what is?

### The bug

I already showed you the bug. If you didn't see it, well, neither did I &#8212; for a year.

If you still don't see it, here's a hint: the slaves get out of sync in totally different ways. In other words, the slaves don't even match each other after a little while.

The problem is that `ORDER BY... LIMIT` is non-deterministic. If several rows are tied for priority, the slaves might (and do!) order them differently than the master did. Then the the `UPDATE` statement claims different rows on the slaves. Some rows that have been claimed on the master are still marked as 0 on the slave. Then they don't get deleted by the DELETE statement. I was able to confirm this by running a script that does a checksum on this table every few minutes, then as soon as it finds differences dumps the whole table on both the master and the slave. I was able to find some rows that the application hadn't deleted yet. Sure enough, some of them weren't claimed on the slave.

### The fix

Very simple: resolve the ties. The query now causes a filesort because it can't use the index to sort, but it's not that big a table and this query doesn't run that often. Here's the fixed query:

<pre>update workpriority as p
   inner join (
      select client, workunit
      from workpriority
      where processor = 0
      order by priority desc, workunit
      limit 10
   ) as chosen using(client, workunit)
   set p.processor = $cxn_id;</pre>

This limitation of statement-based replication is so basic and simple, and I've known about it for a long time, but it's so innocuously hidden in plain sight that it took me forever to see it.

 [1]: http://code.google.com/p/maatkit/
