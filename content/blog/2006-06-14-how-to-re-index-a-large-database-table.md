---
title: How to re-index a large database table
date: "2006-06-14"
permalink: /blog/2006/06/14/how-to-re-index-a-large-database-table/
---
In recent articles I explained how I've [optimized queries against large datasets][1] at my current employer, and how I've written [efficient archiving and purging jobs][2] to trim the tables down to a manageable size. This article explains how I re-indexed some of those tables without taking the server offline.

The technique I used is suitable for when a table has gotten "too fat to exercise." In other words, the table is in critical condition, but that very condition makes it hard to do *anything* with the table, much less re-index or re-arrange the data. Before trying any of the techniques I outline in this article, I suggest a thorough analysis of data and index size, typical queries, row format and length, and how much data needs to be in the table (e.g. can it be nibbled down to a manageable size with an [archiving job][2]?).

While this specific situation involved MySQL, the techniques I'll discuss below apply equally to any RDBMS.

### The situation

We have a series of tables holding traffic data for online advertisements. Some of them hold the raw data from the source. These are then merged into one cost-by-day table, which is rolled up into various kinds of aggregation -- ad by week, client by day, and so forth.

Though the archiving jobs were nibbling the data steadily, and some of the tables had even reached their target maintenance size, there was still too much data, and it wasn't indexed optimally. One of the most important tables was still an order of magnitude too big, and archiving it was slow work. Some of the queries were taking too long and causing frequent timeouts and deadlocks, and a beefy server with high-speed disks was hamstrung by repeated multi-gigabyte table scans. Up to 85% of CPU time was spent waiting for disk reads and writes.

This is an illustration of [when not to use surrogate keys on InnoDB tables][3]. The tables were originally designed with surrogate keys as their primary key, which meant they weren't clustered on the most frequently queried criteria: date ranges. Since the rollups and queries almost always happened by date, clustering them date-first meant any given query would be restricted to just part of the table. But they were clustered on the surrogate key -- totally useless for the intended purpose. In fact, the surrogate keys were never referenced in any queries except the archiving jobs. As a result, most queries had to scan the entire table.

Some of the tables had indexes on the important columns -- usually date and ad ID -- but in a few of the largest, most important tables, the indexes were not date-first, so they weren't helpful, as I verified with `EXPLAIN`. Massive multi-gigabyte indexes weren't even being used in any queries. They were just slowing down anything that updated, inserted or deleted (and making our backups enormous and slow, always another cause of anxiety).

We had also just signed a new client, one of the Internet's largest advertisers. A huge pile of new data was getting ready to body-slam us. We feared there was no way we could take on that additional load; the rollups alone might bring us down.

We needed those tables re-indexed, and soon. We were prepared to take the servers offline and put everything on hold for days while we re-indexed them, if it came to that. We didn't want to, but we worked on a strategy just in case.

### The offline re-indexing strategy

I've mentioned before that every secondary index in InnoDB tables holds values from the clustered index (primary key) at its leaf nodes. This has profound implications for any attempt to change the clustered index, because changing the clustered index requires re-writing every secondary index. We definitely wanted to re-cluster our tables, date-first. But doing it in one fell swoop would be a terrible idea! Re-writing just *one* large index is bad enough. Re-writing all of them in one single succeed-or-fail operation, plus physically re-arranging every row in the table along the new clustered index? Forget it! It might take weeks per table, even if nothing else were touching the database.

And it wasn't just the clustered index that needed to change; many of the other indexes needed to be changed or removed, and we needed new indexes too.

The only strategy that we thought could work on such large tables would be to

1.  Stop everything from accessing the database
2.  Drop every secondary index, one at a time
3.  Drop the primary key
4.  Drop the unwanted columns
5.  Create a new primary key
6.  Create new secondary indexes, one at a time

Based on my tests with some smaller tables, I estimated this process would take days on some of the tables. It could take much longer; I don't know how the work scales relative to the size of the table. The best I could hope for is linear scaling, and it might be exponential, in which case we'd be in bad trouble. To give an idea, dropping a single index would probably take at least three hours on some of the tables.

This could not be done while the server was online, because all sorts of things might go wrong -- way too risky. There was one table this strategy wouldn't work for, anyway: a table that had no unique constraint on the columns we needed to cluster (every other table was OK). Not only did we need to re-index this table, we needed to aggregate it by the data that would be its new primary key.

This still looked pretty gloomy, but we were prepared to do it if necessary. Before we went to such extremes, I wanted to try one strategy I thought might let us do all this without taking the server offline, much more cheaply.

### The constraints

Here are the ground rules again: If we re-indexed *without* taking the server offline, we had to ensure that

1.  The server didn't get slammed with huge queries
2.  There were no long-running transactions or locks

By "huge" and "long-running" I mean on the order of hours. Those are simple constraints, but it's not obvious how to work within them.

### The don't-go-offline strategy

