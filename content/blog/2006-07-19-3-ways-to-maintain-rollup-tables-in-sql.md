---
title: 3 ways to maintain rollup tables in SQL
author: Baron Schwartz
excerpt: |
  <p>At both my current and previous employer I've been involved in designing and maintaining aggregate, or "rollup" tables for advertising traffic data.  I have learned several methods of propagating changes from the atomic data through to its aggregations.  This article discusses these methods, how to implement them, and their pros and cons.</p>
layout: post
permalink: /2006/07/19/3-ways-to-maintain-rollup-tables-in-sql/
description:
  - Compares three methods for keeping rollup tables in sync with their source data.
---
At both my current and previous employer I&#8217;ve been involved in designing and maintaining aggregate, or &#8220;rollup&#8221; tables for advertising traffic data. I have learned several methods of propagating changes from the atomic data through to its aggregations. This article discusses these methods, how to implement them, and their pros and cons.

As an example of data that gets rolled up to aggregate tables, I&#8217;ll use my current employer&#8217;s data structures (more or less). The main table looks something like this:

<pre>create table ad_day (
   ad int not null,
   day date not null,
   impressions int not null,
   clicks int not null,
   cost_cents int not null,
   avg_pos decimal(3, 1) not null,
   primary key (day, ad)
) engine = InnoDB;</pre>

As an aside, notice the table is called `ad_day`, which is the way people generally want to say it &#8212; &#8220;rolled up by ad by day&#8221; &#8212; but the primary key is (`day, ad`) &#8212; the reverse of the way people say it. When I joined the company, it was indexed (`ad, day`), which generally doesn&#8217;t help most queries, which want to look at data in a date range. Actually, it had a surrogate key, so there wasn&#8217;t even a good clustered index! I&#8217;ve written a lot about this in the past, and the woes it caused us. You might find those articles interesting if you&#8217;re considering designing some large tables.

### The challenge

The `ad_day` table is rolled up along two dimensions: by time (`ad_week`, `ad_month`, `ad_year`) and by coarser levels of our schema hierarchy. For example, an `ad` belongs to an `account`, which is the intersection of a `search_engine` and a `client`, so we have tables rolling the data up along those lines (`account_day`, `client_day`, `search_engine_day`).

Fortunately, that&#8217;s as far as it goes &#8212; we either roll up by one dimension or the other, but not both, though I&#8217;ve never seen a case where someone didn&#8217;t want more and more. It&#8217;s the old multiple-hierarchy problem &#8212; as soon as you &#8220;slice&#8221; things one way, you want to slice it another way too. I&#8217;ll have a lot more to say in future articles about the evils of &#8220;slicing&#8221; and &#8220;rolling up.&#8221;

The challenge with this set of tables is to make sure the rollup tables are always accurate with respect to the atomic `ad_day` table. As soon as any data changes in that table, the rollup tables need to be changed to agree with it. There are three types of changes to deal with: inserts, deletes, and updates. Each of them can have very different requirements, depending on the schema of the rollup tables. For instance, an insert into `ad_day` may require an insert into `client_day`, or may only require an update. And, depending on the data requirements, this may all need to be transactional to prevent inconsistent data. Ideally, it would be transactional if for no other reason than to ensure an aborted change doesn&#8217;t leave things out of sync, but in large tables that may be very costly.

### Orphan rows

One thing to keep in mind when rolling up tables like this is orphan rows. Deletes in the atomic table may leave rows dangling in the rollups unless you&#8217;re careful to delete them. For example, if I delete all ads for a client in the `ad_day` table, then run a naive rollup query like so:

<pre>insert/update into client_day (client, day, ...)
   select client, day, sum(clicks)...
   from ad_day...</pre>

That query will correctly sum the rows in the `ad_day` table, but it won&#8217;t touch the rows left over in the `client_day` table. These rows are orphans. This is important to keep in mind when desiging a rollup system.

### Method one: triggers

This is one place where I&#8217;d actually be in favor of using triggers to automatically propagate the changes through to the rollup tables. The `ad_day` table will need a trigger for each event (`INSERT`, `UPDATE`, `DELETE`), and if there are intermediate-level rollups, they will too. As an example, if the `client_day` table is rolled up from `account_day` rather than `ad_day` directly, `account_day` will need triggers too. Orphans can be handled without too much trouble with this scheme.

An alternative to triggers is a stored procedure that does the same thing. At my previous employer we inserted or updated only one row at a time in the `ad_day` table, using a stored procedure.

