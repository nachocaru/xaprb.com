---
title: Changes to InnoDB autoextend coming in MySQL 5.6
date: "2012-10-08"
url: /blog/2012/10/08/changes-to-innodb-autoextend-coming-in-mysql-5-6/
categories:
  - Databases
---
I was looking through James Day's post on [upcoming changes to MySQL configuration defaults][1] in version 5.6, and one caught my eye in particular: `innodb_autoextend_increment` changes from 8 to 64MB, and now affects `*.ibd` files.

I don't see any further documentation on this yet; I assume that's in the works. I'm curious how this will actually behave. What will be the initial size of an empty InnoDB table using `innodb_file_per_table`? There might be some unintended consequences. Here's a couple I can think of:

1.  Create a table and it's 64MB from the start. This would cause some people to be unable to use InnoDB. In fact, as it currently stands, an empty table is 16kb, and I've heard some people say that's a problem for them because they create many small tables and the 16kb minimum just eats up all their disk space. This type of problem would get a lot worse in the scenario where 64MB is the minimum size.
2.  Create a table and it's 16kb, then increases by 64MB. This might have the same problem.

I suspect that what's going to happen is something like this: 16kb when empty, then increase 16kb at a time until the table occupies an entire extent, then go 64MB at a time. But extents are contiguous, and if 16kb at a time is added to the table, then I guess they'd have to be compacted once the table grows to the point that an extent should be consumed (but can an extent contain pages from different tables? Insert hand-waving here). I'm a little confused about the details of [extents, segments, and so on][2].

This proposed change feels a little like deja vu for me, given my recent [adventure with filesystem preallocation][3] of MyISAM files.

**Update:** I got confused somehow and thought that this change would be in an upcoming release, but now I see it's apparently in the RC just released last week. I will test out the behavior and report back.

 [1]: https:/http://www.xaprb.com/blogs.oracle.com/supportingmysql/entry/server_defaults_changes_in_mysql
 [2]: http://dev.mysql.com/doc/refman/5.5/en/innodb-file-space.html
 [3]: http://www.xaprb.com/blog/2012/09/14/how-to-free-15gb-of-disk-space-in-a-tenth-of-a-second/
