---
title: MySQL Toolkit version 1254 released
date: "2007-11-12"
permalink: /2007/11/12/mysql-toolkit-version-1254-released/
categories:
  - Databases
  - Open Source
---

This release fixes several bugs introduced in the last release as I replaced untested code with tested code &#8212; how ironic! Actually, I knew that was virtually guaranteed to happen. Anyway, all the bugs you've helped me find are now fixed. I also fixed a long-standing bug in MySQL Table Sync, which I am otherwise trying to touch as little as possible for the time being. (Remember to contribute to the [bounty][1], and get your employer to contribute as well, so I can do some real work on it in the next month or so!)

The other big news is that the parallel dump and restore tools are now 1.0.0 because I consider them feature-complete. I have put the most work into tab-separated dumps. These two tools can do something MySQL AB's tools can't currently do: restore data before creating triggers (when doing tab-delimited dumps). That's an obvious requirement for loading data when tables have triggers. If you create the triggers before loading the data, you're practically guaranteed to end up with different data than was dumped. The tools now dump and reload both triggers and views. As long as you're dumping the mysql database, I think they should be able to completely duplicate a server (my initial goal was just data, not routines/triggers/views/etc).

Honestly, I hope MySQL's tools make this pair of tools obsolete in the future, but until then, they're a good way to dump and reload data at higher speeds. [Keith Murphy did some measurements on parallel dump and restore speeds.][2]

Here's the full changelog:

<pre>Changelog for mysql-archiver:

2007-11-12: version 1.0.3

   * The --no-ascend option caused too many bind variables to be used.

Changelog for mysql-parallel-dump:

2007-11-12: version 1.0.0

   * Dump views when --tab is given.
   * Use a module to find databases and tables.
   * Do not shell out to mysqldump for --tab.
   * Removed the --opt option.
   * Check for valid options to mysqldump.
   * Dump table definition and triggers separately for --tab.

Changelog for mysql-parallel-restore:

2007-11-12: version 1.0.0

   * Removed the --sql option, as sort order is implied when --tab is given.
   * Added code to load .trg files (triggers) and load 00_views files.
   * Print out files that are not loaded.

Changelog for mysql-table-checksum:

2007-11-12: version 1.1.18

   * DSN Parsing was broken.

Changelog for mysql-table-sync:

2007-11-12: version 0.9.9

   * DSN parsing was broken when --synctomaster was given with one DSN.
   * Changed --replicate to --synctomaster option.
   * Errors were being hidden in an EVAL when --execute was specified (bug #1819744).
</pre>

 [1]: http://www.xaprb.com/blog/2007/10/31/mysql-table-sync-bounty-lets-do-it/
 [2]: http://www.paragon-cs.com/wordpress/?p=52
