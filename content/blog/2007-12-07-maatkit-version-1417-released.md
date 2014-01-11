---
title: Maatkit version 1417 released
  <p class="download"><a href="http://maatkit.sourceforge.net/">Download Maatkit</a></p>
  
  <p>Thanks again to all the great <a href="http://www.xaprb.com/blog/2007/11/26/four-companies-to-sponsor-maatkit-development/">sponsors</a> for my week of work on the kit!</p>
  
  <p>This is the long-awaited "Baron worked on table sync" release.  Hooray!</p>
  
  <p>Please read the full blog post for important (very important!) information.</p>
date: "2007-12-07"
permalink: /2007/12/07/maatkit-version-1417-released/
description:
  - mk-table-sync is out!
tags:
  - MySQL
  - SQL
  - synchronization
---
<p class="download">
  <a href="http://code.google.com/p/maatkit/">Download Maatkit</a>
</p>

Thanks again to all the great [sponsors][1] for my week of work on the kit!

This is the long-awaited "Baron worked on table sync" release. Hooray!

I have resolved all of the issues I was facing in getting a release out the door. I now have individual test suites on all the programs in the kit (some of them trivial, some not) as well as a comprehensive unit test suite on the shared code. This is properly integrated into the Makefile, so it won't let me release when a test is broken. Yay!

I also found and solved a number of other issues, mostly minor, with other tools in the kit. Yippee!

But before we all celebrate too much, I want to say a word of caution: `mk-table-sync` is rebuilt from the ground up. That means I probably busted a bunch of things. One thing I know I broke: performance. It has two sync algorithms &#8212; Stream and Chunk &#8212; and Stream is not high performance, but Chunk can't always be used. I personally advise you to run the tool with the `--test` option and make sure the table you're syncing will not use the Stream algorithm if it is large. And if you are doubtful about bugs, as I am, you would do well not to touch the `--execute` option for critical data. Instead, use `--print` and save the output in a file, inspect the file, and then feed the file into `mysql`.

Also, please be aware that I threw away the old tool's 99 useless, confusing command-line options and started over. Some of them are similar. Some of them are the same but now mean different things. In other words, assuming backwards compatibility is probably not a good idea! Don't just upgrade and drop this tool in place (in case you had cron jobs running it, for example).

Performance will come back, better than ever. I promise. But for now, please help me find bugs, and report them via [the project's Sourceforge bug tracker][2]. Also, I would like to encourage you to post in the project's forums and/or mailing lists instead of blog comments (unless you just have comments) so they are easy for others to find. (No one will search my blog for help on this toolkit, I feel sure).

Changelog:

<pre>Changelog for mk-archiver:

2007-12-07: version 1.0.4

   * Updated common code.

Changelog for mk-deadlock-logger:

2007-12-07: version 1.0.6

   * Updated common code.

Changelog for mk-duplicate-key-checker:

2007-12-07: version 1.1.3

   * Updated common code.
   * Corrected documentation.
   * Added --engine and --ignoreengine options.

Changelog for mk-find:

2007-12-07: version 0.9.8

   * Updated common code.

Changelog for mk-heartbeat:

2007-12-07: version 1.0.3

   * Updated common code.
   * Added --time, --interval and --skew options.
   * The combination of sleep() and alarm() did not work on some systems.

Changelog for mk-parallel-dump:

2007-12-07: version 1.0.1

   * Updated common code.

Changelog for mk-parallel-restore:

2007-12-07: version 1.0.1

   * Updated common code.

Changelog for mk-query-profiler:

2007-12-07: version 1.1.7

   * Updated common code.
   * Added --session command-line option.
   * Servers without session variables crashed the tool (bug #1840320).
   * The meaning of --innodb was reversed.

Changelog for mk-show-grants:

2007-12-07: version 1.0.6

   * Updated common code.

Changelog for mk-slave-delay:

2007-12-07: version 1.0.3

   * Updated common code.

Changelog for mk-slave-restart:

2007-12-07: version 1.0.3

   * Updated common code.

Changelog for mk-table-checksum:

2007-12-07: version 1.1.21

   * Updated common code.
   * --chunksize was broken when no suffix given (bug #1845018).
   * --replcheck replaces the --recursecheck option (bug #1841407).

Changelog for mk-table-sync:

2007-12-07: version 1.0.0

   * Complete rewrite.
   * Syncs multiple tables and servers
   * Has no top-down or bottom-up algorithms
   * Integrates with mk-table-checksum results
   * Fixes many bugs, probably introduces new ones

Changelog for mk-visual-explain:

2007-12-07: version 1.0.5

   * Updated common code.
   * Queries of the form "... FROM (SELECT 1) AS X" crashed the tool.</pre>

 [1]: http://www.xaprb.com/blog/2007/11/26/four-companies-to-sponsor-maatkit-development/
 [2]: http://code.google.com/p/maatkit
