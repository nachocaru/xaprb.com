---
title: Would you trust a more advanced MySQL optimizer?
date: "2010-04-21"
permalink: /2010/04/21/would-you-trust-a-more-advanced-mysql-optimizer/
categories:
  - Commentary
  - SQL
tags:
  - index_merge
---
Much has been made of certain limitations of MySQL's query optimizer ("planner"). Subqueries, lack of sort-merge joins, and so on. This is not MySQL-bashing and no one should be offended. Some people have worked to make things better, and that code is in branches that were intended for future releases. But if that work were available right now, would you trust it?

This question is important because the optimizer is complex and full of compromises and black magic. Even minor changes occasionally have weird edge cases that cause a regression in some workload. Are major changes trustworthy?

I'll give a specific example. In version 5.0, MySQL gained the ability to use more than one index for a query. This is called index\_merge in EXPLAIN, and sometimes people think it's the best thing ever. In practice, I can say two general things about queries that use an index\_merge plan:

1.  If the optimizer chooses an index_merge, it is a fair guess that there are no good indexes for the query, and it's making the best of a bad situation.
2.  The optimizer has no way to model the cost of an index_merge operation, and sometimes underestimates the cost so badly that even a full table scan can be faster. Such queries are often much faster when rewritten, for example, as a UNION. (This was the workaround in pre-5.0 anyway.)

As a result, queries that use index\_merge can usually be flagged as "bad queries" without much further thought. Queries that really benefit from index\_merge are relatively rare edge cases. A "more advanced" optimizer tactic turns out, by and large, to be a heuristic for when you need to rewrite your queries to a simpler form that MySQL 4.1 could optimize well.
