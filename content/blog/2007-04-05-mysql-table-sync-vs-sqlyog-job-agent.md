---
title: MySQL Table Sync vs. SQLyog Job Agent
date: "2007-04-05"
url: /blog/2007/04/05/mysql-table-sync-vs-sqlyog-job-agent/
categories:
  - Databases
---
When I wrote my first article on [algorithms to compare and synchronize data between MySQL tables][1], Webyog's Rohit Nadhani left a comment on the article mentioning the SQLyog Job Agent, which has a similar function. Although I have been developing [MySQL Table Sync][2] essentially in isolation, I have been meaning to give SQLyog Job Agent a try. I recently did so, and then followed that up with an email conversation with Rohit. This article is about my experience using the SQLyog Job Agent from the command line, some thoughts on the algorithm as best I can deduce it, and benchmark results against MySQL Table Sync.

### Description of SQLyog Job Agent

[SQLyog Job Agent (SJA)][3] is part of the SQLyog suite of tools. It is not designed as a stand-alone command-line tool, but is meant to execute jobs created by the SQLyog GUI tool. I have not yet tried the GUI, as I'm mostly a command-line user. (However, I know many people who use the GUI tool every day).

Since the jobs SJA executes are created by the GUI, there's not much documentation for the command-line tool. It has no help output, but it wasn't hard to create a sync .xml file by examining the included samples.

There is no changelog for SJA alone, but Rohit pointed me to the [FAQ entry for SQLyog][4] overall. The earliest mention I can find is October of 2003.

### My experience using SJA

I downloaded version 5.27 of SJA on April 2, noticed some potential issues with it, and contacted Rohit to discuss those. I saw it was issuing the statements to resolve differences in a sequence that would cause problems -- `DELETE`, `INSERT`, `UPDATE`. Indeed, I browsed the help forums and saw this order of operations was an attempt to fix problems caused by syncing in the order `INSERT`, `UPDATE`, `DELETE`:

<blockquote cite="http://www.webyog.com/forums/index.phpshowtopic=3135">
  <p>
    We recently changed the order of operation for DATASYNC from INSERT -> DELETE -> UPDATE to DELETE -> INSERT -> UPDATE. That can be confusing (rows will be deleted and next inserted), but in the end data should come there.
  </p>
</blockquote>

There can still be problems even with the new order of operations, and I saw strange behavior in the sync jobs I ran. For example, to sync a table that was merely missing 500 rows, it was deleting 103 rows and then inserting 603, instead of just inserting 500. I asked Rohit about this, and he confirmed it was a bug that was fixed in version 5.28:

> This algorithm was introduced for a very small period of time to handle "live" changes on a source table during sync of that table. Now we have changed it to update/delete/update. Update includes both INSERTs and UPDATEs. You should download 5.28 and try.
> 
> The extra phase for update is required only if you choose to delete "Extra rows from the target". Consider this situation: After updating the target in Phase-I, we want to find out extra rows in the target. During this period, a source row changes. The target assumes that this data is "extra" and delete it from itself. So you might land up with an "non-synced" dataset most of the times in a live database.

