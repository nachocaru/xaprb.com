---
title: How to deliberately cause a deadlock in MySQL
date: "2006-08-08"
permalink: /2006/08/08/how-to-deliberately-cause-a-deadlock-in-mysql/
categories:
  - Databases
---
Why would you ever want to deliberately cause a deadlock? Sometimes a very large deadlock in MySQL will fill the output of `SHOW ENGINE INNODB STATUS` until it truncates, so you can't see information about transactions, log and I/O, buffers, and so forth. I know only two solutions to this problem: 1) restart MySQL and 2) cause a small deadlock so the `LAST DETECTED DEADLOCK` section shrinks to an acceptable size. In this article I'll show you how to cause a small deadlock, and how to use [innotop][1] to do it more easily.

This article is part of a series on how to use [innotop][1] to make your life easier.

### How to cause a small deadlock

Since the only purpose of causing a deadlock is to shrink the InnoDB monitor's text, the deadlock you're going to create needs to be small and low-impact. In other words, you don't want it to involve many resources, and you don't want it to involve resources anyone else is using. The solution I use is to create a new table just for this purpose, and only put as much data in it as needed. In fact, you only need a one-column, one-row table, but for reasons I'll get to later, it's easier to do two rows.

First, choose an unused table name. I'll use `test.innodb_deadlock_maker`. Here are the statements you need to execute:

<pre>create table test.innodb_deadlock_maker(a int primary key) engine=innodb;
insert into test.innodb_deadlock_maker(a) values(0), (1);</pre>

Now the table and its data are set up. Next, execute the following on two different connections:

<pre>-- connection 0
set transaction isolation level serializable;
start transaction;
select * from test.innodb_deadlock_maker where a = 0;
update test.innodb_deadlock_maker set a = 0 where a &lt;&gt; 0;

-- connection 1
set transaction isolation level serializable;
start transaction;
select * from test.innodb_deadlock_maker where a = 1;
update test.innodb_deadlock_maker set a = 1 where a &lt;&gt; 1;</pre>

*Voila*, you have a deadlock. Notice how connection 0 and connection 1 run the same statements, except they use a different value in their `WHERE` and `SET` clauses. This makes it easy to write a program to run these statements, and just pass in a value each connection should use.

### The easy way: use innotop

I wrote a feature in innotop to do exactly what I just explained above. In fact, [innotop][2] will detect when the InnoDB's monitor text is truncated, and suggest you "clear deadlocks" to solve it. "Clearing deadlocks" may not be the best term, because it just means "cause a small one." Regardless, it's very easy to do.

Just start innotop and enter InnoDB Deadlock mode with the "D" key, then press the "w" key to "wipe" the big deadlock out of InnoDB's memory. You'll see innotop fork off two child processes to create two connections to the database and run the above statements. In a matter of seconds, you'll have your InnoDB monitor text back.

[<img src="/innotop/thumb-innotop-wipe-deadlock.png" width="200" height="94" alt="innotop screenshot" />][3]

You might want to save the current deadlock information for further study before you do this. Just use the "u" key to dump the entire InnoDB monitor content to a file.

If you need to use a different table for the deadlock, you can edit the configuration value `dl_table`, either online with the '$' key, or by editing innotop's configuration file directly.

### A fun distraction: deadlock golf

Programmers sometimes play "golf" in their language, by seeing how few strokes they need to solve some problem. How small can you make your deadlock? It's not hard to cause a deadlock on a single-row table in just three statements, assuming `AutoCommit` is 0. Starting with the same table structure as above, but with no rows in the table:

<pre>-- Connection 0
insert into test.innodb_deadlock_maker values(1);

-- Connection 1
select * from test.innodb_deadlock_maker for update;

-- Connection 0
insert into test.innodb_deadlock_maker values(0);</pre>

This trick works because of the same principle I explained in a [previous article on deadlocks][4]. The statements are asymmetrical, so it's not the method I use for innotop, but I think it's a minimal deadlock. I can't think of a way to prove it formally, but I don't think you can do it in less than three statements.

### Summary

In this article I've explained how you can create a small, low-impact deadlock that doesn't tie up important resources, for the purpose of freeing up other important resources (namely, status and debugging information). I showed you how [innotop][2] &#8212; a program that cares a lot about that status information &#8212; has a built-in function to do this for you easily. And I showed you what I think is the minimal possible deadlock.

If this article is useful to you, [subscribe][5] to receive updates free and conveniently.

 [1]: http://www.xaprb.com/innotop/
 [2]: /innotop/
 [3]: /innotop/innotop-wipe-deadlock.png
 [4]: /blog/2006/08/03/a-little-known-way-to-cause-a-database-deadlock/
 [5]: /blog/subscribe/
