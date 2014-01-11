---
title: 'Automated, integrated sharding &#8212; the new killer database feature'
author: Baron Schwartz
layout: post
permalink: /2012/04/09/automated-integrated-sharding-the-new-killer-database-feature/
categories:
  - SQL
---
MySQL became wildly successful in part because it had built-in, simple replication. Sure, it had lots of interesting failure scenarios and was not great at first &#8212; it is much better these days &#8212; but it was nevertheless successful because there was a single, out-of-the-box, not-very-complex way to do replication. I have opined many times before that this was one of the killer features missing from PostgreSQL. I think that can large explain why MySQL became more popular more quickly.

The new killer feature is automatic sharding, in my opinion. If you're not accustomed to the word, "sharding" means partitioning of a large dataset across many servers.

It is easy to poke fun at [MongoDB's][1] current limitations, but for all that, it has a story to tell about sharding. There is One Right Way To Do It in MongoDB, and it's a part of the product.

I don't see sharding being added into the core of MySQL itself, but there are some very interesting efforts headed towards MySQL. There are at least the following companies providing sharding via a proxy or middleware solution, with a lot of other features also available in some products:

*   [Scalebase][2]
*   [ScaleArc][3]
*   [dbShards][4]
*   [ParElastic][5]

In addition, there are community-based efforts, such as [Shard-Query][6] and the [Spider][7] storage engine. And there's [MySQL (NDB) Cluster][8], and commercial rip-out-and-plug-in replacements for MySQL such as [Clustrix][9].

Am I missing any? I probably am. You can see and talk to many of these companies at this week's [MySQL conference][10], by the way.

 [1]: http://www.mongodb.org/
 [2]: http://www.scalebase.com/
 [3]: http://www.scalearc.com/
 [4]: http://www.dbshards.com/
 [5]: http://www.parelastic.com/
 [6]: http://code.google.com/p/shard-query/
 [7]: http://spiderformysql.com/
 [8]: http://mysql.com/products/cluster/
 [9]: http://www.clustrix.com/
 [10]: http://www.percona.com/live/mysql-conference-2012/
