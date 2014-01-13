---
title: A review of SQL Antipatterns by Bill Karwin
date: "2011-06-11"
permalink: /blog/2011/06/11/a-review-of-sql-antipatterns-by-bill-karwin/
categories:
  - Databases
  - Reviews
---
[<img style="float:left; margin-right:10px" src="http://www.xaprb.com/media/2011/06/bksqla_xlargecover.jpg" alt="" title="SQL Antipatterns" width="190" height="228" class="alignleft size-full wp-image-2372" />][1] [SQL Antipatterns][1], by Bill Karwin, Pragmatic Bookshelf, 2010. About 300 pages. Here's a [link to the publisher's site][2].

I loved this book. (Disclosure: Bill is a colleague of mine.) This is the first book I've read from the Pragmatic Bookshelf, and if the rest are like this one, I want to read them. The quality of the writing is way above the average technical book. Techniques that feel gimmicky and forced in other books, such as fake stories to introduce each chapter, actually work here (because they're real stories, not fake ones). Each topic is named in a memorable way and introduced very cleverly. Little quotes and excerpts are tastefully used to illustrate and reinforce the topics. The end result is that it's a lot of fun to read. If you do nothing more than read the first and last page of each chapter, you'll enjoy it and learn a lot at the same time.

The target audience here is developers who must work with databases, not database administrators per se. But if you're a DBA and you're having a hard time explaining something to a developer, you could do a lot worse than referring to this book. The content is database-agnostic, with specific mention of a broad variety of databases such as MySQL, Oracle, SQL Server, and more when appropriate.

There are four major categories of mistakes: logical database design, physical database design, queries, and development practices. These cover 25 "anti-patterns" showing how not to do things, and explaining why they're wrong, when it might be a good idea to do it that way anyhow, and what your alternatives are.

For example, the first pattern is titled Jaywalking. The name is a reference to avoiding intersections, i.e. storing comma-delimited lists in a single column. The chapter explains what's hard to do in a database that's designed in this manner, and how to sniff out the use of this antipattern. Then it explains how to create an intersection table, and ends with a pithy recommendation to "store each value in its own column and row." Pretty straightforward, and much more effective than a lecture on all the different varieties of normal forms.

Sometimes I thought of some other alternatives. For example, in avoiding FLOAT data types to prevent rounding errors for currency values, the book suggests using DECIMAL. But another option is storing an integer number of the smallest currency unit (pennies, in the US dollar currency). And I thought of lots more antipatterns, such as using a table as a queue, which often happens sneakily, without anyone realizing it. I am sure we could all suggest more antipatterns and alternatives. Anything can be taken to extremes; I think this book wisely stops before the point of burn-out.

Like Bill Karwin, I see developers make these mistakes constantly, so I recommend this book to every developer who interacts with a database. It might be a good book to buy for new team members, if you're the team leader.

 [1]: http://www.amazon.com/SQL-Antipatterns-Programming-Pragmatic-Programmers/dp/1934356557?tag=xaprb-20
 [2]: http://pragprog.com/titles/bksqla/sql-antipatterns
