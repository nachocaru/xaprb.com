---
title: Innotop version 1.152 released
author: Baron Schwartz
excerpt: |
  <p>Version 0.1.152 of <a href="http://www.xaprb.com/innotop/">innotop</a> is a small maintenance and bug-fix release.  I found some more ways to make it deal with garbage input without crashing.  Of course, that means it's harder to find errors because it doesn't complain and let me know they exist, but that's what you are for :-)</p>
layout: post
permalink: /2006/09/28/innotop-version-1152-released/
description:
  - >
    Yet another version of the innotop MySQL and InnoDB monitor, with improved
    ability to handle bad input, a new homepage, a better distribution mechanism,
    and a bug fix.
---
Version 0.1.152 of [innotop][1] is a small maintenance and bug-fix release. I found some more ways to make it deal with garbage input without crashing. Of course, that means it&#8217;s harder to find errors because it doesn&#8217;t complain and let me know they exist, but that&#8217;s what you are for :-)

I&#8217;m also making a sort of homepage for it. I just don&#8217;t have much time to put into these things right now, so a &#8220;real&#8221; homepage may be a long time off, I don&#8217;t know. Anyway, instead of linking back to the other article for you to download it, you can get it from the [innotop homepage][2]. I&#8217;m also distributing it in a more conventional form: in a .tar.gz file, numbered by version, with an honest-to-goodness Makefile and a standard &#8220;make install&#8221; process. I got a little bit of inspiration from [Jeremy Zawodny&#8217;s mytop][3] (again!) for this. Thanks Jeremy!

Looking towards the future, I&#8217;ve also submitted a [bug report against SolidDB][4] to encourage them to make any debugging output easier to use than InnoDB&#8217;s. If possible, I am willing to extend innotop to handle [SolidDB][5], [PBXT][6], and in fact any other engines that come along.

**Update** I&#8217;m sorry, but I seem to have bungled something in the package build script I use. If the .tar.gz file isn&#8217;t working well for you, please use the .zip file. I&#8217;ll try to address this tonight when I get home.

**Update** The packages should be fixed now.

 [1]: http://www.xaprb.com/innotop/
 [2]: /innotop/
 [3]: http://jeremy.zawodny.com/mysql/mytop/
 [4]: http://dev.soliddb.com/bug/show_bug.cgi?id=24
 [5]: http://dev.soliddb.com/
 [6]: http://www.primebase.com/xt