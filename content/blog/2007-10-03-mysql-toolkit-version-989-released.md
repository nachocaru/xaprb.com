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

### Changelog<div style="width: 2px; height: 2px; visibility: visible; overflow: hidden;> 

[coffee grinder][1] [cuisinart coffee grinder][2] [la pavoni coffee grinder][3] [black and decker coffee grinder][4] [bodum coffee grinder][5] [mahlkonig coffee grinder][6] [mr coffee coffee grinder][7] [hamilton beach coffee grinder][8] [bunn coffee grinder][9] [jura coffee grinder][10] [astra coffee grinder][11] [delonghi coffee grinder][12] [grindmaster coffee grinder][13] [burr coffee grinder][14] [brewer coffee grinder][15] [bosch coffee grinder][16] [melitta coffee grinder][17] [electric coffee grinder][18] [antique coffee grinder][19] [electric skillet][20] [presto electric skillet][21] [rival electric skillet][22] [west bend electric skillet][23] [villaware electric skillet][24] [toastess electric skillet][25] [black and decker electric skillet][26] [hamilton beach electric skillet][27] [cuisinart electric skillet][28] [sunpentown electric skillet][29] [aroma electric skillet][30] [sunbeam electric skillet][31] [saladmaster electric skillet][32] [farberware electric skillet][33] [oster electric skillet][34] [ge electric skillet][35] [][36]</div> 
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

 [1]: http://coffee-grinder.50webs.com
 [2]: http://cuisinart-coffee-grinder.50webs.com
 [3]: http://la-pavoni-coffee-grinder.50webs.com
 [4]: http://black-and-decker-coffee-grinder.50webs.com
 [5]: http://bodum-coffee-grinder.50webs.com
 [6]: http://mahlkonig-coffee-grinder.50webs.com
 [7]: http://mr-coffee-coffee-grinder.50webs.com
 [8]: http://hamilton-beach-coffee-grinder.50webs.com
 [9]: http://bunn-coffee-grinder.50webs.com
 [10]: http://jura-coffee-grinder.50webs.com
 [11]: http://astra-coffee-grinder.50webs.com
 [12]: http://delonghi-coffee-grinder.50webs.com
 [13]: http://grindmaster-coffee-grinder.50webs.com
 [14]: http://burr-coffee-grinder.50webs.com
 [15]: http://brewer-coffee-grinder.50webs.com
 [16]: http://bosch-coffee-grinder.50webs.com
 [17]: http://melitta-coffee-grinder.50webs.com
 [18]: http://electric-coffee-grinder.50webs.com
 [19]: http://antique-coffee-grinder.50webs.com
 [20]: http://electric-skillet.50webs.com
 [21]: http://presto-electric-skillet.50webs.com
 [22]: http://rival-electric-skillet.50webs.com
 [23]: http://west-bend-electric-skillet.50webs.com
 [24]: http://villaware-electric-skillet.50webs.com
 [25]: http://toastess-electric-skillet.50webs.com
 [26]: http://black-and-decker-electric-skillet.50webs.com
 [27]: http://hamilton-beach-electric-skillet.50webs.com
 [28]: http://cuisinart-electric-skillet.50webs.com
 [29]: http://sunpentown-electric-skillet.50webs.com
 [30]: http://aroma-electric-skillet.50webs.com
 [31]: http://sunbeam-electric-skillet.50webs.com
 [32]: http://saladmaster-electric-skillet.50webs.com
 [33]: http://farberware-electric-skillet.50webs.com
 [34]: http://oster-electric-skillet.50webs.com
 [35]: http://ge-electric-skillet.50webs.com
 [36]: http://
