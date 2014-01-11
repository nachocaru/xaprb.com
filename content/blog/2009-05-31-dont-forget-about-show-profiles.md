---
title: "Don't forget about SHOW PROFILES"
author: Baron Schwartz
layout: post
permalink: /2009/05/31/dont-forget-about-show-profiles/
categories:
  - SQL
tags:
  - Jeremy Cole
  - MySQL
  - performance
  - replication
---
It seems that a lot of people want to try to improve MySQL performance by focusing on server status counters and configuration variables. Looking at counters, and "tuning the server," is better than nothing, but only barely. You care first and foremost about **how long it takes to execute a query**, not about how many of this-and-that the server performs or about how big or small this-and-that buffer is. What you really need is timing information.

You can use the slow query log to find timing information about queries, and then you can examine those queries with SHOW PROFILES to see the timing information about the query's execution itself.

This concept is very simple and absolutely fundamental: if you care about time (and you do!), then measure and optimize time. But it's so often overlooked or misunderstood.

The addition of SHOW PROFILES was a major step forward in the ability to optimize server and application performance. (Thanks Jeremy Cole!) As time passes and people upgrade their servers, it's becoming more common to see it in production, which is an enormous help. Now that the differences between the Community and Enterprise versions of the server have been erased, it will be available in all future server versions, which is great news.
