---
title: "WordPress and MySQL's strict mode"
date: "2013-03-15"
permalink: /2013/03/15/wordpress-and-mysqls-strict-mode/
categories:
  - Databases
---
I really don't like [running my database in "I Love Garbage" mode][1], so I set the following SQL_MODE:

> STRICT\_TRANS\_TABLES,ERROR\_FOR\_DIVISION\_BY\_ZERO, NO\_AUTO\_CREATE\_USER,NO\_AUTO\_VALUE\_ON\_ZERO, NO\_ENGINE\_SUBSTITUTION,NO\_ZERO\_DATE, NO\_ZERO\_IN\_DATE,ONLY\_FULL\_GROUP_BY

Guess what WordPress does with that? It doesn't install. If you set the SQL\_MODE to empty and install WordPress, then restore the SQL\_MODE, WordPress will run, but if you try to create a post you'll see an error page that says "You are not allowed to edit this post."

This problem was [reported to WordPress at least 7 years ago][2]. Lessons learned:

*   There is a huge amount of software that was built to work with MySQL 3.23&#8242;s irritating habit of inserting different data than you told it to, with nothing but a warning most people will never see.
*   That software will break in unlovely ways when you try to make MySQL behave more correctly.
*   Those who gripe about MySQL's bugs (as I sometimes do) should remember that MySQL is probably better quality than most of the software that is built to use it. This is probably a universal truth -- the Linux kernel is probably better quality than most software that runs in Linux, for example.
*   MySQL's bugs often get fixed faster than aforementioned software's bugs, too.

 [1]: http://www.xaprb.com/blog/2012/12/23/handling-mysqls-warnings-in-go-code/
 [2]: http://wordpress.org/support/topic/posts-not-saving-to-database
