---
title: How to simulate FULL OUTER JOIN in MySQL
permalink: /2006/05/26/how-to-write-full-outer-join-in-mysql/
description:
  - "Shows how to emulate FULL OUTER JOIN with a mutex table when the RDBMS doesn't support FULL OUTER JOIN."
---
In this article I'll show several ways to emulate a `FULL OUTER` join on a RDBMS that doesn't support it, as is the case with even the most recent versions of MySQL. This useful query is surprisingly tricky to get right.

### Introduction

A standard SQL `FULL OUTER` join is like a `LEFT` or `RIGHT` join, except that it includes all rows from both tables, matching them where possible and filling in with `NULL`s where there is no match. I'll illustrate that for clarity. Here are two of my favorite tables, `apples` and `oranges`:

<table class="borders collapsed">
  <caption>apples</caption> <tr>
    <th>
      Variety
    </th>
    
    <th>
      Price
    </th>
  </tr>
  
  <tr>
    <td>
      Fuji
    </td>
    
    <td>
      5.00
    </td>
  </tr>
  
  <tr>
    <td>
      Gala
    </td>
    
    <td>
      6.00
    </td>
  </tr>
</table>

<table class="borders collapsed">
  <caption>oranges</caption> <tr>
    <th>
      Variety
    </th>
    
    <th>
      Price
    </th>
  </tr>
  
  <tr>
    <td>
      Valencia
    </td>
    
    <td>
      4.00
    </td>
  </tr>
  
  <tr>
    <td>
      Navel
    </td>
    
    <td>
      5.00
    </td>
  </tr>
</table>

I'll join them on price. Here is the left join:

<pre>select * from apples as a
    left outer join oranges as o on a.price = o.price</pre>

<table class="borders collapsed">
  <tr>
    <th scope="row">
      variety
    </th>
    
    <th scope="row">
      price
    </th>
    
    <th scope="row">
      variety
    </th>
    
    <th scope="row">
      price
    </th>
  </tr>
  
  <tr>
    <td>
      Fuji
    </td>
    
    <td>
      5
    </td>
    
    <td>
      Navel
    </td>
    
    <td>
      5
    </td>
  </tr>
  
  <tr>
    <td>
      Gala
    </td>
    
    <td>
      6
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
  </tr>
</table>

And the right join:

<pre>select * from apples as a
    right outer join oranges as o on a.price = o.price</pre>

<table class="borders collapsed">
  <tr>
    <th scope="row">
      variety
    </th>
    
    <th scope="row">
      price
    </th>
    
    <th scope="row">
      variety
    </th>
    
    <th scope="row">
      price
    </th>
  </tr>
  
  <tr>
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td>
      Valencia
    </td>
    
    <td>
      4
    </td>
  </tr>
  
  <tr>
    <td>
      Fuji
    </td>
    
    <td>
      5
    </td>
    
    <td>
      Navel
    </td>
    
    <td>
      5
    </td>
  </tr>
</table>

The `FULL OUTER JOIN` of these two tables, on price, should give the following result: <table class="borders collapsed">
  <tr>
    <th scope="row">
      variety
    </th>
    
    <th scope="row">
      price
    </th>
    
    <th scope="row">
      variety
    </th>
    
    <th scope="row">
      price
    </th>
  </tr>
  
  <tr>
    <td>
      Fuji
    </td>
    
    <td>
      5
    </td>
    
    <td>
      Navel
    </td>
    
    <td>
      5
    </td>
  </tr>
  
  <tr>
    <td>
      Gala
    </td>
    
    <td>
      6
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
  </tr>
  
  <tr>
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td>
      Valencia
    </td>
    
    <td>
      4
    </td>
  </tr>
</table>

That's the result I'll be working toward in this article. Here is a script to create and populate the example tables, so you can follow along:

<pre>create table apples (variety char(10) not null primary key, price int not null);
create table oranges (variety char(10) not null primary key, price int not null);
insert into apples(variety, price) values('Fuji',5),('Gala',6);
insert into oranges(variety, price) values('Valencia',4),('Navel',5);</pre>

### Method 1: two `JOIN`s and a `UNION`

One method to simulate a full join is to take the union of two outer joins, for example,

<pre>select * from apples as a
    left outer join oranges as o on a.price = o.price
union
select * from apples as a
    right outer join oranges as o on a.price = o.price</pre>

