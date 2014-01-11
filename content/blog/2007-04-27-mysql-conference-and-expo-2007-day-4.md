---
title: MySQL Conference and Expo 2007, Day 4
date: "2007-04-27"
permalink: /2007/04/27/mysql-conference-and-expo-2007-day-4/
---
[<img style="float:right; margin-left: 15px" src="http://conferences.oreillynet.com/images/mysqluc2007/banners/speakers/120x240.jpg" width="120" height="240" alt="Speaker at MySQLConf 2007" />][1] 
In my fourth day at the [MySQL Conference and Expo 2007][1], I attended several great sessions, starting with my own.

If you're wondering why this is a day late, it's because the conference ended in the late afternoon, and they almost immediately &#8212; within a half-hour or so &#8211; removed the free wireless Internet access in the hotel. That was uncool.

### Keynotes etc

I skipped the opening keynotes to polish off last-minute changes to innotop and my presentation. I was sort of interested in the keynotes, but by this time I had begun to understand that the keynotes are often as much about sponsorship as about disseminating great ideas. I didn't see Eben Moglen on the schedule again.

Here's the lunch menu:

*   Sun-dried tomato and onion salad with Balsamic reduction
*   Napa cheese board with marinated rosemary and garlic
*   Seasonal vegetables
*   Roasted vegetable salad
*   Herb buttered tomatoes
*   Scented olives and crusty bread
*   A wedge of spinach quiche Florentine
*   Garlic rubbed rosemary breast of chicken
*   Pacific salmon filet with roasted tomato sause [sic]

Lunch was served atop a premium heavy white cotton table dressing resting on a circular quadri-pedal planar table. The center dressing was a cluster of upright wheat grass nestled on a sparkling porcelain platter, garnished with&#8230;

&#8230; two small ripe-looking plastic pears.

Seriously.

### [The innotop workshop][2]

This was my own session. Pre-show entertainment was provided via the sound system by my iRiver. It was Mark Knopfler's album Shangri-La.

I stepped through a little history and an overview of [innotop][3]'s features, then went into more advanced functions, demonstrating its SQL-like ability to compile expressions into subroutines and let you easily write formulas to monitor whatever you want. I showed how to sort, filter, colorize and otherwise customize any display. There are many features I didn't get into because they're either too geeky or not fully baked yet, but I did show how to add and delete columns from tables.

In the second part of the hour I demonstrated some more advanced things you can do, such as watching InnoDB's undo log entry count to see how much work your transactions have done. If you know how many rows a transaction will affect, this is a good way to see how close to completion it is.

I had only one slight problem as I discovered a bug in the quick-filters functionality I promised to write and demo. This is what live demos are for, no?

There were quite a few people in the room, but it wasn't packed (packed would have been upwards of 100 I think; I maybe had 50 or so). But, it's quality not quantity, right? Quality is when Heikki Tuuri himself (the man who created InnoDB) attends. He taught me a few things I didn't know, too.

The best part of the session was the feedback and suggestions I got.

I also spent a few moments at the end of the talk to mention <a href="http://code.google.com/p/maatkit">MySQL Table Checksum and MySQL Table Sync</a>, which can be useful for efficiently detecting and repairing when a slave server is out of sync with its master. As far as I know I'm the only person who's written good tools for this purpose.

The new version of innotop will be in theaters near you as release 1.4.2 in a few days.

Incidentally, I got to meet Rohit Nadhani from [webyog][4], who wrote the [SQLYog Job Agent I benchmarked against MySQL Table Sync][5] recently. I saw a demo of their new monitoring tool, MONyog. It looks really impressive, but I will try it out some more and let you know. A well-known MySQL user asked in my session if there could be any chance of innotop becoming an interactive web application. The answer is no. But take a look at MONyog.

Rohit said they plan to integrate some of the data from SHOW INNODB STATUS in future releases. He looked terrified and said "oh, no!" when I told him I had to read the InnoDB source code to figure out some of the SHOW INNODB STATUS parsing. To anyone who wants to parse it &#8212; my advice is "rip off my Perl code. It's GPL and I have an enormous test suite." This will save you a huge amount of work.

On a related topic, I got a chance to ask the NitroEDB developers the license on the NitroEDB storage engine for MySQL. The answer was how much it cost, which is A Lot. "Price isn't license," I pointed out. "What about GPLing it?" The answer to that was "It's millions of lines of Modula-2. If you think you can do anything with that, we'll GPL it."

It's a shame I didn't get this remark on the record. It doesn't matter what the language is, Free is Free. Heck, I'm in the middle of a textbook on compiler design right now, so I've been reading a lot of Modula-2 lately. Give it to me in Elbonian, I don't care. Interestingly, for about $200 you can apparently get the source code from the Department of Defense up to a certain point. I'm sure that would at least enable learning about some of the indexing algorithms.

I didn't have a ready response at the time, so I cracked a joke about converting it into Perl and left for the next session.

### [What Happens After You're Scalable: Capacity Planning for LAMP][6]

This session was very good. It was by a Flickr engineer, and focused on how to plan for capacity. I would say the Big Idea here was **don't try to calculate demand, just measure and extrapolate.** Another might be **don't fall into the trap of tweaking another few percent of performance,** just take what you have as a given and make sure you can scale effortlessly.

