---
title: "How to read Linux's /proc/diskstats easily"
date: "2010-05-14"
permalink: /2010/05/14/how-to-read-linuxs-procdiskstats-easily/
categories:
  - Databases
  - Open Source
  - Operations
---
These days I spend more time looking at /proc/diskstats than I do at iostat. The problem with iostat is that it lumps reads and writes together, and I want to see them separately. That's really important on a database server (e.g. MySQL performance analysis).

It's not easy to read /proc/diskstats by looking at them, though. So I usually do the following to get a nice readable table:

*   Grep out the device I want to examine.
*   Push that through "rel" from the Aspersa project.
*   Add column headers, then format it with "align" from the same project.

Here's a recipe. You might want to refer to the [kernel iostat documentation][1] too.

`<pre>
wget http://aspersa.googlecode.com/svn/trunk/rel
wget http://aspersa.googlecode.com/svn/trunk/align
chmod +x rel align
while sleep 1; do grep sdb1 /proc/diskstats; done > stats
# CTRL-C after a while
echo m m dev  reads   rd_mrg rd_sectors ms_reading \
  writes   wr_mrg     wr_sectors  ms_writing  cur_ios \
  ms_doing_io ms_weighted | cat - stats | ./rel | ./align
m  m dev      reads rd_mrg  rd_sectors ms_reading    writes wr_mrg  wr_sectors ms_writing cur_ios ms_doing_io ms_weighted
8 17 sdb1 233290130 310126 22472222903 2032292523 479678266 883257 35319718188 1491098806       0   675768709  3523591184
0  0 sdb0        80      0        2560       1049       236      1       13621        253       0         161        1302
0  0 sdb0       226      0        7232       1418       638      0       40156        235       0         224        1653
0  0 sdb0        39      0        1248        295       519      0       35440        573      17         196        1669
0  0 sdb0        73      0        2336       4031      2104      0      134480       3076     -17         908        6308
0  0 sdb0        33      0        1056        293         3      0         834          0       0         293         293
0  0 sdb0        35      0        1120        157         3      0         642          0       0         150         157
0  0 sdb0        36      0        1152        161         3      0         586          0       1         155         162
0  0 sdb0        36      0        1152        140         3      0         738          0       0         139         141
0  0 sdb0       208      0        6656       4514       630      0       40552       1002      -1         455        5514
0  0 sdb0        57      0        1824        547       485      0       35156        485      16         195        1566
0  0 sdb0        99      0        3168       4442      2067      0      133972       3491     -16         869        7403
0  0 sdb0        22      0         704        140        20      0        8801         12       0         144         152
0  0 sdb0        16      0         512         62         2      0         466          0       0          62          62
</pre>`

 [1]: http://www.mjmwired.net/kernel/Documentation/iostats.txt
