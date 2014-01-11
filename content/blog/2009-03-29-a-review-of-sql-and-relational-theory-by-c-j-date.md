---
title: A review of SQL and Relational Theory by C. J. Date
date: "2009-03-29"
permalink: /2009/03/29/a-review-of-sql-and-relational-theory-by-c-j-date/
categories:
  - Databases
  - Programming
  - Reviews
---
<div class="wp-caption alignleft" style="width: 190px">
  <a href="http://www.amazon.com/SQL-Relational-Theory-Write-Accurate/dp/0596523068?tag=xaprb-20"><img alt="SQL and Relational Theory" src="http://oreilly.com/catalog/covers/9780596523060_cat.gif" title="SQL and Relational Theory" width="180" height="236" /></a><p class="wp-caption-text">
    SQL and Relational Theory
  </p>
</div>

[SQL and Relational Theory][1] *How to Write Accurate SQL Code* by C. J. Date, O'Reilly 2009. Page count: 266 pages of "real" text, plus hefty appendixes. (Here's a link to the publisher's site: [SQL and Relational Theory *How to Write Accurate SQL Code*][2]).

**This is a very important book for anyone involved with databases**. Before I say why, I need to apologize to Mr. Date. I tech-reviewed part of the book and did not care for it. I am afraid I was quite a curmudgeon in my review comments. So, Mr. Date, if you're reading this &#8212; I want to say I enjoyed the book very much after all.

Back to the topic. This book is a follow-on and replacement to *Database in Depth: Relational Theory for Practitioners*, which I also own along with some of Mr. Date's earlier books. However, I found it a much more profitable read than *Database in Depth*. Mr. Date's writing is still recognizably his, with lots of digressions, notes, asides, and footnotes. But something's different. It is much more direct and readable, and I think readers will find it practical and applicable to their real-world problems. (This is Mr. Date's expressed hope.)

I had a lot of moments while reading the book where I thought *yes! He's said it so clearly! It always bugs me to see those mistakes, and finally here's a book that can teach people how not to make them*.

The book will help the student develop understanding of the relational model, and learn how SQL diverges from the relational model. As the book says, to the extent that SQL is correct and useful, it's largely because it adheres to the relational model; in the places where it takes a side trip, there be dragons. It's universal in every discipline, but I believe Mr. Date is the only authority I've read who says this about SQL: learn the rules, and when you know them, you know when and why it's safe to break them. Otherwise you're a ship without a rudder and compass.

The general format is this: learn the theory of some topic; learn about a relational approach; learn how that maps onto SQL; and learn some rules of thumb for staying away from the dangers caused by SQL's approach. Here are some of the recommendations, which he has highlighted in bold for easy reference at the appropriate places in the book:

*   Since the phrase "null value" is a contradiction in terms, don't use it; always say just "null" instead.
*   Never write SQL code that relies on ordinal positioning.
*   Never lie to the system by defining as a key some column combination that you know isn't irreducible.

Anyone who's tried to explain NULL to a beginner to SQL, or explain the difference between a key and an index, or fixed a system that broke because it relied on blind inserts and the table definition changed, will see the value of these recommendations. There's one such recommendation every few pages. This book is packed with them, and every one is well justified and rigorously explained.

That's not all. Mr. Date teaches the connection between logic and the relational model. Let me tell my own story here for a moment. I didn't know anything about databases (except a course on relational theory, which I was unable to connect to the "real world" at all) until after I'd left university with a degree in Computer Science. And then I learned SQL, and then sometime later, I put two and two together: all those discrete math courses, all those proofs, all those predicates and propositions, and so on &#8212; it was the foundation for the *sensible* part of relational databases. So eventually it all did come together in my head, and I got a huge kick out of that. Now I cheer whenever I see [someone teaching people to think logically][3] about databases.

So I was definitely cheering as I read things like *Types are sets of things we can talk about; relations are (true) statements we can make about those things*. And then there's a whole chapter on how to write questions you'd like to ask of a database, transform those into logical expressions, and then transform those in turn into *SQL that is correct and will give the right answer*.

I don't expect this book will work for everyone; some people will not have the foundation in either SQL or logic they need to understand it, and so it will be a steep learning curve unless they're willing to go study some other things as needed. And I think there is room for different approaches to teaching this subject, depending on the reader's mental orientation (visual, logical, etc). But for those who like the formal logic-based approach, and/or are willing to invest some effort into really understanding, I think the payoffs will be great.

 [1]: http://www.amazon.com/SQL-Relational-Theory-Write-Accurate/dp/0596523068?tag=xaprb-20
 [2]: http://oreilly.com/catalog/9780596523060/index.html
 [3]: http://en.oreilly.com/mysql2008/public/schedule/detail/794
