---
title: Version 1.1.4 of improved Cacti templates released
author: Baron Schwartz
layout: post
permalink: /2009/10/25/version-1-1-4-of-improved-cacti-templates-released/
categories:
  - PHP
  - SQL
  - Sys Admin
tags:
  - Cacti
  - Cacti templates
  - InnoDB
---
I've released version 1.1.4 of my [improved Cacti templates][1]. Unlike the prior release, which was solely bug fixes, this one includes new graphs in the MySQL template. Some of the graphs are of data that's exposed in standard MySQL versions, but some of it is available only in [Percona's high-performance builds of the MySQL database server][2]. If you don't have a Percona build, those graphs will just contain nothing, but there is no detrimental effect.

This template release is fully backwards compatible with the previous release. The upgrade process is to copy the new PHP file into place and import the new template file. You can then add the new graphs to your hosts.

I've also taken the opportunity to address many of the other open issues. Most of these were minor, such as a debug log to help troubleshoot. Some are big improvements, such as no longer using GET_LOCK() in MySQL to arbitrate access to the cache file. A list of open issues can always be found at <http://code.google.com/p/mysql-cacti-templates/issues/list>.

To ease the process of future upgrades, I've also added in a gratuitous GPRINT definition, which is unused and merely records the installed version of the template (both the template version, and the version of the PHP file against which it was generated).

The full changelog follows.

`<pre>
2009-10-25: version 1.1.4

        * Changed SSH options so host keys are accepted automatically (issue 68).
        * Parsing of the pending_ibuf_aio_reads property was broken.
        * Parsing of the pending_aio_log_ios property was broken.
        * Parsing of the pending_aio_sync_ios property was broken.
        * Added a debugging log for ss_get_mysql_stats.php (issue 54).
        * Added the --lint_check option to make-template.pl (issue 80).
        * Removed the use of GET_LOCK() and changed to flock() instead (issue 78).
        * The template and script version is now recorded in a GPRINT (issue 79).
        * Restored unflushed_log, which was accidentally deleted in 1.1.3.
        * Added the InnoDB Internal Hash Memory Usage graph (issue 75).
        * Added the InnoDB Checkpoint Age graph (issue 73).
        * Added the InnoDB Insert Buffer Usage graph (issue 74).
        * Added the InnoDB Active/Locked Transactions graph.
        * Added the InnoDB Memory Allocation graph.
        * Added the InnoDB Adaptive Hash Index graph.
        * Added the InnoDB Tables In Use graph (issue 32).
        * Added the InnoDB Current Lock Waits graph.
        * Added the InnoDB Lock Structures graph (issue 32).
</pre>`

 [1]: http://code.google.com/p/mysql-cacti-templates/
 [2]: http://www.percona.com/percona-lab.html
