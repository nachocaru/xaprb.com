---
title: 50 things to know before migrating Oracle to MySQL
date: "2009-03-13"
permalink: /2009/03/13/50-things-to-know-before-migrating-oracle-to-mysql/
tinyurl:
  - http://tinyurl.com/oracle-to-mysql
categories:
  - Databases
---
A while back I was at a seminar on migrating database applications to MySQL. A lot of the attendees were Oracle users. Based on their questions, comments and conversations during lunch, I made the following list of things Oracle users need to know about migrating to MySQL. Most of these are "gotchas" that would be contraindications or require some thought about a workaround.

Note: *this is not meant to be MySQL-bashing.* Some of these limitations are going to be fixed in future versions of MySQL, but they generally apply to current GA version 5.1. Some things are possible to achieve by choosing one particular way to use the server, at the exclusion of other things (e.g. Cluster rules out foreign keys, spatial data types rules out transactions). I am posting this list at the request of some Oracle DBAs who asked me to produce it for them.

1.  Subqueries are poorly optimized.
2.  Complex queries are a weak point.
3.  The query executioner (aka query optimizer / planner) is less sophisticated.
4.  Performance tuning and metrics capabilities are limited.
5.  There is limited ability to audit.
6.  Security is unsophisticated, even crude. There are no groups or roles, no ability to deny a privilege (you can only grant privileges). A user who logs in with the same username and password from different network addresses may be treated as a completely separate user. There is no built-in encryption comparable to Oracle.
7.  Authentication is built-in. There is no LDAP, Active Directory, or other external authentication capability.
8.  Clustering is not what you think it is.
9.  Stored procedures and triggers are limited.
10. <del datetime="2010-07-28T17:36:15+00:00">Vertical scalability is poor.</del> No longer true; with Percona XtraDB or MySQL 5.5 (unreleased) you get excellent scalability
11. There is zero MPP support.
12. SMP is supported, but <del datetime="2010-07-28T17:36:15+00:00">MySQL doesn't scale well to more than 4 or 8 cores/CPUs</del>. No longer true; with Percona XtraDB or MySQL 5.5 (unreleased) you get excellent scalability
13. There is no fractional-second storage type for times, dates, or intervals.
14. The language used to write stored procedures, triggers, scheduled events, and stored functions is very limited.
15. There is no roll-back recovery. There is only roll-forward recovery.
16. There is no support for snapshots.
17. There is no support for database links. There is something called the Federated storage engine that acts as a relay by passing queries along to a table on a remote server, but it is crude and buggy.
18. Data integrity checking is very weak, and even basic integrity constraints cannot always be enforced.
19. There are very few optimizer hints to tune query execution plans.
20. There is only one type of join plan: nested-loop. There are no sort-merge joins or hash joins.
21. Most queries can use only a single index per table; some multi-index query plans exist in certain cases, but the cost is usually underestimated by the query optimizer, and they are often slower than a table scan.
22. There are no bitmap indexes. Each storage engine supports different types of indexes. Most engines support B-Tree indexes.
23. There are fewer and less sophisticated tools for administration.
24. There is no IDE and debugger that approaches the level of sophistication you may be accustomed to. You'll probably be writing your stored procedures in a text editor and debugging them by adding statements that insert rows into a table called debug_log.
25. Each table can have a different storage backend ("storage engine").
26. Each storage engine can have widely varying behavior, features, and properties.
27. Foreign keys are not supported in most storage engines.
28. The default storage engine is non-transactional and corrupts easily.
29. Oracle owns InnoDB, the most advanced and popular storage engine.
30. Certain types of execution plans are only supported in some storage engines. Certain types of COUNT() queries execute instantly in some storage engines and slowly in others.
31. Execution plans are not cached globally, only per-connection.
32. Full-text search is limited and only available for non-transactional storage backends. Ditto for GIS/spatial types and queries.
33. There are no resource controls. A completely unprivileged user can effortlessly run the server out of memory and crash it, or use up all CPU resources.
34. There are no integrated or add-on business intelligence, OLAP cube, etc packages.
35. There is nothing analogous to Grid Control.
36. There is nothing even remotely like RAC. If you are asking "How do I build RAC with MySQL," you are asking the wrong question.
37. There are no user-defined types or domains.
38. The number of joins per query is limited to 61.
39. MySQL supports a smaller subset of SQL syntax. There are no recursive queries, common table expressions, or windowing functions. There are a few extensions to SQL that are somewhat analogous to MERGE and similar features, but are very simplistic in comparison.
40. There are no functional columns (e.g. a column whose value is calculated as an expression).
41. You cannot create an index on an expression, you can only index columns.
42. There are no materialized views.
43. The statistics vary between storage engines and regardless of the storage engine, are limited to simple cardinality and rows-in-a-range. In other words, statistics on data distribution are limited. There is not much control over updating of statistics.
44. There is no built-in promotion or failover mechanism.
45. Replication is asynchronous and has many limitations and edge cases. For example, it is single-threaded, so a powerful slave can find it hard to replicate fast enough to keep up with a less powerful master.
46. Cluster is not what you think it is. Maybe I already said that, but it bears repeating.
47. The data dictionary (INFORMATION_SCHEMA) is limited and very slow (it can easily crash a busy server).
48. There is no online ALTER TABLE.
49. There are no sequences.
50. DDL such as ALTER TABLE or CREATE TABLE is non-transactional. It commits open transactions and cannot be rolled back or crash-recovered. Schema is stored in the filesystem independently of the storage engine.

I hope this is helpful.
