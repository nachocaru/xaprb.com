---
title: A tip when upgrading mysql-cacti-templates
date: "2009-10-15"
permalink: /2009/10/15/a-tip-when-upgrading-mysql-cacti-templates/
categories:
  - Databases
---
A client recently asked me to fix some Cacti graphs that had broken after upgrading [the Cacti templates I wrote for MySQL][1]. The symptoms were weird; I'm not sure I understand fully what happened, but some of the graphs were OK and some had only part of the data they were supposed to. Some graphs would have one data element as usual, and others would be nan (not a number).

After turning on the debug logs, I found that the script was returning the data correctly -- it was not a script problem. But after Cacti got the data from the script, it wasn't associating it correctly with the RRD archives. Here's a log message:

<pre>10/14/2009 12:05:05 PM - CMDPHP: Poller[0] Host[11] DS[1270] CMD: /usr/bin/php -q
  /opt/cacti/scripts/ss_get_mysql_stats.php --host dbserver
  --items bj,bm --user --pass , output: bj:68 bm:64
10/14/2009 12:05:05 PM - CMDPHP: Poller[0] DEVEL: SQL Exec: "insert into poller_output
  (local_data_id, rrd_name, time, output) values
  (1270, '', '2009-10-14 12:05:03', 'bj:68 bm:64')"</pre>

The suspicious thing here is that the rrd_name is blank in the INSERT statement. That shows me that Cacti is having trouble with something. A little more digging in the log, and I found

<pre>10/14/2009 12:05:06 PM - POLLER: Poller[0] CACTI2RRD: /usr/bin/rrdtool update
  /opt/cacti/rra/dbserver_thread_cache_size_1270.rrd
  --template Threads_created 1255547103:68</pre>

Here we see that Cacti is only updating the Threads\_created item in the RRD file. It should be updating a couple of them. Indeed the graphs showed nan for thread\_cache_size, as expected from this command.

Next I found this SQL statement (all by searching for 1270 in the log, by the way):

<pre>select
     data_template_rrd.data_source_name,
     data_input_fields.data_name
     from (data_template_rrd,data_input_fields)
     where data_template_rrd.data_input_field_id=data_input_fields.id
     and data_template_rrd.local_data_id=1270</pre>

I executed this and found a result like this:

<pre>mysql> select
    ->      data_template_rrd.data_source_name,
    ->      data_input_fields.data_name
    ->      from (data_template_rrd,data_input_fields)
    ->      where data_template_rrd.data_input_field_id=data_input_fields.id
    ->      and data_template_rrd.local_data_id=1270;
+-------------------+--------------------------+
| data_source_name  | data_name                |
+-------------------+--------------------------+
| thread_cache_size | thread_cache_size        | 
| Threads_created   | bj                       | 
+-------------------+--------------------------+
</pre>

That's not right -- the data\_name for thread\_cache_size should be "bm". This is a "compression" tactic I employed a while ago to limit the size of the returned data, because Cacti has a silly buffer size limit that was truncating and discarding data from the script. So this server's Cacti install seemed to have been upgraded from an older version of the templates, and not all of the data sources were updated correctly.

The fix for this was to write a couple of custom scripts to find such occurrences in the log and update the database to have the correct two-letter data_name.

 [1]: http://code.google.com/p/mysql-cacti-templates
