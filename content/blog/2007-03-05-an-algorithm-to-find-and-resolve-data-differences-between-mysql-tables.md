---
title: An algorithm to find and resolve data differences between MySQL tables
url: /blog/2007/03/05/an-algorithm-to-find-and-resolve-data-differences-between-mysql-tables/
date: "2007-03-05"
categories:
  - Databases
---

I've been designing an algorithm to resolve data differences between MySQL
tables, specifically so I can 'patch' a replication slave that has gotten
slightly out of sync without completely re-initializing it. I intend to create
a tool that can identify which rows are different and bring them into sync. I
would like your thoughts on this.

### Background and requirements

I see this as the next step in my recent series of posts on MySQL tools and
techniques to keep replication running reliably and smoothly. Sometimes slaves
"drift" a little bit, even when there don't seem to be any issues with
replication (this is one reason I submitted a bug report to add [checksums on
binlog events](http://bugs.mysql.com/bug.php?id=25737)).
Once a table differs on the slave, it gets more and more different from the
master, possibly causing other tables to differ too.

I need a tool that, given a table known to differ on master and slave(s), will
_efficiently_ compare the tables and resolve the differences. Finding tables
that differ is easy with [MySQL Table
Checksum](http://sourceforge.net/projects/mysqltoolkit),
but I am not sure the best way to find which rows differ.

Here are my requirements. The algorithm needs to be:

  * Designed for statement-based replication, which means no temp tables, no expensive queries that will propagate to the slave, and so forth.
  * Efficient in terms of network load and server load, both when finding and when resolving differences. No huge tables or un-indexed data, no high-impact `INSERT.. SELECT` locking, etc.
  * Efficient on the client-side where the tool is executed.
  * Must work well on "very large" tables.

Some things I assume:

  * Tables must have primary keys. Without primary keys, it's hard or a waste of time at best, and a disaster at worst.
  * It is not a good idea to do this unless the fraction of rows that differ is very small. If much of the table is different, then `mysqldump` is a better idea.

### Other tools I've found

I've found a number of tools that are either not complete or don't quite
address the need, but reading the source code has been very productive.
There's [Giuseppe Maxia's work in remote MySQL table
comparison](http://www.perlmonks.org/?node_id=381053). I
based the MySQL Table Checksum tool on some of this work. Read the comments on
that link, and you'll see some follow-up from Fabien Coelho, who wrote
[pg_comparator](http://www.coelho.net/pg_comparator/). The
documentation for this tool is an excellent read, as it goes into great detail
on the algorithm used.

There are also a few projects that don't do what I'm looking for.
[datadiff](http://www.mrjoy.com/datadiff/) does a two-way
in-server comparison of two tables with `OUTER JOIN`, a fine technique but
inherently limited to two tables on one server, and not practical for
extremely large tables.
[coldiff](http://rossbeyer.net/software/mysql_coldiff/) is
a more specialized variant of that tool. [mysqldiff](http:
//www.adamspiers.org/computing/mysqldiff/) diffs the structure of two tables,
which I mention for completeness though it is not the problem I'm trying to
solve.

### The Maxia/Coelho bottom-up algorithm

Without restating everything these smart people have written, here's a high-
level overview of the algorithm as presented by Maxia and Coelho:

  * Compute a "folding factor" based on the number of rows in the table and/or user parameters.
  * Build successive levels of checksum tables bottom-up, starting at a row-level granularity and decreasing granularity by the "folding factor" with each level, until the final table has a single row. 
    * Each row in the first table contains key column(s), a checksum of the key column(s), and a checksum of the whole row.
    * Each row in an intermediate-level summary table contains checksums for a group of rows in the next more granular level of summary data.
    * Groups are defined by taking checksums from the previous level modulo the folding factor.
  *   Beginning at the most aggregated level, walk the "tree" looking for the differences, honing in eventually to the offending rows.

The "folding factor" is really a "branching factor" for the tree of summary
tables. If the factor is 128, each level in an intermediate summary table will
contain the groupwise checksum of about 128 rows in the next most granular
level summary table.

This algorithm has many strengths. For example, it uses a logarithmic search
to find rows that differ. It makes no assumptions about key distributions; the
modulo operation on the checksum should randomize the distribution of which
rows need to be fixed. It's also very generic, which means it works pretty
much the same on all tables. There's no need to think about the "best way to
do it" on a given table.

I am concerned about a few things, though. There's a lot of data in all these
summary tables. The first summary table contains as many rows as the table to
analyze. If I were to calculate and store these rows for a table with lots of
relatively narrow rows, I might be better off just copying the whole table
from one server to the other. Also, creating these tables is not replication-
friendly; the queries that run on the master will run on the slave too. This
might not be a problem for everyone, but it would not be acceptable for my
purposes.

The second part of the algorithm, walking the "tree" of summary tables to find
rows that differ, doesn't use any indexes in the implementations I've seen.
Suppose I have a table with 128 million rows I want to analyze on two servers,
using a branching factor of 128 (the default). The first checksum table has
128 million rows; the second has 1 million, and so on. Repeated scans on these
tables will be inefficient, and given the randomization caused by the summary
checksums, will cause lots of random I/O. Indexes could be added on the
checksum modulo branching factor, but that's another column, _plus_ an index
-- this makes the table even bigger.

The checksum/modulo approach has another weakness. It defeats any
optimizations I might be able to make based on knowledge of where in the table
the rows differ. If the differences are grouped at the end of the table, for
example in an append-only table that just missed a few inserts on the slave,
the algorithm will distribute the "pointers" to these corrupt rows randomly
through the summary tables, even though the rows really live near each other.
Likewise, if my table contains client data and only one client is bad, the
same situation will happen. This is a major issue, especially in some large
tables I work with where we do things a client or account at a time. These and
other spatial and temporal locality scenarios are realistic, because lots of
real data is unevenly distributed. The checksum/modulo approach isn't optimal
for this.

Finally, the bottom-up approach doesn't allow for early optimization or
working in-memory. It builds the entire tree, then does the search. There's no
chance to "prune" the tree or try to keep a small working set. The flip side
of this is actually a strength: assuming that the whole tree needs to be
built, bottom-up is optimal. But most of my data isn't like that. If much of
the table is corrupt, I'm going to do a `mysqldump` instead, so I want to
optimize for cases where I'll be able to prune the tree.

### One solution: a top-down approach

Given that I won't even be looking at a table unless the global checksum has
already found it differs, I am considering the following top-down approach, or
some variation thereof:

  * Generate groupwise checksums for the whole table in a top-level grouping (more on that later).
  * If more than a certain fraction of the groups differ, quit. Too much of the table is different.
  * Otherwise descend depth-first into each group that has differences.

I think this algorithm, with some tuning, will address most of my concerns
above. In particular, it will allow a smart DBA to specify how the grouping
and recursion should happen. The choice of grouping is actually the most
complicated part.

I'd do this client-side, not server-side. I'd _generate_ the checksums server-
side, but then fetch them back to the client code and keep them in memory.
Given a good grouping, this shouldn't require much network traffic or memory
client-side, and will avoid locks, eliminate scratch tables, and keep the
queries from replicating.

In the best case, all other things being equal, it will require the server to
read about as many rows as the bottom-up approach, but it will exploit
locality -- a client at a time, a day at a time, and so on. This is a huge
help, in my opinion; reducing random I/O is a high priority for me.

Given all this, I think top-down is better if there are not many changes to
resolve, or if they're grouped tightly together.

Some of the weaknesses I see are complexity, a proliferation of recursion and
grouping strategies, perhaps more network traffic, and susceptibility to edge
cases. Whereas the bottom-up approach has identical best and worst cases for
different distributions of corrupt rows (assuming the number of corrupt rows
is constant), the top-down approach suffers if there's no locality to exploit.
I'm a bit worried about edge cases causing this to happen more than I think it
ought to.

Finally, and this could be either a strength or weakness, this approach lets
every level of the recursion have a different branching factor, which might be
appropriate or not -- the DBA needs to decide.

### Smart grouping and recursion

I think the hardest part is choosing appropriate ways to group and "drill
down" into the table. Here are some possible strategies:

  * Date groupings. We have a lot of data in InnoDB tables with day-first or week-first primary keys, which as you know creates a day-first or week-first clustered index. The first checksum I'd run on these tables would be grouped by day.
  * Numeric groupings. Tables whose primary key is an auto-incremented number would probably be best grouped by division, for example, `floor(id/5000)` to group about 5000 neighboring rows together at a time.
  * Character groupings. If the primary key is a character string, I might group on the first few letters of the string.
  * Drill-down. Take for example one of our tables that is primary-keyed on IDs, which are auto-incremented numbers, and client account numbers. The best way to do the table I'm thinking of is by account number, then numerically within that on ID. For the day-first table, I'd group by day, then account number, and then by ID.
  * Exploit append-only tables. If a table is append-only, then corruption is likely in the most recent data, and I might try to examine only that part of the table. If there are updates and deletes to existing rows, this approach might not work.
  * Use defaults if the DBA doesn't specify anything. If there's a multi-column primary key, recurse one column at a time. If a single-column key, look for another key whose cardinality is less, and recurse from that to the primary key instead.

I think the DBA will have to choose the best strategy on a table-by-table
basis, because I can't think of a good automatic way to do it. Even analyzing
the index structures on the table, and then trying to decide which are good
choices, is too risky to do automatically. For example, `SHOW INDEX` will show
estimated index cardinalities, but they're based on random dives into the
index tree and can be off by an order of magnitude or more.

### How to resolve the differences

Again assuming that this reconciliation is taking place between a master and
slave server, it's important to fix the rows without causing more trouble
while the fixing happens. For example, I don't want to do something that'll
propagate to another slave that's okay, and thereby mess it up, too.

Fixing the rows on the master, and letting the fixes propagate to the slave
via the normal means, might actually be a good idea. If a row doesn't exist or
is different on the slave, `REPLACE` or `INSERT .. ON DUPLICATE KEY UPDATE`
should fix the row on the slave without altering it on the master. If the row
exists on the slave but not the master, `DELETE` on the master should delete
it on the slave.

Peripheral benefits of this approach are that I don't need to set up an
account with write privileges on the slave. Also, if more than one slave has
troubles with the same rows, this should fix them all at the same time.

Issues I need to research are whether the different number of rows affected on
the slave will cause trouble, and if this can be solved with a temporary
[slave-skip-errors](http://dev.mysql.com/doc/refman/5.0/en
/replication-options.html) setting. The manual may document this, but I can't
find it.

### Next steps

I'm looking forward to your feedback, and then I plan to build a tool that'll
implement whatever algorithm emerges from that discussion. At this point,
assuming the above algorithm is as good as we can come up with together, I'm
planning to actually implement both top-down and bottom-up approaches in the
tool, so the DBA can decide what to use. The tool will, like the rest of the
scripts in the [MySQL
Toolkit](http://sourceforge.net/projects/mysqltoolkit), be
command-line friendly (there are lots of proprietary "visual tools" to compare
and sync tables, but they don't interest me -- plus, why would I ever trust
customer data to something I can't see source code for?). I also understand
that not everyone has the same narrowly-defined use case of re-syncing a
slave, so of course I'll make the tool more generic.

For my own use, ideally I'll be making sure the tool is rock-solid, then
defining rules for tables that frequently drift, and running a cron job to
automatically find which tables are different and fix them. If the [MySQL
Table
Checksum](http://sourceforge.net/projects/mysqltoolkit)
tool finds a table is out of sync and I don't have a rule for it, it'll just
notify me and not try to fix it.

### Summary

In this article I proposed some ideas for a top-down, in-client, replication-
centric way to compare a table known to differ on a master and slave, find the
rows that differ, and resolve them. I'm thinking about building a tool to
implement this algorithm, and would like your feedback on efficient ways to do
this.

