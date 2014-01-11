---
title: 'High Performance MySQL, Second Edition: Replication, Scaling and High Availability'
author: Baron Schwartz
excerpt: |
  <p>Continuing in the tradition, which I hope has been as helpful to you as it has been to me, I'm opening the floor for suggestions on chapter 9 of the upcoming High Performance MySQL, Second Edition.  Unlike the other chapters for which I've listed outlines, this one isn't substantially written yet.  It's in detailed outline form at this point (a tactic that has worked very well for us so far -- I'll write about that someday).</p>
  
  <p>I'm trying to get feedback much earlier in this chapter's lifecycle, for several reasons.  Two of the most important are that this is one of the first chapters I've had a chance to really take from scratch, and the chapters I haven't written from scratch have been harder to organize, as you've probably seen from the last few outlines I posted.  There's a lot of value in working top-down on this deep encyclopedia-style material.</p>
  
  <p>Read on for the outline and more thoughts I just can't keep to myself.</p>
layout: post
permalink: >
  /2007/10/18/high-performance-mysql-second-edition-replication-scaling-and-high-availability/
description:
  - >
    Chapter 9 of High Performance MySQL, Second Edition, is about replication,
    scaling, and high availability, including failover, load balancing, and more.
tags:
  - clustering
  - failover
  - High Availability
  - load balancing
  - MySQL
  - replication
  - scaling
  - SQL
---
Continuing in the tradition, which I hope has been as helpful to you as it has been to me, I&#8217;m opening the floor for suggestions on chapter 9 of the upcoming High Performance MySQL, Second Edition. Unlike the other chapters for which I&#8217;ve listed outlines, this one isn&#8217;t substantially written yet. It&#8217;s in detailed outline form at this point (a tactic that has worked very well for us so far &#8212; I&#8217;ll write about that someday).

I&#8217;m trying to get feedback much earlier in this chapter&#8217;s lifecycle, for several reasons. Two of the most important are that this is one of the first chapters I&#8217;ve had a chance to really take from scratch, and the chapters I haven&#8217;t written from scratch have been harder to organize, as you&#8217;ve probably seen from the last few outlines I posted. There&#8217;s a lot of value in working top-down on this deep encyclopedia-style material.

The outline, as it stands now, is basically headings with bulleted lists of important details. Here are the top-level headings:

<pre>[Intro]
Scaling and High Availability Requirements
Replication Overview
Configuring Replication
Under the Hood of Replication
Replication Topologies
Replication Administration and Maintenance
Replication Problems and Solutions
The Future of MySQL Replication
Scaling MySQL Horizontally
Clustering with MySQL
   MySQL Cluster
   Other Clustering Solutions
Load Balancing</pre>

Just a few notes. These sections are top-level, and will likely be split into many sub-sections like other chapter outlines I&#8217;ve posted. A typical section has a couple dozen bullet-points in it, at a high level of granularity, such as &#8220;Using DRBD for log replication only.&#8221; I think we&#8217;ll also add in a separate section on fail-over and fail-back, but that&#8217;s not in the outline as of right now (what do you think belongs in it?).

I don&#8217;t know what it&#8217;s like for you to read outlines and see little bits of the book being assembled, but the process of writing this book is just fascinating to me. It&#8217;s endlessly interesting and educational &#8212; just the process of writing, let alone the subject matter! This is a really fun project. A heck of a lot of work, but fun nonetheless, and the openness of the project makes it even more fun for me. I&#8217;ve learned a lot of surprising and interesting things about writing. I keep wishing I had time to write about this process, but I really need to keep my eye on the deadlines and put that off for later.

Anyway, the usual requests apply: what&#8217;s missing, what do you think is cool and should be included, etc etc? Thanks, as usual, for your time and feedback.