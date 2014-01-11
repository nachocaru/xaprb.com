---
title: 4 ways that instrumentation is like sex
author: Baron Schwartz
layout: post
permalink: /2010/03/30/4-ways-that-instrumentation-is-like-sex/
categories:
  - PostgreSQL
  - SQL
tags:
  - humor
  - instrumentation
---
In an application such as a database server, instrumentation is like sex: it&#8217;s not enough to know how often things happen. You also care about how long they took, and in many cases you want to know how big they were.

&#8220;Things&#8221; are the things you want to optimize. Want to optimize queries? Then you need to know what activities that query causes to happen. Most systems have at least some of this kind of instrumentation. If you look around at&#8230; let&#8217;s not pick on the usual targets&#8230; oh, say Sphinx, Redis, and memcached. What metrics do they provide? They provide counters that say how often various things happened. (Most of these systems provide very few and coarse-grained counters.) That&#8217;s not very helpful. So I read from disk N times, and I read from memory N times, and I compared rows N times&#8230; so what? I still don&#8217;t know anything relevant to execution time.

That&#8217;s why we need to measure how long things took. It&#8217;d be great if, for every Handler\_X counter variable in MySQL&#8217;s SHOW STATUS, we also had a Handler\_X\_time in microseconds. True, better instrumentation could be designed, but that&#8217;d be a huge step forward already. Instead of guessing at the significance of Sort\_rows, we could look at Sort\_rows\_time and see if a lot of time is being consumed sorting rows!.

Next, we need to know how big things are. This is a rather generic term, but in a lot of cases, the size, difficulty, or some other metric of an operation is important. &#8220;I wrote a message to the network socket&#8221; is okay; &#8220;I wrote and it took N microseconds&#8221; is better; and &#8220;I wrote N bytes and it consumed M microseconds&#8221; is best. Made a temp table on disk? Nice &#8212; how big was it? Mine&#8217;s smaller than yours!

The final way that instrumentation is like sex: more is better, to an extent. You can get too much, but how often has that happened to you?