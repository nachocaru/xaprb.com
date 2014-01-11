---
title: Upcoming innotop features
author: Baron Schwartz
excerpt: "<p>It's been a while since I released an update to innotop, but I have not been idle.  I'm currently working hard to add major new features and functionality.  Here's a quick list of what's coming.</p>"
layout: post
permalink: /2006/12/13/upcoming-innotop-features/
description:
  - "List of new innotop features I'm working on."
---
It&#8217;s been a while since I released an update to the [innotop][1] InnoDB and MySQL monitor, but I have not been idle. I&#8217;m currently working hard to add major new features and functionality. Here&#8217;s a quick list of what&#8217;s coming, much of which is done already but still slightly broken:

1.  Arbitrary user-defined expressions can be the source of a column in a tabular view. You are not limited to choosing from the columns I&#8217;ve defined; you can add your own, and base it directly on the available data or write an expression to calculate what you want.
2.  Connect to and monitor multiple servers simultaneously.
3.  More powerful filtering to show only the data you care about. Built-in filters are applied by default, but you can define your own of course.
4.  Highlighting based on user-defined criteria. Maybe you want a transaction to appear red if it has been active for more than a minute, or you want queries running on different servers to have different colors.
5.  Easily monitor replication across many machines; watch master and slave status.
6.  Readline support for easier configuration (tab-completion, etc).

Those are just the major features. Many of you have requested features by e-mail, and I&#8217;m either building those now, or they&#8217;re in the TODO list.

Many of these features require gutting and re-building significant portions of the code (For example, going from one to many servers is a complete paradigm change. Most of what I&#8217;m doing right now is cleaning up the mess that caused). I&#8217;m not sure how to do some of the planned changes, but a few weeks ago I didn&#8217;t know how I&#8217;d handle multiple servers. I&#8217;m sure it will all come to me.

If you have specific requests, please be sure to ask! I&#8217;ll get you started: would it be helpful to [monitor NDB status][2] on many machines at once, if you run a large NDB cluster? I personally don&#8217;t monitor any such clusters, so this isn&#8217;t an itch I&#8217;ve scratched, but it would be very little work for me to transform that ugly semicolon-separated stuff into a nice tabular display.

My current TODO list should be finished up in a month or so, and then I&#8217;ll release a new version. Right now I&#8217;m going to take a little break from programming and blogging, so I&#8217;ll read and reply to your comments when I return.

 [1]: /innotop/
 [2]: http://dev.mysql.com/doc/refman/5.1/en/show-engine.html