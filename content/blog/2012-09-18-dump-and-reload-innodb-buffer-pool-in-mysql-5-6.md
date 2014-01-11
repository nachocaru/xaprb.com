---
title: Dump and reload InnoDB buffer pool in MySQL 5.6
author: Baron Schwartz
layout: post
permalink: /2012/09/18/dump-and-reload-innodb-buffer-pool-in-mysql-5-6/
categories:
  - SQL
---
After [Gavin Towey&#8217;s recent blog post][1] about Percona Server&#8217;s buffer pool dump locking the server for the duration of the operation, I thought I should re-examine MySQL 5.6&#8242;s implementation of a similar feature. When InnoDB engineers first announced the feature, I didn&#8217;t think it was complete enough to serve a DBA&#8217;s needs fully.

If you&#8217;re not familiar with this topic, MySQL 5.6 will allow the DBA to save the IDs of the database pages that are in the buffer pool, and reload the pages later. This technique can help a server to warm up in minutes instead of hours after a restart or failover.

I read through the [documentation][2], and it looks good. I still think it might be good to have a built-in configuration variable to save the page IDs at regular intervals. But the approach MySQL 5.6 has taken will allow a DBA to use an event or a script to trigger that, so it&#8217;s more of an inconvenience than a showstopper. On the other hand, dumping on shutdown and reloading on startup are probably the most useful behaviors, and MySQL 5.6 does include that.

There is also more visibility into status and progress of the operation, which is good.

The million-dollar question is whether InnoDB&#8217;s implementation blocks the server&#8217;s operation, or whether it works without interrupting service. I&#8217;ll be curious to see if anyone has tested that.

 [1]: http://gtowey.blogspot.com/2012/09/how-to-shoot-yourself-in-foot-with.html
 [2]: http://dev.mysql.com/doc/refman/5.6/en/innodb-performance.html#innodb-preload-buffer-pool