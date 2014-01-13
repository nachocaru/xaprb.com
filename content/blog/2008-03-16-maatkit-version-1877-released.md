---
title: Maatkit version 1877 released
date: "2008-03-16"
permalink: /2008/03/16/maatkit-version-1877-released/
categories:
  - Databases
  - Open Source
---

Maatkit contains essential command-line utilities for MySQL, such as a table checksum tool and query profiler. It provides missing features such as checking slaves for data consistency, with emphasis on quality and scriptability.

This release contains major bug fixes and new features. Some of the changes are not backwards-compatible. It also contains new tools to help you discover replication slaves and move them around the replication hierarchy.

<pre>Changelog for mk-archiver:

2008-03-16: version 1.0.8

   * Added --setvars option (bug #1904689, bug #1911371).
   * Added --charset option (bug #1877548).
   * Changed short form of --analyze to -Z to avoid conflict with --charset.

Changelog for mk-deadlock-logger:

2008-03-16: version 1.0.9

   * Added --setvars option (bug #1904689, bug #1911371).
   * Added 'A' part to DSNs (bug #1877548).

Changelog for mk-duplicate-key-checker:

2008-03-16: version 1.1.5

   * Added --setvars option (bug #1904689, bug #1911371).
   * Added --charset option (bug #1877548).

Changelog for mk-find:

2008-03-16: version 0.9.10

   * Added --setvars option (bug #1904689, bug #1911371).
   * Added --charset option (bug #1877548).

Changelog for mk-heartbeat:

2008-03-16: version 1.0.8

   * Added --setvars option (bug #1904689, bug #1911371).
   * Added --charset option (bug #1877548).

Changelog for mk-parallel-dump:

2008-03-16: version 1.0.7

   * Added --setvars option (bug #1904689, bug #1911371).
   * Added --charset option (bug #1877548).
   * A global database connection was re-used by children, causing a hang.

Changelog for mk-parallel-restore:

2008-03-16: version 1.0.6

   * Added --setvars option (bug #1904689, bug #1911371).
   * Changed --charset to be compatible with other tools (bug #1877548).

Changelog for mk-query-profiler:

2008-03-16: version 1.1.9

   * Added --setvars option (bug #1904689, bug #1911371).
   * Added --charset option (bug #1877548).

Changelog for mk-show-grants:

2008-03-16: version 1.0.9

   * Added --setvars option (bug #1904689, bug #1911371).
   * Added --charset option (bug #1877548).

Changelog for mk-slave-delay:

2008-03-16: version 1.0.6

   * Added --setvars option (bug #1904689, bug #1911371).
   * Added 'A' part to DSNs (bug #1877548).

Changelog for mk-slave-find:

2008-03-16: version 1.0.0

   * Initial release.

Changelog for mk-slave-move:

2008-03-16: version 0.9.0

   * Initial release.

Changelog for mk-slave-prefetch:

2008-03-16: version 1.0.1

   * Added --setvars option (bug #1904689, bug #1911371).
   * Added --charset option (bug #1877548).

Changelog for mk-slave-restart:

2008-03-16: version 1.0.6

   * Added --setvars option (bug #1904689, bug #1911371).
   * Added --charset option (bug #1877548).
   * Added logic to repair tables, and rewrote a lot of code.
   * Added --always option, disabled by default.  Not backwards compatible.
   * --daemonize did not work.
   * --quiet caused an undefined variable error.

Changelog for mk-table-checksum:

2008-03-16: version 1.1.26

   * Added --setvars option (bug #1904689, bug #1911371).
   * Added 'A' part to DSNs (bug #1877548).
   * Added --unique option to mk-checksum-filter.
   * The exit status from mk-checksum-filter was always 0.
   * mk-table-checksum now prefers to discover slaves via SHOW PROCESSLIST.

Changelog for mk-table-sync:

2008-03-16: version 1.0.6

   * --chunksize was not being converted to rowcount (bug #1902341).
   * Added --setvars option (bug #1904689, bug #1911371).
   * Deprecated the --utf8 option in favor of the A part in DSNs.
   * Mixed-case identifiers caused case-sensitivity issues (bug #1910276).
   * Prefer SHOW PROCESSLIST when looking for slaves of a server.

Changelog for mk-visual-explain:

2008-03-16: version 1.0.7

   * Added --setvars option (bug #1904689, bug #1911371).
   * Added --charset option (bug #1877548).
</pre>
