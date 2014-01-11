---
title: Version 1.5.1 of the innotop MySQL monitor released
date: "2007-09-16"
permalink: /2007/09/16/version-151-of-the-innotop-mysql-monitor-released/
categories:
  - Databases
  - Open Source
---
<p class="download">
  <a href="http://code.google.com/p/innotop">Download innotop</a>
</p>

This release is part of the unstable 1.5 branch. Its features will ultimately go into the stable 1.6 branch. You can download it from the [innotop-devel package][1].

The major change is a new Command Summary' mode (switch to this mode with the 'C' key) that's similar to [mytop's][2] 'c' mode. It shows you the relative size of variables from SHOW STATUS and SHOW VARIABLES. Here's a sample:

<pre>Command Summary (? for help) localhost, 25+07:16:43, 2.45 QPS, 3 thd, 5.0.40

_____________________ Command Summary _____________________
Name                    Value    Pct     Last Incr  Pct    
Select_scan             3244858  69.89%          2  100.00%
Select_range            1354177  29.17%          0    0.00%
Select_full_join          39479   0.85%          0    0.00%
Select_full_range_join     4097   0.09%          0    0.00%
Select_range_check            0   0.00%          0    0.00%</pre>

The default is to show the `Com_*` variables, but I've used a different prefix to illustrate that you can view any variables you want. You just choose the prefix. Useful ones are `Select_`, `Handler_` and `Sort_`. This gives you instant insight into the kind of work your server is doing. You can see in the sample above that the kinds of joins the server does is healthily balanced towards scans and ranges on the first table. The server does very few full joins, full range joins, and range-check query plans (this is good).

The example shows one server, as you can see by the first line. Naturally, you can monitor many servers in aggregate, and it's configured to do this by default if you're watching more than one server. However, there's a bug in the percentage columns when you do that (the Value columns are accurate when aggregated). I have a fix in mind for that, which will also fix many other things that cause me (and you) too much work when customizing innotop. But that'll come later. I feel this is good enough for now, since the main use for this mode is when you're just trying to familiarize yourself with a server, perhaps at a consulting job, or when reading someone's tuning tutorial or the like.

 [1]: http://code.google.com/p/innotop
 [2]: http://jeremy.zawodny.com/mysql/mytop/
