---
title: Maatkit version 1709 released
date: "2008-01-24"
url: /blog/2008/01/24/maatkit-version-1709-released/
categories:
  - Databases
  - Open Source
---

This release contains bug fixes and new features. It also contains a new tool: [my implementation of Paul Tuckfield's relay log pipelining idea.][1] I have had quite a few responses to that blog post, and requests for the code. So I'm releasing it as part of Maatkit.

<pre>Changelog for mk-archiver:

2008-01-24: version 1.0.7

   * Added --quiet option.
   * Added --plugin option.  The plugin interface is not backwards compatible.
   * Added --bulkins option.
   * Added --bulkdel option.
   * Added --nodelete option.
   * Changed negatable --ascend option to --noascend.

Changelog for mk-parallel-dump:

2008-01-24: version 1.0.5

   * The fix for bug #1863949 added an invalid argument to gzip (bug #1866137)
   * --quiet caused a crash.

Changelog for mk-parallel-restore:

2008-01-24: version 1.0.4

   * The -D option was used as a default DB for the connection (bug #1870415).

Changelog for mk-slave-prefetch:

2008-01-24: version 1.0.0

   * Initial release.

Changelog for mk-table-sync:

2008-01-24: version 1.0.4

   * Made the --algorithm option case-insensitive (bug #1873152).
   * Fixed a quoting bug.
   * Made the UTF-8 options configurable.</pre>

 [1]: /blog/2008/01/13/how-pre-fetching-relay-logs-speeds-up-mysql-replication-slaves/
