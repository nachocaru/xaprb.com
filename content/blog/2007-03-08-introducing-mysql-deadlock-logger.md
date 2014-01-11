---
title: Introducing MySQL Deadlock Logger
date: "2007-03-08"
permalink: /2007/03/08/introducing-mysql-deadlock-logger/
description:
  - >
    MySQL Deadlock Logger extracts and stores the latest InnoDB deadlock in a MySQL
    table for analysis.
---
<p class="download">
  <a href="http://code.google.com/p/maatkit">MySQL Deadlock Logger</a>
</p>

I'm continuing to add new tools to the [MySQL Toolkit][1]. MySQL Deadlock Logger is for extracting and storing information about the latest recorded InnoDB deadlock. It's not only easy to view the information from the command line, it's dead simple to store it back into a MySQL table for analysis. I think most users will find it handy to create a cron job to record the deadlocks automatically for later analysis.

Like the rest of the tools in the toolkit, tried to to make this tool follow the UNIX philosophy of doing one thing and doing it well. My emphasis is on command-line scriptability combined with ease of human use. To that end, I designed the default output to be easy to pipe into awk or other tools, but I also made the tool smartly look for your .my.cnf file for database connection parameters.

### How to view the latest deadlock

Because I have my database connection parameters in my .my.cnf file, I can run the deadlock logger with just the &#8211;print option and see a compact summary of the latest deadlock:

<pre>$ mysql-deadlock-logger --print
server ts thread txn_id txn_time user hostname ip db tbl idx lock_type lock_mode wait_hold victim query
localhost 2007-03-08T20:34:22 81 21309 29 baron localhost  test c GEN_CLUST_INDEX RECORD X w 1 select * from c for update
localhost 2007-03-08T20:34:22 83 21310 19 baron localhost  test a GEN_CLUST_INDEX RECORD X w 0 select * from a for update</pre>

It's easy to specify which of those bits of data you want to see, too:

<pre>$ mysql-deadlock-logger --print -C ts,user,hostname,db,tbl,idx
ts user hostname db tbl idx
2007-03-08T20:34:22 baron localhost test c GEN_CLUST_INDEX
2007-03-08T20:34:22 baron localhost test a GEN_CLUST_INDEX</pre>

If you've spent much time poring over the output of `SHOW INNODB STATUS`, you no doubt see what an improvement this is. You also might see some resemblance to [innotop][2]'s Deadlock mode. It's no coincidence, of course; I copied some of the parsing code.

### How to save the data in a table

It's easy to save the data into a table for analysis. Once you've created the table with the query included in the documentation, you just specify the &#8211;dest option, like this: `mysql-deadlock-logger --dest deadlocks`.

If it weren't reading from my .my.cnf file, I'd have to be more specific: `mysql-deadlock-logger --dest baron:password@localhost/test.deadlocks`. That's really easy to run from a cron job.

Here's what ends up in the table:

<pre>mysql&gt; select ts, user, hostname, db, tbl, idx from deadlocks;
+---------------------+-------+-----------+------+-----+-----------------+
| ts                  | user  | hostname  | db   | tbl | idx             |
+---------------------+-------+-----------+------+-----+-----------------+
| 2007-03-08 20:34:22 | baron | localhost | test | c   | GEN_CLUST_INDEX | 
| 2007-03-08 20:34:22 | baron | localhost | test | a   | GEN_CLUST_INDEX | 
+---------------------+-------+-----------+------+-----+-----------------+</pre>

I'm only including some of the columns so the output isn't too big, but you get the idea.

### Summary

MySQL Deadlock Logger does the heavy lifting of parsing relevant information from `SHOW INNODB STATUS` so you can view or save it for analysis. If you have any feedback, I'd be glad to hear it; please use the [MySQL Toolkit Forums][1] for support or bug reports.

 [1]: http://code.google.com/p/maatkit
 [2]: http://code.google.com/p/innotop
