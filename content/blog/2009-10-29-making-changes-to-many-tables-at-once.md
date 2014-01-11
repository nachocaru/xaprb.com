---
title: Making changes to many tables at once
author: Baron Schwartz
layout: post
permalink: /2009/10/29/making-changes-to-many-tables-at-once/
categories:
  - Maatkit
  - SQL
tags:
  - INFORMATION_SCHEMA
---
As an alternative to [another recent blog post][1] that answered the question &#8220;how can I truncate all the tables in my database,&#8221; I thought I&#8217;d show another way to do it, which does *not* use the INFORMATION_SCHEMA.

`<pre>$ wget http://www.maatkit.org/get/mk-find
$ perl mk-find --exec 'TRUNCATE TABLE %D.%N'
</pre>` 
The other example is how to alter MyISAM tables to be InnoDB. That one&#8217;s easy, too. Let&#8217;s alter all MyISAM tables in the &#8216;test&#8217; database:

`<pre>$ wget http://www.maatkit.org/get/mk-find
$ perl mk-find test --engine MyISAM --exec 'ALTER TABLE %D.%N ENGINE=InnoDB'
</pre>` 
If you want to print out the commands instead of executing them, you can just use &#8211;printf instead of &#8211;exec.

Why would you do it this way instead of through the INFORMATION\_SCHEMA database? I don&#8217;t think this can be said too often: querying the INFORMATION\_SCHEMA database on MySQL can completely lock a busy server for a long time. It can even crash it. It is very dangerous. So whenever I mention it, I mention the dangers of using it. I use it too sometimes, but only when I know the server I&#8217;m working on.

 [1]: http://blogs.sun.com/trentlloyd/entry/making_changes_to_all_tables