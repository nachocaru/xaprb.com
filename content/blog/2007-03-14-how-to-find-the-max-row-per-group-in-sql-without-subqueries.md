---
title: How to find the max row per group in SQL without subqueries
author: Baron Schwartz
excerpt: '<p>A while ago I wrote about how to select the first, minimum, maximum or least row per group in SQL.  This article shows how to solve this problem without subqueries.</p>'
layout: post
permalink: /2007/03/14/how-to-find-the-max-row-per-group-in-sql-without-subqueries/
description:
  - Shows how to find the top rows per group in SQL without subqueries.
---
A while ago I wrote about how to select the [first, minimum, maximum or least row per group in SQL][1]. This article shows how to solve this problem without subqueries.

Like many SQL problems, the key to understanding the solution is to *rephrase the English question* to make it easy to translate into SQL.

### My first try

This is exactly the same problem as in my earlier article on [how to select the first/least/max row per group in SQL][1]. The only difference is subqueries are disallowed.

I love finding ways to do things without subqueries, even if I don&#8217;t have to. My first article on this blog was about [how to write subqueries in the FROM clause without using subqueries][2]. These tricks can occasionally be useful in very early versions of MySQL, which I still work with (I recently completed a consulting job where the only database available is MySQL 3.23).

My first thought on this problem was to use a [mutex table][3], another blast from the past. It would work, but it&#8217;s not the best way to do it.

### The solution

Let&#8217;s say you have a table of people, and you want to find the youngest of each gender. Here&#8217;s the table:

<table class="borders collapsed compact">
  <tr>
    <th>
      age
    </th>
    
    <th>
      name
    </th>
    
    <th>
      gender
    </th>
  </tr>
  
  <tr>
    <td>
      5
    </td>
    
    <td>
      david
    </td>
    
    <td>
      m
    </td>
  </tr>
  
  <tr>
    <td>
      8
    </td>
    
    <td>
      john
    </td>
    
    <td>
      m
    </td>
  </tr>
  
  <tr>
    <td>
      9
    </td>
    
    <td>
      jane
    </td>
    
    <td>
      f
    </td>
  </tr>
  
  <tr>
    <td>
      4
    </td>
    
    <td>
      kelly
    </td>
    
    <td>
      f
    </td>
  </tr>
  
  <tr>
    <td>
      11
    </td>
    
    <td>
      mary
    </td>
    
    <td>
      f
    </td>
  </tr>
  
  <tr>
    <td>
      13
    </td>
    
    <td>
      kay
    </td>
    
    <td>
      f
    </td>
  </tr>
</table>

The problem is easy if I rephrase it as &#8220;find all people where **there is no younger person** of the same gender.&#8221; That&#8217;s easy to write as a join and translate into an [exclusion join][4]:

*   Find all people &#8212; easy.
*   And for each person, find all younger people of the same gender &#8212; okay, join on gender and &#8220;age less than.&#8221;
*   Discard each row where there is a younger person &#8212; change the join to an exclusion join.

Here are the first two bullet points in SQL:

<pre>select young.*, younger.age
from person as young
   left outer join person as younger on younger.gender = young.gender
      and younger.age &lt; young.age

+------+-------+--------+------+
| age  | name  | gender | age  |
+------+-------+--------+------+
|    5 | david | m      | NULL | 
|    8 | john  | m      |    5 | 
|    9 | jane  | f      |    4 | 
|    4 | kelly | f      | NULL | 
|   11 | mary  | f      |    9 | 
|   11 | mary  | f      |    4 | 
|   13 | kay   | f      |    9 | 
|   13 | kay   | f      |    4 | 
|   13 | kay   | f      |   11 | 
+------+-------+--------+------+</pre>

Look at the rightmost column. There are `NULL`s only in rows where there&#8217;s **no younger person** of the same gender. Now it&#8217;s easy to &#8220;cross out&#8221; the other rows with the `WHERE` clause, and we&#8217;re done:

<pre>select young.*
from person as young
   left outer join person as younger on younger.gender = young.gender
      and younger.age &lt; young.age
where younger.age is null;

+------+-------+--------+------+
| age  | name  | gender | age  |
+------+-------+--------+------+
|    5 | david | m      | NULL | 
|    4 | kelly | f      | NULL | 
+------+-------+--------+------+</pre>

### How efficient is it?

As long as you have appropriate indexes on the table, this might not be as inefficient as you&#8217;d think. It&#8217;s theoretically a cross join, yes, but in reality if there&#8217;s a good index it&#8217;s only a repeated cross join on subsets of the data. In other words, you need a (gender, age) index on this table. Gender isn&#8217;t a very good example to use for this, because it will never be very selective, but if you only have a few rows per group and you have a leftmost index on the grouping column, it should work fine.

### Conclusion

As with so many other SQL challenges, if you re-phrase the question, it&#8217;s easy to select the maximum or minimum row per group without subqueries. The key is to understand what you want, and to be able to word the problem in a way that translates from English to SQL.

 [1]: /blog/2006/12/07/how-to-select-the-firstleastmax-row-per-group-in-sql/
 [2]: /blog/2005/09/21/subselects-in-mysql/
 [3]: /blog/2005/09/22/mutex-tables-in-sql/
 [4]: /blog/2005/09/23/how-to-write-a-sql-exclusion-join/