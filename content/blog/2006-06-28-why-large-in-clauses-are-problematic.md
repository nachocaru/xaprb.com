---
title: Why large IN clauses are problematic
date: "2006-06-28"
permalink: /blog/2006/06/28/why-large-in-clauses-are-problematic/
---
I've seen a lot of SQL code that uses an `IN` clause as a place to put a variable number of parameters, allowing the query to be more flexible. There are several downsides to this technique. This article discusses those downsides and explains how to avoid them.

### Introduction

I work in a Perl shop at the moment. We use two SQL utility modules from CPAN extensively: `Class::DBI` (which I'll discuss in another article) and `Ima::DBI`. `Ima::DBI` allows us to keep our SQL layer in one place and helps abstract away a lot of the drudgery of connecting, preparing, and executing.

Just for the record, I'm not a *huge* fan of it for a variety of reasons, but I won't go into that; it's a bit off-topic.

`Ima::DBI` allows defining sql statements as subroutines, like this:

<pre>__PACKAGE__-&gt;set_sql('foo', 'select * from foo', 'conn');
# elsewhere:
$statements-&gt;sql_foo-&gt;execute();</pre>

That's code for "create a subroutine named `sql_foo`, which will execute the `SELECT` against a connection named `conn`". Later, the code executes that subroutine.

There's a lot more that can be done with this. `?` placeholders can go in the SQL definition, like so:

<pre>...'select * from foo where bar = ?'...
# elsewhere:
$statements-&gt;sql_foo-&gt;execute(5);</pre>

That's standard DBI prepared-statement syntax for inserting a '5&#8242; where the question mark is, but look at this:

<pre>'select * from foo where bar in (%s)</pre>

That's a string substitution parameter, `sprintf` style, which gets used at runtime to alter the statement before executing it, like so:

<pre>$sth = $statements-&gt;sql_foo("?, ?, ?");
$sth-&gt;execute(5, 6, 7);</pre>

This last usage results in the statement

<pre>select * from foo where bar in (5, 6, 7)</pre>

It's very easy to slip into this coding style when working with lists of things. For example, a program that accepts a list of account numbers on the command line. The traffic data roll-up system I've mentioned works this way; we run the roll-up program with a list of client IDs.

I'm using Perl as an example in this article, but I've seen this type of coding in many languages. This usage is problematic, and that's what I want to talk about in this article.

### Problem 1: Performance

The first problem with a large `IN` clause is performance. `IN` is equivalent to `OR`. For example, `bar in(5, 6, 7)` is the same as `bar=5 or bar=6 or bar=7`. That might not seem like a performance problem, but a bunch of `OR` clauses are much harder for the server to optimize than other methods of limiting results. Because an `OR` clause can have 1 to infinity parts, no single optimization strategy can always apply, and analyzing the clauses to find out which strategy would be best is probably not realistically possible. Therefore, every RDBMS I know of just evaluates each comparison until it finds a true result. That can be much less efficient than, say, a join, which might be able to use an index.

One solution to this is to move the `IN` clause to the `FROM` clause. It may be counter-intuitive, but giving the query a 'table' to act as a filter can be much more efficient, depending on the platform. Here's the above query, re-written:

<pre>select * from foo
   inner join (
      select 5 as bar
      union all select 6
      union all select 7
   ) as x on foo.bar = x.bar</pre>

One example where this worked well on MySQL is explained in a recent e-mail from my coworker:

> &#8230; that was a good tip on replacing 'in' clauses with joins to subqueries in the from clause. The queries in reporting were totally hitting a wall, so I took the query as shown in mytop, moved the subquery from the where to the from, and it went from 1M 56seconds to 20 seconds.

I wouldn't say a factor-of-six improvement is revolutionary, but every little bit helps, especially when the query is executed a lot. Your mileage may vary. I know some situations where the improvement is dramatic.

### Problem 2: Maintenance and debugging

Performance may or may not be a real problem, but maintainability definitely is. It's really hard to debug or understand what queries are doing when the query text isn't written until runtime (With `Ima::DBI`, it's even harder because the subroutines get written as closures, which the debugger can't step into). The code to work with these types of queries also gets really ugly. This is onerous:

<pre>@params = $something_from_arguments;
$placeholders = join(',', '?' x scalar(@params));
$sth = $statements-&gt;sql_foo1($placeholders);
$sth-&gt;execute(@params);
# ... do that 15 times</pre>

And when I see the query being executed at runtime, with 250 question marks and 250 variables to take their places, I really want to pull my hair out. Debugging statements don't help. I rewrote one such application that had obviously been hard to debug, because it printed debugging output all over the place, ostensibly to help the programmer ensure the correct number of question marks was being created to accept the correct number of variables (there were other parameters to the query besides the `IN` clause, making it even more complex).

There's an easy solution to this: start the set of queries by storing all those numbers in a temporary table, and join against the temporary table wherever needed to filter the results. I re-wrote the rollup program with this style of programming and eliminated a lot of code, leaving both the program and the queries much clearer and easier to debug.

### Summary

Large `IN` clauses are an easy tool in the toolbag, but they don't scale well, from both a performance and maintainability point of view. I recommend transforming them into a join to a temporary table, which can be filled with the data that would have gone into the `IN` clause to begin with. Once the temporary table is populated with a known set of data, queries are easy to write and understand.

 *[CPAN]: Comprehensive Perl Archive Network
 *[RDBMS]: Relational Database Management System
