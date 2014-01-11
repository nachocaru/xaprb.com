---
title: Archive strategies for OLTP servers, Part 2
author: Baron Schwartz
excerpt: "<p>In the first article in this series on archiving strategies for online transaction processing (OLTP) database servers, I covered some basics: why to archive, and what to consider when gathering requirements for the archived data itself.  This article is more technical.  I want to help you understand how to choose which rows are archivable, and how to deal with complex data relationships and dependencies.  In that context, I'll also discuss a few concrete archiving strategies, their strengths and shortcomings, and how they can satisfy your requirements, especially requirements for data consistency, which as you will see is one of the most difficult problems in archiving.</p>"
layout: post
permalink: /2007/06/14/archive-strategies-for-oltp-servers-part-2/
description:
  - >
    This second article in a series on database archiving discusses specific
    archiving strategies, data relationships and dependencies, consistency
    requirements, and efficiency.
tags:
  - archiving
  - consistency
  - data archiving
  - dependencies
  - foreign keys
  - MySQL
  - olap
  - oltp
  - scaling
  - SQL
  - transactions
---
In the first article in this series on [archiving strategies for online transaction processing (OLTP) database servers][1], I covered some basics: why to archive, and what to consider when gathering requirements for the archived data itself. This article is more technical. I want to help you understand how to choose which rows are archivable, and how to deal with complex data relationships and dependencies. In that context, I&#8217;ll also discuss a few concrete archiving strategies, their strengths and shortcomings, and how they can satisfy your requirements, especially requirements for data consistency, which as you will see is one of the most difficult problems in archiving.

Remember I&#8217;m basing these articles on the [nibbling principle][2] I explained in my very first article on archiving strategies. The goal is not to move away tables or take gigantic chunks out of tables manually. If you need to archive, you&#8217;ll need to do it frequently, perhaps continuously. That means you need to write automated, incremental jobs that nibble small chunks of unwanted data away without impacting the OLTP work you&#8217;re trying to optimize.

It&#8217;s a different matter if you&#8217;re archiving or purging from an OLAP system such as a data warehouse, of course.

### What data should you archive?

You can&#8217;t archive until you know what you&#8217;re going to archive. You need to prioritize your efforts, and then for each type of data, which typically means each table, you need to know whether each row is archivable.

#### Prioritize

The first thing to do is determine priorities. You might know some data *can* be archived, but come back to that later. Focus on what *needs* to go away to make your transactional processes run more quickly. What gets queried the most? Consider tables &#8220;heavily queried&#8221; if they have extremes of any type of query &#8212; many small queries can cause just as much work as frequent long-running ones. Which tables have the most rows, the most data, the largest indexes? Which tables are growing the most quickly? Think also about access patterns; if you have tables that are frequently scanned partially or wholly for aggregates, those too are candidates.

Identify the worst offenders and think about which of them you need to do first. If you know some frequently-queried tables are growing very fast, I would consider prioritizing them, even if they&#8217;re not yet too large. I&#8217;ve seen tables reach a point where they become too large to query, and thus difficult to archive.

Another thing you might consider is how easy it will be to archive a row, especially if you are running close to capacity. If you can archive the second-most-important table easily, and it will give the server significant performance headroom, you might want to do that first. You can archive the more work-intensive most-important table later, when your server has some capacity to spare.

#### Is it archivable?

Now that you&#8217;ve identified which tables to focus on, you need to determine which rows are candidates for archiving. Rather than query the table, I would focus on identifying rules, which ideally you should be able to express as a `WHERE` clause in a query. The simpler the better. Here are some examples.

