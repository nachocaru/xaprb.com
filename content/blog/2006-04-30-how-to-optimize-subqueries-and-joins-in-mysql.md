---
title: How to optimize subqueries and joins in MySQL
author: Baron Schwartz
excerpt: "<p>This article goes deep into subquery and join optimization and analysis on MySQL, using several real-life queries I've optimized on very large datasets.</p>"
layout: post
permalink: /2006/04/30/how-to-optimize-subqueries-and-joins-in-mysql/
---
I have written before about using joins instead of subqueries, especially for `NOT IN` queries, which can usually be rewritten as [exclusion joins][1] &#8212; sometimes with huge efficiency gains. In this article I&#8217;ll look more closely at the performance characteristics of a few queries I&#8217;ve optimized in MySQL 5.0.3. I&#8217;ll also show you some tricks you can use to get MySQL to optimize queries better when you know it&#8217;s being inefficient.

### Updates in a join

I wrote recently about the theoretical problems caused by `UPDATE` statements with `FROM` clauses ([Many-to-one problems in SQL][2]). This particular query shows the performance difference between a &#8220;correct&#8221; query and a &#8220;bad, nonstandard&#8221; query I wrote recently at work.

The application for this query is to update a table with aggregated clicks per day from a table of click-tracking data for online advertising. I have pre-populated the `aggregate` table, with one row per ad per day, over the time period I&#8217;m interested in. I have a table called `tracking` that holds non-aggregated click data. Here are the simplified table structures:

<pre>create table aggregate(
    day date not null,
    ad int not null,
    clicks int,
    primary key(day,ad)
) type=InnoDB;

create table tracking (
    tracking int not null auto_increment primary key,
    day date not null,
    ad int not null,
    clicktype enum('real','fraud','unknown') not null,
    clicks int not null,
    unique index(day, ad, clicktype)
) type=InnoDB;</pre>

Since the tables are InnoDB, the clustered index is the primary key. Notice two things about the `tracking` table: it has a surrogate key so it&#8217;s not clustered on the natural primary key (day, ad, clicktype), and clicks are separated out by clicktype, so I&#8217;ll have to aggregate the clicks I want. These are the design constraints I have to work with; I didn&#8217;t design the table.

For this article, I populated my tables with some pseudo-random data. First, I filled my `aggregate` table with some ads and days over which I want to work. I want to aggregate ads 1 through 50 over the time period 2005-01-01 through 2005-01-10, so that&#8217;s 500 rows in the `aggregate` table. The `tracking` table is moderately large. I filled it with dates from 2003-04-07 to 2006-01-01 (1,000 days) for ads 1 through 1000, with one row for each click type. That&#8217;s a total of three million rows. The clicks are random numbers between 1 and 100.

Given a [numbers table][3] with at least 1,000 rows, here are scripts to populate the tables. The second query will probably take a while to run, and will create a medium-sized chunk of data, so don&#8217;t think something is wrong when it keeps on grinding (15 minutes isn&#8217;t unreasonable). By the way, it&#8217;s not a good idea to run these queries on a production server!

<pre>insert into aggregate(day, ad)        
    select date_add('2006-01-01', interval a.i - 1 day), b.i
    from number as a
        cross join number as b 
    where a.i &lt;= 10 and b.i &lt;= 50;

insert into tracking(day, ad, clicktype, clicks)
    select date_add('2003-04-07', interval a.i - 1 day),
        b.i,
        c.type,
        rand() * 100
    from number as a 
        cross join number as b
        cross join (
            select 'real' as type
            union all select 'fraud'
            union all select 'unknown'
        ) as c
    where a.i &lt;= 1000 and b.i &lt;= 1000;</pre>

Now that the tables are set up, I&#8217;ll move on to the queries. Since MySQL doesn&#8217;t provide really good tools to profile queries, I ran these queries several times, disregarding the first run because it may not have been cached the same way as subsequent runs. The first query is the &#8220;bad, evil&#8221; way to do it. The second is the official, standards-compliant way.

Notice that the first query is a join, but the second query is a dependent (correlated) subquery, where the subquery refers to values in the enclosing query. They are equivalent, but the query plan is likely to be completely different. My goal here is to measure the performance characteristics of the two methods.

<pre>update aggregate as a
    inner join (
        select day, ad, sum(t.clicks) as c
        from tracking as t
        where t.clicktype in ('real', 'unknown')
        group by day, ad
    ) as t on a.ad = t.ad and a.day = t.day
set clicks = c;

update aggregate as a
    set clicks = (
        select sum(t.clicks)
        from tracking as t
        where t.day = a.day
            and t.ad = a.ad
            and t.clicktype in ('real', 'unknown')
    );</pre>

The first query runs in 96.4 seconds on my machine, plus or minus .15 seconds. The second runs in 0.02 seconds consistently. That&#8217;s a pretty big performance difference. Since these are `UPDATE` statements, I can&#8217;t `EXPLAIN` them and see exactly what the optimizer is doing differently, but I know one thing: the first query fails entirely when the `tracking` table has 30 million rows instead of 3 million, because it runs out of space for locks.

