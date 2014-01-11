---
title: A little-known way to cause a database deadlock
  <p>A "little-known way," I claim, and yet it happens all the time -- precisely because it's little-known.  Experts will quickly recognize where I'm going to go with this article, but I hope many others in my audience will understand deadlocks more deeply after reading it.  I'll use MySQL and InnoDB for illustration purposes, but the scenario this article describes (dramatic music, please!) could happen to you, too!  And probably will someday, unless you're one of the elite few (ok, enough drama) who know how to avoid it.</p>
  
  <p>In this article I'll briefly introduce deadlocks, give an example of one that happened at my employer recently, analyze and explain it, and then disclose the secret way to <del datetime="2006-08-04T00:11:58+00:00">avoid</del> cause such deadlocks.  Then I'll show you how to reproduce the deadlock and dive into the gory details of what goes on internally with InnoDB.  I'll also demonstrate how <a href="http://www.xaprb.com/innotop/">innotop</a> can make this type of debugging a lot easier.</p>
permalink: /2006/08/03/a-little-known-way-to-cause-a-database-deadlock/
description:
  - 'Explains how the direction transactions are moving can cause them to deadlock.  Deep technical discussion of InnoDB deadlocks, including a tutorial on reading monitor text and using innotop to make the job easy.'
---
A "little-known way," I claim, and yet it happens all the time &#8212; precisely because it's little-known. Experts will quickly recognize where I'm going to go with this article, but I hope many others in my audience will understand deadlocks more deeply after reading it. I'll use MySQL and InnoDB for illustration purposes, but the scenario this article describes (dramatic music, please!) could happen to you, too! And probably will someday, unless you're one of the elite few (ok, enough drama) who know how to avoid it.

In this article I'll briefly introduce deadlocks, give an example of one that happened at my employer recently, analyze and explain it, and then disclose the secret way to <del datetime="2006-08-04T00:11:58+00:00">avoid</del> cause such deadlocks. Then I'll show you how to reproduce the deadlock and dive into the gory details of what goes on internally with InnoDB. I'll also demonstrate how [innotop][1] can make this type of debugging a lot easier.

### Introduction

First, a quick refresher: a deadlock happens when two or more transactions each hold exclusive access to something the other wants. To proceed, one of them has to yield. Since queries are only concerned with what they're doing, and like to imagine they have exclusive access to the entire database, they don't notice when they are deadlocked. Something external must check for deadlocks by looking for certain necessary and sufficient conditions (which you can look up in a textbook; I won't bore you), choosing a victim, and rolling one of the transactions back.

In short, a deadlock is a cycle of "I've got this, you have to gimme that before I'll let go of mine" locks. Thinking of it as a cycle is more than just a metaphor; detecting a cycle is how the RDBMS detects a deadlock. And it's an extremely useful thing to learn to visualize, as you'll see in a bit, because it helps you anticipate situations in your design and queries where a deadlock could occur.

### A recent example

Here's a recent example of a deadlock at my current employer:

Transaction 1 was [aggregating an atomic traffic data table][2] with a query like the following:

<pre>create temporary table cost as
   select day, client, sum(clicks), sum(cost)
      from ad_data
      where day = '2006-08-01'
      group by day, client;</pre>

Transaction 2 was inserting into that same table:

<pre>insert into ad_data(day, ad_id, client, clicks, cost)
   values('2006-08-01', 5, 1, 50, 500);</pre>

Boom! They deadlocked. Now, why would that happen? Shouldn't one of them just wait for whoever got there first?

Here's a relevant detail: the table's primary key is on `(day, ad_id)`. Can you guess what was happening? Hint: it's a trick question. I haven't told you enough yet, though you may still be able to guess.

### The full details

OK, I'll tell you. I didn't give you full details about Transaction 2. I didn't tell you that in addition to the row it was trying to insert for `ad_id` 5, it had previously inserted a row for `ad_id` 7:

<pre>insert into ad_data(day, ad_id, client, clicks, cost)
   values('2006-08-01', 7, 1, 70, 700);</pre>

To help you understand how this situation caused a deadlock, consider the following: both queries were getting locks on the primary key, which in an InnoDB table is the clustered index. The two queries were getting the locks very differently. Transaction 1 was *scanning* the index. It had to, in order to get every row for the date specified in the `WHERE` clause. And since it was selecting the data to use elsewhere, it was getting shared locks on each row it encountered, locking an entire range of the table.

By contrast, Transaction 2 was *probing into the index* with a new row, trying to find where to put it. And when it found the spot, between `ad_id` 4 and 6, it tried to insert it in the gap.

Here's the deadlock: Transaction 1 had already *scanned past that point*, locking every row along the way. If it hadn't, of course, Transaction 2 would have been able to insert the new row, and there'd be no deadlock. Additionally, we can deduce that Transaction 1 had scanned all the way to the (newly inserted) row for `ad_id` 7, and stopped there. If it hadn't, it wouldn't be waiting for anything, and again there would be no deadlock.

Transaction 1&#8242;s locks cannot allow Transaction 2 to insert the new row. If that row were inserted, Transaction 1&#8242;s sum of the data would be wrong. That's where the deadlock really comes from.

Here's a picture of the situation. Start reading at the bottom right, then go to the top left, then to the top right:

<img src="/articles/images/deadlock.png" width="400" height="102" alt="deadlock" />

### The big important point

Now we come to the important stuff, the reason I wrote this article: those transactions are working in opposite directions. Transaction 1 is working downwards through the table. Transaction 2 is working upwards. If you think about it, that's sort of cyclical, right? There's your little-known way to cause a deadlock: get two transactions working in opposite directions. That's the real secret.

This brings me to the corollary: **many deadlocks can be avoided by working in primary key order**. If Transaction 2 had done that, Transaction 1 would have had to wait at the lowest `ad_id` for which Transaction 2 had a lock, leaving the higher ranges open for Transaction 2 to work on.

Another solution for avoiding this deadlock is to have Transaction 2 commit after every single insert, but that's not efficient and probably not desirable, if it wants an entire set of data to either succeed or fail.

Regardless, if someone gives you advice not to insert in primary key order because of tree re-balancing, don't pay attention. It is much less expensive to re-balance a B-tree than to physically re-order rows on disk (you may get this advice because inserting in order is worst-case for a balanced tree, forcing the most re-balancings; but a B-tree can be re-balanced with very little work, so it's really a false economy).

