---
title: "New in mk-query-digest: variance-to-mean ratio"
date: "2011-01-11"
url: /blog/2011/01/11/new-in-mk-query-digest-variance-to-mean-ratio/
categories:
  - Databases
  - Open Source
---
This isn't actually new -- it has been out for a few releases. The [mk-query-digest][1] tool from Maatkit now outputs information about each class of queries' variance-to-mean ratio. The new output goes in a couple of places, including perhaps most usefully the "profile" report. Here's an example from a real MySQL system:

<pre># Profile
# Rank Query ID           Response time    Calls R/Call Apdx V/M   Item
# ==== ================== ================ ===== ====== ==== ===== =======
#    1 0xBFCF8E3F293F6466 11256.3618 68.1% 78069 0.1442 1.00  0.21 SELECT [redacted]
#    2 0x620B8CAB2B1C76EC  2029.4730 12.3% 14415 0.1408 1.00  0.21 SELECT [redacted]
#    3 0xB90978440CC11CC7  1345.3445  8.1%  3520 0.3822 1.00  0.00 SHOW STATUS
#    4 0xCB73D6B5B031B4CF  1341.6432  8.1%  3509 0.3823 1.00  0.00 SHOW STATUS
# MISC 0xMISC               560.7556  3.4% 23930 0.0234   NS   0.0 &lt;17 ITEMS&gt;
</pre>

The variance-to-mean ratio is placed in the V/M column. It is the ratio of the query response time's variance to the mean, for that class of queries. It also appears in the detailed output for the queries in the rest of the report.

What is this useful for? It is a dimensionless number that shows how variable a query's response time is. The dimensionless number is better than a number such as the standard deviation of response time, because it places fast and slow queries on equal footing; when looking at standard deviation, you really need to compare it to typical execution time to see if there's a problem. (A fast query that varies by a tenth of a second is highly variable. A query that usually runs hours and varies only by a tenth of a second is unbelievably consistent.)

A query with a highly variable response time is interesting not only because it is providing unpredictable performance, but because it often means that the query is either a perpetrator or victim of bad interactions with other queries, and possibly that it accesses a larger working set of data than fits in the server's caches, so it makes unpredictable random disk accesses. That's a fancy way of saying that this query might have a high potential for improvement.

To see what I mean, let's look at the detailed report for one of the queries whose V/M ratio was 0.21:

<pre># Query 1: 24.28 QPS, 3.50x concurrency, ID 0xBFCF8E3F293F6466 at byte 5590079
# This item is included in the report because it matches --limit.
# Scores: Apdex = 1.00 [1.0], V/M = 0.21
# Query_time sparkline: | _^_.^_ |
# Time range: 2008-09-13 21:51:55 to 22:45:30
# Attribute    pct   total     min     max     avg     95%  stddev  median
# ============ === ======= ======= ======= ======= ======= ======= =======
# Count         63   78069
# Exec time     68  11256s    37us      1s   144ms   501ms   175ms    68ms
# Lock time     85    134s       0   650ms     2ms   176us    20ms    57us
# Rows sent      8  70.18k       0       1    0.92    0.99    0.27    0.99
# Rows examine   8  70.84k       0       3    0.93    0.99    0.28    0.99
# Query size    84  10.43M     135     141  140.13  136.99    0.10  136.99
# Query_time distribution
#   1us
#  10us  #
# 100us  ####################################################
#   1ms  ###
#  10ms  ################
# 100ms  ################################################################
#    1s  #
#  10s+
SELECT ... FROM ... WHERE (col1 = 87041469) AND (col2 = 1138714082) LIMIT 1\G
</pre>

You can see from the Query_time distribution that this query often executes in the hundreds of microseconds, but also frequently in the hundreds of milliseconds. I redacted some details to protect client data, but this query is a primary-key lookup on an extremely large table. I'll hazard a guess here: when the data is in memory, it runs in hundreds of microseconds; and when it has to hid the disk, it takes tens to hundreds of milliseconds.

More of the math and theory behind this useful metric of query response time variability is available from [Robyn Sands' article via Method R corporation][2]. Thanks to Cary Millsap, who directed my attention to the V/M ratio in the first place.

 [1]: http://www.maatkit.org/doc/mk-query-digest.html
 [2]: http://method-r.com/downloads/doc_details/39-an-industrial-engineers-approach-to-managing-oracle-databases-robyn-sands
