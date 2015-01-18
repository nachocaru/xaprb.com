---
title: MySQL profiling case study, part 2
date: "2006-10-17"
url: /blog/2006/10/17/mysql-profiling-case-study-part-2/
categories:
  - Databases
---
This is the third in a series of articles on profiling queries in MySQL (the second of two demonstrations of profiling techniques, but the third article overall). In this article I'll present the same example as in the [second article][1], but use a different approach to show details I didn't include.

An astute reader's comment reinforced my vague unease at my second article. In hindsight, I see I got distracted trying to choose an interesting example that's not too hard to present in one article, yet has enough depth to usefully demonstrate the technique. It's harder than I thought it would be. In real life I've learned from dozens of cases, and cramming everything into one example is probably not possible. In any case, I'm going to approach the same query from a different angle in this article, so you get a more complete picture.

### Method and results

For the tests in this article, I restarted MySQL, then ran the query twice against the first table. The first run was 'cold' -- no data or indexes had been read into memory yet. The second was 'warm' and should perform just as it did the last time I profiled. I measured both runs and found what I expected. So far, so good.

Then something really surprising happened. I had dropped the tables I used in the second article, and re-created them the same way for this article, but the queries against the redesigned table (clustered date-first, to optimize queries on a date range) performed almost identically to the queries against the table with a surrogate key. What happened?

I'm not sure, actually. For some reason, MySQL's optimizer decided to use the `client` index, which is the same strategy as it used on the initial table design -- in fact, the query plan was identical. I double-checked all the data and table structures to be sure, re-analyzed the table, and tried again; no dice. It still wanted to use a sub-optimal query plan! In the end, I rewrote the query with `FORCE INDEX` to make it use the primary key instead of the `client` index, and got good performance as I expected. If anyone has insight as to why this non-repeatable result happened, please leave a comment.

Here are all three sets of numbers. The three sets are the query against the initial table design, the redesigned table, and the redesigned table with `FORCE INDEX`. As I said, I ran each query twice: once cold, once warm.

<table class="borders collapsed compact">
  <caption>Query Performance</caption> <tr>
    <th scope="col" rowspan="2">
      Variable_name
    </th>
    
    <th scope="col" colspan="2">
      Before Redesign
    </th>
    
    <th scope="col" colspan="2">
      After Redesign
    </th>
    
    <th scope="col" colspan="2">
      Redesign, <code>FORCE INDEX</code>
    </th>
  </tr>
  
  <tr>
    <th scope="col">
      Cold
    </th>
    
    <th scope="col">
      Warm
    </th>
    
    <th scope="col">
      Cold
    </th>
    
    <th scope="col">
      Warm
    </th>
    
    <th scope="col">
      Cold
    </th>
    
    <th scope="col">
      Warm
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
    
    <td>
      1
    </td>
    
    <td>
      1
    </td>
    
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
      1
    </td>
    
    <td>
      1
    </td>
    
    <td>
      1
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Handler_read_key
    </th>
    
    <td>
      1522
    </td>
    
    <td>
      1522
    </td>
    
    <td>
      1522
    </td>
    
    <td>
      1522
    </td>
    
    <td>
      2
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
      49881
    </td>
    
    <td>
      49881
    </td>
    
    <td>
      49881
    </td>
    
    <td>
      49881
    </td>
    
    <td>
    </td>
    
    <td>
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
      31
    </td>
    
    <td>
      31
    </td>
    
    <td>
      31
    </td>
    
    <td>
      31000
    </td>
    
    <td>
      31000
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
      32
    </td>
    
    <td>
      32
    </td>
    
    <td>
      32
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Handler_update
    </th>
    
    <td>
      1488
    </td>
    
    <td>
      1488
    </td>
    
    <td>
      1488
    </td>
    
    <td>
      1488
    </td>
    
    <td>
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
      31
    </td>
    
    <td>
      31
    </td>
    
    <td>
      31
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Innodb_buffer_pool_read_ahead_rnd
    </th>
    
    <td>
      1
    </td>
    
    <td>
      1
    </td>
    
    <td>
      2
    </td>
    
    <td>
      2
    </td>
    
    <td>
      1
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Innodb_buffer_pool_read_ahead_seq
    </th>
    
    <td>
      168
    </td>
    
    <td>
      168
    </td>
    
    <td>
      151
    </td>
    
    <td>
      151
    </td>
    
    <td>
      4
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Innodb_buffer_pool_read_requests
    </th>
    
    <td>
      204739
    </td>
    
    <td>
      204733
    </td>
    
    <td>
      204522
    </td>
    
    <td>
      204361
    </td>
    
    <td>
      4117
    </td>
    
    <td>
      3963
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Innodb_buffer_pool_reads
    </th>
    
    <td>
      88
    </td>
    
    <td>
      91
    </td>
    
    <td>
      138
    </td>
    
    <td>
      100
    </td>
    
    <td>
      10
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Innodb_data_read
    </th>
    
    <td>
      45629440
    </td>
    
    <td>
      45678592
    </td>
    
    <td>
      42106880
    </td>
    
    <td>
      41517056
    </td>
    
    <td>
      1343488
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Innodb_data_reads
    </th>
    
    <td>
      257
    </td>
    
    <td>
      260
    </td>
    
    <td>
      295
    </td>
    
    <td>
      255
    </td>
    
    <td>
      16
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Innodb_pages_read
    </th>
    
    <td>
      2785
    </td>
    
    <td>
      2788
    </td>
    
    <td>
      2570
    </td>
    
    <td>
      2534
    </td>
    
    <td>
      82
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Innodb_rows_read
    </th>
    
    <td>
      49881
    </td>
    
    <td>
      49881
    </td>
    
    <td>
      49881
    </td>
    
    <td>
      49881
    </td>
    
    <td>
      31001
    </td>
    
    <td>
      31001
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Select_range
    </th>
    
    <td>
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
    
    <td>
      1
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
      31
    </td>
    
    <td>
      31
    </td>
    
    <td>
      31
    </td>
    
    <td>
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
      1
    </td>
    
    <td>
      1
    </td>
    
    <td>
      1
    </td>
    
    <td>
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
    
    <td>
      1
    </td>
    
    <td>
      1
    </td>
    
    <td>
      1
    </td>
    
    <td>
      1
    </td>
  </tr>
