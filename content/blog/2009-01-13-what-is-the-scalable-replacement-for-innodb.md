---
title: What is the scalable replacement for InnoDB?
date: "2009-01-13"
url: /blog/2009/01/13/what-is-the-scalable-replacement-for-innodb/
categories:
  - Databases
---
A while back a Sun engineer posted an [article][1] claiming that the best way to scale MySQL is to shard your database in many instances on a single server, each of which runs in threads that individually have low performance. The Sun way has always been to get high throughput with high latency. And that's fine. [Others have commented on the real-world applicability][2] of this technique with MySQL, so I won't.

But what I'm interested in is something the author says in the comments of his own blog post:

> btw; we are working on a scalable replacement of InnoDB. Stay tuned....

What is it?

Surely it's not Falcon. MySQL and Sun have said many times [Falcon isn't meant to be an InnoDB replacement][3].

The next question: how should we interpret the word "scalable" given the context? Clearly there's a difference of opinion between MrBenchmark and others on what that word means. So what will the scaling characteristics of this InnoDB replacement really be?

*The following is a joke, not meant to be taken seriously*: Maybe it will be MyISAM with a fix to the [key buffer scalability problems][4]. Start with your database with 50 tables. Make 1 million databases, each with the same 50 tables, and you can scale up to 1 million rows by putting 1 row in each table. Ta-da! Row-level locking with MyISAM!

But seriously, what is it?

 [1]: http:/http://www.xaprb.com/blogs.sun.com/mrbenchmark/entry/scaling_mysql_on_a_256
 [2]: http://www.mysqlperformanceblog.com/2008/11/11/scaling-to-256-way-the-sun-way/
 [3]: http://www.google.com/search?q=falcon+innodb+replace
 [4]: http://www.mysqlperformanceblog.com/2008/11/26/using-multiple-key-caches-for-myisam-scalability/
