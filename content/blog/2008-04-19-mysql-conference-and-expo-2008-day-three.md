---
title: MySQL Conference and Expo 2008, Day Three
date: "2008-04-19"
permalink: /2008/04/19/mysql-conference-and-expo-2008-day-three/
---
Here's a rundown of Thursday (day 3) of the MySQL Conference and Expo. This day's sessions were much more interesting to me than Wednesday's, and in fact I wanted to go to several of them in a single time slot a couple of times.

### Inside the PBXT Storage Engine

This session was, as it sounds, a look at the internals of [PBXT][1], a transactional storage engine for MySQL that has some interesting design techniques. I had been looking forward to this session for a while, and Paul McCullagh's nice explanations with clear diagrams were a welcome aid to understanding how PBXT works. Unlike some of the other storage engines, PBXT is being developed in full daylight, with an emphasis on community involvement and input. (Indeed, I may be contributing to it myself, in order to make its monitoring and tuning capabilities second to none).

PBXT has not only a unique design, but a clear vision for differentiating itself from other transactional storage engines. It's not trying to clone any particular engine; Paul and friends are planning to add some capabilities that will really set it apart from other engines, including high-availability features and blob streaming.

I left this session with a much better understanding of how PBXT balances various demands to satisfy all sorts of different workload characteristics, how it writes data, how it achieves transactional durability, and so on. I think these capabilities, and its performance, can really be assessed only in the real world (of course), but in principle it sounds good. I love knowing how things work!

There were about 30 people in the talk. I wish there had been more, because I think PBXT is going to be an important part of the open ecosystem going forward. However, I feel pretty confident people will take more notice if it starts to get used in the real world. Someone had a video camera there, so you might check out the video when it's available. Paul's explanations are really good.

### Helping InnoDB Scale on Servers with Many CPU Cores and Disks

This session was [Mark Callaghan's chance to unveil the work he and others have been doing on InnoDB's scalability issues][2], which mostly revolve around mutex contention. Mark's team has completely solved the problems on their workload and benchmarks. In fact, after the changes, InnoDB exhibited significantly better performance even than [MyISAM, which began to be limited by the single mutex that synchronizes access to its key cache][3]. (Yes, in fact MyISAM has scalability problems too).

Google's workload for MySQL, in case you're wondering, is pretty traditional (i.e. not web-like; more like an "enterprise" application). Heavily I/O-bound, 24/7 critical systems, and so on.

Mark also wore several community t-shirts at various points in the talk, including one of my [Maatkit][4] t-shirts. Mark said Maatkit would be perfect if only it were written in Python (Google's preferred scripting language). Alas, Mark, it'll stay in Perl. But thanks for the nice compliment anyway.

The room was packed full.

### Scaling Heavy Concurrent Writes In Real Time

[Dathan Pattishall][5], formerly the lead architect at Flickr, explained his techniques for scaling Flickr's write capacity. He talked about how he'd worked to reduce primary key sizes, queued writes for batching, separated different types of data into different types of tables, and more. Dathan has never been afraid to do what he thinks is a good idea, even if it flies in the face of "best practices," so I was happy to finally hear him talk.

By the way, Dathan pointed out that distributed locking with [memcached][6] and `add()` isn't a silver bullet. It works ok until memcached evicts your lock due to the LRU policy. He uses MySQL's built-in `GET_LOCK()` function for locking.

Dathan's blog is a good source of information about his sometimes unorthodox approaches to database design.

### The Power of Lucene

This was the only one of [Frank (Farhan) Mashraqi's][7] talks I got to attend. This was pretty technical: how [Lucene][8] works, how to configure and install it, how to index documents, how to execute searches. If you were wondering how much work and complexity it would be to install and use Lucene, this talk would have been good for you to attend; I've never used it myself, but I'm pretty sure Frank covered everything you need to know.

 [1]: http://www.primebase.org/
 [2]: http://mysqlha.blogspot.com/2008/04/innodb-scales-on-big-smp-servers.html
 [3]: http://www.mysqlperformanceblog.com/2007/10/12/myisam-scalability-and-innodb-falcon-benchmarks/
 [4]: http://www.maatkit.org/
 [5]: http://mysqldba.blogspot.com/
 [6]: http://www.danga.com/memcached/
 [7]: http://mysqldatabaseadministration.blogspot.com/
 [8]: http://lucene.apache.org/
