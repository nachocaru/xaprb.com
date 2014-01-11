---
title: Version 1.5.2 of the innotop MySQL monitor released
  <p>This release is part of the unstable 1.5 branch. Its features will ultimately go into the stable 1.6 branch. You can download it from the <a href="http://sourceforge.net/project/showfiles.php?group_id=186074">innotop-devel package</a>.</p>
  
  <p>The major change is I've ripped out the W (Lock Waits) mode and enabled innotop to discover not only what a transaction is waiting for, but what it holds too.  The new mode that replaces W is L (Locks).  My last article goes into more detail on this.</p>
permalink: /2007/09/18/version-152-of-the-innotop-mysql-monitor-released/
description:
  - innotop shows you what locks each transaction holds.
tags:
  - InnoDB
  - Innotop
  - monitoring
  - MySQL
  - SQL
  - transactions
---
<p class="download">
  <a href="http://code.google.com/p/innotop">Download innotop</a>
</p>

This release is part of the unstable 1.5 branch. Its features will ultimately go into the stable 1.6 branch. You can download it from the [innotop-devel package][1].

The major change is I've ripped out the W (Lock Waits) mode and enabled innotop to discover not only what a transaction is waiting for, but what it holds too. The new mode that replaces W is L (Locks). My last article goes into more detail on this.

 [1]: http://code.google.com/p/innotop
