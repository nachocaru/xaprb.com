---
title: Version 1.6.0 of the innotop monitor for MySQL released
author: Baron Schwartz
excerpt: |
  <p>The 1.5.2 release of innotop contained two bugs, one very minor.  The other was a crash because of the new functionality that aggregates results across many connections.  I fixed them and released version 1.6.0, which I consider stable and ready for everyone to use.  (My version naming convention for innotop is that even-numbered minor versions are for production use; odd-numbered, such as 1.5.2, are the development branch.  That's why I release them under the innotop-devel package).</p>
  
  <p>Your comments are welcome for the 1.8 roadmap.</p>
layout: post
permalink: /2007/11/09/version-160-of-the-innotop-monitor-for-mysql-released/
description:
  - Version 1.6.0 of the innotop monitor for MySQL and InnoDB is out.
tags:
  - InnoDB
  - Innotop
  - MySQL
  - SQL
---
<p class="download">
  <a href="http://code.google.com/p/innotop/">Download innotop</a>
</p>

The 1.5.2 release of innotop contained two bugs, one very minor. The other was a crash because of the new functionality that aggregates results across many connections. I fixed them and released version 1.6.0, which I consider stable and ready for everyone to use. (My version naming convention for innotop is that even-numbered minor versions are for production use; odd-numbered, such as 1.5.2, are the development branch. That's why I release them under the innotop-devel package).

What's ahead for innotop 1.8? Here's my current road map, some of which is already done:

<pre>Features for version 1.8:

* A test suite.
* Rename the variables the InnoDB parser outputs to match what MySQL has named them.

http://dev.mysql.com/doc/refman/5.0/en/server-status-variables.html#option_mysqld_Innodb_buffer_pool_pages_data

* Support Google's patches:

http://code.google.com/p/google-mysql-tools/wiki/InnodbStatus


http://dammit.lt/2007/06/23/mysql-40-google-edition/

* Make InnoDBParser.pm smartly fill in the data it needs by looking in SHOW
  STATUS and SHOW VARIABLES and realizing if these already provide necessary
  data.
* Efficiency and speed optimizations.  Only fetch needed data from servers.
* Use SQL instead of all the extract_values stuff.
* New configuration screen with less duplicate code that plugins can add to.
* Add support for Falcon and solidDB.
* Support multiple server connections in all modes.
* Support incremental display in all modes.  Make incremental display a per-mode
  configuration setting.
* Tentative: Add a new mode for monitoring NDB clusters.
* Tentative: usability testing and if necessary, make usability enhancements.
* Tentative: Add support for pager if you want to see more than fits on screen.
* Tentative: Documentation and built-in help (get help on a key from help screen).</pre>

I wrote that roadmap a while ago. I don't get much feedback on desired features, for the most part (maybe innotop already has too many features?). These are just things I either want to do very badly, such as write a test suite, or think would be nifty or fun, such as adding a pager. Your input is welcome.