This gives the desired results in this case, but it isn't correct for all cases. Suppose there are duplicate records in the tables (remove the primary key and insert twice to create this situation). `UNION` eliminates duplicates, which a full join doesn't do. `UNION ALL` isn't the right answer either, because it will cause spurious duplicates. In fact, `UNION` generates two independent result sets and then combines them, so there is no way to get around this, because the two result sets need to "know about each other" to produce the right results.

There are legitimate cases where duplicate results are expected and correct. For instance, even when the rows are unique, selecting only certain columns, in which there are duplicates, could cause this situation. This doesn't apply in relational theory, because a set never has duplicates no matter what, but it does in SQL.

### Method 2: `UNION ALL` and an exclusion join

One way to make `UNION` include only the duplicates I want is to use an [exclusion join][1] to eliminate anything from the second result that is already included in the first, like this:

<pre>select * from apples as a
   left outer join oranges as o on a.price = o.price
union all
select * from apples as a
   right outer join oranges as o on a.price = o.price
where a.price is null;</pre>

This handles duplicate rows correctly and doesn't include anything it shouldn't. It's necessary to use `UNION ALL` instead of plain `UNION`, which would eliminate the duplicates I want to keep. This may be significantly more efficient on large result sets, since there's no need to sort and remove duplicates.

### Method 3: use a mutex table

There's a case where `UNION` won't work: older versions of MySQL don't support it. All is not lost, though.

I've written several articles explaining how to start with a set of mutually exclusive numbers (which I informally call a "[mutex table][2]"), then use the mutual exclusivity of the numbers to join things together in interesting ways. This lets me simulate subqueries and unions on earlier versions of MySQL, for example. This approach seems like it might work well here, too. For the following queries I'll assume my mutex table has the values 0 and 1. Here's a baseline mutex query for these two tables:

<pre>select * from mutex
    left outer join apples as a on i = 0
    left outer join oranges as o on i = 1;</pre>

<table class="borders collapsed">
  <tr>
    <th scope="row">
      i
    </th>
    
    <th scope="row">
      variety
    </th>
    
    <th scope="row">
      price
    </th>
    
    <th scope="row">
      variety
    </th>
    
    <th scope="row">
      price
    </th>
  </tr>
  
  <tr>
    <td>
    </td>
    
    <td>
      Fuji
    </td>
    
    <td>
      5
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
  </tr>
  
  <tr>
    <td>
    </td>
    
    <td>
      Gala
    </td>
    
    <td>
      6
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
  </tr>
  
  <tr>
    <td>
      1
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td>
      Valencia
    </td>
    
    <td>
      4
    </td>
  </tr>
  
  <tr>
    <td>
      1
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td>
      Navel
    </td>
    
    <td>
      5
    </td>
  </tr>
</table>

Of course this isn't a full join. If I want to full join on price, naturally, I need to include price in the join criteria somewhere, and the query above doesn't even mention the price. But it's a starting point for tinkering.

The mutex values in the leftmost column, combined with the join criteria, ensure that every row in the two tables gets included on its own row. The mutual exclusivity causes the Navel row not to be matched to the Fuji row, even though they have the same price. The correct behavior of a full join on price is to "fill in" the `NULL` values where the prices are equal. This modification to the join criteria will fill it in:

<pre>select * from mutex
    left outer join apples as a on i = 0
    left outer join oranges as o on i = 1 or a.price = o.price;</pre>

The `or a.price = o.price` relaxes the mutual exclusivity, telling the join to keep the rows separated unless they have the same price:

<table class="borders collapsed">
  <tr>
    <th scope="row">
      i
    </th>
    
    <th scope="row">
      variety
    </th>
    
    <th scope="row">
      price
    </th>
    
    <th scope="row">
      variety
    </th>
    
    <th scope="row">
      price
    </th>
  </tr>
  
  <tr>
    <td>
    </td>
    
    <td>
      Fuji
    </td>
    
    <td>
      5
    </td>
    
    <td>
      Navel
    </td>
    
    <td>
      5
    </td>
  </tr>
  
  <tr>
    <td>
    </td>
    
    <td>
      Gala
    </td>
    
    <td>
      6
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
  </tr>
  
  <tr>
    <td>
      1
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td>
      Valencia
    </td>
    
    <td>
      4
    </td>
  </tr>
  
  <tr>
    <td>
      1
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td>
      Navel
    </td>
    
    <td>
      5
    </td>
  </tr>
</table>

That's getting closer. There is a spurious row, though. The Navel row at the bottom of the result set shouldn't be there; it has already been matched to the Fuji row earlier, so there's no need to include it with all those `NULL`s as though there were no matching row in `apples`. Can I eliminate the Navel row without eliminating the Valencia row?

