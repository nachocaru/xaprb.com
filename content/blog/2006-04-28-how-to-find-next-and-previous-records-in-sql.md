---
title: How to find next and previous records in SQL
date: "2006-04-28"
url: /blog/2006/04/28/how-to-find-next-and-previous-records-in-sql/
categories:
  - Databases
---
In this article I'll show you how to find the "next" and "previous" records (define these terms any way you like) in a set of records. My solution uses no subqueries or unions, so it works on old versions of MySQL, and returns both the next and the previous records in a single efficient query.

### Motivation

I'm working on a project right now that requires me to use MySQL 3.23, because that's what the production server uses. This means I'm digging out my old hacks and neat tricks to get around such limitations as the lack of subqueries. One of the really great things about this is that it makes me think hard about queries instead of just reaching for the familiar ways of doing things.

One of the pages displays a record in a series. I want a link to the next and previous in the series, if they exist. I want to do it in one query. I want my query to return the data, all the data, and nothing but the data.

My data's primary key is a foreign key to another table, and a sequence number. Suppose it's log entries, as in my post about [surrogate keys][1]. Here's my test suite (I'm omitting the `message` column):

<table class="borders collapsed">
  <tr>
    <th>
      t1
    </th>
    
    <th>
      seq
    </th>
  </tr>
  
  <tr>
    <td>
      5
    </td>
    
    <td>
      98
    </td>
  </tr>
  
  <tr>
    <td>
      5
    </td>
    
    <td>
      99
    </td>
  </tr>
  
  <tr>
    <td>
      5
    </td>
    
    <td>
      100
    </td>
  </tr>
  
  <tr>
    <td>
      5
    </td>
    
    <td>
      101
    </td>
  </tr>
  
  <tr>
    <td>
      5
    </td>
    
    <td>
      105
    </td>
  </tr>
</table>

### Stuff that doesn't work

It's easy to do this in two queries. Given entry `5:100`, I can write one query that finds the next entry, if it exists:

<pre>select min(seq) from t1log where t1=5 and seq &gt; 100;</pre>

I can do the same thing for the previous entry. But I can't write both "min-where-greater" and "max-where-less" into one `WHERE` clause without subqueries or unions. I could get around that with [mutex tables][2], but there's got to be a better way.

### First try

If I sort the entries by how far away they are from the current entry, I can select the closest two.

<pre>select 
    case when seq &gt; 100 then 'next' else 'prev' end as 'direction',
    seq
from t1log
where t1 = 5
    and seq &lt;&gt; 100
order by abs(100 - seq), seq
limit 2;</pre>

There are two problems with this query. If the magic number is the last entry, it'll select the *two* previous records. And a gap in the sequence will make it select the wrong values too. Try it with 100, 101, and 105, and you'll see what I mean. Sometimes it works, sometimes not.

### One right way

If I can partition my data into two groups, those greater than and those less than, and select the minimum from the greater-than and maximum from the less-than, then I can do what I wished I could do above. Here I'll use the `SIGN` function for brevity, but a `CASE` statement would work too:

<pre>select
    case when sign(seq - 100) &gt; 0 then 'next' else 'prev' end as dir,
    case when sign(seq - 100) &gt; 0 then min(seq) else max(seq) end as seq
from t1log
where t1 = 5
    and seq &lt;&gt; 100
group by sign(seq - 100)
order by sign(seq - 100)</pre>

The trick is to find the right query to partition the data. That will depend on the meaning of "next" and "previous" in the specific application. In this case, partitioning by integer greater-than and less-than is easy.

MySQL likes this query, too. It uses the index well, so it's nice and efficient. You can `EXPLAIN` the query to see how it does it -- basically, it can constrain its search to a range of values in the primary key itself, since it doesn't need any data other than the key (no bookmark lookups needed). It would be even more efficient to do it with a `UNION`, but that's not available in MySQL 3.23.

So there you have it, another solution in search of a problem. I hope you enjoyed it. There are probably other ways to do it, but this is at least one way that works.

### Update 2006-09-26

I noticed a bug with MySQL 3.23: though it makes no sense at all, I have to rewrite the query with another `then` clause instead of `else`, like this:

<pre>select
    case when sign(seq - 100) &gt; 0 then 'next' else 'prev' end as dir,
    case when sign(seq - 100) &gt; 0 then min(seq)
        <strong>when sign(seq - 100) &lt; 0 then</strong> max(seq) end as seq
from t1log
where t1 = 5
    and seq &lt;&gt; 100
group by sign(seq - 100)
order by sign(seq - 100)</pre>

If I don't do this, the "prev" `seq` value is NULL. For some reason, the "prev" `dir` value is not null in the same query. Very odd, no?

 [1]: /blog/2006/04/20/sequences-and-surrogate-keys-in-generic-sql/
 [2]: /blog/2005/09/22/mutex-tables-in-sql/
