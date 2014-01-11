---
title: How to measure MySQL slave lag accurately
date: "2007-09-30"
permalink: /2007/09/30/how-to-measure-mysql-slave-lag-accurately/
---
[Kevin Burton][1] wrote recently about [why `SHOW SLAVE STATUS` is really not a good way to monitor how far behind your slave servers are][2], and how [slave network timeouts can mess up the slave lag][3]. I'd like to chime in and say this is exactly why I thought [Jeremy Cole][4]'s [MySQL Heartbeat][5] script was such a natural fit for the MySQL Toolkit. It measures slave lag in a "show me the money" way: it looks for the *effects* of up-to-date replication, rather than asking the slave how far behind it thinks it is.

The slave doesn't even need to be running. In fact, the tool doesn't use `SHOW SLAVE STATUS` at all. This has lots of advantages: for example, it tells you how far the slave lags behind the *ultimate* master, no matter how deep in the replication daisy-chain it is. In other words, unlike `SHOW SLAVE STATUS`, it won't tell you a slave is up-to-date just because it's caught up to its master. If a slave's master is an hour behind, it will report that the slave is an hour behind, too &#8212; *because it is*.

It's a really smart approach. And you can daemonize it, and it'll keep a file up-to-date with running averages (by default it averages the last one, five and fifteen minutes, but of course you can choose that). Now your monitoring scripts can be as simple as "cat /var/log/slave-delay" or some such.

It's not a hard tool to write, and I suspect lots of people have done it, but I bet that between Jeremy, whoever worked on it at Six Apart, and me, we've produced a pretty good version of the tool. It's part of the [MySQL Toolkit][5], and [the full manual is online][6].

 [1]: http://feedblog.org/
 [2]: http://feedblog.org/2007/09/29/where-does-mysql-lie-about-seconds_behind_master/
 [3]: http://feedblog.org/2007/09/25/default-mysql-slave-network-timeouts-considered-harmful/
 [4]: http://jcole.us/
 [5]: http://code.google.com/p/maatkit/
 [6]: http://code.google.com/p/maatkit/doc/mysql-heartbeat.html