I must have downloaded 5.27 only a few hours before 5.28 was available. In any case, I re-downloaded (it's just over 1MB -- not large) and as Rohit promised, the issues I saw were gone.

I also mentioned some other minor things I saw in the query log output, such as possibly redundant queries, and Rohit indicated those would be fixed in the next version.

### SQLyog Job Agent's sync algorithm

I would never reverse engineer a closed-source application, but peeking in the query log is fair game! I found most queries fairly straightforward. SJA finds differences with checksum queries, which appear to be inspired by [Giuseppe Maxia's work on remote database comparison in 2004][5]. Here's a typical query, abbreviated to fit on the page:

<pre>select  left(concat(IF(`col1`&lt;0,'-','+'), lpad(abs(`col1`),9,'0')),4),
   concat(
      sum(conv(substring(md5(concat_ws(",",[all columns])),1,8),16,10)),
      sum(conv(substring(md5(concat_ws(",",[all columns])),9,8),16,10)),
      sum(conv(substring(md5(concat_ws(",",[all columns])),17,8),16,10)),
      sum(conv(substring(md5(concat_ws(",",[all columns])),25,8),16,10))
   )as hashkey,
   count(*)as yog_cnt, `col1`
from test2
group by 1 order by 2</pre>

Here are the first few rows resulting from that query on my test data set:

<pre>+------+------------------------------------------------------+---------+-----------+
| [..] | hashkey                                              | yog_cnt | col1      |
+------+------------------------------------------------------+---------+-----------+
| +411 | 1034880993212471840918027163413727068358             |       1 | 411149050 | 
| +100 | 10388239781124433886971298309216711174110863         |       6 | 100356640 | 
| +483 | 104843946004106862890734106456706210129920770876     |      49 | 483694780 | 
| +284 | 10504012808811182574082112225135699596455074096      |      51 | 284017580 | 
| +368 | 1054403046550107382218321910460918668291081851629911 |     489 | 368027560 | 
+------+------------------------------------------------------+---------+-----------+</pre>

As SJA finds differences between the tables, it adds `WHERE` clauses to the checksum query, narrowing the range of rows by limiting the upper and lower boundaries of the rows that are being checksummed. Here's a typical `WHERE` clause:

<pre>where   `col1` >= 219000000 and `col1` &lt; 220000000</pre>

In subsequent queries SJA also increases the size of the substring it takes on the first column, from 4 to 7 to 10 leftmost characters. If you ignore the sign digit, this means it is narrowing the grouping by 10<sup>3</sup> rows each time, or in other words grouping the current working set into a maximum of 1000 groups. This is very similar to [the algorithm I proposed in my first article][1], as a fallback mechanism when the DBA cannot use an index to design a grouping strategy.

Beyond this, SJA seems to do the kinds of queries you'd expect a sync tool to issue.

### Potential weaknesses in SQLyog Job Agent's checksums

I've worked hard to design a very strong checksum algorithm for MySQL Table Sync to detect when rows have changed. I've spent many hours consulting with several experts, including someone who studied applied statistics for a PhD at MIT. After nearly a month of work on this algorithm, I was eager to see the SJA checksum algorithm.

SJA slices the base-16 checksum into four strings 8 characters long, converts those into base 10, and sums them over the group. It then concatenates the resulting four integers together to form a single string of digits. This represents the "checksum" of the group of rows.

There are a couple theoretical weaknesses with in this approach. `SUM()` is commutative, so the order of the rows in a group is immaterial, which is a good thing. However, it might be possible to overflow a `BIGINT` with the `SUM()` over a large group. This seems unlikely, but 8 hex digits is 32 bits, and since `BIGINT` math is signed for aggregate functions in MySQL (except for the bitwise functions), that leaves 31 bits of headroom, which is just over 2 billion. Lots of people have tables with more than 2 billion rows. Granted, you still wouldn't overflow unless every value in the set was FFFFFFFF, but who knows what might happen, especially if you have many more rows.

The next potential problem is the law of large numbers. Using `SUM()` increases the likelihood of a collision. It changes the distribution of numbers from pseudo-random over the range to a normal distribution -- the familiar bell curve. Certain numbers will be more likely to occur than others, and this likelihood increases as the set grows.

Finally, string concatenation of base-ten digits discards the most significant digits. If you convert the four sliced hex strings to base ten and they end up being 1, 2, 3, and 4, and then you concatenate them, you get 1234. But the sum of the checksum is not 1234; it is 1*16<sup>24</sup> + 2*16<sup>16</sup> + 3*16<sup>8</sup> + 4*16<sup></sup>. This truncates the full 128-bit range of `MD5()`.

Rohit responded to my concern:

> Yes, there are chances of collisions. I did the math 3 years back(when I had designed the algo.). I don't remember exact details, but the chances of collision are extremely rare. Of course, it is not as good as a "pure" MD5. In the last 3 years of selling this (a vast majority of our 8000+ paid customers use it), we have not encountered any cases where collisions have been an issue.

I believe collisions would be undetectable, but I don't really know how SJA works inside (tangent: I keep wondering if there's a way to use something like the accounting trick of differences divisible by nine to help see which rows are bad without doing so many grouped queries). Perhaps there is a way to know when there has been a collision. In any case, I checked the tables with [MySQL Table Checksum][2] after syncing, and they were correctly synced.

For what it's worth, MySQL Table Sync's algorithm doesn't have these theoretical weaknesses.

### Performance analysis of SQLyog Job Agent's queries

Before I benchmarked SJA against MySQL Table Sync, I took a few minutes to analyze the queries it uses. It looks to me like there may be some room for optimization. There are several full table scans, some of which might be combined (for example, the initial `COUNT(*)` and `MAX(CHARLEN())`. However, these are one-off queries; the real place to optimize is in the repeated queries.

I believe the checksum query could be optimized to do only one call to `MD5()` per row, instead of four. I don't think MySQL recognizes the `MD5()` sub-expression as something whose value can be re-used instead of calling again. Can anyone confirm this?

The `GROUP BY` and `ORDER BY` clauses also don't use indexes. I believe a little rewriting could get them to use the primary key, which would avoid a temporary table and filesort.

### Benchmark method and results

I did an informal benchmark of SQLyog Job Agent and MySQL Table Sync, whose results I should stress are *not scientific*. Since I already had a realistic data set for [the benchmarks I ran last week][6], I just re-used that. You can download the [sample data][7] I used, and the [full benchmark results and scripts I used to run the benchmark][8].

I ran the benchmark on my laptop, which is so old and slow you can literally hear the circuits make noise when there is a context switch. It has plenty of memory, but not much of anything else! I am using Ubuntu 6.10 and the MySQL version is 5.0.24a-Debian_9ubuntu2-log. One consequence of running the benchmark on a single computer is that I/O becomes sequential for both tools, whereas SJA should be able to take advantage of asynchronous I/O if it is communicating with two different servers.

I used mostly the same queries as in my previous benchmark. The table has 50,000 rows, and in subsequent tests I deleted a random 5 rows from the destination, then 500 rows, then updated 1 row, then deleted all rows where col2 = 60 (as before, it's 11,424 rows), and finally deleted all col2=60 rows from the source instead of the destination. These are the same scenarios I ran in my earlier benchmarks, except the last which is new.

I used [MySQL Query Profiler][2] to measure the server activity and elapsed time. The file "commands.txt" included in the aforementioned download is the input I sent to mysql-query-profiler. (I used a new feature I added to the profiler, which I have not yet packaged and released).

The following is a summary of the benchmark results. SJA means SQLyog Job Agent, and MTS means MySQL Table Sync:

<table class="borders collapsed compact">
  <caption>Benchmark Results</caption> <tr>
    <td>
      &nbsp;
    </td>
    
    <th colspan="2">
      Delete 5
    </th>
    
    <th colspan="2">
      Delete 500
    </th>
    
    <th colspan="2">
      Delete Chunk
    </th>
    
    <th colspan="2">
      Change 1
    </th>
    
    <th colspan="2">
      Delete Chunk
    </th>
  </tr>
  
  <tr>
    <td>
    </td>
    
    <th>
      SJA
    </th>
    
    <th>
      MTS
    </th>
    
    <th>
      SJA
    </th>
    
    <th>
      MTS
    </th>
    
    <th>
      SJA
    </th>
    
    <th>
      MTS
    </th>
    
    <th>
      SJA
    </th>
    
    <th>
      MTS
    </th>
    
    <th>
      SJA
    </th>
    
    <th>
      MTS
    </th>
  </tr>
  
  <tr>
    <th>
      Time
    </th>
    
    <td style="text-align:right">
      67
    </td>
    
    <td style="text-align:right">
      17
    </td>
    
    <td style="text-align:right">
      95
    </td>
    
    <td style="text-align:right">
      40
    </td>
    
    <td style="text-align:right">
      145
    </td>
    
    <td style="text-align:right">
      58
    </td>
    
    <td style="text-align:right">
      68
    </td>
    
    <td style="text-align:right">
      14
    </td>
    
    <td style="text-align:right">
      128
    </td>
    
    <td style="text-align:right">
      13
    </td>
  </tr>
  
  <tr>
    <th>
      Bytes In
    </th>
    
    <td style="text-align:right">
      22416
    </td>
    
    <td style="text-align:right">
      14019
    </td>
    
    <td style="text-align:right">
      959541
    </td>
    
    <td style="text-align:right">
      660240
    </td>
    
    <td style="text-align:right">
      7530599
    </td>
    
    <td style="text-align:right">
      3325356
    </td>
    
    <td style="text-align:right">
      9791
    </td>
    
    <td style="text-align:right">
      4172
    </td>
    
    <td style="text-align:right">
      5313711
    </td>
    
    <td style="text-align:right">
      2909
    </td>
  </tr>
  
  <tr>
    <th>
      Bytes Out
    </th>
    
    <td style="text-align:right">
      312668
    </td>
    
    <td style="text-align:right">
      383713
    </td>
    
    <td style="text-align:right">
      3575005
    </td>
    
    <td style="text-align:right">
      2968327
    </td>
    
    <td style="text-align:right">
      11998535
    </td>
    
    <td style="text-align:right">
      1730543
    </td>
    
    <td style="text-align:right">
      110347
    </td>
    
    <td style="text-align:right">
      229229
    </td>
    
    <td style="text-align:right">
      3325058
    </td>
    
    <td style="text-align:right">
      89128
    </td>
  </tr>
  
  <tr>
    <th>
      Rows Sorted
    </th>
    
    <td style="text-align:right">
      4637
    </td>
    
    <td style="text-align:right">
      725
    </td>
    
    <td style="text-align:right">
      44412
    </td>
    
    <td style="text-align:right">
      32592
    </td>
    
    <td style="text-align:right">
      18916
    </td>
    
    <td style="text-align:right">
    </td>
    
    <td style="text-align:right">
      1640
    </td>
    
    <td style="text-align:right">
      4
    </td>
    
    <td style="text-align:right">
      23597
    </td>
    
    <td style="text-align:right">
    </td>
  </tr>
  
  <tr>
    <th>
      Filesorts
    </th>
    
    <td style="text-align:right">
      24
    </td>
    
    <td style="text-align:right">
    </td>
    
    <td style="text-align:right">
      980
    </td>
    
    <td style="text-align:right">
    </td>
    
    <td style="text-align:right">
      5522
    </td>
    
    <td style="text-align:right">
    </td>
    
    <td style="text-align:right">
      10
    </td>
    
    <td style="text-align:right">
    </td>
    
    <td style="text-align:right">
      5584
    </td>
    
    <td style="text-align:right">
    </td>
  </tr>
  
  <tr>
    <th>
      Bookmark Lookup
    </th>
    
    <td style="text-align:right">
      309598
    </td>
    
    <td style="text-align:right">
      82
    </td>
    
    <td style="text-align:right">
      398251
    </td>
    
    <td style="text-align:right">
      4572
    </td>
    
    <td style="text-align:right">
      350432
    </td>
    
    <td style="text-align:right">
      10
    </td>
    
    <td style="text-align:right">
      301988
    </td>
    
    <td style="text-align:right">
      20
    </td>
    
    <td style="text-align:right">
      325477
    </td>
    
    <td style="text-align:right">
      10
    </td>
  </tr>
</table>

You can see MySQL Table Sync performs somewhat better overall on this data set, and sometimes performs much better. Overall it runs in about 28% the time, doing about 28% as much I/O and sorting only 36% as many rows. I don't want to speculate too much, but it seems to me that most of the difference is probably the reduced I/O, with more efficient queries a distant second. I designed MySQL Table Sync to be network-efficient, so this result does not surprise me.

### Miscellaneous thoughts

SJA and MySQL Table Sync are not really designed for the same purposes. Though both can sync data between remote tables, MySQL Table Sync is explicitly designed for network efficiency and guaranteed consistency when syncing, even while the server is being used. I'm not done with it yet, but it already has a variety of options a smart DBA can use to sync tables -- especially on replication slaves that have become corrupt -- more efficiently than a generic algorithm that applies to all table structures. As far as I know, SJA doesn't offer these features. On the other hand, it can do a lot of things MySQL Table Sync cannot, such as sync schema differences as well as data differences. To some extent then, this comparison is apples to oranges.

For example, I'm not sure exactly how the SJA does its deletes, inserts and updates, but I believe the only order of operations that's correct in every case is DELETE, UPDATE, INSERT. But perhaps there are other considerations when you are doing more complicated types of syncing, such as two-way syncs. I don't know any way to guarantee a point-in-time consistent two-way sync on tables that are being written to on both servers. I suspect SJA cannot guarantee this level of consistency either. My goals are a little different; I'd prefer to do a simpler task with a guarantee of consistency than a two-way sync with potential for inconsistency (you can always run MySQL Table Sync twice to do a two-way sync).

Rohit was very kind to spend time discussing SQLyog Job Agent over email with me, and I appreciate Webyog very much for their contributions to the MySQL community and to open source, so I was careful to ask permission to write this article. That's not something I'd normally do, but since I'm peeking into the query log of a commercial product, analyzing it, and benchmarking it I wanted to be respectful and err on the side of caution. If Rohit had expressed any discomfort with me discussing SJA I probably wouldn't have written this. In response to me asking "Is there anything you would like me to avoid writing about," Rohit wrote:

> Nothing in particular. My only concern is that the usability should not be judged by the command line usage. Another thing that I would like to highlight is that SJA communicates with servers in different threads so the database communication time is not "added" up!

Both points are well put. I was initially surprised that there's no command-line help for SJA, but once I understood that it's not meant to be stand-alone, it made sense to me. And SJA's asynchronous I/O is a very smart design; my choice of Perl as a programming language has necessarily limited, or made more difficult, these kinds of optimizations.

### Conclusion

I found [SQLyog Job Agent][3] to be a well-rounded tool for syncing data between MySQL tables. Though not designed purely as a stand-alone tool, once I figured out the XML job file format, it was easy to use. My analysis showed me some areas where there's theoretically a possibility of incorrectly syncing data, but I never observed that happening. I ran some unscientific benchmarks and found that my design for [MySQL Table Sync][2] is several times more efficient *for my test case* in terms of network I/O, which seems to be the major contributor to the time it takes to sync tables.

 [1]: http://www.xaprb.com/blog/2007/03/05/an-algorithm-to-find-and-resolve-data-differences-between-mysql-tables/
 [2]: http://code.google.com/p/maatkit
 [3]: http://www.webyog.com/en/downloads.php
 [4]: http://www.webyog.com/faq/33_7_en.html
 [5]: http://www.perlmonks.org/?node_id=381053
 [6]: http://www.xaprb.com/blog/2007/03/30/comparison-of-table-sync-algorithms/
 [7]: http://www.xaprb.com/media/2007/03/table-sync-profiles.tar.gz
 [8]: http://www.xaprb.com/media/2007/03/sqlyog-vs-mysql-table-sync.tar.gz
