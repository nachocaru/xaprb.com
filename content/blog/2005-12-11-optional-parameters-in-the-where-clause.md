---
title: How to simulate optional parameters in SQL
date: "2005-12-11"
permalink: /2005/12/11/optional-parameters-in-the-where-clause/
categories:
  - Databases
---
This article explains how to write `WHERE` clauses that accept optional parameters, reducing the need for separate queries. I have seen a lot of SQL code where the `SELECT` is duplicated many times, but the `WHERE` clause is different in each one, and only one will execute. It's easy to factor out the differences in the `WHERE` clause. For example, consider the following code, assuming two optional parameters to the query:

<pre>if @param1 is not null
    select * from table1 where col1 = @param1
else
    select * from table1 where col2 = @param2</pre> This can be rewritten: 

<pre>select * from table1
where (@param1 is null or col1 = @param1)
    and (@param2 is null or col2 = @param2)</pre>

### Why it's better this way

The duplication above may not seem like a big deal, but when the `SELECT` statement is 50 lines of code and there are 10 optional parameters, it's a huge problem to have all that code duplicated:

*   it's hard to test
*   the code is likely to get buggy when someone tries to change it
*   it's hard to be sure the repeated code is exactly the same in all the places it's duplicated

To the last point: even worse, it's hard to be sure the code *isn't* the same either. In other words, if I suspect there *are* differences in the `SELECT`, all the duplication makes it hard to find the differences, so the code becomes much harder to read, and I'm much less confident I haven't missed something. Note: if the code isn't really repeated, insert a comment so someone like me doesn't come along and try to "fix" it!

### How it works

Any decent query optimizer should be able to recognize when a clause is always true or always false, and either delete the clause or terminate the query with no results. For example, pretend I have the following query:

<pre>select * from t1
where (? is null or c1 = ?)
    and (? is null or c2 = ?)</pre>

Now suppose my parameters are `3` and `NULL`. What happens to the query?

<pre>select * from t1
where (3 is null or c1 = 3)
    and (NULL is null or c2 = NULL)</pre>

Any decent optimizer, including MySQL's optimizer, will rewrite that query:

<pre>select * from t1
where (c1 = 3)</pre>

You can use `EXPLAIN EXTENDED`, followed by `SHOW WARNINGS`, to see this at work in MySQL.

### Possible reasons not to do this

There is a potential downside (besides "fixers" like myself getting into the code). The query optimizer might not be able to optimize the combined statement as well as the separate ones, so if this is mission-critical or gets called all the time, measure its performance. Be especially watchful as regards indexes. If there is an index on one of the columns in the `WHERE` clause, the combined statement might prevent the query optimizer from using the index, especially as the query becomes more complex. The bottom line, as always, is to consider whether performance matters, and if it does, measure performance, analyze the query plan, and proceed accordingly.
