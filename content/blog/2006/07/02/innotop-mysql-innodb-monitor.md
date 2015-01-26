---
title: The innotop MySQL and InnoDB monitor
date: "2006-07-02"
url: /blog/2006/07/02/innotop-mysql-innodb-monitor/
categories:
  - Databases
  - Open Source
  - Monitoring
---

MySQL and InnoDB expose lots of information about their internals, but it's hard to gather it all into one place and make sense of it.  I've written a tool to do that, and you are free to download and use it.  This article introduces innotop, a powerful text-mode MySQL and InnoDB monitoring tool.  It has lots of features, is  fast and configurable, and it's easy to use.

> Note: [VividCortex](https://vividcortex.com/) is the startup I founded in 2012. It's the easiest way to monitor what
> your servers are doing in production. VividCortex offers [MySQL performance
> monitoring](https://vividcortex.com/monitoring/mysql/) and [PostgreSQL
> performance management](https://vividcortex.com/monitoring/postgres/) among many
> other features.

Note: I'm now making it a priority to make innotop very stable and robust.  If innotop crashes, please help me fix it.  Please read this article about how to submit a bug report for innotop.  Thanks so much for helping me build a comprehensive test suite!

Why another text-mode monitoring tool?

Because the available ones aren't good enough.  I didn't want to duplicate anyone else's effort, but the other similar tools (mytop, mtop) haven't been actively maintained in years, don't work correctly with newer versions of MySQL, and frankly only offer a small fraction of the features I've built into innotop.

I said innotop has lots of features and is really flexible.  Here's just a small sampling to give an idea:


* 11 different modes to show lots of information in very useful ways
* completely configurable -- for example, you can choose which columns to see in every tabular display, in what order, what column to sort by, what direction to sort, add perl regex filters to any column, and on and on.
* offers features no other tool gives you, period.  What was the date, time, and query (plus lots of other info!) of each transaction involved in the last deadlock?  No other tool can give you that.  And that's just one of its dozens of unique features.
* it parses and displays InnoDB information, which is packed full of information.  No other tool even tries to do this.  Parsing the output of the InnoDB monitor is not for the faint of heart!
* its interactive help and configuration make it very easy to learn and highly productive to use.  What keys are mapped in the current mode?  Press '?' and find out.  What configuration variables can you change?  Press a key and find out.  Every function has context-sensitive help to keep you productive.


Perhaps its most powerful and ambitious feature is the way it presents InnoDB internals.  MySQL is sorely lacking in instrumentation and analysis compared to other major relational database systems (for example, Microsoft SQL Server), and it is just no fun searching through the output of the InnoDB monitors to glean bits of information from it.  In my opinion, this feature alone is a major step forward to looking at what MySQL is doing internally.  The information has always been there, but until now it's been hard for DBAs to use.

innotop is designed to do whatever you need it to do, and if it doesn't, you can let me know how to improve it.  I am continually using and improving this tool, in response to my own needs and those of other people using it.

How to get and install innotop

You can download innotop from this link, and read the documentation here (generated from the embedded POD, which you can also read on the command-line).  You can also press the '?' key for online, context-sensitive help once innotop is running.

Please send improvements and suggestions to me.  I have been using it for quite a while now, but I'm sure there are bugs lurking around somewhere.  In particular, if you find any InnoDB monitor output it can't parse, please send me that output so I can add it to my test suite.

Screenshots

You can find screenshots [here](http://innotop.googlecode.com/svn/html/screenshots.html).
