---
title: Progress on High Performance MySQL Backup and Recovery chapter
date: "2007-10-02"
permalink: /blog/2007/10/02/progress-on-high-performance-mysql-backup-and-recovery-chapter/
categories:
  - Databases
---
I wrote a couple weeks ago about my work on the [Backup and Recovery chapter for High Performance MySQL, 2nd Edition][1]. Thanks for your comments and suggestions, and thanks to those of you who helped me over email as well.

I've had several questions about what is included in the chapter, so I thought I'd post the outline as it stands now:

<pre>[Introduction]
It's All About Recovery
Topics We Won't Cover
Why Backups?
Considerations and Tradeoffs
  What Can You Afford to Lose?
  Online or Offline Backups?
  Dump or Raw Backup?
  What to Back Up
    Incremental Backups
  Storage Engines and Consistency
    Data Consistency
    File Consistency
  Replication
Backing Up Data
  Dumping Data from MySQL
    SQL dumps
    Delimited File Dumps
    Parallel Dump and Restore
  Filesystem Snapshots
    How LVM Snapshots Work
    Prerequisites and Configuration
    Creating, Mounting and Removing an LVM Snapshot
    Warm Backups with LVM Snapshots
    Hot InnoDB Backups with LVM Snapshots
  Copying Files Across the Network
Restoring from a Backup
  Restoring from Raw Files
    Starting MySQL After Restoring Raw Files
  Restoring from Dumps
    Loading SQL Dumps
    Loading Delimited Dumps
  Point-In-Time Recovery
  More Advanced Recovery Techniques
    Delayed Replication for Fast Recovery
    Filtering Through Replication
  InnoDB Recovery
Backup and Recovery Speed
Backup Tools
  mysqldump
  mysqlhotcopy
  InnoDB Hot Backup
  mylvmbackup
  Zmanda Recovery Manager
    Installing and Testing ZRM
  Comparison of Backup Tools
Scripting Backups</pre>

Whew! Even with such a detailed outline, it's hard to tell how much material is in there (it could be all headings and no text, right?). To give you a rough idea, it's 32 pages in OpenOffice.org. In fact, I'd say the places that are the least in-depth are "Why Backups?" and the last two sections. As I wrote, I became conscious that a lot of these topics are not specific to MySQL, and there are other books specifically about backup that you should read. My focus for this book, I decided, should be on High Performance MySQL Backup and Recovery.

That's why I went into such significant detail. For example, the section on copying files across the network is not fluff. It's benchmarks of file copy methods. And in the section on loading SQL dumps, I show you how to use `sed` to extract the CREATE TABLE statement for one table out of a huge all-tables dump without decompressing the file and opening it with a text editor (just in case you were silly enough to dump everything into one monolithic file). At present I'd say this chapter has at least four or five times more material than its counterpart in the first edition.

A side effect of working on this chapter is that it motivated me to finish the work I had half-done on parallel dumps (see my most recent few posts for more on this). All good stuff.

I'll post "further updates as events warrant."

 [1]: http://www.xaprb.com/blog/2007/09/19/high-performance-mysql-second-edition-backup-and-recovery/
