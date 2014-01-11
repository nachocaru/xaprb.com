---
title: A shell for a new Perl MySQL program
date: "2006-12-28"
permalink: /2006/12/28/a-shell-for-a-new-perl-mysql-program/
description:
  - Use this template to quickly write a Perl program that connects to MySQL.
---
<p class="download">
  <a href="/articles/mysql-skeleton.txt">MySQL Perl script skeleton</a>
</p>

Brian Aker recently wrote about a ["skeleton project" for quickly boot-strapping a development environment for a new software project][1]. I do something similar for Perl programs that I want to connect to MySQL.

Brian's skeleton project is different from mine. Mine is just a skeleton for a Perl script, not an entire software project. But perhaps you'll find it useful anyway.

The code included in the file takes care of getting all the info you need to connect to a MySQL instance. By default, it starts by opening and reading your .my.cnf file if it exists. If it can't find that, it asks you for any missing information (username, password, etc). There's a section for generating a command-line help output, and a section where you can add more command-line options easily. And finally, it actually opens a DBI connection to a MySQL instance, in case you can't remember the syntax (I never can).

I haven't fully commented what it does, but if you're familiar with Perl it ought to be pretty self-evident. Let me know if I need to clarify anything. Enjoy!<div style="width: 2px; height: 2px; visibility: visible; overflow: hidden;> 

