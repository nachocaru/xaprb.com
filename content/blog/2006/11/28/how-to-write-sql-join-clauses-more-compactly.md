---
title: How to write SQL JOIN clauses more compactly
date: "2006-11-28"
url: /blog/2006/11/28/how-to-write-sql-join-clauses-more-compactly/
categories:
  - Databases
---
Here's a way to write join clauses so they are more compact, more readable, and less confusing.

Standard SQL:2003 defines a `USING` clause that can serve the same function as the `ON` clause in the familiar `JOIN` syntax. For example, the following join

<pre>select a.col1, b.col2
from a
   inner join b on a.col3 = b.col3</pre>

May be written as follows:

<pre>select a.col1, b.col2
from a
   inner join b <strong>using(col3)</strong></pre>

That may not look like much of an improvement, but it is a big help in larger joins where many tables have columns with the same names. In these cases, not only is it tedious to write out every pair of columns that must match in the join, you often have to refer to the tables with aliases too. And it's tough to read such a join and understand it, or debug it. For example, what's wrong with this join?

<pre>select tbl1.col1, tbl2.col2, tbl3.col2, tbl4.col1
from apples as tbl1
   inner join oranges as tbl2 on tbl1.col3 = tbl2.col3
   inner join grapes as tbl3 on tbl3.col3 = tbl2.col3
   inner join peaches as tbl4 on tbl3.col3 = tbl2.col3</pre>

The statement is valid and will execute, but it won't give the results you probably wanted (tbl4&#8242;s join clause doesn't refer to any columns from tbl4). The bug is even harder to find if the statement isn't [neatly indented and consistently organized][1]. That statement is better written with `USING` clauses:

<pre>select tbl1.col1, tbl2.col2, tbl3.col2, tbl4.col1
from apples as tbl1
   inner join oranges as tbl2 <strong>using(col3)</strong>
   inner join grapes as tbl3 <strong>using(col3)</strong>
   inner join peaches as tbl4 <strong>using(col3)</strong></pre>

`USING` matches the specified columns from each table, eliminating the need to write them out twice explicitly with aliases. In MySQL 5, you can see how the statement gets rewritten by the optimizer with `EXPLAIN EXTENDED` followed by `SHOW WARNINGS`. The result shows that it gets rewritten as an old-style join with the column-matching done in the `WHERE` clause.

`USING` isn't a drop-in replacement for the `ON` clause in normal join syntax. There are some differences, especially on different platforms (and in MySQL's case, even differences between versions of the product -- see [MySQL JOIN Syntax][2]). This probably makes relational purists hot under the collar. Of course, everything about SQL makes relational purists mad, because SQL isn't relational, and database products are even less relational than the SQL standard... oh well.

In my opinion, use it if it makes your life easier. Programming is hard -- use whatever your tools give you to ease the burden.

One more note: there's also a `NATURAL JOIN` syntax that automatically discovers columns with the same names in both tables and matches them in the join. I don't use this in programs, because if someone adds more columns to one of the tables involved in such a join, the join criteria will silently change. I think [join criteria should always be explicit][1], for the same reason [I avoid blind inserts][3]. However, this syntax can be convenient for writing one-off queries at the command line.

 [1]: /blog/2006/04/26/sql-coding-standards/
 [2]: http://dev.mysql.com/doc/refman/4.1/en/join.html
 [3]: /blog/2006/07/07/what-is-a-sql-blind-insert/
