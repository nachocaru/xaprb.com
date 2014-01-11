---
title: How to monitor InnoDB lock waits
author: Baron Schwartz
excerpt: '<p>This is one in a series of articles on how to use the <a href="http://www.xaprb.com/innotop/">innotop</a> MySQL and InnoDB monitor.  In this article I show how <code>innotop</code> can display locks that are causing a transaction to wait.</p>'
layout: post
permalink: /2006/08/02/how-to-monitor-innodb-lock-waits/
description:
  - >
    Shows how the innotop MySQL and InnoDB monitor makes it easy to identify where
    lock waits are coming from.
---
This is one in a series of articles on how to use the [innotop][1] MySQL and InnoDB monitor. In this article I show how `innotop` can display locks that are causing a transaction to wait.

First, the background. The output of `SHOW ENGINE INNODB STATUS`&#8216;s transaction section prints InnoDB transactions, including information about the locks they&#8217;re waiting for, if any:

<pre>---TRANSACTION 0 93789797, ACTIVE 20 sec, process no 9537, OS thread id 38900535
9 starting index read
mysql tables in use 1, locked 1
LOCK WAIT 2 lock struct(s), heap size 320
MySQL thread id 23733, query id 194861215 worker 192.168.0.31 xaprb Updating
update test.test set a = 1 where a = 2
------- TRX HAS BEEN WAITING 20 SEC FOR THIS LOCK TO BE GRANTED:
RECORD LOCKS space id 0 page no 299998 n bits 200 index `PRIMARY` of table `test/test` trx id 0 93789797 lock_mode X locks rec but not gap waiting
Record lock, heap no 77 PHYSICAL RECORD: n_fields 15; compact format; info bits 0
[... a bunch of record dump information omitted here ...]</pre>

The important information there is the line beginning RECORD LOCKS. It, together with the line above it, tells what the transaction is waiting for, and for how long.

`innotop` parses this information and formats it for easier comprehension. It&#8217;s possible to see which transactions are waiting by using the &#8220;T&#8221; key to enter InnoDB Transaction mode, and filtering or sorting away all transactions whose &#8220;lock\_wait\_time&#8221; is zero. You&#8217;d use a similar set of steps as I described in my [previous article on finding who locks a table][2].

While this technique will show you which transactions are waiting, it won&#8217;t show you what they&#8217;re waiting for. If you have a high-concurrency environment, or if you just have a lot of table or index scans, you might see lots of transactions waiting for locks. Maybe you have a bunch of things being locked for a long time, in many different tables and indexes (not likely, or your server would probably be totally crippled). Or, more likely, there are just a few log-jams causing many transactions to wait. This could be due to bad database architecture, not a fast enough machine, badly written queries, or many other factors. You should be suspicious of badly written queries and badly designed tables first, unless you already know that&#8217;s not the problem. That&#8217;s why you need to know what everything is blocked on, and then examine the queries that use it.

For that reason, I created a separate display mode for `innotop` (new in version 0.1.128), specifically to show information about lock waits. You enter that mode with the &#8220;W&#8221; key, and it looks like the following screenshot (click through for a larger image):

[<img src="/innotop/thumb-innotop-lock-wait-mode.png" alt="innotop screenshot" width="200" height="139" />][3]

By default it&#8217;s a pretty terse display, for the reasons I mentioned above. It doesn&#8217;t show a lot of information about the transactions; just the connection ID and some information about what it&#8217;s waiting for. If you want to see what the connection is doing, you can toggle back to &#8220;T&#8221; or &#8220;Q&#8221; mode and get more details, including running `EXPLAIN` on the query (more about that in future articles). There is also more information that&#8217;s hidden by default. You can press &#8220;c&#8221; to choose the columns you want to view.

This is one method to identify the resources that are most often locked, but as always, I&#8217;m curious to hear other ideas.

 [1]: http://www.xaprb.com/innotop/
 [2]: /blog/2006/07/31/how-to-analyze-innodb-mysql-locks/
 [3]: /innotop/innotop-lock-wait-mode.png