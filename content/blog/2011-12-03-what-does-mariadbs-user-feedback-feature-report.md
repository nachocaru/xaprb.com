---
title: "What does MariaDB's user feedback feature report?"
date: "2011-12-03"
permalink: /2011/12/03/what-does-mariadbs-user-feedback-feature-report/
categories:
  - MariaDB
  - SQL
---
I was curious what information MariaDB's ["phone home" user feedback plugin][1] sends. (It works on more than just MariaDB, by the way.)

It's easy enough to find out: just load the plugin, then select from the INFORMATION_SCHEMA.FEEDBACK table. This returns a lot of rows that are obviously the status counters and variables, as well as the plugins loaded in the server. A quick exclusion join will eliminate those, and the result on my laptop is this:

`<pre>select f.* from feedback as f
   left outer join global_variables as v on f.variable_name = v.variable_name
   left outer join global_status    as s on f.variable_name = s.variable_name
   left outer join plugins          as p on f.variable_name = p.plugin_name
where s.variable_name is null and v.variable_name is null and p.plugin_name is null;
+--------------------+--------------------------------------+
| VARIABLE_NAME      | VARIABLE_VALUE                       |
+--------------------+--------------------------------------+
| Cpu_count          | 2                                    |
| Mem_total          | 4186529792                           |
| Uname_sysname      | Linux                                |
| Uname_release      | 2.6.41.1-1.fc15.i686.PAE             |
| Uname_version      | #1 SMP Fri Nov 11 21:43:42 UTC 2011  |
| Uname_machine      | i686                                 |
| Uname_distribution | fedora: Fedora release 15 (Lovelock) |
+--------------------+--------------------------------------+
</pre>` 
This actually isn't all, though. If you check the output of SHOW VARIABLES you'll see an extra few rows, one of which is this:

`<pre>+---------------------+------------------------------+
| Variable_name       | Value                        |
+---------------------+------------------------------+
| feedback_server_uid | xlGYjFKJ0ivpSWAktGglpEgVTq8= |
+---------------------+------------------------------+
</pre>` 
I'll have to look into how that's calculated. It might be useful.

 [1]: http://kb.askmonty.org/en/user-feedback-plugin
