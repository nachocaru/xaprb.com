---
title: How to use foreign key cascades in MySQL
date: "2006-04-07"
url: /blog/2006/04/07/foreign-key-cascades-in-mysql/
categories:
  - Databases
---
A friend of mine recently asked me to show him how to enable cascading deletes between tables in MySQL. Cascading updates and deletes can be turned on between tables related with foreign keys in many RDBMSs. Though they can be convenient for some purposes, they can have unexpected side effects, and can be very confusing and dangerous at times. In this article I'll discuss some of the ways cascades can do invisible things, and show you one place they can be very handy too.

MySQL, like most systems, has a syntax for defining [foreign keys][1], (but only for InnoDB tables) both when creating tables and later. One of the options for a foreign key is how updates and deletes should cascade to related records in other tables.

Cascades can have a variety of actions, such as deleting or updating related records, setting them to NULL, or causing the statement to fail. "Turning cascades on" is a bit of a misnomer -- cascades are always present when foreign keys are defined, it's just that sometimes they do nothing.

### Gotchas

When they do have an action, cascades can do unexpected things. Here are some examples for what can happen when foreign keys are defined with `ON DELETE CASCADE`, probably the most common usage:

*   If orders are foreign keyed to a payment type and the payment type is deleted, all the orders are too. Oops!
*   If records in a table are foreign keyed to other records in the same table -- a very common scenario in cases where a hierarchy is stored in a single table, such as in my [GnuCash to MySQL export script][2] -- and a parent record is deleted, all the child records are deleted, too. The count of deleted rows, however, is not reported as might be expected. Rows that are deleted because of cascades are not included in the row count. For example, I have 124 rows in the account table and delete them in a single `delete from account` statement, but MySQL only reports 42 rows affected. Similarly, if I delete everything from the transaction table, which has 628 rows, I only see 628 rows affected, even though the entire split table gets emptied too. This is because MySQL processes rows one at a time, cascading as necessary before moving to the next row.

Because of these behind-the-scenes effects, I have never permanently enabled cascading updates or deletes in any of my real work (GnuCash scripts aren't real work). I consider them too dangerous. I'm not saying I never will, I'm just saying I haven't needed to yet. I think triggers are dangerous, too. They are like cascades in that they cause an unseen, not-directly-initiated action.

### When they're handy

Sometimes a single value appears all through the database in many different tables, for example, a status value. Once at my previous employer I faced this situation. There were two choices: a) delete all the foreign keys, update all the tables and re-create the foreign keys, or b) turn on cascades, make an update in one place and then turn them off again. The first option was simply not feasible. Not only were there dozens of tables and relationships to consider, new data was constantly coming into the system, so it would have to be taken offline for a time -- not desirable at all. I also would have needed to hold a transaction open the entire time, locking all the tables ahead of time to make sure nothing else tried to access them and cause a deadlock. The second option was much better.

In this case cascading updates saved me a huge amount of time and effort. I turned on cascading updates (behind the scenes, this involves deleting and re-creating the foreign keys, but that is easy to script out and do in a transaction), updated, then turned the cascades off again.

 [1]: http://dev.mysql.com/doc/refman/5.0/en/innodb-foreign-key-constraints.html
 [2]: /blog/2006/03/12/gnucash-to-mysql-export-script/
