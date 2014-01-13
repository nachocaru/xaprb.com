---
title: Innotop version 1.152 released
date: "2006-09-28"
permalink: /blog/2006/09/28/innotop-version-1152-released/
categories:
  - Databases
  - Open Source
---
Version 0.1.152 of [innotop][1] is a small maintenance and bug-fix release. I found some more ways to make it deal with garbage input without crashing. Of course, that means it's harder to find errors because it doesn't complain and let me know they exist, but that's what you are for :-)

I'm also making a sort of homepage for it. I just don't have much time to put into these things right now, so a "real" homepage may be a long time off, I don't know. Anyway, instead of linking back to the other article for you to download it, you can get it from the [innotop homepage][2]. I'm also distributing it in a more conventional form: in a .tar.gz file, numbered by version, with an honest-to-goodness Makefile and a standard "make install" process. I got a little bit of inspiration from [Jeremy Zawodny's mytop][3] (again!) for this. Thanks Jeremy!

Looking towards the future, I've also submitted a [bug report against SolidDB][4] to encourage them to make any debugging output easier to use than InnoDB's. If possible, I am willing to extend innotop to handle [SolidDB][5], [PBXT][6], and in fact any other engines that come along.

**Update** I'm sorry, but I seem to have bungled something in the package build script I use. If the .tar.gz file isn't working well for you, please use the .zip file. I'll try to address this tonight when I get home.

**Update** The packages should be fixed now.

 [1]: http://www.xaprb.com/innotop/
 [2]: /innotop/
 [3]: http://jeremy.zawodny.com/mysql/mytop/
 [4]: http://dev.soliddb.com/bug/show_bug.cgi?id=24
 [5]: http://dev.soliddb.com/
 [6]: http://www.primebase.com/xt