### Further analysis

This deadlock was actually not that obvious to debug. It showed up in the output of `SHOW ENGINE INNODB STATUS` and took a little thought to understand, because it wasn't immediately obvious that the `INSERT` query had previously done inserts. However, with a little insight into the situation, it's not too bad to debug. It especially helps if you have tools to format the data nicely.

I'll deliberately cause this deadlock so you can see what the InnoDB monitor output looks like. Here's the setup:

<pre>create table ad_data(
   day date not null,
   ad_id int not null,
   client int not null,
   clicks int not null,
   cost int not null,
   primary key(day, ad_id)
) engine=innodb;

insert into ad_data(day, ad_id, client, clicks, cost)
   values
   ('2006-08-01', 1, 1, 10, 100),
   ('2006-08-01', 2, 1, 20, 200),
   ('2006-08-01', 3, 1, 30, 300),
   ('2006-08-01', 4, 1, 40, 400),
   ('2006-08-01', 6, 1, 60, 600);</pre>

Now open two connections to this database, and issue the following queries:

<pre>-- On connection 2
start transaction;
insert into ad_data(day, ad_id, client, clicks, cost)
   values
   ('2006-08-01', 7, 1, 70, 700);

-- On connection 1
start transaction;
create temporary table cost as
   select day, client, sum(clicks), sum(cost)
      from ad_data
      where day = '2006-08-01'
      group by day, client;

-- Connection 1 should have blocked.
-- On connection 2,
insert into ad_data(day, ad_id, client, clicks, cost)
   values
   ('2006-08-01', 5, 1, 50, 500);</pre>

I just did this, and Transaction 1 was chosen as the victim. I'm not sure if that's deterministic or not; does anyone know? I'd have to get into the InnoDB code to find out. Regardless, after doing that, here's the relevant output of `SHOW ENGINE INNODB STATUS`:

<pre>------------------------
LATEST DETECTED DEADLOCK
------------------------
060803 20:04:04
*** (1) TRANSACTION:
TRANSACTION 0 94732, ACTIVE 8 sec, process no 12585, OS thread id 1141680480 fetching rows
mysql tables in use 1, locked 1
LOCK WAIT 3 lock struct(s), heap size 368
MySQL thread id 4, query id 101 localhost baron Copying to tmp table
create temporary table cost as
   select day, client, sum(clicks), sum(cost)
      from ad_data
      where day = '2006-08-01'
      group by day, client
*** (1) WAITING FOR THIS LOCK TO BE GRANTED:
RECORD LOCKS space id 0 page no 45 n bits 80 index `PRIMARY` of table `test/ad_data` trx id 0 94732 lock mode S waiting
Record lock, heap no 7 PHYSICAL RECORD: n_fields 7; compact format; info bits 0
 0: len 3; hex 8fad01; asc    ;; 1: len 4; hex 80000007; asc     ;; 2: len 6; hex 00000001720b; asc     r ;; 3: len 7; hex 80000000320110; asc     2  ;; 4: len 4; hex 80000001; asc     ;; 5: len 4; hex 80000046; asc    F;; 6: len 4; hex 800002bc; asc     ;;

