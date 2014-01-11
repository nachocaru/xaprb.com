---
title: What is a SQL blind insert?
author: Baron Schwartz
excerpt: "<p>SQL blind inserts are a common mistake, but they're easily avoided.  This article explains what blind inserts are and how to avoid them, as well as dispelling a common misconception about how to avoid them.</p>"
layout: post
permalink: /2006/07/07/what-is-a-sql-blind-insert/
description:
  - >
    Explains what a SQL blind insert is, how to spot it, and dispels a common
    misconception about how to fix it.
---
SQL blind inserts are a common mistake, but they&#8217;re easily avoided. This article explains what blind inserts are and how to avoid them, as well as dispelling a common misconception about how to avoid them.

### What is a blind insert?

A blind insert is when an `INSERT` query doesn&#8217;t specify which columns receive the inserted data. For instance, this query is a blind insert:

<pre>insert into apples
   select color, price, variety
   from fruits
   where type = 'apple';</pre>

Notice the query doesn&#8217;t say what columns are targeted by the `INSERT`. In fact, it&#8217;s impossible to tell just by looking at this query. The only thing I know from this query is that the first three columns of the `apples` table, whatever those may be, will receive the values from the `SELECT`.

This query needs to specify the target columns by name, all of them:

<pre>insert into apples (color, price, type)
   select color, price, variety
   from fruits
   where type = 'apple';</pre>

### Why is this a bad thing?

Because the database schema may change. Columns may be moved, renamed, added, or deleted. And when they are, one of at least three things can happen:

1.  The query fails. This is the best-case scenario. Someone deleted a column from the target table, and now there aren&#8217;t enough columns for the insert to go into, or someone changed a data type and the inserted type isn&#8217;t compatible, or so on. But at least your data isn&#8217;t getting corrupted, and you may even know the problem exists because of an error message.
2.  The query continues to work, and nothing is wrong. This is a middle-worst-case scenario. Your data isn&#8217;t corrupt, but the monster is still hiding under the bed.
3.  The query continues to work, but now some data is being inserted somewhere it doesn&#8217;t belong. Your data is getting corrupted.

Usually, when this happens, it&#8217;s in the middle of the night when that scheduled task runs, and you&#8217;re at home in bed when the phone rings. Yuck!

Even in the best case, it can be hard to figure out what&#8217;s wrong, because the columns in the target table aren&#8217;t the way they used to be. You could end up very confused, under a lot of pressure to fix something in the middle of the night, and the extra documentation provided by the named target columns isn&#8217;t there. Notice in my example above, the `variety` column from the `fruits` table is actually supposed to go into the `type` column in the `apples` table. Imagine there&#8217;s also a column named `variety` on the `apples` table, but it&#8217;s for a different bit of data&#8230; you might end up trying to &#8216;fix&#8217; the broken query by putting the wrong data into the wrong column, if you didn&#8217;t have those named targets to alert you that&#8217;s not the right thing to do.

### How to fix this

The solution is really easy, of course. Just name the inserts. But it goes beyond that; it helps to have a [coding standard][1] and a review process when code is released.

Sometimes I&#8217;ve seen people get confused about the distinction between naming the target columns and naming the select columns. For example, sometimes people think this is equivalent to naming the target columns:

<pre>insert into apples
   select 5 as price, ...</pre>

The above syntax does *not* put 5 into the `price` column. The source columns can be named anything; it&#8217;s just a name, and it doesn&#8217;t influence where the data goes. In fact, giving anonymous columns in the source a name is completely superfluous. Even if you&#8217;re in the habit of doing it as &#8220;documentation&#8221; of where the source should go, it&#8217;s a bad idea, simply because it can become wrong when someone changes the query. It&#8217;s like [a comment that repeats what the code already says][2]: it&#8217;s redundant, and therefore a liability.

 [1]: /blog/2006/04/26/sql-coding-standards/
 [2]: /blog/2005/12/10/tell-me-why-not-what/