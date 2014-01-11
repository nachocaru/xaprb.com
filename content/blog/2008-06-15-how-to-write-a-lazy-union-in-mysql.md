---
title: How to write a lazy UNION in MySQL
date: "2008-06-15"
permalink: /2008/06/15/how-to-write-a-lazy-union-in-mysql/
description:
  - A lazy UNION stops executing as soon as one part of it finds a row.
tags:
  - archiving
  - data archiving
  - MySQL
  - UNION
  - user defined variables
---
The other day I was explaining options to someone who wanted to know about [archiving data in MySQL][1]. "So," he said, "I might have to code my app to look for the data in two places?" The disadvantage of this is that his app might be more complex. Another disadvantage is that it might take two queries &#8212; if you look for a user in the usual location and it's not there, you have to look for it elsewhere.

One way to deal with this, as long as the archived data is on the same server, is a UNION.

<pre>select user_id from user where user_id = 123
union all
select user_id from user_archive where user_id = 123;</pre>

The benefit is that you don't have to issue two queries. That saves network round trips, and makes your code shorter. But it has a disadvantage, too: you're still querying the archive table when you don't need to. Does this matter? Yes, it does. Your archive table may be very large and slow &#8212; perhaps stored on a big slow hard drive, perhaps on a SAN &#8212; and just peeking at it is kind of expensive in some cases.

Something occurred to me a couple of weeks ago: why not write a UNION that stops executing as soon as one part of it finds a row? Then you can UNION to your heart's content and not incur the overhead of that second lookup unless you need it. For lack of a better term, I'm calling this a lazy UNION.

My idea here is to use a user variable. If the first part of the UNION finds a row, it sets the variable. The second part has the variable in its WHERE clause, and won't execute if the variable has been set by the first part. To make the whole thing self-contained, I'm adding a third part of the UNION, which will always execute but never return any rows; it will set the variable back to its initial state of NULL.

Here's a complete example:

<pre>drop table if exists user, user_archive;
create table user(user_id int not null primary key);
create table user_archive like user;
insert into user(user_id) values(1);
insert into user_archive(user_id) values(2);

select greatest(@found := -1, user_id) as user_id, 'user' as which_tbl
   from user where user_id = 1
union all
select user_id as user_id, 'user_archive' as which_tbl
   from user_archive where user_id = 1 and @found is null
union all
select 1, '' from dual where ( @found := null ) is not null;

select greatest(@found := -1, user_id) as user_id, 'user' as which_tbl
   from user where user_id = 2
union all
select user_id as user_id, 'user_archive' as which_tbl
   from user_archive where user_id = 2 and @found is null
union all
select 1, '' from dual where ( @found := null ) is not null;</pre>

You can play around with it and verify that indeed, the second part of the UNION never executes if the first part finds a row. There are several ways to do this: with EXPLAIN, by adding some more variables to show which part of the query executes, etc. The results of the above query are as follows:

<pre>+---------+-----------+
| user_id | which_tbl |
+---------+-----------+
|       1 | user      | 
+---------+-----------+
1 row in set (0.00 sec)

+---------+--------------+
| user_id | which_tbl    |
+---------+--------------+
|       2 | user_archive | 
+---------+--------------+
1 row in set (0.00 sec)</pre>

I have not benchmarked this. My gut feeling is that whether it's beneficial is going to depend on your workload. But it's a fun little hack I thought I'd share with you. By the way, there's no reason you have to stop at two; you could add any number of queries to the UNION.

 [1]: http://www.xaprb.com/blog/2007/06/13/archive-strategies-for-oltp-servers-part-1/