*** (2) TRANSACTION:
TRANSACTION 0 94731, ACTIVE 24 sec, process no 12585, OS thread id 1141414240 inserting, thread declared inside InnoDB 500
mysql tables in use 1, locked 1
3 lock struct(s), heap size 368, undo log entries 1
MySQL thread id 3, query id 102 localhost baron update
insert into ad_data(day, ad_id, client, clicks, cost)
   values
   ('2006-08-01', 5, 1, 50, 500)
*** (2) HOLDS THE LOCK(S):
RECORD LOCKS space id 0 page no 45 n bits 80 index `PRIMARY` of table `test/ad_data` trx id 0 94731 lock_mode X locks rec but not gap
Record lock, heap no 7 PHYSICAL RECORD: n_fields 7; compact format; info bits 0
 0: len 3; hex 8fad01; asc    ;; 1: len 4; hex 80000007; asc     ;; 2: len 6; hex 00000001720b; asc     r ;; 3: len 7; hex 80000000320110; asc     2  ;; 4: len 4; hex 80000001; asc     ;; 5: len 4; hex 80000046; asc    F;; 6: len 4; hex 800002bc; asc     ;;

*** (2) WAITING FOR THIS LOCK TO BE GRANTED:
RECORD LOCKS space id 0 page no 45 n bits 80 index `PRIMARY` of table `test/ad_data` trx id 0 94731 lock_mode X locks gap before rec insert intention waiting
Record lock, heap no 6 PHYSICAL RECORD: n_fields 7; compact format; info bits 0
 0: len 3; hex 8fad01; asc    ;; 1: len 4; hex 80000006; asc     ;; 2: len 6; hex 00000001720a; asc     r ;; 3: len 7; hex 80000000320154; asc     2 T;; 4: len 4; hex 80000001; asc     ;; 5: len 4; hex 8000003c; asc    &lt;;; 6: len 4; hex 80000258; asc    X;;

*** WE ROLL BACK TRANSACTION (1)</pre>

That's fairly verbose, because it prints information about the locks it was waiting for and holding, but that's exactly what you need to figure out what was really going on. Notice how you can see Transaction 1 waiting for exactly the same lock Transaction 2 holds. Notice also Transaction 2 locks the "rec but not gap" on that lock. That means it locks the record, as opposed to the [gap before the record][3]. You can read more about this in the MySQL manual &#8212; the entire section on InnoDB transactional model is recommended reading.

Finally, notice how Transaction 2&#8242;s waited-for lock is trying to lock the gap before the record, with intention to insert. That's what finally caused the deadlock.

If you're having a hard time "noticing" the "obvious" things I'm pointing out in that cryptic mess, read on. There is hope&#8230;

### Everything is better with innotop

As much fun as it is to squint at debugging text, it's a lot faster and easier to do this with [innotop][4]. Just look at this screenshot and you'll see what I mean. You can click through for a full-size view.

[<img src="/innotop/thumb-innotop-secret-deadlock.png" width="200" height="119" alt="innotop screenshot" />][5]

At the top of the display is a line of information about the deadlock date and time and which transaction was the victim. Below that is a table of the transactions involved, so you can find out who locked against whom.

Just below that is a table of locks held and waited for. This is where I concentrate my attention. I can see which transaction had what locks on what indexes. I can see Transaction 2 holding a lock on a record in heap 7, which Transaction 1 is waiting for. And finally, I can see Transaction 2 waiting for the gap before the record in heap 6, declaring its intent to insert into that gap.

The "heap number" is really the record number, as far as I can tell (can anyone verify this? I'm still not clear on it even after reading about page structure in the [InnoDB internals manual][6]).

At the very end of the display is the query text each transaction was executing, which is handy for obvious reasons.

All in one screen of nicely formatted text! That's so much faster and easier to understand than slogging through the InnoDB monitor output.

### Summary

You've covered a lot of material by reading this far. You've gone from the basics of deadlocks to a specific scenario, how to avoid deadlocks caused by transactions working in opposite directions, looked deep into InnoDB's internals, and learned how innotop can make your life easier by compressing and formatting the output of the InnoDB monitor. I hope you found this article useful. If you did, you should [subscribe][7] to this blog to conveniently keep up with my upcoming articles.

 [1]: http://www.xaprb.com/innotop/
 [2]: /blog/2006/07/19/3-ways-to-maintain-rollup-tables-in-sql/
 [3]: http://dev.mysql.com/doc/refman/5.0/en/innodb-next-key-locking.html
 [4]: /innotop/
 [5]: /innotop/innotop-secret-deadlock.png
 [6]: http://dev.mysql.com/doc/internals/en/innodb-page-structure.html
 [7]: /blog/subscribe/

 *[RDBMS]: Relational Database Management System
