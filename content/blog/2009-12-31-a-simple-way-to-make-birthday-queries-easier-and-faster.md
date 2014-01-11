---
title: A simple way to make birthday queries easier and faster
author: Baron Schwartz
layout: post
permalink: /2009/12/31/a-simple-way-to-make-birthday-queries-easier-and-faster/
categories:
  - PostgreSQL
  - SQL
---
It&#8217;s New Year&#8217;s Eve, a date that should strike terror into the hearts of many, because tomorrow a bunch of their queries are going to fail.

Queries to &#8220;find all birthdays in the next week&#8221; and similar are always a nightmare to write. If you want to see a bunch of examples, go look at the user-contributed comments on [the MySQL date and time function reference][1]. This post is about a slightly saner way to do that. There&#8217;s still some nasty math involved, but a) a lot less of it, and b) at least the query will be able to use indexes[1].

So here&#8217;s my tip: instead of storing the user&#8217;s full birthdate, just store the month and day they were born. Try it. You&#8217;ll love it!

[1] Yes, I know Postgres can index a function. So this can be considered a jab at MySQL, which can&#8217;t.

 [1]: http://dev.mysql.com/doc/refman/5.1/en/date-and-time-functions.html