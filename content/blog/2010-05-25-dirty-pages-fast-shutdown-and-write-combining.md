---
title: Dirty pages, fast shutdown, and write combining
date: "2010-05-25"
permalink: /2010/05/25/dirty-pages-fast-shutdown-and-write-combining/
categories:
  - SQL
---
One of the things that makes a traditional transactional database hard to make highly available is a relatively slow shutdown and start-up time. Applications typically delegate most or all writes to the database, which tends to run with a lot of "dirty" data in its (often large) memory. At shutdown time, the dirty memory needs to be written to disk, so the recovery routine doesn't have to run at startup. And even upon a clean startup, the database probably has to warm up, which can also take a very long time.

Some databases let the operating system handle most of their memory management needs. This has its own challenges, especially if the [operating system's design doesn't align exactly with the database's goals][1]. Other databases take matters into their own hands. InnoDB (the de facto transactional MySQL storage engine) falls into this category; when properly configured to take advantage of modern hardware, it will use basically all of the server's memory in a huge buffer pool, with files opened in O_DIRECT mode, bypassing the operating system for I/O operations.

The design choices, and the results, are worth thinking about. Assuming you shut down and restart infrequently, the choice to hold a lot of dirty memory has huge performance benefits, which has to be balanced against the desire for fast shutdown and recovery. In InnoDB, there are a few things you can configure that change the startup and shutdown behaviors, but you should understand the performance effects during normal operation.

First, let's look at why it's nice to run with lots of dirty data in memory.

### Write combining

Most databases have a concept called a page, buffer, or block. This is a physical unit of data, which can typically store many logical units (rows). InnoDB defaults to 16kb pages of data. Imagine that your typical row is only 80 bytes long. A lot of rows can fit into 16kb in most uses.

Suppose you insert, update, or delete a row. Should InnoDB write the result to disk? If it does, it has to write the entire 16kb page, and any other index pages and so forth, which can add up to a lot of pages. That's a lot of work for a little bitty 80-byte row! InnoDB leaves the pages dirty in its memory. When you commit the transaction, the write-ahead log ensures that if there's a crash, the change is still permanent. (The log has very compact entries and is not page-oriented.)

Now suppose you make another little change. In many cases, there's a decent probability that both of the changes touched the same page(s). In fact, if you had the [statistics][2] to prove it, you would probably see that the vast majority of your changes focus on a small fraction of the total pages, or even [a small fraction of the rows][3]. Most workloads have a very tall head and a very long tail. Tens, hundreds, even thousands of times more changes go to those same pages and rows, as compared to the less-active ones.

Eventually, our favorite "hot page" gets written so a checkpoint can complete. Tons of changes were written in a single write. This is *write combining*, and it's a huge efficiency. Huge! Servers can accept many tens of thousands of writes per second, and guarantee ACID properties, because of write combining. If they didn't combine writes, they'd be asked to do many more I/O operations per second.

### Dirty pages and the long tail

The downside to this is the amount of dirty pages in memory, which have to be written out during shutdown. Shutdown is equivalent to a forced checkpoint. The server has been lazily delaying lots of work, because it knows it's going to be able to combine writes. Suddenly, all the bills come due at once &#8212; time to write tons of data to disk! And the problem here is that the server's memory can actually be mostly dirty data. By default, InnoDB lets the buffer pool get up to 90% dirty before it starts to get worried and work hard to flush pages.

If most writes go to the hottest pages, why should there be so many dirty pages? The answer is the long tail. The few writes that don't go to the tall head go to a very scattered long tail. Again this is hard to prove, but many of those one-off writes are dirtying entire pages just for themselves, and those pages will not be dirtied by any other writes. So the long tail is full of 16kb pages that had only 80 bytes written to them. This ends up being a lot of pages of data.

### Fast shutdown on demand

If you want your database to be able to shut down quickly if needed, what can you do about this? This is a tough question to answer. There are a few different strategies you might take.

*   You can configure InnoDB to keep the dirty pages to a minimum. The problem is, it starts to do a lot less write combining. Take an average web application's database and lower the dirty page percent, and watch the disk activity. It will go through the roof. It starts furiously flushing pages, only to turn around and flush the same pages again an instant later. InnoDB isn't particularly designed or optimized for this, by the way. Things will suffer. However, this is actually a useful technique for a planned fast shutdown.
*   You can lower the page size. If you make the pages smaller, then in theory you'll do less work flushing those long-tail pages. Be careful with this! There is research (actual math, mind you) indicating that InnoDB's default page size is already too small, and there isn't a lot of real-world experience with non-default page sizes. The Tokutek folks know a lot about the math, by the way.
*   You can configure InnoDB not to flush dirty pages before a shutdown. This is essentially the same thing as shutting down without a checkpoint, which is the same as crashing. The recovery routine will have to run at startup before the database becomes available. That is likely to be much slower than a clean shutdown, due to the mechanics of crash recovery.
*   You might be able to make InnoDB capable of doing a lot more flushing by upgrading to a version that has separate threads for this purpose, and/or using native asynchronous I/O. This might not really help in shutdown; to tell the truth, I haven't checked it.

### No free lunch

InnoDB is a complex system that is trying to balance a lot of different factors for efficiency, while giving nice ACID properties. And it's actually doing a pretty decent job of it by default. When you say you'd like more or less of such-and-such performance characteristic, then something else gets traded off. This is a really hard problem, and I'm not aware of anyone who has a brilliant solution to it, although I am far from a database research specialist.

Even the question of how much data to write, and how quickly, is a hard one. It's hard and expensive to really answer accurately because the *real* answer requires knowledge of things such the frequency and distribution of page dirtying. Therefore, InnoDB kind of avoids this and lets you configure its "I/O capacity" and "dirty page percent" and maybe a few other things, depending on which version you use. These are just models that approximate the true answers to the real questions. All models are wrong. Some models are useful. InnoDB employs useful models that work a lot of the time.

 [1]: http://blog.2ndquadrant.com/en/2010/05/postgresql-freebsd-and-free-do.html
 [2]: http://www.percona.com/docs/wiki/patches:innodb_io_pattern
 [3]: http://www.facebook.com/note.php?note_id=392581440932
