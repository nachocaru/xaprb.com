---
title: How to debug InnoDB lock waits
author: Baron Schwartz
excerpt: |
  <p>This article shows you how to use a little-known InnoDB feature to find out
  what is holding the lock for which an InnoDB transaction is waiting.  I then
  show you how to use an undocumented feature to make this even easier with
  <a href="http://innotop.sourceforge.net/">innotop</a>.</p>
layout: post
permalink: /2007/09/18/how-to-debug-innodb-lock-waits/
description:
  - Shows how to find out which lock is blocking a waiting InnoDB transaction.
tags:
  - InnoDB
  - Innotop
  - monitoring
  - MySQL
  - SQL
  - transactions
---
This article shows you how to use a little-known InnoDB feature to find out what is holding the lock for which an InnoDB transaction is waiting. I then show you how to use an undocumented feature to make this even easier with [innotop][1].

### Background

One of the most common complaints I've heard from DBAs used to other database servers is "I can't find out who holds the locks that are blocking all these connections and making them time out." I feel your pain. Before I helped scale my employer's systems to deal with larger volumes of data, InnoDB lock contention was a serious issue. And as far as I knew, you couldn't find out who was holding locks. I knew you could see who was *waiting for locks to be granted*; that's easy. You just run `SHOW INNODB STATUS` and look for the following text:

<pre>------------
TRANSACTIONS
------------
Trx id counter 0 4874
Purge done for trx's n:o &lt; 0 4869 undo n:o &lt; 0 0
History list length 21
Total number of lock structs in row lock hash table 2
LIST OF TRANSACTIONS FOR EACH SESSION:
---TRANSACTION 0 4873, ACTIVE 6 sec, process no 7142, OS thread id 1141152064 starting index read
mysql tables in use 1, locked 1
<strong>LOCK WAIT</strong> 2 lock struct(s), heap size 368
MySQL thread id 9, query id 173 localhost root Sending data
select * from t1 for update
------- <strong>TRX HAS BEEN WAITING 6 SEC FOR THIS LOCK TO BE GRANTED</strong>:
RECORD LOCKS space id 9 page no 3 n bits 72 index `PRIMARY` of table `test/t1` trx id 0 4873 lock_mode X waiting
...</pre>

That's fine, but who holds the lock? I thought there was no way to find that out.

### InnoDB Lock Monitor

Until I learned about the <a href="http://dev.mysql.com/doc/en/innodb-monitor.html">InnoDB Lock Monitor</a>, that is. You enable it by running the following command:

<pre>CREATE TABLE innodb_lock_monitor(a int) ENGINE=INNODB;</pre>

It's quite an ugly hack, but it turns out the table name is actually "magical." It's a special table name that tells InnoDB to start the lock monitor. You can stop it by dropping the table again.

This little-noticed feature makes InnoDB print out a slightly modified version of what you see with `SHOW INNODB STATUS`. The "slight modification" is to print out not only the locks the transaction waits for, but also those it *holds*. For example, here's the transaction that holds the locks:

<pre>---TRANSACTION 0 4872, ACTIVE 32 sec, process no 7142, OS thread id 1141287232
2 lock struct(s), heap size 368
MySQL thread id 8, query id 164 localhost root
<strong>TABLE LOCK table `test/t1` trx id 0 4872 lock mode IX
RECORD LOCKS space id 9 page no 3 n bits 72 index `PRIMARY` of table `test/t1` trx id 0 4872 lock_mode X</strong>
Record lock, heap no 1 PHYSICAL RECORD: n_fields 1; compact format; info bits 0
 0: len 8; hex 73757072656d756d; asc supremum;;

Record lock, heap no 2 PHYSICAL RECORD: n_fields 3; compact format; info bits 0
 0: len 4; hex 80000001; asc     ;; 1: len 6; hex 000000000d35; asc      5;; 2: len 7; hex 800000002d0110; asc     -  ;;</pre>

That's fine, but there are, ah, limitations. As the manual says, InnoDB periodically prints out this text &#8212; essentially spewing InnoDB's guts &#8212; to its standard output. This gets redirected to the server error log in any sane installation. Who's looking there? And it gets printed out at long intervals, which seems to be about every 16 seconds on the machines I use.

Plus, if you've looked at the result, you'll understand this is not something you want to search through manually looking for data. The output can be absolutely huge. What DBA wants to pore over thousands of hex-dumped rows from the table just to answer the question "who holds that lock?"

All in all, this is not very convenient (yep, I know that's an understatement).

### Slightly more convenient

What's a little more convenient than combing through all that text by hand is writing a program to parse InnoDB's status output. You don't have to, though. That's what I wrote innotop to do. And I've just released version 1.5.2, which at long last has the ability to watch a log file as well as connecting to server(s).

Here's how this works: you start innotop, and press the L key to switch to Lock mode. This replaces the old Lock Wait mode, which was only able to monitor the InnoDB lock waits you see in the normal output of `SHOW INNODB STATUS`.

This mode shows you something like the following:

<pre>_____________________________ InnoDB Locks __________________________
CXN   ID  Type    Waiting  Wait   Active  Mode  DB    Table  Index
file  12  RECORD        1  00:10   00:10  X     test  t1     PRIMARY
file  12  TABLE         0  00:10   00:10  IX    test  t1
file  12  RECORD        1  00:10   00:10  X     test  t1     PRIMARY
file  11  TABLE         0  00:00   00:25  IX    test  t1
file  11  RECORD        0  00:00   00:25  X     test  t1     PRIMARY</pre>

That's helpful! I can see the locks held and waited for in a nice tabular format. It's pretty easy to see connection 11 is blocking connection 12.

This is still pretty inconvenient, though. To get access to the server's error log, I have to run innotop on the database server machine itself. Is there a better way?

### Even better

There is, in fact, but I discovered it completely by accident. It's not documented, but the extra information doesn't just get printed to the server log. It also shows up in `SHOW INNODB STATUS`! Now that's a nice surprise. It means innotop can get lock information from a normal connection instead of monitoring a log file.

After discovering this, I immediately added some more features to innotop. There are now hot-keys in L mode to enable and disable the lock monitor. Now you can press L, press the 'a' key to start the lock monitor, see what's blocking the waiting transaction, press 'o' to stop the lock monitor, and you're done.

### Best yet

I'm sure you InnoDB administrators already recognize what an improvement this is over the options you previously had (essentially, you didn't have any). There's still a long way to go, though. Locks could be in the `INFORMATION_SCHEMA` or in a `SHOW LOCKS` command. I won't speculate on why they aren't already.

Of course, the upcoming Falcon storage engine already has better features for debugging lock contention than this. But my guess is it'll be a long time before Falcon has the market share InnoDB has. All things considered, InnoDB is a pretty nice piece of software.

### Conclusion

<p class="download">
  <a href="http://code.google.com/p/innotop/">Download innotop</a>
</p>

<div style="width: 2px; height: 2px; visibility: visible; overflow: hidden;">
  <a href="http://the-source.50webs.com">the source</a>
</div>

The conclusion to this whole article is: use [innotop][1] if you use InnoDB. Heck, use it if you use MySQL at all. It makes a lot of things a lot easier, not just debugging InnoDB lock contention. Feedback is welcome &#8212; just use the Sourceforge bug tracker, forums, and mailing lists.

 [1]: http://code.google.com/p/innotop/
