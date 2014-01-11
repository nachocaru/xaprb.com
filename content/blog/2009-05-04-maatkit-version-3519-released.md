---
title: Maatkit version 3519 released
author: Baron Schwartz
layout: post
permalink: /2009/05/04/maatkit-version-3519-released/
categories:
  - Maatkit
  - Perl
  - SQL
  - Sys Admin
tags:
  - Open Source
---
[Maatkit][1] version 3519 is [ready for download][2]. **There are a lot of changes in this release, many of which are incompatible with previous releases**. There are also a lot of important new features. Read on for the details.

First, thanks to everyone who contributed to this month's release. A lot of people have jumped into Maatkit and started committing code. I attribute this to deliberately forcing a more open policy with decisions being made on the mailing list, rather than the former policy of "Percona pays for development, so they have more say than you do" &#8212; a snobby and ill-advised way to treat an open-source project. If you are interested in contributing to Maatkit, please ask. Subversion commit rights are being handed out willy-nilly. It's great!

Here's a synopsis of this month's most important changes.

*   **This is a work in progress.** We're making some pretty large changes, and to help us in the process, we've changed a lot of code to be more self-checking and help us find errors we introduce during the process. A lot of the other code is kind of involved in this too, so it's being bundled together with other functionality. As a result, half the tools are done and half the tools aren't touched yet. [The Maatkit wiki][3] has the details. If you're curious about the reasoning behind the changes, please read the mailing list archives.
*   **Command-line options have changed**. The mailing list members decided that Maatkit's command-line options are too confusing and inconsistent, and voted to do something about it. As of this month, we're about halfway through a process of converting all the tools to use consistent, carefully-thought-out command-line options. Next month I expect there will be even more changes. **Check your wrapper scripts** to make sure they don't use old, deprecated options.
*   **Configuration files**. We're adding support for configuration files, as specified and approved on the mailing list. The functionality should be simple for MySQL users to understand.
*   **Better test coverage**. We're making the tools more testable. Again, a slow process. Very large portions of the code that is bundled together to make each tool is already tested pretty exhaustively, but there are parts of the tools that aren't, and some of them are very difficult to test; we're working on that.
*   **Fully integrated documentation**. We're working on integrating *all* the documentation into the tools, so there is no possibility of mismatch between behavior and documentation. We do this in general by making the tool derive its behavior from its documentation! This has proven to be very successful, and we have work underway to push that practice even further until no command-line help output is hard-coded anywhere.

Aside from that, we've made minor bug fixes and functionality changes this month, with the exception of mk-query-digest, which has some beta functionality and major bug fixes.

The full change log follows.

<pre>Changelog for mk-archiver:

2009-05-03: version 1.0.15

   * Added the --config option for issue 231.
   * Added the --help and --verbose options for issue 318.
   * Updates to shared code.

Changelog for mk-audit:

2009-05-03: version 0.9.7

   * Removed the --askpass long option.  Use --ask-pass instead.
   * Removed the --setvars long option.  Use --set-vars instead.
   * Removed the -t short option.  Use --top instead.
   * Added the following options for issue 248:
   *    --charset (-A)
   *    --defaults-file (-F)
   *    --host (-h) (but not implemented yet)
   * Converted script to runnable module (issue 315).
   * Added the --config option for issue 231.
   * Updates to shared code.

Changelog for mk-duplicate-key-checker:

2009-05-03: version 1.2.3

   * Columns with backticks in comments caused a crash (issue 330)
   * Changed the --allstruct option to --all-structs.
   * Changed the --askpass option to --ask-pass.
   * Changed the --engine option to --engines.
   * Changed the --fuction option to --key-types.
   * Changed the --ignoredb option to --ignore-databases.
   * Changed the --ignoreengine option to --ignore-engines.
   * Changed the --ignoreorder option to --ignore-order.
   * Changed the --ignoretbl option to --ignore-tables.
   * Changed the --setvars option to --set-vars.
   * Removed the -a short option.  Use --all-struct instead.
   * Removed the -c short option.  Use --[no]clustered instead.
   * Removed the -f short option.  Use --key-types instead.
   * Removed the -g short option.  Use --ignore-databases instead.
   * Removed the -E short option.  Use --ignore-engines instead.
   * Removed the -n short option.  Use --ignore-tables instead.
   * Added config file handling and --config (issue 231).
   * Converted script to runnable module (issue 315).

