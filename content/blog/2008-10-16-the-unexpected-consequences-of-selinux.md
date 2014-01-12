---
title: The unexpected consequences of SELinux
date: "2008-10-16"
permalink: /2008/10/16/the-unexpected-consequences-of-selinux/
categories:
  - Databases
  - Operations
---
I've been working with a client recently who has [SELinux][1] on his servers.Â  It has been quite a struggle sometimes.

My colleages tell me that SELinux has a pretty noticeable performance impact.Â  I am not sure if we have benchmarks to support this; at any rate, the client said it's OK, we'll take the performance hit.

There have been a few problems (Nagios can't run because it can't write to its own pid file, etc etc).Â  Last night there was something new: "too many connections" when trying to connect to MySQL.Â  As a result the site was down, and it wasn't possible to log in to MySQL and see why. But the oddest thing happened: mysqld would not shut down.Â  It was sitting basically idle, doing absolutely nothing, and wouldn't stop. There was nothing in any log files to show what might be going on.

<!--more-->

So I tried some standard tricks of the trade to see what it was doing, starting with strace. No go.Â  It wouldn't show me anything. What about gdb?

No, there was an error about something failing, do I want to continue, yes I do, but then I don't get any information when I ask for stack traces or anything else.

Finally I resorted to [kill-dash-nine][2].Â  Then I was able to restart, log in quickly before the server bogged down, and watch the processlist grow full of unauthenticated connections. Ah hah! It's a networking problem.Â  [The old skip-name-resolve problem][3] reared its ugly head. It was an easy fix.

And why couldn't I get any information about this?Â  Why did I have to kill the server?Â  Well&#8230; here's the messages from /var/log/messages:

<pre>SELinux is preventing strace (mysqld_t) "signal" to &lt;Unknown&gt; (unconfined_t).
SELinux is preventing gdb (mysqld_t) "signal" to &lt;Unknown&gt; (unconfined_t).</pre>

Sigh. I'm root on this machine, but I can't do anything with mysqld &#8212; not because I'm restricted, but because mysqld is restricted.

 [1]: http://www.nsa.gov/selinux/
 [2]: http://www.youtube.com/watch?v=Fow7iUaKrq4
 [3]: http://www.mysqlperformanceblog.com/2008/05/31/dns-achilles-heel-mysql-installation/
