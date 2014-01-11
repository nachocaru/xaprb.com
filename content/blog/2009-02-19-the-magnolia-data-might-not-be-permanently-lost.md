---
title: The Ma.gnolia data might not be permanently lost
author: Baron Schwartz
layout: post
permalink: /2009/02/19/the-magnolia-data-might-not-be-permanently-lost/
categories:
  - SQL
tags:
  - backups
  - data recovery
  - Ma.gnolia
  - MySQL
---
I keep [reading][1] that [Ma.gnolia&#8217;s data is permanently lost][2] because &#8220;a specialist had been unable to recover any data from the corrupted hard drive.&#8221; This is not in itself a reason to consider data completely lost.

It is not clear to me whether the hard drive itself is unusable, e.g. the spindle won&#8217;t spin and the head won&#8217;t read the ones and zeroes, or whether the filesystem is corrupted. It sounds to me, from [reading Larry Hallf&#8217;s comments][3], like it&#8217;s a simple matter of filesystem corruption. And even if the disk is dead, there is apparently a backup made from the corrupted filesystem, so there should be more than one way to try to recover this data: &#8220;Ma.gnolia&#8217;s database server suffered from file system corruption, which also corrupted it&#8217;s database backup, even though it was on a separate system.&#8221;

**You don&#8217;t need to recover your filesystem to recover your MySQL data**. Shameless plug: Percona can do it for you. We can get the raw data off a block device *without even trying to mount it as a filesystem*. Recovering MySQL data is not the same as recovering other types of data. If the disk spins, it might be possible to recover data from it.

Whether it&#8217;s worth it or not is another matter. Percona data recovery isn&#8217;t cheap, but it&#8217;s worth it for at least some people. I cannot name names, but you are using services from companies that have retained Percona to recover from worse cases of data loss than this appears to be, going by the limited available information. The original reason we built our data recovery toolset was to help one of the world&#8217;s largest corporations.

But cost and time may not have been the driving factor here. Whoever the unnamed data recovery specialist was, they took a long time and got no results. And now Ma.gnolia has given up and declared it a lost cause, which is sad for their users. I hope Larry Halff didn&#8217;t pay for the results he didn&#8217;t get. And I hope he didn&#8217;t wipe out his corrupted backup yet.

In the meantime, at least this incident is shining a bright light on the need for tested, verified backups. I&#8217;ve had two clients ask me how they can avoid ending up the same way as Ma.gnolia.

 [1]: http://mysqltalk.wordpress.com/2009/02/19/web-roundup/
 [2]: http://www.datacenterknowledge.com/archives/2009/02/19/magnolia-data-is-gone-for-good/
 [3]: http://getsatisfaction.com/magnolia/topics/ma_gnolia_data_recovery_status