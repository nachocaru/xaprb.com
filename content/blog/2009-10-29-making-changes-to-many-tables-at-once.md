---
title: Making changes to many tables at once
date: "2009-10-29"
permalink: /blog/2009/10/29/making-changes-to-many-tables-at-once/
categories:
  - Databases
  - Open Source
---
As an alternative to [another recent blog post][1] that answered the question "how can I truncate all the tables in my database," I thought I'd show another way to do it, which does *not* use the INFORMATION_SCHEMA.

<pre>$ wget http://www.maatkit.org/get/mk-find
$ perl mk-find --exec 'TRUNCATE TABLE %D.%N'
</pre>

The other example is how to alter MyISAM tables to be InnoDB. That one's easy, too. Let's alter all MyISAM tables in the 'test' database:

<pre>$ wget http://www.maatkit.org/get/mk-find
$ perl mk-find test --engine MyISAM --exec 'ALTER TABLE %D.%N ENGINE=InnoDB'
</pre>

If you want to print out the commands instead of executing them, you can just use &#8211;printf instead of &#8211;exec.

Why would you do it this way instead of through the INFORMATION\_SCHEMA database? I don't think this can be said too often: querying the INFORMATION\_SCHEMA database on MySQL can completely lock a busy server for a long time. It can even crash it. It is very dangerous. So whenever I mention it, I mention the dangers of using it. I use it too sometimes, but only when I know the server I'm working on.

 [1]: http://blogs.sun.com/trentlloyd/entry/making_changes_to_all_tables
