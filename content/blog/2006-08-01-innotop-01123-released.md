---
title: Version 0.1.123 of innotop released
author: Baron Schwartz
excerpt: |
  <p>I've made several improvements to the <code>innotop</code> InnoDB and MySQL monitor, and it's ready to get from the <a href="http://www.xaprb.com/innotop/">innotop homepage</a>.</p>
  
  <p>As usual, it's a combination of bug fixes, new features, and enhancements to existing features.</p>
layout: post
permalink: /2006/08/01/innotop-01123-released/
description:
  - Lists the changes in version 0.1.123 of the innotop InnoDB and MySQL monitor.
---
I&#8217;ve made several improvements to the `innotop` InnoDB and MySQL monitor, and it&#8217;s ready to get from the [innotop homepage][1].

As usual, it&#8217;s a combination of bug fixes, new features, and enhancements to existing features. Changes since version 0.1.112 include

*   More detailed lock information displayed in InnoDB Deadlock mode.
*   A new section in Row Operations / Semaphores mode shows information about the wait array.
*   I&#8217;ve expanded the test suite a lot. There&#8217;s a lot of tricky stuff dealing with older versions of InnoDB that I&#8217;ve solved. It is a lot better at parsing information from the older table formats, etc. (Though I still need to either build or find samples from ancient versions and add them to the test suite &#8212; contact me if you&#8217;re willing to donate samples from servers running MySQL 3.x or on Windows!)
*   It handles foreign key error information better.
*   Read the changelog in the package for the full list of changes.

I hope you find it useful. As always, leave your comments.

 [1]: http://www.xaprb.com/innotop/