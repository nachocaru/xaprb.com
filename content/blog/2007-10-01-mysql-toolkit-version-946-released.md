---
title: MySQL Toolkit version 946 released
author: Baron Schwartz
excerpt: '<p>This release of MySQL Toolkit adds a new parallel dump tool for multi-threaded backups, fixes some minor bugs, and adds new functionality to one of the helper scripts.</p>'
layout: post
permalink: /2007/10/01/mysql-toolkit-version-946-released/
description:
  - >
    This release of MySQL Toolkit adds a new new parallel dump tool for
    multi-threaded backups.
tags:
  - backups
  - MySQL
  - parallel dump
  - replication
  - SQL
---
<p class="download">
  <a href="http://code.google.com/p/maatkit/">Download MySQL Toolkit</a>
</p>

This release of MySQL Toolkit adds a new tool, fixes some minor bugs, and adds new functionality to one of the helper scripts.

### New tool: MySQL Parallel Dump

I wrote an [introduction to MySQL Parallel Dump][1] yesterday. It&#8217;s a much smarter way to dump your data if you have a lot of it, and it&#8217;s actually a very usable lightweight multi-threaded backup tool (it can do most dump-oriented backup jobs without a wrapper script, in my opinion).

### Changelog

<pre>Changelog for mysql-parallel-dump:

2007-10-01: version 0.9.5

   * Initial release.

Changelog for mysql-table-checksum:

2007-10-01: version 1.1.16

   * Made mysql-checksum-filter able to compare tables in different databases.

Changelog for mysql-table-sync:

2007-10-01: version 0.9.7

   * The special command-line syntax didn't allow a bare hostname.
   * Added an informative printout of what is being synced.</pre>

 [1]: http://www.xaprb.com/blog/2007/09/30/introducing-mysql-parallel-dump/