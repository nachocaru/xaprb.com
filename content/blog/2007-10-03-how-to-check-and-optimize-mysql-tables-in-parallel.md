---
title: How to check and optimize MySQL tables in parallel
date: "2007-10-03"
url: /blog/2007/10/03/how-to-check-and-optimize-mysql-tables-in-parallel/
categories:
  - Databases
---
I wanted to point out something that might not be obvious from the name: MySQL Parallel Dump can be used as a generic wrapper to discover tables and databases, and fork off worker processes to do something to them in parallel. That "something" can easily be invoking `mysqlcheck` -- or any other program. This makes it really easy for you to do multi-threaded whatever-you-need-to-do on MySQL tables. Here's how:

<pre>mysql-parallel-dump [options] -- 'mysqlcheck --optimize %D %N'</pre>

There are several things going on here:

1.  You're running `mysql-parallel-dump` with all the ordinary options. Some of them are really specific to dumping data, but not all that many -- most of the options are about choosing which databases to include and exclude, and so on.
2.  You're adding a double dash `--` to make it stop processing any further options.
3.  The rest of the arguments are being treated as a system command, but&#8230; 
4.  Not before interpolating the database and table name into them. The %D and %N are a little macro language. There are some other macros too -- see the documentation.

The net effect is to loop through all the tables and run `OPTIMIZE TABLE` on them.

MySQL Parallel Dump takes responsibility for noticing the exit status of the system command, keeping track of times, and reporting it all when it's done. And its functionality for working on sets of things is also generic. You could easily create a table of "optimization jobs" and point it at that table, perhaps using the `--age` option, and it would obediently do what the table's contents specify:

<pre>mysql> select setname, db, tbl from test.opti_job;
+-----------+--------+------------+
| setname   | db     | tbl        |
+-----------+--------+------------+
| dvd_store | sakila | film       | 
| dvd_store | sakila | film_actor | 
| set1      | test   | t1         | 
| set1      | test   | t2         | 
+-----------+--------+------------+
$ mysql-parallel-dump --nolocktables --sets set1,dvd_store --settable test.opti_job -- 'mysqlcheck --optimize %D %N > /dev/null'
        set1:              2 tables,     2 chunks,     2 successes,  0 failures,  0.14 wall-clock time,  0.17 dump time
   dvd_store:              2 tables,     2 chunks,     2 successes,  0 failures,  0.51 wall-clock time,  0.85 dump time
Final result:  2 sets,     4 tables,     4 chunks,     4 successes,  0 failures,  0.65 wall-clock time,  1.02 dump time
</pre>

Much of the code for any kind of parallel tool is generic. I put a little extra time into this tool to make that code reusable, not special-purpose.
