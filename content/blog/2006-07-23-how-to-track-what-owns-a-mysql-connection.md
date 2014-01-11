---
title: How to track what owns a MySQL connection
author: Baron Schwartz
excerpt: "<p>MySQL doesn't yet provide good tools for some troubleshooting tasks.  Fortunately, there is some low-hanging fruit you can pluck.  One example is a tool to record who owns a MySQL database connection, so long-running transactions can be traced back to the source.  This article demonstrates an easy way to solve that problem.</p>"
layout: post
permalink: /2006/07/23/how-to-track-what-owns-a-mysql-connection/
description:
  - >
    Explains how to find the name and UNIX process ID of the program that owns a
    MySQL connection, given a connection ID.
---
MySQL doesn&#8217;t yet provide good tools for some troubleshooting tasks. Fortunately, there is some low-hanging fruit you can pluck. One example is a tool to record who owns a MySQL database connection, so long-running transactions can be traced back to the source. This article demonstrates an easy way to solve that problem.

### Introduction

One of the reasons I wrote the [`innotop` InnoDB and MySQL monitor][1] was to monitor long-running transactions. Sure enough, I began to see some transactions being held open for tens of thousands of seconds (ouch!), sometimes with open locks and undo log entries. From MySQL itself I can find the connection ID, transaction number, username and hostname of the offender, but not what program opened the connection. Since our software mostly uses a single login to access the database, even the username and hostname didn&#8217;t help. It could be one of dozens of systems.

### How I solved it

Everything has the same username because all our software connects through one database abstraction layer, which creates a single point of access. I changed it to identify the caller to the database. This is fast and painless, and provides a reverse lookup.

Here&#8217;s the trick: create a table like this,

<pre>create table connection_info (
   connection_id int not null,
   unix_proc_id int not null,
   prog_name varchar(50) not null,
   ts timestamp not null,
   primary key(connection_id),
   key(unix_proc_id)
) engine = MyISAM;</pre>

This is obviously designed for UNIX systems. Our client software is written in Perl, so any program that connects can be recorded simply by changing the DB access layer to issue the following query right after connecting:

<pre>replace into connection_info
   (connection_id, unix_proc_id, prog_name, ts)
   select connection_id(), $PID, '$PROGRAM_NAME', current_timestamp</pre>

`$PID` and `$PROGRAM_NAME` are Perl variables for the current process&#8217;s ID and the name of the program currently executing. Every programming language and operating system I know has some way to get this information.

The query is fast, so there&#8217;s very little added overhead when making a connection, especially given that our systems tend to connect and hold the connection open for a long time while doing a lot of work. The initial extra cost becomes vanishingly small.

### Results

After I made this change, we were able to start looking up who held an open transaction for a long time. The culprit turned out to be processes owned by an Apache web server, which were running instances of `mod_perl` that didn&#8217;t really get unloaded after the HTTP request was serviced. The real trouble was poor coding practice, of course; explicitly closing the database connection is the solution.

Although this system works well for us, I&#8217;m curious if there are better ways to do it. What do you think? Leave a comment!

 [1]: /innotop/