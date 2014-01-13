---
title: How to find contiguous ranges with SQL
date: "2006-03-22"
permalink: /blog/2006/03/22/find-contiguous-ranges-with-sql/
categories:
  - Databases
---
In an earlier article I discussed how to [find missing members in a sequence with SQL][1]. In this article I'll do the reverse: demonstrate how to find the start and end point of each contiguous range.

### Motivation

Someone posted a comment on the article linked above, asking how to do this. At least, that's what I think the question was; I might be misinterpreting it. I considered replying in the comments on that article, but decided it should go in its own article instead.

I'll use the same sample data as in the earlier article: a sequence of integers from 1 to 20, with the numbers 5, 11, 12, 13, and 14 missing. I'll also delete the value 7, so 6 is a range of length 1. The desired answer is

<table class="borders collapsed">
  <tr>
    <th>
      start
    </th>
    
    <th>
      end
    </th>
  </tr>
  
  <tr>
    <td>
      1
    </td>
    
    <td>
      4
    </td>
  </tr>
  
  <tr>
    <td>
      6
    </td>
    
    <td>
      6
    </td>
  </tr>
  
  <tr>
    <td>
      8
    </td>
    
    <td>
      10
    </td>
  </tr>
  
  <tr>
    <td>
      15
    </td>
    
    <td>
      20
    </td>
  </tr>
</table>

### The solution

This isn't as easy as I thought it would be at first. I stared at it for a while, then it came to me: I want to find the start and end of each contiguous range, so I need to define "start" and "end." The start of a range is defined by the absence of the preceding number. I initially thought "has a next but no previous," but that's incorrect because a single number is a valid range; if I require the start to have a "next," that eliminates 6 (I initially wrote the whole thing wrong, then thought about single-number ranges and re-wrote everything). So the definition of "start" is a number that has no "previous."

The end of a range is almost the reverse: it has no "next" but might have a "previous." Additionally, it should be the smallest such number that's greater than or equal to the start. The "or equal to" is again necessary to include ranges that are just one number.

Each of these queries is fairly simple by itself, using [exclusion joins][2]. Here's one that will find the start of every range:

<pre>select l.id
from sequence as l
    left outer join sequence as r on r.id = l.id - 1
where r.id is null;</pre>

<table class="borders collapsed">
  <tr>
    <th>
      id
    </th>
  </tr>
  
  <tr>
    <td>
      1
    </td>
  </tr>
  
  <tr>
    <td>
      6
    </td>
  </tr>
  
  <tr>
    <td>
      8
    </td>
  </tr>
  
  <tr>
    <td>
      15
    </td>
  </tr>
</table>

I'm referring to the left-hand table as "l" and the right-hand table as "r." Here's a query that will find the end of every range. It's almost the same:

<pre>select l.id
from sequence as l
    left outer join sequence as r on r.id = l.id + 1
where r.id is null;</pre>

<table class="borders collapsed">
  <tr>
    <th>
      id
    </th>
  </tr>
  
  <tr>
    <td>
      4
    </td>
  </tr>
  
  <tr>
    <td>
      6
    </td>
  </tr>
  
  <tr>
    <td>
      10
    </td>
  </tr>
  
  <tr>
    <td>
      20
    </td>
  </tr>
</table>

Bringing the two together, and meeting the "smallest value greater than or equal to" requirement, is a more complex query. Here I solve it with a correlated subquery:

<pre>select l.id as start,
    (
        select min(a.id) as id
        from sequence as a
            left outer join sequence as b on a.id = b.id - 1
        where b.id is null
            and a.id &gt;= l.id
    ) as end
from sequence as l
    left outer join sequence as r on r.id = l.id - 1
where r.id is null;</pre>

I've re-aliased the subquery's tables as "a" and "b" to avoid confusion with "r" and "l."

 [1]: /blog/2005/12/06/find-missing-numbers-in-a-sequence-with-sql/
 [2]: /blog/2005/09/23/how-to-write-a-sql-exclusion-join/
