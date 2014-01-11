---
title: Binary log checksums in MySQL 5.6
date: "2012-09-30"
permalink: /2012/09/30/binary-log-checksums-in-mysql-5-6/
categories:
  - SQL
---
MySQL 5.6 will have "[checksums in the binary log][1]," which can be variously described, but one phrase I've heard a few times is, loosely, that it helps ensure replication integrity. This isn't specific enough to make it clear what it does, and when I've talked about pt-table-checksum and its purpose (for example, on webinars), people often ask whether pt-table-checksum will be obsoleted by replication checksums in MySQL 5.6. The answer is no, they do completely different things. But it's kind of confusing, a bit like [semi-synchronous replication][2] in that regard.

pt-table-checksum ensures that your replicas have the same logical dataset as their masters. They can drift for any number of reasons &#8212; someone changes data directly on the replica, there is an error in replication, a nondeterministic change is made on the master in STATEMENT binlog format &#8212; the list goes on. MySQL 5.6 will add many safeguards to help prevent or avoid some of these, but they are still possible. You need a tool like pt-table-checksum to verify *data integrity* on replicas. The server has no built-in way to do that for you.

Binary log event checksums ensure that the binary log events are transmitted without corruption when replicas connect to the master and retrieve its binary log. This prevents problems such as bit-flips in memory, bugs in the I/O thread when it reads the log events and writes them to the relay log, network corruption, and so forth. It does *not* verify that the data that's changed by the binary log event will match the changes on the master.

I'm really happy with the binary log checksum feature, and glad that it's enabled by default. I have fixed many replication problems caused by binary logs being transmitted to a relay log incorrectly. Preventing them from happening in the first place, or detecting when they do and halting replication, is a great enhancement. By the way, [I requested this feature][3], so, thanks Oracle!

 [1]: http://dev.mysql.com/doc/refman/5.6/en/replication-options-binary-log.html#sysvar_binlog_checksum
 [2]: http://www.mysqlperformanceblog.com/2012/01/19/how-does-semisynchronous-mysql-replication-work/
 [3]: http://bugs.mysql.com/bug.php?id=25737
