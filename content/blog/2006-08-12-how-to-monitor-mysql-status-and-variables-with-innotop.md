---
title: How to monitor MySQL status and variables with innotop
date: "2006-08-12"
permalink: /2006/08/12/how-to-monitor-mysql-status-and-variables-with-innotop/
description:
  - >
    Explains how the innotop MySQL and InnoDB monitor makes it easy to interpret the
    values from SHOW STATUS and SHOW VARIABLES, unlike the old-fashioned ways of
    doing this.
---
This is one in a series of articles on how to use [innotop][1], a MySQL and InnoDB monitor. In this article I'll explain how innotop can make it much easier to collect useful information from `SHOW STATUS` and `SHOW VARIABLES` into one place. There are three modes in innotop that do this in different ways, so one of them may meet your needs.

### Introduction

The output of `SHOW STATUS` and `SHOW VARIABLES` is one of the most useful tools for troubleshooting a MySQL server and getting a sense of how well it's running, what type of workload it's under, and so forth. In case you're not familiar with these, I recommend you [read up on them in the MySQL manual][2] before you read the rest of this article. You will get more out of the article if you understand what information is behind my examples.

The most basic method of getting at these variables is to issue a `SHOW` command, but the result is fairly certain to be an information overload, even if you use `LIKE` to constrain the results. Another thing you often need to know is how the values change over time; how many table scans happen per second, for example? It's hard to compare results of `SHOW` commands quickly, but you need to do that to understand what's happening in the server.

The classic tool for this is MySQL's own `mysqladmin`. You can run it with the `-i` and `-r` arguments to tell it to keep printing values every so often, and print the difference from the last set of values when it does so. A basic command to watch status variables might be the following:

<pre>mysqladmin extended -i10 -r</pre>

You can pipe that through `grep` to filter the results a little too.

There is clearly much room for improvement. I've included three different ways of viewing this information more easily and flexibly in innotop, and I'll explain those next.

### Method one: V mode

Before we begin: If you haven't already, you should [download and install innotop][3], and run these examples on your own server. It's a lot more interesting when you get to see how your own server is running. And if you're not upgraded to the latest and greatest version of innotop, it's worth doing; there are a lot more features in each new version. Specifically, I'm going to show some features only available in version 0.1.139.

Okay, on to the good stuff. Start innotop, and switch to V mode with the "V" key. V stands for "Variables and Status." It displays a table with a row for each chosen value, and a column for each set of values you want to view. Values can be chosen from anything you can find in `SHOW STATUS` or `SHOW VARIABLES`. A picture is worth a thousand words:

[<img src="/innotop/thumb-innotop-V-mode-usa.png" width="200" height="119" alt="innotop screenshot" />][4]

Let me explain that a bit more. The leftmost column shows which values I've chosen to display. Each row has one value. As you go to the right, you see the values themselves. First you see the most current values, then the ones before that, and so on &#8212; all the way till the far-right column.

There are a couple things to notice about this display:

