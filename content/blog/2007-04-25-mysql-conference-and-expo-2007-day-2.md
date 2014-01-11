---
title: MySQL Conference and Expo 2007, Day 2
author: Baron Schwartz
excerpt: |
  <p><a href="http://www.mysqlconf.com/"><img style="float:right; margin-left: 15px" src="http://conferences.oreillynet.com/images/mysqluc2007/banners/speakers/120x240.jpg" width="120" height="240" alt="Speaker at MySQLConf 2007" /></a>
  
  <p>In my second day at the <a href="http://www.mysqlconf.com/">MySQL Conference and Expo 2007</a>, I attended keynotes, several sessions, and three BoF (Birds of a Feather) sessions.  This article is about these sessions.  Again, I'll focus on the Big Ideas and let you read other people's blog posts for the small details.</p>
  
  <br style="clear:both" />
layout: post
permalink: /2007/04/25/mysql-conference-and-expo-2007-day-2/
description:
  - Overview of my second day at the MySQL Conference and Expo 2007.
tags:
  - mysqlconf07
---
[<img style="float:right; margin-left: 15px" src="http://conferences.oreillynet.com/images/mysqluc2007/banners/speakers/120x240.jpg" width="120" height="240" alt="Speaker at MySQLConf 2007" />][1] 
In my second day at the [MySQL Conference and Expo 2007][1], I attended keynotes, several sessions, and three BoF (Birds of a Feather) sessions. This article is about these sessions. Again, I'll focus on the Big Ideas and let you read other people's blog posts for the small details.

### Keynotes

There were three keynotes this morning. Two I won't comment on, but I want to mention the third because it was mostly about the One Laptop Per Child project. I was glad to hear about it instead of what sounded like it was going to be a Red Hat pitch.

### [Building Scalable OLAP Applications with Mondrian and MySQL][2]

This session introduced the [Mondrian][3] component of the Pentaho business intelligence suite. Mondrian connects to a SQL backend and **converts the flat SQL view of the data into a navigable hierarchical view**. The point is to **make OLAP scalable on top of MySQL**. As such, it touched on tactics for tuning both MySQL and Mondrian &#8212; especially aggregation, caching, and cache control in Mondrian. Also on the agenda were near-real-time OLAP (aka "active data warehousing"), and how to cache and invalidate in that scenario. There's a high cost for doing this, but there can be great benefits as well.

### [Technology at Digg.com][4]

