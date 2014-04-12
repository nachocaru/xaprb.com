---
title: "Replication Sync Checking Algorithms"
date: "2014-04-12"
url: /blog/2014/04/12/replication-sync-algorithms/
categories:
  - Databases
---

I was interested to see the announcement of a [MySQL replication synchronization
checker utility][1] from Oracle recently. Readers may know that I spent years
working on this problem. The tool is now known as pt-table-checksum in Percona
Toolkit, but the original work started in 2006. I would say that I personally
have spent at least 6 months working on that; adding up all the other Percona
Toolkit developers, there might be several man-years of work invested. (I'm
not with Percona anymore.)

The pt-table-checksum tool has been reinvented about three times as I and others
learned more about the difficult and subtle problems involved. But if
it were still a project I worked on, I'd still not be happy with it. It causes
too much load on servers and does needless work. Solving that problem is
difficult in the general case, but I think it's worth doing. A replica simply
can't be trusted otherwise.

What would I suggest instead? I'd like a tool that runs continually and operates
a lot more like so-called "read repair" in some of the modern distributed
eventually consistent databases.  The details of those algorithms aren't
necessary to cover here, but it will suffice to point out that if there's going
to be data drift between a primary and a replica, it's probably not necessary to
check every row in every table.  Some data is unchanging and does not need to be
checked exhaustively again and again. Other data, which is being changed, is
likely to go out of sync in ways that you can catch probabilistically with very
good likelihood of catching problems soon after they happen *if you are checking
constantly*.

In other words, checking individual bits of data at random, adding barely
noticeable load to the server, and operating continually, will almost certainly
catch problems pretty soon, especially if you focus on the data that's most
likely to change. (Someone smarter than I can probably do the calculations and
prove or disprove my assertion. I have no plans to implement this myself, so
it's not something I want to spend time on.)

So this brings up the question, what "sophisticated synchronization algorithm"
does the mysqlrplsync utility use? The [documentation][3] doesn't explain as far as I
can see, and the source code is not immediately obvious to me. Can someone
explain it in words?  This is well worth doing, in my opinion. I personally
would never run such a tool unless I knew what it would actually do to my
servers.

As a historical note, when I wrote what would eventually become pt-table-sync, I
started out with [a comparison and synchronization algorithm][2] that mimicked and
tried to improve upon prior art. I quickly found serious, show-stopping problems
with that approach, and had to invent some things that I believe are fairly
novel, but have reasonably nice properties. As a result, I'm pretty comfortable
with pt-table-sync, but it certainly could be improved. However, if I'm not
mistaken, the mysqldbcompare utility that's part of the MySQL Utilities script
toolkit uses the algorithm that I rejected because of its impact on the servers
and its potential to cause serious problems. If mysqlrplsync uses the same
algorithm, I would be wary of recommending it.

For more on the performance and other characteristics of the algorithms that I
tried and tested (and implemented) in various incarnations of what's now Percona
Toolkit, please see the following:

* http://www.xaprb.com/blog/2007/03/30/comparison-of-table-sync-algorithms/
* http://www.xaprb.com/blog/2007/04/05/mysql-table-sync-vs-sqlyog-job-agent/

[1]: http://utilsmysql.blogspot.com/2014/04/new-mysql-utility-replication.html
[2]: http://www.xaprb.com/blog/2007/03/05/an-algorithm-to-find-and-resolve-data-differences-between-mysql-tables/
[3]: http://dev.mysql.com/doc/mysql-utilities/1.4/en/mysqlrplsync.html
