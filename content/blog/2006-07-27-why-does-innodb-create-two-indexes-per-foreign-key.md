---
title: Why does InnoDB create two indexes per foreign key?
author: Baron Schwartz
excerpt: "<p>If you've ever created foreign keys on an InnoDB table, you'll see it automatically creates indexes, if none exists, on the referenced columns in the parent table, and also in the foreign key columns in the child table.  This article explains why both are needed.</p>"
layout: post
permalink: /2006/07/27/why-does-innodb-create-two-indexes-per-foreign-key/
description:
  - >
    Explains why an InnoDB foreign key requires indexes in both the parent and child
    table.
---
If you've ever created [foreign keys on an InnoDB table][1], you'll see it automatically creates indexes, if none exists, on the referenced columns in the parent table, and also in the foreign key columns in the child table. This article explains why both are needed.

### Why index the parent table?

When a row is inserted or updated in the child table, the parent table must be searched for a row whose referenced values match the values in the foreign key columns. To make this efficient, it's necessary to have a usable index on those columns in the parent table.

By "usable" I mean an index where the columns are either a leftmost prefix or a full cover of the foreign key columns.

### Why index the child table?

Foreign key checking goes both directions. When a row in the parent table is updated or deleted, any rows in the child table that depend on it must be checked to make sure they're not invalidated (or, in the case of a `CASCADE`, to find them to take the `CASCADE` action upon them). Again, the only efficient way to do this is to use an index.

You can see that the checking always uses indexes by examining the output of `SHOW INNODB STATUS` and looking at the `LATEST FOREIGN KEY ERROR` section. If there's an error there, you will always see information about two indexes (though it may not always be obvious, since the code that creates this output has to handle a variety of different errors).

By the way, I seem to remember seeing some comments in the InnoDB source code that say indexes are not created automatically, but I can't find them now. In any case, if this was true once, it is no longer true.

### A useful tool

The `<a href="/blog/2006/07/02/innotop-mysql-innodb-monitor/">innotop</a>` tool can format and display the `LATEST FOREIGN KEY ERROR` output for easy reading. I check our systems for foreign key violations regularly. Here is a sample of `innotop`'s output for a violation I deliberately manufactured for this article:

<pre>Reason: Foreign key constraint fails for table `test/table_2`:

User xaprb from 192.168.0.225, thread 64548 was executing:

insert into table_2(table_1) values(5)

Time            2006-07-27 16:32:10
Child DB        test
Child Table     table_2
Child Index     table_1
Parent DB       test
Parent Table    table_1
Parent Column   table_1
Parent Index    PRIMARY
Constraint      table_2_ibfk_1</pre>

 [1]: http://dev.mysql.com/doc/refman/5.0/en/innodb-foreign-key-constraints.html
