---
title: How to write subqueries without using subqueries in SQL
author: Baron Schwartz
layout: post
permalink: /2005/09/21/subselects-in-mysql/
categories: Database
---
Some queries that seemingly require the use of subqueries in the FROM clause (commonly called [derived tables][1]) can be written without them. This is useful for earlier versions of MySQL, which do not support subqueries. In this article I&#8217;ll explain how to get the effect of subqueries without actually using them.

The basic principle that makes this work is this: a subquery in the FROM clause really works like an anonymous view, and can be accomplished as joins to base tables, *as long as the joins don&#8217;t interact*.

### Introduction

I&#8217;ll demonstrate how to add a sum across two grouped subqueries with a single grouped select. The three example tables are as follows:

<pre>create table category (
    uid int primary key,
    title varchar(50)
);
create table item (
    uid int primary key,
    cat int,
    qty int,
    checkedout int
);
create table bulk_checkout (
    uid int primary key,
    cat int,
    qty int
);</pre>

These tables represent a very simplified version of an inventory system I maintain. Items are entered individually where possible, and tagged with their ID number; tents, bikes etc are entered individually, with a quantity of 1. There are also items that we donâ€™t count separately, such as AA batteries. These are entered together as a single item, and given a quantity of 30, for example.

When we check items out, we either check out a certain item, say item #47, or we check out X items of category Y. For example, 15 AA batteries would be checked out as qty 15 of category â€œMiscâ€. We check out a specific item by updating its `checkedout` column, but we check out in bulk by inserting into `bulk_checkout`.

### How I&#8217;d write the query with subqueries

The example query is a summary of item count and checked-out count, grouped by category. Here is how I would write this query with subqueries:

<pre>select
  category.title,
  it.qty,
  coalesce(it.qtyout, 0)
    + coalesce(bulk.qtyout, 0) as qtyout
from category
  left outer join (
    select cat, sum(qty) as qty,
    sum(
      case when checkedout = 1 then qty else 0 end
    ) as qtyout
    from item
    group by cat
  ) as it on it.cat = category.uid
  left outer join (
    select cat, sum(qty) as qtyout
    from bulk_checkout
    group by cat
  ) as bulk on bulk.cat = category.uid</pre>

### A failed attempt

Here is how I first tried to write this without subqueries. It will not work; see if you can figure out why:

<pre>select
  category.title,
  sum(it.qty) as qty,
  sum(
    case when checkedout = 1 then it.qty else 0 end
    + coalesce(bulk_checkout.qty, 0)) as qtyout
from category
  left outer join item as it on it.cat = category.uid
  left outer join bulk_checkout
    on bulk_checkout.cat = category.uid</pre>

It will not work because the joins may cause rows to appear more than once in the result set, which will cause them to be counted too many times in the sums. For instance, if there are two entries in `bulk_checkout` for category 1, every row in `item` for category 1 will be duplicated, and the `qty` will be twice too large. You may think you can divide by `count(*)`, or take averages, or do some other such magic, but I donâ€™t think there is a way to do so. Leave a comment if you find a way to do it!

Why is this? The subselects need to be independent, so rows in bulk`_checkout` and `item` must not have any effect on each other (via the join) as discussed above.

### A solution

I need a way to join to both tables in one query, while having the effect of two queries that each join only to one of them. How is this possible? I can think of only one way: join on some mutually exclusive values, so rows from one table aren&#8217;t mixed with rows from the other table. A [mutex table][2] is the only answer I am aware of. Here is the query written with the mutex table:

<pre>select category.title, sum(it.qty) as qty,
  sum(
    case when checkedout = 1 then it.qty else 0 end
    + coalesce(bulk_checkout.qty, 0)) as qtyout
from category
  inner join mutex on i in (0, 1)
  left outer join item as it
    on it.cat = category.uid and i = 0
  left outer join bulk_checkout
    on bulk_checkout.cat = category.uid and i = 1
group by category.title</pre>

Iâ€™m not saying subqueries should be rewritten like this. If your RDBMS supports them, subqueries can simplify and clarify queries, and may improve query performance (if youâ€™re using them as you should). The mutex technique actually results in 50% null values on the right-hand side, which hurts performance. There is also another table in the join, which depending on the query plan chosen will cause twice the probing, inner looping, or hashing (because it has two rows). There is also grouping, which requires sorting (bad), and coalescing, (negligible).

I tried this idea on Microsoft SQL Server with `set statistics io on`, and examined the query plan and performance on a small data set. The query plan is straightforward in either case, but using mutex joins resulted in more logical reads, the expected result. I do not have statistics on the performance on MySQL.

 [1]: /blog/2005/09/26/sql-subqueries-and-derived-tables/
 [2]: http://www.xaprb.com/blog/2005/09/22/mutex-tables-in-sql/

 *[RDBMS]: Relational database management system