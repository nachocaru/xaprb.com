---
title: How InnoDB performs a checkpoint
date: "2011-01-29"
url: /blog/2011/01/29/how-innodb-performs-a-checkpoint/
categories:
  - Databases
---
InnoDB's checkpoint algorithm is not well documented. It is too complex to explain in even a long blog post, because to understand checkpoints, you need to understand a lot of other things that InnoDB does. I hope that explaining how InnoDB does checkpoints in high-level terms, with simplifications, will be helpful. A lot of the simplifications are because I do not want to explain the complexities of how the simple rules can be tweaked for optimization purposes, while not violating the ACID guarantees they enforce.

A bit of background: [Gray and Reuter's classic text on transaction processing][1] introduced two types of checkpoints beginning on page 605. There is a **sharp checkpoint**, and there is a **fuzzy checkpoint**.

A sharp checkpoint is accomplished by flushing all modified pages for committed transactions to disk, and writing down the log sequence number (LSN) of the most recent committed transaction. Modified pages for uncommitted transactions should not be flushed -- that would violate the rule of write-ahead logging. (This is a deliberate and gross over-simplification; I will not draw attention to further simplifications I make.) Upon recovery, log REDO can start from the LSN at which the checkpoint took place. A sharp checkpoint is called "sharp" because everything that is flushed to disk for the checkpoint is consistent as of a single point in time -- the checkpoint LSN.

A fuzzy checkpoint is more complex. It flushes pages as time passes, until it has flushed all pages that a sharp checkpoint would have done. It completes by writing down two LSNs: when the checkpoint started and when it ended. But the pages it flushed might not all be consistent with each other as of a single point in time, which is why it's called "fuzzy." A page that got flushed early might have been modified since then, and a page that got flushed late might have a newer LSN than the starting LSN. A fuzzy checkpoint can conceptually be converted into a sharp checkpoint by performing REDO from the starting LSN to the ending LSN. Upon recovery, then, REDO can begin from the LSN at which the checkpoint started.

It is often said that InnoDB does fuzzy checkpointing. The truth is, it does both types. When the database shuts down, it performs a sharp checkpoint. During normal operation, it performs fuzzy checkpoints. And InnoDB's implementation of fuzzy checkpoints is not exactly the same as that described in Gray & Reuter.

Here is where the weeds get deep: I will try to explain some of the subtleties that let InnoDB provide uniform quality of service by performing checkpoints almost constantly, instead of checkpoints being significant events that occur periodically. It can be said that InnoDB actually never does a checkpoint during normal operation. Instead, the state of the database on disk is a constantly advancing fuzzy checkpoint. The advances are performed by regular flushing of dirty pages as a normal part of the database's operation. The details are far too many and complex to write here, in part because they have changed significantly as new versions have been released, but I will try to sketch the outline.

InnoDB maintains a large buffer pool in memory with many database pages, and doesn't write modifications to disk immediately. Instead, it keeps dirty pages in memory, hoping that they will be modified many times before they are written to disk. This is called write combining, and is a performance optimization. InnoDB keeps track of the pages in the buffer pool through several lists: the free list notes which pages are available to be used, the LRU list notes which pages have been used least recently, and the flush list contains all of the dirty pages in LSN order, least-recently-modified first.

These lists are all important, but for the simplified explanation here, I will focus on the flush list. InnoDB has limited space in the buffer pool, and if there aren't any free spots to store a page that InnoDB needs to read from disk, it must flush and free a dirty page to make room. This is slow, so InnoDB tries to avoid the need for this by flushing dirty pages continually, keeping a reserve of clean pages that can be replaced without having to be flushed. It flushes the oldest-modified pages from the flush list on a regular basis, trying to keep from hitting certain high-water marks. It chooses the pages based on their physical locations on disk and their LSN (which is their modification time).

In addition to avoiding the high-water marks, InnoDB must avoid a very important low-water mark as well. The transaction logs (aka REDO logs, WAL logs) in InnoDB are fixed-size, and are written in a circular fashion. But spaces in the logs cannot be overwritten if they contain records of changes to a dirty page that hasn't been flushed yet. If that happened and the server crashed, all records of those changes would be lost. Therefore, InnoDB has a limited amount of time to write out a given page's modifications, because the ongoing transaction logging is hungry for space in the logs. The size of the logs imposes the limit. If the log writing activity wraps around in a circle and bumps into its own tail, it will cause a very bad server stall while InnoDB scrambles to free up some room in the logs. This is why InnoDB generally chooses to flush in oldest-modification order: the oldest-modified pages are the furthest behind in the logs, and will be bumped into first. The oldest unflushed dirty page's LSN is the low-water mark in the transaction logs, and InnoDB tries to raise that low-water mark to keep as much room available in the transaction logs as it can. Making the logs larger reduces the urgency of freeing up log space and and permits various performance optimizations to do the flushing more efficiently.

And now, with that simplified explanation in place, we can understand how InnoDB actually makes a fuzzy checkpoint. When InnoDB flushes dirty pages to disk, it finds the oldest dirty page's LSN and treats that as the checkpoint low-water mark. It then writes this to the transaction log header. You can see this in the functions log\_checkpoint\_margin() and log_checkpoint(). Therefore, every time InnoDB flushes dirty pages from the head of the flush list, it is actually making a checkpoint by advancing the oldest LSN in the system. And that is how continual fuzzy checkpointing is implemented without ever "doing a checkpoint" as a separate event. If there is a server crash, then recovery simply proceeds from the oldest LSN onwards.

When InnoDB shuts down, it does some additional work. First, it stops all updates to data; then it flushes all dirty buffers to disk; then it writes the current LSN to the transaction logs. This is the sharp checkpoint. Additionally, it writes the LSN to the first page of each data file in the database, which serves as a signal that they have been checkpointed up to that LSN. This permits further optimizations during recovery and when opening these data files.

There is a lot more to study if you want to learn how it's really done in detail; there are many fine points to the process. This is one area where the usually excellent manual is a bit lacking. Some of the best resources are as follows:

*   [Gray and Reuter's book][1]
*   [Mark Callaghan's note on fuzzy checkpoints][2]
*   [Peter Zaitsev's post on why the flushing algorithm in older InnoDB used to cause spikes][3]
*   [Mark Callaghan's slides from Percona Performance Conference 2009][4]

A related topic that is equally as complex is how InnoDB flushes dirty pages at the right speed to keep up with the database's workload. Too fast and the server does too much work; too slow and it gets behind and hurries to catch up, causing spikes of furious flushing activity and degraded quality of service. Percona Server has arguably the most advanced and effective algorithms for this, in the XtraDB storage engine (a variant of InnoDB). Percona Server calls it "adaptive checkpointing." InnoDB followed suit by implementing something similar, but harder to tune correctly. InnoDB calls it "adaptive flushing," which is a more accurate name. Much (and I do mean much!) has been written about this. I know that Vadim has done hundreds of benchmarks to analyze how flushing and checkpointing works, some of them many hours long to study long-term performance characteristics. I will point you to a couple of pages that I think are the most succinct summaries of the implementation and how it performs:

*   [Dimitri Kravtchuk's blog post about adaptive flushing and the innodb\_io\_capacity variable][5]
*   [Vadim's benchmarks of Percona Server and MySQL 5.5.8][6], showing how to tune so that "adaptive flushing" works well
*   [Percona Server documentation for adaptive checkpointing][7]
*   [My own blog post about balancing dirty page flushing and write combining][8]

If these types of topics interest you, you should attend [Percona Live][9] in San Francisco in a couple of weeks. Both Peter Zaitsev and Mark Callaghan will be speaking there on topics such as InnoDB internals, along with a variety of other speakers; there is a several-hour class on InnoDB internals.

 [1]: http://www.amazon.com/dp/1558601902?tag=xaprb-20
 [2]: http://www.facebook.com/note.php?note_id=408059000932
 [3]: http://www.mysqlperformanceblog.com/2006/05/10/innodb-fuzzy-checkpointing-woes/
 [4]: http://www.percona.com/ppc2009/PPC2009_Life_of_a_dirty_pageInnoDB_disk_IO.pdf
 [5]: http://dimitrik.free.fr/blog/archives/2010/07/mysql-performance-innodb-io-capacity-flushing.html
 [6]: http://www.mysqlperformanceblog.com/2011/01/03/mysql-5-5-8-in-search-of-stability/
 [7]: http://www.percona.com/docs/wiki/percona-server:features:innodb_io
 [8]: http://www.xaprb.com/blog/2010/05/25/dirty-pages-fast-shutdown-and-write-combining/
 [9]: http://www.percona.com/events/percona-live-san-francisco-2011/
