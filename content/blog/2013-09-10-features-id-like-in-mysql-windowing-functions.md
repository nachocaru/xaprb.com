---
title: "Features I'd like in MySQL: windowing functions"
date: "2013-09-10"
url: /blog/2013/09/10/features-id-like-in-mysql-windowing-functions/
categories:
  - Databases
---

Continuing with my wishlist, I'll add windowing functions. They're enormously powerful. They allow you to extend relational logic beyond the strict boundaries of tuples. In MySQL at present, one must use ugly hacks to preserve state from one row to the next, such as user variables -- which are not guaranteed to work if the optimizer changes the query plan. 

And yeah, PostgreSQL and SQL Server have windowing functions too, and once you've used them it's a little hard to go back. This is in fact one of the main things I hear from people who love PostgreSQL for what I consider to be legitimate reasons. 

Windowing functions extend the uses of SQL (sometimes awkwardly, sometimes elegantly), into areas you can't really go without them. Time-series data, for example, or more powerful graph processing. These things must be done externally to SQL otherwise, in ugly procedural logic. 

Windowing functions together with CTEs ([my previous post)][1] are particularly powerful. 

Anyone want to guess what my next wish will be?



 [1]: http://www.xaprb.com/blog/2013/09/09/features-id-like-to-see-in-mysql-ctes/ "Features I’d like to see in MySQL: CTEs"

