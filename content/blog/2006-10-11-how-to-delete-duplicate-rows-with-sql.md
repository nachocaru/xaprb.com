---
title: How to delete duplicate rows with SQL
date: "2006-10-11"
url: /blog/2006/10/11/how-to-delete-duplicate-rows-with-sql/
categories:
  - Databases
---
The comments on my article [how to find duplicate rows with SQL][1] made me realize I was simplifying things too much. In particular, I really glossed over the "how to delete duplicate rows" section, which I should have explained in more detail. I hope this article will remedy the omissions.

Update: I've now written another article on [deleting duplicates when you have no primary key][2].

### What's wrong with what I wrote?

I assumed a beginner audience in my other article. Specifically, I assumed a beginner programmer who designs a table, connects some program to it, and then discovers a bunch of duplicate data because of incorrect table design. The programmer then has to find and delete the duplicate rows before putting unique indexes and primary keys on the data. And because I assumed a relatively small, non-mission-critical task, I suggested you can make a temporary table to aid in deleting the duplicate rows.

This isn't realistic for a couple of reasons. First, as you showed me, many of you are beyond the simplistic ways to delete duplicates. Second, unless you have the data all to yourself, you need to find and delete the duplicates in an atomic operation, leaving no chance for more duplicates to sneak in while you're working.

### Two ways to do it

There are essentially two ways to do this: in one statement, or in multiple statements. If you do it in one statement, the statement is atomic, and you don't need a transaction. If you use temporary tables or another method and use multiple statements, you have to do it all in a transaction.

It's probably easier and better to do it in one statement, contrary to what I suggested previously.

### How to delete duplicates with a single statement

The basic technique is to do a grouped self-join or subquery. That will make more sense in a moment.

First, familiarize yourself with the basic techniques I explained for [finding the duplicate rows][3], especially the section on finding the data you need to delete them. This will become the innermost query in your self-join. Here's the query I'll use (refer to the other article for details):

<pre>select day, MIN(id)
from test
group by day
having count(*) &gt; 1</pre>

You cannot delete from that result set, but you can delete by joining against it or using it in a subquery. First, I'll show you how to self-join against the grouped query.

### Technique 1: a grouped self-join

Place the find-bad-rows query into a subquery in the `FROM` clause, and join against it in such a way that the join will succeed only on rows you don't want:

<pre>select bad_rows.*
from test as bad_rows
   inner join (
      select day, MIN(id) as min_id
      from test
      group by day
      having count(*) &gt; 1
   ) as good_rows on good_rows.day = bad_rows.day
      and good_rows.min_id &lt;&gt; bad_rows.id;</pre>

Notice I'm joining on days that match **and excluding the row I want to keep, the one with the minimum value for `id`.** If that query returns the rows you don't want, you're good to go. All you have to do is put the `DELETE` in front of it:

<pre>delete bad_rows.*
from test as bad_rows
   inner join (
      select day, MIN(id) as min_id
      from test
      group by day
      having count(*) &gt; 1
   ) as good_rows on good_rows.day = bad_rows.day
      and good_rows.min_id &lt;&gt; bad_rows.id;</pre>

The syntax will vary slightly depending on your RDBMS. I've written this for MySQL (MySQL users might also need to be careful about [cross-database deletes][4]). This will also only work on versions of MySQL where subqueries are implemented.

### Technique 2: correlated subquery

The second method is to use a correlated subquery and place the find-bad-rows query inside the subquery. You can write these subqueries many different ways. Here's one rather sub-optimal way:

<pre>delete test_outer.*
from test as test_outer
where exists(
   select *
   from test as test_inner
   where test_inner.day = test_outer.day
   group by day
   having count(*) &gt; 1
      and min(test_inner.id) &lt;&gt; test_outer.id
);</pre>

This won't even work on MySQL because it is trying to [select from the same table it's modifying][5]. There are some silly tricks to get around this, which force intermediate materialization of the subquery, but in general you're better off using the `JOIN` technique in MySQL.

[**Edit:** I originally listed an alternate query using a silly trick, which didn't work (my mistake). I've removed that because that kind of query is a Stupid Thing To Do. If you are competent enough to write that query, I don't need to tell you how. See the comments to follow the conversation about this.]

### Technique 3: be clever about your data

Both the previous techniques rely on certain behaviors and database features. How about relying on the data itself to enable a smart, efficient deleting algorithm?

If most groups have duplicates, but there are not many duplicate rows within each group, this can be very efficient and doesn't require any subqueries:

<pre>delete bad_rows.*
from test as good_rows
   inner join test as bad_rows on bad_rows.day = good_rows.day
      and bad_rows.id &gt; good_rows.id;</pre>

This works because I decided I wanted to keep the row with the smallest `id` in each group. That means I can do a self-join that matches rows with a strict greater-than. Greater than what? The minimum value of `id` for that value of `day`, of course.

This is essentially a cross join, which is an O(n<sup>2</sup>) algorithm in the pathological worst case, but if there are not many duplicate rows, it's basically the same cost as a regular join.

There are cases where this method is really terrible, too. For instance, you have a hundred million rows and only one duplicate row. You'd be joining a hundred million rows against a hundred million rows, eliminating all but one of them, and deleting it. That would be a very bad idea because it would take forever. It could be much more efficient to find the lone duplicate and delete just it, without doing all the joining.

### Conclusion

I hope this article filled in some of the gaps in my other article. I've shown you at least three techniques for deleting duplicate rows with a single atomic query. Each is good for some scenarios and bad for others.

If you found this useful, you should [subscribe][6] by e-mail or feeds and get my upcoming articles conveniently.

 [1]: http://www.xaprb.com/blog/2006/10/09/how-to-find-duplicate-rows-with-sql/
 [2]: http://www.xaprb.com/blog/2007/02/06/how-to-delete-duplicate-rows-with-sql-part-2/
 [3]: http://www.xaprb.com/blog/2006/10/09/how-to-find-duplicate-rows-with-sql/
 [4]: http://www.xaprb.com/blog/2006/08/07/how-to-write-multi-table-cross-database-deletes-with-aliases-in-mysql/
 [5]: http://www.xaprb.com/blog/2006/06/23/how-to-select-from-an-update-target-in-mysql/
 [6]: http://www.xaprb.com/blog/subscribe/

 *[RDBMS]: Relational Database Management System