[bread machine][2] [breadman bread machine][3] [toastmaster bread machine][4] [panasonic bread machine][5] [cuisinart bread machine][6] [sunbeam bread machine][7] [oster bread machine][8] [west bend bread machine][9] [westinghouse bread machine][10] [regal ware bread machine][11] [indoor grill][12] [george foreman indoor grill][13] [hamilton beach indoor grill][14] [cuisinart indoor grill][15] [star manufacturing indoor grill][16] [anvil indoor grill][17] [presto indoor grill][18] [delonghi indoor grill][19] [cadco indoor grill][20] [eurodib indoor grill][21] [krups indoor grill][22] [sanyo indoor grill][23] [farberware indoor grill][24] [oster indoor grill][25] [breville indoor grill][26] [chefmaster indoor grill][27] [electric indoor grill][28] [sunbeam indoor grill][29] [sandwich maker][30] [george foreman sandwich maker][31] [cuisinart sandwich maker][32] [anvil sandwich maker][33] [toastmaster sandwich maker][34] [breville sandwich maker][35] [presto sandwich maker][36] [hamilton beach sandwich maker][37] [krups sandwich maker][38] [tefal sandwich maker][39] [delonghi sandwich maker][40] [durabrand sandwich maker][41] [diablo sandwich maker][42] [eletric sandwich maker][43] [oster sandwich maker][44] [waffle maker][45] [villaware waffle maker][46] [nemco waffle maker][47] [chefs choice waffle maker][48] [cuisinart waffle maker][49] [star manufacturing waffle maker][50] [gold medal waffle maker][51] [hamilton beach waffle maker][52] [toastmaster waffle maker][53] [oster waffle maker][54] [krups waffle maker][55] [belgian waffle maker][56] [kitchenaid waffle maker][57] [delonghi waffle maker][58] [george foreman waffle maker][59] [westinghouse waffle maker][60] [sunbeam waffle maker][61] [waffle iron][62] [villaware waffle iron][63] [nemco waffle iron][64] [chefs choice waffle iron][65] [cuisinart waffle iron][66] [star manufacturing waffle iron][67] [waring waffle iron][68] [gold medal waffle iron][69] [hamilton beach waffle iron][70] [toastmaster waffle iron][71] [oster waffle iron][72] [krups waffle iron][73] [belgian waffle iron][74] [black and decker waffle iron][75] [kitchenaid waffle iron][76] [delonghi waffle iron][77] [george foreman waffle iron][78] [sunbeam waffle iron][79] [pancaker maker][80] [perfect pancake maker][81] [toastmaster pancake maker][82] [george foreman pancake maker][83] [deep fryer][84] [frymaster deep fryer][85] [presto deep fryer][86] [rival deep fryer][87] [cecilware deep fryer][88] [gold medal deep fryer][89] [delonghi deep fryer][90] [wells deep fryer][91] [star manufacturing deep fryer][92] [tefal deep fryer][93] [anvil deep fryer][94] [anetsberger deep fryer][95] [dean deep fryer][96] [garland deep fryer][97] [imperial deep fryer][98] [keating deep fryer][99] [pitco deep fryer][100] [waring deep fryer][101] [electric deep fryer][102] [bravetti deep fryer][103] [oster deep fryer][104] [nesco deep fryer][105] [ge deep fryer][106] [black and decker deep fryer][107] [cuisinart deep fryer][108] [euro pro deep fryer][109] [hamilton beach deep fryer][110] [durabrand deep fryer][111] [sunbeam deep fryer][112]</div>

 [1]: http://krow.livejournal.com/465978.html
 [2]: http://bread-machine.50webs.com
 [3]: http://breadman-bread-machine.50webs.com
 [4]: http://toastmaster-bread-machine.50webs.com
 [5]: http://panasonic-bread-machine.50webs.com
 [6]: http://cuisinart-bread-machine.50webs.com
 [7]: http://sunbeam-bread-machine.50webs.com
 [8]: http://oster-bread-machine.50webs.com
 [9]: http://west-bend-bread-machine.50webs.com
 [10]: http://westinghouse-bread-machine.50webs.com
 [11]: http://regal-ware-bread-machine.50webs.com
 [12]: http://indoor-grill.50webs.com
 [13]: http://george-foreman-indoor-grill.50webs.com
 [14]: http://hamilton-beach-indoor-grill.50webs.com
 [15]: http://cuisinart-indoor-grill.50webs.com
 [16]: http://star-manufacturing-indoor-grill.50webs.com
 [17]: http://anvil-indoor-grill.50webs.com
 [18]: http://presto-indoor-grill.50webs.com
 [19]: http://delonghi-indoor-grill.50webs.com
 [20]: http://cadco-indoor-grill.50webs.com
 [21]: http://eurodib-indoor-grill.50webs.com
 [22]: http://krups-indoor-grill.50webs.com
 [23]: http://sanyo-indoor-grill.50webs.com
 [24]: http://farberware-indoor-grill.50webs.com
 [25]: http://oster-indoor-grill.50webs.com
 [26]: http://breville-indoor-grill.50webs.com
 [27]: http://chefmaster-indoor-grill.50webs.com
 [28]: http://electric-indoor-grill.50webs.com
 [29]: http://sunbeam-indoor-grill.50webs.com
 [30]: http://sandwich-maker.50webs.com
 [31]: http://george-foreman-sandwich-maker.50webs.com
 [32]: http://cuisinart-sandwich-maker.50webs.com
 [33]: http://anvil-sandwich-maker.50webs.com
 [34]: http://toastmaster-sandwich-maker.50webs.com
 [35]: http://breville-sandwich-maker.50webs.com
 [36]: http://presto-sandwich-maker.50webs.com
 [37]: http://hamilton-beach-sandwich-maker.50webs.com
 [38]: http://krups-sandwich-maker.50webs.com
 [39]: http://tefal-sandwich-maker.50webs.com
 [40]: http://delonghi-sandwich-maker.50webs.com
 [41]: http://durabrand-sandwich-maker.50webs.com
 [42]: http://diablo-sandwich-maker.50webs.com
 [43]: http://eletric-sandwich-maker.50webs.com
 [44]: http://oster-sandwich-maker.50webs.com
 [45]: http://waffle-maker.50webs.com
 [46]: http://villaware-waffle-maker.50webs.com
 [47]: http://nemco-waffle-maker.50webs.com
 [48]: http://chefs-choice-waffle-maker.50webs.com
 [49]: http://cuisinart-waffle-maker.50webs.com
 [50]: http://star-manufacturing-waffle-maker.50webs.com
 [51]: http://gold-medal-waffle-maker.50webs.com
 [52]: http://hamilton-beach-waffle-maker.50webs.com
 [53]: http://toastmaster-waffle-maker.50webs.com
 [54]: http://oster-waffle-maker.50webs.com
 [55]: http://krups-waffle-maker.50webs.com
 [56]: http://belgian-waffle-maker.50webs.com
 [57]: http://kitchenaid-waffle-maker.50webs.com
 [58]: http://delonghi-waffle-maker.50webs.com
 [59]: http://george-foreman-waffle-maker.50webs.com
 [60]: http://westinghouse-waffle-maker.50webs.com
 [61]: http://sunbeam-waffle-maker.50webs.com
 [62]: http://waffle-iron.50webs.com
 [63]: http://villaware-waffle-iron.50webs.com
 [64]: http://nemco-waffle-iron.50webs.com
 [65]: http://chefs-choice-waffle-iron.50webs.com
 [66]: http://cuisinart-waffle-iron.50webs.com
 [67]: http://star-manufacturing-waffle-iron.50webs.com
 [68]: http://waring-waffle-iron.50webs.com
 [69]: http://gold-medal-waffle-iron.50webs.com
 [70]: http://hamilton-beach-waffle-iron.50webs.com
 [71]: http://toastmaster-waffle-iron.50webs.com
 [72]: http://oster-waffle-iron.50webs.com
 [73]: http://krups-waffle-iron.50webs.com
 [74]: http://belgian-waffle-iron.50webs.com
 [75]: http://black-and-decker-waffle-iron.50webs.com
 [76]: http://kitchenaid-waffle-iron.50webs.com
 [77]: http://delonghi-waffle-iron.50webs.com
 [78]: http://george-foreman-waffle-iron.50webs.com
 [79]: http://sunbeam-waffle-iron.50webs.com
 [80]: http://pancaker-maker.50webs.com
 [81]: http://perfect-pancake-maker.50webs.com
 [82]: http://toastmaster-pancake-maker.50webs.com
 [83]: http://george-foreman-pancake-maker.50webs.com
 [84]: http://deep-fryer.50webs.com
 [85]: http://frymaster-deep-fryer.50webs.com
 [86]: http://presto-deep-fryer.50webs.com
 [87]: http://rival-deep-fryer.50webs.com
 [88]: http://cecilware-deep-fryer.50webs.com
 [89]: http://gold-medal-deep-fryer.50webs.com
 [90]: http://delonghi-deep-fryer.50webs.com
 [91]: http://wells-deep-fryer.50webs.com
 [92]: http://star-manufacturing-deep-fryer.50webs.com
 [93]: http://tefal-deep-fryer.50webs.com
 [94]: http://anvil-deep-fryer.50webs.com
 [95]: http://anetsberger-deep-fryer.50webs.com
 [96]: http://dean-deep-fryer.50webs.com
 [97]: http://garland-deep-fryer.50webs.com
 [98]: http://imperial-deep-fryer.50webs.com
 [99]: http://keating-deep-fryer.50webs.com
 [100]: http://pitco-deep-fryer.50webs.com
 [101]: http://waring-deep-fryer.50webs.com
 [102]: http://electric-deep-fryer.50webs.com
 [103]: http://bravetti-deep-fryer.50webs.com
 [104]: http://oster-deep-fryer.50webs.com
 [105]: http://nesco-deep-fryer.50webs.com
 [106]: http://ge-deep-fryer.50webs.com
 [107]: http://black-and-decker-deep-fryer.50webs.com
 [108]: http://cuisinart-deep-fryer.50webs.com
 [109]: http://euro-pro-deep-fryer.50webs.com
 [110]: http://hamilton-beach-deep-fryer.50webs.com
 [111]: http://durabrand-deep-fryer.50webs.com
 [112]: http://sunbeam-deep-fryer.50webs.com
