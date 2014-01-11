---
title: Using Aspersa to capture diagnostic data
date: "2010-05-07"
permalink: /2010/05/07/using-aspersa-to-capture-diagnostic-data/
categories:
  - Databases
  - Open Source
  - Operations
---
I frequently encounter MySQL servers with intermittent problems that don't happen when I'm watching the server. Gathering good diagnostic data when the problem happens is a must. [Aspersa][1] includes two utilities to make this easier.

The first is called 'stalk'. It would be called 'watch' but that's already a name of a standard Unix utility. It simply watches for a condition to happen and fires off the second utility.

This second utility does most of the work. It is called 'collect' and by default, it gathers stats on a number of things for 30 seconds. It names these statistics according to the time it was started, and places them into a directory for analysis.

Here's a sample of how to use the tools. In summary: get them and make them executable, then configure them; then start a screen session and run the 'stalk' utility as root. Go do something else and come back later to check! A code sample follows.

`<pre>
$ wget http://aspersa.googlecode.com/svn/trunk/stalk
$ wget http://aspersa.googlecode.com/svn/trunk/collect
$ chmod +x stalk collect
$ mkdir -p ~/bin
$ mv stalk collect ~/bin
$ vim ~/bin/stalk # Configure it
$ screen -S stalking.the.server
$ sudo ~/bin/stalk
</pre>
` 
Inside the 'stalk' tool, you'll see a few things you can configure. By default, it tries to connect to mysqld via mysqladmin and see how many threads are connected to the server. If this increases over 100 (a sample number you should almost certainly change), or if it can't connect to mysqld, then it fires off the 'collect' tool, or whatever else you configure it to execute.

The 'collect' tool, by default, captures a variety of things including disk usage, cpu usage, internal status from mysqld, and even oprofile (which it saves using the standard oprofile save feature; you must use opreport to get your report later). There is also a commented-out section to run GDB if you want stack traces. This is not enabled by default because that'll freeze mysqld briefly. Usually this is OK if mysqld is already unresponsive during the problem!

 [1]: http://code.google.com/p/aspersa
