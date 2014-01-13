---
title: Maatkit version 1972 released
date: "2008-06-02"
permalink: /blog/2008/06/02/maatkit-version-1972-released/
categories:
  - Databases
  - Open Source
---

Before I tell you what's new, let me tell you how cool I think it would be if Maatkit were voted [Sourceforge.net project of the year][1]. Just something to think about :-) I suggest the "Best Tool or Utility for SysAdmins" category. You can actually click the Back button and nominate it for several categories. Not that anyone would do that, of course.

Also, if anyone wants to jump in and help out with bug fixes and new features, please, by all means. Maatkit is a true open-source project as well as being Free Software. If you can follow coding conventions and understand Perl, I'm a very benevolent dictator and would gladly grant commit rights. As it turns out, since I've joined Percona I'm interested in a whole different set of things, and a lot of the itches I was scratching with Maatkit before are no longer mine to scratch. Some of my direct motivation to improve Maatkit is therefore reduced. (To those of you who have sent me gifts from my [wishlist][2], thank you, I really appreciate it. My latest is the score to Crimson Tide, which is just fastastic.)

This release is a bugfix and maintenance release. Many of the changes are minor tweaks to shared code. I've also partially moved to a new documentation system that will ensure the embedded documentation is authoritative and accurate.

Here's the change log:

<pre>Changelog for mk-archiver:

2008-06-02: version 1.0.9

   * Updated common code.

Changelog for mk-deadlock-logger:

2008-06-02: version 1.0.10

   * Generate command-line options from POD.

Changelog for mk-duplicate-key-checker:

2008-06-02: version 1.1.6

   * Updated common code.

Changelog for mk-find:

2008-06-02: version 0.9.11

   * Updated common code.

Changelog for mk-heartbeat:

2008-06-02: version 1.0.9

   * Get command-line options from POD.
   * --check output contained leading whitespace which broke Cacti.

Changelog for mk-parallel-dump:

2008-06-02: version 1.0.8

   * System commands did not use double quotes on Windows (bug #1949922).
   * Added --stopslave to run STOP SLAVE during the dump (bug #1923627).
   * --ignoreengine worked only when --tab was specified (bug #1851461).

Changelog for mk-parallel-restore:

2008-06-02: version 1.0.7

   * .trg files were sometimes rejected from loading.
   * Command-line options are generated from the POD.

Changelog for mk-query-profiler:

2008-06-02: version 1.1.10

   * Generate command-line options from POD.

Changelog for mk-show-grants:

2008-06-02: version 1.0.10

   * Create command-line options from POD.

Changelog for mk-slave-delay:

2008-06-02: version 1.0.7

   * Updated the documentation to use POD.
   * The slave could wait forever if the I/O thread was stopped.
   * The slave could wait forever on the master's last event (bug #1959496).

Changelog for mk-slave-find:

2008-06-02: version 1.0.1

   * Updated common code.

Changelog for mk-slave-move:

2008-06-02: version 0.9.1

   * Command-line parsing was removing an expected DSN (bug #1960142).
   * The slave was not stopped before CHANGE MASTER TO (bug #1960142).
   * DSNs without a port caused a crash (bug #1960142).
   * Converted to use POD for command-line options.

Changelog for mk-slave-prefetch:

2008-06-02: version 1.0.2

   * Add the --progress option.
   * Add more error reporting and the --errors option.
   * Abstract USE queries when fingerprinting them.
   * mysqlbinlog errors were not detected.
   * Handle queries of the form INSERT ... VALUE().
   * Strip comments from queries when normalizing them.

Changelog for mk-slave-restart:

2008-06-02: version 1.0.7

   * Updated common code.

Changelog for mk-table-checksum:

2008-06-02: version 1.1.27

   * Update documentation, generate command-line options from POD.
   * Added --trim to compare pre-5.0 and 5.0+ VARCHAR values consistently.

Changelog for mk-table-sync:

2008-06-02: version 1.0.7

   * Added NO_AUTO_VALUE_ON_ZERO to @@SQL_MODE (bug #1919897).
   * Added --trim to compare pre-5.0 and 5.0+ VARCHAR values consistently.

Changelog for mk-visual-explain:

2008-06-02: version 1.0.8

   * Updated common code.
</pre>

 [1]: http://sourceforge.net/awards/cca/?group_id=189154
 [2]: http://www.amazon.com/gp/registry/wishlist/LOE4ZUTKFU39
