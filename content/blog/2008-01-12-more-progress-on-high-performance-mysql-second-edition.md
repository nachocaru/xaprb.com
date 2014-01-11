---
title: More progress on High Performance MySQL, Second Edition
author: Baron Schwartz
excerpt: "<p>Whew!  I just finished a marathon of revisions.  It's been a while since I posted about our progress, so here's an update for the curious readers.</p>"
layout: post
permalink: /2008/01/12/more-progress-on-high-performance-mysql-second-edition/
description:
  - High Performance MySQL, second edition, is an awesome book.
tags:
  - Arjen Lentz
  - High Availability
  - load balancing
  - MySQL
  - OpenOffice.org
  - optimization
  - performance
  - Peter Zaitsev
  - replication
  - scaling
  - sharding
  - SQL
  - technical review
  - writing
---
Whew! I just finished a marathon of revisions. It&#8217;s been a while since I posted about our progress, so here&#8217;s an update for the curious readers.

I just finished revising the last two major chapters that [Peter Zaitsev][1] hasn&#8217;t yet reviewed. Peter has been essentially going through the chapters like a very thorough technical reviewer. He makes corrections, points out where things aren&#8217;t clear or need examples, and adds more material.

By &#8220;finished revising,&#8221; I mean finished expanding the outline into a full chapter. We&#8217;re still working at the level of &#8220;this chapter is mostly there, but we might decide to revise it more.&#8221; We will most certainly do so in many cases. There are some chunks of material that I&#8217;ve marked TODO to put into other chapters, for example. We&#8217;re not at the level of a final draft with any chapter except the chapter on MySQL&#8217;s architecture, but we&#8217;re getting close with the others now.

Most of the chapters are in tech review now, and we&#8217;ve gotten a few of them back. The comments from the reviewers have been very helpful. We expanded the Replication chapter quite a bit after tech review. (And then Peter reviewed it and we expanded it even more). When the tech reviewers return comments on the other chapters, we&#8217;ll revise some more.

We&#8217;re up to 529 pages in OpenOffice.org now. At my calculated ratio of 1 page = 1.1 pages in print, that&#8217;s about 582 pages in print. And that&#8217;s not counting the Replication chapter, which doesn&#8217;t have all of its illustrations yet. I predicted we&#8217;d break 500 pages; we might get close to 600. These are very, very densely written, too. No offense to the first edition, but the tone is quite different; much less light-hearted banter, much more compressed information. Peter is a walking encyclopedia, and never seems to run out of details we really ought to include because they&#8217;re important (and they are).

We may, or may not, go to production in the next few weeks. Regardless, I think we&#8217;re still on track to have the book on shelves by the [MySQL Conference &#038; Expo][2] in April. Look for me there. I&#8217;ll be easy to find: I&#8217;ll be the tall guy with a permanent silly grin. (You&#8217;d grin too if you finished writing a book that&#8217;s been this much work!)

I&#8217;ve posted rough outlines for many of the other chapters. The two Peter and I just finished working on are the Scaling/HA/Load-Balancing/Failover chapter, and the Application-Level Optimization chapter. The Scaling/HA chapter is pretty long and very involved, and goes into a lot of detail on scaling in particular, especially horizontal scaling via sharding. (We use &#8220;sharding&#8221; because it&#8217;s less confusing than calling it &#8220;partitioning,&#8221; which already means too many different things in databases).

The Application-Level Optimization chapter is a little shorter. It&#8217;s mostly about caching strategies, how to make a web server run well, and so on. These aren&#8217;t what the book focuses on directly, but you can either help or hurt the database server a lot with your application design. Our goal here is to help people avoid the common mistakes.

For the curious, here&#8217;s the current outline for these two chapters:

<pre>Scaling and High Availability
  Terminology
  Scaling MySQL
    Planning for Scalability
    Buying Time Before Scaling
    Scaling Up
    Scaling Out
      Functional Partitioning
      Data Sharding
      Choosing a Partitioning Key
        Multiple Partitioning Keys
      Querying Across Shards
      Allocating Data, Shards, and Nodes
        Arranging Shards on Nodes
      Fixed Allocation
      Dynamic Allocation
        Mixing Dynamic and Fixed Allocation
      Explicit Allocation
      Sidebar: Re-Balancing Shards
      Tools for Sharding
    Scaling Back
      Keeping Active Data Separate
    Scaling by Clustering
      Clustering
      Federation
  Load Balancing
    Connecting Directly
      Splitting Reads and Writes in Replication
      Changing Application Configuration
      Changing DNS Names
      Moving IP Addresses
    Introducing a Middleman
      MySQL Proxy
      Load Balancers
    Load Balancing Algorithms
      Adding and Removing Servers in the Pool
    Load Balancing with a Master and Multiple Slaves
  High Availability
    Planning for High Availability
    Adding Redundancy
      Shared-Storage Architectures
      Replicated-Disk Architectures
      Synchronous MySQL Replication
    Failover and Failback
      Promoting a Slave or Switching Roles
      Virtual IP Addresses or IP Takeover
      MySQL Master-Master Replication Manager
      Middleman Solutions
      Handling Failover in the Application
</pre>

And here&#8217;s the outline for the Application-Level Optimization chapter:

<pre>Application-Level Optimization
  Application Performance Overview
    Find the Source of the Problem
    Look for Common Problems
  Web Server Issues
    Finding the Optimal Concurrency
  Caching
    Sidebar: Caching Doesn't Always Help
    Caching Below the Application
    Application-Level Caching
    Cache Control Policies
    Cache Object Hierarchies
    Pre-Generating Content
  Extending MySQL
  Alternatives to MySQL</pre>

The thing that makes me the happiest right now is that we&#8217;re clearly going to make it. For a while, there was just so much work left to do that it was impossible to estimate how much. (Ask my wife: I was wrong many times when she asked how long it would take me to finish a chapter). I also didn&#8217;t know how much revision would be necessary, which is very scary; revising takes about four times as long as writing a first draft, by my reckoning. At this point, the remaining work is much smaller, and much easier to estimate. And now I no longer flip-flop daily between &#8220;I think we can, I think we can&#8221; and &#8220;please don&#8217;t ask, because I don&#8217;t know and I want a vacation.&#8221;

Subversion shows me that Peter has the Security chapter locked right now. This one is not a huge one, and [Arjen Lentz][3] has already reviewed it as well, so I don&#8217;t expect it to be a huge amount of work to revise. After that, it&#8217;s minor chapters and appendices. (We might actually convert the chapters on Server Status and Tools into appendices, since they got cannibalized when we realized their material fit better elsewhere. They also don&#8217;t have a very chapter-ish feel; they feel more like appendices). We&#8217;ve added a few more appendices, including one on EXPLAIN and one on debugging server and storage-engine locking problems. These are all great reference material.

See you at the conference in April!

 [1]: http://www.mysqlperformanceblog.com/
 [2]: http://www.mysqlconf.com/
 [3]: http://openquery.com.au/