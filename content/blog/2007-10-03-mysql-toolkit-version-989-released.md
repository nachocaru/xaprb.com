---
title: MySQL Toolkit version 989 released
date: "2007-10-03"
permalink: /2007/10/03/mysql-toolkit-version-989-released/
categories:
  - Databases
  - Open Source
---
<p class="download">
  <a href="http://code.google.com/p/maatkit/">Download MySQL Toolkit</a>
</p>

This release of MySQL Toolkit fixes some minor bugs, and adds major new functionality to MySQL Parallel Dump.

### Big News: MySQL Parallel Dump

I wrote a lot more tests and cleaned up MySQL Parallel Dump a lot (fixed bugs with failed dumps not being reported, for instance) but the *really* big news is I added chunking functionality to it. Now you can say

<pre>mysql-parallel-dump --chunksize 100000</pre>

and it will try to divide each table into chunks with 100,000 rows each. It can do the chunks in parallel, so it can actually be running several dumps from one table at the same time. The chunking is fuzzy: it's a hard problem, and I adapted (and improved) the code from MySQL Table Checksum to do it. If you can improve it, please contribute your fixes (the Sourceforge project page has several ways for you to do that).

You can also dump by size, which is probably more useful for most people. To do 10MB per chunk (approximately), use this command:

<pre>mysql-parallel-dump --chunksize 10M</pre>

This is a big deal not just because it lets you parallelize dumps from a single table, but because having the dump split up makes it easier to restore in small chunks, which as readers have pointed out is a big help on transactional storage engines.

The parallel restore tool is in incubation. In the meantime, please put this tool through its paces. Clearly it's not yet well-tested and I look forward to your bug reports!

### Changelog

<pre>Changelog for mysql-find:

2007-10-03: version 0.9.5

   * The --dbregex parameter didn't work right.

Changelog for mysql-heartbeat:

2007-10-03: version 1.0.1

   * --check hung forever.

Changelog for mysql-parallel-dump:

2007-10-03: version 0.9.6

   * Arguments to external program weren't honored.
   * System exit codes were lost, so errors weren't reported.
   * Added chunking.
   * Modularized and tested.
   * Added documentation.
   * Made --locktables negatable.
   * Changed default output to be less verbose and added --verbose option.
   * Added summary output.
</pre>