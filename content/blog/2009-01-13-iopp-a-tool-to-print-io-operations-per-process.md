---
title: 'iopp: a tool to print I/O operations per-process'
author: Baron Schwartz
layout: post
permalink: /2009/01/13/iopp-a-tool-to-print-io-operations-per-process/
categories:
  - GNU/Linux
  - PostgreSQL
  - SQL
  - Tools
tags:
  - iopp
  - Mark Wong
  - markwkm
  - MySQL
---
Mark Wong&#8217;s entry titled &#8220;[Following up a couple questions from the presentation at PSU on January 8, 2009][1]&#8221; just caught my eye:

> What is &#8216;iopp&#8217;?
> 
> It&#8217;s a custom tool to go through the Linux process table to get i/o statistics per process. It is open source and can be downloaded from:
> 
> http://git.postgresql.org/?p=~markwkm/iopp.git;a=summary

If you know me, you know I can&#8217;t pass up &#8220;I/O statistics per process.&#8221; No way. So, after a moment of browsing the code, which is short and to the point, I tried it out:

<pre>baron@kanga:~$ wget -q -O iopp.c "http://git.postgresql.org/?p=~markwkm/iopp.git;a=blob_plain;f=iopp.c;hb=HEAD"
baron@kanga:~$ gcc -o iopp iopp.c 
baron@kanga:~$ ./iopp --help
usage: iopp -h|--help
usage: iopp [-ci] [-k|-m] [delay [count]]
            -c, --command display full command line
            -h, --help display help
            -i, --idle hides idle processes
            -k, --kilobytes display data in kilobytes
            -m, --megabytes display data in megabytes
</pre>

Sweet! Next,

<pre>baron@kanga:~$ ./iopp -i -k 5
  pid    rchar    wchar    syscr    syscw      rkb      wkb     cwkb command
 4912        2        1        0        0        0        0        0 dbus-daemon
 5713        0        1        0        0        0        0        0 hald
 5717       17        0        0        0        0        0        0 hald-runner
 5932        0        2        0        0        0        0        0 NetworkManager
22101       94       28        0        0        0        0        0 Xorg
22238        4        4        0        0        0        0        0 pulseaudio
22684       29       55        1        0        0        0        0 firefox
26860        0       43        0        0        0        0        0 gnome-terminal
</pre>

It behaves just like vmstat &#8212; it loops every 5 seconds until I stop it.

So what are we looking at here? I don&#8217;t see any documentation, but I see from the source that it&#8217;s reading /proc/[PID]/io. Unfortunately that&#8217;s not documented in my proc manpage, but there&#8217;s a [patch that provides documentation][2] for the file&#8217;s contents.

According to that, we&#8217;re looking at the pid, the number of kibibytes read and written (even if they came from the cache), the number of read and write system calls, and the number of kibibytes read and written to physical medium (i.e. not just to the OS cache). Finally we have canceled write kibibytes, and the command name. I won&#8217;t repeat the documentation on the canceled write bytes &#8212; it is what it sounds like, but there&#8217;s a little bit more explanation on that patch I linked.

This tool would have been very handy to know about last week. One of my clients was seeing a lot of disk writes from a MySQL server, and it would have made it considerably easier to diagnose the problem.

There is one small bug &#8212; the -i flag causes idle processes not to be printed out, but it&#8217;s applied after bytes have been transformed into kibi/mebibytes, so any process that has zeroes after that transformation gets filtered out. So you&#8217;ll get different output from -i -k than you will from -i or from -i -m. I&#8217;ll see if I can find the author&#8217;s email address and let him know about this&#8230;

 [1]: http://pugs.postgresql.org/node/513
 [2]: http://lkml.org/lkml/2007/3/3/131