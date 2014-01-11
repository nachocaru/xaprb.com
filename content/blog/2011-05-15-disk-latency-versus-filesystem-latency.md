---
title: Disk latency versus filesystem latency
author: Baron Schwartz
layout: post
permalink: /2011/05/15/disk-latency-versus-filesystem-latency/
categories:
  - SQL
  - Sys Admin
  - Tools
tags:
  - Brendan Gregg
---
Brendan Gregg has a very good ongoing series of blog posts about the importance of measuring latency at the layer that&#8217;s appropriate for the question you are trying to answer. If you&#8217;re wondering whether I/O latency is a problem for MySQL, you need to measure I/O latency at the filesystem layer, not the disk layer. There are a lot of factors to consider. To quote from his latest post: 
> This isn’t really a problem with iostat(1M) – it’s a great tool for system administrators to understand the usage of their resources. But the applications are far, far away from the disks – and have a complex file system in-between. For application analysis, iostat(1M) may provide clues that disks could be causing issues, but you really want to measure at the file system level to directly associate latency with the application, and to be inclusive of other file system latency issues.

Someone should add Brendan&#8217;s feed to Planet MySQL. Here are the articles: [part 1][1], [part 2][2]. Brendan will be talking about this topic at [Percona Live][3] on the 26th.

 [1]: http://dtrace.org/blogs/brendan/2011/05/11/file-system-latency-part-1/
 [2]: http://dtrace.org/blogs/brendan/2011/05/13/file-system-latency-part-2/
 [3]: http://www.percona.com/live/