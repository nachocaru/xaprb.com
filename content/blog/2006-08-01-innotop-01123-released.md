---
title: Version 0.1.123 of innotop released
date: "2006-08-01"
url: /blog/2006/08/01/innotop-01123-released/
categories:
  - Databases
  - Open Source
---
I've made several improvements to the `innotop` InnoDB and MySQL monitor, and it's ready to get from the [innotop homepage][1].

As usual, it's a combination of bug fixes, new features, and enhancements to existing features. Changes since version 0.1.112 include

*   More detailed lock information displayed in InnoDB Deadlock mode.
*   A new section in Row Operations / Semaphores mode shows information about the wait array.
*   I've expanded the test suite a lot. There's a lot of tricky stuff dealing with older versions of InnoDB that I've solved. It is a lot better at parsing information from the older table formats, etc. (Though I still need to either build or find samples from ancient versions and add them to the test suite -- contact me if you're willing to donate samples from servers running MySQL 3.x or on Windows!)
*   It handles foreign key error information better.
*   Read the changelog in the package for the full list of changes.

I hope you find it useful. As always, leave your comments.

 [1]: http://www.xaprb.com/innotop/
