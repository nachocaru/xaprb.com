---
title: The dangerous subtleties of LEFT JOIN and COUNT() in SQL
date: "2009-04-08"
url: /blog/2009/04/08/the-dangerous-subtleties-of-left-join-and-count-in-sql/
categories:
  - Databases
  - Programming
---
I want to show you two very expensive SQL idioms that almost everyone uses. These are not query optimization problems -- they are *financially* expensive patterns of SQL.

These queries don't do what the user thinks they do, and thus they create subtle bugs. And the bugs cause a lot of trouble, and they're hard to track down, and much time is spent on them. I've been meaning to write about this for a while, but a book I read recently brought this topic up again, so I dug this draft out and finished it.

### Pattern One: LEFT JOIN

There is a big problem with LEFT JOIN. Can you think what it is? If not, ask yourself what's the most confusing thing about SQL? That's right, it's NULL. People don't understand NULL, and even people who do understand it have trouble with it, because it's ugly and nasty and illogical. And LEFT JOIN introduces NULL into your queries, even when there aren't any NULLs in your data.

What's wrong with this query?

<pre>select tweedle, dee, dum
from table1
   left join table2 on table1.foo = table2.foo
where bar = 5;
</pre>

If you don't see a problem, you've just discovered why this is an expensive query pattern. Suppose I rewrote it like this?

<pre>select tweedle, dee, dum
from table1
   left join table2 on table1.foo = table2.foo
where <strong>table2.bar</strong> = 5;
</pre>

Consider what happens when there is no matching row in table2. SQL fills in the "missing" row with NULL. And what happens then? table2.bar = 5 is unknown (it's neither true nor false), so that entire row is eliminated from the result.

And as a result, the query is exactly equivalent to an INNER JOIN. Subtle but true; and I see this query pattern over and over again in the real world. A significant amount of the time that I'm asked to do query optimizations (20% of the time? maybe more?), I end up explaining that a LEFT JOIN query doesn't do what the user thinks it does.

### Pattern Two: COUNT()

Ironically, COUNT() is one of the few SQL aggregate functions that actually has correct behavior according to the relational model some of the time (but not all of the time). Unfortunately, it has two problems: 1) all the other functions behave incorrectly all of the time according to the relational model, so it's *different*, and 2) it has a special-case behavior that many people don't understand.

To recap briefly, COUNT() has two behaviors. If you say COUNT(expression), then it counts the number of rows in the result for which that expression is not NULL. In other words, *it counts the number of values* in the result. The other behavior is COUNT(*), which counts the cardinality (number of rows) of the result.

There's a lot to discuss here, but I want to look at just one thing. Let's look at the following query:

<pre>select user.userid, count(email.subject)
from user
   inner join email on user.userid = email.userid
group by user.userid;
</pre>

What's happening in that query? There are a few possibilities I see. The most obvious way to translate this query into English is "get the number of conversations for each user." Except that's not what it does. It counts the number of emails each user has. If I wanted the number of conversations, I'd need to say "count(distinct email.subject)". You need the DISTINCT keyword there.

I said it counts the number of emails each user has, but it really doesn't. It actually counts the number of times there is a value in email.subject (e.g. it is NOT NULL). If the column is defined to allow NULL, there *might* be a difference between the number of values in email.subject and the number of emails! So, if the query's author really wanted to know the number of emails, the query should be this:

<pre>select user.userid, <strong>count(*)</strong>
from user
   inner join email on user.userid = email.userid
group by user.userid;
</pre>

But what if that's not what the author of the query meant? There's no way to really know. There are several possible intended meanings for the query, and there are several different ways to write the query to express those meanings more clearly. But the original query is ambiguous, for a few reasons. And everyone who reads this query afterwards will end up guessing what the original author meant. "I think I can safely change this to&#8230;"

This example is meant to be simple, so it doesn't illustrate perfectly, but I've seen lots of cases where many different interpretations are equally reasonable. I often end up being asked to optimize performance for such queries, and again I can only write back to the client "someone needs to tell me what this query is supposed to do, because I can't figure it out."

### Summary

So now you've seen two query idioms to avoid, and why to avoid them. And you've seen that the problems are really caused by NULL! If you're interested in exploring this train of thought further, you should get a copy of [SQL and Relational Theory by C. J. Date][1].

 [1]: /blog/2009/03/29/a-review-of-sql-and-relational-theory-by-c-j-date/
