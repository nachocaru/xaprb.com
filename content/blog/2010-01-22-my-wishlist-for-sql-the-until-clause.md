---
title: 'My wishlist for SQL: the UNTIL clause'
author: Baron Schwartz
layout: post
permalink: /2010/01/22/my-wishlist-for-sql-the-until-clause/
categories:
  - PostgreSQL
  - SQL
---
I&#8217;d like an UNTIL clause, please. I&#8217;d use it sort of like LIMIT in MySQL and PostgreSQL, except that it would define when to stop <del datetime="2010-01-23T16:18:53+00:00">returning</del> looking for rows, instead of defining how many to return. Example:

`<pre>SELECT * FROM users ORDER BY user_id UNTIL user_id >= 100;</pre>` 
That would select users up to and including user 99. Ideally the clause could accept any boolean predicate, including subqueries. I&#8217;ll hold my breath and wait for this wish to come true now.