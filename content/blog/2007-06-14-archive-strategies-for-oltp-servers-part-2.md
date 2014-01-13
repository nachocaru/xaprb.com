---
title: Archive strategies for OLTP servers, Part 2
date: "2007-06-14"
permalink: /blog/2007/06/14/archive-strategies-for-oltp-servers-part-2/
---
In the first article in this series on [archiving strategies for online transaction processing (OLTP) database servers][1], I covered some basics: why to archive, and what to consider when gathering requirements for the archived data itself. This article is more technical. I want to help you understand how to choose which rows are archivable, and how to deal with complex data relationships and dependencies. In that context, I'll also discuss a few concrete archiving strategies, their strengths and shortcomings, and how they can satisfy your requirements, especially requirements for data consistency, which as you will see is one of the most difficult problems in archiving.

Remember I'm basing these articles on the [nibbling principle][2] I explained in my very first article on archiving strategies. The goal is not to move away tables or take gigantic chunks out of tables manually. If you need to archive, you'll need to do it frequently, perhaps continuously. That means you need to write automated, incremental jobs that nibble small chunks of unwanted data away without impacting the OLTP work you're trying to optimize.

It's a different matter if you're archiving or purging from an OLAP system such as a data warehouse, of course.

### What data should you archive?

You can't archive until you know what you're going to archive. You need to prioritize your efforts, and then for each type of data, which typically means each table, you need to know whether each row is archivable.

#### Prioritize

The first thing to do is determine priorities. You might know some data *can* be archived, but come back to that later. Focus on what *needs* to go away to make your transactional processes run more quickly. What gets queried the most? Consider tables "heavily queried" if they have extremes of any type of query -- many small queries can cause just as much work as frequent long-running ones. Which tables have the most rows, the most data, the largest indexes? Which tables are growing the most quickly? Think also about access patterns; if you have tables that are frequently scanned partially or wholly for aggregates, those too are candidates.

Identify the worst offenders and think about which of them you need to do first. If you know some frequently-queried tables are growing very fast, I would consider prioritizing them, even if they're not yet too large. I've seen tables reach a point where they become too large to query, and thus difficult to archive.

Another thing you might consider is how easy it will be to archive a row, especially if you are running close to capacity. If you can archive the second-most-important table easily, and it will give the server significant performance headroom, you might want to do that first. You can archive the more work-intensive most-important table later, when your server has some capacity to spare.

#### Is it archivable?

Now that you've identified which tables to focus on, you need to determine which rows are candidates for archiving. Rather than query the table, I would focus on identifying rules, which ideally you should be able to express as a `WHERE` clause in a query. The simpler the better. Here are some examples.