*   Is the row related to something that&#8217;s no longer current? For example, is it a product you don&#8217;t sell anymore, or related to a client with whom you no longer work?
*   Is it scratch data that never got used? For example, an abandoned shopping cart, an order that was invalidated and cancelled, or data that was prepared for upload to a business partner but was rejected by their systems?
*   Is it data that used to record a fact, but has now been &#8220;cancelled&#8221; and just records &#8220;zero?&#8221; For example, one system I&#8217;ve worked on records advertising traffic. For various reasons it can end up with rows that say &#8220;on this day, this advertisement was clicked zero times and caused zero sales.&#8221; This happened because of artifacts in the rollup processes. If a row records the same thing as the absence of a row, it can go (actually it should probably be purged, not archived).</il> 
    *   Is it an orphan (its parent record is gone) or a widow<sup>[1]</sup> (it has no child records)?
    *   Does it fall into some time window that makes it no longer likely to be accessed?</ul> 
    This last case is probably one of the most complex, but it&#8217;s important because data can often be archived by this criteria when it doesn&#8217;t meet any other. One example is summary tables to support decisions on OLTP systems (as opposed to a decision support system running from a data warehouse). If you do many calculations on the most recent data &#8212; say, the most recent quarter &#8212; you can probably archive previous quarters to slower storage.
    
    Of course, you might not be able to get a definite answer on whether a row can be archived. Often the true answer is too expensive to get, or is in the outside world, perhaps even in the future. Sometimes the answer is &#8220;I think it can go, but if the client asks, it has to be there&#8221; or &#8220;I think it can go, as long as we don&#8217;t get some improbable event.&#8221; In these cases you can build your systems to cope with cache misses, as it were, and go ahead and archive the data based on probability. This is why I made the comparison with caching in the first article.
    
    An example of this comes from the advertising system I mentioned. It is designed so an advertisement that doesn&#8217;t generate any traffic for some time can be archived, but retrieved if it gets traffic in the future. I&#8217;ll write more about un-archiving in the next article.
    
    Finally, you might not need to specify criteria for each type of data by itself. OLTP systems often have parent-child relationships among tables, so in addition to orphan or widow checks, you can decide transitively. If a row is archivable when its parent is older than a certain age, then the row&#8217;s children can be archived by looking at their &#8220;grandparent&#8221; or &#8220;uncle.&#8221; I will call this a &#8220;transitive check&#8221; from now on.
    
    ### How to handle data dependencies
    
    Relationships among data, and ensuring consistency with respect to the relationships, usually make archiving itself complex and difficult. Just as you did with archived storage requirements, you need to gather requirements for the instantaneous state of the system during archiving. There are several strategies for meeting different requirements, depending on your data&#8217;s relationships.
    
    #### Types of relationships, consistency guarantees, and efficiency
    
    I already mentioned parent/child relationships. In general, whenever you have some data in one table that&#8217;s used to look up data in another table, you have one of several possibilities:
    
    1.  There&#8217;s an actual database-enforced foreign key between the tables
    2.  Some business logic, whether in queries, stored procedures, constraints or just application code, expects certain data in one table when it sees data in another
    3.  Your systems treat it as a pleasant surprise when they find corresponding data in the two tables
    
    My guess is most of you have a fair amount of data that&#8217;s described by cases one and two, and much less that falls into case three. Wouldn&#8217;t you know it, case three is the easiest to handle!
    
    There are several levels of consistency you might choose to follow, and you can mix and match them depending on the data. These flow from the three kinds of relationships:
    
    *   **No orphans.** Foreign keys in most systems enforce this rule. If you attempt to move a parent row away, the child will become an orphan, and most foreign keys will raise an error. Your application code might also forbid orphans. In this case you&#8217;ll have to archive the children before the parent.
    *   **Orphans are okay.** In this case you can archive the parents first, and the children next. In some systems you can disable database-enforced foreign keys, if they&#8217;re the only reason for a no-orphans-allowed situation.
    *   **No matter.** In this case you can archive however you please.
    
    You need to balance your consistency requirements against the need to archive efficiently. If you require 100% consistent database state all the time, you might end up doing a lot of database transactions. Transactions are built to ensure consistency, but as I mentioned in previous articles, your archiving jobs need to be designed so they are the victims if there&#8217;s ever a conflict between them and OLTP processes. Huge transactions to ensure consistency may not be practical while archiving!
    
    #### Strategies for archiving
    
    Once you&#8217;ve decided what level of inconsistency you can tolerate, you can choose archive strategies. Just as with everything else, archive strategies are a trade-off. In this case the compromise is usually between efficiency and consistency.
    
    Here are three basic types of archiving strategies. There may be others, but these are the ones I&#8217;ve used and/or considered using most of the time:
    
    1.  Archive parents and children with recursion.
    2.  Leave orphans, then clean them up later.
    3.  Archive at the leaves of the dependency tree and work toward the root.
    
    The first strategy is a classic computer-science depth-first-traversal problem. You typically start with a central table &#8212; the root of the tree or the root of a subtree &#8212; and for each row you recursively archive its children, only archiving the parent after all the children are gone. This can be difficult, especially since your OLTP schema might not be a tree; it can be a directed acyclic graph, or it can even be a graph with cycles. Satisfying all the dependencies without introducing infinite recursion can be a hard problem. You might also find that not all the dependencies are themselves archivable. You might need to gather a list of all data that is archivable before archiving any of it, which actually means *two* tree traversals. Finally, you might end up with a chunk of data that has to be archived all at once, which I think is impractical in many OLTP systems. The advantage, if you can pull this off, is that you get a consistent state as long as you do it all in one transaction.
    
    By the way, it&#8217;s typically hard to archive tables that have inter-row relationships, such as nested-set or other tree representations, without violating consistency requirements.
    
    If you can get away with it, it&#8217;s generally easier to archive the core table and leave orphans. There are a couple advantages to this. First, you can archive in single-row (or some other small amount) chunks. This satisfies the requirement to keep it low-impact. Second, it&#8217;s simpler and more efficient to determine whether the child rows can be archived. If they are orphans, they can be. The downside is your applications might not behave well, particularly if they are working with rows in the child table whose parent rows are disappearing.
    
    A final strategy is to archive at the leaves of the dependency tree and work &#8220;up.&#8221; In this situation, you are sort of doing the first strategy &#8212; making sure dependency relationships aren&#8217;t broken &#8212; but you&#8217;re not trying to boil the ocean. Depending on how deep the dependency tree is, you can usually decide whether a row is archivable either transitively, or by checking whether it&#8217;s a widow. When you&#8217;re working at the leaves, you check whether the root is archivable; when you&#8217;re on an internal node you check if the node is a widow. There are a couple potential drawbacks, including efficiency and consistency requirements in the archive storage, which I&#8217;ll cover next.
    
    ### It&#8217;s never that simple
    
    Alas, there&#8217;s still more complexity to conquer. You have to consider how efficient it is to determine whether a row is archivable, and what sort of consistency you need to guarantee between the unarchived and the archived data.
    
    #### Consistency, again
    
    I&#8217;ll start with the consistency problem first. This is a different sort of consistency, which is why I didn&#8217;t mention it before. It would have confused things.
    
    It&#8217;s not always enough to consider consistency in the OLTP system. You might have to think about the archived storage too, and even worse, the two of them in combination. Consider this scenario: you have a parent row in one table, some of whose children in another table can be archived. Do they need a parent row in their destination, too? In other words, do you need to copy the row from `source.parent` to `archive.parent` before you can insert into `archive.child`? And if so, does it bother you that the row in `source.parent` cannot be archived yet because some of its children are not archivable?
    
    If you must have a row in `archive.parent` before inserting into archive.child, you will probably have to resign yourself to having two copies of the parent row &#8212; one in the source, one in the archive. Otherwise, you are enforcing an all-or-nothing constraint on the whole &#8220;family&#8221; of rows, and this will probably reduce the amount of data you can archive. In practice, I think most people will end up having no foreign keys or other consistency guarantees on the archived data, so child rows can be freely inserted into the archive. If your source and archive are on the same server, don&#8217;t foreign key the archive&#8217;s child table to the source&#8217;s parent table, or you won&#8217;t be able to archive from the parent! Along with this, you&#8217;ll probably need to treat an archived row as &#8220;dirty&#8221; or &#8220;un-authoritative&#8221; if it duplicates a row in the source. Upcoming articles will dig into this more.
    
    #### Efficient archivability checks
    
    The second potential complication of the strategies above is performance while checking whether a row can be archived. Both transitive checks and widow checks can have high cost.
    
    Transitive checks for archivability can cause a heavy query load on certain tables. Here&#8217;s a real example, from the systems I described above. An ad is archivable if it has no traffic in the past 18 months. Tables that depend on ads, and which contain an ad&#8217;s ID, can be archived by checking the traffic table for any traffic for that ad in the last 18 months. This means a lot of queries against the traffic table, which is large and heavily queried anyway. It would be more efficient to archive the ad, and then archive its dependent tables by checking whether the ad doesn&#8217;t exist anymore. This works best if the ad table can be archived to a small fraction of its former size, which makes index lookups faster.
    
    Another problem with transitive checks is if several relationships must be traversed. In this case you might have to look up values in intermediate tables before checking the final table. This adds more overhead.
    
    The transitive checks are often &#8220;upward&#8221; checks in the dependency tree, and have a single parent row in a single parent table; or sometimes &#8220;up and across&#8221; to another table. By contrast, widow checks are downward, and might have to check many child tables for child rows. This can be expensive, particularly in tables that are close to the root of the dependency tree. The ads table is a good example. It has literally scores of dependent tables. Querying each of them before archiving a row would be prohibitively expensive. Even worse, a child table might not have an index on its parent column. If your application doesn&#8217;t traverse the relationship from parent to child, such an index wouldn&#8217;t be needed, and adding one just to support archiving queries might not be wise.
    
    One compromise I have used occasionally, but not analyzed rigorously, is to build a table of parent row IDs that can be archived, and then access that from child archiving jobs, instead of doing transitive checks. This way at least the &#8220;traffic&#8221; table, or its equivalent, only takes the hit once.
    
    ### Conclusion
    
    I&#8217;ve covered a lot of ground in this article, starting with &#8220;deciding archivability&#8221; and &#8220;handling relationships.&#8221; Both require knowing your data, applications, schema, and consistency requirements. It helps to understand how they interact with various archiving strategies, and in turn how those strategies can violate or support your consistency requirements. Efficiency is a big deal &#8212; it&#8217;s the point of archiving, after all &#8212; so you need to include it when determining what you *really* require in terms of consistency.
    
    The next article will cover some specific strategies for actually moving the data from the source to the archive, how to do that while fulfilling data consistency requirements (again!), and finally how to un-archive. This last point is crucial for scaling by &#8220;scaling back,&#8221; because it lets you archive data you&#8217;re not sure is archivable, yet pay virtually no penalty.
    
    * * *
    
    <sup>[1]</sup> I realize &#8220;widow&#8221; is not the opposite of &#8220;orphan,&#8221; but in computer science it is sometimes used to mean &#8220;childless,&#8221; especially for typesetting algorithms. Joe Celko also uses the term to mean &#8220;childless&#8221; in *SQL For Smarties*.

 [1]: /blog/2007/06/13/archive-strategies-for-oltp-servers-part-1/
 [2]: http://www.xaprb.com/blog/2006/05/02/how-to-write-efficient-archiving-and-purging-jobs-in-sql/