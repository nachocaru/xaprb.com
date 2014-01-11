---
title: Version 1.5.1 of the innotop MySQL monitor released
author: Baron Schwartz
excerpt: |
  <p>This release is part of the unstable 1.5 branch. Its features will ultimately go into the stable 1.6 branch. You can download it from the <a href="http://sourceforge.net/project/showfiles.php?group_id=186074">innotop-devel package</a>.</p>
  
  <p>The major change is a new Command Summary' mode (switch to this mode with the 'C' key) that's similar to mytop's 'c' mode.  It shows you the relative size of variables from SHOW STATUS and SHOW VARIABLES.</p>
layout: post
permalink: /2007/09/16/version-151-of-the-innotop-mysql-monitor-released/
description:
  - >
    innotop now has a Command Summary mode for quick insight on the relative size of
    status variables.
tags:
  - Innotop
  - monitoring
  - MySQL
  - mytop
  - SQL
---
<p class="download">
  <a href="http://code.google.com/p/innotop">Download innotop</a>
</p>

This release is part of the unstable 1.5 branch. Its features will ultimately go into the stable 1.6 branch. You can download it from the [innotop-devel package][1].

The major change is a new Command Summary&#8217; mode (switch to this mode with the &#8216;C&#8217; key) that&#8217;s similar to [mytop&#8217;s][2] &#8216;c&#8217; mode. It shows you the relative size of variables from SHOW STATUS and SHOW VARIABLES. Here&#8217;s a sample:

<pre>Command Summary (? for help) localhost, 25+07:16:43, 2.45 QPS, 3 thd, 5.0.40

_____________________ Command Summary _____________________
Name                    Value    Pct     Last Incr  Pct    
Select_scan             3244858  69.89%          2  100.00%
Select_range            1354177  29.17%          0    0.00%
Select_full_join          39479   0.85%          0    0.00%
Select_full_range_join     4097   0.09%          0    0.00%
Select_range_check            0   0.00%          0    0.00%</pre>

The default is to show the `Com_*` variables, but I&#8217;ve used a different prefix to illustrate that you can view any variables you want. You just choose the prefix. Useful ones are `Select_`, `Handler_` and `Sort_`. This gives you instant insight into the kind of work your server is doing. You can see in the sample above that the kinds of joins the server does is healthily balanced towards scans and ranges on the first table. The server does very few full joins, full range joins, and range-check query plans (this is good).

The example shows one server, as you can see by the first line. Naturally, you can monitor many servers in aggregate, and it&#8217;s configured to do this by default if you&#8217;re watching more than one server. However, there&#8217;s a bug in the percentage columns when you do that (the Value columns are accurate when aggregated). I have a fix in mind for that, which will also fix many other things that cause me (and you) too much work when customizing innotop. But that&#8217;ll come later. I feel this is good enough for now, since the main use for this mode is when you&#8217;re just trying to familiarize yourself with a server, perhaps at a consulting job, or when reading someone&#8217;s tuning tutorial or the like.

 [1]: http://code.google.com/p/innotop
 [2]: http://jeremy.zawodny.com/mysql/mytop/