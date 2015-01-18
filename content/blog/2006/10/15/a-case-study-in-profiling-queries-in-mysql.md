---
title: A case study in profiling queries in MySQL
date: "2006-10-15"
url: /blog/2006/10/15/a-case-study-in-profiling-queries-in-mysql/
categories:
  - Databases
---
This is the second in a series of articles on profiling queries in MySQL. In this article I'll demonstrate the technique I described in the [first article][1].

I'm using 5.0.22-Debian_0ubuntu6.06.2-log for my tests.

### Example: re-index a table and measure the performance gain

I started with the following table, and an `INSERT` statement to populate it with a million rows of data. Aside from the fact that this data is all evenly distributed, this table and data are similar to some tables my coworkers and I redesigned earlier this year (see my article on [how to re-index a large database table][2]).

<pre>CREATE TABLE `tracking` (
  `id` int(11) NOT NULL auto_increment,
  `day` date NOT NULL,
  `ad` int(11) NOT NULL,
  `clicks` int(11) NOT NULL,
  `impressions` int(11) NOT NULL,
  `client` int(11) NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `ad` (`ad`,`day`),
  KEY `day` (`day`),
  KEY `client` (`client`)
) ENGINE=InnoDB;

insert into tracking(day, ad, clicks, impressions, client)
    select date_add('2006-01-01', interval a.i - 1 day),
        b.i,
        rand() * 100,
        rand() * 100,
        rand() * 20
    from numbers as a 
        cross join numbers as b
    where a.i &lt;= 1000 and b.i &lt;= 1000;</pre>

This table is designed with a surrogate key that isn't used at all, and prevents the table from being clustered day-first, which is how it tends to be queried. Here's a typical query for this data, which consistently takes 0.58 seconds to run on my machine:

<pre>select day, ad, sum(clicks), sum(impressions)
from tracking
where client = 11 and day between '2007-01-01' and '2007-01-31'
group by day;</pre>

### Step 1: Measure the query before re-indexing

I began by measuring the query against the table as currently designed. I ran `SHOW STATUS` once, ran the query, then ran `SHOW STATUS` twice more. I put all three sets of data into a spreadsheet, with columns titled `Before`, `After1`, and `Calibration`. I then added a column called `TotalCost`, whose formula is `After1 - Before - (Calibration - After1)`. You can read the first article for more on why I use this math to subtract out the effects of running `SHOW STATUS` itself.

