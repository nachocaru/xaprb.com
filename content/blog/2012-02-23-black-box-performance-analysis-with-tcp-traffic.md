---
title: Black-Box Performance Analysis with TCP Traffic
author: Baron Schwartz
layout: post
permalink: /2012/02/23/black-box-performance-analysis-with-tcp-traffic/
categories:
  - Percona Toolkit
  - PostgreSQL
  - Scalability
  - SQL
---
This is a cross-post from the [MySQL Performance Blog][1]. I thought it would be interesting to users of PostgreSQL, Redis, Memcached, and $system-of-interest as well.

For about the past year I&#8217;ve been formulating a series of tools and practices that can provide deep insight into system performance simply by looking at TCP packet headers, and when they arrive and depart from a system. This works for MySQL as well as a lot of other types of systems, because it doesn&#8217;t require any of the contents of the packet. Thus, it works without knowledge of what the server and client are conversing about. Packet headers contain only information that&#8217;s usually regarded as non-sensitive (IP address, port, TCP flags, etc), so it&#8217;s also very easy to get access to this data even in highly secure environments.

I&#8217;ve finally written up a paper that shows some of my techniques for detecting problems in a system, which can be an easy way to answer questions such as &#8220;is there something we should look into more deeply?&#8221; without launching a full-blown analysis project first. It&#8217;s available from the white paper section of our website: [MySQL Performance Analysis with Percona Toolkit and TCP/IP Network Traffic][2]

 [1]: http://www.mysqlperformanceblog.com/2012/02/23/black-box-mysql-performance-analysis-with-tcp-traffic/
 [2]: http://www.percona.com/about-us/mysql-white-paper/mysql-performance-analysis-with-percona-toolkit-and-tcp-ip-network-traffic/