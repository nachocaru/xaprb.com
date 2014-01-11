---
title: Archive strategies for OLTP servers, Part 3
author: Baron Schwartz
excerpt: '<p>In the first two articles in this series, I discussed archiving basics, relationships and dependencies, and specific archiving techniques for online transaction processing (OLTP) database servers.  This article covers how to move the data from the OLTP source to the archive destination, what the archive destination might look like, and how to un-archive data.  If you can un-archive easily and reliably, a whole new world of possibilities opens up.</p>'
layout: post
permalink: /2007/06/15/archive-strategies-for-oltp-servers-part-3/
description:
  - 'Last in a series on OLTP archiving: how to move the data, unarchive, and notes and links related to database archiving'
tags:
  - archiving
  - Craig Mullins
  - data archiving
  - data warehousing
  - deadlocks
  - Edwin DeSouza
  - InnoDB
  - MySQL
  - mysqltoolkit
  - olap
  - oltp
  - Paul McCullagh
  - pbxt
  - scaling
  - Sheeri Critzer
  - SQL
  - transactions
---
In the first two articles in this series, I discussed archiving basics, relationships and dependencies, and specific archiving techniques for online transaction processing (OLTP) database servers. This article covers how to move the data from the OLTP source to the archive destination, what the archive destination might look like, and how to un-archive data. If you can un-archive easily and reliably, a whole new world of possibilities opens up.

For your reference, here are links to [part 2][1] and [part 1][2], and the original article on [efficient SQL queries for archiving][3], which is the basis for this whole series.

### How to move the data

At some point you have to actually take the data from the source and put it into the archive. This is a three-step process:

1.  Find archivable rows
2.  Insert them into the archive
3.  Delete them from the source

I wrote an article on [how to find archivable rows efficiently][3], so I won&#8217;t go into it more here. Inserting and deleting are usually straightforward, but there are subtleties and tricks that can lead to nifty solutions.

#### Transactions

The most important question about actually moving the data is how to do it safely, with or without transactions. Even if the source and archive are on different servers, you can do distributed transactions, either in your application logic or with a two-phase commit supported by your database product. For most purposes, I&#8217;ve found it just as reliable and more efficient to handle the transaction in your application logic.

For many of the reasons mentioned in the second article in this series, I would recommend relaxing the consistency requirements between source and archive, so you can keep the archived data out of the source&#8217;s transaction. You can do this safely by performing the operations in the order I listed above: insert, delete, commit the insert, then commit the delete. If you are archiving to a file at the same time, you can also write to the file before the insert.

Your archive might also be non-transactional. If you&#8217;re using MySQL, you should think about using a faster non-transactional engine that stores the data more compactly, such as MyISAM, for the archived data.

#### Use replication to unload the OLTP server

One of the most effective ways to archive an OLTP server without impacting it too much is to do the hard work of finding and inserting on a slave server, then performing the delete on the master and letting it flow through replication. Here&#8217;s an example from a past employer: we replicated the order table to a &#8220;transfer&#8221; database on the data warehouse server. A job on the data warehouse server looked for orders that had completed and shipped, and thus could be archived. It copied these in a transaction to the long-term storage, then deleted on the OLTP server. This delete flowed through replication back to the data warehouse, and removed the rows from the transfer database.

### The archive server

I&#8217;ve already mentioned some ways you might design the archive server, but there are a few other things I want to cover briefly. The first is what happens when you don&#8217;t use a different server at all, and just archive to adjacent tables on the OLTP server. This can be a fine way to do things. As long as the data isn&#8217;t used, it&#8217;s just taking up space on disk. However, it might make backups more difficult.

If you use a different server to hold the archived data, you should probably consider some kind of partitioning scheme. If your server doesn&#8217;t support partitioned tables natively, you might want to archive into a different table every so often, building views over all the tables to present them as a single logical table. There are some important advantages to this, especially if you eventually want to purge really old data. It is much easier to drop an entire table when it ages out than to delete rows from a huge table.

