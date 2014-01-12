---
title: An alternative to the MySQL Query Analyzer
date: "2008-11-20"
permalink: /2008/11/20/an-alternative-to-the-mysql-query-analyzer/
categories:
  - Databases
  - Open Source
---
MySQL just released their new [MySQL Query Analyzer][1] (link to a trial), and recently wrote up [an interview with Mark Matthews about it][2]. If you haven't read that article, go ahead and do it. I have not used this software, but I fully believe its functionality is quite nice.

But there is at least one alternative, which has been available for a long time. That is the [Percona patch-set][3], plus analysis tools such as [mysqlsla][4] or [Maatkit's query analysis tools][5]. This is a compelling alternative, if you can live without a point-and-click interface.

Percona's patches put the metrics-gathering where it should be: in the server. That's why Percona's builds are able to measure a lot of statistics that a Proxy-based solution can't capture. This information is not possible to get outside of the server. For example, you cannot use the MySQL Query Analyzer to measure the I/O caused by a query. Externally to the server, about all you can do is time queries and measure their size. Percona's patches have no such limitations; they measure and expose an ever-richening set of meta-data about queries.

Guessing is not enough. You need to be able to measure what your queries are doing. The MySQL Query Analyzer's way to know which queries cause I/O usage is to "&#8230;graph I/O usage on the system as a whole, and when you see a spike in I/O you can see what queries were running at the time." So you're essentially reduced to lining up graphs, picking time intervals, running EXPLAIN and guessing. If you use Percona's patches, you can measure directly which queries cause I/O.

The article claims that "&#8230;With MySQL Query Analyzer we are watching from the sideline and capturing things that the MySQL server does not give you," but the irony is that since Proxy-based solutions are outside the MySQL server, they actually can't measure things the server already exposes internally. While would be possible to do so by running SHOW STATUS after each query, ask [Mark Callaghan][6] what he thinks of that idea.

If you've ever administered Microsoft SQL Server, you know what kind of insight you can get into a running server. Other databases have similar functionality. MySQL has decided not to build metrics into the server, and is now trying to build it outside the server -- an effort that's ultimately doomed to failure because the information is only available inside.

Let's see a feature comparison. I've chosen features that were promoted in the tech article linked above, plus key features I know are in the Percona patches:

| &nbsp;                                                                                   | Percona patches&nbsp;&nbsp;           | MySQL Query Analyzer                  |
| ---------------------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------- |
| Has a point-and-click interface                                                          | <input type="checkbox" />             | <input type="checkbox" checked="1" /> |
| Freely available                                                                         | <input type="checkbox" checked="1" /> | <input type="checkbox" />             |
| License                                                                                  | Free (GPL)                            | Proprietary                           |
| Integrated into the server                                                               | <input type="checkbox" checked="1" /> | <input type="checkbox" />             |
| Requires a separate server                                                               | <input type="checkbox" />             | <input type="checkbox" checked="1" /> |
| Requires an agent on monitored servers                                                   | <input type="checkbox" />             | <input type="checkbox" checked="1" /> |
| Requires MySQL proxy with extra scripts loaded                                           | <input type="checkbox" />             | <input type="checkbox" checked="1" /> |
| Relays queries through a single-threaded proxy                                           | <input type="checkbox" />             | <input type="checkbox" checked="1" /> |
| Requires changing where your application connects<sup>[<a href="#footnote1">1</a>]</sup> | <input type="checkbox" />             | <input type="checkbox" checked="1" /> |
| Captures total execution time of all queries                                             | <input type="checkbox" checked="1" /> | <input type="checkbox" checked="1" /> |
| Measures query execution time in microseconds                                            | <input type="checkbox" checked="1" /> | <input type="checkbox" checked="1" /> |
| Permits sampling of only a fraction of sessions                                          | <input type="checkbox" checked="1" /> | <input type="checkbox" />             |
| Abstracts queries into similar forms                                                     | <input type="checkbox" checked="1" /> | <input type="checkbox" checked="1" /> |
| Aggregates similar queries together                                                      | <input type="checkbox" checked="1" /> | <input type="checkbox" checked="1" /> |
| Aggregates across multiple servers                                                       | <input type="checkbox" />             | <input type="checkbox" checked="1" /> |
| Automatically generates EXPLAIN plans                                                    | <input type="checkbox" checked="1" /> | <input type="checkbox" checked="1" /> |
| Filters by query type (SELECT, UPDATE, etc)                                              | <input type="checkbox" checked="1" /> | <input type="checkbox" checked="1" /> |
| Calculates statistical metrics (min, max, 95th percentile etc)                           | <input type="checkbox" checked="1" /> | <input type="checkbox" checked="1" /> |
| Measures per-query execution time                                                        | <input type="checkbox" checked="1" /> | <input type="checkbox" checked="1" /> |
| Measures per-query execution count                                                       | <input type="checkbox" checked="1" /> | <input type="checkbox" checked="1" /> |
| Measures per-query row counts                                                            | <input type="checkbox" checked="1" /> | <input type="checkbox" checked="1" /> |
| Measures per-query update counts                                                         | <input type="checkbox" checked="1" /> | <input type="checkbox" checked="1" /> |
| Measures per-query result set sizes                                                      | <input type="checkbox" />             | <input type="checkbox" checked="1" /> |
| Measures per-query table lock waits                                                      | <input type="checkbox" checked="1" /> | <input type="checkbox" />             |
| Measures per-query InnoDB lock waits                                                     | <input type="checkbox" checked="1" /> | <input type="checkbox" />             |
| Measures per-query InnoDB read operations                                                | <input type="checkbox" checked="1" /> | <input type="checkbox" />             |
| Measures per-query InnoDB write operations                                               | <input type="checkbox" checked="1" /> | <input type="checkbox" />             |
| Measures per-query InnoDB I/O wait                                                       | <input type="checkbox" checked="1" /> | <input type="checkbox" />             |
| Measures per-query InnoDB queue waits                                                    | <input type="checkbox" checked="1" /> | <input type="checkbox" />             |
| Measures per-query InnoDB pages touched                                                  | <input type="checkbox" checked="1" /> | <input type="checkbox" />             |
| Measures per-query filesorts caused                                                      | <input type="checkbox" checked="1" /> | <input type="checkbox" />             |
| Measures per-query temp tables caused                                                    | <input type="checkbox" checked="1" /> | <input type="checkbox" />             |
| Measures per-query temp tables on disk                                                   | <input type="checkbox" checked="1" /> | <input type="checkbox" />             |
| Measures per-query table usage                                                           | <input type="checkbox" checked="1" /> | <input type="checkbox" />             |
| Measures per-query index usage                                                           | <input type="checkbox" checked="1" /> | <input type="checkbox" />             |
| Measures per-query query cache hits                                                      | <input type="checkbox" checked="1" /> | <input type="checkbox" />             |
| Measures per-query full scans                                                            | <input type="checkbox" checked="1" /> | <input type="checkbox" />             |
| Measures per-query full joins                                                            | <input type="checkbox" checked="1" /> | <input type="checkbox" />             |
| Measures per-query sort merge passes                                                     | <input type="checkbox" checked="1" /> | <input type="checkbox" />             |
| Measures queries executed by slave SQL thread<sup>[<a href="#footnote2">2</a>]</sup>     | <input type="checkbox" checked="1" /> | <input type="checkbox" />             |
| Measures slave SQL thread utilization                                                    | <input type="checkbox" checked="1" /> | <input type="checkbox" />             |
| Provides per-database stats                                                              | <input type="checkbox" checked="1" /> | <input type="checkbox" checked="1" /> |
| Provides per-table stats<sup>[<a href="#footnote3">3</a>]</sup>                          | <input type="checkbox" checked="1" /> | <input type="checkbox" />             |
| Provides per-index stats                                                                 | <input type="checkbox" checked="1" /> | <input type="checkbox" />             |
| Provides per-user stats                                                                  | <input type="checkbox" checked="1" /> | <input type="checkbox" checked="1" /> |
| Is deployed and tested in large social network sites                                     | <input type="checkbox" checked="1" /> | ?                                     |
| Is demonstrated stable by years of real-world testing                                    | <input type="checkbox" checked="1" /> | <input type="checkbox" />             |
| Requires understanding MySQL source code                                                 | <input type="checkbox" />             | <input type="checkbox" />             |

Stay tuned. More is coming.

### Footnotes

<p id="footnote1">
  [1] From the article: "You basically have to redirect your application to connect to the Proxy port."
</p>

<p id="footnote2">
  [2] The slave SQL thread's utilization is the amount of time it stays busy. This is different from measuring the queries the slave SQL thread executes. The Percona patches can do both; MySQL Query Analyzer does neither, since replication doesn't go through a proxy. Both are extremely useful in <a href="http://www.mysqlperformanceblog.com/2008/10/08/three-ways-to-know-when-a-mysql-slave-is-about-to-start-lagging/">predicting and measuring a replication slave's workload</a>.
</p>

<p id="footnote3">
  [3] Aggregating queries and then filtering by table isn't the same thing as measuring how many Handler operations are performed against the table. The Percona patches include SHOW TABLE_STATISTICS, SHOW INDEX_STATISTICS, and SHOW USER_STATISTICS, which are functionality ported from Google's patches. These let you know exactly how much work is done. This is what I call per-object statistics.
</p>

 [1]: http://www.mysql.com/trials/enterprise
 [2]: http://dev.mysql.com/tech-resources/interviews/interview_mark_matthews.html
 [3]: http://www.percona.com/percona-lab.html
 [4]: http://hackmysql.com/mysqlsla
 [5]: http://www.maatkit.org/
 [6]: http://mysqlha.blogspot.com/
