---
title: How to group data in SQL with a catch-all bucket
date: "2005-09-28"
permalink: /2005/09/28/grouping-data-with-catch-all-ranks/
---
In this article I'll show you how to group data into defined buckets, putting everything that doesn't fit into the defined buckets into a catch-all bucket.

For example, suppose my data is online ads, and I store each ad's current position in an integer column. The ads compete against ads from other advertisers, and the top bidder gets position 1. I want to count how many ads are in positions 1 through 5, with 6 through infinity lumped together. The results should look something like the following:

<table class="borders collapsed">
  <caption>Ranked Ads</caption> <tr>
    <th>
      rank
    </th>
    
    <th>
      num
    </th>
  </tr>
  
  <tr>
    <td>
      1
    </td>
    
    <td>
      6
    </td>
  </tr>
  
  <tr>
    <td>
      2
    </td>
    
    <td>
      8
    </td>
  </tr>
  
  <tr>
    <td>
      3
    </td>
    
    <td>
      13
    </td>
  </tr>
  
  <tr>
    <td>
      4
    </td>
    
    <td>
      18
    </td>
  </tr>
  
  <tr>
    <td>
      5
    </td>
    
    <td>
      11
    </td>
  </tr>
  
  <tr>
    <td>
      6
    </td>
    
    <td>
      90
    </td>
  </tr>
</table>

### Setup and sample data

Here are some queries to create 1000 rows of sample data, with ranks from 1 to 20. First, for Microsoft SQL Server:

<pre>create table #ad (
    rank int not null
)

insert into #ad(rank)
   select top 1000 cast(rand() * 19 + 1 as int)
   from number;</pre>

And for MySQL:

<pre>create table ad (rank int not null);
insert into ad (rank)
   select rand() * 19 + 1
   from number limit 1000;</pre>

### The queries

Here's a query for Microsoft SQL Server:

<pre>select
    case when rank &lt;= 5 then rank
        else 6
    end as rank,
    count(*) as num
from #ad
group by
    case when rank &lt;= 5 then rank
        else 6
    end
order by
    case when rank &lt;= 5 then rank
        else 6
    end;</pre>

And for MySQL:

<pre>select
    case when rank &lt;= 5 then rank
        else 6
    end as rank,
    count(*) as num
from ad
group by
    case when rank &lt;= 5 then rank
        else 6
    end
order by
    case when rank &lt;= 5 then rank
        else 6
    end;</pre>

The results on my data set are as follows:

<table class="borders collapsed">
  <caption>Ranked Ads</caption> <tr>
    <th>
      rank
    </th>
    
    <th>
      num
    </th>
  </tr>
  
  <tr>
    <td>
      1
    </td>
    
    <td>
      28
    </td>
  </tr>
  
  <tr>
    <td>
      2
    </td>
    
    <td>
      56
    </td>
  </tr>
  
  <tr>
    <td>
      3
    </td>
    
    <td>
      59
    </td>
  </tr>
  
  <tr>
    <td>
      4
    </td>
    
    <td>
      64
    </td>
  </tr>
  
  <tr>
    <td>
      5
    </td>
    
    <td>
      53
    </td>
  </tr>
  
  <tr>
    <td>
      6
    </td>
    
    <td>
      740
    </td>
  </tr>
</table>

Your results will vary because of the `RAND()` function.

### Shortening the code for readability

In MySQL, it's possible to make the query a bit shorter by referring to the result's `rank` column in the `GROUP BY` and `ORDER BY` clauses. This only works if the column is aliased to a different name than it has in the table. Aliasing a column in the result set to the same name as a column in the base table will confuse MySQL. For example, this works fine:

<pre>select
    case when rank &lt;= 5 then rank
        else 6
    end as bucket,
    count(*) as num
from ad
group by bucket
order by bucket</pre>

This, however, doesn't:

<pre>select
    case when rank &lt;= 5 then rank
        else 6
    end as rank,
    count(*) as num
from ad
group by rank
order by rank;</pre>

This query works fine on earlier versions of MySQL such as 3.23, but in later versions such as 5.x, it groups and orders by the *table's* `rank` column, not the *result's*. The result set changes to the following:

<table class="borders collapsed">
  <tr>
    <th>
      rank
    </th>
    
    <th>
      num
    </th>
  </tr>
  
  <tr>
    <td>
      1
    </td>
    
    <td>
      28
    </td>
  </tr>
  
  <tr>
    <td>
      2
    </td>
    
    <td>
      56
    </td>
  </tr>
  
  <tr>
    <td>
      3
    </td>
    
    <td>
      59
    </td>
  </tr>
  
  <tr>
    <td>
      4
    </td>
    
    <td>
      64
    </td>
  </tr>
  
  <tr>
    <td>
      5
    </td>
    
    <td>
      53
    </td>
  </tr>
  
  <tr>
    <td>
      6
    </td>
    
    <td>
      53
    </td>
  </tr>
  
  <tr>
    <td>
      6
    </td>
    
    <td>
      55
    </td>
  </tr>
  
  <tr>
    <td>
      6
    </td>
    
    <td>
      52
    </td>
  </tr>
  
  <tr>
    <td>
      6
    </td>
    
    <td>
      46
    </td>
  </tr>
  
  <tr>
    <td>
      6
    </td>
    
    <td>
      49
    </td>
  </tr>
  
  <tr>
    <td>
      6
    </td>
    
    <td>
      54
    </td>
  </tr>
  
  <tr>
    <td>
      6
    </td>
    
    <td>
      46
    </td>
  </tr>
  
  <tr>
    <td>
      6
    </td>
    
    <td>
      48
    </td>
  </tr>
  
  <tr>
    <td>
      6
    </td>
    
    <td>
      52
    </td>
  </tr>
  
  <tr>
    <td>
      6
    </td>
    
    <td>
      48
    </td>
  </tr>
  
  <tr>
    <td>
      6
    </td>
    
    <td>
      45
    </td>
  </tr>
  
  <tr>
    <td>
      6
    </td>
    
    <td>
      55
    </td>
  </tr>
  
  <tr>
    <td>
      6
    </td>
    
    <td>
      60
    </td>
  </tr>
  
  <tr>
    <td>
      6
    </td>
    
    <td>
      48
    </td>
  </tr>
  
  <tr>
    <td>
      6
    </td>
    
    <td>
      29
    </td>
  </tr>
</table>
