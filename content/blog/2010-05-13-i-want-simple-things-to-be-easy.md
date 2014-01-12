---
title: I want simple things to be easy
date: "2010-05-13"
permalink: /2010/05/13/i-want-simple-things-to-be-easy/
categories:
  - Databases
---
I like to write tools that make hard things easy, when possible. By and large, MySQL is easy and simple. But some simple things are too hard with MySQL. I want to change that, at least for the things that matter the most to me, and which I think I know how to fix.

I will probably write a lot about this. I have already written a number of <del datetime="2010-05-13T13:10:55+00:00">rants</del> blog posts about the lack of instrumentation in MySQL, and that is where I'll probably continue to put most of my energy.

To begin with, imagine this simple scenario. You are a remote DBA. Your client says "New Relic is showing periods of slow response time from the database." You connect to MySQL at the command line and try to troubleshoot. How do you catch the problem in action, from within the database itself? The following are no good:

*   It doesn't count to see the problem two minutes later by observing the application tier, as New Relic does. That's too late, and it's not from within the database.
*   It's also not good enough to catch just after the slow queries finish executing, which you can get from the slow query log if you have a realtime log analyzer running; that is a) also after the fact, and b) again not possible from within the database itself.
*   Watching TCP traffic or using a proxy is similarly off limits.

This is a database, a complex piece of software -- comparable to an operating system in some respects. It should be possible to know that response time is spiking *while the slow queries are executing slowly, before they even finish and return their results to the application*. This is a simple question that should be easy to answer.

It's not currently possible inside MySQL, because MySQL doesn't tell you how much time queries spend executing. It's that simple. Fortunately the fix is equally simple: measure how long queries spend executing.

We can look at the lowly iostat (or /proc/diskstats in Linux) for an example of how this is possible to solve. We need a counter that shows the sum of execution time, including currently executing queries. I saw that the [Facebook patch][1] adds counters similar to this. Search for "Query timing" on that page. I want something slightly more complex, [the way Linux's IO counters work, because they add memory][2]. Simple is really beautiful; a counter that has memory is an amazing thing, and you can apply Little's Law to derive a surprising amount of information from it.

I might change my opinion about some of the more complex things that are being added to MySQL; much smarter people have, and I'm probably a hold-out because I'm not that smart. But I still see the need for simple combinations of counters and timers for essential metrics, which do not need complex queries or tools to use. I have a few more things on my wishlist, which I'll write about later.

 [1]: http://www.facebook.com/note.php?note_id=390420710932
 [2]: http://www.xaprb.com/blog/2010/01/09/how-linux-iostat-computes-its-results/
