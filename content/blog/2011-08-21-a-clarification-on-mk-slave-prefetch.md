---
title: A clarification on mk-slave-prefetch
date: "2011-08-21"
permalink: /2011/08/21/a-clarification-on-mk-slave-prefetch/
categories:
  - Maatkit
  - SQL
---
It seems to be a popular misconception that mk-slave-prefetch is designed to keep a MySQL replica server "warm" and ready to serve production traffic in case the master is demoted or fails. **This is not what mk-slave-prefetch does**. It's related, and easy to confuse, but its purpose is different.

The mk-slave-prefetch tool is designed to try to execute a read-only approximation of the write workload that the replica is about to have to perform. It is meant to do this just a little bit before the replication thread (which can only be true if replication is lagging), so that when the replica replays writes to execute replication, it doesn't have to wait for disk I/O.

Keeping caches warmed up for production traffic requires that the *read* workload, which does not flow through relay logs, is executed on the server. If you point mk-slave-prefetch at a server, you're just double-executing the *write* workload in a read-only fashion.

Perhaps an example will clarify. Suppose that a master database has a bunch of writes to WritableTable, and lots and lots of reads to ReadableTable. On the replica, the only queries in the relay log will be on WritableTable. And what will mk-slave-prefetch be doing? Executing SELECT queries against WritableTable. No traffic on ReadableTable at all. If you switch to use the replica as the primary server, ReadableTable's data won't be in the caches.

To actually warm up the replica, you need to replay the queries against the ReadableTable. You can only find those by looking at the master. You can read its query logs, or watch its processlist, or capture TCP traffic, or any other method of capturing read traffic. There is a feature built into mk-query-digest to help you capture and replay these against the replica: [&#8211;execute][1].

A parting note: mk-slave-prefetch is an extremely niche tool that generally doesn't help replicas keep up with their masters. Only in very special cases is the hardware, data, and workload suitable for what it does.

 [1]: http://www.maatkit.org/doc/mk-query-digest.html#execute