This session featured [Digg's][5] lead developer and lead DBA discussing **how Digg built their systems** (as opposed to many other sessions, which tell you how you ought to do things). The major components are

*   a cluster of web servers
*   a memcached farm caching chunks (not whole pages) of content with write-through and some nimble dancing to handle stale data after losing and regaining a server
*   MySQL replication with data partitioning and separation for scale-out, with separation into farms by function (search, data warehousing, atomic data)

There was another debate from audience members about what the words "shard" and "partition" mean. Someone in the audience even told the Digg people the correct definition of the terms, which did not match what the developers were talking about. \*sigh\*

Interestingly, it seems Digg is in the lucky position of being able to scale with replication for reads extremely well, since their load is about 98% reads. They also only have about 30GB of data. I assumed it would be in the terabytes.

### [InnoDB Performance Potential in High-end Environments][6]

This talk was the most technical I've been to so far. Yasufumi Kinoshita dove deep into InnoDB to analyze **points of contention in many-CPU machines under various workloads**. His results are impressive; before his changes, InnoDB did not scale beyond four or sometimes even two CPUs, and could even perform dramatically worse on more CPUs than on fewer! After he identified the points of contention, scaling looked quite good up to at least 8 CPUs, with no indication of other problems caused as side effects. Though there's still work to do and apparently much debugging needs to be done, this is hugely important for MySQL and InnoDB. I'm glad there are people who can do this kind of work. I couldn't begin to; the speaker even wrote certain parts of the fixes in assembly.

### [MySQL Server Settings Tuning][7]

This session by [Peter Zaitsev][8] focused on learning **what to configure in MySQL server, and knowing how to find out if they need to be tuned**. Topics included memory allocation, how to fight swapping, and a guided tour of the server status variables.

### [Falcon Transactions][9]

MySQL's own Jim and Ann Starkey discussed concurrency control in the still-in-beta Falcon storage engine. They talked about all kinds of database systems, the official standards, and other storage engines, not just Falcon (even PostgreSQL came up). Topics included transaction isolation levels, problems and challenges with those, and how InnoDB's repeatable read really isn't. In fact, they are trying to decide what to name that level of transaction isolation. Jim calls it "benchmark mode," because even though it's not really standard, it is extremely practical and does very well on benchmarks. It sounds like Falcon will provide a means to emulate InnoDB's behavior for compatibility if for no other reason.

This talk's Big Idea was **Falcon is both like and unlike other storage engines.**

This made me think of Guy Kawasaki's keynote from this morning. Who knows what people will use and abuse Falcon for? I'm glad MySQL and the Starkeys are doing what they believe is right, even though a lot of people (including me, frankly) don't really understand what and why they are doing. My impression is that Falcon is so different from what people are used to that most of us do not "get it," and probably will not for a long time. Someone will, though. And when they do, and learn how to make it sing and dance in ways nothing else can do, it'll make a lot of people<sup>*</sup> mad for not seeing it themselves sooner. Especially when it makes someone really successful.

* People in Redmond, I'm guessing.

### [Professional Cat Herding][10]

I dropped in on the end of this session briefly. One community member suggested MySQL should use [OpenID][11] for authentication. Bravo! It's a capital idea. Another suggestion brought up the fact that MySQL uses BitKeeper for source control. I voiced my regret that MySQL, a company that believes in and promotes software freedom, has fallen into the trap of using non-Free software themselves. It's sad to see them handcuffed in such a way. Who else remembers when the use of BitKeeper burned the Linux kernel developers? I know Richard Stallman does, because he'd been predicting that fiasco for many years by the time it finally happened. To choose non-Free software is to choose to be a victim.

### [Exploiting MySQL 5.1 for Advanced Business Intelligence Applications][12]

Pentaho's Matt Casters spoke on **how to extract data from many disparate sources and store it in a Pentaho data warehouse**, and **how to use Pentaho and MySQL 5.1&#8242;s advanced features to make OLAP queries fast** (there are two Big Ideas because the talk was double-length). The first part of the talk focused a lot on Spoon, a user interface for telling Pentaho what to do with data (not how). Next he spoke on MySQL 5.1&#8242;s table partitions, followed by data partitioning across databases or servers. The idea here is to retrieve and process data in parallel for greater speed.

Have you been reading Matt's blog? Do you remember his understated post on [processing a large volume of data in parallel with near-linear scalability][13]? I've been eagerly reading his articles for a while and it was great to hear him speak and see him demo these things.

The techniques he showed are great, but may result in CPU bottlenecks on the server that does the processing, because you can easily get enough data from a bunch of servers in parallel to peg the CPU. The next level of parallelization is the Carte server, which runs on remote machines and is basically grid computing for business intelligence. He gave a demo of this, which looks great. (Hmmm, I wonder if I could get seti@home to run BI for me? Yeah&#8230;.) Matt finished up with a demo and overview of the Pentaho product overall.

### Birds of a Feather Sessions

This evening I went to three BoF sessions: the first on DBD::mysql, the next as a fly on the wall at Paul McCullagh's streaming blob server BoF, and finally to learn more about [MySQL Proxy][14], which I've been excited about ever since I read about it a few weeks ago.

### Next

Today's expert session was a wash because the session and the official lunch were in different places, and people couldn't bring their lunch to the meeting room. It might come together better tomorrow, it might not.

Of course, I'll still be doing the two official sessions tomorrow and Thursday.

 [1]: http://www.mysqlconf.com/
 [2]: http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/10631
 [3]: http://mondrian.pentaho.org/
 [4]: http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/12204
 [5]: http://digg.com/
 [6]: http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/13740
 [7]: http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/10908
 [8]: http://www.mysqlperformanceblog.com/
 [9]: http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/10418
 [10]: http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/13866
 [11]: http://openid.net/
 [12]: http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/10633
 [13]: http://www.ibridge.be/?p=42
 [14]: http://jan.kneschke.de/projects/mysql/mysql-proxy
