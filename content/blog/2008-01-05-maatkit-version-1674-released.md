---
title: Maatkit version 1674 released
date: "2008-01-05"
permalink: /2008/01/05/maatkit-version-1674-released/
---
<p class="download">
  <a href="http://code.google.com/p/maatkit/">Download Maatkit</a>
</p>

Maatkit contains essential command-line utilities for MySQL, such as a table checksum tool and query profiler. It provides missing features such as checking slaves for data consistency, with emphasis on quality and scriptability.

This release contains bug fixes and new features.

<pre>Changelog for mk-archiver:

2008-01-05: version 1.0.6

   * Made suffixes for time options optional (bug #1858696).

Changelog for mk-deadlock-logger:

2008-01-05: version 1.0.8

   * Made suffixes for time options optional (bug #1858696).

Changelog for mk-heartbeat:

2008-01-05: version 1.0.6

   * Made suffixes for time options optional (bug #1858696).

Changelog for mk-parallel-dump:

2008-01-05: version 1.0.4

   * Second and later chunks had DROP/CREATE TABLE (bug #1863949).
   * Made suffixes for time options optional (bug #1858696).
   * --locktables didn't disable --flushlock.

Changelog for mk-parallel-restore:

2008-01-05: version 1.0.3

   * Made suffixes for time options optional (bug #1858696).
   * --ignoretables was ignored.

Changelog for mk-slave-delay:

2008-01-05: version 1.0.5

   * Made suffixes for time options optional (bug #1858696).
   * The program was ignoring some connection parameters.
   * Made the program use master when the I/O thread waits for relay log space.

Changelog for mk-slave-restart:

2008-01-05: version 1.0.5

   * Made suffixes for time options optional (bug #1858696).
   * Added logic to discard corrupt relay logs.
   * Added --monitor, --sentinel, and --stop.
   * Added --quiet and changed --verbose to 1 by default.
   * Added the ability to monitor many servers with --recurse.

Changelog for mk-table-checksum:

2008-01-05: version 1.1.24

   * Added support for the FNV_64 UDF, which is distributed with Maatkit.
   * --emptyrepltbl didn't Do The Right Thing by default.
   * --explain didn't disable --emptyrepltbl
   * Made suffixes for time options optional (bug #1858696).
   * The --float-precision option was ignored.
   * (mk-checksum-filter) -i, -d options worked only on multiple files.

Changelog for mk-table-sync:

2008-01-05: version 1.0.3

   * Added the --function command-line option.
   * Added support for the FNV_64 hash function (see mk-table-checksum).
   * Made suffixes for time options optional (bug #1858696).
   * InnoDB tables use --transaction unless it's explicitly specified.</pre>