*   Is the row related to something that's no longer current? For example, is it a product you don't sell anymore, or related to a client with whom you no longer work?
*   Is it scratch data that never got used? For example, an abandoned shopping cart, an order that was invalidated and cancelled, or data that was prepared for upload to a business partner but was rejected by their systems?
*   Is it data that used to record a fact, but has now been "cancelled" and just records "zero?" For example, one system I've worked on records advertising traffic. For various reasons it can end up with rows that say "on this day, this advertisement was clicked zero times and caused zero sales." This happened because of artifacts in the rollup processes. If a row records the same thing as the absence of a row, it can go (actually it should probably be purged, not archived).</il> 
    *   Is it an orphan (its parent record is gone) or a widow<sup>[1]</sup> (it has no child records)?
    *   Does it fall into some time window that makes it no longer likely to be accessed?</ul> 
    This last case is probably one of the most complex, but it's important because data can often be archived by this criteria when it doesn't meet any other. One example is summary tables to support decisions on OLTP systems (as opposed to a decision support system running from a data warehouse). If you do many calculations on the most recent data -- say, the most recent quarter -- you can probably archive previous quarters to slower storage.
    
    Of course, you might not be able to get a definite answer on whether a row can be archived. Often the true answer is too expensive to get, or is in the outside world, perhaps even in the future. Sometimes the answer is "I think it can go, but if the client asks, it has to be there" or "I think it can go, as long as we don't get some improbable event." In these cases you can build your systems to cope with cache misses, as it were, and go ahead and archive the data based on probability. This is why I made the comparison with caching in the first article.
    
    An example of this comes from the advertising system I mentioned. It is designed so an advertisement that doesn't generate any traffic for some time can be archived, but retrieved if it gets traffic in the future. I'll write more about un-archiving in the next article.
    
    Finally, you might not need to specify criteria for each type of data by itself. OLTP systems often have parent-child relationships among tables, so in addition to orphan or widow checks, you can decide transitively. If a row is archivable when its parent is older than a certain age, then the row's children can be archived by looking at their "grandparent" or "uncle." I will call this a "transitive check" from now on.
    
    ### How to handle data dependencies
    
    Relationships among data, and ensuring consistency with respect to the relationships, usually make archiving itself complex and difficult. Just as you did with archived storage requirements, you need to gather requirements for the instantaneous state of the system during archiving. There are several strategies for meeting different requirements, depending on your data's relationships.
    
    #### Types of relationships, consistency guarantees, and efficiency
    
    I already mentioned parent/child relationships. In general, whenever you have some data in one table that's used to look up data in another table, you have one of several possibilities:
    
    1.  There's an actual database-enforced foreign key between the tables
    2.  Some business logic, whether in queries, stored procedures, constraints or just application code, expects certain data in one table when it sees data in another
    3.  Your systems treat it as a pleasant surprise when they find corresponding data in the two tables
    
    My guess is most of you have a fair amount of data that's described by cases one and two, and much less that falls into case three. Wouldn't you know it, case three is the easiest to handle!
    
    There are several levels of consistency you might choose to follow, and you can mix and match them depending on the data. These flow from the three kinds of relationships:
    
    *   **No orphans.** Foreign keys in most systems enforce this rule. If you attempt to move a parent row away, the child will become an orphan, and most foreign keys will raise an error. Your application code might also forbid orphans. In this case you'll have to archive the children before the parent.
    *   **Orphans are okay.** In this case you can archive the parents first, and the children next. In some systems you can disable database-enforced foreign keys, if they're the only reason for a no-orphans-allowed situation.
    *   **No matter.** In this case you can archive however you please.
    
    You need to balance your consistency requirements against the need to archive efficiently. If you require 100% consistent database state all the time, you might end up doing a lot of database transactions. Transactions are built to ensure consistency, but as I mentioned in previous articles, your archiving jobs need to be designed so they are the victims if there's ever a conflict between them and OLTP processes. Huge transactions to ensure consistency may not be practical while archiving!
    
    #### Strategies for archiving
    
    Once you've decided what level of inconsistency you can tolerate, you can choose archive strategies. Just as with everything else, archive strategies are a trade-off. In this case the compromise is usually between efficiency and consistency.
    
    Here are three basic types of archiving strategies. There may be others, but these are the ones I've used and/or considered using most of the time:
    
    1.  Archive parents and children with recursion.
    2.  Leave orphans, then clean them up later.
    3.  Archive at the leaves of the dependency tree and work toward the root.
    
    The first strategy is a classic computer-science depth-first-traversal problem. You typically start with a central table -- the root of the tree or the root of a subtree -- and for each row you recursively archive its children, only archiving the parent after all the children are gone. This can be difficult, especially since your OLTP schema might not be a tree; it can be a directed acyclic graph, or it can even be a graph with cycles. Satisfying all the dependencies without introducing infinite recursion can be a hard problem. You might also find that not all the dependencies are themselves archivable. You might need to gather a list of all data that is archivable before archiving any of it, which actually means *two* tree traversals. Finally, you might end up with a chunk of data that has to be archived all at once, which I think is impractical in many OLTP systems. The advantage, if you can pull this off, is that you get a consistent state as long as you do it all in one transaction.
    
    By the way, it's typically hard to archive tables that have inter-row relationships, such as nested-set or other tree representations, without violating consistency requirements.
    
    If you can get away with it, it's generally easier to archive the core table and leave orphans. There are a couple advantages to this. First, you can archive in single-row (or some other small amount) chunks. This satisfies the requirement to keep it low-impact. Second, it's simpler and more efficient to determine whether the child rows can be archived. If they are orphans, they can be. The downside is your applications might not behave well, particularly if they are working with rows in the child table whose parent rows are disappearing.
    
    A final strategy is to archive at the leaves of the dependency tree and work "up." In this situation, you are sort of doing the first strategy -- making sure dependency relationships aren't broken -- but you're not trying to boil the ocean. Depending on how deep the dependency tree is, you can usually decide whether a row is archivable either transitively, or by checking whether it's a widow. When you're working at the leaves, you check whether the root is archivable; when you're on an internal node you check if the node is a widow. There are a couple potential drawbacks, including efficiency and consistency requirements in the archive storage, which I'll cover next.
    
    ### It's never that simple
    
    Alas, there's still more complexity to conquer. You have to consider how efficient it is to determine whether a row is archivable, and what sort of consistency you need to guarantee between the unarchived and the archived data.
    
    #### Consistency, again
    
    I'll start with the consistency problem first. This is a different sort of consistency, which is why I didn't mention it before. It would have confused things.
    
    It's not always enough to consider consistency in the OLTP system. You might have to think about the archived storage too, and even worse, the two of them in combination. Consider this scenario: you have a parent row in one table, some of whose children in another table can be archived. Do they need a parent row in their destination, too? In other words, do you need to copy the row from `source.parent` to `archive.parent` before you can insert into `archive.child`? And if so, does it bother you that the row in `source.parent` cannot be archived yet because some of its children are not archivable?
    
    If you must have a row in `archive.parent` before inserting into archive.child, you will probably have to resign yourself to having two copies of the parent row -- one in the source, one in the archive. Otherwise, you are enforcing an all-or-nothing constraint on the whole "family" of rows, and this will probably reduce the amount of data you can archive. In practice, I think most people will end up having no foreign keys or other consistency guarantees on the archived data, so child rows can be freely inserted into the archive. If your source and archive are on the same server, don't foreign key the archive's child table to the source's parent table, or you won't be able to archive from the parent! Along with this, you'll probably need to treat an archived row as "dirty" or "un-authoritative" if it duplicates a row in the source. Upcoming articles will dig into this more.
    
    #### Efficient archivability checks
    
    The second potential complication of the strategies above is performance while checking whether a row can be archived. Both transitive checks and widow checks can have high cost.
    
    Transitive checks for archivability can cause a heavy query load on certain tables. Here's a real example, from the systems I described above. An ad is archivable if it has no traffic in the past 18 months. Tables that depend on ads, and which contain an ad's ID, can be archived by checking the traffic table for any traffic for that ad in the last 18 months. This means a lot of queries against the traffic table, which is large and heavily queried anyway. It would be more efficient to archive the ad, and then archive its dependent tables by checking whether the ad doesn't exist anymore. This works best if the ad table can be archived to a small fraction of its former size, which makes index lookups faster.
    
    Another problem with transitive checks is if several relationships must be traversed. In this case you might have to look up values in intermediate tables before checking the final table. This adds more overhead.
    
    The transitive checks are often "upward" checks in the dependency tree, and have a single parent row in a single parent table; or sometimes "up and across" to another table. By contrast, widow checks are downward, and might have to check many child tables for child rows. This can be expensive, particularly in tables that are close to the root of the dependency tree. The ads table is a good example. It has literally scores of dependent tables. Querying each of them before archiving a row would be prohibitively expensive. Even worse, a child table might not have an index on its parent column. If your application doesn't traverse the relationship from parent to child, such an index wouldn't be needed, and adding one just to support archiving queries might not be wise.
    
    One compromise I have used occasionally, but not analyzed rigorously, is to build a table of parent row IDs that can be archived, and then access that from child archiving jobs, instead of doing transitive checks. This way at least the "traffic" table, or its equivalent, only takes the hit once.
    
    ### Conclusion
    
    I've covered a lot of ground in this article, starting with "deciding archivability" and "handling relationships." Both require knowing your data, applications, schema, and consistency requirements. It helps to understand how they interact with various archiving strategies, and in turn how those strategies can violate or support your consistency requirements. Efficiency is a big deal -- it's the point of archiving, after all -- so you need to include it when determining what you *really* require in terms of consistency.
    
    The next article will cover some specific strategies for actually moving the data from the source to the archive, how to do that while fulfilling data consistency requirements (again!), and finally how to un-archive. This last point is crucial for scaling by "scaling back," because it lets you archive data you're not sure is archivable, yet pay virtually no penalty.
    
    * * *
    
    <sup>[1]</sup> I realize "widow" is not the opposite of "orphan," but in computer science it is sometimes used to mean "childless," especially for typesetting algorithms. Joe Celko also uses the term to mean "childless" in *SQL For Smarties*.

 [1]: /blog/2007/06/13/archive-strategies-for-oltp-servers-part-1/
 [2]: http://www.xaprb.com/blog/2006/05/02/how-to-write-efficient-archiving-and-purging-jobs-in-sql/
