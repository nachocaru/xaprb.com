---
title: A summary of changes in MySQL 5.6
date: "2012-08-21"
permalink: /blog/2012/08/21/a-summary-of-changes-in-mysql-5-6/
categories:
  - Databases
---
I decided to take another look at MySQL 5.6, and realized that I've forgotten how many changes this version will have. Each milestone has many improvements, and there have been many milestones, so my memory of the older ones grows hazy. 
The [Fine Manual][1] has the details, but here is my attempt at a quick (and probably incomplete and inaccurate) summary. I've emphasized a few changes that will make life significantly better for me. 

*   InnoDB: supports fulltext search; **more kinds of ALTER TABLE avoid copying/rebuilding the table**, some without blocking the table at all (truly online ALTER TABLE); more flexibility with data files; improvements to compression; improvements to flushing to avoid checkpointing stalls; ability to access InnoDB tables through the memcached protocol instead of SQL; more INFORMATION_SCHEMA tables; persistent optimizer statistics that can be stored in tables, viewed and manipulated; performance optimizations for readonly transactions; ability to put the undo log into its own file instead of the main tablespace; bigger redo logs; limits on data dictionary size when there are many tables; a lot of work on mutex contention problems; many changes to internal housekeeping threads; faster deadlock detection algorithm; automatic save/restore of buffer pool state for faster warmup;  tables can be exported and imported between servers without dump/load.
*   Partitioning: you can promote a partition into a table and vice-versa; you can limit queries to touch only desired partitions.
*   **Performance Schema: many helpful new tables** including statement digests; much lower performance penalty; more configurable both at runtime and in the my.cnf file.
*   Replication: RBR can use a more compact format; binary logs are crash-safe; **binary logging supports group commit**, for much faster performance in the configuration most people use when they care about their data; binlog events have CRC32 checksums to prevent corruption; master- and slave- position are stored in tables as well as files; replication position can now be transactional if that table is InnoDB, so replication is more resilient; mysqlbinlog can connect to a server and stream an exact copy of its binlogs, so you can have realtime binlog backups without needing to use a slave; you can delay replication (no more pt-slave-delay); **replication slaves are multi-threaded **so that transactions are replayed in per-database threads.
*   Optimizer: SELECT..ORDER BY..LIMIT uses a memory buffer instead of a temp table + filesort when there is no index; **queries can use a couple of strategies kind of like a sort-merge operation to reduce random IO**; WHERE clauses can be pushed into the storage engine and avoid reading a ton of data and then discarding it; the "leftmost prefix rule" for indexes is lifted, so "loose index scan" is possible; EXPLAIN works for all kinds of statements, not just SELECT; "derived table" subqueries aren't materialized into temp tables unless needed, and EXPLAIN doesn't create and fill them, and **the optimizer adds indexes to help optimize JOINs against them**; IN(SELECT&#8230;) subqueries are executed inside-out, so they aren't a table scan anymore; there is an optimizer trace so you can get a super-detailed EXPLAIN.
*   Stored procedures: Better error inspection and handling.
*   Data types: microsecond precision for time types; more flexible DEFAULT instead of the automatic "timestamp" behavior (it works for datetime now too), YEAR(2) data type is deprecated.
*   Host cache: it's now exposed as a table, and there are more metrics for inspecting it.
*   Removed features: some logging options; some old variable names; some old MyISAM features like INSERT DELAYED.
*   Table cache: the table cache is partitioned for improved performance.
*   Security: more convenient ways to keep passwords safe when using client programs; stronger password hashing; password expiration; ability to check passwords for security/policies
*   Misc: a bunch of new status counters.
*   Many more changes I've overlooked or didn't mention.

Bug reports already contain references to MySQL version 5.7, so I assume that 5.6 is at least in partial feature freeze. I think the current state of the server might be reasonably close to what will be released as GA, but that is pure speculation. 

MySQL 5.6 will make life much easier for me and the users I support. It is very common for my users to write queries with several "derived table" subqueries that are joined together, for example. These currently result in cross joins, and I have to contact users and ask them to rewrite their query into several steps with indexed temporary tables. I am looking forward to the database server taking care of more of these types of issues for me. 

At the same time, I share some recent concerns about how easy it is to inspect and understand the changes to the server, especially with regard to bugs and security flaws. Reading source code changesets and bug reports is sometimes the only way to truly understand what the server does, and deep understanding is perhaps the shortest path to trust and confidence.

[1]: http://dev.mysql.com/doc/refman/5.6/en/
