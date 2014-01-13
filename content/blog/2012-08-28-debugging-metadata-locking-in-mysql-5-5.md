---
title: Debugging metadata locking in MySQL 5.5
date: "2012-08-28"
permalink: /blog/2012/08/28/debugging-metadata-locking-in-mysql-5-5/
categories:
  - Databases
---
MySQL 5.1 added a long-needed feature: INFORMATION_SCHEMA tables for inspecting locks held and waited-for inside of InnoDB. With this addition, it became possible to [figure out who is blocking whom][1].

MySQL 5.5 changed a lot more things inside the server. One of the new features is improved [metadata locking][2]. This solves a lot of inconsistencies and bugs that were previously possible. The output of `SHOW PROCESSLIST` is also changed; instead of the venerable `Locked` status, there are more fine-grained status indicators such as `Waiting for table metadata lock`. 
Unfortunately, the additional locking is not possible for the DBA to inspect. Where InnoDB's storage-engine-level locking used to be opaque and was then made transparent, now server-level locking is a mystery, and in my experience much more likely to become a problem than it used to be. (The server now does a lot more locking of things it previously neglected to lock.)

I have recently run into a number of circumstances where metadata locking prevents users from doing any work. The locking is not inside InnoDB, so the INFORMATION_SCHEMA tables show nothing at all. I tried using `mysqladmin debug` and looking at the contents of the server's error log, but the table in question was shown as unused in the output there. I tried examining each of the other connections to the server, but was unable to find any connection that I believed could have touched the table and locked it. The lock wait was ongoing for a long time, and no other transaction had been started previous to that, so it did not seem that a long-running transaction could have touched the table and was keeping a metadata lock open.

It feels like a bug in metadata locking to me, but I will need to dig in more deeply the next time I see it happen. Unfortunately, it's unlikely that I'll be able to create a reproducible test case, because there's no way to actually see what is happening. I hope that a future version of MySQL will include a more comprehensive set of tables for inspecting locks, requests, and waits at all layers of the server.

 [1]: http://dev.mysql.com/doc/innodb-plugin/1.0/en/innodb-information-schema-examples.html
 [2]: http://dev.mysql.com/doc/refman/5.5/en/metadata-locking.html
