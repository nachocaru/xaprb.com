---
title: Maatkit version 2979 released
date: "2009-02-01"
permalink: /2009/02/01/maatkit-version-2979-released/
categories:
  - SQL
---
Our monthly [Maatkit][1] release is [ready to download][2], on time as we've gotten into the habit of doing every month. There have been a LOT of changes. One thing to note: mk-log-parser is now renamed as [mk-query-digest][3]. There is too much else to write about, and things are in very rapid flux. Just [read the documentation][4]!

If you don't see [your bug fixed or feature request implemented][5] below, now's a great time to sponsor the features you need. Percona's business is growing quickly and the need for excellent tools for us and our clients is very high. That means other people's requests just get lower priority unless there's money to pay the developer's paycheck with.

A big, big thanks to [EngineYard][6], [Vantage Media][7] and [Kongregate][8], who sponsored the features they needed in Maatkit this month.

<pre>Changelog for mk-archiver:

2009-02-01: version 1.0.13

   * Fixed insert on destination table with different column order (issue 131).
   * Updates to shared code.
   * Fixed and updated POD.

Changelog for mk-audit:

2009-02-01: version 0.9.5

   * Added detection of 3ware and Adaptec RAID controllers (issue 123).
   * Path to vgs was hard-coded instead of using which (issue 116).
   * Duplicate vars reported several false-positives (issue 115).
   * Removed warnings for undefined system variables (issue 114).
   * Out-of-sync vars reported several false-positives (issue 102 &#038; 138).

Changelog for mk-duplicate-key-checker:

2009-02-01: version 1.2.0

   * Changed output from tabular to human-readable (issue 196).
   * Improved duplicate key finding (issue 9).
   * Added DROP KEY statement to output for each duplicate key (issue 82).
   * -- commented all output lines except SQL statements (issue 82).
   * Added --[no]sql option (issue 82).
   * Added summary of keys to end of output (182).
   * Removed --allatonce option.
   * Updated documentation and shared code.

Changelog for mk-parallel-dump:

2009-02-01: version 1.0.12

   * CREATE TRIGGER defs were wrongly included in chunk files (issue 223).

Changelog for mk-parallel-restore:

2009-02-01: version 1.0.11

   * Resume died if the table did not exist (issue 221).

Changelog for mk-query-digest:

2009-02-01: version 0.9.2

   * Renamed from mk-log-parser to mk-query-digest.
   * Added the --timeline option (issue 254).
   * Added the ability to analyze with --groupby distill (issue 254).
   * Added the ability to analyze with --groupby tables (issue 230).
   * Table names with reserved words weren't recognized (issue 209).
   * Changed the names of options --top, --analyze, --worst, etc.
   * Added the ability to aggregate the log multiple ways (issue 176).
   * Rewrote internals to aid in other projects (partial work on issue 242).
   * Made the SHOW CREATE/SHOW STATUS have the sample query's DB (issue 213).
   * Added more information to the global header (issue 200).
   * Reformatted the query report header (issue 205).
   * Added the --outliers option (issue 171).
   * Added the --mirror option (issue 236).
   * Made --execute reconnect when the server goes away (issue 237).
   * Made --processlist reconnect when the server goes away (issue 237).
   * Added --daemonize and --pid (issue 235).
   * Buggy log output for administrator commands skewed results (issue 239).
   * Switched to logarithmic buckets to save memory (issue 224).
   * Trimmed mysqldump insert samples (issue 216).
   * Enhanced the query fingerprinting (issue 220).
   * Query_time with two decimal points caused a crash (issue 234).
   * Very large INSERT statements from mysqldump segfaulted on older Perl.
   * Very large attribute values in slowlogs caused a crash (issue 197).
   * Added the ability to watch the processlist with --processlist (issue 151).
   * Added --execute and --filter options (issue 207).
   * Fixed and updated POD.

Changelog for mk-slave-delay:

2009-02-01: version 1.0.11

   * h DSN part was required even if an S part was given (issue 149).

Changelog for mk-slave-move:

2009-02-01: version 0.9.5

   * Fixed and updated POD.

Changelog for mk-slave-restart:

2009-02-01: version 1.0.11

   * --error-numbers did not work (issue 118).

Changelog for mk-table-checksum:

2009-02-01: version 1.2.3

   * Fixed and updated POD.

Changelog for mk-table-sync:

2009-02-01: version 1.0.12

   * An older DBD library caused an infinite loop (issue 11).
   * Updated common modules.
</pre>

 [1]: http://www.maatkit.org/
 [2]: http://code.google.com/p/maatkit/downloads/list
 [3]: http://www.maatkit.org/doc/mk-query-digest.html
 [4]: http://www.maatkit.org/doc/
 [5]: http://code.google.com/p/maatkit/issues/list
 [6]: http://www.engineyard.com/
 [7]: http://www.vantagemedia.com/
 [8]: http://www.kongregate.com/
