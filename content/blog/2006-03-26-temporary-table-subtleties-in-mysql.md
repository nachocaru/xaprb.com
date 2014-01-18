---
title: Temporary table subtleties in MySQL
date: "2006-03-26"
url: /blog/2006/03/26/temporary-table-subtleties-in-mysql/
categories:
  - Databases
---
Temporary tables behave very differently across various database servers. If you're not familiar with MySQL, some things might catch you off guard. In this article I explain some subtleties of temporary tables in MySQL and explain when you might encounter problems with them. I also show you how the platform-specific features can sometimes be very useful indeed.

### Creating temporary tables

In MySQL, creating a temporary table has exactly the same syntax as creating a regular table, with a few restrictions (no foreign keys, for example). For almost all scenarios though, you can create a temporary table anywhere you'd use a regular table. The table is visible only to the connection by which it is created. Even the same user won't see the table on another connection. When the connection is closed, the table is deleted.

### Once per query

Temporary tables can only appear once in every query. Sometimes this can bite unexpectedly. For example, sometimes I use temporary tables to assist in writing queries, and I might write a subquery against the temporary table, then join it back to itself:

<pre>select... from temp_table
inner join (
   select ... from temp_table
);</pre>

This will fail. It's fairly obvious in this example, but I've run into this a few times when it caught me off guard and took a while to figure out what was going on. The error message is `ERROR 1137 (HY000): Can't reopen table: 'temp_table'`. Again that's fairly obvious, but for whatever reason -- I can't recall the circumstances -- it was actually hard to root out the problem.

One place I wished this would work was in a query against the [integers table][1]. Alas!

[Temporary table limitations are documented in the manual][2].

### Masking regular tables

A MySQL temporary table can have any legal name, even the same name as an existing regular table. In this case it will mask the regular table.

This makes some people cringe, but it actually creates some very interesting possibilities, especially for testing -- where testing against non-production data is impossible. Yes, I know some people say that's never necessary, but in real life it sometimes is. For example, testing communications against a system with no way to run anything but real live transactions (many companies, such as a very large one with both A and Z in its name, provide no fully isolated staging systems to test against). In a case such as this, I might run a transaction after masking my real table with a temporary table, examine the temporary table, and when I'm done fetch the changes, drop the temporary table and apply the changes to the (un-masked) regular table.

In my current employment I've found this technique useful for automated testing because we're pretty small and don't have the resources yet to have a full suite of development servers (we're almost there...). Until the development servers are completely ready, it's important to be able to test database interactions just like everything else. One way to do this is begin a transaction, do something, then roll back the transaction. In a table with millions of rows, this is a **terrible** idea. It's much better for an object to expose its database handle, which the test harness can use to create a temporary table masking the huge regular table. That way the automated unit tests can stay very low-impact -- a requirement if they're to be run constantly.

### Query cache

MySQL has a genuine bug that affects temporary tables. If the query cache is enabled for the current connection and I create a temporary table that masks a regular table, I can `INSERT` into the temporary table but `SELECT` from the regular table! What's happening here? MySQL is incorrectly looking in the query cache, which contains data from the regular table. There's a bug report that describes this behavior: [SELECT on temporary table fails when query cache is on][3].

The bug is fixed in newer versions of MySQL, and the MySQL developers consider the affected versions (4.1.7, for example) to be extremely old, but many shared hosting providers consider those versions "stable" and probably won't upgrade for years.

It's easy to work around the problem; disabling the [query cache][4] will fix it.

### `CREATE` and `DROP` privileges

The privilege to create temporary tables is separate from the privilege to create regular tables, and implies the privilege to drop them. One thing I've seen happen is someone has permission to create temporary tables, creates some, and tries to drop them, but gets denied. The gotcha here is the drop statement must also have the word `TEMPORARY`, e.g.

<pre>drop temporary table temp_table;</pre>

If the word `TEMPORARY` is omitted, the statement tries to drop a regular table. It is a very good idea to **always** include the word `TEMPORARY` to avoid accidentally dropping a regular table! It is way too easy to get confused, especially when working with temporary tables that mask real tables. When working across databases, things get even worse; imagine I'm in database A, create temporary table `B.orders`, and then drop table `orders`, forgetting to qualify it with the database name. Oops! If there's a table named `orders` in database A, I just dropped it! If I'd included the word `TEMPORARY` in my statement, nothing bad would have happened. I won't say who but, ahem, "somebody I know well" has done this on a production system.

 [1]: http://www.xaprb.com/blog/2005/12/07/the-integers-table/
 [2]: http://dev.mysql.com/doc/refman/5.0/en/temporary-table-problems.html
 [3]: http://bugs.mysql.com/bug.php?id=6084
 [4]: http://dev.mysql.com/doc/refman/5.0/en/query-cache-configuration.html
