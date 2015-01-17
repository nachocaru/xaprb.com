---
title: A simple way to make birthday queries easier and faster
date: "2009-12-31"
url: /blog/2009/12/31/a-simple-way-to-make-birthday-queries-easier-and-faster/
categories:
  - Databases
---
It's New Year's Eve, a date that should strike terror into the hearts of many, because tomorrow a bunch of their queries are going to fail.

Queries to "find all birthdays in the next week" and similar are always a nightmare to write. If you want to see a bunch of examples, go look at the user-contributed comments on [the MySQL date and time function reference][1]. This post is about a slightly saner way to do that. There's still some nasty math involved, but a) a lot less of it, and b) at least the query will be able to use indexes[1].

So here's my tip: instead of storing the user's full birthdate, just store the month and day they were born. Try it. You'll love it!

[1] Yes, I know Postgres can index a function. So this can be considered a jab at MySQL, which can't.

 [1]: http://dev.mysql.com/doc/refman/5.1/en/date-and-time-functions.html
