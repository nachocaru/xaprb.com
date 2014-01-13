---
title: Building a MySQL server with XtraDB for speed
date: "2011-02-08"
url: /blog/2011/02/08/building-a-mysql-server-with-xtradb-for-speed/
categories:
  - Databases
---
I've seen this a handful of times: someone has trouble with their database performance, and they have heard that XtraDB is much faster than InnoDB. They build a custom-compiled server with XtraDB.

This is unfortunately missing the point a bit. If you have a server that is the same as normal MySQL, but you've replaced InnoDB by XtraDB, what do you have? Depending on the version of MySQL you're using, you have somewhere between, say, 1.5x and 15x performance improvement, at best. Compared to what you *could* be getting, that is not much, because you're missing the most important improvement in Percona Server: the ability to measure the server's activity. In other words, with a faster server that you still can't measure and diagnose easily, you have just painted yourself into a faster corner. Your application's workload is likely to grow 1.5x in no time; you have barely put off needing to diagnose why it is slow.

The real crown jewels in Percona Server are not the performance improvements. They are the features such as making the replication thread write the queries it executes to the slow query log just like normal threads. There are many such improvements. It doesn't sound like much -- but it makes a world of difference.
