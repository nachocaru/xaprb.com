---
title: MySQL Heartbeat supports PostgreSQL
author: Baron Schwartz
excerpt: |
  <p>Thanks to a patch Dane Miller submitted, MySQL Heartbeat can now be used to monitor Slony-I replication lag for PostgreSQL.  It works identically: it updates a record on the master and looks for it on the slave.  You just have to specify the database driver on the command-line:</p>
  
  <pre>mysql-heartbeat [options] --dbidriver=Pg</pre>
  
  <p>Most of the tools in the MySQL Toolkit are very MySQL-specific.  This one just happened to be an exception, and I'm happy it's useful for more than the original purpose.</p>
layout: post
permalink: /2007/11/06/mysql-heartbeat-supports-postgresql/
description:
  - MySQL Heartbeat measures Slony-I replication lag for PostgreSQL too.
tags:
  - Dane Miller
  - MySQL
  - PostgreSQL
  - replication
  - Slony
  - SQL
---
Thanks to a patch Dane Miller submitted, MySQL Heartbeat can now be used to monitor Slony-I replication lag for PostgreSQL. It works identically: it updates a record on the master and looks for it on the slave. You just have to specify the database driver on the command-line:

<pre>mysql-heartbeat [options] --dbidriver=Pg</pre>

Most of the tools in the MySQL Toolkit are very MySQL-specific. This one just happened to be an exception, and I&#8217;m happy it&#8217;s useful for more than the original purpose.