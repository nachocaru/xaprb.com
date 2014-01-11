---
title: 'How to coordinate distributed work with MySQL&#8217;s GET_LOCK'
author: Baron Schwartz
excerpt: "<p>This article explains how I replaced file-based methods to ensure only one running instance of a program with MySQL's <code>GET_LOCK</code> function.  The result is mutual exclusivity that works in a distributed environment, and it's dead simple to implement.</p>"
layout: post
permalink: /2006/07/26/how-to-coordinate-distributed-work-with-mysqls-get_lock/
description:
  - "Explains how to use MySQL's GET_LOCK function to  ensure mutually exclusive access to any resource in a distributed environment."
---
This article explains how I replaced file-based methods to ensure only one running instance of a program with MySQL&#8217;s `GET_LOCK` function. The result is mutual exclusivity that works in a distributed environment, and it&#8217;s dead simple to implement.

My current employer used to use a technique similar to the classic [Perl &#8216;Highlander&#8217; method][1] to ensure only one instance of a certain program would run at any given time. The method was to create a file with a certain name and then get an exclusive, non-blocking lock on the file with the `flock()` call. If another program tried to get the same lock, it would find the file already locked and exit with a message about &#8220;another running instance found.&#8221;

This type of locking can be pretty tricky to get right. There are always lots of edge cases to consider. For example, what if the same program tries to get the lock twice and blocks itself?

Trying to roll your own locking functionality is asking for trouble, unless you really know what you&#8217;re doing. It&#8217;s not enough to just create some &#8220;sentinel&#8221; that indicates &#8220;something else is running.&#8221; It must be done atomically and in a non-blocking fashion &#8212; already tough to hand-roll &#8212; and there are lots of other requirements, such as &#8220;the lock must be released if the program dies without having a chance to release it.&#8221; This is all old news to readers who&#8217;ve worked with threading or other concurrency issues in programs, of course.

The file-based solution works well on a single machine, but it doesn&#8217;t work well if you need programs on different machines to play nicely together. Using a network filesystem such as NFS doesn&#8217;t solve that problem either. It may work on certain systems, but it&#8217;s not portable.

We had this problem at my employer. We were beginning to distribute parts of the workload out to cloned servers, each of whom would do part of the work based on which machine and what time of day, and we needed to make sure they didn&#8217;t stomp on each other if they miscalculated what work they should be doing. Several options came to mind, all of them using some functionality already provided for us. For instance, we could choose a server as the arbitrator and write a daemon on it to accept network connections. Holding a socket open to that daemon would represent a lock. If the daemon already had a connection from a certain program, it would deny the connection to other programs. If the program with the lock died, the lock server&#8217;s operating system would know, the daemon would know, and it could make the socket open to another instance.

I was just about to take this approach when I stumbled upon MySQL&#8217;s [`GET_LOCK`][2] function, completely by accident. I immediately realized we could use it. The syntax is `GET_LOCK(str, timeout)`, and the behavior is to attempt for `timeout` time to get a &#8220;lock,&#8221; returning a value indicating whether it succeeded. The &#8220;lock&#8221; is exclusive, and setting `timeout` to zero makes the call non-blocking, which is perfect.

I&#8217;m putting &#8220;lock&#8221; in quotes because it&#8217;s not really a normal database lock, in the way you might be used to thinking of it. It&#8217;s not a lock on a row, or a lock on a table, or anything like that. It&#8217;s a lock on an arbitrary string value, and like `flock()`, it&#8217;s completely advisory; nothing forces a program to wait for the lock &#8212; it is up to the programs to play nicely together.

The actual SQL call is `select COALESCE(GET_LOCK('some_string_value', 0), 0)`. The call returns 1 if the lock was granted, and 0 or `NULL` otherwise (hence the `COALESCE()`). The lock is released either explicitly, or when the connection closes. There are more subtleties to the function&#8217;s behavior, but for this purpose, this is all we need to worry about (you can read the manual to learn more about the subtleties).

We did raise the question &#8220;what if the DB server is down?&#8221; but quickly answered it: every program that does anything important talks to the DB server, so it&#8217;s a moot point. Besides, if it&#8217;s down, we have bigger problems than two programs processing the same data twice.

Unfortunately, as far as I know no other database vendor has provided something similar to this incredibly handy function.

Are there other ways to implement this easily? I can&#8217;t imagine an easier way &#8212; even the `flock()` solution was harder to get right than this &#8212; but if you have other ideas, let me know. I&#8217;m especially interested in how you&#8217;d do this without a DB server.

 [1]: http://www.stonehenge.com/merlyn/WebTechniques/col54.html
 [2]: http://dev.mysql.com/doc/refman/5.0/en/miscellaneous-functions.html