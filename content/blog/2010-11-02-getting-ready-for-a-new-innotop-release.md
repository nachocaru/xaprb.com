---
title: Getting ready for a new innotop release
author: Baron Schwartz
layout: post
permalink: /2010/11/02/getting-ready-for-a-new-innotop-release/
categories:
  - Innotop
  - SQL
---
It&#8217;s been ages since we&#8217;ve had an update to [innotop][1], or at least, it&#8217;s been a while since the changes were bundled up and released officially. Barring any bug reports against the [trunk code][2], I&#8217;m about ready to release more than a year&#8217;s worth of improvements to it:

`<pre>   Changes:
   * Don't re-fetch SHOW VARIABLES every iteration; it's too slow on many hosts.
   * Add a filter to remove EVENT threads in SHOW PROCESSLIST (issue 32).
   * Add a timestamp to output in -n mode, when -t is specified (issue 37).
   * Add a new U mode, for Percona/MariaDB USER_STATISTICS enhancements (issue 39).
   * Add support for millisecond query time in Percona Server (issue 39).
   * Display a summary of queries executed in Query List mode (issue 26).

   Bugs fixed:
   * Hostname parsing wasn't standards compliant (issue 30).
   * MKDEBUG didn't work on some Perl versions (issue 22).
   * Don't try to get InnoDB status if have_innodb != YES (issue 33).
   * Status text from the InnoDB plugin wasn't parsed correctly (issue 36).
   * Transaction ID from the InnoDB plugin wasn't subtracted correctly (issue 38).
   * Switching modes and pressing ? for help caused a crash (issue 40).</pre>`

 [1]: http://code.google.com/p/innotop/
 [2]: http://innotop.googlecode.com/svn/trunk/innotop