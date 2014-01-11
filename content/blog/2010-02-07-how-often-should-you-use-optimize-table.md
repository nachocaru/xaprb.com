---
title: How often should you use OPTIMIZE TABLE?
author: Baron Schwartz
layout: post
permalink: /2010/02/07/how-often-should-you-use-optimize-table/
categories:
  - SQL
tags:
  - Clustered indexes
  - defragmenting
  - fill factor
  - InnoDB
  - instrumentation
  - MySQL
  - page splits
---
Many times I&#8217;ve heard people advise on &#8220;best practices&#8221; for a MySQL database. This often includes routine maintenance, such as &#8220;you should run OPTIMIZE TABLE on all of your InnoDB tables once a week to defragment them for better performance.&#8221;

But this advice is unsubstantiated and could even be detrimental. Here are some of the obvious problems that I can think of:

*   The optimized table compacts the primary key (clustered index) to its default 15/16ths fill factor per page. But other indexes will be built in pseudo-random order and are likely to end up just as fragmented afterwards as before. Which indexes are more important for performance? Maybe the primary key is just a dummy value that&#8217;s not even used, and the secondary indexes are the ones that would benefit from compacting.
*   Suppose the primary key is the important one, and SELECT queries will perform more quickly if it&#8217;s defragmented. Why does it get fragmented? Because of changes to the table. Now these changes could suddenly slow down dramatically as they are forced to split pages at a much higher rate due to the more compact data layout.

Why do people make a blanket &#8220;you should defragment&#8221; statement without supporting it with hard facts? It sounds like something you&#8217;d hear from a naive Windows user who buys a $99 piece of software to make his PC &#8220;boot faster&#8221; or &#8220;fix his registry&#8221; or something. Maybe it ain&#8217;t broke and should not be fixed.

I believe we hear advice like this because there isn&#8217;t easy-to-get data that can tell us the truth. To make decisions about defragmenting tables responsibly, we need either performance data on that table (hard to get in most cases), or failing that, information about cost and frequency of page splits in general (not available from InnoDB at present). It would help to have these metrics, and I think it might not be very hard to add page-split instrumentation to InnoDB.