---
title: "How to write INSERT IF NOT EXISTS queries in standard  SQL"
date: "2005-09-25"
permalink: /2005/09/25/insert-if-not-exists-queries-in-mysql/
categories:
  - Databases
---
If necessary, INSERT IF NOT EXISTS queries can be written in a single atomic statement, eliminating the need for a transaction, and without violating standards. In this article I'll explain several ways to write such queries in a platform-independent way.

### Motivation

Suppose a table of urls has a unique index on the url:

<pre>create table urls(url varchar(200) primary key);</pre>

Now suppose I want to insert a row in a single statement, without using a transaction, and I only want the row to get inserted if the url isn't already in the table. I don't want any warnings or errors. I just want to issue a normal `INSERT` statement and know the url is now in the table.

Standard SQL provides no means of doing this. There's no syntax like this:

<pre>insert if not exists into url(url) values(...)</pre>

In Microsoft SQL Server, I can use an `IF` statement:

<pre>if not exists (select * from url where url = ...)
   insert into url...</pre>

This has to be wrapped in a transaction to avoid a race condition, though. Otherwise someone might insert a row between the time I check the table and when I insert the row. I want to do this in a single statement, without a transaction.

### Several solutions

One solution is to use a [mutex table][1]:

<pre>insert into urls(url)
select 'http://www.xaprb.com/blog/'
from mutex
    left outer join urls
        on urls.url = 'http://www.xaprb.com/blog/'
where mutex.i = 1 and urls.url is null;</pre>

There are more flexible variations on this technique. Suppose there is no unique index on the url column. If desired, it is possible to insert several values in a single statement by changing the `WHERE` clause:

<pre>insert into urls(url)
select 'http://www.xaprb.com/blog/'
from mutex
    left outer join urls
        on urls.url = 'http://www.xaprb.com/blog/'
where mutex.i &lt; 5 and urls.url is null;</pre>

Now suppose the requirements specify up to three duplicate entries in the table, and each insert should add a single row. It is possible to insert a row at a time while enforcing the requirement with the following query:

<pre>insert into urls(url)
select 'http://www.xaprb.com/blog/'
from mutex
    left outer join urls
        on urls.url = 'http://www.xaprb.com/blog/'
where mutex.i = 1
group by urls.url
having count(*) &lt; 3;</pre>

This query shows the input to the `INSERT` statement:

<pre>select 'http://www.xaprb.com/blog/', count(*)
from mutex
    left outer join urls
        on urls.url = 'http://www.xaprb.com/blog/'
where mutex.i = 1
group by urls.url;</pre>

If this article was useful to you, you should [subscribe][2] to stay current with my upcoming articles. It's free and convenient.

**Edit 2006-02-26** See also my article on using this and other techniques to do [flexible INSERT and UPDATE statements in MySQL][3].

 [1]: /blog/2005/09/22/mutex-tables-in-sql/
 [2]: /blog/subscribe/
 [3]: /blog/2006/02/21/flexible-insert-and-update-in-mysql/
