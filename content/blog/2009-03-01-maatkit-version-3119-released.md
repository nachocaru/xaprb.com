---
title: Maatkit version 3119 released
permalink: /2009/03/01/maatkit-version-3119-released/
categories:
  - Maatkit
  - Perl
  - SQL
  - Tools
---
Your monthly cup of [Maatkit][1] is brewed and ready to drink. You can [download it from the Google Code project][2].

New this month: a bunch of usability and feature enhancements for mk-query-digest, much improved duplicate key checking with mk-duplicate-key-checker, and important bug fixes for mk-parallel-dump and mk-parallel-restore, as well as the usual minor fixes and upgrades.

The full list of changes follows.

<!--more-->

<pre>Changelog for mk-duplicate-key-checker:

2009-03-01: version 1.2.1

   * Enabled --clustered by default.
   * Some special cases with unique/primary keys weren't handled (issue 9).
   * Improved duplicate key finding (issue 269).

Changelog for mk-parallel-dump:

2009-03-01: version 1.0.13

   * --chunksize did not work properly with --csv (issue 275).

Changelog for mk-parallel-restore:

2009-03-01: version 1.0.12

   * Changed --nobinlog to --binlog 0|1 (default 1).
   * --nobinlog did not work (issue issue 57, issue 264).
   * Added --decompress option for portability (issue 274).

Changelog for mk-query-digest:

2009-03-01: version 0.9.3

   * Added --createreview option to create the --review table (issue 266).
   * Database wasn't printed in SHOW CREATE TABLE/SHOW TABLE STATUS (issue 290).
   * "--report tables" will now print "SHOW CREATE..." etc (issue 287).
   * Some long queries were not shortened (issue 292).
   * INSERT/ON DUPLICATE KEY UPDATE caused extra tables to be found (issue 291).
   * Changed the --truncateinsert option to --shorten (issue 292).
   * Added --explain to print the EXPLAIN in the report (issue 199).
   * Added 'bytes' property to log events (issue 247).
   * Some INSERT/REPLACE queries were not truncated (issue 216).
   * INSERT/REPLACE were needlessly converted for EXPLAIN (issue 283).
   * SELECTs starting with a comment were converted for EXPLAIN (issue 252).
   * Added informational text to show why items are reported on (issue 282).
   * IN() lists were parsed as table names (issue 277).
   * The parser crashed on some logs from Windows servers (issue 267).
   * Added the ability to parse embedded attributes (issue 177).
   * Log entries without a Time property crashed --review (issue 263).
   * All-zero timestamps displayed in unwanted places (issue 202).

Changelog for mk-table-sync:

2009-03-01: version 1.0.13

   * Added --explainhosts option (issue 293).
   * Throw an error when trying to use D= to restrict syncing to one database.
   * Checking tables for triggers caused a crash (issue 262).
   * Database or table names with spaces caused a crash (issue 262).
</pre>

 [1]: http://www.maatkit.org/
 [2]: http://code.google.com/p/maatkit/
