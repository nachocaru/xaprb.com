---
title: How to calculate table checksums in MySQL
author: Baron Schwartz
excerpt: "<p>MySQL has no built-in functionality to calculate a table's checksum in any storage engine but MyISAM.  Table checksums can confirm that two tables are identical -- useful to verify a slave server is in sync with its master.  Fortunately, it's easy to calculate a checksum on non-MyISAM tables with user variables.  This technique works on any storage engine with any version of MySQL, doesn't require the <code>BLACKHOLE</code> storage engine, and avoids locks caused by <code>INSERT... SELECT</code> on InnoDB tables.</p>"
layout: post
permalink: /2007/01/25/how-to-calculate-table-checksums-in-mysql/
description:
  - >
    How to checksum a MySQL table efficiently, without special storage engines, and
    without causing any InnoDB locks
tags:
  - MySQL
  - SQL
  - user defined variables
---
MySQL has <del datetime="2007-05-04T20:28:30+00:00">no built-in functionality to calculate a table's checksum in any storage engine but MyISAM</del> (*this is not true; I read the manual wrong, but it doesn't eliminate the usefulness of the technique in this article*). Table checksums can confirm that two tables are identical &#8212; useful to verify a slave server is in sync with its master (see my article on [reliable MySQL replication][1] for more). Fortunately, it's easy to calculate a checksum on non-MyISAM tables with user variables. This technique works on any storage engine with any version of MySQL, doesn't require the `BLACKHOLE` storage engine, and avoids locks caused by `INSERT... SELECT` on InnoDB tables.

**Update** I've coded this method into a Perl script for you to use. See [MySQL Table Checksum][2] for more details.

### MyISAM checksums

If you want to verify that two MyISAM tables are identical, you can use [CHECKSUM TABLE][3]. If you need to do this frequently, you might want to make sure your MyISAM tables have the `CHECKSUM = 1` option on so checksums are maintained continuously and don't have to be calculated.

That was easy! Now on to the hard part: how to compare tables when one or both uses a storage engine other than MyISAM. That's what the rest of this article is about.

### Foundation

I derived this technique from Giuseppe Maxia's article on [how to use the `BLACKHOLE` storage engine to avoid cursors][4]. Giuseppe uses a two-step process:

1.  Concatenate the values of all columns in the first row, and get a checksum of it with a cryptographic hash function.
2.  Concatenate this checksum with a global checksum, and take the checksum of the result, then move to the next row and repeat.

After processing each row in the table this way, you have a checksum of the entire table's contents.

### Two ways to iterate over rows

Giuseppe showed two ways to iterate over every row in the table: one with cursors, and another with user variables. Cursors in MySQL can't be used with dynamically prepared statements, so they are much less practical for a generic method of checksumming any table; that would require creating a different routine for each table. So cursors are out, and user-variables are in. Here's the essential code:

<pre>set @crc := '', @cnt := 0;
select @crc := sha1(concat(@crc,
    sha1(concat_ws('#', col1, col2... colN)))),
    @cnt := @cnt + 1 from tbl order by ID;
select @crc, @cnt;</pre>

(This code both CRCs the table and counts the number of rows in it).

The problem with this method, as Giuseppe points out, is the result set. If you run this on a table with a million rows, you're going to get a million rows of CRCs and counts back from the first `SELECT`. This is not good; you really want the server to throw the intermediate values away so they don't consume resources needlessly.

Giuseppe's solution to this is to change the `SELECT` to an `INSERT... SELECT`. The `INSERT` goes into a [`BLACKHOLE`][5] table, which is like dumping it into `/dev/null`. It is simply discarded. This avoids some overhead, and Giuseppe found that it's faster than using a cursor.

### Limitations and performance concerns

There are still some undesirable effects of this approach. One is the `BLACKHOLE` storage engine. It's not included in MySQL's official binaries, so you'll have to compile your own server to use it. It's also not available before version 4.1.11. Those limitations rule this method out for many users.

