---
title: "NoSQL doesn't mean non-relational"
date: "2010-03-08"
url: /blog/2010/03/08/nosql-doesnt-mean-non-relational/
categories:
  - Commentary
  - Databases
---
It seems that a lot of people equate non-SQL databases with non-relational-ness, or malign the word *relational*. This is pretty much pure ignorance. If you've ever uttered a sentence that includes the phrase "&#8230;non-relational database&#8230;" then I have two suggestions for you.

1.  Study relational algebra. At a *bare minimum*, read the [Wikipedia article on relational algebra][1]. There is much more you could do -- take a class on the topic, or read [C.J. Date's SQL and Relational Theory][2] ([my review][3]). Ask yourself how similar SQL is to the relational algebra. How is relational algebra different from SELECT and GROUP BY? Is relational theory about relationships between data? What part do transactions play in relational algebra? Is MySQL a relational database? What about PostgreSQL, Oracle, or DB2?
2.  Now that you understand relational theory more, choose a database that you think is non-relational and write a formal proof that it is not relationally complete. Please do post a link to the proof in the comments.

The truth is, a non-relational database would be of very little use. In layman's terms, it would mean you have some data that represents true statements, and a piece of software designed to answer questions using those facts, and *you can't answer simple first-order logic questions with the software*. How is this an improvement? How is this useful?

 [1]: http://en.wikipedia.org/wiki/Relational_algebra
 [2]: http://www.amazon.com/SQL-Relational-Theory-Write-Accurate/dp/0596523068?tag=xaprb-20
 [3]: http://www.xaprb.com/blog/2009/03/29/a-review-of-sql-and-relational-theory-by-c-j-date/
