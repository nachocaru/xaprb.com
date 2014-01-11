---
title: What SYSDATE is it?
date: "2011-10-11"
permalink: /2011/10/11/what-sysdate-is-it/
categories:
  - SQL
---
I was looking into the history about why SYSDATE() and NOW() behave differently in MySQL, and it looks like in 4.0 and 4.1 they used to be the same. But as of MySQL 5.0, SYSDATE() was changed to emulate Oracle's behavior, that is, it returns the time as of the function execution, not as of the statement start.

There are a number of bug reports related to this: [15101][1], [12480][2], [12481][3], and [12562][4].

I am not an Oracle expert. Does NOW() return a constant result within an Oracle query, like NOW() in MySQL does? Or is there no NOW() in Oracle, and you use SYSDATE() instead? Why is Oracle's SYSDATE() functionality worth emulating? It looks to me like some people use SYSDATE() as a sort of cross-platform compatible NOW() function, but the saner behavior for me would be to have it be deterministic by default, for all the normal reasons that deterministic behavior is a Good Thing.

All of this is related to another topic I've been considering: should &#8211;sysdate-is-now be enabled in a "sane" default MySQL configuration, or is that just breaking something a lot of people rely on working the way it does? (It seems far more likely to me that it will unbreak things.)

 [1]: http://bugs.mysql.com/bug.php?id=15101
 [2]: http://bugs.mysql.com/bug.php?id=12480
 [3]: http://bugs.mysql.com/bug.php?id=12481
 [4]: http://bugs.mysql.com/bug.php?id=12562
