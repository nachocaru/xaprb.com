---
title: What is new in Maatkit
author: Baron Schwartz
excerpt: |
  |
    <p>My posts lately have been mostly progress reports and release notices.  That's because we're in the home stretch on the book, and I don't have much spare time.  However, a lot has also been changing with Maatkit, and I wanted to take some time to write about it properly.</p>
layout: post
permalink: /2008/01/05/what-is-new-in-maatkit/
description:
  - Maatkit has a lot more functionality and speed these days.
tags:
  - backups
  - Jeremy Cole
  - Mark Callaghan
  - Michael Radwin
  - MySQL
  - PostgreSQL
  - replication
  - Six Apart
  - SQL
  - synchronization
  - UDF
---
My posts lately have been mostly progress reports and release notices. That&#8217;s because we&#8217;re in the home stretch on the book, and I don&#8217;t have much spare time. However, a lot has also been changing with Maatkit, and I wanted to take some time to write about it properly. I&#8217;ll just write about each tool in no particular order.

### Overall

I&#8217;ve been fixing a fair number of bugs, most of which have been in the code for a while. Every bug I fix these days gets a test case to guard against regressions. I&#8217;ve integrated the tests into the Makefile, so there&#8217;s no way for me to forget to run them.

The test suite has hundreds of tests, which is probably pretty good in comparison to many projects of this type. However, there will probably never be enough tests. I&#8217;ve moved much (in some cases, almost all) of the code into modules, which are easy to test, but it&#8217;s always a little harder to test programs themselves, so some things aren&#8217;t tested. (For example, it&#8217;s tedious to set up a test case that requires many MySQL instances to be running in a multi-tier replication setup).

Still, I think the quality has increased a lot in the last 6 months or so, since I&#8217;ve been more disciplined about tests. That discipline, by the way, was forced on me. The mk-table-sync tool was completely unmanageable. I was able to rewrite that tool in December, almost entirely using modularized, tested code.

### mk-heartbeat

Jeremy Cole and Six Apart originally contributed this tool. Since then I&#8217;ve added a lot more features, allowed a lot more control over how it works, and it even works on PostgreSQL now. As an example, I added features that make it easy to run every hour from a crontab. It daemonizes, runs in the background, and then quits automatically when the new instance starts. I use it in production to give me a reliable metric for how up-to-date a slave is. When I need to know absolutely &#8220;has this slave received this update,&#8221; Seconds\_behind\_master won&#8217;t do, for many reasons. Load balancing and lots of other things hinge on up-to-date slaves.

### mk-parallel-dump

I think this tool is probably the fastest, smartest way to do backups in tab-delimited format. I&#8217;ve been fixing a lot of bugs in this one, mostly for non-tab-delimited dumps. It has turned out to be harder to write this code because it uses shell commands to call `mysqldump`. (The tab-delimited dumps are done entirely via SQL, which is why it&#8217;s so good at what it does).

### mk-slave-restart

I&#8217;ve been having a lot of trouble with relay log corruption, so unfortunately this tool has become necessary to use regularly in production. As a result I made it quite a bit smarter. It can detect relay log corruption, and instead of the usual skip-one-and-continue, it issues a CHANGE MASTER TO, so the slave will discard and re-fetch its relay logs. I&#8217;ve also made it capable of monitoring many slaves at once. (It discovers slaves via either SHOW SLAVE HOSTS or SHOW PROCESSLIST, so if you point it at a master, it can watch all the master&#8217;s slaves with a single command).

### mk-table-checksum

I&#8217;ve made a lot of changes to this tool recently. Smarter chunking code to divide your tables into bits that are easier for the server to work with, TONS of small improvements and fixes, and much friendlier behavior.

The most recent release also includes a big speed improvement. Most of the time this tool spends is waiting for MySQL to run checksum queries. While my pure-SQL checksum queries are faster than most (all?) other ways to compare data in different servers, I&#8217;ve recently been trying to reduce the amount of work they cause.