I'll show you a synopsis of the data in a bit, but in case you're curious, [here's the raw data in CSV format][3].

### Step 2: Re-index and measure again

I re-indexed the table, removing the surrogate key and clustering on `day, ad`. Now I have the following table:

<pre>CREATE TABLE `tracking` (
  `day` date NOT NULL,
  `ad` int(11) NOT NULL,
  `clicks` int(11) NOT NULL,
  `impressions` int(11) NOT NULL,
  `client` int(11) NOT NULL,
  PRIMARY KEY  (`day`,`ad`),
  KEY `ad` (`ad`),
  KEY `client` (`client`)
) ENGINE=InnoDB;</pre>

The same query now consistently runs in two or three hundredths of a second. Here are the `SHOW STATUS` [numbers for the redesigned table][4].

### Just the important numbers

That's a lot of numbers to look at, so here's a synopsis of all the numbers that didn't come out to zero in both cases:

<table class="borders collapsed compact">
  <caption>Query Improvements from Table Redesign</caption> <tr>
    <th scope="col">
      Variable_name
    </th>
    
    <th scope="col">
      Design1
    </th>
    
    <th scope="col">
      Design2
    </th>
  </tr>
  
  <tr>
    <th scope="row">
      Com_select
    </th>
    
    <td>
      1
    </td>
    
    <td>
      1
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Created_tmp_tables
    </th>
    
    <td>
      1
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Handler_read_key
    </th>
    
    <td>
      1574
    </td>
    
    <td>
      2
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Handler_read_next
    </th>
    
    <td>
      49987
    </td>
    
    <td>
      31000
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Handler_read_rnd
    </th>
    
    <td>
      31
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Handler_read_rnd_next
    </th>
    
    <td>
      32
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Handler_update
    </th>
    
    <td>
      1540
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Handler_write
    </th>
    
    <td>
      31
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Innodb_buffer_pool_read_ahead_rnd
    </th>
    
    <td>
      3
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Innodb_buffer_pool_read_ahead_seq
    </th>
    
    <td>
      169
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Innodb_buffer_pool_read_requests
    </th>
    
    <td>
      205242
    </td>
    
    <td>
      3969
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Innodb_buffer_pool_reads
    </th>
    
    <td>
      86
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Innodb_data_read
    </th>
    
    <td>
      46153728
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Innodb_data_reads
    </th>
    
    <td>
      265
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Innodb_pages_read
    </th>
    
    <td>
      2817
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Innodb_rows_read
    </th>
    
    <td>
      49987
    </td>
    
    <td>
      31001
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Questions
    </th>
    
    <td>
      1
    </td>
    
    <td>
      1
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Select_range
    </th>
    
    <td>
    </td>
    
    <td>
      1
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Sort_rows
    </th>
    
    <td>
      31
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Sort_scan
    </th>
    
    <td>
      1
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Table_locks_immediate
    </th>
    
    <td>
      1
    </td>
    
    <td>
      1
    </td>
  </tr>
</table>

I gave a high-level, hand-waving overview of interpreting results in my previous article, because there's just too much to go over in one article. Hopefully you can sink your teeth into this example. For example, you can see the first design created a temporary table for some reason, made more index reads, made lots more requests to the buffer pool, and read a lot more bytes of data. What's going on here?

As I mentioned in the first article, it really helps to

1.  time the query (been there, done that: 0.03 seconds versus 0.58)
2.  `EXPLAIN` the query

The `EXPLAIN` is the missing link here. Here it is:

<pre>*************************** Design 1
           id: 1
  select_type: SIMPLE
        table: tracking
         type: ref
possible_keys: day,client
          key: client
      key_len: 4
          ref: const
         rows: 59898
        Extra: Using where; Using temporary; Using filesort

*************************** Design 2
           id: 1
  select_type: SIMPLE
        table: tracking
         type: range
possible_keys: PRIMARY,client
          key: PRIMARY
      key_len: 3
          ref: NULL
         rows: 46284
        Extra: Using where</pre>

The query against the first table required a temporary table and filesort. It scanned the `client` key and did bookmark lookups to the clustered index. The second query just scanned a range of the clustered index. Armed with this knowledge, look back at the actual numbers; it's pretty amazing how much extra work is caused in the first case by having to navigate a secondary index and then a clustered index. The most dramatic difference is how the InnoDB buffer pool is used. Here are some highlights:

*   The first query made 50 times the requests to the buffer pool.
*   The first query had to go to disk 86 times to satisfy a buffer pool read request, but the second query never had a buffer pool miss at all.
*   The first query needed to read 62% more rows, because it had to shotgun through the whole table looking for data.
*   The first query had to make more than a thousand times as many key reads as the second.

I want to point out that the number of times a buffer pool read request could be satisfied without going to disk -- every time in the second query -- is really important. It means the first query kept requesting data that turned out not to be in memory, whereas the second query kept requesting data and it was already in memory. Why is this? Well, the second query was confined to a contiguous range of the disk, so once that range was read into memory, it stayed there. The first query had to keep requesting blocks from every part of the table, and they couldn't all fit in the buffer pool, so some of them were getting pushed out and re-read later. How much did this happen? About 44 MiB, according to `Innodb_data_read`. Remember, even if you have to get just one row, InnoDB reads an entire block from disk, which may be really inefficient -- the size of a row divided by 16,384 bytes per block.

I hope you agree that's much more concrete and useful than comparing execution time. Armed with this knowledge, you can understand which optimizations really make a difference.

### One really strange result

One thing I didn't show you about those two queries was the value of `Last_query_cost`. That's because it showed the slower, more data-intensive query actually having a *lower* cost than the faster one: <table class="borders collapsed compact">
  <caption>Last Query Cost in Table Redesign</caption> <tr>
    <th scope="col">
      Variable_name
    </th>
    
    <th scope="col">
      Design1
    </th>
    
    <th scope="col">
      Design2
    </th>
  </tr>
  
  <tr>
    <th scope="row">
      Last_query_cost
    </th>
    
    <td>
      20343.599000
    </td>
    
    <td>
      71039.632551
    </td>
  </tr>
</table>

That's pretty bizarre, isn't it? I don't know how the query cost is calculated; I believe the optimizer calculates it in advance of actually executing the query. It definitely doesn't match the actual cost of executing these queries. It is usually more in line with the true cost, but not always. You should not rely on it absolutely.

### Conclusion

The example I gave should make it pretty clear how much you can measure about query performance -- execution time is only one data point. In the third article in this series, I'll take the wraps off a shiny new tool that can do all this tedious math for you in the blink of an eye. Stay tuned.

 [1]: http://www.xaprb.com/blog/2006/10/12/how-to-profile-a-query-in-mysql/
 [2]: http://www.xaprb.com/blog/2006/06/14/how-to-re-index-a-large-database-table/
 [3]: http://www.xaprb.com/media/2006/10/status-before-indexing.csv
 [4]: http://www.xaprb.com/media/2006/10/status-after-indexing.csv
