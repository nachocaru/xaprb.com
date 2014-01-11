---
title: How to write multi-table, cross-database deletes with aliases in MySQL
author: Baron Schwartz
excerpt: "<p>In an earlier article I explored the finer points of multi-table, cross-database deletes in MySQL, but I didn't get it quite right.  This article explains the subtleties I've discovered since then.  This is more complex than the MySQL manual documents.</p>"
layout: post
permalink: >
  /2006/08/07/how-to-write-multi-table-cross-database-deletes-with-aliases-in-mysql/
description:
  - Explains how to use aliases in multi-table cross-database deletes on MySQL.
---
In an earlier article I explored the finer points of [multi-table, cross-database deletes in MySQL][1], but I didn't get it quite right. This article explains the subtleties I've discovered since then. This is more complex than the MySQL manual documents.

In the earlier article, I wrote

<blockquote cite="/blog/2006/05/12/why-multi-table-cross-database-deletes-fail-in-mysql/">
  <p>
    The solution is not to alias the tables. Itâ€™s less convenient, but itâ€™s the only thing to do sometimes.
  </p>
</blockquote>

Now I find it *is* possible to alias the tables, with certain restrictions. Apparently the way you name the target of the `DELETE`, and the way you first declare the aliases in the `FROM` clause, must match exactly. Then it's possible to do these deletes without fully qualifying the tables everywhere, and without having a current database selected.

For example, suppose you want to delete rows from `apples`, when they match in a join to `oranges`. The tables are in different databases. The following will not work:

<pre>delete <strong>apples</strong>
   from <strong>db1.apples as a</strong>
      inner join db2.oranges as o on o.price = a.price;
ERROR 1109 (42S02): Unknown table 'apples' in MULTI DELETE</pre>

The error is because `apples` is aliased to `a`. If you try to name `a` in the `DELETE` clause, a similar error happens. However, the following will work:

<pre>delete <strong>db1.apples as a</strong>
   from <strong>db1.apples as a</strong>
      inner join db2.oranges as o on o.price = a.price;</pre>

Now you've named the tables identically in both places, so it works. It's as though you have to re-alias the table in the `DELETE` clause. The optional `AS` keyword may be omitted in one or both places you declare an alias, so even this form will work:

<pre>delete <strong>db1.apples a</strong>
   from <strong>db1.apples as a</strong>
      inner join db2.oranges as o on o.price = a.price;</pre>

&#8230; but see my [SQL coding standards][2] for why I always include the optional but should-be-mandatory `AS` keyword.

With these requirements met, you can use aliases in the rest of the (possibly complex) query, which is much nicer than writing out fully qualified names everywhere.

 [1]: /blog/2006/05/12/why-multi-table-cross-database-deletes-fail-in-mysql/
 [2]: /blog/2006/04/26/sql-coding-standards/
