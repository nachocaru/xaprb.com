---
title: Maatkit version 1753 released
date: "2008-02-10"
permalink: /2008/02/10/maatkit-version-1753-released/
description:
  - mk-heartbeat can now check many slaves at once.
tags:
  - MySQL
  - replication
  - SQL
---
<p class="download">
  <a href="http://code.google.com/p/maatkit/">Download Maatkit</a>
</p>

This release contains minor bug fixes and new features. Besides the little bug fixes, there's a fun new feature in mk-heartbeat: it can auto-discover slaves recursively, and show the replication delay on all of them, to wit:

<pre>baron@keywest ~ $ mk-heartbeat --check --host master -D rkdb --recurse 10
master 0
slave1 1
slave2 1
slave3 4</pre>

(Not actual results. Your mileage may vary. Closed course, professional driver. Do not attempt).

Nothing else in this release is very exciting. I just wanted to get the bug fixes out there.

<pre>Changelog for mk-heartbeat:

2008-02-10: version 1.0.7

   * Added --recurse option to check slaves to any depth.
   * Made mk-heartbeat explicitly close DB connection when done.

Changelog for mk-parallel-dump:

2008-02-10: version 1.0.6

   * Added the --losslessfp option.
   * Fixed child process exit status on Solaris (bug #1886444).

Changelog for mk-parallel-restore:

2008-02-10: version 1.0.5

   * Fixed forking issues with File::Find on Solaris (bug #1887102).
   * Fixed child process exit status on Solaris (bug #1886444).
   * The --defaults-file option caused a mysql error (bug #1886866).

Changelog for mk-show-grants:

2008-02-10: version 1.0.8

   * Added --timestamp option.

Changelog for mk-table-checksum:

2008-02-10: version 1.1.25

   * The --lock option did not work correctly (bug #1884712).

Changelog for mk-table-sync:

2008-02-10: version 1.0.5

   * The Stream algorithm wasn't chosen when a table had no key.
   * Numeric strings beginning with 0 weren't quoted (bug #1883019).</pre>
