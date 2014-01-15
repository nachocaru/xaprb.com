---
title: How we enabled threading in MySQL
date: "2006-07-16"
url: /blog/2006/07/16/how-we-enabled-threading-in-mysql/
categories:
  - Databases
---
MySQL on GNU/Linux appears to be able to either run multiple processes, or one process and multiple threads. We've noticed a significant CPU penalty for multiple processes, probably from the context switching overhead. The trouble was, one of our servers wouldn't use threads; it wanted to use multiple processes. This article explains how we got it to use threads instead.

First, we noticed the master server's CPU utilization was higher than the slave's, even though we expected the type of queries running on the slave should have caused it to have around the same CPU utilization as the master. We checked the configuration, but couldn't find anything that should have caused this. Then we noticed the slave only had a single process in `top`, but the master had dozens. My co-worker speculated that the single process on the slave might have been running many threads, which have so much less context-switching overhead that it could have caused the difference. Indeed, I was able to toggle the display of threads in `top` with the H key, and could see each connection being handled by a thread.

Another clue was running `vmstat` and looking at the number of context switches in the `cs` column. The master's number was much higher than the slave's. We examined a number of other performance metrics (see my article about [monitoring server load in GNU/Linux][1]), but those ended up being the the most obvious signs of difference between the two servers.

The key ended up being NPTL. As I discussed in my article on [Gentoo and NPTL][2], apparently certain software won't multi-thread, even when it has linuxthreads available. I'm not pretending to know a lot about compiling MySQL, but we did try multiple ways to get it to use threads, and it wasn't until we figured out NPTL wasn't built into glibc that we made any progress. After re-building glibc and restarting the the mysql daemon, it came back up with just one process, but multiple threads. Success! Now our master server uses less CPU, leaving more available for queries.

 *[CPU]: Central Processing Unit

 [1]: http://www.xaprb.com/blog/2006/06/08/how-to-monitor-server-load-on-gnulinux/
 [2]: http://www.xaprb.com/blog/2006/07/12/how-to-switch-from-linuxthreads-to-nptl-on-gentoo/
