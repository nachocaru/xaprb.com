---
title: Comparison of table sync algorithms
date: "2007-03-30"
url: /blog/2007/03/30/comparison-of-table-sync-algorithms/
categories:
  - Databases
---
I've been working on [how to efficiently compare and synchronize data between two tables on different MySQL servers][1]. I've also been working on a tool, sort of like [rsync for database tables][2], which implements both algorithms. I [profiled][2] it to see how well the comparison algorithms work on real data. This article is about the results.

### The data and profiling results

I used a sample of real data from a production database. It's fairly simple -- just a bunch of numbers and timestamps, 13 columns in all. The primary key is an integer, and there is a secondary index on another two columns, which makes it a good candidate for a three-stage drilldown via the top-down algorithm. There are exactly 50,000 rows in the sample I used, and the indexes and data come to just over 8MB in an InnoDB table.

For the tests, I created two copies of the data on the same server, and then changed one of the tables in four different ways. I deleted five rows randomly, 500 rows randomly, and where col2=60, which is 11,424 rows. Finally, I randomly incremented col6 in one row. These are the kinds of data corruptions I see on this table in production.

I ran these tests on a Dell Inspiron 5000 laptop with a 500MHz processor from 1999. Don't pay attention to the absolute numbers, as I'm sure you will not be serving data from a laptop whose circuitry starts to screech when it displays an animated cursor (yes, that does happen&#8230;).

You can [download the test data and the profiling results (1.4MB)][3] if you wish.

The following table shows some key statistics from the profiling. 'td' stands for top-down and 'bu' stands for bottom-up, which are the two algorithms I'm comparing here.

<table class="borders collapsed">
  <tr>
    <th>
      Test
    </th>
    
    <th colspan="2">
      Delete 5
    </th>
    
    <th colspan="2">
      Delete 500
    </th>
    
    <th colspan="2">
      Delete chunk
    </th>
    
    <th colspan="2">
      Change 1
    </th>
  </tr>
  
  <tr>
    <th>
    </th>
    
    <th>
      bu
    </th>
    
    <th>
      td
    </th>
    
    <th>
      bu
    </th>
    
    <th>
      td
    </th>
    
    <th>
      bu
    </th>
    
    <th>
      td
    </th>
    
    <th>
      bu
    </th>
    
    <th>
      td
    </th>
  </tr>
  
  <tr>
    <th>
      Time
    </th>
    
    <td style="text-align:right">
      17.9
    </td>
    
    <td style="text-align:right">
      4.8
    </td>
    
    <td style="text-align:right">
      17.6
    </td>
    
    <td style="text-align:right">
      9.9
    </td>
    
    <td style="text-align:right">
      28.7
    </td>
    
    <td style="text-align:right">
      3.3
    </td>
    
    <td style="text-align:right">
      16.5
    </td>
    
    <td style="text-align:right">
      4.1
    </td>
  </tr>
  
  <tr>
    <th>
      Queries
    </th>
    
    <td style="text-align:right">
      43
    </td>
    
    <td style="text-align:right">
      27
    </td>
    
    <td style="text-align:right">
      532
    </td>
    
    <td style="text-align:right">
      1398
    </td>
    
    <td style="text-align:right">
      11456
    </td>
    
    <td style="text-align:right">
      5
    </td>
    
    <td style="text-align:right">
      33
    </td>
    
    <td style="text-align:right">
      7
    </td>
  </tr>
  
  <tr>
    <th>
      Bytes in
    </th>
    
    <td style="text-align:right">
      6401
    </td>
    
    <td style="text-align:right">
      12160
    </td>
    
    <td style="text-align:right">
      81876
    </td>
    
    <td style="text-align:right">
      480253
    </td>
    
    <td style="text-align:right">
      1731440
    </td>
    
    <td style="text-align:right">
      2644
    </td>
    
    <td style="text-align:right">
      5769
    </td>
    
    <td style="text-align:right">
      3508
    </td>
  </tr>
  
  <tr>
    <th>
      Bytes out
    </th>
    
    <td style="text-align:right">
      201347
    </td>
    
    <td style="text-align:right">
      374911
    </td>
    
    <td style="text-align:right">
      4788402
    </td>
    
    <td style="text-align:right">
      2923129
    </td>
    
    <td style="text-align:right">
      13361407
    </td>
    
    <td style="text-align:right">
      1574241
    </td>
    
    <td style="text-align:right">
      51633
    </td>
    
    <td style="text-align:right">
      221409
    </td>
  </tr>
  
  <tr>
    <th>
      Reads
    </th>
    
    <td style="text-align:right">
      204619
    </td>
    
    <td style="text-align:right">
      145441
    </td>
    
    <td style="text-align:right">
      300052
    </td>
    
    <td style="text-align:right">
      235810
    </td>
    
    <td style="text-align:right">
      289128
    </td>
    
    <td style="text-align:right">
      114346
    </td>
    
    <td style="text-align:right">
      201358
    </td>
    
    <td style="text-align:right">
      122872
    </td>
  </tr>
  
  <tr>
    <th>
      Rows sorted
    </th>
    
    <td style="text-align:right">
      4315
    </td>
    
    <td style="text-align:right">
      725
    </td>
    
    <td style="text-align:right">
      256
    </td>
    
    <td style="text-align:right">
      32592
    </td>
    
    <td style="text-align:right">
      256
    </td>
    
    <td style="text-align:right">
    </td>
    
    <td style="text-align:right">
      1058
    </td>
    
    <td style="text-align:right">
      4
    </td>
  </tr>
  
  <tr>
    <th>
      Inserts
    </th>
    
    <td style="text-align:right">
      100253
    </td>
    
    <td style="text-align:right">
    </td>
    
    <td style="text-align:right">
      99758
    </td>
    
    <td style="text-align:right">
    </td>
    
    <td style="text-align:right">
      88834
    </td>
    
    <td style="text-align:right">
    </td>
    
    <td style="text-align:right">
      100258
    </td>
    
    <td style="text-align:right">
    </td>
  </tr>
  
  <tr>
    <th>
      Log writes
    </th>
    
    <td style="text-align:right">
      22423
    </td>
    
    <td style="text-align:right">
    </td>
    
    <td style="text-align:right">
      22359
    </td>
    
    <td style="text-align:right">
    </td>
    
    <td style="text-align:right">
      19879
    </td>
    
    <td style="text-align:right">
    </td>
    
    <td style="text-align:right">
      22438
    </td>
    
    <td style="text-align:right">
    </td>
  </tr>
  
  <tr>
    <th>
      Bookmark lookup
    </th>
    
    <td style="text-align:right">
      46
    </td>
    
    <td style="text-align:right">
      82
    </td>
    
    <td style="text-align:right">
      1026
    </td>
    
    <td style="text-align:right">
      4562
    </td>
    
    <td style="text-align:right">
      22874
    </td>
    
    <td style="text-align:right">
      10
    </td>
    
    <td style="text-align:right">
      32
    </td>
    
    <td style="text-align:right">
      18
    </td>
  </tr>
</table>

### Analysis

In most cases, the top-down algorithm outperforms the bottom-up. The case where it doesn't is if there's a lot of corruption scattered randomly through the table. It is especially good at detecting the large chunk of missing rows in the third test -- it terminates in just a few queries instead of eleven thousand. This is as I predicted several weeks ago.

The top-down approach is a fair amount faster than the bottom-up on this data, and as long as only a small number of rows are bad, ought to issue a comparable number of queries. It ends up causing fewer reads than bottom-up also. Surprisingly, it's actually more network-efficient when the number of corrupt rows increases; in the case where 500 rows are bad, it moves about half as much data over the network as bottom-up. I attribute this to it being able to use the drill-down and tree-pruning strategies to good advantage. Or, if you look at it another way, the bottom-up algorithm tends to have fairly predictable costs, while the top-down costs vary depending on the nature of the corruption.

There is one caveat. I have benchmarked the "find differences" aspect of the tool here, but the tool is written to fetch the bad rows over the network in anticipation of fixing them. That's why the top-down algorithm fetches 1.5 MB over the network in the third test. It actually only needs to fetch a few kB over the network to find the differences; the 1.5 MB is it retrieving the rows it will need to insert to sync the second table. The same note applies to the number of rows read.

### Conclusions

These results are encouraging. They tell me that I've designed a good algorithm for fixing slaves that drift, and they reinforced my belief that the two algorithms are highly effective for different scenarios.

 [1]: /blog/2007/03/05/an-algorithm-to-find-and-resolve-data-differences-between-mysql-tables/
 [2]: http://code.google.com/p/maatkit
 [3]: http://www.xaprb.com/articles/table-sync-profiles.tar.gz
