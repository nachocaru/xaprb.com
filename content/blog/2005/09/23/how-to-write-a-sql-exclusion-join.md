---
title: How to write a SQL exclusion join
date: "2005-09-23"
url: /blog/2005/09/23/how-to-write-a-sql-exclusion-join/
categories:
  - Databases
---
There is usually more than one way to write a given query, but not all ways are created equal. Some mathematically equivalent queries can have drastically different performance. This article examines one of the motivations for inventing `LEFT OUTER` join and including it in the SQL standard: improved performance through exclusion joins.

`LEFT OUTER` join syntax was added to the SQL-92 standard specifically to address certain queries that had only been possible with `NOT IN` subqueries. The disadvantage of using subqueries in these situations is that they may require creating many anonymous tables and probing into them. A clever optimizer could generate the same plan as a `LEFT OUTER` join, but since there was no such thing at the time and query optimizers were much less capable, query performance could take quite a hit. I should pause here and say that I wasn't programming in 1992, so I'm only speaking from the history I've read and heard, not from personal experience. However, I definitely have personal experience with the performance hits of `NOT IN` queries!

### Setup

I'll use two tables of data, `apples` and `oranges`.

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

### The old-style way

In old-style SQL, one joined data sets by simply specifying the sets, and then specifying the match criteria in the `WHERE` clause, like so:

<pre>select *
from apples, oranges
where apples.Price = oranges.Price
    and apples.Price = 5</pre>

Placing the join conditions in the `WHERE` clause is confusing when queries get more complex. It becomes hard to tell which conditions are used to join the tables (`apples.Price = oranges.Price`), and which are used to exclude results (`apples.Price = 5`). The two are equivalent in old-style joins, but as mentioned, some joins cannot be written in this style (more on this later).

### The new way

The updated SQL standard addressed these issues by separating the join conditions from the `WHERE` clause. Join conditions now go in the `FROM` clause, greatly clarifying the syntax. Here is the simple join written in the newer style:

<pre>select *
from apples
    inner join oranges
         on apples.Price = oranges.Price
where apples.Price = 5</pre>

### Outer joins

Separating the join conditions from the `WHERE` clause allows `OUTER` joins. There are three kinds of `OUTER` joins: `LEFT`, `RIGHT` and `FULL`. The most common is a `LEFT OUTER` join, but all three types have the characteristic of not eliminating rows entirely from the result set when they fail the condition. Instead, when data does not match, the row is included from one table as usual, and the other table's columns are filled with `NULLs` (since there is no matching data to insert).

In a `LEFT OUTER` join, *every row* from the left-hand table is included, whether there is a matching row in the right-hand table or not. When there is a matching row in the right-hand table, it is included; otherwise the right-hand table's columns are filled with `NULL`s. A demonstration may clarify:

<pre>select *
from apples
    left outer join oranges
        on apples.Price = oranges.Price</pre>

<table class="borders collapsed">
  <caption>apples and oranges</caption> <tr>
    <th>
      Variety
    </th>
    
    <th>
      Price
    </th>
    
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
    
    <td>
      Navel
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
    
    <td class="null">
      NULL
    </td>
    
    <td class="null">
      NULL
    </td>
  </tr>
</table>

`INNER` joins select matching rows in the result set. It is possible to use an `INNER` join to select apples and oranges with matching prices, as above. With `LEFT OUTER` joins it is possible to answer the reverse query, "show me apples for which there are no oranges with a matching price." Simply eliminate matching rows in the `WHERE` clause:

<pre>select apples.Variety
from apples
    left outer join oranges
        on apples.Price = oranges.Price
where oranges.Price is null</pre>

### Outer joins are not possible with inner join

The above query is not possible with `INNER JOIN`. The following query does **not** accomplish the same thing:

<pre>select apples.Variety
from apples
    inner join oranges
        on apples.Price = oranges.Price
where apples.Price &lt;&gt; oranges.Price</pre>

In fact, this query will return nothing, because the join condition contradicts the `WHERE` clause. This query is not the same thing either:

<pre>select apples.Variety
from apples
    inner join oranges on
        apples.Price &lt;&gt; oranges.Price</pre>

Why? Because if there are no rows in oranges, nothing will get returned. It is simply not possible to write this query with an `INNER` join or an old-style join, no matter what technique is used. Don't be fooled by analyzing the two data sets presented in this article; for some cases you may be able to get the same behavior, but not for all possible data sets. There is a way to write this query using subqueries, though:

<pre>select apples.Variety
from apples
where apples.Price not in (
        select Price from oranges)</pre>

### Outer joins and subqueries

Why use a `LEFT OUTER` join instead of using a subquery? Depending on the query, this technique may force the subquery to be evaluated for *every* row in the left-hand table (especially for correlated subqueries, where the subquery refers to values from the left-hand table). A `LEFT OUTER` join, by contrast, can often use a much more efficient query plan. Again, they may be mathematically equivalent -- and a good query optimizer may generate the same query plan, but this is not always the case. It depends heavily on the query, the optimizer, and how the tables are indexed. I have seen queries perform orders of magnitude better when rewritten with an exclusion join.
