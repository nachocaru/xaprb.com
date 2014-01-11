---
title: "Staying out of MySQL's danger zone"
author: Baron Schwartz
layout: post
permalink: /2012/09/04/staying-out-of-mysqls-danger-zone/
categories:
  - SQL
---
MySQL is a great database server. It has lots of flaws, but if you work with its strong points and try to minimize its weaknesses, it works fantastically well for a lot of use cases. Unfortunately, if you bang on its weak points, sometimes you get hit by falling bricks.

A couple of its riskiest weak points relate to unavailability of an expected resource, particularly disk space and memory. For example, Stewart Smith has blogged about the interesting results you can get if you intentionally make malloc() fail. I think many of us probably have some experience with filling up the disk and causing the server to hang, breaking replication, or crashing something.

I'm managing a couple of servers that have taught me some interesting new lessons along these lines. They use innodb\_file\_per_table, but their main (shared) tablespace is fixed-size, and not very big. The tablespace tends to fill up when there are long-running transactions and purge can't do its work. Most of the time, the error message is fairly straightforward: a query is interrupted with "table is full."

The application sometimes tends to run queries that I consider well outside of MySQL's core competencies. Many of these build summary tables from large sets of data, sometimes joining several large tables in a GROUP BY query and inserting the results into another one. These can run for seconds (OK), minutes (not great), or hours (highly undesirable, very likely to get killed by an auto-query-killer).

Such large and long-running transactions increase the chance of running out of resources, and thus hitting a bug or edge case that will crash the server. A few of the factors that can be mixed together to form a witches' brew of bad circumstances include: statement-based replication, large LOAD DATA INFILE, temporary tables, long-running SELECTs that use filesort and/or temporary table, long-running idle transactions, low disk space due to an accidental touch of binary log files that prevents them from being purged, archiving, checksumming, backups or ETL scripts that export large amounts of data with mysqldump, and being extremely I/O bound.

This morning one of the servers crashed and was unrecoverable at first. It crashed because the main tablespace filled up, but the interesting twist was that it continued to crash (assert intentionally, actually) while trying to do InnoDB recovery. The error message was unhelpful. I did some digging with GDB, looking in the source code, and because it was critical to get some reports generated ASAP, I called Percona and got help resolving it more quickly. Increasing the maximum permitted autoextend on the main tablespace let the server start and complete recovery successfully.

You can read the details in the [bug report][1] if you want, but the incident reminded me of the importance of doing lots of small transactions with MySQL and trying to avoid any type of disk-full or out-of-memory circumstances. I think it is usually better to underutilize resources and leave some headroom. Using the last gigabyte of RAM or disk space won't make the server perform much better, but leaving it unused and available can sometimes make the server much more stable and resilient when the workload varies a lot.

I'd prefer pretty much anything to a server crash. The .frm files and InnoDB's data dictionary get out of sync easily, and some of the servers I manage have a lot of orphaned cruft in their tablespaces that will probably never be sanitized unless we dump and reload. InnoDB recovery is generally very reliable, but replication is not very crash-resilient. Crashes corrupt the binary log too much for my taste. I think MySQL 5.6 will improve these problems in several ways that matter a lot for real workloads.

My experience is that it's best to avoid these weak spots in the meantime. The server might work fine, but in those danger zones, I've seen it fail often enough that I'd rather not put it to the test. Fortunately, just by avoiding some of the most hazardous circumstances, MySQL can be made very reliable and robust. I wrote a [white paper][2] on the most frequent causes of downtime in MySQL some time ago.

 [1]: http://bugs.mysql.com/?id=66683
 [2]: http://www.percona.com/about-us/mysql-white-paper/causes-of-downtime-in-production-mysql-servers
