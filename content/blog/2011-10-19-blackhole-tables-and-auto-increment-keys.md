---
title: Blackhole tables and auto-increment keys
author: Baron Schwartz
layout: post
permalink: /2011/10/19/blackhole-tables-and-auto-increment-keys/
categories:
  - SQL
tags:
  - Blackhole
  - Galera
  - replication
---
Blackhole tables are often used on a so-called "relay slave" where some operation needs to happen but no data needs to exist. This used to have [a bug][1] that prevented AUTO_INCREMENT columns from propagating the right values through replication, but that was fixed. It turns out there's [another bug][2], though, that has the same effect. This one is caused when there is an INSERT into a Blackhole table, where the source data is SELECT-ed from another Blackhole table.

I think it's wise to keep it simple. MySQL has tons of cool little features that theoretically suit edge-case uses and make ninja tricks possible, but I really trust the core plain-Jane functionality so much more than these edge-case features. That's precisely because they often have some edge-case bugs, especially with replication.

Something that's new to MySQL recently is Galera replication. The more I think about it, the more I think it's fundamentally the right way to replicate. Statement-based replication was brittle; row-based is less so, but still has all kinds of gotchas. The real problem with both is that they are built into the server, not the storage engine. Engine-level replication is the way to go. PBXT has had engine-level replication for a while, although I've never used PBXT in production (and kudos to PostgreSQL for adding built-in replication, too). I used to want InnoDB to do replication via streaming the redo logs and applying them, but that actually has a lot of limitations. Galera is InnoDB's answer to engine-level replication. I think Galera holds a lot of promise for the future.

 [1]: http://bugs.mysql.com/bug.php?id=35178
 [2]: http://bugs.mysql.com/bug.php?id=62829