That turns out to be harder to do. I stared at it for a while, thinking I could include a `WHERE` clause that would eliminate spurious rows based on the value of `i`, but after a bit I got a reality check: the row has already been included above, and `WHERE` clauses work a row at a time, so there's no way to assert something about one row while applying the `WHERE` clause to another row. This simple fact is all I needed to realize there's no way to eliminate the Navel row with the given information.

What I can do, though, is stack another copy of the `apples` table onto the right-hand side of the results thus far, matching them to the `oranges` values *and confining them to rows with mutex value 1 instead of 0*. Now I can write a `WHERE` clause to see if a row in the `i = 1` part of the result set matches a row in the `i = 0` part. I'll write it without the `WHERE` clause to start:

<pre>select * from mutex
   left outer join apples as a on i = 0
   left outer join oranges as o on i = 1 or a.price = o.price
   left outer join apples as a2 on i = 1 and a2.price = o.price;</pre>

<table class="borders collapsed">
  <tr>
    <th scope="row">
      i
    </th>
    
    <th scope="row">
      variety
    </th>
    
    <th scope="row">
      price
    </th>
    
    <th scope="row">
      variety
    </th>
    
    <th scope="row">
      price
    </th>
    
    <th scope="row">
      variety
    </th>
    
    <th scope="row">
      price
    </th>
  </tr>
  
  <tr>
    <td>
    </td>
    
    <td>
      Fuji
    </td>
    
    <td>
      5
    </td>
    
    <td>
      Navel
    </td>
    
    <td>
      5
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
  </tr>
  
  <tr>
    <td>
    </td>
    
    <td>
      Gala
    </td>
    
    <td>
      6
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
  </tr>
  
  <tr>
    <td>
      1
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td>
      Valencia
    </td>
    
    <td>
      4
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
  </tr>
  
  <tr>
    <td>
      1
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td>
      Navel
    </td>
    
    <td>
      5
    </td>
    
    <td>
      Fuji
    </td>
    
    <td>
      5
    </td>
  </tr>
</table>

Now there is a way to tell between the Navel row, which I don't want, and the Valencia, which I do: the Navel has non-`NULL` values in the rightmost copy of `apples`, but the Valencia doesn't. All I have to do is eliminate rows that have matching values:

<pre>select * from mutex
   left outer join apples as a on i = 0
   left outer join oranges as o on i = 1 or a.price = o.price
   left outer join apples as a2 on i = 1 and a2.price = o.price
where o.price is null or a2.price is null</pre>

If the `WHERE` clause is hard to understand, perhaps it's easier to think of it this way: `where not(o.price is not null and a2.price is not null)`. Both clauses are identical; all I did was apply some boolean identities. Here is the result:

<table class="borders collapsed">
  <tr>
    <th scope="row">
      i
    </th>
    
    <th scope="row">
      variety
    </th>
    
    <th scope="row">
      price
    </th>
    
    <th scope="row">
      variety
    </th>
    
    <th scope="row">
      price
    </th>
    
    <th scope="row">
      variety
    </th>
    
    <th scope="row">
      price
    </th>
  </tr>
  
  <tr>
    <td>
    </td>
    
    <td>
      Fuji
    </td>
    
    <td>
      5
    </td>
    
    <td>
      Navel
    </td>
    
    <td>
      5
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
  </tr>
  
  <tr>
    <td>
    </td>
    
    <td>
      Gala
    </td>
    
    <td>
      6
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
  </tr>
  
  <tr>
    <td>
      1
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td>
      Valencia
    </td>
    
    <td>
      4
    </td>
    
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
  </tr>
</table>

That result has the correct rows, but it has some extra columns, which I don't need. Here's the final query:

<pre>select a.*, o.* from mutex
   left outer join apples as a on i = 0
   left outer join oranges as o on i = 1 or a.price = o.price
   left outer join apples as a2 on i = 1 and a2.price = o.price
where o.price is null or a2.price is null</pre>

Remember, this can't be done without the mutex table, because I need something to provide non-`NULL` values for every row; otherwise the joins would not include values where the leftmost table has no rows to contribute.

This technique works if there are duplicate rows, and works on older versions of MySQL, but is probably the least efficient of the three I've demonstrated here. As usual, which query is appropriate depends on circumstances.

 *[RDBMS]: Relational Database Management System

 [1]: /blog/2005/09/23/how-to-write-a-sql-exclusion-join/
 [2]: /blog/2005/09/22/mutex-tables-in-sql/
