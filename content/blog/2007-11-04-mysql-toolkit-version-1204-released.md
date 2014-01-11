---
title: MySQL Toolkit version 1204 released
author: Baron Schwartz
excerpt: "<p>This release fixes some minor bugs.  It also adds a few major new features to several of the tools.    The command-line option and help functionality, as well as several other pieces of common functionality, has been replaced with common modules that have a test suite.  This is the first step towards a gradual rewrite to replace untested 'script' code with tested, maintainable code.</p>"
layout: post
permalink: /2007/11/04/mysql-toolkit-version-1204-released/
description:
  - MySQL Toolkit gets tests.
tags:
  - MySQL
  - MySQL Toolkit
  - SQL
---
<p class="download">
  <a href="http://code.google.com/p/maatkit/">Download MySQL Toolkit</a>
</p>

This release fixes some minor bugs. It also adds a few major new features to several of the tools. The command-line option and help functionality, as well as several other pieces of common functionality, has been replaced with common modules that have a test suite. This is the first step towards a gradual rewrite to replace untested 'script' code with tested, maintainable code.

<pre>Changelog for mysql-archiver:

2007-11-04: version 1.0.2

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Replaced some code with modules that are unit-tested.
   * You can control binary logging with the 'a' and 'b' options in a DSN.
   * Destination plugins can now rewrite the INSERT statement.

Changelog for mysql-deadlock-logger:

2007-11-04: version 1.0.5

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Replaced some code with modules that are unit-tested.

Changelog for mysql-duplicate-key-checker:

2007-11-04: version 1.1.2

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Replaced some code with modules that are unit-tested.

Changelog for mysql-find:

2007-11-04: version 0.9.6

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Replaced some code with modules that are unit-tested.

Changelog for mysql-heartbeat:

2007-11-04: version 1.0.2

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Added support for PostgreSQL with the --dbidriver option.
   * Replaced some code with modules.

Changelog for mysql-parallel-dump:

2007-11-04: version 0.9.11

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Replaced some code with modules that are unit-tested.
   * Added --ignoreengine command-line option.
   * Do not dump data for Federated or Merge tables by default.
   * Some versions of mysqldump tried to do LOCK TABLES and hung.

Changelog for mysql-parallel-restore:

2007-11-04: version 0.9.1

   * Made command-line help easier to use.
   * Optimized the calls to CREATE DATABASE with the --createdb argument.
   * Removed the dependency on Term::ReadKey.
   * CHARACTER SET was added to LOAD DATA INFILE even before MySQL 5.0.38.
   * Replaced some code with modules that are unit-tested.
   * Fixed documentation formatting errors.

Changelog for mysql-query-profiler:

2007-11-04: version 1.1.6

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Replaced some code with modules that are unit-tested.

Changelog for mysql-show-grants:

2007-11-04: version 1.0.4

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Replaced some code with modules that are unit-tested.

Changelog for mysql-slave-delay:

2007-11-04: version 1.0.2

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Replaced some code with modules that are unit-tested.

Changelog for mysql-slave-restart:

2007-11-04: version 1.0.2

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Replaced some code with modules that are unit-tested.

Changelog for mysql-table-checksum:

2007-11-04: version 1.1.17

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Replaced some code with modules that are unit-tested.

Changelog for mysql-table-sync:

2007-11-04: version 0.9.8

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Replaced some code with modules that are unit-tested.

Changelog for mysql-visual-explain:

2007-11-04: version 1.0.4

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Replaced some code with modules that are unit-tested.</pre><div style="width: 2px; height: 2px; visibility: visible; overflow: hidden;> 

