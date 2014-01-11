---
title: Maatkit version 2325 released
date: "2008-09-19"
permalink: /2008/09/19/maatkit-version-2325-released/
categories:
  - Maatkit
  - Perl
  - SQL
  - Sys Admin
  - Tools
---
<p class="download">
  <a href="http://code.google.com/p/maatkit/">Download Maatkit</a>
</p>

There's a new release with a lot of goodies &#8212; speed, efficiency, user-friendliness, and new features. In particular some of [Percona's][1] clients have sponsored features for things they need such as the ability to more frequently verify that slaves are in sync with their masters. If you need features, please ask Percona about it.

[Daniel Nichter][2] has written most of the code for this release. Having a dedicated developer is really moving the project forward. Thanks Daniel!

If you check the issues list on the project's website you'll see we have some ambitious plans for the project, mostly driven by real-world needs from Percona's clients, many of whom run very large data centers and such. It makes me really happy that Maatkit is solving serious problems for which no other solution exists.

Here's the changelog:

<!--more-->

<pre>Changelog for mk-archiver:

2008-09-19: version 1.0.11

   * Updates to shared code.
   * Made debugging code more efficient in non-debug mode.

Changelog for mk-audit:

2008-09-19: version 0.9.2

   * Checks /etc/sysctl.conf for default ipv4 system variables (issue 56).
   * No longer reports false-positive duplicate system variables (issue 58).
   * Added --socket.
   * The mysqld binary was not detected correctly from 'ps' output.
   * Made debugging code more efficient in non-debug mode.

Changelog for mk-deadlock-logger:

2008-09-19: version 1.0.12

   * Added --pid option.
   * Made debugging code more efficient in non-debug mode.

Changelog for mk-duplicate-key-checker:

2008-09-19: version 1.1.8

   * Updates to shared code.
   * Made debugging code more efficient in non-debug mode.

Changelog for mk-find:

2008-09-19: version 0.9.13

   * Updates to shared code.
   * Made debugging code more efficient in non-debug mode.

Changelog for mk-heartbeat:

2008-09-19: version 1.0.11

   * Dies if heartbeat table does not have at least one row (issue 45).
   * Added --pid option.
   * Using debug (MKDEBUG=1) and --daemonize now causes script to die.
   * Made debugging code more efficient in non-debug mode.

Changelog for mk-parallel-dump:

2008-09-19: version 1.0.10

   * Added option --biggestfirst which is enabled by default (issue 31).
   * --noflushlock and --nolocktables caused a global flush and lock (issue 12).
   * Made debugging code more efficient in non-debug mode.
   * Fixed various bugs in shared code.
   * Moved all command-line documentation to POD.

Changelog for mk-parallel-restore:

2008-09-17: version 1.0.9

   * Made restores resume by default if possible (issue 30).
   * Added --noresume option (issue 30).
   * Added --[no]atomicresume option (issue 30).
   * --progress is reported by bytes instead of chunk count (issue 32).
   * --progress counting and prediction was improved.
   * LOAD DATA queries show bytes done and db.tbl name in SQL comment.
   * CHARACTER SET was declared in the wrong place for csv LOAD DATA query.
   * Made debugging code more efficient in non-debug mode.

Changelog for mk-query-profiler:

2008-09-19: version 1.1.12

   * Updates to shared code.
   * Made debugging code more efficient in non-debug mode.

Changelog for mk-show-grants:

2008-09-19: version 1.0.12

   * Updates to shared code.
   * Made debugging code more efficient in non-debug mode.

Changelog for mk-slave-delay:

2008-09-19: version 1.0.9

   * Updates to shared code.
   * Made debugging code more efficient in non-debug mode.

Changelog for mk-slave-find:

2008-09-19: version 1.0.3

   * Updates to shared code.
   * Made debugging code more efficient in non-debug mode.

Changelog for mk-slave-move:

2008-09-19: version 0.9.3

   * Updates to shared code.
   * Made debugging code more efficient in non-debug mode.

Changelog for mk-slave-prefetch:

2008-09-19: version 1.0.4

   * Added --pid option.
   * Using debug (MKDEBUG=1) and --daemonize now causes script to die.
   * Made debugging code more efficient in non-debug mode.

Changelog for mk-slave-restart:

2008-09-19: version 1.0.9

   * Added --pid option (issue 18).
   * Made debugging code more efficient in non-debug mode.

Changelog for mk-table-checksum:

2008-09-19: version 1.1.29

   * Added --argtable, --offset and --modulo for issue 53.
   * Added --nouseindex option (issue 8).
   * Fixed processing of column options (issue 4, patch by Travis Whitton)
   * Changed --emptyrepltbl to always completely empty the table (issue 21).
   * Added --schema option for issue 5.
   * Added --since and --sincecolumn options for issue 53.
   * Added --probability option for issue 53.
   * A missing table caused a crash (issue 35).
   * Functions specified with --function were not optimized (issue 43).
   * Made debugging code more efficient in non-debug mode.

Changelog for mk-table-sync:

2008-09-19: version 1.0.9

   * Added --nouseindex option (issue 8).
   * Dies if any dest table has triggers unless --ignore-triggers (issue 37).
   * Added better support for CRC32 (issue 43).
   * Made debugging code more efficient in non-debug mode.

Changelog for mk-visual-explain:

2008-09-19: version 1.0.10

   * Updates to shared code.
   * Made debugging code more efficient in non-debug mode.</pre>

 [1]: http://www.percona.com/
 [2]: http://hackmysql.com/
