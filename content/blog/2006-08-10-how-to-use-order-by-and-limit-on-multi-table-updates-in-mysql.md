---
title: How to use ORDER BY and LIMIT on multi-table updates in MySQL
author: Baron Schwartz
excerpt: '<p>One of my colleagues recently redesigned a system to schedule work for programs to do, and needed to write a multiple-table <code>UPDATE</code> with <code>ORDER BY</code> and <code>LIMIT</code>, neither of which is supported for multiple-table UPDATE in MySQL.  This article explains how to do it anyway, and shows how to rewrite a first attempt for hundreds of times better performance.</p>'
layout: post
permalink: /2006/08/10/how-to-use-order-by-and-limit-on-multi-table-updates-in-mysql/
description:
  - >
    Explains how to rewrite multi-table UPDATE statements for MySQL so you can use
    the LIMIT and ORDER BY clauses, which are normally not allowed.
---
One of my colleagues recently redesigned a system for scheduling work, and needed to write a multiple-table `UPDATE` with `ORDER BY` and `LIMIT`, neither of which is supported for multiple-table UPDATE in MySQL. This article explains how to do it anyway, and shows how to rewrite a first attempt for hundreds of times better performance.

### Introduction

Without revealing too much about my employer&#8217;s internal systems, I want to give a little bit of context. First, we have a table that holds work to be done:

<pre>create table work_to_do (
   client int not null,
   work_unit int not null,
   priority float not null,
   processor int not null default 0,
   primary key(client, work_unit),
   key(priority),
   key(processor, priority)
) engine=InnoDB;</pre>

Each row in this table represents a job for a client. The actual work is defined elsewhere, as rows in another table that can be looked up from `work_unit`. When there&#8217;s some work to be done, the row is inserted with `processor` = 0 and `priority` set to some number calculated by another process. The idea is to do the highest-priority jobs first.

We have a program that may have multiple running instances, each of which looks at the table and tries to claim a set of work for itself, to be handled by no other process. In order to do this, each process tries to update some rows so `processor` is its UNIX process ID. Once `processor` is non-zero, the row is reserved for that process to do.

There&#8217;s another table that defines which clients are eligible for processing, whether they&#8217;re in the `work_to_do` table or not.

### The first attempt

The query to claim a set of rows for a process needs to update the ten highest-priority unclaimed rows for eligible clients. Since it needs to access more than one table, and needs to order and limit the results, at first it seems you can&#8217;t do this query at all, because `ORDER BY` and `LIMIT` aren&#8217;t allowed for multi-table updates:

<blockquote cite="http://dev.mysql.com/doc/refman/5.0/en/update.html">
  <p>
    For the multiple-table syntax, UPDATE updates rows in each table named in table_references that satisfy the conditions. In this case, ORDER BY and LIMIT cannot be used.
  </p>
</blockquote>

However, a [standard searched `UPDATE` statement][1] with a subquery doesn&#8217;t count as a multi-table update, so you can do it like this:

<pre>-- @process_id is actually passed in as a parameter
-- set @process_id = 17603;
update work_to_do
   set processor = @process_id
   where processor = 0
      and client in (select client from eligible_client)
   order by priority desc
   limit 10</pre>

There&#8217;s only one problem: performance sucks. You are probably aware that `IN()` subqueries are converted by the `in_optimizer` to correlated subqueries, [sometimes with severe performance penalties][2].

I created the tables on my home computer, and ran the above query with 5,000 rows in `work_to_do`. With 50 rows in `eligible_client` the query completes in a 0.13 seconds, but with 5,000 the correlated subquery becomes a real performance problem; it takes 9.8 seconds, which is very slow for this machine. It means this may be an O(n^2) algorithm.

### The query after optimizing

To eliminate the badly optimized subquery, you need to rewrite the subquery as a join, but how can you do that and retain the `LIMIT` and `ORDER BY`? One way is to find the rows to be updated in a subquery in the `FROM` clause, so the `LIMIT` and `ORDER BY` can be nested inside the subquery. In this way `work_to_do` is joined against the ten highest-priority unclaimed rows of itself. Normally [you can&#8217;t self-join the update target][3] in a multi-table `UPDATE`, but since it&#8217;s within a subquery in the `FROM` clause, it works in this case. 
<pre>update work_to_do as target
   inner join (
      select w. client, work_unit
      from work_to_do as w
         inner join eligible_client as e on e.client = w.client
      where processor = 0
      order by priority desc
      limit 10
   ) as source on source.client = target.client
      and source.work_unit = target.work_unit
   set processor = @process_id;</pre>

Now the query runs in 0.04 seconds. That&#8217;s a factor of 250 speedup, and it&#8217;s even several times faster than the un-optimized query when there were only 50 rows in the `eligible_client` table.

There is one downside: the rows are not locked in primary key order. This may help explain the occasional deadlock we get on this table (see [my article about a &#8220;little-known&#8221; way to cause a deadlock][4]). Do you have any suggestions for how to work around this?

### Summary

In this article I&#8217;ve shown you how to use subqueries to work around limitations on multi-table `UPDATE` statements, and then I demonstrated how an alternate way to rewrite the query performs about 250 times better on a small data set than the obvious solution.

If this article was useful to you, [subscribe via e-mail or feeds][5] to receive future articles conveniently and free.

 [1]: /blog/2006/03/11/many-to-one-problems-in-sql/
 [2]: /blog/2006/04/30/how-to-optimize-subqueries-and-joins-in-mysql/
 [3]: /blog/2006/06/23/how-to-select-from-an-update-target-in-mysql/
 [4]: /blog/2006/08/03/a-little-known-way-to-cause-a-database-deadlock/
 [5]: /blog/subscribe/