I'm sorry I didn't take extensive notes on this one. I would say the slides are well worth reading through, though.

### [InnoDB Performance Optimization][7]

This session was presented by Heikki Tuuri and Peter Zaitsev, two pretty much undisputed experts on InnoDB. The big idea in this talk was to **learn how InnoDB really works so you can use it smartly**. Peter did most of the talking and Heikki occasionally picked up the microphone to add a comment. It was informative, but also quite entertaining.

Here are a few of the topics Peter and Heikki covered:

*   Application design is the biggest factor in InnoDB performance.
*   Use transactions, but use them smartly.
*   Don't use LOCK TABLES with InnoDB.
*   Use clustered indexes to your advantage. Understand how secondary indexes work as a consequence, and understand how clustered indexes interact with locking and isolation levels.
*   Know how updates, the hash index, and the query cache interact with InnoDB.
*   Understand automatic clustering keys and how keys might be promoted to clustered status.
*   Learn about row versions and purging, and how they interact with the READ COMMITTED isolation level.

Heikki quote of the week: when Peter said "SELECT FOR UPDATE cannot use a covering index because it must access the primary key to place locks," Heikki said "this is self-evident," which made my day.

By the way, one interesting thing I learned from Heikki is how to pronounce InnoDB. He says "in-no-db" not "eye-no-db" or "ee-no-db."

I only stayed for the first part of this session, because I wanted to catch the Data Warehousing talk running at the same time.

### [High Performance Data Warehousing with MySQL: Tricks and Tips from the Field][8]

Brian Miezejevski (it's spelled just like it sounds, if you're Polish) gave this talk. The focus was on **how to use MySQL to build very large data warehouses that you can query, backup and maintain efficiently.** Brian has a lot of experience in this area, including working with data warehouses over a dozen terabytes in size.

The main practice he espoused was **partition, partition, partition.** When you get into large data volumes, everything you do needs to be done a partition at a time; it is not practical to do *any* kind of operation on tables with hundreds of millions of rows, so you have to split them up somehow. Load, backup, archive and purge a partition at a time.

Partitioning can be done many different ways, but the primary way in production-ready versions of MySQL is to use MyISAM tables and group them together into a single table with the MERGE storage engine. Compressed MyISAM tables can help if you have free CPU; if you are CPU-bound, compressed tables are slower of course.

Another technique is simply to use many tables and access them via UNION queries or views. Of course upcoming releases have genuine partitioned tables, which will be even better.

Brian talked for a few minutes about real-time data warehousing where you need to continuously streaming data into very large tables. It is impractical to do this with MyISAM if you have to do any UPDATE or DELETE queries at all (concurrent INSERT queries can run as long as they are appending to the table). For high concurrency, you need to use InnoDB. I asked about the possibility of making all partitions MyISAM under MERGE except for the "live" partition and then creating a UNION ALL view over them. Brian said he hadn't tried it but it sounded like a good idea to him. He came back to this later and said he'd probably load by time slice in this fashion, then alter the "live" table to MyISAM and put it into the MERGE periodically.

The data warehousing Holy Grail is to use all hash joins for joining fact and dimension tables, but MySQL doesn't (yet) support hash joins. However, you can simulate it with MEMORY tables, which have HASH indexes. You have to do some tricks like keeping a disk (MyISAM) and memory table updated together, and loading the memory tables automatically on server start, but apparently this is a really good technique. Your joins then take the general form

<pre>SELECT ..
FROM (
   SELECT [MyISAM tables]
) INNER JOIN [MEMORY tables]
GROUP ...</pre>

The effect is similar to a hash join.

Brian spoke for a few minutes about NitroEDB (amazing indexing and aggregate performance) and InfoBright (extremely high compression) for data warehousing. But of MySQL's own storage engines, the preferred solution is still MyISAM.

Other topics included how to back up really large data sets and how to build aggregates with ON DUPLICATE KEY UPDATE. Brian also mentioned the critical tuning parameters for large data sets and talked about the need to monitor slow queries and certain server status values to understand when performance changes so you have some advance warning when you hit some kind of performance ceiling.

### Closing Keynote

The closing keynote was by one of the engineers who created [Yahoo! Pipes][9], which in my opinion is the beginning of the semantic Web's promise becoming reality. It's built on MySQL and Perl among other things, of course. The demo was pretty neat, but the neater thing yet is you can go do it yourself just as easily.

I had an elevator conversation with someone afterwards about a Pipes storage engine for MySQL. As cool as Pipes is, MySQL's storage engine architecture is no less cool. It just might take a little more imagination to see it.

### Next

I too have some cool things in the works, including a whole new way to ensure slave servers stay in sync. I need to recover from my sleep deficit, snuggle with my wife and dog, and then I'll get back to you.

 [1]: http://www.mysqlconf.com/
 [2]: http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/13213
 [3]: http://code.google.com/p/innotop
 [4]: http://www.webyog.com/en/
 [5]: /blog/2007/04/05/mysql-table-sync-vs-sqlyog-job-agent/
 [6]: http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/12448
 [7]: http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/10764
 [8]: http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/10857
 [9]: http://pipes.yahoo.com
