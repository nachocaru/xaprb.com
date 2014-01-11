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
You probably know that it's possible to set configuration variables to [log queries that don't use indexes to the slow query log][1] in MySQL. This is a good way to find tables that might need indexes.

But what if the slow query log isn't enabled and you are using (or consulting on) MySQL 5.0 or earlier, where it can't be enabled on the fly unless you're using a patched server such as [Percona's enhanced builds][2]? You can still capture these queries.

The key is knowing what it really means for a query to "not use an index." There are two conditions that trigger this &#8212; not using an index at all, or not using a "good" index. Both of these set a bit. If either bit is set, the query is captured by the filter and logged. Both of these bits also set a corresponding bit in the protocol, so the TCP response to the client actually says "here comes the result of your query, and by the way it didn't use an index." This is very useful information.

I'm sure you can see where this is going. Let's use tcpdump to capture queries, consume the output with [mk-query-digest][3], and filter out all but ones that don't use an index or use no good index:

<pre>$ sudo tcpdump -i lo port 3306 -s 65535  -x -n -q -tttt \
  | mk-query-digest --type tcpdump \
  --filter '($event->{No_index_used} eq "Yes" || $event->{No_good_index_used} eq "Yes")'</pre>

If I run a few full table scans now, and then cancel mk-query-digest, I'll get output like the following (abbreviated for clarity):

<pre>#              pct   total     min     max     avg     95%  stddev  median
# Count        100       8
# Exec time    100     5ms   511us   857us   604us   839us   106us   582us
# 100% (8)    No_index_used
select * from t\G
</pre>

You can see I ran the query 8 times and each time it reported back that it didn't use an index. This is a dead-easy way to find queries that might not have an index available!

Want to print out tables from those queries? You can do that too. Just add ` --group-by tables --report-format profile` to the command above, and instead of grouping queries together by the query text, it'll group them by the tables they mention. Then the report will contain one item per table and you'll just see a summary at the end, like so:

<pre># Rank Query ID           Response time    Calls   R/Call     Item
# ==== ================== ================ ======= ========== ====
#    1 0x                     0.0037 100.0%       8   0.000467 test.t
</pre>

Aha, looks like `test.t` is the problem table!

 [1]: http://dev.mysql.com/doc/en/server-options.html#option_mysqld_log-queries-not-using-indexes
 [2]: http://www.percona.com/mysql/
 [3]: http://www.maatkit.org/doc/mk-query-digest.html
