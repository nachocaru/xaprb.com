---
title: How to eliminate temporary tables in MySQL
author: Baron Schwartz
excerpt: |
  <p>I've written before about <a href="http://www.xaprb.com/blog/2007/01/20/how-to-make-mysql-replication-reliable/">how to make MySQL replication reliable</a>.  One thing I think you need to do to make statement-based replication reliable is eliminate temporary tables.  I found an elegant way to replace temporary tables with real tables in the systems I maintain.  This article explains how.</p>
layout: post
permalink: /2007/05/11/how-to-eliminate-temporary-tables-in-mysql/
description:
  - >
    An elegant, simple naming scheme to replace temporary tables with real scratch
    tables in MySQL.
---
I&#8217;ve written before about [how to make MySQL replication reliable][1]. One thing I think you need to do to make statement-based replication reliable is eliminate temporary tables. I found an elegant way to replace temporary tables with real tables in the systems I maintain. This article explains how.

### The problem

Temporary tables are anathema to reliable MySQL slave servers. If you have a temporary table and the slave crashes in between accesses to the temporary table, when you restart replication the temporary table no longer exists, and you are in trouble.

This is only a problem with statement-based replication, which is how MySQL replication works until version 5.1, which is currently in beta.

If you want to be able to stop and start slave servers at will (for backups, failover, etc) or recover smoothly from crashes, in my opinion you must completely eliminate temporary tables on the master. Note that I&#8217;m talking about true temporary tables created with `CREATE TEMPORARY TABLE`, not temporary tables created internally by MySQL for sorting or processing subqueries.

### Properties of temporary tables

Temporary tables have some nice properties:

*   They are private to a connection. No other connection can see them, and there are no naming conflicts when many connections create temporary tables with the same name.
*   They go away by themselves when the connection closes, so you don&#8217;t have to clean up after crashed connections.

These are compelling reasons to use temporary tables for many purposes. However, these very properties have drawbacks:

*   Since they&#8217;re private to a connection, you can&#8217;t debug an application easily if you need to see the data it has generated and is working on.
*   Since they don&#8217;t persist after a connection closes, they cause problems with replication, as I mentioned.

Any good solution to the problems should ideally offer some of the benefits of temporary tables. Applications need to be able to avoid naming conflicts, and cleanup needs to be easy. And it would be nice to avoid the problems too &#8212; I&#8217;d like to see a connection&#8217;s data, and I&#8217;d like to avoid replication issues. Can all this happen? I think so, if you&#8217;re willing to give up a small amount of convenience, and if there are no privacy issues.

### One possible solution

One common solution I&#8217;ve seen is to use real tables, which the application will drop when it&#8217;s finished. I call these &#8220;scratch tables&#8221; to distinguish them from temporary tables.

The usual advice is to create randomly named scratch tables in a database reserved for the purpose. This is a way to avoid naming conflicts, though you still have to check before you create your table, on the off chance there is a conflict. Cleanup should usually be handled by the application itself doing a `DROP TABLE` when it&#8217;s done, but in case it crashes or something else happens, you can just run a periodic job to delete all tables in the `scratch` database that are over some age (two hours would usually suffice for my applications).

[mysql-find][2] can do the purging easily, so that&#8217;s no trouble. But there are some drawbacks to this method:

*   Randomly named tables, and checking for an existing table before creating, is a bit messy and is prone to race conditions.
*   Quick, which connection is using table `d41d8cd98f00b204e9800998ecf8427e`, and what is it used for? Suppose the application creates a scratch table of users, one of messages, and one of interests &#8212; what kind of table is that? I don&#8217;t know either.
*   I don&#8217;t like guessing when a table isn&#8217;t in use anymore. What if an application was running slowly because, for example, it&#8217;s talking to an API that&#8217;s responding slowly? Dropping its tables would be a bad thing to do.

### My solution

I&#8217;ve solved all these problems by *not naming tables randomly*. Instead, I name scratch tables sensible names, just like normal tables, but I then append the connection ID to the table name. The resulting tables are named things like `users_1234`. This approach has some obvious benefits:

*   It&#8217;s easy to see what a table is for.
*   It&#8217;s easy to see which connection created the table.
*   The table name is guaranteed to be unique, since no two connections have the same ID (this is *not true of UNIX process IDs* if you have processes connecting from more than one host).
*   It&#8217;s really easy to generate the table name. Finding out your connection ID is trivial. In Perl, you can say `$dbh ->{'mysql_thread_id'}` on any database connection, and similar functionality exists for other programming languages. If you need to do it from within SQL, you can just use the `CONNECTION_ID()` function.
*   Finally, it&#8217;s really easy to know if a table is still in use.

That last point deserves a bit of explanation. You can run `SHOW FULL PROCESSLIST` and see a list of all current connections. If the number isn&#8217;t there, and you have the `PROCESS` privilege so you&#8217;re certain you can see all connections, the table is deadwood and should be pruned. I&#8217;m sure you saw this coming, but `mysql-find` can do all this for you, too; you just give it a regular expression pattern to capture the connection ID from the table name, and it takes care of the rest (including the privilege check):

<pre>mysql-find --pid '\D_(\d+)$' --exec_plus "DROP TABLE IF EXISTS %s"</pre>

### Conclusion

What&#8217;s not to love?

*   Simple.
*   Elegant.
*   Solves world hunger.

Well, I&#8217;m still working on that last part&#8230;!

 [1]: http://www.xaprb.com/blog/2007/01/20/how-to-make-mysql-replication-reliable/
 [2]: http://code.google.com/p/maatkit