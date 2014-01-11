---
title: Time TCP traffic with tcprstat
author: Baron Schwartz
layout: post
permalink: /2010/09/09/time-tcp-traffic-with-tcprstat/
categories:
  - PostgreSQL
  - Sys Admin
  - Tools
---
I just realized that I didn't publicize this in the Postgres world, or anywhere but the MySQL blogosphere for that matter. Some folks at my company have released a generic TCP-response-time tool. Very useful for monitoring, benchmarks, historical metrics, and so on. It's kind of like iostat, but for TCP traffic, and fully focused on time, not traffic size. Performance == time and tasks, and this is a lightweight way to measure that data. I wrote an introductory blog post [here][1], and the documentation is [here][2].

 [1]: http://www.mysqlperformanceblog.com/2010/08/31/introducing-tcprstat-a-tcp-response-time-tool/
 [2]: http://www.percona.com/docs/wiki/tcprstat:start
