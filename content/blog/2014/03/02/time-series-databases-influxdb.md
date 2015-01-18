---
title: "Time-Series Databases and InfluxDB"
date: "2014-03-02"
url: /blog/2014/03/02/time-series-databases-influxdb/
categories:
  - Databases
---

Time-series databases are of particular interest to me these days. Not only is
[VividCortex](https://vividcortex.com/) working with large-scale time-series
data, but it's a growing trend in the technology world in general. What's
perhaps most surprising is the dearth of native time-series databases, either
commercial or opensource.

![No Time to Say Hello][1]

### The World is Time-Series

The data we gather is increasingly timestamped and dealt with in time-series
ways. For the last 10 years, I've worked with "roll-up" or "summary" tables
almost constantly. I built, and saw others build, the same types of solutions
over and over. For example, I probably consulted with over a dozen companies who
do search-engine marketing and advertising. Cost tables are a given, and there's
usually cost-per-ad-per-day and half a dozen other summary tables. In my case I
saw these things in the MySQL context, but you can pick your technology and
someone's trying to do time-series tasks on top of it.

<!--more-->

One of the problems you see in these situations is very limited flexibility. For
example, you can't run ad-hoc queries. You can only run queries that are
supported by your precomputed, predesigned summary tables.

Relational databases offer SQL, which is worlds better than key-value or other
low-level ways to access and manipulate large amounts of data in declarative
ways. But SQL's expressive power is very limited in the time-series domain.  I
think of the problem this way: relational tables grow "downwards" by adding
rows, and SQL is reasonably expressive for that. But time-series data is
different; a mental model of it is that rows are series identified by a primary
key, and they grow sideways, with the "wide rows" model being the most natural
fit. SQL can't help here.

### What's Commonly Done

Most of my experience has been in relational databases. As mentioned, these are
a poor choice because of SQL, but a row-oriented model also doesn't lend itself
well to time-series data. You end up building something that looks suspiciously
like an EAV (entity-attribute-value) model. It's either horribly inefficient,
with tons of repeated data, or it's a little more efficient but even more
difficult to query. In the MySQL world, some people have reported evaluating
[TokuDB][5], [InfiniDB][6], and others as replacements for stock MySQL and InnoDB. I have
evaluated these too and didn't find them to be feasible. Perhaps better in some
ways, but not good enough to solve the problem.

The SQL standard contains a time-series extension. I looked through it
a bit but wasn't impressed. It's also unimplemented. Vertica does offer some
[time-series extensions in their VSQL language][7] but it's essentially "a table is a
series" and I need to be able to express series as keys, not object names. I
also need to deal with arbitrarily large numbers of series -- millions,
currently.

"Native" time-series databases do exist, but I'm not happy with what's out
there. Older ones include RRD, Graphite's store (whisper), and similar. These
are very low-level and typically come with a lot of limitations. They don't
support things like joins, for example, where a time-series datasource might be
enriched with data from a dictionary or other related data.

The size of time-series data we want to work with today is also a big problem
(literally). Single-node databases have only a limited amount to offer us.
Anything more than a toy application needs a distributed database. RRD files are
not a good foundation for building this type of system.

More recently, people have tried to build time-series databases on top of
distributed NoSQL databases. Popular choices include HBase and Cassandra.
Examples include [OpenTSDB][9], [KairosDB][10], and [Acunu][8]. [TempoDB][11] is one commercial example.

This might be workable for some, but not for most people. Most people I've
talked to agree that HBase is not something they enjoy working with. The
consensus seems to be that it's great at ingesting large amounts of data, but
very hard to get good read performance. And many people have told me you need
someone with a lot of knowledge of its source code to run it well.

Cassandra seems to be much easier to run, but is very low-level (e.g. it does
not have an expressive query language; you end up writing a query planner and
executor into your application). I am certain that for my needs, Cassandra would
be highly inefficient due to the need to suck all the data out of the database
instead of pushing queries into it where they can run close to the data.

I have no production experience with either of these.

Another option is to look at NoSQL databases that are extensible enough to be
used as the foundation for a time-series database. Ones that seem interesting to
me are FoundationDB, Aerospike, and Hyperdex. I know Aerospike offers a limited
form of distributed querying through a map-reduce paradigm, using a Lua
interpreter that's embedded in the database. From what I understand, one would
ship a Lua script to the database as sort of a distributed stored procedure
call. This might be worth further inspection if that is a route you want to go.
FoundationDB offers "layers," but I am not sure that is as good a paradigm for
really pushing the computation to the data. I don't know enough about Hyperdex
yet. What seems useful to me about the databases mentioned in this paragraph is
that they offer things like true transactions and ordered key-value lookups,
which are requirements in my opinion; building a more sophisticated system on
top of low-level key-value operations really is a rat-hole if there isn't
ordering and transactional consistency.

### Time-Series Databases Under The Radar

Several databases are time-series but seem to fly "under the radar" in that they
don't market their time-series capabilities well.

[Druid][12] is one; it is time-series by nature. It doesn't have an expressive query
language *per se*, but it's not too hard to create the JSON that expresses its
queries. This is relatively friendly for machines to work with, too.

Two others that I don't know much about are the [Sky behavioral database][13] and
[SciDB][14]. The latter has a strange "feel" to me, sort of like the R language -- it
feels like it was built by people who don't know how a database should feel,
just as R was apparently designed by people who aren't programmers.

It is also possible that [BlinkDB][15] understands a time dimension, but I do
not know yet.

Commercial databases that have some notions of time-series include (from what I
know) SAP HANA and New Relic's Rubicon. I don't know much about details.

### Native Time-Series Databases

I started a secret mailing list last year after talking with dozens of people
who had a lot of expertise in the above areas. For example, I talked with people
who'd written custom in-house time-series databases that operate at very large
scale. I thought that maybe I could agitate for someone to start up a database
company with a chance at solving some of the problems with existing ones.

The biggest problem they all told me about was not technical at all. Sure --
there are problems with the volume of data, flexibility of storage format,
ability to scale horizontally across many machines and remain extremely highly
available and performant. But those are not the biggest problem.

The biggest problem is the query language. Without a query language, a company
must hire and keep on-staff a *developer* who can help express problems to the
database. Time after time people told me that they ended up with giant databases
and needed to run lots of ad-hoc queries or generate reports from them. Once a
time-series database becomes the system of record for important information, it
needs to be queried for everything from invoicing to analytics to
troubleshooting. In practice, larger companies end up with at least two fulltime
developers who write applications to produce answers from the database. These
are answers that the business/marketing/ops/whoever should be able to get
themselves by just running queries. As time passes, this is both a huge cost and
a bottleneck.

A native time-series database needs a native time-series query language.

What about SQL again? What if you use windowing functions and CTEs, for example?
It gets you part of the way there, but it's extremely awkward; the syntax is
at right angles to the intent.

About the time I was trying to make trouble on this mailing list, and jostle
someone into founding a startup, I bumped into one.

### Paul Dix and InfluxDB

[InfluxDB][3] is perhaps the best and most credible approach to the problem I've seen
thus far. It is natively time-series. It has a time-series query language that
looks a lot like SQL. This is a really big deal; millions of people know SQL and
can apply large parts of their existing skillset to a dialect of SQL that
expresses time-series concepts.

![InfluxDB][4]

The query language also has special features that will likely make it possible
to work with large numbers of series fluidly. By that, I mean a query that wants
to operate over a million series doesn't have to mention them all by name.
Pattern matching on series names is an important part of this.

InfluxDB is also a distributed database, so it isn't a single-node idea that
tries to bolt on clustering later.

It uses LevelDB as its underlying storage, which I have some doubts about.
I'm not sure LevelDB is really suited for time-series data. Unique characteristics of
time-series data include write-append-mostly, rare updates, sequential
reads, and occasional bulk deletes. The datastore needs to be optimized for all
of these, and LevelDB may not be up to the task. Fortunately, InfluxDB has a
pluggable storage model.

InfluxDB is young, but it's a promising start. If you're interested in learning
more, I am (through VividCortex) arranging for Paul Dix to visit Charlottesville
on March 25th to talk about it. The talk is open to the public and free.
Register [here][2].

[Picture credits](http://www.flickr.com/photos/brandoncwarren/4236278556/)

[1]: /media/2014/03/alice.jpg
[2]: http://www.eventbrite.com/e/paul-dix-building-influxdb-an-open-source-time-series-database-company-tickets-10708279753
[3]: http://influxdb.org/
[4]: /media/2014/03/influxdb.png
[5]: http://www.tokutek.com/products/tokudb-for-mysql/
[6]: http://infinidb.co/
[7]: https://my.vertica.com/docs/CE/6.0.1/HTML/index.htm#13389.htm
[8]: http://www.acunu.com/
[9]: http://opentsdb.net/
[10]: http://code.google.com/p/kairosdb/
[11]: https://tempo-db.com/
[12]: http://druid.io/
[13]: http://skydb.io/
[14]: http://scidb.org/
[15]: http://blinkdb.org/
