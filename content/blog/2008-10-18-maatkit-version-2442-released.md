---
title: Maatkit version 2442 released
permalink: /2008/10/18/maatkit-version-2442-released/
categories:
  - Maatkit
  - SQL
---
<p class="download">
  <a href="http://code.google.com/p/maatkit/">Download Maatkit</a>
</p>

The newest release of Maatkit contains mk-audit bug fixes, lots of [new features for mk-table-checksum so you can check replication more frequently (see my earlier post about this)][1], and more bug fixes for other tools.

<!--more-->

Here's the changelog:

<pre>Changelog for mk-audit:

2008-10-17: version 0.9.3

   * mk-audit died if no /etc/*release file existed (issue 62).
   * mk-audit complained if it could not execute dmidecode (issue 62).
   * mk-audit died if user didn't have privs to SHOW PROCESSLIST (issue 60).
   * Made output in PROBLEMS report tabular (issue 41).

Changelog for mk-table-checksum:

2008-10-17: version 1.2.0

   * Added --recheck (issue 69).
   * Added --ignorecols (issue 94).
   * Added --createreplicate (issue 77).
   * Added --resume and --resume-replicate (issue 36).
   * --since crashed on blackhole tables (issue 64).
   * Added --singlechunk and --savesince (issue 53).
   * --replicate with large WHERE did not fit in boundaries column (issue 81).

Changelog for mk-table-sync:

2008-10-17: version 1.0.10

   * --tables was not honored when using --replicate (issue 79).
   * Updated documentation (issue 85).
   * --replicate failed cryptically on truncated boundaries column (issue 81).

Changelog for mk-visual-explain:

2008-10-17: version 1.0.11

   * There was a Perl compilation error on Perl 5.10 (issue 90).
</pre>

 [1]: http://www.xaprb.com/blog/2008/10/04/how-to-check-mysql-replication-integrity-continually/
