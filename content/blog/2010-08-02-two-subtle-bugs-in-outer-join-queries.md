---
title: Two subtle bugs in OUTER JOIN queries
date: "2010-08-02"
permalink: /2010/08/02/two-subtle-bugs-in-outer-join-queries/
categories:
  - Maatkit
  - SQL
tags:
  - bugs
  - 'null'
---
OUTER JOIN queries in SQL are susceptible to two very subtle bugs that I've observed a number of times in the real world. Daniel and I have been hammering out ways to automatically detect queries that suffer from these bugs, in [a relatively new Maatkit tool called mk-query-advisor][1]. It's part of our series of advisor tools for MySQL. I wrote [a blog post about it][2] a while ago. Automated analysis of bad query patterns is a good thing to write tools to do, because catching buggy queries is hard work if you do it manually.

Let's dive right in and analyze these subtle bugs. Warning: if you don't understand how SQL handles NULL, you're not going to understand the following. Many people have a hard time with NULL, which is why these bugs are so hard to understand and avoid. This is one reason why SQL is a hard language to use properly.

### Bug 1: a column could be NULL for two reasons, and you can't distinguish them

If the outer table in your query contains NULL-able columns, and you place a WHERE clause to filter out all but those rows, you're going to get bugs because a non-matching row in the outer table will be all-NULL. Here's an example. Let's start with a plain outer join query:

`<pre>
select * from L left join R on l_id = r_id;
+------+------+---------+
| l_id | r_id | r_other |
+------+------+---------+
|    1 |    1 |       5 | 
|    2 |    2 |    NULL | 
|    3 | NULL |    NULL | 
+------+------+---------+
</pre>` 
Here we see that one row in the outer table is missing, and one row (the middle row) has a NULL r_other column. Now, let's add a WHERE clause:

`<pre>
select * from L left join R on l_id = r_id where r_other is null;
+------+------+---------+
| l_id | r_id | r_other |
+------+------+---------+
|    2 |    2 |    NULL | 
|    3 | NULL |    NULL | 
+------+------+---------+
</pre>` 
This query is buggy, because the two rows are returned for completely different reasons, and you can't be sure which is which. IS NULL clauses can safely be placed on the columns used in the JOIN clause, but not on other columns in the outer table that might be NULL.

### Bug 2: an OUTER JOIN is converted to INNER

If you place a non-null-safe comparison operator on any column in the outer table that isn't part of the JOIN clause, you implicitly disable the outer-ness of the query and convert it to an INNER JOIN. Here's an example:

`<pre>
select * from L left join R on l_id = r_id where r_other > 1;
+------+------+---------+
| l_id | r_id | r_other |
+------+------+---------+
|    1 |    1 |       5 | 
+------+------+---------+
</pre>` 
The left-outer-ness of the above query is what causes the third row to be output in the first query I showed you above. The greater-than operator in this example automatically makes the left-ness impossible, because anytime there's a row in the inner table that has no match in the outer table, it'll be filled in with NULLs, and those NULLs will be eliminated by the operator. So the effect is that only matching rows will ever be output.

If you want to ponder variations and subtleties of the above, you can read more discussion on [the issue report where we're hammering out the details][3] of automatically detecting and warning about these sneaky errors.

 [1]: http://www.maatkit.org/doc/mk-query-advisor.html
 [2]: http://www.xaprb.com/blog/2010/03/16/try-mk-query-advisor-a-new-maatkit-tool/
 [3]: http://code.google.com/p/maatkit/issues/detail?id=950
