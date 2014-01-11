---
title: How fast is MySQL replication?
date: "2007-10-23"
permalink: /2007/10/23/how-fast-is-mysql-replication/
---
Very fast, as it turns out.

While writing the chapter on replication for the upcoming second edition of High Performance MySQL, I decided to do a little test and measure replication speed more accurately than I've seen others do before. The first edition of the book measured replication speed by inserting on the master and polling on the slave. [Giuseppe Maxia later followed up on that by improving the polling process][1], and found events typically replicated within a half a millisecond.

Polling can only get you so far; the extra overhead caused by polling skews the measurements (even if you [poll smartly][2]). I wanted to see if I could do this without polling the slave for results. It turned out to be easier than I thought it would be.

All I had to do was write a [MySQL User-Defined Function][3] that returns the system time to microsecond precision. I'll write another post about that later; in this post I want to talk about the results.

### The setup

After writing and installing the function, I tested it. Note that it's non-deterministic, so you get different results even when you call it twice in the same query:

<pre>SELECT NOW_USEC(), NOW_USEC(); 
+----------------------------+----------------------------+ 
| NOW_USEC()                 | NOW_USEC()                 | 
+----------------------------+----------------------------+ 
| 2007-10-23 10:41:10.743917 | 2007-10-23 10:41:10.743934 | 
+----------------------------+----------------------------+ </pre>

The rest is easy. I set up two MySQL instances on the same server (because there's no way the clocks on two separate machines will be synced to the microsecond), and made one of them the master of the other. On the master,

<pre>CREATE TABLE test.lag_test( 
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   now_usec VARCHAR(26) NOT NULL 
 ); 

INSERT INTO test.lag_test(now_usec) VALUES( NOW_USEC() ); </pre>

### The results

Now all that remains is to compare the difference from the slave and the master. A Federated table is an easy way to do this. On the slave:

<pre>CREATE TABLE test.master_val ( 
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   now_usec VARCHAR(26) NOT NULL 
) ENGINE=FEDERATED 
   CONNECTION='mysql://user:pass@127.0.0.1/test/lag_test'; </pre>

A simple join and the TIMESTAMPDIFF function can now show the microseconds of lag between the time the query executed on the master and the slave:

<pre>SELECT m.id, TIMESTAMPDIFF(FRAC_SECOND, m.now_usec, s.now_usec) AS usec_lag
FROM test.lag_test as s
   INNER JOIN test.master_val AS m USING(id); 
+----+----------+ 
| id | usec_lag | 
+----+----------+ 
|  1 |      476 | 
+----+----------+ </pre>

I inserted a thousand rows into the master with a simple Perl script, with a 10-millisecond delay between rows to keep help the master and slave instances from fighting each other for CPU time. I then built a temporary table with the lag of each event, and grouped the results by lag time, to see what the most frequent lag times are:

<pre>SELECT ROUND(lag / 1000000.0, 4) * 1000 AS msec_lag, COUNT(*)
FROM lag
GROUP BY msec_lag
ORDER BY msec_lag;
+----------+----------+ 
| msec_lag | COUNT(*) | 
+----------+----------+ 
|   0.1000 |      392 | 
|   0.2000 |      468 | 
|   0.3000 |       75 | 
|   0.4000 |       32 | 
|   0.5000 |       15 | 
|   0.6000 |        9 | 
|   0.7000 |        2 | 
|   1.3000 |        2 | 
|   1.4000 |        1 | 
|   1.8000 |        1 | 
|   4.6000 |        1 | 
|   6.6000 |        1 | 
|  24.3000 |        1 | 
+----------+----------+</pre>

Not all that bad, eh? It looks to me like MySQL can replicate most small queries in *200 to 300 microseconds*(!!!). Of course, the speed is bounded by a) how long it takes to transfer the binary log event across the network and b) how fast the query executes. In this case, both are very fast, showing that MySQL doesn't add much overhead of its own to the replication process.

If anyone knows of a way to measure the delay between the event being logged in the master's binary log, and the event being logged in the slave's relay log, I'd be interested in seeing the results. I'm guessing it's practically instantaneous for small events like this, and most of the lag is in reading, parsing, and executing the SQL.

 [1]: http://datacharmer.blogspot.com/2006/04/measuring-replication-speed.html
 [2]: http://www.xaprb.com/blog/2006/05/04/how-to-make-a-program-choose-an-optimal-polling-interval/
 [3]: http://dev.mysql.com/doc/en/adding-functions.html
