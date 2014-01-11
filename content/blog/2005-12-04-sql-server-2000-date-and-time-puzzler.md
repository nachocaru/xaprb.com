---
title: SQL Server 2000 date and time puzzler
permalink: /2005/12/04/sql-server-2000-date-and-time-puzzler/
---
This article explains how comparing DATETIME and SMALLDATETIME values in SQL Server 2000 can introduce subtle bugs. I recently ran into a puzzling situation, which *seemed* like a bug in SQL Server 2000, but was in fact my fault. Even my sharpest colleagues were stumped. In fact, it turned out to be a fairly simple mistake.

The symptom was rows missing from a result. The problem was implicit data type casts.

### The setup

<pre>declare @start smalldatetime, @end smalldatetime, @now datetime
set @now = getdate()
set @start = convert(char(10), @now, 126)
set @end = dateadd(day, 1, @start)

create table #offer (
    ident int identity not null,
    startdate smalldatetime,
    enddate smalldatetime
)

insert into #offer (startdate, enddate) values (null, null)
insert into #offer (startdate, enddate) values (@start, null)
insert into #offer (startdate, enddate) values (null, @end)
insert into #offer (startdate, enddate) values (@start, @end)</pre>

### The query and explanation

Here's the query:

<pre>select * from #offer
    where @now between isnull(startdate, @now) and isnull(enddate, @now)</pre>

The table contains special offers, whose start/end date can be either specified or not (the offer is open-ended). I have inserted a row for each possible case of specified/open-ended. I wrote the select statement to select rows where the offer is valid, i.e. the current date is between the start and end dates. The problem was, only some rows were being selected. Run the code yourself and see. If you get all the rows, run the query again. This problem is non-deterministic &#8212; it depends on the current time, which makes it even worse.

This is actually correct behavior, and the reason has to do with the semantics of `ISNULL`. The `ISNULL` return type is the data type of its first argument &#8212; in this case, a `SMALLDATETIME`. So when the column is `NULL`, `@now` gets cast to `SMALLDATETIME`, losing precision down to the minute.

To illustrate, let's evaluate the query by hand, using one of the excluded rows, for example the one with both date columns `NULL`. Supposing `@now's` value is `'2005-12-02 08:55:42.807'`, the `WHERE` clause becomes

<pre>where '2005-12-02 08:55:42.807' between '2005-12-02 08:56:00' and '2005-12-02 08:56:00'</pre>

Obviously that clause is false, so the row won't get included in the results.

The moral of the story is **use matching data types**. Implicit conversions can really bite you in the back.

### `ISNULL` and `COALESCE`

`COALESCE` doesn't cause this same behavior, because it converts all arguments to the same datatype, and the implicit conversion between `SMALLDATETIME` and `DATETIME` is to greater precision, not less. That's a subtle difference between `ISNULL` and `COALESCE`. 
### Indexing problems

Something else is wrong with the query. The `ISNULL` function will defeat the query optimizer's ability to use any indexes that might exist on the date columns, causing a table scan. It is less human-readable, but better for the query optimizer, to write the `WHERE` clause as a compound boolean statement:

<pre>... where (startdate is null or startdate &lt;= @now)
    and (enddate is null or enddate &gt;= @now)</pre>
