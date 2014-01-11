---
title: How to do efficient forward-only SQL maintenance jobs
author: Baron Schwartz
excerpt: '<p>Iâ€™ve recently written about techniques for archiving, purging, and re-indexing huge database tables. These techniques exploit both data structure and usage patterns. In this article Iâ€™ll develop that theme further, and explain how to write more efficient non-backtracking maintenance jobs when the update and insertion patterns permit.</p>'
layout: post
permalink: /2006/06/21/forward-only-sql-maintenance-jobs/
description:
  - >
    Explains how to create a forward-only SQL "bookmark" so maintenance jobs never
    backtrack.
---
I&#8217;ve recently written about techniques for [archiving, purging][1], and [re-indexing][2] huge database tables. These techniques exploit both data structure and usage patterns. In this article I&#8217;ll develop that theme further, and explain how to write more efficient non-backtracking maintenance jobs when the update and insertion patterns permit.

### Motivation

In my current employment, I&#8217;ve been optimizing databases for size, speed, and consistency. As part of my regular monitoring, I checked our master MySQL server for deadlock information and found that a nightly cron job&#8217;s query had caused other queries to time out or deadlock, then became a deadlock victim itself and died, after loading the server for a long time.

The query was performing an update in a table scan on a non-indexed column. The table is very large, and is the business&#8217;s core table, so it&#8217;s constantly accessed. There&#8217;s a column that indicates something true or false about each row, and the nightly job updates that column by joining with a regular expression match against another table. The query looks like this:

<pre>update core_table as c
   inner join client_patterns as p on c.client = p.client
      and c.phrase rlike p.pattern
   set c.important_phrase = 1;</pre>

None of the relevant columns in `core_table` is indexed. `word` is a large `VARCHAR` that could definitely stand to be indexed, but the table is too large to index at this point, and I can&#8217;t nibble it down to size (since it&#8217;s *the* core table, it&#8217;s very hard to know when a row is archivable; maybe at some point I&#8217;ll figure out how). This is one of the tables that remains troublesome. Until we find a suitable archive strategy, we&#8217;ve just got to walk on eggshells around it.

A table scan in an InnoDB table like this reads along the entire table, [placing read locks on every row, and write locks on rows that need to be updated][3]. When it runs into another transaction&#8217;s locks, whether read or write, it blocks and waits for the locks it needs to proceed. That&#8217;s one reason table scans are so bad for concurrency.

The query eventually ran into some other transaction&#8217;s locks and timed out, but by the time it did, it had accumulated tens of thousands of InnoDB lock structures (I don&#8217;t yet understand the exact relationship between locks and lock structures, but it doesn&#8217;t seem to be one-to-one).

Long-running transactions must die!

### The solution

My first thought was to write a [nibbler][1] to do the job one row at a time. This would avoid concurrency issues, but it would take many hours. I had some other thoughts too, such as gathering the eligible rows into a temporary table, then nibbling from that, but none of this seemed right.

For one thing, not all the matching rows needed to be updated. In fact, as I thought about it more, and asked the people who knew, I realized this table is just like our cost rollup tables: only rarely do we need to reach way back and update a lot of rows. We usually just need to update the new rows that have been inserted every day. Sometimes the second table in the join is updated and everything needs to be re-examined, but that&#8217;s very rare.

In short, the data is randomly accessed, but we add and update at the end. This can be exploited to gain efficiency.

I created a table to hold a &#8220;bookmark&#8221; of the last row we processed. This could theoretically be stored on disk or by some other means (clay tablets anyone?), but the database is a good place. I wrote a job which runs nightly and does the following:

1.  make a snapshot of all new rows in the table
2.  update the new rows
3.  store the marker again

The &#8220;snapshot&#8221; is a temporary table that holds all the rows greater than or equal to the marker. Here are the queries I wrote:

<pre>create temporary table snapshot as 
   select distinct c.id from core_table as c
      inner join client_patterns as p on c.client = p.client
         and c.phrase rlike p.pattern
      where c.id &gt; (
         select coalesce(min(last_row), 0)
         from last_processed_row
         where job = 'update core_table'
      );

update snapshot as s
   inner join core_table as c on c.id = s.id
      set c.important_phrase = 1;

insert into last_processed_row(job, last_row)
   select "update core_table", max(id)
   from snapshot
   on duplicate key update
      last_row = greatest(last_row, values(last_row));</pre>

There are some subtleties in these queries that bear explanation. First, I just chose a string value &#8212; any arbitrary value will do &#8212; to hold the &#8220;job&#8221; in the `last_processed_row` bookmark table. That &#8220;job&#8221; value is the table&#8217;s primary key. As long as no other job uses the same value, and every query in a single job uses the same value, it&#8217;ll work.

The first query uses a subquery in the `WHERE` clause to select the job&#8217;s bookmark value. Why do all that fancy `COALESCE(MIN())` stuff? The job&#8217;s ID is the bookmark table&#8217;s primary key, so there&#8217;s only one row, right? I should be able to just select that row. I don&#8217;t need to take the `MIN()` of a single value.

That&#8217;s mostly true, but what if there is no such row in the bookmark table? In that case, there&#8217;d be zero rows in the subquery. Using an aggregate function like `MIN()` or `MAX()` will always return a value, &#8220;propping open&#8221; the subquery to make sure it doesn&#8217;t &#8220;collapse&#8221; to zero rows. If there are zero rows, the result is `NULL`, so `COALESCE()` makes sure zero rows equates to a value of zero.

Finally, the last query uses some non-standard MySQL features to insert a row into the bookmark table if it doesn&#8217;t exist, and update to the most recent value if it does exist. I do *not* use `REPLACE` because it may decrease the value, and I want the value to be monotonically increasing &#8212; the point of this algorithm is to avoid backtracking. You can read more about these and other magical &#8220;do many things at once&#8221; queries in my article on [flexible inserts and updates in MySQL][4].

### Results

The new queries run very quickly, of course. Daily updates take a small fraction of a second instead of grinding on for half an hour. This is mostly because updates are constrained to a comparatively small data set, but it&#8217;s also because the updates are much better for concurrency. When the working set is off in a temporary table, the query isn&#8217;t trying to do everything at once.

We decided to let the full update happen once a week, just in case `t2` gets some update through the week. This only takes a couple minutes, even without indexes on columns that really need indexes.

### Conclusion

I hope this article has given you some ideas on how to take advantage of any patterns you know to be true about data. Not only data structure, but data usage patterns, can create great opportunities for making things better.

 [1]: /blog/2006/05/02/how-to-write-efficient-archiving-and-purging-jobs-in-sql/
 [2]: /blog/2006/06/14/how-to-re-index-a-large-database-table/
 [3]: http://dev.mysql.com/doc/refman/5.0/en/innodb-transaction-model.html
 [4]: /blog/2006/02/21/flexible-insert-and-update-in-mysql/