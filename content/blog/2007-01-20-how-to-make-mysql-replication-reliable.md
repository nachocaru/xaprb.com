---
title: How to make MySQL replication reliable
author: Baron Schwartz
excerpt: "<p>MySQL statement-based replication is widely discussed, but I haven't seen much about how to design a replication setup for low downtime and easy administration.  Statement-based replication has inherent shortcomings experienced MySQL users know to avoid, but rarely write about.  This article explains how to avoid problems, help your slaves stay in sync with the master, and recover from disasters more quickly.</p>"
layout: post
permalink: /2007/01/20/how-to-make-mysql-replication-reliable/
description:
  - >
    Explains how to design systems so replication will run smoothly and disaster
    recovery will be as easy as possible.
---
MySQL statement-based replication is widely discussed, but I haven&#8217;t seen much about how to design a replication setup for low downtime and easy administration. Statement-based replication has inherent shortcomings experienced MySQL users know to avoid, but rarely write about. This article explains how to avoid problems, help your slaves stay in sync with the master, and recover from disasters more quickly.

By the way, I&#8217;m fairly new to MySQL replication. Less than two months ago I was asking many of you for advice. I&#8217;ve had to come up to speed on it pretty quickly. So, if I miss something or get something wrong, please leave comments and help me out.

### Context

This article is specifically about mitigating risks in MySQL statement-based replication setups (statement-based replication is the only type of replication available before version 5.1, currently in beta). Once you decide to clone a server from another server, you have automatically added risks: your master will crash, your slave will get out of sync, your slave will crash, you will come to rely on the slave(s) and downtime will become unacceptable, and so forth. My goal is to tell you how to make these problems less likely, and how to make it easier and faster to recover when the inevitable happens.

I assume that you&#8217;re running something important on your MySQL installation, so high availability and data integrity are important, if not mandatory. And I assume you have a non-trivial amount of data, say 25GB or more. If this doesn&#8217;t describe your installation, you can be much more casual about the risks of replication, because recovery from problems is either not important or much easier.

