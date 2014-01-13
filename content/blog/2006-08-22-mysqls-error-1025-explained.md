---
title: "MySQL's ERROR 1025 explained"
date: "2006-08-22"
url: /blog/2006/08/22/mysqls-error-1025-explained/
categories:
  - Databases
---
MySQL issues a cryptic error message, "Error on rename," when you try to alter a table in such a way that it would break a foreign key constraint:

<pre>create table test1(a int not null primary key)engine=innodb;
create table test2(a int not null, foreign key(a) references test1 (a)) engine=innodb;
alter table test2 modify a smallint not null;       
ERROR 1025 (HY000): Error on rename of './test/#sql-2fa8_1' to './test/test2' (errno: 150)</pre>

This happens because `ALTER TABLE` really works by making a copy of the table, then renaming to move the old table out of the way and move the new table into its place. It is certainly one of the less meaningful error messages I've seen in MySQL.

There's slightly more information in the output of `SHOW ENGINE INNODB STATUS`, if you are looking there (of course, if you're looking there you're probably already clued in to what's going on). And [innotop][1] can parse that information for you:

[<img src="/innotop/thumb-innotop-fk-error-message.png" width="200" height="" alt="innotop FK screenshot" />][2]

In case you didn't understand why the foreign key constraint was failing, the error message innotop parses out is much clearer. It's because the foreign key columns in the parent and child table have to have the same data type. I was trying to change the child's column to an incompatible type.

 [1]: http://www.xaprb.com/innotop/
 [2]: http://www.xaprb.com/innotop/innotop-fk-error-message.png