Changelog for mk-parallel-dump:

2009-05-03: version 1.0.15

   * Columns with backticks in comments caused a crash (issue 330)

Changelog for mk-query-digest:

2009-05-03: version 0.9.5

   * The query report printed duplicate table names (issue 337).
   * Print a message and exit early if there's an error (issue 190).
   * Added the --config option for issue 231.
   * Added the --log option for issue 241.
   * Added the --help and --verbose options for issue 318.
   * Fixed another crash when sqrt() of a negative number (issue 332).
   * Fixed a division by zero when a query has zero exec time.
   * Added --print to print query events in slow-log format.
   * Added --type to specify the type of log file (default slowlog).
   * Added --tcpdump to permit parsing output of tcpdump (issue 228).
   * The --shorten option was implemented badly and was slow (issue 336).
   * The report's per-class QPS was calculated incorrectly (issue 326).
   * Updates to shared code.

Changelog for mk-query-profiler:

2009-05-03: version 1.1.15

   * Added the --config option for issue 231.
   * Converted script to runnable module (issue 315). 
   * mk-query-profiler only:
   *    Removed the --allowcache long option.  Use --allow-cache instead.
   *    Removed the --askpass long option.  Use --ask-pass instead.
   *    Removed the --setvars long option.  Use --set-vars instead.
   *    Removed the -a short option.  Use --allow-cache instead.
   *    Removed the -c short option.  Use --calibrate instead.
   *    Removed the -e short option.  Use --external instead.
   *    Removed the -f short option.  Use --flush instead.
   *    Removed the -i short option.  Use --innodb instead.
   *    Removed the -n short option.  Use --only instead.
   *    Removed the -s short option.  Use --separate instead.
   *    Removed the -t short option.  Use --tab instead.
   *    Removed the -r short option.  Use --verify instead.
   * mk-profile-compact only:
   *    Removed the -q short option.  Use --queries instead.
   *    Removed the -m short option.  Use --mode instead.
   *    Removed the -h short option.  Use --headers instead.

Changelog for mk-show-grants:

2009-05-03: version 1.0.15

   * The tool crashed when there were no users (issue 359).

Changelog for mk-slave-delay:

2009-05-03: version 1.0.13

   * Removed the --askpass long option.  Use --ask-pass instead.
   * Removed the --setvars long option.  Use --set-vars instead.
   * Removed the --usemaster long option.  Use --use-master instead.
   * Removed the -d short option.  Use --delay instead.
   * Removed the -c short option.  Use --continue instead.
   * Removed the -q short option.  Use --quiet instead.
   * Removed the -t short option.  Use --run-time instead.
   * Removed the --time long option.  Use --run-time instead.
   * Removed the -u short option.  Use --use-master instead.
   * Removed the -i short option.  Use --interval instead.
   * Added the -q short option for --quiet.
   * Added the --config option for issue 231.
   * Added the --log option for issue 241.
   * Added the following options for issue 248:
   *    --charset (-A)
   *    --defaults-file (-F)
   *    --host (-h)
   *    --password (-p)
   *    --port (-P)
   *    --socket (-S)
   *    --user (-u)
   * Converted script to runnable module (issue 315).

Changelog for mk-slave-find:

2009-05-03: version 1.0.6

   * Removed the --print long option; replication hierarchy tree always printed.
   * Removed the --setvars long option.  Use --set-vars instead.
   * Removed the --askpass long option.  Use --ask-pass instead.
   * Removed the -r short option.  Use --recurse instead.
   * Added the --config option for issue 231.
   * Converted script to runnable module (issue 315).
   * Defaults files were not read properly.
   * Added ability to specify master host with DSN.
   * Updated POD to describe what script actually does.
   * Updates to shared code.

Changelog for mk-slave-move:

