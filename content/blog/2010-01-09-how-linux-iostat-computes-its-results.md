---
title: How Linux iostat computes its results
author: Baron Schwartz
layout: post
permalink: /2010/01/09/how-linux-iostat-computes-its-results/
categories:
  - GNU/Linux
  - PostgreSQL
  - SQL
  - Sys Admin
  - Tools
tags:
  - iostat
---
`iostat` is one of the most important tools for measuring disk performance, which of course is very relevant for database administrators, whether your chosen database is Postgres, MySQL, Oracle, or anything else that runs on GNU/Linux. Have you ever wondered where statistics like await (average wait for the request to complete) come from? If you look at the disk statistics the [Linux kernel makes available through files such as /proc/diskstats][1], you won&#8217;t see await there. How does iostat compute await? For that matter, how does it compute the average queue size, service time, and utilization? This blog post will show you how that&#8217;s computed.

First, let&#8217;s look at the fields in /proc/diskstats. The order and location varies between kernels, but the following applies to 2.6 kernels. For reads and writes, the file contains the number of operations, number of operations merged because they were adjacent, number of sectors, and number of milliseconds spent. Those are available separately for reads and writes, although iostat groups them together in some cases. Additionally, you can find the number of operations in progress, total number of milliseconds during which I/Os were in progress, and the weighted number of milliseconds spent doing I/Os. Those are not available separately for reads and writes.

The last one is very important. The field showing the number of operations in progress is transient &#8212; it shows you the instantaneous value, and this &#8220;memoryless&#8221; property means you can&#8217;t use it to infer the number of I/O operations that are in progress on average. But the last field has memory, because it is defined as follows:

> Field 11 &#8212; weighted # of milliseconds spent doing I/Os This field is incremented at each I/O start, I/O completion, I/O merge, or read of these stats by the number of I/Os in progress (field 9) times the number of milliseconds spent doing I/O since the last update of this field. This can provide an easy measure of both I/O completion time and the backlog that may be accumulating. 

So the field indicates the total number of milliseconds that all requests have been in progress. If two requests have been waiting 100ms, then 200ms is added to the field. And thus it records what happened over the duration of the sampling interval, not just what&#8217;s happening at the instant you look at the file. We&#8217;ll come back to that later.

Now, given two samples of I/O statistics and the time elapsed between them, we can easily compute everything iostat outputs in -dx mode. I&#8217;ll take them slightly out of order to reflect how the computations are done internally.

*   rrqm/s is merely the incremental merges divided by the number of seconds elapsed.
*   wrqm/s is similarly simple, and r/s, w/s, rsec/s, and wsec/s are too.
*   avgrq-sz is the number of sectors divided by the number of I/O operations.
*   avgqu-sz is computed from the last field in the file &#8212; the one that has &#8220;memory&#8221; &#8212; divided by the milliseconds elapsed. Hence the units cancel out and you just get the average number of operations in progress during the time period. The name (short for &#8220;average queue size&#8221;) is a little bit ambiguous. This value doesn&#8217;t show how many operations were queued but not yet being serviced &#8212; it shows how many were *either* in the queue waiting, *or* being serviced. The exact wording of the kernel documentation is &#8220;&#8230;as requests are given to appropriate struct request_queue and decremented as they finish.&#8221;
*   %util is the total time spent doing I/Os, divided by the sampling interval. This tells you how much of the time the device was busy, but it doesn&#8217;t really tell you whether it&#8217;s reaching its limit of throughput, because the device could be backed by many disks and hence capable of multiple I/O operations simultaneously.
*   await is the total time for all I/O operations summed, divided by the number of I/O operations completed.
*   svctm is the most complex to derive. It is the utilization divided by the throughput. You saw utilization above; the throughput is the number of I/O operations in the time interval.

Although the computations and their results seem both simple and cryptic, it turns out that you can derive a lot of information from the relationship between these various numbers. This is one of those tools where a few lines of code have a surprising amount of meaning, which is left for the reader to understand. I&#8217;ll get more into that in the future.

 [1]: http://www.mjmwired.net/kernel/Documentation/iostats.txt