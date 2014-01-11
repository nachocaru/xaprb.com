---
title: Did you know Sphinx can act like a MySQL server?
permalink: /2009/04/28/did-you-know-sphinx-can-act-like-a-mysql-server/
categories:
  - SQL
tags:
  - Andrew Aksyonoff
  - MySQL
  - Sphinx
---
[Peter wrote about this recently][1], but I don't know if it was really clear what was going on.

**Point One:** [Sphinx][2] can be contacted by the MySQL protocol. Not "as a MySQL storage engine." Not "from MySQL." *It understands the MySQL protocol itself*. So from the protocol point of view, **the Sphinx search daemon can look just like a MySQL server**.

**Point Two:** Sphinx understands a SQL-like query language. Don't be fooled. You're not writing SQL. It just looks like you are.

**Point Three:** Because of point One and point Two, *you can use the mysql command-line client program to talk directly to Sphinx*, with absolutely no MySQL server anywhere in sight. This also means you can connect to Sphinx from your application and query it, exactly like connecting to a MySQL server and querying it.

Go take a look at Peter's blog post. He's not writing MySQL queries. He's writing queries to Sphinx.

Now think about how cool this is &#8212; how easy this is to integrate with your code that already communicates with MySQL. Is there any other external full-text search system that masquerades as a MySQL server? I don't know of one.

 [1]: http://www.mysqlperformanceblog.com/2009/04/19/talking-mysql-to-sphinx/
 [2]: http://www.sphinxsearch.com/
