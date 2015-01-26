---
title: Version 1.5.2 of the innotop MySQL monitor released
date: "2007-09-18"
url: /blog/2007/09/18/version-152-of-the-innotop-mysql-monitor-released/
categories:
  - Monitoring
  - Databases
  - Open Source
---

This release is part of the unstable 1.5 branch. Its features will ultimately go into the stable 1.6 branch. You can download it from the [innotop-devel package][1].

> Note: [VividCortex](https://vividcortex.com/) is the startup I founded in 2012. It's the easiest way to monitor what
> your servers are doing in production. VividCortex offers [MySQL performance
> monitoring](https://vividcortex.com/monitoring/mysql/) and [PostgreSQL
> performance management](https://vividcortex.com/monitoring/postgres/) among many
> other features.

The major change is I've ripped out the W (Lock Waits) mode and enabled innotop to discover not only what a transaction is waiting for, but what it holds too. The new mode that replaces W is L (Locks). My last article goes into more detail on this.

 [1]: http://code.google.com/p/innotop
