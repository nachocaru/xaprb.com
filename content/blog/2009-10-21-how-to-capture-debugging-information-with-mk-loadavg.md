---
title: How to capture debugging information with mk-loadavg
date: "2009-10-21"
permalink: /blog/2009/10/21/how-to-capture-debugging-information-with-mk-loadavg/
categories:
  - Databases
  - Open Source
  - Operations
  - Programming
---
[Maatkit's][1] [`mk-loadavg`][2] tool is a helpful way to gather information about infrequent conditions on your database server (or any other server, really). We wrote it at Percona to help with those repeated cases of things like "every two weeks, my database stops processing queries for 30 seconds, but it's not locked up and during this time there is nothing happening." That's pretty much impossible to catch in action, and these conditions can take months to resolve without the aid of good tools.

In this blog post I'll illustrate a very simple usage of `mk-loadavg` to help in solving a much smaller problem: find out what is happening on the database server during periods of CPU spikes that happen every so often.

First, set everything up.

1.  Start a screen session: `screen -S loadmonitoring`. If you don't have screen, you can run mk-loadavg as a daemon, but it's much better to use screen in my opinion.
2.  Get `mk-loadavg`. For purposes of this blog post, I'm going to get the latest trunk code, because I know a bug or two has been fixed since the last release. `wget http://www.maatkit.org/trunk/mk-loadavg`
3.  Create a directory to hold the collected information in files. `mkdir collected`

Next let's set up a script that `mk-loadavg` can use to gather some information when it detects a high CPU condition. Save the contents of this script as "collect-stats.sh". The script will gather about 30 seconds worth of statistics. It uses a simple sentinel file `/tmp/gatherinfo` to prevent multiple occurrences from gathering statistics at the same time. (This is intentionally simple for demo purposes.)

<pre>
#!/bin/bash

if [ -f /tmp/gatherinfo ]; then exit 0; fi
touch /tmp/gatherinfo
d=`date +%F-%T`
echo "gathering info for $d"
ps -eaf >> collected/$d-ps 2>&1 &
top -bn1 > collected/$d-top 2>&1 &
mysql -e 'show innodb status\G show full processlist\G' >> collected/$d-innodbstatus 2>&1 &
vmstat 1 30 >collected/$d-vmstat 2>&1 &
iostat -dx 1 30 >collected/$d-iostat 2>&1 &
mysqladmin ext -i1 -c30 > collected/$d-mysqladmin 2>&1 &
sleep 30
ps -eaf >> collected/$d-ps 2>&1 &
mysql -e 'show innodb status\G show full processlist\G' >> collected/$d-innodbstatus 2>&1 &
rm /tmp/gatherinfo
</pre>

Now make the script executable: `chmod +x collect-stats.sh`. At this point we're ready to start working. Let's fire the stats-collection script when the system's user CPU goes above 40%.<cod>

<pre>perl mk-loadavg --watch "Server:vmstat:us:>:40" --interval 1 --execute collect-stats.sh
</pre></code> 

If the CPU goes over 40%, you'll get a bunch of files in the `collected` directory, with helpful information to diagnose the problem. This example usage is pretty similar to a real-life one I set up recently. It enabled me to take a methodical approach to the problem: 
1.  From the `top` output I was able to identify that MySQL was causing the spike.
2.  I then looked at the `SHOW STATUS` output to see what the database server was doing, using [mext][3] as a helper.
3.  From `Select_full_scan` and `Handler_read_rnd_next` I isolated table scans as a problem.
4.  From the saved `SHOW PROCESSLIST` I found problem queries and optimized them.

You would be right if you said there are much better tools for finding problem queries -- but remember two things: 1) sometimes clients ask for the lightweight, short-term solution that can be set up in about 5 minutes and checked the next day; and 2) when it is unclear that queries are the problem, setting up only a query monitor is stabbing in the dark and will not get results.

In addition to watching `vmstat` to measure system CPU usage, `mk-loadavg` can watch many other things, such as the MySQL server's `SHOW PROCESSLIST`, parsing values from `SHOW INNODB STATUS`, and so on.

 [1]: http://www.maatkit.org/
 [2]: http://www.maatkit.org/doc/mk-loadavg.html
 [3]: http://www.xaprb.com/blog/2009/10/13/using-mext-to-format-saved-mysqladmin-output-nicely/
