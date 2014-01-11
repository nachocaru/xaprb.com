---
title: Version 0.1.146 of innotop released
date: "2006-08-19"
permalink: /2006/08/19/version-01146-of-innotop-released/
description:
  - Version 0.1.146 of the innotop InnoDB and MySQL monitor is available.
---
I've released version 0.1.146 of the innotop MySQL and InnoDB monitor. You can [download innotop from its homepage][1].

I re-arranged some information to be more compact and readable in this version, but there isn't really much new functionality. This is mostly a bug-fix release to prevent crashes when innotop encounters unexpected information, or doesn't find some information it expects to exist. It's still very much beta software, so it may die unexpectedly. See [this article about what information I need][2] to debug and fix crashes.

Crashes should not cause any loss of information or other problems, by the way. It's completely safe to run, because it doesn't modify anything, it just reads status information. Up till now I've preferred for it to die so I notice any deficiencies, rather than failing silently.

 [1]: http://www.xaprb.com/innotop/
 [2]: http://www.xaprb.com/blog/2006/08/02/what-to-do-when-innotop-crashes/