I will try *not* to cover topics about which more knowledgeable people have written: the [MySQL manual section on replication][1], [Giuseppe Maxia&#8217;s article on advanced replication techniques][2], [how to scale out with application partitioning][3], etc.

### 1. Design with snapshots in mind

In my opinion, probably the most important cornerstone of low-downtime, fault-tolerant replication is the ability to *take consistent snapshots quickly*. You need snapshots for two reasons: initializing slaves and taking backups. You can take a snapshot of your master to initialize a slave or take a backup, and a snapshot of your slave to initialize another slave or make a backup. Both types of snapshots are important for different reasons.

For initializing slaves, I strongly prefer binary snapshots of the files as they exist on disk, with the MySQL instance shut down. Binary snapshots are usually larger, and can thus be slower to take than just using `mysqldump`, but there are other advantages to binary snapshots. For example, they&#8217;re generally faster to restore; you just copy the files into place and start the server &#8212; no need to reload dumps and wait hours for indexes to rebuild. I&#8217;ll explain more reasons I prefer binary snapshots in the following sections.

#### 1.1 Snapshots on the master

Taking a snapshot of the master is necessary to initialize at least the first slave you clone. If you are very lucky, you&#8217;ll be able to stop the master for as long as you need to dump all the data or copy the files to the slave. I don&#8217;t know anyone who has that luxury.

Your snapshots for initializing slaves have to be point-in-time atomic, or you won&#8217;t be assured the slave is an exact copy of the master. If you&#8217;re snapshotting for a backup, that might be less important, but I personally would strive for atomicity in backups too. You can potentially take snapshots with the server running by locking all the tables, flushing tables to disk, etc etc. This might be quite disruptive, but one way or another you have to stop all modifications to the data long enough to get the snapshot.

My favorite technique is using a filesystem with snapshot capability, such as LVM under GNU/Linux. This lets you take a *read-only snapshot nearly instantaneously*, then take as much time as you need to copy it somewhere, while the MySQL server runs normally. If you want to know more about this, read about [using LVM for backup and replication][4], and take a look at [mylvmbackup][5] for a script that can help you take backups from an LVM snapshot.

One thing I would add to these articles: I never try to take snapshots while MySQL is running in the installations I help manage. Our requirements are such that it is okay for the server to be down for a few seconds, and there&#8217;s not much overhead in restarting it (I know this isn&#8217;t always the case for everyone). This gives us the peace of mind of knowing the snapshot is totally consistent, with no risks of InnoDB background threads modifying things, for example. If you can&#8217;t shut down MySQL, it is a delicate dance, but there&#8217;s good advice in the article I just linked above.

#### 1.2 Snapshots on the slave

The second place you can take snapshots is on a slave. This is the main way my employer avoids snapshots on the master, which we don&#8217;t like to do. Slaves are much less critical for us &#8212; we run reporting and read-only queries from them, so it&#8217;s not a big deal to stop MySQL on a slave whenever we need a backup or to initialize another slave.

Cloning slaves from other slaves is easy: you just run `STOP SLAVE`, record the master binlog and log position, shut down the slave, take the filesystem snapshot, then bring the slave up again. This can happen very quickly. Then you copy the snapshot to the new slave and bring the new slave up, point it at the same binlog and position as the first slave (that is, the position where the snapshot was taken), and start the new slave. After it catches up, it should be an exact copy of the master.

However, there are extra things to think about when taking a snapshot on a slave. First, you need to make sure you get *everything you need*. You need the data files of course, and if you&#8217;re running InnoDB, you need the log files too, but you also need the temporary files if you use `LOAD DATA INFILE`. There&#8217;s a configuration parameter that tells slaves where to store these temporary files, which are inlined in the binlog and then written out to the filesystem on the slave. If your new slave doesn&#8217;t get these temporary files, replication may break on `LOAD DATA INFILE`. If you&#8217;re using a filesystem snapshot, that means your temp files need to be stored on a snapshot-ready filesystem just like the data and log files.

The other thing you have to worry about on a slave is temporary tables. If you need to stop your slave to get a consistent snapshot, you can&#8217;t do it while there are slave temporary tables open. This is an important topic that I&#8217;ll discuss in more detail later.

#### 1.3 Beware of relying only on filesystem snapshots

If your data files get corrupted, you may not know it until some query tries to read the bad data. Taking regular text backups with `mysqldump` as well is a very good idea.

On the other hand, if you rely solely on text backups, you could also get corruption &#8212; the files might be fine on disk, but your server might have memory corruption (these things happen). If your data is important, I think it&#8217;s best to be redundant.

### 2. How to keep the slave in sync

Okay, so you&#8217;ve designed your systems so it&#8217;s very easy to take snapshots. Now you are ready to take nearly instantaneous backups and initialize new slaves quickly and easily. Once your slaves are running, though, you have to worry about keeping them in sync with the master.

There are several things to think about here, too. One is simply making sure the slaves can keep up with the master. You also have to make sure nobody makes any changes to the slave&#8217;s data and schemas. And finally, you have to avoid problems inherent to MySQL replication that can cause the slave to have different data than the master.

#### 2.1 Make sure the slaves are keeping up

Making sure the slave can keep up with the master is not always easy. Slave hardware typically needs to be at least as powerful as the master, because the slave has to execute all the same DML statements as the master. But slaves have an additional handicap: they can&#8217;t do these operations in parallel. If you have even a slightly busy master, it probably runs lots of queries at the same time. When a query asks for some data that&#8217;s not available right away, the server requests the data and then puts the query to sleep until the data is available (for example, the disk finds and returns the data). In the meantime, the master can run other queries. However, these queries are serialized to the binlog in order of transaction commit, so they are run serially on the slave. The slave doesn&#8217;t read ahead in the binlog and execute multiple queries simultaneously. To keep the updates consistent, the queries must be executed in the order they&#8217;re in the binlog. This means the slave might spend much more idle time waiting for the disk to respond. Furthermore, presumably you&#8217;re actually using the slave to take load off the master &#8212; analytics queries, reporting, or whatnot. That&#8217;s additional load on the slave.

Your options are fairly limited. You can monitor how far behind the slave is (the development branch of [innotop][6] makes this easy) and assign less work to it when it starts to lag the master a lot. We do this with a monitoring script and DNS. You can make the slave&#8217;s hardware more powerful, especially giving it faster disks and more memory if that makes sense for your workload. You can try not to run near capacity &#8212; favorite tactics at Google and Flickr.

If you have the coding kung-fu, you might also try to &#8220;pipeline the relay log.&#8221; To do this, you&#8217;d write a program to read ahead in the binlog, convert the statements to `SELECT`s that read the data needed, and thus get the data into cache so the queries don&#8217;t have to wait for I/O so much. I haven&#8217;t used this technique myself, but I know of a person at a popular Web 2.0 company who does and found it speeds things up a lot, especially queries that access a very small amount of data. The explanation of it made a lot of sense to me. However, as I said I haven&#8217;t done it, and I just mention it here for completeness. If you have the skills to do this, I&#8217;m sure you can work it out. One caveat: you might consider whether it makes sense for your query workload. You will only get benefit from this in certain types of queries; otherwise you might just spend a lot of time flushing good data from the cache, causing cache misses and extra disk activity.

#### 2.2 Prevent changes to slave data

If you don&#8217;t keep users and processes from changing data and tables on the slave, you&#8217;re guaranteed to get out of sync. If someone updates, deletes or inserts rows on the slave, the data is automatically out of sync, and the errors accumulate over time. Likewise, if someone changes a table structure, alters a column&#8217;s data type, or makes any other schema change, things will break. The most straightforward way to avoid this is revoke all write privileges on slaves. (By the way, your [schema and privileges ought to be in version control][7]).

Changed data on the slave doesn&#8217;t just cause it to have different data. It can cause replication to break, if the changed data causes an integrity violation or other error. The binlog contains information about every event, including whether it caused an error on the master, and replication will fail if there&#8217;s a different error on the slave than on the master.

Finally, if you intend to prevent any writes on slaves but still allow users to create temporary tables on slaves (quite helpful for reporting and the like), you need to be careful about the interaction between temporary table privileges and regular table privileges. Read more about privileges in the MySQL manual. My simple advice is this: create a separate database that only exists on the slave and only grant temporary table privileges in that database. Creating the database only on the slave ensures nobody uses it on the master (if it even exists on the master, you already have potential problems). Revoking temporary table privileges except in that database keeps replicated tables safe from modifications.

### 3. Avoid gotchas that cause different results on slaves

There are several replication gotchas that can cause the slaves to get out of sync with the master. There are non-deterministic queries that won&#8217;t produce the same result on the slave, there are errors caused by the binlog being serialized on the slave, and there are problems mixing transactional and non-transactional storage engines.

Although this technically falls under &#8220;keeping slaves in sync,&#8221; it&#8217;s a big enough topic that I want to dedicate a section to it.

#### 3.1 Queries not safe for replication

The queries that won&#8217;t replicate might surprise you. You might think queries involving the current date and time, `RAND()`, process ID and so forth wouldn&#8217;t replicate. However, all the information needed to replicate these things properly is included in the binlog. Things that *do not* replicate properly are well-documented in the MySQL Manual section on [replication limitations][8]. Especially if you are living on the bleeding edge (for example, mixing stored procedures and replication in version 5.0), you may run into some of these. You just need to be aware of the things that don&#8217;t replicate right and avoid them. They&#8217;re generally easy to avoid because they&#8217;re not &#8220;plain vanilla&#8221; things to do.

Even some &#8220;plain vanilla&#8221; things don&#8217;t replicate right if you don&#8217;t take care, however. For example, suppose you have a MyISAM table on the master which has had a lot of deletes and inserts. You take a snapshot of the master with a custom dump script you wrote yourself. For some reason you wrote your dump script to always `ORDER BY` the primary key when dumping a table to disk. Now you initialize the slave from this script and everything looks fine. Then someone runs a `DELETE FROM TBL LIMIT 1` on the master. Which row gets deleted on the slave? Probably not the same one that got deleted on the master, because the rows are probably stored in a different order on the slave. Now your master and slave are out of sync. This is one reason I feel much more comfortable with filesystem snapshots for initializing slaves.

Finally, stored procedures make even more &#8220;plain vanilla&#8221; queries unsafe for replication. You need to be very careful about this.

#### 3.2 Don&#8217;t disable InnoDB&#8217;s locking selects

It&#8217;s pretty easy to get bitten by binlog serialization and the problems it can cause with InnoDB, if you don&#8217;t understand how and why it works as it does. As I mentioned, each transaction goes into the binlog in the order in which it commits, not in the order in which it is started, so transactions may execute in a different order on the slave. To prevent inconsistent reads on the slave, InnoDB takes shared locks on all `INSERT INTO ... SELECT FROM` statements. That ensures transaction 2 can&#8217;t modify any data transaction 1 has just read, so the transactions will not cause inconsistent data on the slave when transaction 2 executes first. I personally know people who are very frustrated by this, and it&#8217;s been widely discussed (it&#8217;s well-documented in the manual, among other places).

You might be strongly tempted to disable the behavior so you don&#8217;t get so much lock contention. Don&#8217;t do it.

Unless you really know what you are doing, you are pretty much guaranteed to get your slaves out of sync. It is such a bad idea, I&#8217;m not even going to tell you what configuration parameter controls this. Instead, I&#8217;ll show you better ways when you know a particular statement doesn&#8217;t need to acquire locks.

The first way, if you know you can get away with it, is to simply commit immediately after the `INSERT ... SELECT`. This doesn&#8217;t prevent locks from being taken, but it does release them as soon as possible. That may solve the problems.

The second way, which doesn&#8217;t take any locks at all, is `SELECT INTO OUTFILE` followed by `LOAD DATA INFILE`. You will have to have additional privileges for this, and you&#8217;ll have to consider how to clean up the outfile, but these are relatively easy to solve.

If you&#8217;re here looking for a solution to this problem and this is the first time you&#8217;ve heard of these two options, I encourage you to read more elsewhere. I won&#8217;t write any more about this &#8212; I just wanted to mention it to you so you can find out more if you want.

#### 3.3 Be careful replicating only some databases

If you want to replicate only certain databases and not others, you need to be very careful. It is possible to make a change to a database that should be replicated to the slave, but will not be because of how you executed the query. Take a look at this introductory paragraph from the manual:

<blockquote cite="http://dev.mysql.com/doc/refman/5.0/en/replication-rules.html">
  <p>
    If a master server does not write a statement to its binary log, the statement is not replicated. If the server does log the statement, the statement is sent to all slaves and each slave determines whether to execute it or ignore it.
  </p>
</blockquote>

Notice, you need to pay attention to *both master and slave* configuration. Read more about [replication rules][9] &#8212; I won&#8217;t duplicate the manual here. In general, if you are replicating everything except the mysql database, and you never make that your default database, you will probably be okay.

#### 3.4 Don&#8217;t mix transactional and non-transactional storage engines

Using a mixture of transactional and non-transactional storage engines causes lots of problems. The short and sweet is, don&#8217;t do it, because you will be exposed to very high risk of creating different data on the master and slave.

Here&#8217;s one scenario: there&#8217;s a deadlock on the master in a query that updates two tables, one InnoDB and the other MyISAM. The query has proceeded to a certain point when it tries to get a lock on a row in the InnoDB table and causes a deadlock. At this point it&#8217;s too late: no matter what happens, the master and slave are going to have different data. The changes to the MyISAM table cannot be rolled back, and the changes to the InnoDB table cannot be committed. If the query doesn&#8217;t get put into the binlog, the MyISAM changes will not propagate to the slave. If it does get into the binlog, there will probably not be a deadlock on the slave, because the slave&#8217;s queries are serialized, and both the InnoDB and MyISAM updates will proceed to completion on the slave.

Either way, one or both tables will be different on the slave. MySQL does put the statement into the binlog, for better or for worse. As I said, there&#8217;s no right choice.

Another scenario is if you have some user running queries on the slave that affect the InnoDB table, such as selecting from that table into a temporary table and acquiring locks on it. In this case, a transaction that caused no deadlock on the master might cause a deadlock on the slave; then the changes that succeeded on the master will not proceed to completion on the slave. Boom, your tables are different on the slave.

In both cases, MySQL will detect a different error on the master and slave, and replication will break. There is no way to recover from this; you will have to re-initialize the slave, unless you happen to know that skipping or retrying the statement on the slave will bring the tables back into synchrony (very unlikely). If you had the first kind of error, you&#8217;re going to have to re-initialize every slave from the master; if you had the second kind, you might be able to clone the slave from another slave that wasn&#8217;t affected, which is much less painful.

A note on temporary tables: if your server&#8217;s default storage engine is MyISAM (often the default) and you don&#8217;t explicitly specify the storage engine for temporary tables, they will be MyISAM. Temporary tables are not exempt from the transactional/non-transactional problems, so be aware of that. Of course, please read on to find out why temporary tables are inherently bad for replication.

No matter what, mixing transactional and non-transactional storage engines in replication is bad news. There is no workaround.

#### 3.5 Beware of relay log corruption

I sometimes see relay log corruption on the slave. The slave I/O thread fetches the binlog from the master and writes it to the relay log on the slave, which the slave SQL thread then replays. If there&#8217;s corruption in the relay log that makes a statement un-parsable, the slave SQL thread will throw an error and stop. If you then examine the MySQL error log you&#8217;ll see the position in the relay log where the error was found, and you can use `mysqlbinlog` to examine the log at that point. I&#8217;ve seen the contents, which should look like a normal SQL statement, have a bunch of apparently misaligned bytes, which look like censored expletives.

Fortunately, this is fairly easy to fix. Just record *the corresponding position in the master&#8217;s binlog* where the corruption occurred, shut down the server, and delete all the relay logs it has fetched from the master. Then bring it back up, and tell it to begin replication again from that point.

The scarier scenario is when there&#8217;s invisible corruption that doesn&#8217;t cause the slave to fail. What if a byte got lost somewhere, for example? Perhaps you inserted &#8220;oranges&#8221; on the master, but the slave only got &#8220;ores&#8221; &#8212; entirely possible, because [there are no checksums on the binlog][10] entries. This is why you need good tools to check whether your slaves have the same data as the master.

I haven&#8217;t yet seen binlog corruption on the master, and I don&#8217;t know fully what its effects might be. While I was at MySQL Camp at Google in November I listened to some Google engineers talk about the problems caused by very large numbers of slaves pulling the binlog from a single master. I don&#8217;t recall exactly what the problems were &#8212; I think they were related to the presence of large binlog entries and lots of replication threads using tons of memory on the master &#8212; but it&#8217;s just something to be aware of. MySQL replication has the proven ability to scale very large, but apparently when you get that big there are problems lurking.

I mention binlog corruption not because I can tell you how to avoid it, but because it highlights the need to have good disaster recovery capabilities, and the need to know when your slaves silently get out of sync with the master.

### 4. Monitor whether your slaves are in sync

Preventing your slaves from getting out of sync with the master is hard enough, but it can be even harder to detect when they get out of sync. When I say &#8220;out of sync&#8221; I don&#8217;t mean there&#8217;s replication time lag or delay &#8212; that&#8217;s normal &#8212; but that the master and slave really have different data. The problem is, you can easily get a positive &#8220;yes, the slave is out of sync,&#8221; but you can&#8217;t be very confident about a negative; false negatives are easy to get.

The simplest technique is simply to count rows on the master and slave. You can do this with a short script in your favorite scripting language: iterate through the databases, run `COUNT(*)` on each table, then compare that to the slave. If you see different row counts, you have a problem.

If the row counts are the same, though, you still don&#8217;t know anything for sure. The contents of some rows could differ (for example, perhaps you got relay log corruption that didn&#8217;t cause a hard failure). The best way I know to verify the row contents is with a checksum. MySQL doesn&#8217;t provide a solution themselves. MyISAM tables maintain an internal checksum, but that doesn&#8217;t help for any other storage engine. For other storage engines, you&#8217;ll have to write your own checksum. Giuseppe Maxia to the rescue again &#8212; he has a very [good article on table checksums in MySQL][11], as sort of a tangent to a discussion on cursors.

**Update:** I have improved upon Giuseppe&#8217;s technique; see my article on [how to calculate table checksums in MySQL][12].

**Update:** I&#8217;ve created a tool that can [verify tables are identical][13] on the master and many slaves.

To take checksums of your master and slave, you&#8217;ll obviously have to halt the master and let the slave catch up to it. The safest way I know is to stop the master, let all slaves catch up and then stop them, re-initialize one slave directly from a filesystem snapshot of the master, start the master again, and keep all the slaves stopped &#8212; thus ensuring that you have all slaves stopped at a single point in time relative to the master. Then you can compare each of the slaves to the brand-new snapshot from the master. If there are any differences, you have a problem, and you should re-initialize all the slaves from the new snapshot.

### 5. Avoid temporary tables like the plague

Temporary tables are very convenient, and they generally work fine in replication, but they make restarting after crashes impossible. If your goal is to have a reliable setup that&#8217;s easy and quick to recover in case of a problem, you need to completely stay away from temporary tables.

Here&#8217;s why: temporary tables exist only in memory. They do not persist across server restarts. If a slave crashes &#8212; and [MySQL slave crashes can happen even when you&#8217;re just doing routine work][14] &#8212; you can only restart it if everything is recoverable from disk. Temporary tables make that impossible, because when the slave starts reading from the binlog and tries to execute a statement that refers to a temporary table created before the server was started, the statement will fail. The temporary table no longer exists, and there&#8217;s nothing you can do about it. If you&#8217;re lucky you can tell the slave to skip one or two statements that you know don&#8217;t really affect any data, but in general you&#8217;re probably going to have to re-initialize the slave.

You also need to be able to stop and restart your slaves at will, for example to take snapshots for backups or to clone another slave. If you have even a single temporary table open, you can&#8217;t do that. Temporary tables stay open until they&#8217;re explicitly dropped on the master, or the connection that created them closes. If you use temporary tables much, you might have lots of them open at any given time, and if you need to stop a slave for a backup, you will probably never get a chance.

I think the best solution is to simply use real tables instead. Real tables persist on disk and will let you stop, start, and recover from crashes. Instead of creating temporary tables, create a real table with a unique name, which no other query will use.

You will need to make allowances for cleaning up these tables, however. If a process dies before it cleans up after itself, the table will stay around. I recommend that you create a separate database for the tables and have a reaper process run every now and then. You can do this several ways; one suggestion I&#8217;ve heard is to run `SHOW TABLE STATUS` and examine the create date, then drop tables after a certain safe amount of time. I don&#8217;t like this very much, because a &#8220;safe&#8221; interval is likely to be pretty long depending on your workload, and it&#8217;s hard to be really sure the table is &#8220;safe&#8221; to drop.

The way I do it is to name each table with its connection ID as a suffix. For example if my connection ID is 123, I might name the table `client_report_123`. This ensures table names are unique, removing the messiness of trying to find an unused random string. It makes table names meaningful, instead of random garbage whose purpose is unknown. And it makes it easy to know for sure when the table is obsolete, because you can run `SHOW PROCESSLIST` and see whether connection 123 is still open. With this naming convention, the reaper job can be a few lines of code in your favorite scripting language (yay regular expressions!).

### 6. Beware of new features

Sometimes replication gets very unhappy about new features. I remember the first time I tried to use `ON DUPLICATE KEY UPDATE` with a `VALUES()` clause in the `UPDATE` in MySQL 4.1. It ran fine on the master, but when it got to the slave, it core dumped the server. I had similar experiences with views and triggers in the first versions of MySQL 5.0. In general, it&#8217;s a good idea to test everything against a non-production setup, just as you would any other code. That&#8217;s just general advice, but I wanted to warn you not to assume things that run fine on the master will be okay on the slave.

### Conclusion

In this article I tried to summarize what I&#8217;ve learned about making replication as reliable and recoverable as possible over the last several months. These are tried-and-true techniques for most experienced MySQL users, but I found a paucity of information on the web about it, so I thought it would be helpful to write it down.

I&#8217;m sure this is an incomplete list, and maybe I&#8217;ve even gotten some things wrong, but hopefully this will help you avoid a lot of pain if you&#8217;re new to MySQL replication. If you have other things to add, please write into the comments.

 [1]: http://dev.mysql.com/doc/refman/5.0/en/replication.html
 [2]: http://www.onlamp.com/pub/a/onlamp/2006/04/20/advanced-mysql-replication.html
 [3]: http://dev.mysql.com/tech-resources/articles/application_partitioning_wp.pdf
 [4]: http://www.mysqlperformanceblog.com/2006/08/21/using-lvm-for-mysql-backup-and-replication-setup/
 [5]: http://lenz.homelinux.org/mylvmbackup/
 [6]: http://code.google.com/p/innotop/
 [7]: /blog/2006/07/09/so-you-think-your-code-is-in-version-control/
 [8]: http://dev.mysql.com/doc/refman/5.0/en/replication-features.html
 [9]: http://dev.mysql.com/doc/refman/5.0/en/replication-rules.html
 [10]: http://bugs.mysql.com/bug.php?id=25737
 [11]: http://datacharmer.blogspot.com/2006/03/seeking-alternatives-to-cursors.html
 [12]: /blog/2007/01/25/how-to-calculate-table-checksums-in-mysql/
 [13]: /blog/2007/02/26/introducing-mysql-table-checksum/
 [14]: http://bugs.mysql.com/bug.php?id=25531

 *[DML]: Data Manipulation Language