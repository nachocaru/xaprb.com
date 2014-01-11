---
title: Progress on High Performance MySQL, Second Edition
  <p>It's been a while since I said anything about the progress on the book.  That doesn't mean we are not still working on it, though.</p>
  
  <p>As <a href="http://www.mysqlperformanceblog.com/2007/11/12/how-we-work-on-high-performance-mysql-second-edition/">Peter wrote a while ago</a>, he is basically wearing the hat of a very advanced technical reviewer at this point.  We've finished writing all the chapters from his detailed outlines.  He has worked through about half the chapters, and I'm continuing to spend my evenings and weekends and holidays (yes, nearly all my free time -- just ask my wife!) writing some new material (an appendix on <code>EXPLAIN</code>, for example), finishing unfinished things marked with TODO in the text, and revising chapters after Peter reviews them.  Vadim is working on benchmarks.  For example, he just finished some benchmarks for something I profiled with <code>SHOW STATUS</code>.  I thought that would be good enough to assert something about the performance.  Sure enough, <code>SHOW STATUS</code> says it does less work, but Vadim's benchmarks show it's slower :-)  This is why we check each other's work!</p>
  
  <p>The core chapters on MySQL performance -- beginning with Benchmarking and Profiling, and continuing through Optimizing Server Settings -- are the ones Andy Oram, our editor, thinks we should put the most effort into, and I agree.  We will probably circle back and go through another review/edit cycle before we release them for technical review.  Some of the other chapters, such as Replication, are already out for technical review.</p>
  
  <p>Despite the fact that all of the chapters and appendixes are theoretically a "first draft," as of several weeks ago, there is still a lot of work to do.  Depending on the chapter, it takes me a solid weekend to revise a chapter after Peter reviews it.  Each little thing anyone points out (does MySQL version X really do Y by default?) requires some research, testing, benchmarks, or even reading the source code.</p>
  
  <p>Some miscellanea:</p>
  
  <ul>
  <li>The production staff replied to my inquiry to the editor to say that yes, we will be able to have references that point to a specific page number.  This was a big relief to me.  It requires extra work, but makes the book so much more valuable as a reference work in my opinion.  To see why, look at the top of page 151 in the first section, which just refers to chapters and sections by their titles: "See... the "Tools" section..."  Now try to find the "Tools" section.  If it took you a while... well, the first time I did it, I missed it, and thought it might mean the Tools <em>Chapter</em>.  The second edition will say "The X section on page Y" or similar.  (Okay, I'll shut up about this now -- everyone has to have a <a href="http://www.xaprb.com/blog/2007/02/14/review-of-pro-nagios-20-and-nagios-system-and-network-monitoring/">pet peeve</a>, eh?)</li>
  <li>We are currently at 425 pages in OpenOffice.org Writer, which by my calculations puts us around 470 pages in print.  As I said before, I think we'll break 500 pages by the time we finish the rest of the missing material.</li>
  <li><a href="http://shodan.ru/">Andrew Aksyonoff</a> has contributed an appendix on the <a href="http://www.sphinxsearch.com/">Sphinx full-text search system</a>.  If you don't know anything about it, check it out.  It's an amazing piece of software that does a lot more than just full-text search.</li>
  </ul>
  
  <p>Well, I've run out of my allotted thirty minutes of blogging!  Back to the salt mines!  Just kidding...  I'm actually off to the climbing gym soon to get my mind off it.</p>
date: "2007-11-29"
permalink: /2007/11/29/progress-on-high-performance-mysql-second-edition/
description:
  - >
    High Performance MySQL, second edition, is not dead, no matter what you might
    have heard.
tags:
  - Andrew Aksyonoff
  - Andy Oram
  - MySQL
  - Peter Zaitsev
  - Sphinx
  - SQL
  - Vadim Tkachenko
---
It's been a while since I said anything about the progress on the book. That doesn't mean we are not still working on it, though.

As [Peter wrote a while ago][1], he is basically wearing the hat of a very advanced technical reviewer at this point. We've finished writing all the chapters from his detailed outlines. He has worked through about half the chapters, and I'm continuing to spend my evenings and weekends and holidays (yes, nearly all my free time &#8212; just ask my wife!) writing some new material (an appendix on `EXPLAIN`, for example), finishing unfinished things marked with TODO in the text, and revising chapters after Peter reviews them. Vadim is working on benchmarks. For example, he just finished some benchmarks for something I profiled with `SHOW STATUS`. I thought that would be good enough to assert something about the performance. Sure enough, `SHOW STATUS` says it does less work, but Vadim's benchmarks show it's slower :-) This is why we check each other's work!

The core chapters on MySQL performance &#8212; beginning with Benchmarking and Profiling, and continuing through Optimizing Server Settings &#8212; are the ones Andy Oram, our editor, thinks we should put the most effort into, and I agree. We will probably circle back and go through another review/edit cycle before we release them for technical review. Some of the other chapters, such as Replication, are already out for technical review.

Despite the fact that all of the chapters and appendixes are theoretically a "first draft," as of several weeks ago, there is still a lot of work to do. Depending on the chapter, it takes me a solid weekend to revise a chapter after Peter reviews it. Each little thing anyone points out (does MySQL version X really do Y by default?) requires some research, testing, benchmarks, or even reading the source code.

Some miscellanea:

*   The production staff replied to my inquiry to the editor to say that yes, we will be able to have references that point to a specific page number. This was a big relief to me. It requires extra work, but makes the book so much more valuable as a reference work in my opinion. To see why, look at the top of page 151 in the first section, which just refers to chapters and sections by their titles: "See&#8230; the "Tools" section&#8230;" Now try to find the "Tools" section. If it took you a while&#8230; well, the first time I did it, I missed it, and thought it might mean the Tools *Chapter*. The second edition will say "The X section on page Y" or similar. (Okay, I'll shut up about this now &#8212; everyone has to have a [pet peeve][2], eh?)
*   We are currently at 425 pages in OpenOffice.org Writer, which by my calculations puts us around 470 pages in print. As I said before, I think we'll break 500 pages by the time we finish the rest of the missing material.
*   [Andrew Aksyonoff][3] has contributed an appendix on the [Sphinx full-text search system][4]. If you don't know anything about it, check it out. It's an amazing piece of software that does a lot more than just full-text search.

Well, I've run out of my allotted thirty minutes of blogging! Back to the salt mines! Just kidding&#8230; I'm actually off to the climbing gym soon to get my mind off it.

 [1]: http://www.mysqlperformanceblog.com/2007/11/12/how-we-work-on-high-performance-mysql-second-edition/
 [2]: http://www.xaprb.com/blog/2007/02/14/review-of-pro-nagios-20-and-nagios-system-and-network-monitoring/
 [3]: http://shodan.ru/
 [4]: http://www.sphinxsearch.com/
