---
title: An algorithm to find and resolve data differences between MySQL tables
permalink: /blog/2007/03/05/an-algorithm-to-find-and-resolve-data-differences-between-mysql-tables/
date: "2007-03-05"
categories:
  - Databases
---
I've been designing an algorithm to resolve data differences between MySQL tables, specifically so I can 'patch' a replication slave that has gotten slightly out of sync without completely re-initializing it. I intend to create a tool that can identify which rows are different and bring them into sync. I would like your thoughts on this.

### Background and requirements

I see this as the next step in my recent series of posts on MySQL tools and techniques to keep replication running reliably and smoothly. Sometimes slaves "drift" a little bit, even when there don't seem to be any issues with replication (this is one reason I submitted a bug report to add [checksums on binlog events][1]). Once a table differs on the slave, it gets more and more different from the master, possibly causing other tables to differ too.

I need a tool that, given a table known to differ on master and slave(s), will *efficiently* compare the tables and resolve the differences. Finding tables that differ is easy with [MySQL Table Checksum][2], but I am not sure the best way to find which rows differ.

Here are my requirements. The algorithm needs to be:

*   Designed for statement-based replication, which means no temp tables, no expensive queries that will propagate to the slave, and so forth.
*   Efficient in terms of network load and server load, both when finding and when resolving differences. No huge tables or un-indexed data, no high-impact `INSERT.. SELECT` locking, etc.
*   Efficient on the client-side where the tool is executed.
*   Must work well on "very large" tables.

Some things I assume:

*   Tables must have primary keys. Without primary keys, it's hard or a waste of time at best, and a disaster at worst.
*   It is not a good idea to do this unless the fraction of rows that differ is very small. If much of the table is different, then `mysqldump` is a better idea.

### Other tools I've found

I've found a number of tools that are either not complete or don't quite address the need, but reading the source code has been very productive. There's [Giuseppe Maxia's work in remote MySQL table comparison][3]. I based the MySQL Table Checksum tool on some of this work. Read the comments on that link, and you'll see some follow-up from Fabien Coelho, who wrote [pg_comparator][4]. The documentation for this tool is an excellent read, as it goes into great detail on the algorithm used.

There are also a few projects that don't do what I'm looking for. [datadiff][5] does a two-way in-server comparison of two tables with `OUTER JOIN`, a fine technique but inherently limited to two tables on one server, and not practical for extremely large tables. [coldiff][6] is a more specialized variant of that tool. [mysqldiff][7] diffs the structure of two tables, which I mention for completeness though it is not the problem I'm trying to solve.

### The Maxia/Coelho bottom-up algorithm

Without restating everything these smart people have written, here's a high-level overview of the algorithm as presented by Maxia and Coelho:

*   Compute a "folding factor" based on the number of rows in the table and/or user parameters.
*   Build successive levels of checksum tables bottom-up, starting at a row-level granularity and decreasing granularity by the "folding factor" with each level, until the final table has a single row. 

