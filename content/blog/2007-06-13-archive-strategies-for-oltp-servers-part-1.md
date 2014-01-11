---
title: Archive strategies for OLTP servers, Part 1
author: Baron Schwartz
excerpt: "<p>In May 2005, I wrote a widely-referenced article about how to efficiently archive and/or purge data from online transaction processing (OLTP) database servers.  That article focused on how to write efficient archiving SQL.  In this article I'll discuss archiving strategy, not tactics.  OLTP servers tend to have complex schemas, which makes it important and sometimes difficult to design a good archiving strategy.</p>"
layout: post
permalink: /2007/06/13/archive-strategies-for-oltp-servers-part-1/
description:
  - Examines motivations and requirements for designing archiving strategies
tags:
  - archiving
  - data archiving
  - MySQL
  - olap
  - oltp
  - scaling
  - SQL
---
In May 2005, I wrote a widely-referenced article about [how to efficiently archive and/or purge data from online transaction processing (OLTP) database servers][1]. That article focused on how to write efficient archiving SQL. In this article I&#8217;ll discuss archiving strategy, not tactics. OLTP servers tend to have complex schemas, which makes it important and sometimes difficult to design a good archiving strategy.

### The 50,000-foot view

Archiving is actually a very large topic! My goal is to at least mention many of the things to consider, and go into some of them in detail. Here&#8217;s what I&#8217;ll cover in this and upcoming articles:

*   Goals of archiving
*   Where to store the archived data
*   How to choose which rows are archivable
*   How to deal with complex data relationships and dependencies
*   How to actually archive the data
*   Un-archiving strategy

### Archiving: why do it?

Archiving is about scaling. There are several different views on how to scale systems with MySQL in particular, and any given system in general. Opinions vary on the best way for any given usage, but popular strategies are<ul 

*   Buy bigger, more expensive, faster hardware (vertical scaling)
*   Split data into logical partitions or shards, and distribute these among many machines (horizontal scaling)
*   Use federated views, clusters, or other distributed technologies that pretend there&#8217;s one server, but underneath there are actually many (federation)</ul> 
Each strategy has its place, but each focuses on **how to handle the same or more data** while providing redundancy or high availability, improved performance, and so on. Sometimes the elephant in the room is the obvious but easy to overlook strategy of **don&#8217;t scale up or out, scale back**. This may not be possible, but when it is, it&#8217;s often preferable.

How do you know if you can do this? Just ask whether you need all the data. Most of the time you don&#8217;t. Think about how true this is throughout computing as a whole. Caching is everywhere in computing, and it works precisely because you don&#8217;t need all the data, or at least you don&#8217;t need all of it all the time. Most data has some spatial or temporal hot spots, and often there&#8217;s a pretty large chunk of it that&#8217;s never accessed at all. If you don&#8217;t need all the data all the time, you might be able to move some of it away to bigger, cheaper, slower storage. That&#8217;s archiving.

If you can scale back rather than up or out, you may be able to keep your OLTP servers lean and fast without changing anything. This can easily buy you an order of magnitude. It&#8217;s generally not easy to do that; if you want to get an order of magnitude with other strategies, you may need ten times as many servers so each has an order of magnitude less data. Scaling up tends to be even more expensive; the price-to-performance ratio climbs very sharply as you get into big-iron machines. You also need to consider the cost of rack space, cooling, power, maintenance and so forth.

### When people are a roadblock

I think it&#8217;s important to resist building a system that will always provide all the data that ever existed, just in case you need it. If you&#8217;re worried you might need the data someday, keep it on DVD, but you don&#8217;t need to keep it on your OLTP servers. And don&#8217;t compare yourself to Amazon or Google. You probably have limited resources, and though it may be good bragging rights, trying to engineer something massive is likely bad for your business. Sometimes people want to build unreasonable systems because they have something to prove, or they have [second-system syndrome][2]. Know your limits as an individual, and if you&#8217;re a manager, take a moment to assess whether your engineers are advocating for more than is good for the company.

### Gather requirements for the archive

If you&#8217;ve identified that you can archive some of your data, I think the next important step is to figure out what you require of the stored data. I&#8217;ve worked in a place where the only requirement was legal; we needed to be able to retrieve the data only if we got audited or had to go to court. By contrast, my current employer needs infrequent access to archived data for long-term analysis, but it needs to be queryable live and quickly.

You need to balance convenience, speed, space, expense, durability, legal, and other requirements you identify. Chances are there&#8217;s a fairly obvious solution for you:

*   If you never need the data again, you can simply purge it.
*   If you only need it for legal requirements, you can archive it to a file, then burn the files to CDs and put them in a safe deposit box.
*   If you need it for infrequent queries that can be slow, you can archive to a table, then burn the table to CD. When you need to get it back, you can mount the CD and get your server to read the table right from CD. One thing to beware, though: future server versions aren&#8217;t guaranteed to read old table formats!
*   If you need it for frequent or fast querying, you might build a data warehouse, or you may be able to simply move the data to &#8220;adjacent&#8221; tables on the same server.

Any of these ideas could be mixed and matched. Let me give some examples of what I&#8217;ve done in real life.

At one company using SQL Server, we archived data to a beefy OLAP (online analytical processing) server via replication. I&#8217;ll go through the exact strategy in an upcoming article, but basically we replicated the data to the OLAP server into a spot reserved for in-transit data. From there it went into the long-term storage tables transactionally, and analytics applications read from views that gave a union over the in-transit and the long-term storage.

At my current employer using MySQL, we archive transactional InnoDB tables to adjacent tables on the same server, which use a different storage engine and sometimes fewer indexes. At the same time we archive to files, which we periodically burn to CD and put in safe storage. This would have worked well even if we&#8217;d used the InnoDB storage engine for the archive tables, simply because the OLTP tables would have been smaller, but archiving to another storage engine has the added benefits of getting it out of the InnoDB tablespace and giving more compact storage.

### Conclusion

In this article I surveyed the preliminaries of archiving: motivations to archive and requirements of the archived data. While some of these decisions will actually depend on things I&#8217;ll write about in upcoming articles, it&#8217;s good to have several options in mind before you evaluate specific strategies.

In the next article I&#8217;ll discuss how to select which data is archivable, and how to deal with the complexities of OLTP schemas during the archiving process.

 [1]: http://www.xaprb.com/blog/2006/05/02/how-to-write-efficient-archiving-and-purging-jobs-in-sql/
 [2]: http://en.wikipedia.org/wiki/The_Mythical_Man-Month