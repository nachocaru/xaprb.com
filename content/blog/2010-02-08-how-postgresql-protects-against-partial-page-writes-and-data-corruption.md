---
title: How PostgreSQL protects against partial page writes and data corruption
permalink: /2010/02/08/how-postgresql-protects-against-partial-page-writes-and-data-corruption/
date: "2010-02-08"
categories:
  - Databases
---
I explored two interesting topics today while learning more about Postgres.

### Partial page writes

PostgreSQL's partial page write protection is configured by the following setting, which defaults to "on":

> full_page_writes (boolean)
> 
> When this parameter is on, the PostgreSQL server writes the entire content of each disk page to WAL during the first modification of that page after a checkpoint… Storing the full page image guarantees that the page can be correctly restored, but at a price in increasing the amount of data that must be written to WAL. (Because WAL replay always starts from a checkpoint, it is sufficient to do this during the first change of each page after a checkpoint. Therefore, one way to reduce the cost of full-page writes is to increase the checkpoint interval parameters.)

Trying to reduce the cost of full-page writes by increasing the checkpoint interval highlights a compromise. If you decrease the interval, then you'll be writing full pages to the WAL quite often. This should in theory lead to surges in the number of bytes written to the WAL, immediately following each checkpoint. As pages are revisited over time for further changes, the number of bytes written should taper off gradually until the next checkpoint. Hopefully someone who knows more can confirm this. Does anyone graph the number of bytes written to their WAL? That would be a nice illustration to see how dramatic this surging is.

Decreasing the checkpoint interval seems a bit scary, and is bound to have its own costs, for all the usual reasons. A massive checkpoint once in a while should be really expensive, and would lead to a bad worst-case time for recovery. Does the new bgwriter implementation in 8.3 fix any of this? In theory it could, but I don't know enough yet to say. I have heard conflicting opinions on this point. I have a lot more to read about it before I form my own opinion.

Storing full pages might not really be that expensive. It could bloat the WAL, but is the cost (in terms of time) really that high? InnoDB (in MySQL) protects against partial page writes with a double-write strategy: a region in the tablespace is called the doublewrite buffer. Page writes are first sent to the doublewrite buffer, then to their actual location in the data file. I don't remember where, but I've seen benchmarks showing that this doesn't hurt performance, even though it seems counter-intuitive. Modern disks can do a lot of sequential writes, and the way InnoDB writes its data makes a lot of things sequential. I doubt that putting full pages into the PostgreSQL WAL is forced to cost a lot, unless there is an implementation-specific aspect that makes it expensive.

The TODO has some [items on the WAL][1], which look interesting -- "Eliminate need to write full pages to WAL before page modification" and a couple more items. I need to understand PostgreSQL's recovery process better before I know what these really mean.

### Detecting data corruption

I was able to verify that the WAL entries have a checksum. It is a CRC32. This is in [xlog.c][2].

However, as far as I can understand, the answer for detecting data corruption in normal data pages is "Postgres doesn't do that." I was told on the IRC channel that normal data pages don't have checksums. I am not sure how to verify that, but if it's true it seems like a weakness. I've seen hardware-induced corruption on InnoDB data many times, and it could sometimes only be detected by page checksums.

What happens when a page is corrupt? It probably depends on where the corruption is. If a few bytes of the user's data is changed, then I assume you could just get different data out of the database than you inserted into it. But if non-user data is corrupted then do you get bizarre behavior, or do you get a crash or error? I need to learn more about PostgreSQL's data file layout to understand this. Imagining (I haven't verified this) that a page has a pointer to the next page, what happens if that pointer is flipped to refer to some other page, say, a page from a different table? If TABLE1 and TABLE2 have identical structures but different data, could SELECT * FROM TABLE1 suddenly start showing rows from TABLE2 partway through the results? Again I need to learn more about this.