1.  The display is incremental. That is, I'm not displaying the real values here. I'm displaying the difference between snapshots. You can see the `Uptime` value is incremented by 60 in each successive column. That's because I've chosen a sleep time of 60 seconds between snapshots. (I usually choose `Uptime` as the first value so I can see what time range is displayed).
2.  The far-right column is not incremental. That's because it's the earliest snapshot innotop has in memory, so there's nothing earlier to subtract from it. Besides, you don't always want to know the difference between values. Sometimes you want to know the value itself. This gives you a baseline so you can see both the incremental and absolute values at the same time.
3.  The second line of the display, above the values table, shows you the current display options. You can see incremental is on, and per-second average is off. You can toggle this with the "i" and "a" keys, so you can instantly switch back and forth between several views on the data.
4.  Long-number display is on. You can toggle it on and off with the "l" key (that's a lowercase "L") for a more compact display.

It's a pretty compact way to look at 8 minutes of history for the server, wouldn't you agree? You can easily get a lot more information from this display than with the other methods I've discussed. But there's more!

*   I include several preset choices of values to display with innotop. You can toggle back and forth between them with the keys "0&#8243; through "9&#8243;. There are presets for the query cache, table and index scans, InnoDB variables, transaction statements, and more. All in all, there's room for ten sets of values.
*   You can customize each set with the "c" key. Pick and choose from any value in STATUS and VARIABLES, as I said. This gets saved in your configuration file, so it's there when you quit and restart innotop.
*   You can choose the number of snapshots you want to display, from 2 to 9, so you can decide how much history you want to look at on one screen.

### Method 2: modelled after `tload`

Another way to monitor these variables is to draw a graph in the style of `tload`. The theory behind this mode is that you choose a few values (with the "c" key, as usual) and innotop will scale the per-second average of the values against the maximum it has ever seen, and use that to draw a pretty graph. You enter Graph mode with the "G" key. Here's a screenshot of that:

[<img src="/innotop/thumb-innotop-G-mode-usa.png" width="200" height="119" alt="innotop screenshot" />][5]

This isn't quite like `tload`, because the graph runs from top to bottom, not left to right. It prints out a header periodically, including the "max value" against which it is scaling.

In practice, I haven't quite gotten this right yet. I'm not sure how to scale it. I have no problems doing the math, but scaling against "the max value ever seen" doesn't seem to produce good results. Sometimes it results in a nice graph; other times not. I keep thinking there must be a good way to calculate actual server load, so it can be graphed meaningfully, but I can't think of it. Any suggestions?

I'm not very happy with this mode. If I can't figure out a way to make it more useful, I may get rid of this functionality, even though it's only a few lines of code.

### Method 3: modelled after `vmstat`

My co-worker John anticipated that the graph wouldn't be that useful, much to his credit, and asked me if I could imitate `vmstat` and `iostat` instead of drawing a graph. The result is "S" mode. It can print the same information as "G" mode, except it prints values instead of a graph. Here's another screenshot, showing per-second averages between sets of values (again, the "i" and "a" keys manipulate these options, and you can choose values with the "c" key):

[<img src="/innotop/thumb-innotop-S-mode-usa.png" width="200" height="119" alt="innotop screenshot" />][6]

I think this is more useful than "G" mode, though it's somewhat redundant to the "V" mode I demonstrated above. Because the values are laid out across the screen, and time flows from bottom to top of the screen, you can fit fewer values on the screen, but you can view a longer time window.

### Recap of the modes

I just showed you three modes innotop has for monitoring status and variable information from a MySQL server:

1.  "V" mode prints a table of snapshots, with lots of different options.
2.  "G" mode tries to print a graph, but doesn't always do a very good job.
3.  "S" mode prints something similar to "V" mode, but the data is laid out differently.

The three modes are basically different ways of looking at the same values. There's some redundancy among them, but because it requires so little code to do each of them, I don't care about the redundancy from a coding standpoint. I don't mind maintaining three features with similar functionality, if it gives more ways to use the monitor.

If you have any suggestions for improvements, I'm waiting to hear from you :-)

### Summary

In this article I explained the old-fashioned way to monitor the output of `SHOW STATUS`and `SHOW VARIABLES`, and then showed you how innotop can make this a lot faster and easier, and hopefully give you enough different views on the data that you can find one you like.

Stay tuned to learn more about innotop; there is a lot more to tell! You can [subscribe via feeds or e-mail][7] to keep current.

 [1]: http://www.xaprb.com/innotop/
 [2]: http://dev.mysql.com/doc/refman/5.0/en/show.html
 [3]: /innotop/
 [4]: /innotop/innotop-V-mode-usa.png
 [5]: /innotop/innotop-G-mode-usa.png
 [6]: /innotop/innotop-S-mode-usa.png
 [7]: /blog/subscribe/
