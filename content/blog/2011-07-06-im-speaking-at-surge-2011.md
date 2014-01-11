---
title: 'I&#8217;m speaking at Surge 2011'
author: Baron Schwartz
layout: post
permalink: /2011/07/06/im-speaking-at-surge-2011/
categories:
  - Conferences
  - Scalability
  - SQL
tags:
  - Surge2011
  - surgecon
---
I&#8217;ll be speaking at [Surge][1] again this year. This time, unlike last year&#8217;s talk, I&#8217;m tackling a very concrete topic: [extracting scalability and performance metrics from TCP network traffic][2]. It turns out that most things that communicate over TCP can be analyzed very elegantly just by capturing arrival and departure timestamps of packets, nothing more. I&#8217;ll show examples where different views on the same data pull out completely different insights about the application, even though we have no information about the application itself (okay, I actually know that it&#8217;s a MySQL database, and a lot about the actual database and workload, but I don&#8217;t need that in order to do what I&#8217;ll show you). It&#8217;s an amazingly powerful technique that I continue to find new ways to apply to real systems.

Take a look at the other speakers too &#8212; it is an impressive lineup. I hope you can attend. Last year&#8217;s show was a great event.

 [1]: http://omniti.com/surge/
 [2]: http://omniti.com/surge/2011/speakers/baron-schwartz