This gets into the topic of how to build a large data warehouse, so I&#8217;ll just leave it at this: if you forsee the archived data getting large, start planning for it now.

### Duplicated data

Unless you use distributed transactions or some clever way to guarantee atomicity, there&#8217;s a chance you&#8217;ll insert to your archive but fail to delete from the source. Now you have duplicate data. How will you handle this?

First, decide if you can tolerate the situation. (I told you we hadn&#8217;t seen the last of the consistency requirements!) I suggest you take it as a given, if at all possible. Design your archiving jobs so they can tolerate existing data in case they get terminated uncleanly or otherwise have errors. If they try to insert rows that exist, you should probably overwrite the existing rows with new ones, which might have changed on the OLTP server. Make sure you don&#8217;t lose data from this, one way or another.

If you are archiving summary tables, you might need to be careful. A row that&#8217;s built incrementally on the OLTP system might need to be re-aggregated, instead of replaced, if it already exists in the archive.

Duplicated data makes some queries hard to get consistent. For instance, a view that takes the union of archived and un-archived data will tell a lie if a row exists in both places. You need to factor this in when deciding how to do the archiving. Duplicates can also happen during un-archiving.

### Un-archiving

Why would you ever want to un-archive?

Here are some reasons you might benefit from being able to un-archive easily:

*   You treat all the data as equally important, but some of it as more likely to be accessed
*   You know there&#8217;s unused data but it&#8217;ll be inefficient to figure out which rows
*   You can&#8217;t get an exact answer on whether rows are archivable

Think of it this way: the ability to un-archive lowers the risk of archiving the wrong data, and allows you to archive things you might otherwise be unable to touch. It takes away or mitigates the downside.

This goes back to my analogy of archiving as flushing from a cache. You probably don&#8217;t treat databases as a multi-tier cache, and that&#8217;s a good thing. If the data isn&#8217;t where you expect, your applications would need to look elsewhere and retrieve it. Unless you write a wrapper around your database access layer that handles it automatically, this is probably infeasible.

However, you can still use the concept of retrieving missing data under certain circumstances. Does the following sound workable?

1.  Make most applications tolerate missing data and just do what they can with the data they have
2.  Identify points of entry where incoming data is a signal to un-archive something
3.  Hook an un-archiving system into the points of entry
4.  Archive freely and let un-archiving bring back anything it needs to

Here&#8217;s a concrete example from the advertising system I mentioned previously. This system archives ads eagerly; if they don&#8217;t have any traffic in a while, it moves them away. There are limited points of entry for ad-related data: traffic data, and a record of a sale that is attributed to an ad. The systems that load this incoming data can simply check whether all referenced ads exist, and if not, attempt to un-archive any missing ones. This happens as part of the routine checks for bad incoming data. This approach is fairly new for us, and might have some kinks we haven&#8217;t yet discovered, but there is virtually no downside. The data isn&#8217;t gone, it&#8217;s just elsewhere. Now we can archive data we couldn&#8217;t before, because it was too hard to get a definite &#8220;yes, this can be archived&#8221; answer. (It&#8217;s often easy to get a &#8220;no,&#8221; but hard to get a &#8220;yes.&#8221;)

Un-archiving is non-trivial. In fact, depending on your schema, you might need to be more careful about consistency requirements than you are with your archiving strategy. However, if you&#8217;re archiving correctly, un-archives should be few and far between, so you can afford a more expensive process.

In many ways, your options for un-archiving strategies might be similar to archiving strategies. In the systems I&#8217;ve worked on, we take the depth-first-search, dependencies-first, all-one-chunk approach I think is too inefficient to use for archiving.

If your archive is non-transactional, be careful to commit the insert into the OLTP system before you delete from the archive. Otherwise your delete will be permanent, but your insert might be rolled back, and the data is lost.

### You don&#8217;t have to un-archive

If you don&#8217;t want to build an un-archiving system, you can build your applications to look in the archive for data they need and can&#8217;t find in the OLTP system. If you do this seldom enough, it might work fine. One order-history system I know of does this to find orders that aren&#8217;t in the OLTP server.

### Archiving miscellany

To round out this series, here is a collection of notes and references I didn&#8217;t want to mix in along the way, but I think belong here somewhere.

First, if you&#8217;re using MySQL, I&#8217;ve written tools that can handle much of the work I&#8217;ve described here. The first is [MySQL Archiver][4], which can find and move archivable data very efficiently. It is full-featured and should handle most needs as-is, but it&#8217;s also extensible, so you can plug your own code in to handle complex archivability checks, dependency-first archiving, and so forth. Another of my tools, MySQL Find, can monitor and create historical records of table sizes, so you can get a sense of which tables are largest and/or growing the fastest (this is a one-liner that can go into your daily crontab). If you are archiving from InnoDB tables, you might want to record deadlocks with MySQL Deadlock Logger, for obvious reasons.

All these tools are part of the [MySQL Toolkit][4], which is Free Software. Another useful tool is [innotop][5], a real-time interactive MySQL and InnoDB monitor I&#8217;ve written.

A couple more notes on MySQL: the choice of storage engines makes [MySQL][6] especially attractive for single-server archiving solutions, in my opinion. It&#8217;s quite practical to run your intense OLTP workload on InnoDB tables (or another transactional storage engine, such as Paul McCullagh&#8217;s [PBXT][7]) and store the archive tables side-by-side in MyISAM or ARCHIVE tables. If you&#8217;re using MySQL 5.1, you also get partitioned tables; if you&#8217;re not that bleeding-edge, you might consider the strategy I suggested at the recent [MySQL Conference and Expo][8]: archive to a small InnoDB table for high concurrency, then regularly convert it to MyISAM and place it into a MERGE collection, with a view that unions the InnoDB and MERGE tables ([Sheeri Critzer blogged about this also][9], though I&#8217;m not sure how many people are actually doing it).

I don&#8217;t really like triggers and foreign key magic, so I relegated this suggestion to here: you can use triggers and/or foreign key constraints with `ON UPDATE` actions to help with archiving and purging. I don&#8217;t like these approaches because I think they&#8217;re hidden, dangerous code. In Microsoft SQL Server I usually used stored procedures to archive, but in MySQL these days I use MySQL Archiver (linked above).

MySQL&#8217;s Edwin DeSouza wrote me to bring my attention to some of Craig Mullins&#8217; [recent articles about archiving][10]. Craig&#8217;s insight is valuable if you&#8217;re researching archiving.

I think that&#8217;s it for the miscellany.

### Conclusion

This series has covered what I believe to be the full scope of archiving strategies, from requirements to specific techniques you can use to archive and un-archive data from your OLTP systems. As a reminder, the larger context here is to offer **scaling back** as an alternative to the usual scale-up-or-scale-out dichotomy. There are always more options than you think! Archiving can be difficult and complex, but the potential gains for some types of data can be large, especially compared to some of the more frequently-discussed scaling tactics. Like other solutions, it doesn&#8217;t work for all situations, but if you forsee a huge amount of data coming at you, you should consider archiving along with other scaling techniques.

 [1]: /blog/2007/06/14/archive-strategies-for-oltp-servers-part-2/
 [2]: /blog/2007/06/13/archive-strategies-for-oltp-servers-part-1/
 [3]: /blog/2006/05/02/how-to-write-efficient-archiving-and-purging-jobs-in-sql/
 [4]: http://code.google.com/p/maatkit/
 [5]: http://code.google.com/p/innotop/
 [6]: http://www.mysql.com/
 [7]: http://www.primebase.com/xt/
 [8]: /blog/tags/mysqluc07
 [9]: http://sheeri.net/archives/204
 [10]: http://www.dbazine.com/blogs/blog-cm/craigmullins/blogentry.2007-05-05.0882314926