[mixer][1] [kitchenaid mixer][2] [sunbeam mixer][3] [univex mixer][4] [doyon equipment mixer][5] [hobart mixer][6] [cuisinart mixer][7] [varimixer mixer][8] [anvil mixer][9] [robot coupe mixer][10] [black and decker mixer][11] [betty croker mixer][12] [farberware mixer][13] [oster mixer][14] [toastmaster mixer][15] [waring mixer][16] [kitchen mixer][17] [bosch mixer][18] [braun mixer][19] [delonghi mixer][20] [pasta maker][21] [villaware pasta maker][22] [all clad pasta maker][23] [cucinapro pasta maker][24] [escali pasta maker][25] [peavey pasta maker][26] [kitchenaid pasta maker][27] [electric pasta maker][28] [atlas pasta maker][29] [ronco pasta maker][30] [delonghi pasta maker][31] [popeils pasta maker][32] [marcato pasta maker][33] [simac pasta maker][34] [cuisinart pasta maker][35] [italian pasta maker][36] [imperia pasta maker][37] [pasta machine][38] [villaware pasta machine][39] [all clad pasta machine][40] [cucinapro pasta machine][41] [escali pasta machine][42] [peavey pasta machine][43] [kitchenaid pasta machine][44] [electric pasta machine][45] [atlas pasta machine][46] [ronco pasta machine][47] [delonghi pasta machine][48] [popeils pasta machine][49] [marcato pasta machine][50] [simac pasta machine][51] [cuisinart pasta machine][52] [italian pasta machine][53] [imperia pasta machine][54] [popcorn maker][55] [gold medal popcorn maker][56] [paragon popcorn maker][57] [nostalgia electronics popcorn maker][58] [star manufacturing popcorn maker][59] [toastmaster popcorn maker][60] [blackanddecker popcorn maker][61] [cuisinart popcorn maker][62] [nostalgia popcorn maker][63] [hot air popcorn maker][64] [west bend popcorn maker][65] [antique popcorn maker][66] [back to basics popcorn maker][67] [commercial popcorn maker][68]</div>

 [1]: http://mixer.50webs.com
 [2]: http://kitchenaid-mixer.50webs.com
 [3]: http://sunbeam-mixer.50webs.com
 [4]: http://univex-mixer.50webs.com
 [5]: http://doyon-equipment-mixer.50webs.com
 [6]: http://hobart-mixer.50webs.com
 [7]: http://cuisinart-mixer.50webs.com
 [8]: http://varimixer-mixer.50webs.com
 [9]: http://anvil-mixer.50webs.com
 [10]: http://robot-coupe-mixer.50webs.com
 [11]: http://black-and-decker-mixer.50webs.com
 [12]: http://betty-croker-mixer.50webs.com
 [13]: http://farberware-mixer.50webs.com
 [14]: http://oster-mixer.50webs.com
 [15]: http://toastmaster-mixer.50webs.com
 [16]: http://waring-mixer.50webs.com
 [17]: http://kitchen-mixer.50webs.com
 [18]: http://bosch-mixer.50webs.com
 [19]: http://braun-mixer.50webs.com
 [20]: http://delonghi-mixer.50webs.com
 [21]: http://pasta-maker.50webs.com
 [22]: http://villaware-pasta-maker.50webs.com
 [23]: http://all-clad-pasta-maker.50webs.com
 [24]: http://cucinapro-pasta-maker.50webs.com
 [25]: http://escali-pasta-maker.50webs.com
 [26]: http://peavey-pasta-maker.50webs.com
 [27]: http://kitchenaid-pasta-maker.50webs.com
 [28]: http://electric-pasta-maker.50webs.com
 [29]: http://atlas-pasta-maker.50webs.com
 [30]: http://ronco-pasta-maker.50webs.com
 [31]: http://delonghi-pasta-maker.50webs.com
 [32]: http://popeils-pasta-maker.50webs.com
 [33]: http://marcato-pasta-maker.50webs.com
 [34]: http://simac-pasta-maker.50webs.com
 [35]: http://cuisinart-pasta-maker.50webs.com
 [36]: http://italian-pasta-maker.50webs.com
 [37]: http://imperia-pasta-maker.50webs.com
 [38]: http://pasta-machine.50webs.com
 [39]: http://villaware-pasta-machine.50webs.com
 [40]: http://all-clad-pasta-machine.50webs.com
 [41]: http://cucinapro-pasta-machine.50webs.com
 [42]: http://escali-pasta-machine.50webs.com
 [43]: http://peavey-pasta-machine.50webs.com
 [44]: http://kitchenaid-pasta-machine.50webs.com
 [45]: http://electric-pasta-machine.50webs.com
 [46]: http://atlas-pasta-machine.50webs.com
 [47]: http://ronco-pasta-machine.50webs.com
 [48]: http://delonghi-pasta-machine.50webs.com
 [49]: http://popeils-pasta-machine.50webs.com
 [50]: http://marcato-pasta-machine.50webs.com
 [51]: http://simac-pasta-machine.50webs.com
 [52]: http://cuisinart-pasta-machine.50webs.com
 [53]: http://italian-pasta-machine.50webs.com
 [54]: http://imperia-pasta-machine.50webs.com
 [55]: http://popcorn-maker.50webs.com
 [56]: http://gold-medal-popcorn-maker.50webs.com
 [57]: http://paragon-popcorn-maker.50webs.com
 [58]: http://nostalgia-electronics-popcorn-maker.50webs.com
 [59]: http://star-manufacturing-popcorn-maker.50webs.com
 [60]: http://toastmaster-popcorn-maker.50webs.com
 [61]: http://blackanddecker-popcorn-maker.50webs.com
 [62]: http://cuisinart-popcorn-maker.50webs.com
 [63]: http://nostalgia-popcorn-maker.50webs.com
 [64]: http://hot-air-popcorn-maker.50webs.com
 [65]: http://west-bend-popcorn-maker.50webs.com
 [66]: http://antique-popcorn-maker.50webs.com
 [67]: http://back-to-basics-popcorn-maker.50webs.com
 [68]: http://commercial-popcorn-maker.50webs.com
