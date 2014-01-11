---
title: Why MySQL replication is better than mysqlbinlog for recovery
date: "2010-09-04"
permalink: /2010/09/04/why-mysql-replication-is-better-than-mysqlbinlog-for-recovery/
categories:
  - Databases
---
You have a backup, and you have the binary logs between that backup and now. You need to do point-in-time recovery (PITR) for some reason. What do you do? The traditional answer is "restore the backup and then use mysqlbinlog to apply the binary logs." But there's a much better way to do it.

The better way is to set up a server instance with no data, and load the binary logs into it. I call this a "binlog server." Then restore your backup and start the server as a replication slave of the binlog server. Let the roll-forward of the binlogs happen through replication, not through the mysqlbinlog tool.

Why is this better? Because replication is a more tested way of applying binary logs to a server. The results are much more likely to be correct, in my opinion. Plus, replication is easier and more convenient to use. You can do nice things like START SLAVE UNTIL, skip statements, stop and restart without having to figure out where you left off, and so on.

Replication also has the ability to correctly reproduce more types of changes than mysqlbinlog does. Try this with statement-based replication:

`<pre>insert into tbl(col) values(connection_id());</pre>` 
That'll work just fine through replication, because the SQL thread on the slave will change its connection ID to match the original. It won't work through mysqlbinlog.
