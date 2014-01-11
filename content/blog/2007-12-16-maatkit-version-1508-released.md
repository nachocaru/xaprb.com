---
title: Maatkit version 1508 released
date: "2007-12-16"
permalink: /2007/12/16/maatkit-version-1508-released/
description:
  - Minor bug fixes for Maatkit
---
<p class="download">
  <a href="http://code.google.com/p/maatkit/">Download Maatkit</a>
</p>

This release fixes a few bugs, adds minor features, and adds some debugging support to shared code. I'm working on the Nibble sync algorithm for mk-table-sync, and someone has found a few more bugs with mk-parallel-dump, but those might take me a while to complete.

<pre>Changelog for mk-archiver:

2007-12-16: version 1.0.5

   * Updated common code.

Changelog for mk-deadlock-logger:

2007-12-16: version 1.0.7

   * Updated common code.

Changelog for mk-duplicate-key-checker:

2007-12-16: version 1.1.4

   * --tables and --ignoretables now accept names in the form db.tbl.

Changelog for mk-find:

2007-12-16: version 0.9.9

   * Updated common code.

Changelog for mk-heartbeat:

2007-12-16: version 1.0.4

   * Updated common code, added debugging.

Changelog for mk-parallel-dump:

2007-12-16: version 1.0.2

   * Added debugging.
   * Updated common code.
   * --tables and --ignoretables now accept names in the form db.tbl.

Changelog for mk-parallel-restore:

2007-12-16: version 1.0.2

   * Updated common code.

Changelog for mk-query-profiler:

2007-12-16: version 1.1.8

   * Updated common code, added debugging.

Changelog for mk-show-grants:

2007-12-16: version 1.0.7

   * Updated common code, added debugging.

Changelog for mk-slave-delay:

2007-12-16: version 1.0.4

   * Updated common code, added debugging.

Changelog for mk-slave-restart:

2007-12-16: version 1.0.4

   * Updated common code, added debugging.

Changelog for mk-table-checksum:

2007-12-16: version 1.1.22

   * --replicate did not store chunk boundaries correctly (bug #1850243).
   * --tables and --ignoretables now accept names in the form db.tbl.

Changelog for mk-table-sync:

2007-12-16: version 1.0.1

   * Empty strings were not quoted (bug #1848431).
   * --tables and --ignoretables now accept names in the form db.tbl.

Changelog for mk-visual-explain:

2007-12-16: version 1.0.6

   * Updated common code, added debugging.</pre>
