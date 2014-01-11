---
title: Using Aspersa to capture diagnostic data
author: Baron Schwartz
layout: post
permalink: /2010/05/07/using-aspersa-to-capture-diagnostic-data/
categories:
  - Aspersa
  - SQL
  - Sys Admin
  - Tools
tags:
  - gdb
---
I frequently encounter MySQL servers with intermittent problems that don&#8217;t happen when I&#8217;m watching the server. Gathering good diagnostic data when the problem happens is a must. [Aspersa][1] includes two utilities to make this easier.

The first is called &#8216;stalk&#8217;. It would be called &#8216;watch&#8217; but that&#8217;s already a name of a standard Unix utility. It simply watches for a condition to happen and fires off the second utility.

This second utility does most of the work. It is called &#8216;collect&#8217; and by default, it gathers stats on a number of things for 30 seconds. It names these statistics according to the time it was started, and places them into a directory for analysis.

Here&#8217;s a sample of how to use the tools. In summary: get them and make them executable, then configure them; then start a screen session and run the &#8216;stalk&#8217; utility as root. Go do something else and come back later to check! A code sample follows.

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
Inside the &#8216;stalk&#8217; tool, you&#8217;ll see a few things you can configure. By default, it tries to connect to mysqld via mysqladmin and see how many threads are connected to the server. If this increases over 100 (a sample number you should almost certainly change), or if it can&#8217;t connect to mysqld, then it fires off the &#8216;collect&#8217; tool, or whatever else you configure it to execute.

The &#8216;collect&#8217; tool, by default, captures a variety of things including disk usage, cpu usage, internal status from mysqld, and even oprofile (which it saves using the standard oprofile save feature; you must use opreport to get your report later). There is also a commented-out section to run GDB if you want stack traces. This is not enabled by default because that&#8217;ll freeze mysqld briefly. Usually this is OK if mysqld is already unresponsive during the problem!

 [1]: http://code.google.com/p/aspersa