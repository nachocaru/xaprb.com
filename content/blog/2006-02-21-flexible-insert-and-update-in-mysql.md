---
title: How to write flexible INSERT and UPDATE statements in MySQL
date: "2006-02-21"
permalink: /blog/2006/02/21/flexible-insert-and-update-in-mysql/
categories:
  - Databases
---
MySQL provides several variations on `INSERT` and `UPDATE` to allow inserting and updating exactly the desired data. These features provide a lot of power and flexibility, making MySQL significantly more capable than it otherwise might be. In this article I'll give an overview of each feature, help you understand how to choose among them, and point out some things to watch out for.

### Setup

I am using MySQL 4.1.15 to create my examples. I assume MyISAM tables without support for transactions, with the following sample data:

<pre>create table t1 (
    a int not null primary key,
    b int not null,
    c int not null
) type=MyISAM;

create table t2 (
    d int not null primary key,
    e int not null,
    f int not null
) type=MyISAM;

insert into t1 (a, b, c) values
    (1, 2, 3),
    (2, 4, 6),
    (3, 6, 9);

insert into t2 (d, e, f) values
    (1, 1, 1),
    (4, 4, 4),
    (5, 5, 5);</pre>

### Overview

Suppose I wish to insert the data from `t2` into `t1`. This data would violate the primary key (a row exists where column `a` is 1) so the insert will fail: `ERROR 1062 (23000): Duplicate entry '1' for key 1`. Recall that in MySQL, a primary key is simply a unique index named PRIMARY. Any data that violates any unique index will cause the same problem.

This situation occurs frequently. For example, I might export some data to a spreadsheet, send it to a client, and the client might update or add some data and return the spreadsheet to me. That's a terrible way to update data, but for various reasons, I'm sure many readers have found themselves in a similar situation. It happens a lot when I'm working with a client who has multiple versions of data in different spreadsheets, and I'm tasked with tidying it all up, standardizing formatting and importing it into a relational database. I have to start with one spreadsheet, then insert and/or update the differences from the others.

What I want to do is either insert only the new rows, or insert the new rows and update the changed rows (depending on the scenario). There are several ways to accomplish both tasks.

### Inserting only new rows

If I want to insert only the rows that will not violate the unique index, I can:

*   Delete duplicate rows from `t2` and insert everything that remains:
    
    <pre>delete t2 from t2 inner join t1 on a = d;
insert into t1 select * from t2;</pre>
    
    The first statement deletes the first row from t2; the second inserts the remaining two. The disadvantage of this approach is that it's not transactional, since the tables are MyISAM and there are two statements. This may not be an issue if nothing else is altering either table at the same time. Another disadvantage is that I just deleted some data I might want in subsequent queries.

*   Use an [exclusion join][1]. This query should work on any RDBMS that supports `LEFT OUTER JOIN`:
    
    <pre>insert into t1 (a, b, c)
    select l.d, l.e, l.f
    from t2 as l
        left outer join t1 as r on l.d = r.a
    where r.a is null;</pre>
    
    The downside to this method may be lower efficiency, depending on the data and how complex the join needs to be. The join is done up front, which can be a lot of work on large datasets, especially when only a few duplicate rows might exist.

*   Use `INSERT IGNORE` to ignore the duplicate rows:
    
    <pre>insert ignore into t1 select * from t2;</pre>
    
    The duplicate rows are ignored. Note that *MySQL does not do a generic "duplicate-check" to see if the rows contain duplicate values* when determining if a row is a duplicate and should be ignored. It only ignores rows that violate a unique index. If I have no unique index on a column, `IGNORE` has no effect.
    
    When using `IGNORE`, MySQL prints information about duplicates:
    
    <pre>Query OK, 2 rows affected (0.02 sec)
Records: 3  Duplicates: 1  Warnings: 0</pre>
    
    This method is probably the fastest of all, especially if very few duplicate keys exist in `t2`. MySQL simply tries to insert every row and keeps going when one fails. The disadvantage is that `IGNORE` is a proprietary, non-standard extension.

### Inserting new rows and updating existing rows

Now suppose I want to insert new rows *and* update existing rows. Again, there are several ways to do it, in one or two steps:

*   Use standard SQL in a two-step process to insert new rows and update existing rows. The following is one way to do it, but it's not the best way:
    
    <pre>insert into t1 (a, b, c)
    select l.d, l.e, l.f
    from t2 as l
        left outer join t1 as r on l.d = r.a
    where r.a is null;

update t1 as l
    inner join t2 as r on l.a = r.d
    set l.b = r.e, l.c = r.f;</pre>
    
    The benefit to this approach is standards compliance. This should work on a wide variety of database platforms.
    
    The downside is poor efficiency. Imagine the datasets are huge and there are only a few duplicate rows. The first statement inserts the (huge number of) new rows by joining the two huge datasets together. The next statement joins them together again, except this time the join is even bigger because of all the new rows in `t1`! And worse yet, it updates the rows that just got inserted, which is certainly not needed. It is far better to do the update first, which should only affect a few rows, then insert the new rows:
    
    <pre>update t1 as l
    inner join t2 as r on l.a = r.d
    set l.b = r.e, l.c = r.f;

insert into t1 (a, b, c)
    select l.d, l.e, l.f
    from t2 as l
        left outer join t1 as r on l.d = r.a
    where r.a is null;</pre>
    
    This is far more efficient, but it still might be very bad. It could lock the tables for a long time with large datasets, and like all two-step processes, it is not transactional.

