---
title: "Time-Series Database Requirements"
date: "2014-06-08"
url: /blog/2014/06/08/time-series-database-requirements/
categories:
  - Databases
---

I've had conversations about time-series databases with many people over the last couple of years. I [wrote previously](http://www.xaprb.com/blog/2014/03/02/time-series-databases-influxdb/) about some of the open-source technologies that people commonly use for time-series storage.

![Time Series][timeseries]

Because I have my own ideas about what constitutes a good time-series database, and because a few people have asked me to describe my requirements, I have decided to publish my thoughts here. All opinions that follow are my own, and as you read you should mentally add "in my opinion" to every sentence.

For the record, I currently have an efficient time-series database that is working well. It is [built on MySQL](https://vividcortex.com//blog/2014/04/30/why-mysql/). This is a high bar for a replacement to jump over.

### Definition of Data Type

For my purposes, time-series can be defined as follows:

* A series is identified by a source name or ID (for example: host ID) and a metric name or ID.
* A series consists of a sequence of {timestamp, value} measurements ordered by timestamp, where the timestamp is probably a high-precision Unix timestamp and the value is a floating-point number.

### Workload Characteristics

Time-series data is not general-purpose and has specific patterns in its workload. A time-series database should be optimized for the following.

For writes:

* Write-mostly is the norm; perhaps 95% to 99% of operations are writes, sometimes higher.
* Writes are almost always sequential appends; they almost always arrive in time order. There is a caveat to this.
* Writes to the distant past are rare. Most measurements are written within a few seconds or minutes after being observed, in the worst case.
* Updates are rare.
* Deletes are in bulk, beginning at the start of history and proceeding in contiguous blocks. Deletes of individual measurements or deletes from random locations in history are rare. Efficient bulk deletes are important; as close to zero cost as possible. Non-bulk deletes need not be optimal.
* Due to the above, an immutable storage format is potentially a good thing. As a further consequence of immutable storage, a predefined or fixed schema may be a problem long-term.

For reads, the following usually holds:

* Data is much larger than memory and rarely read, so caching typically doesn't work well; systems are often IO-bound.
* Reads are typically logically sequential per-series, ascending or descending.
* Concurrent reads and reads of multiple series at once are reasonably common.

The caveat to "writes arrive in sequential order" is that measurements typically arrive ordered by {timestamp, series_id}, but reads are typically done in {series_id, timestamp} order. Reads need to be fast, even though they are rare. There are generally two approaches to dealing with this. The first is to write efficiently, so the data isn't read-optimized per-series on disk, and deploy massive amounts of compute power in parallel for reads, scanning through all the data linearly. The second is to pay a penalty on writes, so the data is tightly packed by series and optimized for sequential reads of a series.

### Performance and Scaling Characteristics

A time-series database should be:

* Distributed by design --- no bolt-on clustering or sharding. Automatic data distribution, automatic query distribution. Fault-tolerant and highly available, with built-in replication and automatic failover. I think by this point we should all understand what it means for a database to be natively distributed. There are several good examples of databases that do it sensibly, and little of this should need to be novel.
* Send the query to the data, don't bring the data to the query. This is a restatement of "automatic query distribution." Queries may touch many gigabytes or terabytes of data, so moving it across the network is not scalable.
* Efficient per-node so it is capable of running at large scale without requiring thousands of servers.
* Able to take advantage of powerful hardware: PCIe flash storage, lots of RAM, many CPU cores. This rules out single-writer systems.
* Fast and consistent. No spikes or stalls; no checkpoint freezes; no compaction lock-ups.

### Operational Requirements

* I do not specifically need ACID, but I need the database to quickly recover to a consistent state after events like a power failure. For my purposes, time-series data is not subject to the same durability constraints as financial data.
* Non-blocking backups are a must. Incremental backups are a very good thing.
* It needs to be possible to scale the cluster up or down without downtime or locking.
* Compressed storage. Time-series data is big, but highly compressible.
* The database should be well instrumented.
    
### Language and/or API Design

I've spoken to many people who have built large-scale time-series databases for big companies. Most of them have told me that the lack of a high-level way to access and query the database was the long-term millstone around their neck.

I would be happy with something that looks like SQL, as InfluxDB's query language does. Crucially, it needs to avoid a few of the legacy limitations of SQL. The way I think about it is that SQL tables are fixed-width and grow downwards by adding rows. A natural outcome of that is that each column in SQL statements is known in advance and explicitly named, and expressions naturally work within a single row or in aggregates over groups of rows, but cannot span rows otherwise without doing a JOIN.

![Theater][theater]

However, in time-series databases, rows are series identified by the "primary key." Rows grow sideways as new measurements are added, tables grow downwards as new series are added, and columns are timestamps. Thus, tables are sparse matrices. Expressions must operate in aggregates over rectangular sections of the sparse matrix, not just rows or columns, and the language must permit a GROUP BY functionality in both directions. You could say that both rows and columns must be addressable by keys instead of by literal identifiers, and ideally by pattern matching in addition to strict equality and ranges.

Ideally, the language and database should support *server-side processing* of at least the following, and probably much more:

* Expressions such as arithmetic and string operations.
* Aggregate functions.
* Resampling into time resolutions different from the storage resolution.
* Expressions and operators that refer to different series, e.g. to sum series, or divide one by another, and to combine such expressions, e.g. to sum up all series whose identifiers match a pattern, then divide the result by the sum of another group of series.
* Ordering, ranking, and limiting.

Another way to say the above is that the language and database should be designed for analytics, not just for drawing strip charts. Many open-source time-series databases such as RRDTool are far too tightly coupled with their expected use case, and this is a serious limitation.

There should be an efficient binary protocol that supports bulk inserts.

### Non-Requirements

I'd like a database that does one thing well. I do not think I need any of the following, and I regard them as neutral, or in some cases even as drawbacks:

* Access control --- authentication and authorization.
* Ability to visualize data, draw graphs, etc.
* Support for multiple measurements at the same timestamp. The measurement's primary key is `series,timestamp` and it does not make sense to allow multiple values with the same timestamp.
* Multi-dimensionality. Multiple dimensions for a series can be stored as multiple series, and multiple series can be combined in expressions with the query language I specified, so the atom of "series" already provides for the use case of multi-dimensionality.
* "Tagging" measurements or series with additional ad-hoc key-value pairs.
* Joins from time-series data to relational data.

### Bonus and Additional Features

The preceding sections describe a good general-purpose time-series database, from my point of view. Nice-to-have features might include:

* Support for retention policies.
* Support for storing data in multiple resolutions (materialized views) and selecting the appropriate resolution to access for a given request.
* Support for maintaining downsampled data in coarser resolutions, automatically building these materialized views as high-resolution data arrives (automatic rollup).
* Support for query priorities or admission control to prevent starvation and DOS from large queries.

For my particular uses, I also need support for:

* Many series per server in my cluster, far more than practical limits on the number of files in a directory for example.
* Although some series are long-lived, many are not. Many are sparse, with measurements only once in a long while. Series are dynamic and are not predefined; new series may appear at any moment. Due to this requirement, I need efficient support for discovering which series exist during any given time range.
* Multi-tenancy at the physical level. This is partially by demand; some customers want to know that their data is separate from other customers' data. It is partially pragmatic, to support features such as separate retention policies per customer.

### Conclusion

The future of "big data" is mostly time-series. Someone who creates a good time-series database for
such use cases will probably do quite well. I'm sure my requirements aren't the
most general-purpose or complete, but I hope it's useful to share anyway.

Pic credits:

* [Seasons](https://www.flickr.com/photos/hugovk/6798051186/)
* [Theater](https://www.flickr.com/photos/sprengben/4976954312/)

[timeseries]: /media/2014/06/timeseries.jpg
[theater]: /media/2014/06/theater.jpg
