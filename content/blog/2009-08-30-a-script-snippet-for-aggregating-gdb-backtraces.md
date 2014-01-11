---
title: A script snippet for aggregating GDB backtraces
author: Baron Schwartz
layout: post
permalink: /2009/08/30/a-script-snippet-for-aggregating-gdb-backtraces/
categories:
  - Maatkit
  - SQL
  - Tools
tags:
  - Domas Mituzas
  - gdb
  - lock contention
  - Maatkit
  - Mark Callaghan
  - MySQL
---
**Note: the bt-aggregate tool has been deprecated and replaced by the [pmp][1] tool, which can do all that and more.**

A short time ago in a galaxy nearby, [Domas Mituzas wrote about contention profiling with GDB stack traces][2]. Mark Callaghan found the technique useful, and contributed an awk script (in the comments) to aggregate stack traces and identify which things are blocking most threads. I've used it myself a time or five. But I've found myself wanting it to be fancier, for various reasons. So I wrote [a little utility that can aggregate and pretty-print backtraces][3]. It can handle unresolved symbols, and aggregate by only the first N lines of the stack trace. Here's an example of a mysqld instance that's really, really frozen up:

`<pre>bt-aggregate -4 samples/backtrace.txt | head -n12
2396 threads with the following stack trace:
        #0  0x00000035e7c0a4b6 in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
        #1  0x00000000005f2bd8 in open_table ()
        #2  0x00000000005f3fb4 in open_tables ()
        #3  0x00000000005f4247 in open_and_lock_tables_derived ()

4 threads with the following stack trace:
        #0  0x00000035e7c0a4b6 in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
        #1  0x0000000000780099 in os_event_wait_low ()
        #2  0x000000000077de42 in os_aio_simulated_handle ()
        #3  0x000000000074a261 in fil_aio_wait ()
</pre>`

 [1]: http://aspersa.googlecode.com/svn/html/pmp.html
 [2]: http://mituzas.lt/2009/02/15/poor-mans-contention-profiling/
 [3]: http://aspersa.googlecode.com/svn/trunk/pmp
