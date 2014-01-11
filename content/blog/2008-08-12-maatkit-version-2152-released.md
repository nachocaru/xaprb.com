---
title: Maatkit version 2152 released
permalink: /2008/08/12/maatkit-version-2152-released/
description:
  - Maatkit is now hosted on Google Code.
categories:
  - Maatkit
  - Perl
  - SQL
tags:
  - Ask Bjorn Hansen
  - Daniel Nichter
  - Google Code
  - Percona
  - sourceforge
---
<p class="download">
  <a href="http://code.google.com/p/maatkit/">Download Maatkit</a>
</p>

[Maatkit][1] version 2152 is ready for download. This release is also known as the "is this project really alive?" release. We thought we should delay until [MySQL released a new Community Server version][2]. Just kidding &#8212; it has nothing to do with that.

<!--more-->

This release is also very significant in that it's the first one that has large code contributions by someone other than myself. As you may know, [Percona][3] (my employer) has hired the [very talented Daniel Nichter, author of mysqlreport and other goodies][4], to help with Maatkit. So far it is a match made in heaven, and Daniel did most of the coding for this release.

This is also our first release since [Ask][5] helped me move the project (thank you Ask!) to Google Code. That means you finally get a decent interface for entering issues, etc, etc. The only thing remaining on Sourceforge at this point is the online documentation, which I will probably move to maatkit.org soon. But more importantly, it means the developers have a decent interface for issues, etc etc. [Sourceforge is just a bloody nightmare &#8212; their site keeps getting harder and harder to use][6], both as a developer and as a user. It had gotten to the point where simply adding the files to the site for download would take me hours. I tried to automate it, in true Perl fashion, but their make-a-release forms resisted my every effort. I cannot say what a relief it is to have usable project hosting that gets out of my way and lets me work. A double thanks to Ask for pushing me over the edge on this &#8212; it had been on my mind a long time. And thanks to Google, too, for a great project management interface.

Also note that the Sourceforge forums and mailing lists are dead. Google Groups is the preferred replacement.

Keep reporting those bugs and feature requests!

As you might expect, the changelog for such a long release cycle is, er, large. There's a lot of new stuff here. I'd like to highlight the new features in mk-parallel-dump and mk-parallel-restore &#8212; which I just used to reduce a job that would have taken weeks down to mere days &#8212; and a lot of new code in mk-table-sync, as well as the up-and-coming mk-audit, which is in release-early/often mode.

<pre>Changelog for mk-archiver:

2008-08-11: version 1.0.10

   * Files downloaded directly from SVN crashed due to version information.
   * Added more information to --statistics and changed --whyquit slightly.

Changelog for mk-audit:

2008-08-11: version 0.9.1

   * Files downloaded directly from SVN crashed due to version information.
   * Added useful functionality.

Changelog for mk-deadlock-logger:

2008-08-11: version 1.0.11

   * Files downloaded directly from SVN crashed due to version information.

Changelog for mk-duplicate-key-checker:

2008-08-11: version 1.1.7

   * Files downloaded directly from SVN crashed due to version information.
   * Full-text indexes were not treated specially (issue 10).

Changelog for mk-fifo-split:

2008-08-11: version 1.0.1

   * Files downloaded directly from SVN crashed due to version information.
   * Added --offset option.
   * --statistics didn't calculate lines/sec properly.
   * Removed --sleep; EOF doesn't mean anything to a non-terminal.

Changelog for mk-find:

2008-08-11: version 0.9.12

   * Files downloaded directly from SVN crashed due to version information.
   * Added --exec_dsn so you can execute SQL on a different server.

Changelog for mk-heartbeat:

2008-08-11: version 1.0.10

   * Files downloaded directly from SVN crashed due to version information.

Changelog for mk-parallel-dump:

2008-08-11: version 1.0.9

   * Files downloaded directly from SVN crashed due to version information.
   * Added --progress option.
   * CHANGE MASTER TO in 00_master_data.sql used the I/O thread position.
   * Added features to permit resuming of dumps.
   * --age without --sets did the opposite of what it should (isssue 7)
   * --stopslave died after complaining the slave was not running.

Changelog for mk-parallel-restore:

2008-08-11: version 1.0.8

   * Files downloaded directly from SVN crashed due to version information.
   * Added --progress option.

Changelog for mk-query-profiler:

2008-08-11: version 1.1.11

   * Files downloaded directly from SVN crashed due to version information.

Changelog for mk-show-grants:

2008-08-11: version 1.0.11

   * Files downloaded directly from SVN crashed due to version information.
   * Anonymous users were not permitted (issue 28).

Changelog for mk-slave-delay:

2008-08-11: version 1.0.8

   * Files downloaded directly from SVN crashed due to version information.

Changelog for mk-slave-find:

2008-08-11: version 1.0.2

   * Files downloaded directly from SVN crashed due to version information.

Changelog for mk-slave-move:

2008-08-11: version 0.9.2

   * The -m option was not recognized as an alias for --timeout.
   * Files downloaded directly from SVN crashed due to version information.

Changelog for mk-slave-prefetch:

2008-08-11: version 1.0.3

   * Files downloaded directly from SVN crashed due to version information.
   * Added the --numprefix option for use in sharded data stores.
   * The Rotate binary log event type was not handled.

Changelog for mk-slave-restart:

2008-08-11: version 1.0.8

   * Files downloaded directly from SVN crashed due to version information.

Changelog for mk-table-checksum:

2008-08-11: version 1.1.28

   * Files downloaded directly from SVN crashed due to version information.

Changelog for mk-table-sync:

2008-08-11: version 1.0.8

   * Files downloaded directly from SVN crashed due to version information.
   * --synctomaster did not abort when unable to discover the master.
   * An error waiting for the master to catch up caused other tables to fail.
   * Added --bufferinmysql to help make GroupBy algorithm more efficient.
   * Added safety checks to prevent changing data on a slave server.
   * Added --skipslavecheck to prevent safety checks on destination server.
   * Made the GroupBy algorithm the default replacement for Stream.
   * Added the GroupBy algorithm, which can sync tables without unique keys.
   * Syncing could stop and leave a row to delete in the destination.
   * Generate command-line help from the POD.

Changelog for mk-visual-explain:

2008-08-11: version 1.0.9

   * Files downloaded directly from SVN crashed due to version information.
</pre>

 [1]: http://www.maatkit.org/
 [2]: http://www.mysqlperformanceblog.com/2008/08/08/new-mysql-community-release-great-job-mysql/
 [3]: http://www.percona.com/
 [4]: http://hackmysql.com/
 [5]: http://develooper.com/
 [6]: http://sourceforge.net/tracker/?func=detail&#038;aid=1855476&#038;group_id=1&#038;atid=350001
