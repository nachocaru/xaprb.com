---
title: MySQL Conference and Expo 2007, Day 1
author: Baron Schwartz
excerpt: |
  <p><a href="http://www.mysqlconf.com/"><img style="float:right; margin-left: 15px" src="http://conferences.oreillynet.com/images/mysqluc2007/banners/speakers/120x240.jpg" width="120" height="240" alt="Speaker at MySQLConf 2007" /></a>
  <p>In my first day at the <a href="http://www.mysqlconf.com/">MySQL Conference and Expo 2007</a>, I attended the <a href="http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/10893">Scaling and High Availability Architectures</a> tutorial in the morning, and <a href="http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/12080">Real-world MySQL Performance Tuning</a> in the afternoon.  This is a brief article on each session's Big Ideas, and a short blurb about the conference overall so far.</p>
  
  <p>I'll also be involved in at least three sessions at the conference, and I describe them.</p>
  
  <p>If you're interested in short overviews of the sessions I attend, keep watching for my articles.  I will give you each session's major ideas instead of writing stream-of-thought notes.  You can look at the presenter's slides for more.</p>
layout: post
permalink: /2007/04/23/mysql-conference-and-expo-2007-day-1/
description:
  - Notes on day 1 at the MySQL Conference and Expo 2007
tags:
  - mysqlconf07
---
[<img style="float:right; margin-left: 15px" src="http://conferences.oreillynet.com/images/mysqluc2007/banners/speakers/120x240.jpg" width="120" height="240" alt="Speaker at MySQLConf 2007" />][1] 
In my first day at the [MySQL Conference and Expo 2007][1], I attended the [Scaling and High Availability Architectures][2] tutorial in the morning, and [Real-world MySQL Performance Tuning][3] in the afternoon. This is a brief article on each session's Big Ideas, and a short blurb about the conference overall so far.

I'll also be involved in at least three sessions at the conference, and I describe them.

If you're interested in short overviews of the sessions I attend, keep watching for my articles. I will give you each session's major ideas instead of writing stream-of-thought notes. You can look at the presenter's slides for more.

### The conference overall

This conference is well-organized and friendly. Attire is casual; most people are wearing jeans and t-shirts, or khakis and three-button shirts. I found lunch basic but good &#8212; catered food, with tables set up in a grassy area in the beautiful California sunshine; nicely dressed tables. I had a nice salad with vinaigrette and crumbled bleu cheese, penne with a sun-dried tomato sauce, red potato salad, and bread.

Pretty much everyone seems to be here. I don't want to drop names, so I'll just leave it at that (though I cannot avoid mentioning that I'm rooming with Alexey Kovyrin, who has just released an update to the [MySQL Master-Master Replication tool][4]). It is such a pleasure to meet the people I've been emailing with; people from all over the world, who use MySQL for all different kinds of things. I also met some people I've met at previous events, and whom I consider friends now. Here's to all of my friends, new and old!

The downside is I miss my wife and Carbon, our loving Rhodesian Ridgeback dog. But I know he will Guard The House&reg; even while I'm gone.

### Scaling and High Availability Architectures

This tutorial featured Jeremy Cole and Eric Bergen of [Proven Scaling LLC][5]. You probably know them for their generous help giving people rides and passes to various parts of various events, and for contributing patches for things we all need.

Jeremy did most of the talking. The talk was organized roughly into identifying what scaling and high availability are (they're not the same thing), what problems typically present at various stages of an application's lifecycle, and some strategies to use and avoid. It promoted **application partitioning for scaling, and master-master replication for high availability**. All in all a very good discussion of the pros and cons of many concepts, both big and small.

This tutorial was mostly pretty high-level, but frequently got down to specifics.

One of the things I noticed the most from the audience's questions was how differently many people understand the concept "partitioning." There were at least three working definitions I heard, and they are not at all the same thing. I think one of the primary obstacles to teaching the principles this talk covered is conveying accurately what it means to partition. The definitions I heard were

*   Dividing data into partitions (aka "shards") and locating each on one of some number of servers.
*   Dividing a large table into smaller tables on the same server.
*   Using the partitioned tables available in MySQL 5.1.

I also heard people talking about partitioning by date, which I usually associate with archiving.

In the context of the talk, partitioning data means dividing it by something like user ID and locating each partition on one of some number of servers. This is key to horizontal scaling.

### Real-world MySQL Performance Tuning

This session featured [Ask BjÃ¸rn Hansen][6] for the first half and MySQL's own [Jay Pipes][7] for the second half. The two halves were quite different; it was not one tutorial, but two.

Ask Hansen's talk was **a broad overview of how to scale web applications**, from start to finish. It included not only a lot of advice on MySQL, but also suggestions not related to MySQL, such as application-level caching, proxies, failover, etc. He covered a huge amount of material; his slides are interesting and varied, with nice illustrations. He often gave high-level advice, such as "cache aggressively," but at least as often devoted entire slides to a low-level topic.

Jay's talk covered much less ground. He focused on **specific performance optimizations** for MySQL. The topics included indexes, how to know when and how indexes are used, query plans, and server tuning. The slides showed a lot of code examples and the results of various query strategies and indexing changes.

### Next

You can catch me, with Mark Callaghan and Peter Zaitsev, tomorrow at lunchtime at an [experts' session on migrating MySQL from 4.0 to 5.0][8] (organized by [solidDB][9]). On Wednesday I'll be part of a lightning session [Lightning Rounds with Top MySQL Community Contributors][10].

On Thursday I will be giving a session myself, on [how to use the innotop MySQL and InnoDB monitor][11]. I designed this session to show you how to go beyond the surface with innotop; my design strategy with innotop is that you should be able to start it and see something useful immediately without the advanced features even being visible, but there's a tremendous amount of power lurking in it.

I hope to meet you if you're here, whether at one of my sessions or just in the hallways. Till then, be well and enjoy the conference!

 [1]: http://www.mysqlconf.com/
 [2]: http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/10893
 [3]: http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/12080
 [4]: http://blog.kovyrin.net/2007/04/23/master-master-replication-example-using-mmm/
 [5]: http://www.provenscaling.com/
 [6]: http://develooper.com/
 [7]: http://www.jpipes.com/
 [8]: http://blog.cheyer.biz/2007/04/23/meet-the-experts-at-mysql-uc/
 [9]: http://www.solidtech.com/en/products/relationaldatabasemanagementsoftware/sdbformysql.asp
 [10]: http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/12911
 [11]: http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/13213
