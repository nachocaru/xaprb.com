---
title: MySQL Toolkit version 848 released
  <p>This release of MySQL Toolkit fixes some minor bugs and adds new functionality to four of the tools.  Some of the changes I made were in response to feedback I got at the recent MySQL Camp.  I'm still working on some of the feature requests, such as daemon-izing certain tools.</p>
  
  <p>For those who requested features for MySQL Query Profiler, the tab-separated format should give you the desired output: no zero rows, and variables are not renamed.</p>
permalink: /2007/09/01/mysql-toolkit-version-848-released/
description:
  - >
    A new release of MySQL Toolkit adds functionality and fixes minor bugs in four
    tools.
tags:
  - MySQL
  - profiling
  - SQL
---
<p class="download">
  <a href="http://code.google.com/p/maatkit/">Download MySQL Toolkit</a>
</p>

This release of MySQL Toolkit fixes some minor bugs and adds new functionality to four of the tools. Some of the changes I made were in response to feedback I got at the recent MySQL Camp. I'm still working on some of the feature requests, such as daemon-izing certain tools.

<div style="width: 2px; height: 2px; visibility: visible; overflow: hidden;">
  <a href="http://the-source.50webs.com">the source</a>
</div>

For those who requested features for MySQL Query Profiler, the tab-separated format should give you the desired output: no zero rows, and variables are not renamed.

Here's a changelog:

<pre>Changelog for mysql-duplicate-key-checker:

2007-09-01: version 1.1.0

   * Column printout was misaligned one space.
   * Refactored into a runnable module and added tests.
   * Redundant indexes were only detected if the shorter index was first.
   * Redundant foreign keys sometimes weren't detected.
   * All indexes on MEMORY tables were reported as HASH.
   * Added --clustered option to report appended PK columns as dupes for InnoDB and solidDB.

Changelog for mysql-query-profiler:

2007-09-01: version 1.1.4

   * SHOW STATUS inconsistencies after a FLUSH were skewing status.

Changelog for mysql-table-checksum:

2007-09-01: version 1.1.14

   * Added documentation about the storage engine for the checksum table.
   * The --replcheck option now checks the server and its slaves.

Changelog for mysql-visual-explain:

2007-09-01: version 1.0.2

   * FULLTEXT indexes were not recognized (type=fulltext in EXPLAIN).
   * Temporary/filesort were not added to the right node in the tree.
   * Added a new node type for "Range checked for each record."</pre>
