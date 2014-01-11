---
title: How often should you use OPTIMIZE TABLE?
date: "2010-02-07"
permalink: /2010/02/07/how-often-should-you-use-optimize-table/
categories:
  - SQL
---
Many times I've heard people advise on "best practices" for a MySQL database. This often includes routine maintenance, such as "you should run OPTIMIZE TABLE on all of your InnoDB tables once a week to defragment them for better performance."

But this advice is unsubstantiated and could even be detrimental. Here are some of the obvious problems that I can think of:

*   The optimized table compacts the primary key (clustered index) to its default 15/16ths fill factor per page. But other indexes will be built in pseudo-random order and are likely to end up just as fragmented afterwards as before. Which indexes are more important for performance? Maybe the primary key is just a dummy value that's not even used, and the secondary indexes are the ones that would benefit from compacting.
*   Suppose the primary key is the important one, and SELECT queries will perform more quickly if it's defragmented. Why does it get fragmented? Because of changes to the table. Now these changes could suddenly slow down dramatically as they are forced to split pages at a much higher rate due to the more compact data layout.

Why do people make a blanket "you should defragment" statement without supporting it with hard facts? It sounds like something you'd hear from a naive Windows user who buys a $99 piece of software to make his PC "boot faster" or "fix his registry" or something. Maybe it ain't broke and should not be fixed.

I believe we hear advice like this because there isn't easy-to-get data that can tell us the truth. To make decisions about defragmenting tables responsibly, we need either performance data on that table (hard to get in most cases), or failing that, information about cost and frequency of page splits in general (not available from InnoDB at present). It would help to have these metrics, and I think it might not be very hard to add page-split instrumentation to InnoDB.
