---
title: How to find per-process I/O statistics on Linux
date: "2009-08-23"
url: /blog/2009/08/23/how-to-find-per-process-io-statistics-on-linux/
categories:
  - Databases
  - Open Source
  - Operations
---
Newer Linux kernels have per-process I/O accounting and you can use the iotop tool to find out what's performing I/O, but in many cases I'm trying to find the source of an I/O problem in an older kernel. I found sort of a hack-ish way to do that today, while trying to figure out why a system was basically unresponsive.

I found [a post on Stack Overflow][1] that showed a way you can get per process I/O statistics from the kernel even in older kernels. I adapted this to my needs, and wrote a little script.

Here's how you use it. First, get it:

<pre>wget http://aspersa.googlecode.com/svn/trunk/iodump
</pre>

Then turn on kernel messages about I/O:

<pre>echo 1 > /proc/sys/vm/block_dump
</pre>

This makes the kernel start writing messages about every I/O operation that takes place. Now all you have to do is get those messages and feed them into my script:

<pre>while true; do sleep 1; dmesg -c; done | perl iodump
</pre>

Wait a little while, then cancel the script. The results should look something like the following:

<pre>root@kanga:~# while true; do sleep 1; dmesg -c; done | perl iodump
^C# Caught SIGINT.
TASK                   PID      TOTAL       READ      WRITE      DIRTY DEVICES
firefox               4450       4538        251       4287          0 sda4, sda3
kjournald             2100        551          0        551          0 sda4
firefox              28452        185        185          0          0 sda4
kjournald              782         59          0         59          0 sda3
pdflush                 31         30          0         30          0 sda4, sda3
syslogd               2485          2          0          2          0 sda3
firefox              28414          2          2          0          0 sda4, sda3
firefox              28413          1          1          0          0 sda4
firefox              28410          1          1          0          0 sda4
firefox              28307          1          1          0          0 sda4
firefox              28451          1          1          0          0 sda4
</pre>

I deliberately generated a bunch of I/O by deleting my Firefox history and cache.

Got any better ideas, warnings, etc? Post them in the comments.

 [1]: http://stackoverflow.com/questions/249570/
