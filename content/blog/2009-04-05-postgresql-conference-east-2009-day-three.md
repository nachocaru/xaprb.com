---
title: PostgreSQL Conference East 2009, Day Three
date: "2009-04-05"
permalink: /2009/04/05/postgresql-conference-east-2009-day-three/
categories:
  - Conferences
  - Databases
---
As I said yesterday, I was only able to attend a couple of talks at the [PostgreSQL Conference East 2009][1] this morning before leaving to catch my flight back to Virginia.

*   Effects of Flash and SSDs on PostgreSQL &#8212; by [Jignesh Shah of Sun Microsystems][2]. Jignesh went through a series of comparisons between hard drives and SSD drives, looking at where they really make sense in terms of performance, capacity and price. He found exactly the same things that [Vadim wrote about on our blog: write caching is enabled by default][3], and the vendors don't want you to disable it, because the device needs the write cache for wear leveling. While SSD has some performance advantages over spindle-based drives, I'm still [not seeing it as a killer &#8212; yet][4]. But I think these issues will work themselves out. The manufacturers just need to battery back that cache and everything will change.
*   Predicting Postgres Performance: Practical Queueing Theory for Postgres DBAs &#8212; by [Jonah Harris of myYearbook][5]. Another excellent talk. Basically "queueing theory in a nutshell," with some examples of how you can expect performance to change, given some things you already know. Someone urged me to get the myYearbook crew to the Percona Performance Conference, and I think we tried but lost the momentum somewhere. I'll be emailing Jonah about it now. This talk would be perfect there.

Off topic: I picked up a handful of OpenSolaris disks. They'll send you one free, but if you're like me, typing in your address is too much to do. I'll throw it on VirtualBox and see how it does, I've been curious about it for a while. If you're local to me and you want one, let me know and I'll give you one next time I see you.

And then, sadly, I had to head out the door and get on the train. Goodbye Philly! Goodbye Postgres friends! See you next time.

 [1]: http://www.postgresqlconference.org/2009/east/
 [2]: http://blogs.sun.com/jkshah/
 [3]: http://www.mysqlperformanceblog.com/2009/03/02/ssd-xfs-lvm-fsync-write-cache-barrier-and-lost-transactions/
 [4]: http://www.amazon.com/Innovators-Dilemma-Revolutionary-Business-Essentials/dp/0060521996?tag=xaprb-20
 [5]: http://www.myyearbook.com/
