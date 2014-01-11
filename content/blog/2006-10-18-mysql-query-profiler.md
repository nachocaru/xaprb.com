---
title: MySQL Query Profiler
date: "2006-10-18"
permalink: /2006/10/18/mysql-query-profiler/
categories:
  - Databases
---
<p class="download">
  <a href="http://www.maatkit.org/">Download MySQL Query Profiler</a>
</p>

This is the fourth in a series of articles on profiling MySQL. My past three articles have explained how to measure the work a query causes MySQL to do. In this article I introduce a tool I've written to do the work for you and produce a compact, readable report of that work, with all the math already done, and the measurements labelled and grouped for ease of comprehension. With this tool you can understand query performance at a glance.

I'm very happy about this tool. Finally, I can run a query and get the kind of measurements I was used to on Microsoft SQL Server. Though the MySQL server isn't as complex as SQL Server and doesn't always let you see as much internal information, at least with this tool I can easily use the information I do have.

### Introduction

I demonstrated techniques to measure and understand MySQL query performance in my three most recent articles:

*   [How to profile a query in MySQL][1]
*   [A case study in profiling queries in MySQL][2]
*   [MySQL profiling case study, part 2][3]

If you've read those articles, this article will make sense to you. If not, it might help to go read them now.

For the last several months I've been working on a tool to automate the work I showed you in those articles. Done by hand, it's a tedious job, and I'd just as soon take execution time as the best indicator of a query's performance. But with a tool to do it automatically, it's easy to measure much more data.

MySQL Query Profiler is just such a tool. It's written in Perl and has minimal dependencies (in fact, it has minimal code, too). It reads queries from a file you give it, executes each one, and measures the results. Then it formats it nicely one of two ways: as human-readable reports with logical grouping and labels, or as tab-separated values to be fed to a spreadsheet, `awk` or other processing tools.

There are lots of options to control the output. You can get a summary view of the entire batch, view each query's statistics separately, view only some queries separately, and ask for more or less verbose output. You can turn on and off certain behaviors, such as disabling the query cache or flushing tables.

### Other profiling tools

Dmitri Mikhailov posted a tool on MySQL Forge to watch queries as they fly by on the wire: [A Poor Man's Query Profiler][4]. This is a different meaning of the word "profile." This tool analyzes which queries are run on the server. My tool measures the performance characteristics of a query or batch of queries. Both are important needs.

[Jeremy Cole][5] of [Proven Scaling][6] recently announced a [`SHOW PROFILE` patch to the MySQL source][7] that will allow detailed profiling of query execution. This is a wonderful addition to MySQL's instrumentation. I don't know when this will be part of standard MySQL distributions.

I know of no other tools to provide this functionality. If you do, please post a comment.

### Acknowledgements

I was heavily inspired by [mysqlreport][8], a great tool for understanding MySQL status at a glance. If I hadn't seen mysqlreport, I doubt I'd have known how to present query profiling data comprehensibly. Plus, I might not have learned about Perl formats, which are really nifty. Thanks.

### Conclusion

This brings to a close my series on profiling queries in MySQL. I hope you've found it useful, and I hope my profiling tool is helpful to you. Please let me know how I can improve it for you, or if there's anything else I can do.

If this was useful to you, you should consider [subscribing to my articles via feeds or e-mail][9].

 [1]: /blog/2006/10/12/how-to-profile-a-query-in-mysql/
 [2]: /blog/2006/10/15/a-case-study-in-profiling-queries-in-mysql/
 [3]: /blog/2006/10/17/mysql-profiling-case-study-part-2/
 [4]: http://forge.mysql.com/snippets/view.php?id=15
 [5]: http://jcole.us/
 [6]: http://www.provenscaling.com/
 [7]: http://lists.mysql.com/internals/33768
 [8]: http://hackmysql.com/mysqlreport/
 [9]: /blog/subscribe/