Whether it&#8217;s via triggers or stored procedures, the logic can get a bit hairy. Correctly updating a rollup table may require a lot of math. For example, keeping the `avg_pos` column straight during an update is tedious. `avg_pos` is the average position of the ad over all its &#8220;impressions&#8221; (every time the ad is displayed is an &#8220;impression&#8221;), so updating it requires calculating deltas from current values, then applying those deltas to the correct row in the rollup, which probably contains the weighted average of a bunch of ads or over a bunch of days, so the delta has to be given the correct weight in the rollup. I won&#8217;t reproduce the math here. It&#8217;s not hard, but it is tedious and easy to get wrong.

Another problem with triggers, if they handle one row at a time as they do with MySQL, is that one change may indicate a row in the rollup is no longer needed and should be deleted, then the next change may indicate that row should be brought back. To avoid this delete-insert-delete-insert vicious cycle, all-zero rows should probably just be left for later cleanup. Of course, if your platform supports setwise operations on the affected data, as in Microsoft SQL Server, you should handle it as a set, not a row at a time, and this isn&#8217;t an issue. Thus, depending on how triggers are implemented on your platform, you will need to handle orphan rows differently.

The benefit to the trigger approach is that the changes flow through the system with no further ado. As long as nothing else changes the rollup tables, they should stay in perfect lockstep with the atomic table.

### Method two: empty and re-fill

Another approach, if it makes sense for the data, is to delete a range of the data and re-calculate it from scratch. In the example I&#8217;ve given, this does make sense. We typically keep up-to-date on traffic data, unless something breaks, so we&#8217;re generally fetching yesterday&#8217;s traffic data and inserting it into the table. This means we&#8217;re working at the end of the table, and each time we do a batch, we can remember the earliest date affected, then empty and re-fill from that date forward.

Benefits of this approach are that the math is a lot simpler. There is no math to handle updates and deletes, just inserts. There&#8217;s also no hidden black magic going on behind the scenes (I&#8217;m referring to triggers, which scare some people because they do things invisibly). And finally, orphan rows are taken care of; the table is emptied before it&#8217;s filled, so there&#8217;s no chance orphan rows will hang around.

There&#8217;s a cost, though: a lot of inserting and deleting. That&#8217;s kind of hard on the database, depending on the platform. For example, we&#8217;re using MySQL and the InnoDB storage engine. It would probably be cheaper to use MyISAM, which keeps deleted rows in a linked list for later re-use, but that has its drawbacks too. In any case, this isn&#8217;t the method we use, because of all the deletes and inserts.

### Method three: zero and re-calculate

An alternative to the second method, which we use at my current employer, is to zero out the atomic table from the start date forward, and then `REPLACE` with new data and use `REPLACE` to roll it up to the aggregate tables. On other systems, you can use an equivalent method &#8212; `MERGE` in Oracle, `UPDATE`/`INSERT` in Microsoft Sql Server. See my article on [flexible inserts and updates for more details][1].

This method has two main advantages. One, it&#8217;s not that costly to `UPDATE` a row in place. It&#8217;s much cheaper to flip some bits to zero than to delete an entire row. Two, the changes will automatically propagate to rollup tables &#8212; even those not zeroed out &#8212; as you run the rollup, taking care of orphan rows. They will still be in the table, but they&#8217;ll just a bunch of zeroes if they truly are orphaned. If they&#8217;re not truly orphaned, they&#8217;ll have the right values &#8212; and all-zero rows won&#8217;t contribute anything to any further dependent rollups, if your rollup system uses rollup tables as the source for other rollup tables.

The major drawback to this system is all-zero rows.

### How to clean up all-zero rows

If your chosen method leaves all-zero rows lying around, you&#8217;ll want to take care of that. Rows filled with zeroes just make the table larger. Fortunately, this isn&#8217;t a terrible problem. It should be easy to write a [nibbler to purge the junk rows][2], which ought to be very low-impact on the server.

### Summary

I&#8217;ve discussed three methods to keep rollup tables in sync with the authoritative data, from which they&#8217;re rolled up. I&#8217;ve used several methods, and each has advantages and disadvantages. What do you think? Are there other options?

If you found this article useful, [subscribe via feeds or e-mail][3] to be notified when my upcoming articles are published.

 [1]: /blog/2006/02/21/flexible-insert-and-update-in-mysql/
 [2]: /blog/2006/05/02/how-to-write-efficient-archiving-and-purging-jobs-in-sql/
 [3]: /blog/subscribe/