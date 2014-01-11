---
title: New Aspersa I/O analysis tool, diskstats
author: Baron Schwartz
layout: post
permalink: /2011/02/05/new-aspersa-io-analysis-tool-diskstats/
categories:
  - Aspersa
  - PostgreSQL
  - SQL
tags:
  - MySQL
---
I&#8217;ve just committed some changes to [diskstats][1], an I/O analysis tool in Aspersa that&#8217;s actually been in the Subversion repository for a long time, but in a barely usable fashion and with no documentation. Now it&#8217;s usable and documented.

It is basically a reimplementation of iostat in awk. Why on earth would I reinvent that wheel? Because I spend a lot of time gathering and analyzing raw data from /proc/diskstats, which is vital to really understanding what the storage subsystem is doing. The iostat tool hides important details. Seeing that detail has immediately solved many a disk performance problem and proven SAN vendors wrong, for instance. (I used to do this [the old-fashioned way][2].) Disk performance, of course, is one of the most important things to analyze in a database server that&#8217;s struggling.

Also, iostat isn&#8217;t interactive, and I wanted an interactive, menu-driven tool to quickly slice and dice the data and drill down into what is happening with I/O. The data it accepts is in the same format as that stored by the [stalk][3] and [collect][4] tools, which is my default post-mortem toolset. And finally &#8212; and I know this might be hard to believe &#8212; I&#8217;ve been asked to fix problems many times on systems that don&#8217;t have iostat and I am not allowed to install it.

And wouldn&#8217;t you know it, as I wrote the user&#8217;s manual I found a [bug][5], after all my ranting about how other tools show I/O stats wrong. I don&#8217;t have time to diagnose or fix the bug right now, so maybe someone else can contribute that. There is a test suite (remind me to explain sometime how I make Bash scripts highly testable) so if we find the problem and fix it, it&#8217;ll stay fixed. Contribute your fix to the bug report :-)

 [1]: http://aspersa.googlecode.com/svn/html/diskstats.html
 [2]: http://www.xaprb.com/blog/2010/05/14/how-to-read-linuxs-procdiskstats-easily/
 [3]: http://aspersa.googlecode.com/svn/html/stalk.html
 [4]: http://aspersa.googlecode.com/svn/html/collect.html
 [5]: http://code.google.com/p/aspersa/issues/detail?id=80