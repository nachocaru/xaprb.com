---
title: How to understand SQL joins
date: "2005-10-03"
permalink: /2005/10/03/understanding-sql-joins/
categories:
  - Databases
---
I have noticed many people do not understand SQL joins, even after somewhat successfully using them for a time. Joins are key to understanding SQL. This article explains what joins really are and what they really do.

Many programmers learn SQL by writing it. I learned it by studying relational algebra under the tutelage of a theoretically-minded specialist in real-time databases. I never spoke of tables and columns; I thought in sigmas and other funny letters, and I spoke of tuples and relations. When I got a real job, I had a lot to learn about SQL in the real world, though my theoretical background helped me in some ways. I think a thorough grounding in theory is good, so I will approach this article (somewhat) from that angle.

SQL is a functional language. Try to think of a SELECT statement as a function. That is, a mathematical function, or mapping, which -- this is important -- *maps an input to an output*. When you select data from a table, think of the table as a source. Data streams out of the table. If it helps you, think of a little grinding cog icon. Then it streams out of the cog onto your screen as a familiar tabular result set. The cog is the SELECT statement, the function. It *transforms* the data. Maybe it just passes it straight through, but it really is a mapping of input to output. (By the way, if you take this approach when programming in XSLT or LISP, you will grasp things much more easily.)

A join is a SELECT statement with multiple data sources. The data streams from those sources into your cog icon, and a single stream flows out again. A SELECT statement always has one and only one output. (Why? Think of a function&#8230; think back to your math classes). Joins are functions that perform matching between data streams. The matching is necessary to merge the multiple input streams into a single output.

Let's look at two tables of data, `apples` and `oranges`.

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

Here is an example SELECT statement:

<pre>select apples.Variety, oranges.Price
from apples
    inner join oranges on apples.Price = oranges.Price</pre>

Here is (conceptually) what happens when we join these tables:

Choose a left-hand table (the first table in the SELECT statement).
For each row in the right-hand table, take the entire left-hand table and stack its rows next to the row in the right-hand table.

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
        
        <td rowspan="2">
          Valencia
        </td>
        
        <td rowspan="2">
          4.00
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
      
      <tr>
        <td>
          Fuji
        </td>
        
        <td>
          5.00
        </td>
        
        <td rowspan="2">
          Navel
        </td>
        
        <td rowspan="2">
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

Fill in the missing rows in the right-hand table by duplicating them into the empty spaces.

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
          Valencia
        </td>
        
        <td>
          4.00
        </td>
      </tr>
      
      <tr>
        <td>
          Gala
        </td>
        
        <td>
          6.00
        </td>
        
        <td>
          Valencia
        </td>
        
        <td>
          4.00
        </td>
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
        
        <td>
          Navel
        </td>
        
        <td>
          5.00
        </td>
      </tr>
    </table>

The result is a large table containing the *cross-product* or *Cartesian product* of the two data sets. Now satisfy the matching criteria by applying them as a predicate to each row in this new data set. If the predicate is true for the row, include it, otherwise exclude it. The result contains a single row:

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
    </table>

Now choose only the desired columns from the result:

<table class="borders collapsed">
      <caption>apples and oranges</caption> <tr>
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
    </table>

This may not be what a given query optimizer really does to execute a join, but the result is the same regardless of the algorithm. If a query optimizer does something different, it is for efficiency, not correctness. *Every* join *always* involves a cross product followed by choosing the desired data from the result.
