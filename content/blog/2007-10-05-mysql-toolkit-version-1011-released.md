---
title: MySQL Toolkit version 1011 released
date: "2007-10-05"
permalink: /2007/10/05/mysql-toolkit-version-1011-released/
categories:
  - Databases
  - Open Source
---

MySQL Toolkit version numbers are based on Subversion revision number. This release is the first past the 1,000-commit milestone. It also marks several days of being in Sourceforge's top 100 most active projects. It has been in the top 300 for a couple of months, and the top 1000 for, um, a long time. While I would hasten to say I'm not a popularity-contest-focused person, it's rewarding to see that people think this project is important and useful.

This release of MySQL Toolkit updates MySQL Parallel Dump. I had been using it on a relatively small server; yesterday I took a deep breath and started using it to generate backups from a large server with lots of data and lots of queries. Of course I found a couple bugs and decided I needed more functionality and error handling. The major new functionality is for efficiency; it defers locking as late as possible and releases locks as soon as possible, and with the `--setperdb` option it treats each database as a set to be locked and dumped together. I also added some information that will be helpful when restoring a table dumped in chunks: the range of values in each chunk. And finally, I made it able to deal with some race conditions like a table being dropped between the time it's discovered and the time it's locked (this is very relevant for me because I [avoid temporary tables so replication is restartable][1]).

I don't have a timeline for when I'll write the corresponding restore utility, but the answer is probably "soon." This is very much a need-driven project. To begin with, I'm replacing a dump system that didn't allow point-in-time recovery. Now I've got the data I need for point-in-time recovery, but if I have to do that it'll be a manual job until I write the restore utility.

I am very focused on recovery, not backup, as you'll see if you buy the second edition of High Performance MySQL :-) I'm just solving my needs in the order of urgency: one must have a backup to do a restoration. I generally don't like the "urgent, fix now" approach! (For various reasons I won't get into, I am not able to use [ZRM][2], but I would ordinarily recommend it over rolling your own solution).

 [1]: http://www.xaprb.com/blog/2007/05/11/how-to-eliminate-temporary-tables-in-mysql/
 [2]: http://www.zmanda.com/
