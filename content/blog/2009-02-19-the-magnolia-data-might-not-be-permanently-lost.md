---
title: The Ma.gnolia data might not be permanently lost
date: "2009-02-19"
permalink: /blog/2009/02/19/the-magnolia-data-might-not-be-permanently-lost/
categories:
  - Databases
---
I keep [reading][1] that [Ma.gnolia's data is permanently lost][2] because "a specialist had been unable to recover any data from the corrupted hard drive." This is not in itself a reason to consider data completely lost.

It is not clear to me whether the hard drive itself is unusable, e.g. the spindle won't spin and the head won't read the ones and zeroes, or whether the filesystem is corrupted. It sounds to me, from [reading Larry Hallf's comments][3], like it's a simple matter of filesystem corruption. And even if the disk is dead, there is apparently a backup made from the corrupted filesystem, so there should be more than one way to try to recover this data: "Ma.gnolia's database server suffered from file system corruption, which also corrupted it's database backup, even though it was on a separate system."

**You don't need to recover your filesystem to recover your MySQL data**. Shameless plug: Percona can do it for you. We can get the raw data off a block device *without even trying to mount it as a filesystem*. Recovering MySQL data is not the same as recovering other types of data. If the disk spins, it might be possible to recover data from it.

Whether it's worth it or not is another matter. Percona data recovery isn't cheap, but it's worth it for at least some people. I cannot name names, but you are using services from companies that have retained Percona to recover from worse cases of data loss than this appears to be, going by the limited available information. The original reason we built our data recovery toolset was to help one of the world's largest corporations.

But cost and time may not have been the driving factor here. Whoever the unnamed data recovery specialist was, they took a long time and got no results. And now Ma.gnolia has given up and declared it a lost cause, which is sad for their users. I hope Larry Halff didn't pay for the results he didn't get. And I hope he didn't wipe out his corrupted backup yet.

In the meantime, at least this incident is shining a bright light on the need for tested, verified backups. I've had two clients ask me how they can avoid ending up the same way as Ma.gnolia.

 [1]: http://mysqltalk.wordpress.com/2009/02/19/web-roundup/
 [2]: http://www.datacenterknowledge.com/archives/2009/02/19/magnolia-data-is-gone-for-good/
 [3]: http://getsatisfaction.com/magnolia/topics/ma_gnolia_data_recovery_status