2009-05-03: version 0.9.7

   * Removed the --setvars long option.  Use --set-vars instead.
   * Removed the --askpass long option.  Use --ask-pass instead.
   * Removed the -m short option.  Use --timeout instead. 
   * Added the --config option for issue 231.
   * Added the following options for issue 248:
   *    --charset (-A)
   *    --defaults-file (-F)
   *    --host (-h)
   *    --password (-p)
   *    --port (-P)
   *    --socket (-S)
   *    --user (-u)
   * Converted script to runnable module (issue 315).
   * Updates to shared code.

Changelog for mk-slave-prefetch:

2009-05-03: version 1.0.7

   * Removed the --askpass long option.  Use --ask-pass instead.
   * Removed the --checkint long option. Use --check-interval instead.
   * Removed the --iolag long option.  Use --io-lag instead.
   * Removed the --maxquerytime option.  Use --max-query-time instead.
   * Removed the --setvars long option.  Use --set-vars instead.
   * Removed the --numprefix long option.  Use --num-prefix instead.
   * Removed the --permitregexp long option.  Use --permit-regexp instead.
   * Removed the --printnonrewritten long option.  Use --print-nonrewritten
     instead.
   * Removed the --querysampsize long option.  Use --query-sample-size instead.
   * Removed the --rejectregexp long option.  Use --reject-regexp instead.
   * Removed the --setvars long option.  Use --set-vars instead.
   * Removed the -i short option.  Use --check-interval instead.
   * Removed the -x short option.  Use --execute instead.
   * Removed the -l short option.  Use --io-lag instead.
   * Removed the -q short option.  Use --max-query-time instead.
   * Removed the -o short option.  Use --offset instead.
   * Removed the -t short option.  Use --run-time instead.
   * Removed the --time long option.  Use --run-time instead.
   * Removed the -w short option.  Use --window instead.
   * Added the --config option for issue 231.
   * Added the --log option for issue 241.
   * --errors did not work properly.
   * Converted script to runnable module (issue 315).
   * --print and --daemonize are no longer mutually exclusive.

Changelog for mk-slave-restart:

2009-05-03: version 1.0.13

   * Added the --log option for issue 241.
   * Added the --config option for issue 231.
   * Added the --help and --verbose options for issue 318.
   * Removed the --setvars long option.  Use --set-vars instead.
   * Removed the --askpass long option.  Use --ask-pass instead.
   * Removed the -L short option.  Use --error-length instead.
   * Removed the -E short option.  Use --error-text instead.
   * Removed the -M short option.  Use --max-sleep instead.
   * Removed the --maxsleep long option.  Use --max-sleep instead.
   * Removed the -m short option.  Use --min-sleep instead.
   * Removed the --minsleep long option.  Use --min-sleep instead.
   * Removed the -r short option.  Use --recurse instead.
   * Removed the -k short option.  Use --skip-count instead.
   * Removed the --skipcount long option.  Use --skip-count instead.
   * Removed the -s short option.  Use --sleep instead.
   * Removed the -t short option.  Use --run-time instead.
   * Removed the --time long option.  Use --run-time instead.
   * Removed the --untilmaster long option.  Use --until-master instead.
   * Removed the --untilrelay long option.  Use --until-relay instead.
   * Removed the -v short option.  Use --verbose instead.
   * Converted script to runnable module (issue 315).

Changelog for mk-table-checksum:

2009-05-03: version 1.2.5

   * Columns with backticks in comments caused a crash (issue 330)

Changelog for mk-table-sync:

2009-05-03: version 1.0.15

   * Columns with backticks in comments caused a crash (issue 330)
   * Added --lock-and-rename (issue 363).

Changelog for mk-visual-explain:

2009-05-03: version 1.0.14

   * Changed the --askpass option to --ask-pass.
   * Changed the --clusterpk option to --clustered-pk.
   * Changed the --setvars option to --set-vars.
   * Removed the -C short option.  Use --clustered-pk instead.
   * Removed the -c short option.  Use --connect instead.
   * Removed the -f short option.  Use --format instead.
   * Added config file handling and --config (issue 231).
   * Converted script to runnable module (issue 315).
</pre>

 [1]: http://www.maatkit.org/
 [2]: http://code.google.com/p/maatkit/downloads/list
 [3]: http://code.google.com/p/maatkit/wiki/
