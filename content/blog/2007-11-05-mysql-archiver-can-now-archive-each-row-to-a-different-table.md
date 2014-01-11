---
title: MySQL Archiver can now archive each row to a different table
author: Baron Schwartz
excerpt: '<p>One of the enhancements I added to MySQL Archiver in the recent release was listed innocently in the changelog as "Destination plugins can now rewrite the INSERT statement."  Not very exciting or informative, huh?  Keep reading.</p>'
layout: post
permalink: /2007/11/05/mysql-archiver-can-now-archive-each-row-to-a-different-table/
description:
  - MySQL Archiver can now archive each row to a different destination table.
tags:
  - archiving
  - data archiving
  - data warehousing
  - Hockey Stick Graph
  - InnoDB
  - Kettle
  - Kevin Burton
  - myisam
  - MySQL
  - olap
  - oltp
  - Plugins
  - SQL
---
One of the enhancements I added to [MySQL Archiver in the recent release][1] was listed innocently in the changelog as &#8220;Destination plugins can now rewrite the INSERT statement.&#8221; Not very exciting or informative, huh? Keep reading.

If you&#8217;ve used plugins with MySQL Archiver you know that I created a series of &#8220;hooks&#8221; where plugins can take some action: before beginning, before archiving each row, etc etc. This lets plugins do things like create new destination tables, aggregate archived rows to summary tables during archiving (great for building data warehouses, though not as sophisticated as [Kettle][2]), and so on. Well, this release added a new hook for plugins: `custom_sth`.

This lets a plugin override the prepared statement the tool will use to insert rows into the archive. By default the prepared statement just inserts into the destination table. But the `custom_sth` hook lets the plugin inspect the row that&#8217;s about to be archived and decide what to do with it. This lets it do interesting things like archive rows to different tables.

This came up because some of the tables I&#8217;m archiving to suddenly hit the bend in the [hockey-stick curve][3]. I diagnosed the problem very simply: inserts began taking most of the time during archiving. As you might know, MySQL Archiver has a statistics mode where it profiles every operation and reports the stats at the end. I&#8217;m archiving out of InnoDB into MyISAM; take a look at the stats:

<pre>Action          Count       Time        Pct
inserting      800584 12722.8245      88.35
deleting       800584  1464.1040      10.17
print_file     800584    58.3453       0.41
commit           3204    29.4391       0.20
select           1602     8.5654       0.06
other               0   116.5321       0.81</pre>

Inserting suddenly took 88% of the time spent archiving, when it had been taking a very small fraction of the time. I&#8217;d been meaning to split the archived data out by date and/or customer, and this convinced me it was time to stop procrastinating. There are columns in the archived rows for both of these dimensions in the data, so it shouldn&#8217;t be hard. So I added the custom_sth hook, wrote a 40-line plugin, and did it. Results:

<pre>Action             Count       Time        Pct
deleting           51675   525.2777      87.62
inserting          51675    49.3903       8.24
print_file         51675     4.4639       0.74
commit               208     2.1553       0.36
custom_sth         51675     1.4575       0.24
select               104     0.6714       0.11
before_insert      51675     0.1135       0.02
before_begin           1     0.0001       0.00
plugin_start           1     0.0000       0.00
after_finish           1     0.0000       0.00
other                  0    15.9868       2.67</pre>

(You can see the effect of having a plugin, because the time taken for all the hooks is listed in the stats. There was no plugin previously.)

Now inserting takes only 8% of the time required to archive. Put another way, it used to insert 63 rows per second, now it inserts 1046 rows per second. This is single-row inserts. (It is not intended to archive fast; it is intended to [archive without disturbing the OLTP processes][4]. Obviously this server can do a lot more inserts and deletes than this.)

What had happened? The MyISAM tables on the destination end had just gotten too big for their indexes to fit in memory, and the inserts had suddenly slowed dramatically. I didn&#8217;t want to give them a lot more memory, because I want the memory to be used for the InnoDB data on that machine. This is the same kind of thing, I&#8217;d guess, that [Kevin Burton just wrote about][5].

Oh yeah, while I was at it, I totally rewrote the archiver with unit-tested, test-driven, test-first, other-buzzword-compliant code. I added a lot of other improvements, too. For example, it can now archive tables that have much harder keys to optimize efficiently, such as nullable non-unique non-primary keys.

 [1]: http://www.xaprb.com/blog/2007/11/04/mysql-toolkit-version-1204-released/
 [2]: http://kettle.pentaho.org/
 [3]: http://en.wikipedia.org/wiki/Hockey_Stick_graph
 [4]: http://www.xaprb.com/blog/2006/05/02/how-to-write-efficient-archiving-and-purging-jobs-in-sql/
 [5]: http://feedblog.org/2007/11/04/mysql-and-disk-transfers-per-second/