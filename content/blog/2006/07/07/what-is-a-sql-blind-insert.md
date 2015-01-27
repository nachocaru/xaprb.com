---
title: What is a SQL blind insert?
date: "2006-07-07"
url: /blog/2006/07/07/what-is-a-sql-blind-insert/
categories:
  - Databases
---
SQL blind inserts are a common mistake, but they're easily avoided. This article explains what blind inserts are and how to avoid them, as well as dispelling a common misconception about how to avoid them.

### What is a blind insert?

A blind insert is when an `INSERT` query doesn't specify which columns receive the inserted data. For instance, this query is a blind insert:

<pre>insert into apples
   select color, price, variety
   from fruits
   where type = 'apple';</pre>

Notice the query doesn't say what columns are targeted by the `INSERT`. In fact, it's impossible to tell just by looking at this query. The only thing I know from this query is that the first three columns of the `apples` table, whatever those may be, will receive the values from the `SELECT`.

This query needs to specify the target columns by name, all of them:

<pre>insert into apples (color, price, type)
   select color, price, variety
   from fruits
   where type = 'apple';</pre>

### Why is this a bad thing?

Because the database schema may change. Columns may be moved, renamed, added, or deleted. And when they are, one of at least three things can happen:

1.  The query fails. This is the best-case scenario. Someone deleted a column from the target table, and now there aren't enough columns for the insert to go into, or someone changed a data type and the inserted type isn't compatible, or so on. But at least your data isn't getting corrupted, and you may even know the problem exists because of an error message.
2.  The query continues to work, and nothing is wrong. This is a middle-worst-case scenario. Your data isn't corrupt, but the monster is still hiding under the bed.
3.  The query continues to work, but now some data is being inserted somewhere it doesn't belong. Your data is getting corrupted.

Usually, when this happens, it's in the middle of the night when that scheduled task runs, and you're at home in bed when the phone rings. Yuck!

Even in the best case, it can be hard to figure out what's wrong, because the columns in the target table aren't the way they used to be. You could end up very confused, under a lot of pressure to fix something in the middle of the night, and the extra documentation provided by the named target columns isn't there. Notice in my example above, the `variety` column from the `fruits` table is actually supposed to go into the `type` column in the `apples` table. Imagine there's also a column named `variety` on the `apples` table, but it's for a different bit of data... you might end up trying to 'fix' the broken query by putting the wrong data into the wrong column, if you didn't have those named targets to alert you that's not the right thing to do.

### How to fix this

The solution is really easy, of course. Just name the inserts. But it goes beyond that; it helps to have a [coding standard][1] and a review process when code is released.

Sometimes I've seen people get confused about the distinction between naming the target columns and naming the select columns. For example, sometimes people think this is equivalent to naming the target columns:

<pre>insert into apples
   select 5 as price, ...</pre>

The above syntax does *not* put 5 into the `price` column. The source columns can be named anything; it's just a name, and it doesn't influence where the data goes. In fact, giving anonymous columns in the source a name is completely superfluous. Even if you're in the habit of doing it as "documentation" of where the source should go, it's a bad idea, simply because it can become wrong when someone changes the query. It's like [a comment that repeats what the code already says][2]: it's redundant, and therefore a liability.

 [1]: /blog/2006/04/26/sql-coding-standards/
 [2]: /blog/2005/12/10/tell-me-why-not-what/