The second is InnoDB. If you use InnoDB (odds are you do, or you wouldn't be reading this) the `INSERT... SELECT` will place shared locks on every row in the table. If you're doing this on an otherwise quiet server, it may not matter, but if you're taking live checksums on a production machine, it's much better to avoid those locks.

I'll show you how to avoid both problems.

### Wrap the user-variables up and discard the results

If you've read my articles about [advanced user-variable techniques in MySQL][6], you might see where I'm headed. You don't have to generate a large result set from that SELECT statement. In fact, you can hide the variable assignments, which you care about, inside a function whose result you don't care about, and use an aggregate function to eliminate all but one row. Study the following code, which uses the same `fruits` table as in the user-variables article:

<pre>set @crc := '';

select min(
      length(@crc := sha1(concat(
         @crc,
         sha1(concat_ws('#', type, variety, price)))))
   ) as discard
from fruits use index(PRIMARY);
+---------+
| discard |
+---------+
|      40 |
+---------+

select @crc;
+------------------------------------------+
| @crc                                     |
+------------------------------------------+
| 3be9117fff37bcdd3f422e6ce4d24ee2a6642566 |
+------------------------------------------+</pre>

Notice a couple of things: there's only one row, and the `MIN()` calculation that collapses all those rows into one is very efficient. Maybe a MySQL developer can comment on exactly how much memory this will take, but I think it should be really cheap, since it processes a row at a time and then throws it away.

I omitted the row count calculation for clarity. If you want to count rows as well, the following code will do both in one statement:

<pre>set @crc := '', @cnt := 0;

select min(least(
      length(@crc := sha1(concat(
         @crc,
         sha1(concat_ws('#', type, variety, price))))),
      @cnt := @cnt + 1
   )) as discard
from fruits use index(PRIMARY);

select @crc, @cnt;</pre>

You should always reset `@crc` and `@cnt` between runs so you get repeatable results.

### Further considerations

It's important to order the `SELECT` by something predictable, or the results will be non-deterministic. However, an `ORDER BY` clause won't do it &#8212; that orders the final result, not the table scan. Forcing a certain index to be used will do the trick, hence the `USE INDEX` clause above. If you don't have a primary key on your table, use a `UNIQUE` key if that's available; otherwise, you're probably not going to be able to get a dependable checksum.

This method is easy to use inside a stored procedure or routine on MySQL 5.0. You can easily build a column list from `INFORMATION_SCHEMA` and generate the dynamic SQL to checksum a table.

This technique is CPU-bound on our servers. I used the [BENCHMARK()][7] function to time different hash functions to try to improve the speed. In my tests, `SHA1()` took about 85% as long as `MD5()`. This surprised me; based on some [cryptographic function benchmarks][8] I found on the web, I thought `MD5()` would be faster. It may be system-dependent.

I'm also a little worried about using `CONCAT_WS()` to stringify each row for the hash function. This function skips `NULL` values, so it's easy to come up with an edge case where two rows with different columns hash to the same thing. Although this is a very unlikely problem, I'd still rather not have it. If you know of a way to fix this, please let me know.

Finally, just a comment on doing this on running servers: if you're comparing a master and slave, you can use `LOCK TABLES` on the master, find the checksum there, and then find the checksum on the slave before releasing the lock on the master. If your slave isn't far behind the master, it ought to have plenty of time to catch up while the checksum is running on the master, at which point that table should be identical to the master (because you have the table locked on the master, no changes to the table will be replicating to the slave). This makes it practical to verify a slave is in sync without stopping the whole server.

### Perl snippet to generate a SQL statement

For the Perl programmers out there, the following subroutine accepts a database handle, database name and table name, and returns the table's storage engine and a ready-to-run query.

<pre>sub checksum_query {
   my ( $dbh, $db, $tbl ) = @_;
   my $ddl = ($dbh->selectrow_array("show create table $db.$tbl"))[1];
   my ( $type ) = $ddl =~ m/^\) (?:ENGINE|TYPE)=(\S+)/m;
   my $cols  = join(', ', $ddl =~ m/^\s+(`[^`]+`)/gm);
   my $index = $ddl =~ m/PRIMARY KEY/ ? ' USE INDEX(PRIMARY)' : '';
   my $query = 'SELECT MIN(LEAST(0, LENGTH(@crc := SHA1('
      . 'CONCAT_WS("#", @crc, SHA1(CONCAT_WS("#", ' . $cols . '))))),'
      . '@cnt := @cnt + 1)) AS len FROM ' . "`$db`.`$tbl` $index";
   return ( $type, $query );
}</pre>

I prefer to use `SHOW CREATE TABLE` instead of `DESCRIBE TABLE`, because it gives me all information about the table, such as the storage engine and index types. I have also found it to be faster, and of course it works on pre-5.0 versions.

### Summary

In this article I showed you how to calculate a checksum for an entire table's contents in MySQL. I used my favorite technique of hiding user-variable assignments inside a function to reduce a table scan's result set to a single integer. This avoids a lot of overhead, and eliminates the need to insert the result set into a `BLACKHOLE` table, which means you can use the technique on a standard MySQL-supplied server. It also avoids InnoDB row locks. And it works on all storage engines, with all versions of MySQL that support user variables (3.23.6 and up).

I also touched a bit on the finer points of `NULL` values and `ORDER BY` for consistent results. And I gave you some ready-to-use Perl code to generate the SQL you need to execute against a given table.

This is the fastest, easiest, most efficient way I know to compare the contents of two or more tables, which is necessary to verify that a replicated master and slave server are still in sync.

 [1]: http://www.xaprb.com/blog/2007/01/20/how-to-make-mysql-replication-reliable/
 [2]: /blog/2007/02/26/introducing-mysql-table-checksum/
 [3]: http://dev.mysql.com/doc/refman/5.0/en/checksum-table.html
 [4]: http://datacharmer.blogspot.com/2006/03/seeking-alternatives-to-cursors.html
 [5]: http://dev.mysql.com/doc/refman/5.0/en/blackhole-storage-engine.html
 [6]: /blog/2006/12/15/advanced-mysql-user-variable-techniques/
 [7]: http://dev.mysql.com/doc/refman/5.0/en/information-functions.html
 [8]: http://www.cryptopp.com/benchmarks.html
