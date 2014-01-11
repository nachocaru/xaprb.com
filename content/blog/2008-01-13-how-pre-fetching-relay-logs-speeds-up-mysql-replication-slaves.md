---
title: How pre-fetching relay logs speeds up MySQL replication slaves
author: Baron Schwartz
excerpt: |
  |
    <p>I dashed off a hasty post about <a href="http://www.xaprb.com/blog/2008/01/13/speed-up-your-mysql-replication-slaves/">speeding up replication slaves</a>, and gave no references or explanation.  That's what happens when I write quickly!  This post explains what the heck I was talking about.</p>
layout: post
permalink: /2008/01/13/how-pre-fetching-relay-logs-speeds-up-mysql-replication-slaves/
description:
  - "How to warm up your slave's caches and speed up replication in MySQL"
tags:
  - Farhan Mashraqui
  - MySQL
  - Paul Tuckfield
  - replication
  - SQL
---
I dashed off a hasty post about [speeding up replication slaves][1], and gave no references or explanation. That&#8217;s what happens when I write quickly! This post explains what the heck I was talking about.

I first heard Paul Tuckfield talk at the first MySQL Camp, in November 2006. He mentioned that he speeds up MySQL replication by &#8220;pre-fetching relay logs&#8221; on the slave. Actually, I think he used the term &#8220;pipelining&#8221; at that point. Next Spring, he mentioned the same thing in his [keynote address at the 2007 MySQL Conference &#038; Expo][2]. You can download audio and video of his talk from that link. He mentions this approach pretty late in the talk, almost at the end. I&#8217;ve been meaning to try duplicating his idea since the first time I heard him talk.

The basic idea is to help overcome replication&#8217;s single-threadedness. Under the right conditions, the slave&#8217;s SQL thread can become I/O-bound, even though the slave server has lots of unused I/O capacity. As a result, it spends a lot of time just waiting for the disk to return some data, and becomes much slower than it has to be.

Paul&#8217;s solution to this problem is to read the statements from the relay log, just a little bit ahead of the SQL thread&#8217;s position, convert them into SELECT queries, and execute them on the slave. This causes MySQL to request some of the data from the disk in advance. Then when the slave&#8217;s SQL thread wants to update that data, it&#8217;s already in memory, and things can potentially go much faster.

How much faster is open to debate. I think Paul sees about 3-4 times faster, but please don&#8217;t quote me on that. [Farhan Mashraqui also uses this hack and gets some speedup as well][3].

The problem is, it won&#8217;t automatically work for everyone. In theory, it can potentially help if the following are true:

*   Your data is much bigger than memory.
*   You use a storage engine with row-level locking, like InnoDB.
*   Your workload is mostly small (single-row is good), widely scattered, random UPDATE and DELETE statements. (INSERT is less likely to benefit, because the relevant indexes are likely to be &#8220;hot&#8221; already).
*   The slave&#8217;s SQL thread is I/O-bound, but the slave has lots of spare I/O capacity. In other words, lots of disk spindles.

My slaves don&#8217;t do this kind of work. They do a lot of big multi-table updates and summary queries. There is very little to gain from pre-fetching the indexes and data for these statements, because whatever big query the SQL thread is running is likely to just flush the pre-fetched pages out of memory again before they&#8217;re needed. I tried anyway, and sure enough, it didn&#8217;t work.

The other problem is, it&#8217;s hard to write a generically useful program to do this kind of pre-fetching. It&#8217;s not too hard to write something specific to your workload, as Farhan did. But getting it to work right in general requires a lot of smarts, such as figuring out how far ahead of the slave SQL thread to stay, which queries not to try to pre-execute, and so on. I wrote an implementation of it that&#8217;s generic and has some intelligence built in. If you&#8217;re interested in it, see my previous post (linked at the top of this post).

If you&#8217;re thinking about writing something like this yourself, be prepared: it could be a lot of work. I can see how it would be simpler on some workloads, but on mine it was far from simple. I did some silly things, like running out of disk space because of temp files for LOAD DATA INFILE statements. Fortunately, that was just one of my benchmark machines.

If conditions aren&#8217;t right, it could really screw you. For example, if your slave has only a single disk, or if you use MyISAM on the slave, you&#8217;ll probably just cause problems for yourself. You need to know your hardware and your workload really well. That&#8217;s why Paul didn&#8217;t release his code, and I&#8217;ve hesitated for the same reason.

There&#8217;s more information about this in the upcoming High Performance MySQL, 2nd Edition, which I&#8217;m helping to write. We also have a lot more information about how to understand your hardware and workload. There&#8217;s no way I can fit it all into this post, and I don&#8217;t want to try. Even if I weren&#8217;t working like a mad dog on the book and had time to put it here, I can&#8217;t give away all the book&#8217;s goodies, can I? :-)

 [1]: http://www.xaprb.com/blog/2008/01/13/speed-up-your-mysql-replication-slaves/
 [2]: http://technocation.org/content/2007-mysql-user-conference-and-expo-presentations-and-videos
 [3]: http://mysqldatabaseadministration.blogspot.com/2007/05/pre-fetch-binlogs-to-speed-up-mysql.html