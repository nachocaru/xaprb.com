---
title: Introducing MySQL Visual Explain
permalink: /2007/07/29/introducing-mysql-visual-explain/
description:
  - >
    MySQL Visual Explain transforms EXPLAIN output into a graphical tree view of the
    query execution plan.
tags:
  - execution plan
  - explain
  - MySQL
  - mysqltoolkit
  - recursion
  - Timour Katchaounov
---
<p class="download">
  <a href="http://code.google.com/p/maatkit/">Download MySQL Visual Explain</a>
</p>

If you've ever wished you could see MySQL's EXPLAIN output formatted as a tree, now you can. MySQL Visual Explain transforms EXPLAIN output into a hierarchical view of the query plan, which is significantly easier to read and understand.

### What it does

MySQL Visual Explain is a command-line tool, not a Graphical User Interface (GUI). You can use it two ways:

*   Give it a query and some connection options, and it will connect and EXPLAIN the query, then show you the result as a tree.
*   Give it the output of EXPLAIN in any of several formats, and it will parse it and turn it into a tree.

Here's a simple example. Given the following query,

<pre>select actor_id,
   (select count(film_id) from sakila.film join sakila.film_actor using(film_id))
from sakila.actor;</pre>

You get this EXPLAIN output:

<pre>+----+-------------+------------+-------+----------------+--------------------+---------+---------------------+------+-------------+
| id | select_type | table      | type  | possible_keys  | key                | key_len | ref                 | rows | Extra       |
+----+-------------+------------+-------+----------------+--------------------+---------+---------------------+------+-------------+
|  1 | PRIMARY     | actor      | index | NULL           | PRIMARY            | 2       | NULL                |  200 | Using index | 
|  2 | SUBQUERY    | film       | index | PRIMARY        | idx_fk_language_id | 1       | NULL                |  951 | Using index | 
|  2 | SUBQUERY    | film_actor | ref   | idx_fk_film_id | idx_fk_film_id     | 2       | sakila.film.film_id |    2 | Using index | 
+----+-------------+------------+-------+----------------+--------------------+---------+---------------------+------+-------------+</pre>

MySQL Visual Explain turns this into the following query execution plan:

<pre>SUBQUERY
+- JOIN
|  +- Index lookup
|  |  key            film_actor->idx_fk_film_id
|  |  possible_keys  idx_fk_film_id
|  |  key_len        2
|  |  ref            sakila.film.film_id
|  |  rows           2
|  +- Index scan
|     key            film->idx_fk_language_id
|     possible_keys  PRIMARY
|     key_len        1
|     rows           951
+- Index scan
   key            actor->PRIMARY
   key_len        2
   rows           200</pre>

You should read this as a depth-first tree traversal. In other words, the root of the tree is the output node &#8212; the last thing that happens in query execution.

As I said, this is a simple example. When your queries have many subqueries and/or UNIONs, you quickly get much more complicated EXPLAIN output, which is very hard to understand. It's much easier to read the tree representation for complex queries. Here are thumbnails of the query execution plans of some real queries from a project I've worked on:

<img width="113" height="250" src='http://www.xaprb.com/blog/wp-content/uploads/2007/07/mysql-visual-explain-1.png' alt='MySQL Visual Explain output on a complex query' /><img width="151" height="250" src='http://www.xaprb.com/blog/wp-content/uploads/2007/07/mysql-visual-explain-2.png' alt='MySQL Visual Explain output on a complex query' />

The corresponding EXPLAIN output is very hard to understand, even though I've become an expert on EXPLAIN. I can understand the tree view without trouble. I don't think it matters how much of an expert I am, a tree view is always going to be easier to understand.

### How it works

MySQL Visual Explain tries to reverse-engineer [EXPLAIN][1] by re-ordering and dividing the input into parent/child relationships. How exactly it happens is complex, though it can be expressed in code fairly succinctly. I wanted to write this tool nearly a year ago, but after studying EXPLAIN for a while, I found I just didn't understand it well enough. Then this spring at the MySQL Conference and Expo 2007, I saw a [talk on the Query Optimizer by Timour Katchaounov, who works on the optimizer team][2]. Timour helped me grasp how MySQL executes queries. Most importantly, he showed a diagram of the execution plan *as a left-deep tree*. I always assumed the query execution plan was a bushy tree, but once I saw the left-deep tree I understood more about how MySQL works (for example, I now understand why MySQL doesn't support `FULL OUTER JOIN`).

The crucial bridge between that and understanding EXPLAIN was a slide that showed the nodes of the tree mapped to rows in EXPLAIN. This made me see how to approach the problem. After spending hours reading the MySQL manual and source code, and studying many examples, I slowly understood how to go backwards from EXPLAIN to a tree.

It is not as simple as it sounds! There are many details, such as how to decide which nodes should be children of which other nodes (when there are no subqueries or UNIONs, of course it's trivial). EXPLAIN's output can be quite complex, and a moderately complicated query takes me a few minutes to reverse-engineer by hand &#8212; and most of the time I get it wrong. Maybe I can write the details in another blog post, or contribute them to MySQL's documentation or the [MySQL Forge wiki][3].

### Download it

You can get the goodies from [the Sourceforge MySQL Toolkit project page][4] and read the documentation online at [the MySQL Toolkit homepage][4].

### If you find bugs

I couldn't have written this tool without unit tests, especially since I had to start over twice when I found I was misunderstanding something major (that's a huge plug for test-driven development). If you find a query it transforms wrong, please report it via the project's Sourceforge bug tracking system. Please give the query and EXPLAIN output, so I can add it to the test suite.

### Future plans

MySQL themselves, and many community members, have sometimes discussed [the need for a tree view of EXPLAIN][5]. I sincerely hope they implement that feature and make this little tool obsolete in future versions of MySQL. I also understand [MySQL is trying to add more information to EXPLAIN][6]. Currently it's not possible to get a complete query execution plan from EXPLAIN, because it doesn't show you everything the server does while executing the query. If MySQL adds information, I'll update this tool. I have a [feature request pending to show when a GROUP BY happens][7], for example.

I also specifically wrote this tool to be useful as a module, not just a command-line utility. This makes it possible for you to use the module in your own programs. I have a few ideas for this myself, though I may not get time to implement them.

### Your support appreciated

Though the end result makes it look easy, this was a seriously hard project that took many evenings and weekends of research, testing, and coding, with many false starts. If you feel inclined, there's a "support" link in the navigation bar at the top of this page! (For those of you who tried to send me something and it got returned, I've fixed that issue).

 [1]: http://dev.mysql.com/doc/en/explain.html
 [2]: http://conferences.oreillynet.com/presentations/mysql07/katchaounov_timour.pdf
 [3]: http://forge.mysql.com/wiki/
 [4]: http://code.google.com/p/maatkit/
 [5]: http://www.mysqlperformanceblog.com/2006/07/24/mysql-explain-limits-and-errors/
 [6]: http://s.petrunia.net/blog/?p=18
 [7]: http://bugs.mysql.com/30039