*   Use non-standard MySQL extensions to make the two-step process more efficient. MySQL allows multiple-table updates, which can be used to mark which rows are duplicates during the `UPDATE`, eliminating the need for an exclusion join in the `INSERT`. To accomplish this, `t2` needs a new column to record its "status," which I will call `done`.
    
    <pre>alter table t2 add done tinyint null;

update t1
    inner join t2 on t1.a = t2.d
    set t1.b = t2.e,
        t1.c = t2.f,
        t2.done = 1;

insert into t1 (a, b, c)
    select d, e, f from t2
    where done is null;</pre>
    
    This can be significantly more efficient on the large datasets I've been imagining. The downside to this approach is non-portability to other database platforms.

*   Use MySQL's non-standard `ON DUPLICATE KEY UPDATE` extension to accomplish the insert and update in a single step. As with the non-standard `INSERT IGNORE` above, this is probably the fastest method:
    
    <pre>insert into t1(a, b, c)
    select d, e, f from t2
    on duplicate key update b = e, c = f;</pre>
    
    There are other ways to write this statement, for example using the `VALUES` function, which can help simplify complex queries by referring to the value which would have been inserted into the given column:
    
    <pre>insert into t1(a, b, c)
    select d, e, f from t2
    on duplicate key update b = values(b), c = values(c);</pre>
    
    The disadvantage to this approach is lack of portability, of course. Inserting and updating in a single statement is highly non-standard.

### Complexities, incompatibilities, and bugs

If the queries above look like perfect solutions, don't be fooled. I chose my data and table structures to demonstrate successful scenarios. There are many ways things can fail or be confusing:

*   Some versions of MySQL simply don't support the features I discussed above. Check the [MySQL documentation][2] for details about which features are available on any given version.
*   Some versions of MySQL have bugs that involve the above types of queries. For example, version 4.1.7 doesn't like queries of the form `INSERT... SELECT... ON DUPLICATE KEY UPDATE` at all. It will complain about a syntax error. It allows inserting literal values, but not the results of a `SELECT` statement. In these buggy versions, the MySQL features may be available but not usable.
*   Some versions of MySQL get confused by the `VALUES` syntax I demonstrated above. If your source and destination tables have similar column names, you may have this problem. For example, in MySQL 5.0.15-log with tables that have the same column names,
    
    <pre>insert into t1 (a, b, c)
    select a, b, c
    from t2
    on duplicate key update b = values(b);
ERROR 1052 (23000): Column 'b' in field list is ambiguous</pre>

*   Multi-table updates can be tricky if there is ambiguity in column names. Using an alias, such as 'r' for 'right' and 'l' for 'left' as I did above, can help.
*   MySQL reports values for the number of rows affected. When an operation affects rows in multiple tables, or when a duplicate row causes an update to existing values, the rows-affected statistics change in odd ways. The MySQL manual explains how this works, so I don't want to go into it; I just want to point out that you should expect odd values.
*   The above techniques all assume `t2` contains no duplicate values of `d`, which is enforced in my examples by the primary key on that column. If this is not the case, it becomes significantly more difficult to write the queries. It may be best to clean up `t2` and create a primary key on the appropriate column(s), to avoid these problems.
*   I have caused crashes and binary log corruption in MySQL 4.1.7 with a combination of temporary tables, subqueries, and `ON DUPLICATE KEY UPDATE`. I think this is a bug with this specific version, but I suggest testing everything on a **non-production** database server, even if it seems harmless. The statements that caused crashes for me seemed very innocuous.

### Choosing a technique

Which method to use largely depends on requirements. If the software must support multiple database backends or versions, perhaps the generic, standard queries are the best bet. If performance is the goal and the queries don't need to be portable, I see no reason not to use the solution that performs best. If the software must support multiple database backends *and* performance is critical, there's probably no way to avoid writing different queries for each supported backend.

I belive fully portable or "platform-independent" SQL is mostly a myth. Writing generic "standard" SQL to the lowest common denominator almost certainly results in under-utilizing the RDBMS's abilities. Getting the most from my software is more important than dreaming of "platform-independent" queries.

### Summary

Sometimes a proprietary extension to standards provides something unavailable by any other means. In this article I have discussed several ways to use such non-standard extensions in MySQL for performance and convenience. Divergence from standards is a double-edged sword. Not only does it potentially make code non-portable, it can encourage mediocrity by teaching bad habits instead of teaching people the "right" way to do things. For example, updating multiple tables in a single statement, or inserting and updating at the same time, are definitely strange and ugly things to do. As in life, the most important thing is to find a good balance and determine which criteria really matter.

If this article was useful to you, you should [subscribe][3] to stay current with my upcoming articles. It's free and convenient.

**Edit 2006-02-26** I forgot to cross-reference [INSERT IF NOT EXISTS queries in MySQL][4], a related post where I explain some variations on a particular scenario -- for example, where there is no unique index on the column you want to avoid duplicating, or you want to allow only *n* duplicates.

 [1]: /blog/2005/09/23/how-to-write-a-sql-exclusion-join/
 [2]: http://dev.mysql.com/doc/
 [3]: /blog/subscribe/
 [4]: /blog/2005/09/25/insert-if-not-exists-queries-in-mysql/

 *[RDBMS]: Relational Database Management System
