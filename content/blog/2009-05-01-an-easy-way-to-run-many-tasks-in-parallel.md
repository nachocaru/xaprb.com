---
title: An easy way to run many tasks in parallel
permalink: /2009/05/01/an-easy-way-to-run-many-tasks-in-parallel/
categories:
  - GNU/Linux
  - Sys Admin
  - Tools
tags:
  - Domas Mituzas
  - parallelization
  - xargs
---
[Domas Mituzas][1] mentioned this recently. It's so cool I just have to write about it. Here's an easy command to fork off a bunch of jobs in parallel: xargs.

<pre>seq 10 20 | xargs -n 1 -P 5 sleep</pre>

This will send a sequence of numbers to xargs, which will divide it into chunks of one argument at a time and fork off 5 parallel processes to execute each. You can see it in action:

<pre>$ ps -eaf | grep sleep
baron     5830  5482  0 11:12 pts/2    00:00:00 xargs -n 1 -P 5 sleep
baron     5831  5830  0 11:12 pts/2    00:00:00 sleep 10
baron     5832  5830  0 11:12 pts/2    00:00:00 sleep 11
baron     5833  5830  0 11:12 pts/2    00:00:00 sleep 12
baron     5834  5830  0 11:12 pts/2    00:00:00 sleep 13
baron     5835  5830  0 11:12 pts/2    00:00:00 sleep 14
</pre>

There are basically unlimited uses for this!

 [1]: http://dammit.lt/
