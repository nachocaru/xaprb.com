---
title: Version 0.1.106 of innotop MySQL/InnoDB monitor released
author: Baron Schwartz
excerpt: |
  <p>I've just improved <code>innotop</code> substantially, and released version 0.1.106 (<a href="http://www.xaprb.com/innotop/">download innotop here</a>), and I'm also preparing a series of articles on how to use it for real, practical things.  I'd like to know what you think of it, what problems you have, what features you want.  It would be a huge help if you'd start it, toggle through its modes, and give me your feedback.</p>
layout: post
permalink: /2006/07/23/innotop-version-01106-released/
description:
  - >
    Improvements to version 0.1.106 of the innotop InnoDB and MySQL monitor include
    bug fixes, more features, and many small enhancements.
---
I&#8217;ve just improved `innotop` substantially, and released version 0.1.106 ([download innotop here][1]), and I&#8217;m also preparing a series of articles on how to use it for real, practical things. I&#8217;d like to know what you think of it, what problems you have, what features you want. It would be a huge help if you&#8217;d start it, toggle through its modes, and give me your feedback.

Enhancements in version 0.1.106 include:

1.  InnoDBParser is much more complete and accurate.
2.  Tons of bug fixes.
3.  Add partitions to EXPLAIN mode.
4.  Enhance Q mode header, add T mode header.
5.  Share some configuration variables across modes.
6.  Add formatted time columns to Q, T modes.
7.  Add command-line argument parsing.
8.  Turn off echo when asking for password.
9.  Add option to specify port when connecting.
10. Let display-optimized-query display multiple notes.
11. Lots of small improvements, such as showing more info in statusbar.

That&#8217;s only a partial list, but those are the major things I&#8217;ve improved. I hope you enjoy it, and stay tuned for articles on how to use it.

 [1]: http://www.xaprb.com/innotop/