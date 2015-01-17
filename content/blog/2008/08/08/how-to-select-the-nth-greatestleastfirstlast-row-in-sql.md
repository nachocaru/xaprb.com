---
title: How to select the Nth greatest/least/first/last row in SQL
date: "2008-08-08"
url: /blog/2008/08/08/how-to-select-the-nth-greatestleastfirstlast-row-in-sql/
categories:
  - Databases
---
This is a continuation of my articles on [how to select the desired rows from ranked data][1]. A user recently posed a question in the comments that I thought was particularly intriguing:

> What is the best way to query 1) Sum of min price of all types? 2) Sum of 2nd highest price of all types?

<!--more-->

Sounds like fun! Let me start by saying the sum is the easy part. You can always do that like so:

<pre>select sum(price) from (
   -- find desired rows here
) as x;</pre>

Finding the desired rows is the hard part. In my previous articles I focused on extrema:

*   The single biggest/smallest/extremest row in each group. (Pretty easy.)
*   The N most extreme rows in each group. (Doable, but harder.)

In this article, we're going to see how to get not the most extreme row, not the N most extreme rows, but -- hold your breath -- the single Nth most extreme row per group. (In a future article I might talk about how to get the Nth through Mth most extreme rows.)

### The setup

Let's create some sample data to get started.

<pre>drop table if exists fruits;

create table fruits (
   type varchar(20) not null,
   variety varchar(20) not null,
   price int not null,
   primary key (type, variety)
);

insert into fruits values
('apple',  'fuji',       1),
('apple',  'gala',       2),
('apple',  'limbertwig', 3),
('cherry', 'bing',       4),
('cherry', 'chelan',     5),
('orange', 'navel',      6),
('orange', 'valencia',   7),
('pear',   'bartlett',   8),
('pear',   'bradford',   9);
</pre>

For convenience so it's easier to see how they are ordered, I've just ordered the fruits alphabetically and given them unique prices.

The desired results -- second-cheapest prices for each fruit -- are as follows:

<pre>+--------+-----------------+
| type   | second_cheapest |
+--------+-----------------+
| apple  |               2 | 
| cherry |               5 | 
| orange |               7 | 
| pear   |               9 | 
+--------+-----------------+
</pre>

### The solution

The intuition you need here is that if you get the 2 cheapest fruits in each group, and then take the single most extreme from each group, you can get the Nth offset. Let's begin with one of the queries from my earlier article. (You should be able to use any of them. I'm just using this one because it's convenient and pretty clear.)

<pre>select type, variety, price
from fruits
where (
   select count(*) from fruits as f
   where f.type = fruits.type and f.price &lt; fruits.price
) &lt;= 1;
+--------+----------+-------+
| type   | variety  | price |
+--------+----------+-------+
| apple  | fuji     |     1 | 
| apple  | gala     |     2 | 
| cherry | bing     |     4 | 
| cherry | chelan   |     5 | 
| orange | navel    |     6 | 
| orange | valencia |     7 | 
| pear   | bartlett |     8 | 
| pear   | bradford |     9 | 
+--------+----------+-------+
</pre>

The result is the 2 cheapest fruits from each type. (Notice that all we really did was eliminate one row -- the most expensive apple.) Now let's get the second cheapest -- and what is that? It's simply the most expensive of the fruits we found in that query. And that's just a MAX().

<pre>select type, max(price) as second_cheapest
from (
   select type, variety, price
   from fruits
   where (
      select count(*) from fruits as f
      where f.type = fruits.type and f.price &lt; fruits.price
   ) &lt;= 1
) as x
group by type;
+--------+-----------------+
| type   | second_cheapest |
+--------+-----------------+
| apple  |               2 | 
| cherry |               5 | 
| orange |               7 | 
| pear   |               9 | 
+--------+-----------------+
</pre>

That's it!

### Sum of the second cheapest

By now you probably see the pattern: do it one step at a time, turning each thing into a simpler question that's easy to answer. So how do we sum the second cheapest prices for each type of fruit? First, we find them (done!), then we sum them.

<pre>select sum(second_cheapest) from (
   select type, max(price) as second_cheapest
   from (
      select type, variety, price
      from fruits
      where (
         select count(*) from fruits as f
         where f.type = fruits.type and f.price &lt; fruits.price
      ) &lt;= 1
   ) as x
   group by type
) as y;
+----------------------+
| sum(second_cheapest) |
+----------------------+
|                   23 | 
+----------------------+
</pre>

### Conclusion

In this post I showed you how to decompose the problem into simpler and simpler pieces. Often what's hardest about a complex query is trying to do it all at once. I have lots of tips elsewhere on this blog about how to make things faster -- this is not a particularly fast query -- but here I just wanted to show how to get the correct answer.

 [1]: http://www.xaprb.com/blog/2006/12/07/how-to-select-the-firstleastmax-row-per-group-in-sql/
