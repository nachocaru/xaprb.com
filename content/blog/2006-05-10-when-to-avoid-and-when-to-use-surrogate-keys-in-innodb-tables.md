---
title: When to use surrogate keys in InnoDB tables
date: "2006-05-10"
permalink: /2006/05/10/when-to-avoid-and-when-to-use-surrogate-keys-in-innodb-tables/
---
InnoDB is a special case among MySQL storage engines because they have clustered indexes, which means surrogate keys have to be treated differently in InnoDB. This article gives a quick overview of clustered indexes, and explains why they make it even more important to do careful analysis before making decisions about surrogate keys on InnoDB tables.

### Overview of clustered indexes in MySQL

A [clustered index][1] is just like any other index, except the index holds the data itself, in index order. That is, the index's leaf nodes are the rows of the table, and the rows are sorted by the index. Because the rows are sorted by the index, there can be only one clustered index per table.

This means when a query uses an index seek to find a row, the seek moves through the index and lands on the data itself. By contrast, non-clustered indexes store a pointer to the data, and the query must then do a "bookmark lookup" to get to the data.

You probably see now why clustered indexes are important. They can create huge performance increases. Once the query finds the data, it has the data &#8212; there's no need to read through more pages (i.e. wait for the hard disk to respond) and do bookmark lookups to find the data. And since the rows are stored in index order, queries that work with ranges of data can use the clustered index to great effect. For example, if a table's data is clustered on date, it's highly efficient to select all rows newer than a certain date. The query just seeks into the index and finds the first row; then everything else in the table is guaranteed to be newer, so the query can blindly read every remaining row.

### Clustered indexes in MySQL

MySQL's storage engines are all different. Only InnoDB offers clustered indexes, and InnoDB makes the primary key the clustered index. This means the choice of primary key is critical to performance on the InnoDB engine, especially as tables become large.

Another important factor is the way InnoDB handles non-clustered (also known as *secondary*) indexes. Instead of pointing directly to the row, each leaf node in a secondary index contains a tuple from the clustered index (otherwise, maintaining secondary indexes would be extremely expensive in the case of a page split). That means secondary indexes are actually at a slight disadvantage in InnoDB compared to other storage engines, because using the index requires navigating two indexes. It also means the size of each secondary index is dependent on the size of the clustered index.

What does this have to do with surrogate keys? Since MySQL doesn't allow an `AUTO_INCREMENT` column unless it's part of the primary key, and InnoDB further restricts this to force it to *be* the primary key, the clustered index is totally wasted on a meaningless number.

Unfortunately, many people seem to instinctively add an `AUTO_INCREMENT` column as a primary key by default. Search around the web and you'll see people frequently giving that advice when telling a beginner how to design tables. Choosing a primary key by examining the data and finding its inherent primary key can help avoid a performance killer.

### Exceptions to the rule

There is an important exception to the "avoid surrogate keys" principle. If the table's primary key is large, the non-clustered indexes are also large, so non-clustered indexes become much less efficient. Not only is a non-clustered index less efficient, the value that results from the non-clustered index's seek is large too, so navigating the primary key is slower, too. In these cases, using a surrogate key may actually improve performance. It depends on the table.

 [1]: http://dev.mysql.com/doc/refman/5.0/en/innodb-table-and-index.html
