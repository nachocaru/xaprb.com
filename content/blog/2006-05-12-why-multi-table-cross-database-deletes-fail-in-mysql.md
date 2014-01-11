---
title: Why multi-table cross-database deletes fail in MySQL
author: Baron Schwartz
excerpt: |
  |
    <p>Sometimes multi-table deletes fail in MySQL with a message about an unknown table.  In this article I'll explain the exact combination of circumstances that cause it to happen.</p>
layout: post
permalink: /2006/05/12/why-multi-table-cross-database-deletes-fail-in-mysql/
description:
  - Explains how to avoid problems with multi-table cross-database deletes in MySQL.
---
Sometimes multi-table deletes fail in MySQL with a message about an unknown table. In this article I&#8217;ll explain the exact combination of circumstances that cause it to happen.

First, the symptoms:

<pre>delete a from db1.t1 as a
    inner join db1.t2 as b  on a.c1 = b.c1;
ERROR 1109: Unknown table 'b' in MULTI DELETE</pre>

This will happen if the following are true:

1.  No database is selected or one of the tables is not in the current database
2.  The tables are aliased

According the the MySQL documentation,

<blockquote cite="http://dev.mysql.com/doc/refman/5.1/en/delete.html">
  <p>
    Cross-database deletes are supported for multiple-table deletes, but in this case, you must refer to the tables without using aliases.
  </p>
</blockquote>

That&#8217;s correct, but it might not seem right. If the tables are fully qualified by database and table name, but are in the current database, it works. If I switch to another database and run the same statement, it won&#8217;t work.

This bit me when I was scripting out a large procedure running from a Perl script that doesn&#8217;t specify a database. I scripted it while I was connected and had a database specified. Then I ran it, and it bombed out when it got to the delete statement.

The solution is not to alias the tables. It&#8217;s less convenient, but it&#8217;s the only thing to do sometimes.