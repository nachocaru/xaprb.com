---
title: MySQL Table Checksum 1.1.0 released
date: "2007-05-05"
permalink: /2007/05/05/mysql-table-checksum-110-released/
categories:
  - Databases
---
<p class="download">
  <a href="http://code.google.com/p/maatkit">Download MySQL Table Checksum</a>
</p>

MySQL Table Checksum 1.1.0 adds many improvements, but the most important is a new way to ensure slaves have the same data as their master. Instead of checksumming the slave and the master, it can now insert the checksum results directly on the master via an INSERT.. SELECT statement. This statement will replicate to the slave, where a simple query can find tables that differ from the master. This makes a consistent, lock-free checksum trivially easy.

There are also many other feature improvements and bug fixes, compatibility with MySQL 3.23.2 through 6.0-alpha, and I've finally gotten the documentation finished to my satisfaction. Plus I wrote a test suite.

### The new checksum method

While I was at last week's conference, Martin Friebe and I went to supper and he suggested doing checksums via INSERT.. SELECT to avoid all the hassles with locking, waiting for slaves to catch up, and so on. This method guarantees checksums are taken at the same point in replication on the master and slave, and requires no locking or waiting. It's a much better way to verify your slaves are in sync with the master.

The technique is implemented in two ways: with a variable accumulator (a modified version of the original checksum queries I wrote about in previous articles), and with a BIT_XOR checksum similar to the checksum queries used by [MySQL Table Sync][1]. Each method has strengths and weaknesses.

It's now practical -- nay, easy -- to run MySQL Table Checksum from a cron job, and just as easy to check whether a slave is out of sync with the master. First, you create a table to hold the checksums:

<pre>CREATE TABLE test.checksum (
     db         char(64)     NOT NULL,
     tbl        char(64)     NOT NULL,
     this_crc   char(40)     NOT NULL,
     this_cnt   int unsigned NOT NULL,
     master_crc char(40)         NULL,
     master_cnt int unsigned     NULL,
     ts         timestamp    NOT NULL,
     PRIMARY KEY (db,tbl)
  );</pre>

Then you run MySQL Table Checksum:

<pre>mysql-table-checksum --replicate=test.checksum master-hostname</pre>

When it's all done, you check the slave:

<pre>SELECT db, tbl, this_cnt-master_cnt AS cnt_diff,
     this_crc &lt;&gt; master_crc AS crc_diff
FROM checksum
WHERE master_cnt &lt;&gt; this_cnt OR master_crc &lt;&gt; this_crc;</pre>

That's it! Is that easy to throw into Nagios, or what?

 [1]: http://code.google.com/p/maatkit
