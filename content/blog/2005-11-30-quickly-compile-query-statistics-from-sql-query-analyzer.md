---
title: How to analyze statistics from SQL Query Analyzer
date: "2005-11-30"
permalink: /2005/11/30/quickly-compile-query-statistics-from-sql-query-analyzer/
categories:
  - Databases
---
Microsoft SQL Query Analyzer prints out statistics as text, and it can be tough to wade through it all. Here is an `awk` script for quickly analyzing those statistics.

### Analyzing the stats

First, remember you can use SQL Server Profiler to measure your query's performance. Profiler is a very powerful tool, and everyone writing queries should be familiar with it.

For one-off queries, though, it may be faster to simply turn on the desired statistics and run the query, then grab the output and analyze it directly. Here is one quick way to analyze the output caused by `set statistics io on` and `set statistics time on`: use `awk`!

Here is a simple `awk` program. Save it to a file named `sql-stats.awk`:

<pre>/CPU time/ {
    cpu += $4
    elapsed += $9
}
/Scan count/ {
    scans += substr($5, 1, index($5, ",") - 1)
    reads += substr($8, 1, index($8, ",") - 1)
    physi += substr($11, 1, index($11, ",") - 1)
    ahead += substr($14, 1, index($14, ".") - 1)
}
END {
    printf("Scans:            %7d\n", scans);
    printf("Logical reads:    %7d\n", reads);
    printf("Physical reads:   %7d\n", physi);
    printf("Read-ahead reads: %7d\n", ahead);
    printf("CPU time:         %7d ms\n", cpu);
    printf("Elapsed time:     %7d ms\n", elapsed);
}</pre>

Now follow these steps to sum the statistics for easy consumption:

*   get [awk][1], if you don't have it
*   turn on the desired statistics
*   execute your query
*   switch from the results tab to the messages tab, and copy the messages to the clipboard
*   paste the messages into a text file called `stats.txt`
*   execute `awk` against the file as follows:

<pre>C:> awk -f sql-stats.awk stats.txt</pre>

The results should look something like this:

<pre>Scans:               1110
Logical reads:     531208
Physical reads:       187
Read-ahead reads:  131895
CPU time:          146922 ms
Elapsed time:      200718 ms</pre>

### Watch out for query caches!

Remember, for unbiased results, you need to initialize your caches to a known state before comparing queries:

<pre>dbcc freeproccache
dbcc dropcleanbuffers</pre>

Please share if you have other ideas. You could get as fancy as you want with awk, but this solves my common need.

 [1]: http://cm.bell-labs.com/cm/cs/who/bwk/awk95.exe
