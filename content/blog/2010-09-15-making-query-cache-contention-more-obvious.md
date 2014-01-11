---
title: Making query cache contention more obvious
author: Baron Schwartz
layout: post
permalink: /2010/09/15/making-query-cache-contention-more-obvious/
categories:
  - SQL
tags:
  - Percona Server
  - query cache
---
The [newest release of Percona Server][1] includes a trivial change that I think will be extremely valuable. This is the addition of a new thread state, &#8220;Waiting on query cache mutex.&#8221; Fixing the query cache to make it scalable is hard. Fixing the server to report when the query cache is a bottleneck is not hard. It has historically been very difficult for users to diagnose what&#8217;s wrong with their server when the query cache is locking it intermittently. Now it will be trivial: they will look at SHOW PROCESSLIST and the evidence will be unmistakable.

 [1]: http://www.mysqlperformanceblog.com/2010/09/15/percona-server-5-1-49-rel12-0/