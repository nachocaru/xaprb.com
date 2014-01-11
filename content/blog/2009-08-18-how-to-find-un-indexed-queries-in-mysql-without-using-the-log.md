---
title: How to find un-indexed queries in MySQL, without using the log
author: Baron Schwartz
layout: post
permalink: /2009/08/18/how-to-find-un-indexed-queries-in-mysql-without-using-the-log/
categories:
  - Maatkit
  - SQL
tags:
  - tcpdump
---
You probably know that it&#8217;s possible to set configuration variables to [log queries that don&#8217;t use indexes to the slow query log][1] in MySQL. This is a good way to find tables that might need indexes.

But what if the slow query log isn&#8217;t enabled and you are using (or consulting on) MySQL 5.0 or earlier, where it can&#8217;t be enabled on the fly unless you&#8217;re using a patched server such as [Percona&#8217;s enhanced builds][2]? You can still capture these queries.

The key is knowing what it really means for a query to &#8220;not use an index.&#8221; There are two conditions that trigger this &#8212; not using an index at all, or not using a &#8220;good&#8221; index. Both of these set a bit. If either bit is set, the query is captured by the filter and logged. Both of these bits also set a corresponding bit in the protocol, so the TCP response to the client actually says &#8220;here comes the result of your query, and by the way it didn&#8217;t use an index.&#8221; This is very useful information.

I&#8217;m sure you can see where this is going. Let&#8217;s use tcpdump to capture queries, consume the output with [mk-query-digest][3], and filter out all but ones that don&#8217;t use an index or use no good index:

<pre>$ sudo tcpdump -i lo port 3306 -s 65535  -x -n -q -tttt \
  | mk-query-digest --type tcpdump \
  --filter '($event->{No_index_used} eq "Yes" || $event->{No_good_index_used} eq "Yes")'</pre>

If I run a few full table scans now, and then cancel mk-query-digest, I&#8217;ll get output like the following (abbreviated for clarity):

<pre>#              pct   total     min     max     avg     95%  stddev  median
# Count        100       8
# Exec time    100     5ms   511us   857us   604us   839us   106us   582us
# 100% (8)    No_index_used
select * from t\G
</pre>

You can see I ran the query 8 times and each time it reported back that it didn&#8217;t use an index. This is a dead-easy way to find queries that might not have an index available!

Want to print out tables from those queries? You can do that too. Just add ` --group-by tables --report-format profile` to the command above, and instead of grouping queries together by the query text, it&#8217;ll group them by the tables they mention. Then the report will contain one item per table and you&#8217;ll just see a summary at the end, like so:

<pre># Rank Query ID           Response time    Calls   R/Call     Item
# ==== ================== ================ ======= ========== ====
#    1 0x                     0.0037 100.0%       8   0.000467 test.t
</pre>

Aha, looks like `test.t` is the problem table!

 [1]: http://dev.mysql.com/doc/en/server-options.html#option_mysqld_log-queries-not-using-indexes
 [2]: http://www.percona.com/mysql/
 [3]: http://www.maatkit.org/doc/mk-query-digest.html