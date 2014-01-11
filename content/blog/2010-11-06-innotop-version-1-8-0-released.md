---
title: innotop version 1.8.0 released
author: Baron Schwartz
layout: post
permalink: /2010/11/06/innotop-version-1-8-0-released/
categories:
  - Innotop
  - Perl
  - SQL
  - Tools
---
I&#8217;ve just uploaded the [new release of innotop to Google Code][1]. Short version of the changelog: works on MySQL 5.1 with the InnoDB plugin; more efficient; supports Percona/MariaDB [USER_STATISTICS][2] data; fixes a bunch of small annoying bugs.

Longer version:

`<pre>2010-11-06: version 1.8.0

   Changes:
   * Don't re-fetch SHOW VARIABLES every iteration; it's too slow on many hosts.
   * Add a filter to remove EVENT threads in SHOW PROCESSLIST (issue 32).
   * Add a timestamp to output in -n mode, when -t is specified (issue 37).
   * Add a new U mode, for Percona/MariaDB USER_STATISTICS (issue 39).
   * Add support for millisecond query time in Percona Server (issue 39).
   * Display a summary of queries executed in Query List mode (issue 26).

   Bugs fixed:
   * Made config-file reading more robust (issue 41).
   * Hostname parsing wasn't standards compliant (issue 30).
   * MKDEBUG didn't work on some Perl versions (issue 22).
   * Don't try to get InnoDB status if have_innodb != YES (issue 33).
   * Status text from the InnoDB plugin wasn't parsed correctly (issue 36).
   * Transaction ID from InnoDB plugin wasn't subtracted correctly (issue 38).
   * Switching modes and pressing ? for help caused a crash (issue 40).
</pre>`

 [1]: http://code.google.com/p/innotop/
 [2]: http://www.percona.com/docs/wiki/percona-server:features:userstatv2