My idea hinged on three things: the data access patterns, the cost of dropping a table, and the ability to lock and rename tables.

The first thing that gave me hope we could do this online is the way data is updated. Since this is historical data, we usually work a day at a time, adding new data only, then rolling up. Only in exceptional circumstances do we reach into the past and update things. Therefore, most of the data never changes, and didn't need to be locked to ensure its integrity (a simple "don't roll up tables!" email took care of the human side of things).

Second, it's easy to drop tables -- even large ones -- because we keep a fixed-size tablespace, so it doesn't require a lot of disk activity.

Finally, it's inexpensive to lock tables, and they can be renamed while they're locked (though that does drop the locks).

For each table that needed to be re-indexed, my idea was to

1.  Create a new table with the desired structure *and indexes*
2.  Insert the old data into the new table in small chunks, except for the most recent few days
3.  Lock both tables
4.  Insert the last few days into the new table
5.  Swap the tables out by renaming them
6.  Check for data integrity
7.  Drop the old table

I didn't create the new tables without indexes and then add the indexes later. As I've said before, this hits the server way too hard. It's much better to do the work gradually as the data is inserted (in fact, I did miss an index on one of the tables, and it took a *very long time* to add it after the fact).

I tried this with some of the smaller tables, and it seemed to go well. To insert the data from the old table into the new "in small chunks," I wrote the "nibbler" archiving job in a shell script. Instead of doing it one row at a time, I did one day's worth of data at a time. I ran it early in the morning before anyone else was on the system, and each day's worth of data seemed to take from a few seconds to a few minutes, depending on which table. That was an encouraging sign. Here's what the shell script looked like:

<pre>#!/bin/bash

for day in `seq 90 -1 2`;
do
   echo "loading $day";
   cmd="insert into new_table (cols) select cols from old_table where day = date_sub(current_date, interval $day day)";
   if [ -f /home/xaprb/oktorun ]; then
      time echo $cmd | mysql;
   fi
done</pre>

I used a file as an "OK" signal for the script. If I decided to stop in the middle of the process, all I had to do was remove the file and the script would loop through the remaining days without actually sending the query to the server. I did do this once or twice when an automated job started.

Apparently inserting data at the end of the table is fairly cheap, because the inserts took practically the same time as querying without inserting. Then all I had to do was connect with the command-line client, lock the tables, insert the remaining days manually, and rename the tables. It was easy to check the integrity of the new table against the old and delete it when I was convinced it was all OK.

### The results

I was surprised at how quickly it went. Some of the larger tables took many hours to "nibble" into the new structure, but that was OK. We wanted to keep 90 days of data for the day-level tables, and they were nibbled down to that size, so it was easy to just check in on the script every little bit, then finish them when the script quit. All in all, I think I spent a week and a half analyzing queries, choosing table structures and indexes for the new tables, and moving the data to the new tables. Much of this time I worked on other things as well.

The real tests were yet to come, however. Did the re-indexing save space? Are queries faster? Is there less contention? Are timeouts and deadlocks avoided? I had a pretty good idea these would all be "yes," but my calculations (and I did do calculations!) could have been grievously wrong. As it turned out, though, they were right. Rollups that used to run for hours before deadlocking literally take three to ten minutes now (I re-wrote optimized queries for them, which helps too). Common queries finish in seconds or minutes instead of half a day; I was just told a 4-hour query runs in 48 seconds now. When the server is heavily used, it actually pegs the CPU, not the disk! `SHOW TABLE STATUS` shows tables are much smaller (sometimes 1/4th the space for the same data!), and the indexes are much smaller, too. In some cases I was able to trim table size by a factor of 20 or more with the combination of nibbling and re-indexing.

This strategy helped in another key area. One table wasn't fully archived, and it was one of the most frequently queried and updated, so the archiving job often got the short end of the stick. We had 24 million rows to go. I wanted to wait as long as possible on this one and see how far it would get, but in the end I needed to go ahead and build the new table with the most recent 90 days of data, and leave the old table in place so we can keep archiving from it until the archive table has everything the new table doesn't have. One benefit of this decision is that the old table is no longer accessed, so the archiving is going much faster now. At some point, the new table and the archive table will together constitute the entire data set, the archiving job will end, and I'll drop the old table. In the meantime this data is spread out over three tables, but that's OK; we'll eventually get that data where it needs to be.

Most importantly, our database is under control, and we can just do routine maintenance from now on. There are still some large tables to purge and/or archive and re-index, but they aren't the core tables the business depends on. Our new client isn't going to crush the database server.

 [1]: /blog/2006/04/30/how-to-optimize-subqueries-and-joins-in-mysql/
 [2]: /blog/2006/05/02/how-to-write-efficient-archiving-and-purging-jobs-in-sql/
 [3]: /blog/2006/05/10/when-to-avoid-and-when-to-use-surrogate-keys-in-innodb-tables/

 *[RDBMS]: Relational Database Management System
 *[CPU]: Central Processing Unit
