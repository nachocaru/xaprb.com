---
title: Progress on Maatkit bounty, part 2
  <p>Ironically, the Stream algorithm I wrote as the simplest possible syncing algorithm does what the much more efficient algorithm I wrote some time ago can't do: sync a table without a primary key, as long as there are no duplicate rows.  In fact, it's so dumb, it will happily sync any table, even if there are no indexes.</p>
  
  <p>The flash of inspiration I had on Friday has turned out to be good...</p>
date: "2007-12-03"
permalink: /2007/12/03/progress-on-maatkit-bounty-part-2/
description:
  - "I'm developing synchronization algorithms."
tags:
  - MySQL
  - OOP
  - SQL
  - synchronization
---
Ironically, the [Stream][1] algorithm I wrote as the simplest possible syncing algorithm does what the [much more efficient algorithm I wrote some time ago][2] can't do: sync a table without a primary key, as long as there are no duplicate rows. In fact, it's so dumb, it will happily sync any table, even if there are no indexes.

The flash of inspiration I had on Friday has turned out to be good insight. It immediately showed me how I can re-use a lot of the hard work I've already done for other tools. Chunking and nibbling are the names I've given to two algorithms I've developed for processing tables a little at a time. Chunking looks for a suitable index and generates an array of `WHERE` clauses that will divide the table into pieces of approximately a given size (number of rows or number of bytes). I use this on mk-table-checksum and mk-parallel-dump. It requires an indexed column I can treat as a number one way or another. That includes temporal values.

Nibbling is related. It's an efficient way to do something like LIMIT X, Y without scanning through the first X rows. It also requires a suitable index, but the code I wrote to make it work with mk-archiver is really generous about what "suitable" means. It'll basically work with any index. It selects some rows with LIMIT Y and uses the last-fetched row to start the next select.

Both algorithms will adapt well to finding and resolving differences in rows, a chunk at a time. The general procedure is to create the `WHERE` clauses that define boundaries around the chunk of rows, then checksum the whole chunk. The result is a tiny little hash value. If this differs between the source and destination tables, the next step is to checksum the rows individually and fetch their primary or unique key columns. This uses a little more network bandwidth, but it's still not bad unless the key (or the chunk) is huge. Any rows whose checksums differ can then be fetched by the key and synced.

The more complex algorithms, which were in the original table-sync tool, will come later. They can be potentially much more efficient in terms of network traffic, but they have drawbacks too, such as the granularity of locking. The mk-table-sync tool will soon be able to choose the best algorithm that causes the least locking and just do it without any fuss. For example, if it sees a nice primary key it can use for chunking, and it sees that the table is InnoDB, it'll just chunk and use `SELECT FOR UPDATE`. Voila, no table locks, and not much of the table will be locked at a time (it'll commit between chunks).

Right now I've gotten a simple interface for code that finds differences in rows, a plugin-like interface for implementing each of the algorithms uniformly, an interface for resolving differences, and a few other things. I'm about to embark on the Chunk algorithm for syncing.

I don't think most people will consider this a big deal, but don't expect the final product to correctly sync tables without a primary key and with duplicate rows. Comparing tables with duplicates is absolutely meaningless. If you can't write a `WHERE` clause that uniquely identifies a row, you're done.

 [1]: http://www.xaprb.com/blog/2007/11/30/progress-on-maatkit-bounty/
 [2]: http://www.xaprb.com/blog/2007/03/05/an-algorithm-to-find-and-resolve-data-differences-between-mysql-tables/
