---
title: How fast is MySQL Table Checksum?
date: "2007-05-12"
permalink: /2007/05/12/how-fast-is-mysql-table-checksum/
---
A few people have asked me how fast [MySQL Table Checksum][1] is. As with so many other things, it depends. This article shows how long it takes to checksum real data on a production server I help manage, which might give you a rough idea of how long it'll take on your servers.

### The server and workload

This server is a replication master running MySQL 5.0.38. It is a Dell Poweredge 1800 series with dual Xeon 3.4GHz processors and 2GB RAM, with three 15K SCSI hard drives in a RAID5 configuration. It serves about 40GB of data in InnoDB tables and about 25GB in MyISAM.

I can't say too much about the workload, but I'll tell you what I can. At the time I ran these checksums, it was running many rollup and `LOAD DATA INFILE` queries on the tables I checksummed. These tend to do a lot of updates, deletes, and inserts. There are also several processes that `REPLACE` or `INSERT.. ON DUPLICATE KEY UPDATE` large parts of certain tables which are in the 2-8GB range. At the same time, there are processes running rapid-fire single-row lookups and `GROUP BY` queries against all or part of these tables. And certain other larger-than-memory tables elsewhere in the server were being updated too, probably flushing the cache.

In other words, these results are under heavy load, and not scientific or repeatable at all (there was definitely heavier load on some of the test runs than others). But it gives you an idea. Your mileage may vary.

### The results

The following table shows the number of seconds it took to checksum several heavily-used InnoDB tables with various checksum strategies: MySQL's built-in `CHECKSUM TABLE`, the ACCUM strategy with replication as an `INSERT/SELECT` (acquires share-mode locks on the whole table for replication consistency), the ACCUM strategy as a plain `SELECT` without share-mode locks, and the BIT_XOR strategy. If you wish to know more about these strategies and what they do, the MySQL Table Checksum documentation explains them in great detail.

The last column shows how long it takes to run `COUNT(*)` on the tables in question. As you can see, taking a checksum is sometimes not that much more expensive than a simple `COUNT()` on InnoDB.

<table class="cleanHeaders elbowroom compact">
  <th scope="row">
    Rows
  </th>
  
  <th scope="row">
    Table Size
  </th>
  
  <th scope="row">
    CHECKSUM
  </th>
  
  <th scope="row">
    Replicate/ACCUM
  </th>
  
  <th scope="row">
    ACCUM
  </th>
  
  <th scope="row">
    BIT_XOR
  </th>
  
  <th scope="row">
    COUNT
  </th></tr> 
  
  <tr>
    <td class="number">
      49,152
    </td>
    
    <td class="number">
      317
    </td>
    
    <td class="number">
    </td>
    
    <td class="number">
    </td>
    
    <td class="number">
    </td>
    
    <td class="number">
    </td>
    
    <td class="number">
    </td>
  </tr>
  
  <tr>
    <td class="number">
      1,589,248
    </td>
    
    <td class="number">
      14,472
    </td>
    
    <td class="number">
    </td>
    
    <td class="number">
      1
    </td>
    
    <td class="number">
    </td>
    
    <td class="number">
      1
    </td>
    
    <td class="number">
      1
    </td>
  </tr>
  
  <tr>
    <td class="number">
      100,843,520
    </td>
    
    <td class="number">
      638,144
    </td>
    
    <td class="number">
      15
    </td>
    
    <td class="number">
      12
    </td>
    
    <td class="number">
      13
    </td>
    
    <td class="number">
      25
    </td>
    
    <td class="number">
      8
    </td>
  </tr>
  
  <tr>
    <td class="number">
      332,316,672
    </td>
    
    <td class="number">
      504,652
    </td>
    
    <td class="number">
      52
    </td>
    
    <td class="number">
      56
    </td>
    
    <td class="number">
      43
    </td>
    
    <td class="number">
      77
    </td>
    
    <td class="number">
      4
    </td>
  </tr>
  
  <tr>
    <td class="number">
      2,167,996,416
    </td>
    
    <td class="number">
      4,341,475
    </td>
    
    <td class="number">
      258
    </td>
    
    <td class="number">
      303
    </td>
    
    <td class="number">
      335
    </td>
    
    <td class="number">
      541
    </td>
    
    <td class="number">
      151
    </td>
  </tr>
  
  <tr>
    <td class="number">
      318,636,032
    </td>
    
    <td class="number">
      517,406
    </td>
    
    <td class="number">
      31
    </td>
    
    <td class="number">
      10
    </td>
    
    <td class="number">
      45
    </td>
    
    <td class="number">
      92
    </td>
    
    <td class="number">
      1
    </td>
  </tr>
  
  <tr>
    <td class="number">
      1,064,960
    </td>
    
    <td class="number">
      3,105
    </td>
    
    <td class="number">
      1
    </td>
    
    <td class="number">
      1
    </td>
    
    <td class="number">
      1
    </td>
    
    <td class="number">
    </td>
    
    <td class="number">
    </td>
  </tr>
  
  <tr>
    <td class="number">
      2,818,048
    </td>
    
    <td class="number">
      2,369
    </td>
    
    <td class="number">
    </td>
    
    <td class="number">
      1
    </td>
    
    <td class="number">
      1
    </td>
    
    <td class="number">
      1
    </td>
    
    <td class="number">
    </td>
  </tr></table> 
  
  <h3>
    Conclusion
  </h3>
  
  <p>
    How fast is it? On this server, I'm getting about 2GB in roughly five minutes with the ACCUM strategy, or an average of around .44GB/min, under heavy load.
  </p>
  
  <p>
    In real terms, the checksum algorithms I've designed are within roughly an order of magnitude of the speed of <code>COUNT(*)</code> on InnoDB, and as the table gets larger, this difference decreases to about half, probably because of InnoDB's caches. I think that's the most interesting result from these tests.
  </p>
  
  <p>
    It's also interesting that my checksum algorithms are almost as fast as MySQL's own <code>CHECKSUM TABLE</code> command on this data. This makes sense, given that they both essentially scan the whole table, but I didn't expect it, given that <code>CHECKSUM TABLE</code> is compiled into the server.
  </p>

 [1]: http://code.google.com/p/maatkit/
