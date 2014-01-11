---
title: How to scale writes with master-master replication in MySQL
author: Baron Schwartz
layout: post
permalink: /2008/08/06/how-to-scale-writes-with-master-master-replication-in-mysql/
description:
  - >
    Explains how a circular MySQL replication cluster can increase your write
    capacity.
categories:
  - SQL
tags:
  - High Availability
  - MySQL
  - replication
  - scaling
---
This post is SEO bait for people trying to scale MySQL&#8217;s write capacity by writing to both servers in master-master replication. The short answer: you can&#8217;t do it. It&#8217;s impossible.

I keep hearing this line of reasoning: &#8220;if I make a MySQL replication &#8216;cluster&#8217; and move half the writes to machine A and half of them to machine B, I can increase my overall write capacity.&#8221; It&#8217;s a fallacy. All writes are repeated on both machines: the writes you do on machine A are repeated via replication on machine B, and vice versa. You don&#8217;t shield either machine from any of the load.

In addition, doing this introduces a very dangerous side effect: in case of a problem, neither machine has the authoritative data. Neither machine&#8217;s data can be trusted, but neither machine&#8217;s data can be discarded either. This is a very difficult situation to recover from. Save yourself grief, work, and money. **Never write to both masters**.