I have seen cases where the join query is slightly less efficient on small sets of data, but more efficient on larger sets; depending on the data, the probing strategy might not scale very well as the size of the outer table grows.

The queries also perform differently depending on whether the values in `aggregate` are 50 ads and 10 days, or 5 ads and 100 days. This is because the indexes on `tracking` are leftmost-prefixed on `day`, not `ad`. Your mileage will vary. For example, when I insert 5,000 rows (10 days, 500 ads) into `aggregate` instead of 50, the joined query takes 104.45 seconds, but the subquery takes 0.04. When I insert 50,000 rows (1,000 days, 500 ads), the joined query runs in 98.71 seconds, and the subquery in 3.87. The performance depends *heavily* on the characteristics of the data, the way I&#8217;m aggregating, indexes, and so on.

If I were being really scientific, I&#8217;d run `vmstat` and `iostat` and count I/O and other statistics too, to see how the queries access the tables differently, but I leave that as an exercise for the reader.

In the query at work, I ended up using the join. It&#8217;s more efficient on that specific data. I was actually surprised when I wrote the test queries for this article and found the subquery performing so much better. The difference could be due to any number of things &#8212; data, indexes, the fact we haven&#8217;t optimized the tables at work because they&#8217;re too big to touch, different architecture (Xeon vs. my AMD64), server configuration, memory, disk speed&#8230; who knows.

Moral of the story: try different ways of doing the same thing!

### Badly optimized subqueries

I have mentioned before, without going into specifics, that using joins instead of subqueries can be hugely more efficient. Even though two queries might mean the same thing, and even though you&#8217;re supposed to tell the server **what** to do and let it figure out **how**, sometimes you just have to tell it how. Otherwise, the query optimizer might choose a really stupid query plan. I ran into an example of this recently. I have a three-level hierarchy of tables: `category`Â¸ `subcategory`, and `item`. There are a few thousand rows in `category`, a few hundred thousand in `subcategory`, and millions in `item`. You can disregard the `category` table from now on; I mentioned it for context, but it&#8217;s not used in the queries. Here are the table create statements:

<pre>create table subcategory (
    id int not null primary key,
    category int not null,
    index(category)
) engine=InnoDB;

create table item(
    id int not null auto_increment primary key,
    subcategory int not null,
    index(subcategory)
) engine=InnoDB;</pre>

I&#8217;ll fill the tables with some sample data again:

<pre>insert into subcategory(id, category)
    select i, i/100 from number
    where i &lt;= 300000;

insert into item(subcategory)
    select id
    from (
        select id, rand() * 20 as num_rows from subcategory
    ) as x
        cross join number
    where i &lt;= num_rows;

create temporary table t as
    select subcategory from item
    group by subcategory
    having count(*) = 19
    limit 100;

insert into item (subcategory)
    select subcategory
    from t
        cross join number
    where i &lt; 2000;</pre>

Again, these queries may take a while to complete, and are not suitable for a production machine. The idea is to insert pseudo-random numbers of rows into `item`, so each subcategory has between 1 and 2018 items. It&#8217;s not a completely realistic distribution, but it&#8217;ll do.

I want to find all subcategories containing more than 2000 items in a given category. First, I find a subcategory with more than 2000 items, then use its category in the rest of the queries that follow. Here are queries that will do this:

<pre>select c.id
from subcategory as c
    inner join item as i on i.subcategory = c.id
group by c.id
having count(*) &gt; 2000;

-- choose one of the results, then
select * from subcategory where id = ????
-- result: category = 14</pre>

Now that I have found a suitable value (14), I&#8217;ll use it in subsequent queries. Here&#8217;s my query to find all subcategories with more than 2000 items in category 14:

<pre>select c.id
from subcategory as c
    inner join item as i on i.subcategory = c.id
where c.category = 14
group by c.id
having count(*) &gt; 2000;</pre>

In my specific data, there are 10 rows in the results, and the query finishes in a couple of seconds. `EXPLAIN` shows good index usage; it&#8217;s not a bad query at all, considering the table size. The query plan is to just run through ranges on some indexes and count the entries. So far, so good.

Now suppose I wanted to grab all columns from `subcategory`. I could join the results of the above query as a subquery, or select `MAX` or some such (since I know the values will be [unique over the grouping set][2]), but I could also do the following, right?

<pre>select * from subcategory
where id in (
    select c.id
    from subcategory as c
        inner join item as i on i.subcategory = c.id
    where c.category = 14
    group by c.id
    having count(*) &gt; 2000
);</pre>

This query will finish about the time the Sun turns into a brown dwarf and swallows the Earth. I don&#8217;t know how long it will take because I&#8217;ve never felt like letting it run indefinitely. You&#8217;d think, from looking at the query, that it would a) evaluate the inner query and find the 10 values, b) go find those 10 rows in `subcategory`, which should be really fast to look up by their primary keys. Nope. Here&#8217;s the query plan:

