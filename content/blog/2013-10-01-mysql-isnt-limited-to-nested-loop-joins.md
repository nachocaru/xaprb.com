---
title: "MySQL isn't limited to nested-loop joins"
date: "2013-10-01"
permalink: /2013/10/01/mysql-isnt-limited-to-nested-loop-joins/
categories:
  - Databases
---

I have followed the "Use the Index, Luke!" blog for a while. Today Marcus [wrote][1] that (I'll paraphrase) MongoDB disgraces NoSQL the same way that MySQL disgraces SQL. I agree with a lot of this, actually, although I'm not sure I'd put it so strongly. People often like products for good reasons, and to think that legions of developers are stupid or ill-educated is suspect, in my opinion. 

But that wasn't what I meant to write about. I wanted to point out something about the blog post that's a little outdated. He wrote, and this time I'll quote, "MySQL is rather poor at joining because is only supports nested loops joins. Most other SQL database implement the hash join and sort/merge join algorithms too." 

It's no longer true that MySQL doesn't support these, and hasn't been for a while, depending on which version of MySQL you look at. What's slightly unfortunate, in my opinion, is that MySQL doesn't call out in the documentation that they're actually implemented. MySQL documentation talks about Multi-Range Read, Block Nested-Loop, and Batched Key Access join "optimizations." 

Functionally, these are closely related to combinations of hash and sort-merge join algorithms, and really represent mixtures of features from them combined in different ways, depending on the exact query. Most "sophisticated" RDBMSs also implement a lot of subtle variations &#8212; edge-case optimizations are really worthwhile. It is rarely as cut-and-dried as pure hash-join or sort-merge join. And in the end, there is always &#8212; always &#8212; iteration over rows to match them up, regardless of the data structure used, regardless of the RDBMS. MySQL happens to call these variations "nested loop join optimizations" and similar phrases, but that's what they are in other RDBMSs too. 

MySQL does very well on many types of joins for which sort-merge and hash-join algorithms are designed. See, for example, [this blog post][2] and [this one][3] and also [this one on MariaDB's further optimizations][4]. 

I think the MySQL documentation could help a little by calling things names that normal users understand. The names we see in the documentation are really reflective of how the optimizer internals gurus think about the algorithms, in my opinion. I think the names describe the implementation, not the end result. I'd suggest phrasing it differently for general consumption by the DBA public. Perhaps something like "sort-merge join implemented with a \_____ algorithm." Or perhaps &#8212; and I will admit I don't keep the details fresh in my mind so I'm not the one to ask for the right answer &#8212; perhaps the algorithms MySQL uses really aren't as related or comparable as I think they are, and a different type of explanation is in order. But I bet a lot of DBAs from SQL Server and Oracle Database backgrounds would find it helpful to have an explanation in familiar terms. (This concludes my free and probably unwanted advice to the MySQL docs team!)



 [1]: http://use-the-index-luke.com/blog/2013-10-01/mysql-is-to-sql-like-mongodb-to-nosql

 [2]: http://www.mysqlperformanceblog.com/2012/03/21/multi-range-read-mrr-in-mysql-5-6-and-mariadb-5-5/

 [3]: http://www.mysqlperformanceblog.com/2012/03/12/index-condition-pushdown-in-mysql-5-6-and-mariadb-5-5-and-its-performance-impact/

 [4]: http://www.mysqlperformanceblog.com/2012/05/31/a-case-for-mariadbs-hash-joins/

