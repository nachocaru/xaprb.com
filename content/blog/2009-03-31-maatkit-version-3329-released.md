---
title: Maatkit version 3329 released
author: Baron Schwartz
layout: post
permalink: /2009/03/31/maatkit-version-3329-released/
categories:
  - Maatkit
  - Perl
  - SQL
  - Tools
---
[Maatkit][1] version 3329 has been released, as per our usual monthly release cycle.

Significant changes in this version include some bug fixes to mk-duplicate-key-checker, and a lot of new features in mk-query-digest. We made some changes to mk-table-checksum and mk-table-sync. We also updated shared code in all tools.

Interesting and significant things to mention this month:

*   Thanks to a corporation who sponsored development on certain tools (I haven't gotten permission to mention their name.)
*   The efforts to be more inclusive and participatory (e.g. more truly open-source) have really paid off, and personally I find it very gratifying to see the discussions on the mailing list. And new project members have contributed code and very useful advice! Thanks, and hooray!
*   The project wiki is reorganized and much better to use now.

Here's the changelog:

<pre>Changelog for mk-archiver:

2009-03-31: version 1.0.14

   * Send debugging output to STDERR (issue 308).
   * Removed string interpolation from debugging calls (issue 308)
   * Connection options were not read from the [client] section (issue 249).
   * Set connection options immediately after connecting (issue 286).
   * Updates to shared code.

Changelog for mk-audit:

2009-03-31: version 0.9.6

   * Send debugging output to STDERR (issue 308).
   * Removed string interpolation from debugging calls (issue 308).
   * Connection options were not read from the [client] section (issue 249).
   * Set connection options immediately after connecting (issue 286).
   * Updates to shared code.

Changelog for mk-deadlock-logger:

2009-03-31: version 1.0.14

   * Send debugging output to STDERR (issue 308).
   * Removed string interpolation from debugging calls (issue 308).
   * Connection options were not read from the [client] section (issue 249).
   * Set connection options immediately after connecting (issue 286).
   * Updates to shared code.

Changelog for mk-duplicate-key-checker:

2009-03-31: version 1.2.2

   * Send debugging output to STDERR (issue 308).
   * Removed string interpolation from debugging calls (issue 308).
   * Crashed getting size of foreign keys (issue 331).
   * Uppercase column names crashed the tool (issue 306).
   * Connection options were not read from the [client] section (issue 249).
   * Set connection options immediately after connecting (issue 286).
   * Updates to shared code.

Changelog for mk-find:

2009-03-31: version 0.9.15

   * Send debugging output to STDERR (issue 308).
   * Removed string interpolation from debugging calls (issue 308).
   * Connection options were not read from the [client] section (issue 249).
   * Set connection options immediately after connecting (issue 286).
   * Updates to shared code.

Changelog for mk-heartbeat:

2009-03-31: version 1.0.13

   * Send debugging output to STDERR (issue 308).
   * Removed string interpolation from debugging calls (issue 308)
   * Connection options were not read from the [client] section (issue 249).
   * Set connection options immediately after connecting (issue 286).
   * Updates to shared code.

Changelog for mk-parallel-dump:

2009-03-31: version 1.0.14

   * Send debugging output to STDERR (issue 308).
   * Removed string interpolation from debugging calls (issue 308)
   * Connection options were not read from the [client] section (issue 249).
   * Set connection options immediately after connecting (issue 286).
   * Updates to shared code.

Changelog for mk-parallel-restore:

2009-03-31: version 1.0.13

   * Send debugging output to STDERR (issue 308).
   * Removed string interpolation from debugging calls (issue 308)
   * Connection options were not read from the [client] section (issue 249).
   * Set connection options immediately after connecting (issue 286).
   * Updates to shared code.

Changelog for mk-query-digest:

2009-03-31: version 0.9.4

   * Send debugging output to STDERR (issue 308).
   * Crashed trying to take square root of negative number (issue 332).
   * --review-history did not store timestamps correctly (issue 329).
   * --shorten discarded too much information (issue 320).
   * No results when --orderby contained a nonexistent attribute (issue 244).
   * Added --review-history and --create-review-history (issue 194).
   * Removed string interpolation from debugging calls (issue 308).
   * Standard deviation was not for all values (issue 321).
   * Attributes with mostly zero values caused an infinite loop (issue 321).
   * Very large INSERT or REPLACE VALUES() segfaulted (issue 322).
   * Empty Schema attribute was not handled properly (issue 323).
   * Connection options were not read from the [client] section (issue 249).
   * Set connection options immediately after connecting (issue 286).
   * Updates to shared code.

Changelog for mk-query-profiler:

2009-03-31: version 1.1.14

   * Send debugging output to STDERR (issue 308).
   * Removed string interpolation from debugging calls (issue 308).
   * Connection options were not read from the [client] section (issue 249).
   * Set connection options immediately after connecting (issue 286).
   * Updates to shared code.

Changelog for mk-show-grants:

2009-03-31: version 1.0.14

   * Send debugging output to STDERR (issue 308).
   * Removed string interpolation from debugging calls (issue 308).
   * Connection options were not read from the [client] section (issue 249).
   * Set connection options immediately after connecting (issue 286).
   * Updates to shared code.

Changelog for mk-slave-delay:

2009-03-31: version 1.0.12

   * Send debugging output to STDERR (issue 308).
   * Removed string interpolation from debugging calls (issue 308)
   * A MASTER-HOST without binary logging enabled caused a crash (issue 215).
   * Connection options were not read from the [client] section (issue 249).
   * Set connection options immediately after connecting (issue 286).
   * Updates to shared code.

Changelog for mk-slave-find:

2009-03-31: version 1.0.5

   * Send debugging output to STDERR (issue 308).
   * Removed string interpolation from debugging calls (issue 308).
   * Connection options were not read from the [client] section (issue 249).
   * Set connection options immediately after connecting (issue 286).
   * Updates to shared code.

Changelog for mk-slave-move:

2009-03-31: version 0.9.6

   * Send debugging output to STDERR (issue 308).
   * Removed string interpolation from debugging calls (issue 308).
   * Connection options were not read from the [client] section (issue 249).
   * Set connection options immediately after connecting (issue 286).
   * Updates to shared code.

Changelog for mk-slave-prefetch:

2009-03-31: version 1.0.6

   * Send debugging output to STDERR (issue 308).
   * Removed string interpolation from debugging calls (issue 308)
   * Connection options were not read from the [client] section (issue 249).
   * Set connection options immediately after connecting (issue 286).
   * Updates to shared code.

Changelog for mk-slave-restart:

2009-03-31: version 1.0.12

   * Send debugging output to STDERR (issue 308).
   * Removed string interpolation from debugging calls (issue 308)
   * Connection options were not read from the [client] section (issue 249).
   * Set connection options immediately after connecting (issue 286).
   * Updates to shared code.

Changelog for mk-table-checksum:

2009-03-31: version 1.2.4

   * Send debugging output to STDERR (issue 308).
   * --schema was sensitive to the table's AUTO_INCREMENT value (issue 328).
   * Removed string interpolation from debugging calls (issue 308)
   * Connection options were not read from the [client] section (issue 249).
   * Set connection options immediately after connecting (issue 286).
   * Updates to shared code.

Changelog for mk-table-sync:

2009-03-31: version 1.0.14

   * Send debugging output to STDERR (issue 308).
   * Added --ignore-columns option (issue 313).
   * Two NULL column values didn't compare properly w/ Stream/GroupBy (issue 218).
   * Removed string interpolation from debugging calls (issue 308)
   * Connection options were not read from the [client] section (issue 249).
   * Set connection options immediately after connecting (issue 286).
   * Made --where and --replicate mutually exclusive (issue 302).
   * Updates to shared code.

Changelog for mk-visual-explain:

2009-03-31: version 1.0.13

   * Send debugging output to STDERR (issue 308).
   * Removed string interpolation from debugging calls (issue 308).
   * Connection options were not read from the [client] section (issue 249).
   * Set connection options immediately after connecting (issue 286).
   * Updates to shared code.
</pre>

 [1]: http://code.google.com/p/maatkit/