<pre>*************************** 1. row ***************************
           id: 1
  select_type: PRIMARY
        table: subcategory
         type: ALL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 300783
        Extra: Using where
*************************** 2. row ***************************
           id: 2
  select_type: DEPENDENT SUBQUERY
        table: c
         type: ref
possible_keys: PRIMARY,category
          key: category
      key_len: 4
          ref: const
         rows: 100
        Extra: Using where; Using index; Using temporary; Using filesort
*************************** 3. row ***************************
           id: 2
  select_type: DEPENDENT SUBQUERY
        table: i
         type: ref
possible_keys: subcategory
          key: subcategory
      key_len: 4
          ref: c.id
         rows: 28
        Extra: Using index</pre>

If you&#8217;re not familiar with analyzing MySQL query plans, here&#8217;s the synopsis: MySQL has decided to run the query from the outside in, not the inside out. I&#8217;ll look at each part of the query in turn.

The outer query simply becomes `select * from subcategory`. Even though there&#8217;s a limitation on `subcategory` in the inner query (`WHERE category = 14`), MySQL isn&#8217;t applying that filter to the outer query for some reason. I don&#8217;t know why. All I know is it&#8217;s doing a table scan (that&#8217;s what `type: ALL` means), and not using any indexes. That&#8217;s a table scan over several hundred thousand rows.

For each row in the outer query, it&#8217;s performing the inner query, even though there are no references in the inner query to values in the enclosing scope, because it has &#8220;optimized&#8221; the inner query by rewriting it to refer to the outer query. At this point, the query plan becomes nested loops. For each loop in the outer query, the query probes into the inner query. Here is the query plan, after the optimizer rewrites it:

<pre>select * from subcategory as s
where &lt;in_optimizer&gt;(
   s.id,&lt;exists&gt;(
   select c.id
   from subcategory as c
      join item as i
   where ((i.subcategory = c.id) and (c.category = 14))
   group by c.id
   having ((count(0) > 2000)
      and (&lt;cache&gt;(s.id) = &lt;ref_null_helper&gt;(c.id))))
)</pre>

You can get the optimized query from `EXPLAIN EXTENDED` followed by `SHOW WARNINGS`. Notice the reference to the outer scope in the `HAVING` clause.

I&#8217;m not bringing this up to bash MySQL&#8217;s optimization strategy. It&#8217;s pretty common knowledge that [MySQL doesn&#8217;t yet optimize subqueries very well][4] in some cases, and this particular problem is widely reported. I&#8217;m just pointing out that it is up to the programmer to check queries and make sure they aren&#8217;t badly optimized. In most cases, it&#8217;s safer just to stay away from subqueries if they&#8217;re not needed &#8212; *especially* `WHERE... IN()` or `WHERE... NOT IN()` queries.

My new rule for myself is &#8220;when in doubt, `EXPLAIN` the query.&#8221; If it&#8217;s a big table, I&#8217;m automatically doubtful.

### How to force the inner query to execute first

The query in the preceding section suffers because MySQL executes it from the outside in as a correlated subquery, instead of from the inside out without correlation. It&#8217;s possible to get MySQL to execute the inner query first, materialized as a temporary table, and avoid the huge performance penalty.

MySQL materializes subqueries in the `FROM` clause (commonly, and somewhat misleadingly, known as [derived tables][5]). This means MySQL executes the inner query first and saves the results in a temporary table, then uses it in the rest of the table. This is exactly the behavior I wanted to happen when I wrote that query! Here&#8217;s the modified query:

<pre>select * from subcategory
where id in (
    select id from (
        select c.id
        from subcategory as c
            inner join item as i on i.subcategory = c.id
        where c.category = 14
        group by c.id
        having count(*) &gt; 2000
    ) as x
);</pre>

All I did was wrap the subquery in another subquery. MySQL thinks there&#8217;s a dependent subquery, but now it&#8217;s only the wrapper query, which is probing into a temporary table with only a few rows, so it is fast anyway. At this point this is a silly optimization; it would probably be better to just rewrite the query as a join. Among other things, that would avoid the danger of someone noticing the wrapper subquery is superfluous and &#8220;cleaning up the code.&#8221;

This optimization can be used in a number of ways, for example to prevent MySQL from complaining about a subquery selecting data from a table being modified elsewhere in the query. Unfortunately, it doesn&#8217;t work to get around the restriction about temporary tables only appearing once in a query.

 [1]: /blog/2005/09/23/how-to-write-a-sql-exclusion-join/
 [2]: /blog/2006/03/11/many-to-one-problems-in-sql/
 [3]: /blog/2005/12/07/the-integers-table/
 [4]: http://dev.mysql.com/doc/refman/5.0/en/subquery-restrictions.html
 [5]: /blog/2005/09/26/sql-subqueries-and-derived-tables/