As a result, I investigated [Google&#8217;s MySQL patches][1]. [Mark Callaghan][2] mentioned to me that he&#8217;d added a checksum function into their version of the server, and I wanted to look at that. They&#8217;re using the [FNV][3] hash function to checksum data. I decided that a [UDF][4] would be a fine way to write a faster row-checksum function, so I wrote a 64-bit FNV hash UDF. While I&#8217;m [not the first person to do that][5], my version accepts any number of arguments, not just one. This makes it a lot more efficient to checksum every column in a row, because you don&#8217;t have to a) make multiple calls to the hash function or b) concatenate the arguments so you can make a single call. I also copied Google&#8217;s logic to make it simpler and more efficient to checksum NULLs, which avoids still more function calls. The UDF returns a 64-bit number, which can be fed directly to BIT_XOR to crush an entire table (or group of rows) into a single order-independent checksum. And finally, FNV is also a lot faster than, say, MD5 or SHA1.

The results are quite a bit faster for my hardware: 12.7 seconds instead of 80 seconds on a CPU-bound workload. So that&#8217;s at least a 6.2x speedup. (80 seconds was the best I was able to achieve before. Some of the checksum techniques used up to 197 seconds on the same data).

The UDF is really simple to compile and install, does no memory allocations or other nasty things, and should be safe for you to use. The source is included with the latest Maatkit release. (Older Maatkit versions won&#8217;t be able to take full advantage of it, by the way, but they can still be sped up somewhat). However, I would really appreciate some review from more experienced coders. I&#8217;m no C++ wizard. In fact, my first attempts at writing this thing were so blockheaded and wrong, I was almost embarrassed. (Thanks are due to the fine people hanging out on #mysql-dev).

### mk-table-sync

After my week-long coding marathon on this in December, I&#8217;ve needed to continue working on this. I&#8217;ve needed it quite a few times to solve problems with replication. (Did I mention relay log corruption?). It&#8217;s much faster and less buggy now, and as a bonus, the latest release can also take advantage of the FNV UDF I just mentioned.

I think I should explain the general evolution in this tool&#8217;s life. It started out as &#8220;[how to find differences in data efficiently][6].&#8221; This was a period where I did a lot of deep thinking on exploiting the structures inherent in data. It then progressed to &#8220;[how to sync data efficiently][7].&#8221; At this point I was able to [outperform another data-syncing tool by a wide margin][8], even though it was a multi-threaded C++ program and mine was just a Perl script. I did that by writing efficient queries and moving very little data across the network.

The most recent incarnation has thrown performance out the window, at least as measured by those criteria. The aforementioned C++ program now outperforms mine by a wide margin on the same tests.

What changed?

Two things: I&#8217;m focusing on quality, and I&#8217;m focusing on syncing running servers correctly with minimal interruption.

Once I have good-quality, well-tested code, I&#8217;ll be able to speed it up. I know this because I&#8217;m currently doing some things I know are slower than they could be.

But much more importantly, I&#8217;ve changed the whole angle of the tool. I want to be able to synchronize a busy master and slave, without locking tables, automatically ensuring that the data stays consistent and there are no race conditions. I do this with a lot of special tricks, such as syncing tables in small bits, using `SELECT FOR UPDATE` to lock only the rows I&#8217;m syncing, and so on. And I&#8217;m actively working to make the tool Do The Right Thing without needing 99 command-line arguments. (I think the latest release does this very well).

Instead of &#8220;make the sync use as little network traffic as possible,&#8221; I&#8217;ve changed the criteria of good-ness to &#8220;do it right, do it once, and don&#8217;t get in the way.&#8221;

As a result, I can sync a table that gets a ton of updates &#8212; one of the &#8220;hottest&#8221; tables in my application &#8212; without interfering with my application. Online. Correctly. In one pass. Through replication. Show me another tool that can do that, and I&#8217;ll re-run my benchmarks :-)

This doesn&#8217;t mean I don&#8217;t care about performance. I do, and I&#8217;ll bring back the earlier &#8220;go easy on the network&#8221; sync algorithms at some point. They are very useful when you have a slow network, or your tables aren&#8217;t being updated and you just want to sync things fast. I&#8217;ll also be able to speed up the &#8220;don&#8217;t interfere with the application&#8221; algorithms.

One interesting thing I did was divide up the functionality so the tool can use many different sync algorithms. I created something like a storage-engine API, except it&#8217;s a sync API. It&#8217;s really easy to add in new sync algorithms now. All I have to do is write the code that algorithm needs. This is really only about 200-300 lines of code for the current algorithms.

### Tools that don&#8217;t yet exist

What I haven&#8217;t told you about is a lot of unreleased code and new tools. There&#8217;s some good stuff in the works. Also stay tuned &#8212; a third party might be about to contribute another tool to Maatkit, which will also be a very neat addition.

## Conclusion

As [Dana Carvey says][9], &#8220;If I had more time&#8230; the programs we have in place are getting the job done, so let&#8217;s stay on course, a thousand points of light. Well, unfortunately, I guess my time is up.&#8221; Maatkit is getting better all the time, just wait and see.

 [1]: http://code.google.com/p/google-mysql-tools/
 [2]: http://mysqlha.blogspot.com/
 [3]: http://isthe.com/chongo/tech/comp/fnv/
 [4]: http://dev.mysql.com/doc/refman/5.0/en/adding-functions.html
 [5]: http://www.radwin.org/michael/blog/2007/03/mysql_user_defined_functio.html
 [6]: http://www.xaprb.com/blog/2007/03/05/an-algorithm-to-find-and-resolve-data-differences-between-mysql-tables/
 [7]: http://www.xaprb.com/blog/2007/03/18/introducing-mysql-table-sync/
 [8]: http://www.xaprb.com/blog/2007/04/05/mysql-table-sync-vs-sqlyog-job-agent/
 [9]: http://snltranscripts.jt.org/88/88adebate.phtml