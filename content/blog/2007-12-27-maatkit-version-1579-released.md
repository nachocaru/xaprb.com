---
title: Maatkit version 1579 released
date: "2007-12-27"
permalink: /2007/12/27/maatkit-version-1579-released/
categories:
  - Databases
  - Open Source
---

This release contains bug fixes and new features. The biggest new feature, in my opinion, is a new sync algorithm for mk-table-sync. Now you can sync any table with an index more efficiently than previously. This is the return of the speed I promised earlier. (Though I haven't yet benchmarked it; I am very short on time these days. Your benchmarks and other contributions are welcome).

I'm finally feeling like the table sync tool is getting in good shape!

Let me know what you think, and of course, if you have questions or bug reports, please use the Sourceforge forums, bug tracker, etc so others can benefit too.

<pre>Changelog for mk-heartbeat:

2007-12-27: version 1.0.5

   * Added --stop, --sentinel, and --quiet options.
   * Added --replace option.

Changelog for mk-parallel-dump:

2007-12-27: version 1.0.3

   * Views with functions caused a crash (bug #1850998, MySQL bug #29408).
   * --ignoreengine was ignored (bug #1851461).

Changelog for mk-table-checksum:

2007-12-27: version 1.1.23

   * Updated documentation about version compatibility.
   * Updated documentation for --replcheck.

Changelog for mk-table-sync:

2007-12-27: version 1.0.2

   * Syncing via replication did not use REPLACE on the master.
   * --transaction disabled waiting for a slave to catch up.
   * Allow one DSN without --replicate, as long as --synctomaster is given.
   * Added the Nibble sync algorithm.
   * MASTER_POS_WAIT() failed when the server was not a master (bug #1855480).
   * DBD::mysql died after 'commands out of sync' error (bug #1856046).</pre>
