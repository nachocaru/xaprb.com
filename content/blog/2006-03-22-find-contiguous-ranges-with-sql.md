---
title: How to find contiguous ranges with SQL
author: Baron Schwartz
excerpt: |
  <p>In an earlier article I discussed how to <a href="/blog/2005/12/06/find-missing-numbers-in-a-sequence-with-sql/">find missing members in a sequence with SQL</a>.  In this article I'll do the reverse: demonstrate how to find the start and end point of each contiguous range.</p>
layout: post
permalink: /2006/03/22/find-contiguous-ranges-with-sql/
description:
  - >
    Explains how SQL can find the start and end of each range of contiguous values
    in a sequence.
---
In an earlier article I discussed how to [find missing members in a sequence with SQL][1]. In this article I&#8217;ll do the reverse: demonstrate how to find the start and end point of each contiguous range.

### Motivation

Someone posted a comment on the article linked above, asking how to do this. At least, that&#8217;s what I think the question was; I might be misinterpreting it. I considered replying in the comments on that article, but decided it should go in its own article instead.

I&#8217;ll use the same sample data as in the earlier article: a sequence of integers from 1 to 20, with the numbers 5, 11, 12, 13, and 14 missing. I&#8217;ll also delete the value 7, so 6 is a range of length 1. The desired answer is

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

This isn&#8217;t as easy as I thought it would be at first. I stared at it for a while, then it came to me: I want to find the start and end of each contiguous range, so I need to define &#8220;start&#8221; and &#8220;end.&#8221; The start of a range is defined by the absence of the preceding number. I initially thought &#8220;has a next but no previous,&#8221; but that&#8217;s incorrect because a single number is a valid range; if I require the start to have a &#8220;next,&#8221; that eliminates 6 (I initially wrote the whole thing wrong, then thought about single-number ranges and re-wrote everything). So the definition of &#8220;start&#8221; is a number that has no &#8220;previous.&#8221;

The end of a range is almost the reverse: it has no &#8220;next&#8221; but might have a &#8220;previous.&#8221; Additionally, it should be the smallest such number that&#8217;s greater than or equal to the start. The &#8220;or equal to&#8221; is again necessary to include ranges that are just one number.

Each of these queries is fairly simple by itself, using [exclusion joins][2]. Here&#8217;s one that will find the start of every range:

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

I&#8217;m referring to the left-hand table as &#8220;l&#8221; and the right-hand table as &#8220;r.&#8221; Here&#8217;s a query that will find the end of every range. It&#8217;s almost the same:

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

Bringing the two together, and meeting the &#8220;smallest value greater than or equal to&#8221; requirement, is a more complex query. Here I solve it with a correlated subquery:

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

I&#8217;ve re-aliased the subquery&#8217;s tables as &#8220;a&#8221; and &#8220;b&#8221; to avoid confusion with &#8220;r&#8221; and &#8220;l.&#8221;

 [1]: /blog/2005/12/06/find-missing-numbers-in-a-sequence-with-sql/
 [2]: /blog/2005/09/23/how-to-write-a-sql-exclusion-join/