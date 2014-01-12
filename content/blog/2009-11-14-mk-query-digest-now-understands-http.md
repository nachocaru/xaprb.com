---
title: mk-query-digest now understands HTTP
date: "2009-11-14"
permalink: /2009/11/14/mk-query-digest-now-understands-http/
categories:
  - Databases
  - Open Source
---
You used to use [mk-query-digest][1] to aggregate and report on MySQL's slow query log. Then it got the ability to grab query events from polling SHOW PROCESSLIST. Next we thought, really, how hard can it be to implement the libmysql wire protocol, so we can sniff TCP packets? &#8230; it's hard, but not that hard as it turns out. But why stop there, why not implement memcached protocol too? I think you can see where this is headed.

So now mk-query-digest is a tool that can understand and "do stuff with" a variety of query/response types of information. The latest is HTTP. HTTP traffic is just a query-response flow of events, perfectly suitable for response-time analysis. Example:

<pre>baron@kanga:~$ mk-query-digest sample-http.txt --type http
# 1.6s user time, 100ms system time, 14.20M rss, 17.07M vsz
# Overall: 56 total, 30 unique, 1.27 QPS, 0.06x concurrency ______________
#                    total     min     max     avg     95%  stddev  median
# Exec time             3s   746us   563ms    49ms   293ms   110ms     3ms
# Time range        2009-11-14 07:04:50.997506 to 2009-11-14 07:05:34.969818
# bytes                  0       0       0       0       0       0       0
# Transmit             10s       0      1s   176ms   777ms   301ms    28us

# Query 1: 0.28 QPS, 0.02x concurrency, ID 0x198704D47EE1BF0C at byte 103987
#              pct   total     min     max     avg     95%  stddev  median
# Count         21      12
# Exec time     24   670ms     3ms   563ms    56ms    13ms   150ms    12ms
# Hosts                 12 12.38.8.23... (1), 121.44.246... (1)... 10 more
# Time range 2009-11-14 07:04:51.763526 to 2009-11-14 07:05:34.969818
# bytes          0       0       0       0       0       0       0       0
# Status co              1     200
# Transmit      62      6s       0      1s   514ms   900ms   376ms   580ms
# Virtual h              1 www.mysqlperformanceblog.com
# Query_time distribution
#   1us
#  10us
# 100us
#   1ms  ####################################
#  10ms  ################################################################
# 100ms  #########
#    1s
#  10s+
get www.mysqlperformanceblog.com/feed/\G

... snip a bunch of output ...

# Rank Query ID           Response time    Calls R/Call   Item
# ==== ================== ================ ===== ======== ================
#    1 0x198704D47EE1BF0C     0.6700 25.5%    12   0.0558 GET www.mysqlperformanceblog.com/feed/
#    2 0x2CBDA396697F8145     0.3408 13.0%     1   0.3408 GET www.mysqlperformanceblog.com/
#    3 0x2E18EB8C0CD9AED9     0.3100 11.8%     1   0.3100 GET www.mysqlperformanceblog.com/page/2/
#    4 0x4686B61E6556B753     0.3042 11.6%     1   0.3042 GET www.mysqlperformanceblog.com/
#    5 0x247CABBCB1B76C01     0.2705 10.3%     1   0.2705 GET www.mysqlperformanceblog.com/page/28/
#    6 0x8C239A43A9C80FD2     0.2373  9.0%     1   0.2373 GET www.mysqlperformanceblog.com/
#    7 0x4D4095C546E65CD4     0.1959  7.5%     1   0.1959 GET www.mysqlperformanceblog.com/2008/11/26/
#    8 0x49CC22FAC68CD475     0.1906  7.3%     1   0.1906 GET /favicon.ico
</pre> 
This is suitable for lots of things. We're trying to look at the most useful protocols, because the variety of inputs is really unlimited; we could implement almost anything that fits into the notion of query and response. For example, the [memcached protocol is becoming something of a lingua franca][2] for a lot of different systems, so there's a big value-add. HTTP has been used a long time as a transport layer for REST, SOAP, and so on (CouchDB anyone?). Valid, and interesting, suggestions are Sphinx, PostgreSQL, and Gearman. (Please [offer to sponsor][3] any that you want to see.)

Back to HTTP: implementing it gives an easy way to measure website response time, including useful things like 95th percentile goodness. And from there, you can drill down into the performance of the work done for these requests. If you want to get really fancy, you can even capture some samples of netstat at the same time as you tcpdump traffic for HTTP, memcached, and MySQL -- so you can blame database queries and memcached requests on specific HTTP requests!

 [1]: http://www.maatkit.org/
 [2]: http://blog.northscale.com/northscale-blog/2009/09/power-in-the-protocol.html
 [3]: http://groups.google.com/group/maatkit-discuss
