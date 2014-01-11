---
title: Maatkit bounty begins tomorrow
author: Baron Schwartz
layout: post
permalink: /2007/11/29/maatkit-bounty-begins-tomorrow/
tags:
  - MySQL
  - SQL
  - synchronization
---
Tomorrow is the first of [five days I will spend working on `mk-table-sync`][1], the data synchronization tool I developed as part of [Maatkit][2]. The first thing I&#8217;ll do is pull the row-checksumming code out into a module and write a unit test suite for it. I&#8217;ll probably add the code to the module that does checksums for `mk-table-checksum`, since it is not all that different.

My mind is not fresh on the code, but I think the next thing after that will be to pull out the code that finds differences in two sets of rows. It is largely identical for the two algorithms (which I called top-down and bottom-up for lack of better ideas). My plan is to use a callback function to abstract away the functionality that&#8217;s not the same. In other words, I&#8217;ll write code that accepts two sets of rows and a reference to a subroutine, and when it finds a difference between the rows it will call the subroutine.

This is a bit speculative, but the next step after that is probably to write modules for the top-down and bottom-up code too.

Then the rest of the program becomes &#8220;glue&#8221; for these tested modules. A lot of the functionality is already in modules I built for other tools, such as the code that parses a table definition, finds an optimal index, etc. I&#8217;m not sure how much of the code I&#8217;ve already written (and tested) will be able to replace parts of the current non-modular script, but I think it&#8217;ll be a lot. And I&#8217;ll just have to see what&#8217;s left over and how much of that fits into yet more modules. With yet more test suites.

The features I&#8217;m planning to implement, as well as the bugs I&#8217;m planning to fix, are all in the bug tracker at Sourceforge.

 [1]: http://www.xaprb.com/blog/2007/11/26/four-companies-to-sponsor-maatkit-development/
 [2]: http://code.google.com/p/maatkit/