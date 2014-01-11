---
title: MySQL Toolkit version 815 released
date: "2007-08-24"
permalink: /2007/08/24/mysql-toolkit-version-815-released/
description:
  - >
    A new release of the toolkit with mostly minor updates, and incremental
    foot-dragging on MySQL Table Sync while I put off really improving it.
tags:
  - MySQL
  - mysqltoolkit
  - SQL
---
<p class="download">
  <a href="http://code.google.com/p/maatkit">Download MySQL Toolkit</a>
</p>

I've just released changes to all tools in MySQL Toolkit. The biggest changes are in MySQL Table Sync, which I'm beginning to give sane defaults and options to. Some of the changes are incompatible (but that's what you get with MySQL Table Sync, which is still very rough). I also found and fixed some bugs with MySQL Visual Explain. Thanks to everyone who submitted bug reports.

Note, the formatting overflow in MySQL Query Profiler was not a security vulnerability. It was simply an issue with a Perl formatting code that displayed numbers as hash marks when they got big enough.

Here's the whole changelog:

<pre>Changelog for mysql-archiver:

2007-08-23: version 1.0.1

   * MySQL socket connection option didn't work.
   * Added --askpass option.

Changelog for mysql-deadlock-logger:

2007-08-23: version 1.0.3

   * MySQL socket connection option didn't work.
   * Added --askpass option.
   * Truncated output could crash on an undefined regex result.
   * Made --source and --dest accept bareword hostnames.
   * Made DBI errors only print once.

Changelog for mysql-duplicate-key-checker:

2007-08-23: version 1.0.5

   * MySQL socket connection option didn't work.
   * Added --askpass option.

Changelog for mysql-find:

2007-08-23: version 0.9.4

   * MySQL socket connection option didn't work.
   * Added --askpass option.

Changelog for mysql-query-profiler:

2007-08-23: version 1.1.3

   * MySQL socket connection option didn't work.
   * Large queries overflowed the formatting room available.

Changelog for mysql-show-grants:

2007-08-23: version 1.0.3

   * MySQL socket connection option didn't work.
   * Added --askpass option.

Changelog for mysql-slave-delay:

2007-08-23: version 1.0.0

   * MySQL socket connection option didn't work.
   * Added a check that the server is a slave.

Changelog for mysql-slave-restart:

2007-08-23: version 1.0.0

   * MySQL socket connection option didn't work.
   * Added --askpass option.

Changelog for mysql-table-checksum:

2007-08-23: version 1.1.13

   * MySQL socket connection option didn't work.
   * Added --askpass option.

Changelog for mysql-table-sync:

2007-08-23: version 0.9.6

   * Added --askpass option.
   * Changed --replicate option to --synctomaster.
   * Fixed the MySQL socket option.
   * Made --synctomaster able to connect to the master from SHOW SLAVE STATUS.
   * MySQL socket connection option didn't work.
   * Suppress duplicated error messages from MySQL.
   * Changed DSN from URL-ish format to key=value format.
   * Generated WHERE clauses weren't properly isolated in parentheses.
   * Changed exit status to 0 when --help is given.
   * Made --replicate imply --wait 60.

Changelog for mysql-visual-explain:

2007-08-23: version 1.0.1

   * MySQL socket connection option didn't work.
   * Added --askpass option.
   * UNIONs inside a SUBQUERY weren't correctly nested.
   * Some types of impossible queries weren't handled.</pre>
