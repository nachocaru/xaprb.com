---
title: How MySQL really executes a query
author: Baron Schwartz
layout: post
permalink: /2009/04/01/how-mysql-really-executes-a-query/
categories:
  - PostgreSQL
tags:
  - humor
  - MySQL
---
<p style="border:1px red solid; background:yellow; font-weight: bold; padding: 2em">
  WARNING: nearly every word of this post is intentionally false. This is an <a href="http://en.wikipedia.org/wiki/April_Fools%27_Day">April Fool&#8217;s joke</a>.
</p>

There is so much misinformation out there about how MySQL works. If you&#8217;ve talked to someone from PostgreSQL, you&#8217;ve surely heard some of it: &#8220;MySQL doesn&#8217;t even have transactions,&#8221; for example. And this from a PostgreSQL user, who uses a database that doesn&#8217;t even run on Windows.

But even within the ranks of people who supposedly know MySQL&#8217;s workings, lots of people just get things dead wrong. I wanted to set the record straight here, so I thought I would give a little walk-through of how MySQL executes a query.

Let&#8217;s see it in action from start to finish.

<pre>SELECT SQL_NO_CACHE COUNT(col1) FROM users
WHERE userid IN(
   SELECT userid FROM othertbl
)
ORDER BY userid DESC;
</pre>

The steps to execute this query are as follows:

1.  The MySQL API sends the query to the server as a series of tokens.
2.  The query is parsed.
3.  MySQL checks privileges. This step can be really complex, because it might involve a call to an LDAP or Active Directory service. So I&#8217;ll gloss over this for right now.
4.  The query cache would normally be checked at this stage, but I&#8217;ve given the SQL\_NO\_CACHE instruction. So the query cache isn&#8217;t checked. (If it were, it might find a saved result from a query without SQL\_NO\_CACHE and return it, which would be against the instruction.)
5.  The optimizer executes the subquery and returns a list of userid values that can be substituted into the IN() expression.
6.  The optimizer looks at the COUNT() expression. As you know, all COUNT() queries can be executed instantly on MyISAM tables &#8212; an optimization that does not exist for InnoDB, which is really slow at COUNT(). Actually, InnoDB is just slower across the board than MyISAM, which is why you should always use MyISAM.
7.  The parsed and optimized query is compiled into a query plan: native byte code that can be run directly on the CPU.
8.  The optimized query plan is stored for later executions. If a similar query is issued later, the parsing and compilation can be skipped. This is stored in the query cache, oddly enough. (It&#8217;s just one of those funny things about the query cache, which as I say, doesn&#8217;t work as you expect.)
9.  The query is executed, possibly on many CPUs simultaneously. If this happens, the results from each CPU have to be combined into the final results, which is what the Sort\_merge\_passes status variable counts. (This is also why you want to configure the sort\_buffer\_size as large as you can make it; generally I suggest making it 75% of available memory, or even larger in some cases.)
10. If there is no index on userid, then the ORDER BY can be skipped. But if there&#8217;s an index, MySQL&#8217;s row-level locking and MVCC (implemented at the server level, not in the storage engines) will force reading of results from the index. In that case, the result has to be put into a file, which is then sorted. This is called a filesort. You can see &#8220;Using filesort&#8221; in the EXPLAIN output if this happens.
11. If the result is bigger than the server&#8217;s memory, the server also has to use a temporary table on disk. If it&#8217;ll have to do this, you&#8217;ll see &#8220;Using temporary; Using disk table&#8221; in EXPLAIN output.
12. The results are returned to the client via a separate network connection (so that queries can be asynchronous).
13. After the query finishes, it is logged into the binary logs, which are MyISAM&#8217;s transaction logs. If you have these logs, you can undo statements, so you don&#8217;t need backups. You can just use the binary logs to roll back the changes. That&#8217;s another advantage of MyISAM &#8212; it has binary logs.

That&#8217;s pretty much the whole thing. I almost posted the lines and file names of the code for each step. But I decided not to. You can research it yourself if you want. It&#8217;s actually pretty simple; the MySQL planner is really straightforward and modular, so you should be able to see exactly how all of the above steps work. Just read the code.

If you&#8217;re really curious, you can use the following query to test your knowledge of MySQL&#8217;s execution plan. Trace this one in your Visual Studio debugger and see how it works:

<pre>SELECT 0x417072696C20466F6F6C21;</pre>

That query doesn&#8217;t access any tables, so it has a special execution plan that should show you whether you understand what&#8217;s been explained above. Have fun!

<p style="border:1px red solid; background:yellow; font-weight: bold; padding: 2em">
  WARNING: nearly every word of this post is intentionally false. This is an <a href="http://en.wikipedia.org/wiki/April_Fools%27_Day">April Fool&#8217;s joke</a>.
</p>