</table>

### Analysis

You can see the queries that use the `client` index perform almost identically to each other. They use the same query plan, build the same temporary table, and so on. The main difference is there's a different amount of data in the table and indexes after the redesign:

<table class="borders collapsed compact">
  <caption>Data and Index Size</caption> <tr>
    <td>
    </td>
    
    <th scope="col">
      Before Redesign
    </th>
    
    <th scope="col">
      After Redesign
    </th>
  </tr>
  
  <tr>
    <th scope="row">
      Data Size
    </th>
    
    <td>
      45678592
    </td>
    
    <td>
      40452096
    </td>
  </tr>
  
  <tr>
    <th scope="row">
      Index Size
    </th>
    
    <td>
      53067776
    </td>
    
    <td>
      39944192
    </td>
  </tr>
</table>

Using the surrogate key is less space-efficient in this case, so the redesigned table is smaller. However, each index is smaller in the table with the surrogate key, because the primary key is not as wide. If I had to guess, I wouldn't know whether this would result in more or less data being read, which is why I don't guess, I measure. It turns out InnoDB reads the same number of rows, but they fit in fewer pages after re-indexing, so it reads a couple hundred fewer pages. Still, either of the queries using the `client` index reads about 40 MiB of data, whether it's run cold or warm.

The query that scans a range of the primary key reads 1.28 MiB cold, and zero when it's warm -- 82 page reads instead of thousands. It also makes many fewer requests to the buffer pool. And yet, it reads about 60% the number of rows. It's just that these rows are contiguous within the table, and therefore much more efficient to read. It only makes two index reads, which is great. I assume these two are to find the beginning of the date range in the primary key. After that it just scans every row till it finds the end, which is why `Handler_read_rnd` is high -- 31,000 in fact, which is the number of rows in the date range:

<pre>select count(*) from tracking
where day between '2007-01-01' and '2007-01-31';

+----------+
| count(*) |
+----------+
|    31000 |
+----------+</pre>

This is one less than the number of rows InnoDB reports reading. I believe this is because InnoDB read an extra row, the one past the end of the date range, to determine where to stop scanning.

Finally, here are the Last\_query\_cost variables again. As before, the query optimizer thinks the clustered index scan is more expensive, but it's wrong.

<table class="borders collapsed compact">
  <caption>Query Cost</caption> <tr>
    <th scope="col">
      Before Redesign
    </th>
    
    <th scope="col">
      After Redesign
    </th>
    
    <th scope="col">
      Redesign, <code>FORCE INDEX</code>
    </th>
  </tr>
  
  <tr>
    <td>
      21247.5
    </td>
    
    <td>
      10526.9
    </td>
    
    <td>
      86457.133551
    </td>
  </tr>
</table>

### Conclusion

This article measured the differences between running the query cold, and running it with the server warmed up and the data already in memory. I think this actually accentuates the second table design's improved query performance, because even when it needs to read data and indexes from the disk, it doesn't have to read as much data. I think I've explored the full depth of this example now.

Thanks for the feedback, and keep those comments coming! I'm by no means the expert on all this, so I hope you'll teach me what you know. I'm still putting the finishing touches on a tool to profile queries easily, and will post an article on that shortly.

In the meantime, you can [subscribe via e-mail or feeds][2] to be notified when I do.

 [1]: http://www.xaprb.com/blog/2006/10/15/a-case-study-in-profiling-queries-in-mysql/
 [2]: http://www.xaprb.com/index.xml
