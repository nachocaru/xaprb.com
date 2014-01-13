---
title: MySQL Toolkit distribution 620 released
date: "2007-07-05"
permalink: /blog/2007/07/05/mysql-toolkit-distribution-620-released/
categories:
  - Databases
  - Open Source
---

MySQL Toolkit distribution 620 updates documentation and test suites, includes some major bug fixes and functionality changes, and adds one new tool to the toolkit. This article is mostly a changelog, with some added notes.

Many of the tools have matured and I just needed to make the documentation top-notch, but there's still a lot to be done on the crucial checksumming and syncing tools. Time is in short supply for me right now, though. In fact, I actually finished this release on June 22, but wasn't able to release it till just tonight!

Documentation is now maintained online at the [MySQL Toolkit][1] website, by the way.

### mysql-archiver

Version 0.9.3

Changes

*   Added more hooks for plugins before and after archiving.
*   Documentation.
*   Made &#8211;time suffix optional.

Bugs fixed

*   MySQL Archiver could crash on a lock wait timeout when &#8211;txnsize was not set

### mysql-deadlock-logger

Version 1.0.2

Incompatible changes

*   Changed the format of the &#8211;source and &#8211;dest options.

Changes

*   Documentation.

### mysql-duplicate-key-checker

Version 1.0.4

*   Documentation.

### mysql-find

Version 0.9.3

*   Documentation.

### mysql-query-profiler and mysql-profile-compact

Version 1.1.2

*   Documentation

### mysql-show-grants

Version 1.0.2

*   Documentation.

### mysql-slave-restart

Version 0.9.2. This is an initial release of a new tool. I found myself in a situation where I needed to do some complex error-skipping on a slave (its [relay logs got into an infinite loop][2]). I have written throwaway scripts to skip, restart, check, skip several times in the past, but this situation called for something more complex. Again I realized I was three-quarters of the way to a more flexible, powerful tool many people might find useful, so I went ahead and put the extra effort into it.

It ended up helping me avoid re-snapshotting a slave with a ton of data, so it was worth it.

### mysql-table-checksum and mysql-checksum-filter

This version fixes some badly optimized chunking queries. As I have mentioned in the past, the chunking behavior is preliminary and subject to change. This is still true, but this release is much smarter than the previous release! I have also fleshed out some methods of doing chunking on real-valued columns (float, decimal, and even character). I don't know when I'll get a chance to code, test, and release that.

Even though much remains to be done, MySQL Table Checksum is still a great way to check that your slaves have the same data as the master. (In fact, it's the only way I know of -- and [MySQL employees themselves recommend MySQL Table Checksum][3]).

Version 1.1.8

Changes

*   Documentation.
*   Support complex host definitions.
*   Added &#8211;explainhosts option to debug host definitions.
*   Added &#8211;explain option.
*   When exact chunking is impossible, mysql-table-checksum will use approximate.

Incompatible changes

*   Added required 'boundaries' column to checksum table for &#8211;replicate.

Bugs fixed

*   Chunking on temporal types defeated indexes.

### mysql-table-sync

Version 0.9.5

*   Documentation.

 [1]: http://code.google.com/p/maatkit/
 [2]: http://bugs.mysql.com/bug.php?id=28421
 [3]: http://mysqlmusings.blogspot.com/2007/06/replication-poll-and-our-plans-for.html
