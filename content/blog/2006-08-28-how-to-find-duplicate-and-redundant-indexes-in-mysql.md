---
title: How to find duplicate and redundant indexes in MySQL
author: Baron Schwartz
excerpt: |
  <p>Peter Zaitsev over at the excellent <a href="http://www.mysqlperformanceblog.com/">MySQL Performance Blog</a> recently wrote an article on <a href="http://www.mysqlperformanceblog.com/2006/08/17/duplicate-indexes-and-redundant-indexes/">duplicated and redundant indexes</a> -- any indexes which cover exactly the same columns as another index, or cover a leftmost prefix of another index.  While there are subtleties, such as FULLTEXT indexes not being the same as non-FULLTEXT, for the most part this is sufficient criteria to raise possible duplicates to a DBA's attention.  I opened my big mouth in the comments and said I could write a quick Perl script to discover possible offenders in just a few lines of code.  Once I did that, I had to do it and give you the script.  Here it is.</p>
layout: post
permalink: /2006/08/28/how-to-find-duplicate-and-redundant-indexes-in-mysql/
description:
  - >
    A Perl script to identify possible duplicate or redundant indexes on MySQL
    tables.
---
<p class="download">
  <a href="http://code.google.com/p/maatkit">Download (part of Maatkit)</a>
</p>

Peter Zaitsev over at the excellent [MySQL Performance Blog][1] recently wrote an article on [duplicated and redundant indexes][2] &#8212; any indexes which cover exactly the same columns as another index, or cover a leftmost prefix of another index. While there are subtleties, such as FULLTEXT indexes not being the same as non-FULLTEXT, for the most part this is sufficient criteria to raise possible duplicates to a DBA's attention. I opened my big mouth in the comments and said I could write a quick Perl script to discover possible offenders in just a few lines of code. Once I did that, I had to do it and give you the script. Here it is.

The reason this is really easy to do in Perl is that the output of `SHOW CREATE TABLE` lists each index with its columns in order, in an easy-to-parse way, and therefore all one needs to do is compare the string that defines each index with each other index to find duplication and redundancy. Note: you just need to compare the string definition! You don't need to actually parse out the columns and do any advanced computer science on them. And a quick regular expression to anchor each index definition to the beginning of the one to which you're comparing it will satisfy the "leftmost prefix" requirement.

Why use `SHOW CREATE TABLE`'s output? Why not query `SHOW INDEXES FROM ____` and use that instead? Well, first of all it's way faster, as I also said in the comments on Peter's blog. When I do something like this I like it to be zippy. `SHOW INDEXES` can take a long time, as it has to calculate stats on the indexes. Plus, even if I did use `SHOW INDEXES`, or query the `INFORMATION_SCHEMA` tables (also slow) I'd then have a result set of individual columns, which frankly I'd just concatenate together and do a string comparison on.

OK, on to my "advanced, patented algorithm." Here's a sample `SHOW CREATE` statement (I'm using a table from my recent article on role-based access control for an example):

<pre>mysql &gt; show create table t_privilege\G
*************************** 1. row ***************************
       Table: t_privilege
Create Table: CREATE TABLE `t_privilege` (
  `c_role` varchar(30) NOT NULL default 'other',
  `c_who` int(11) NOT NULL default '0',
  `c_action` varchar(100) NOT NULL,
  `c_type` varchar(30) NOT NULL default '',
  `c_related_table` varchar(100) NOT NULL default '',
  `c_related_uid` int(11) NOT NULL default '0',
  PRIMARY KEY  (`c_role`,`c_who`,`c_action`,`c_type`,`c_related_table`,`c_related_uid`),
  KEY `c_role` (`c_role`,`c_who`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8</pre>

You'll notice I added a key on `(c_role, c_who)` which is a leftmost prefix of the primary key. In general, indexes always appear in this output as `KEY (column names)`, with a possible `PRIMARY` or `UNIQUE` in front (update: it should not have FOREIGN in front, because that's not an index). That's pretty easy to parse with a regular expression, and grab **just the columns**. A global match captures every index into an array. Then it's just a matter of looping through the array and comparing. Here is the code:

<pre>foreach my $table ( @tables ) {
   my $ddl = $dbh-&gt;selectall_arrayref("show create table $table")
      ->[0]->[1];

   my @indexes = $ddl =~ m/(?&lt;!FOREIGN) KEY .*?\((.*?)\)[^\)]*$/mg;

   my $has_dupes = 0;
   foreach my $i ( 0..$#indexes ) {
      my $index = $indexes[$i];
      foreach my $j ( 0..$#indexes ) {
         next if $i == $j;
         my $other_index = $indexes[$j];
         if ( $index =~ m/^$other_index/ ) {
            print "Table $table has possible duplicate indexes:\n",
               "\t$index\n\t$other_index\n";
            $has_dupes = 1;
         }
      }
   }

   if ( $has_dupes ) {
      print "Here is the CREATE TABLE statement:\n$ddl\n\n";
   }
}</pre>

I literally wrote that in five minutes, so it may not catch everything, but it caught the duplicate I defined above:

<pre>Table t_privilege has possible duplicate indexes:
        `c_role`,`c_who`,`c_action`,`c_type`,`c_related_table`,`c_related_uid`
        `c_role`,`c_who`
Here is the CREATE TABLE statement:
CREATE TABLE `t_privilege` (
  `c_role` varchar(30) NOT NULL default 'other',
  `c_who` int(11) NOT NULL default '0',
  `c_action` varchar(100) NOT NULL,
  `c_type` varchar(30) NOT NULL default '',
  `c_related_table` varchar(100) NOT NULL default '',
  `c_related_uid` int(11) NOT NULL default '0',
  PRIMARY KEY  (`c_role`,`c_who`,`c_action`,`c_type`,`c_related_table`,`c_related_uid`),
  KEY `c_role` (`c_role`,`c_who`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8</pre>

As I said in my comments on Peter's blog, I don't really need to have something generate statements that can correct the problem for me, or anything like that. It's nice, but it's not essential. First of all, I'd never just trust a tool to go "fix" my tables for me. I'd want it to tell me where it found potential problems. Then I'd go inspect and alter the table by myself if I want to.

With my program, I don't really have to "go inspect the table," since it's kind enough to print out the `SHOW CREATE` statement for me :-) Its output has everything I need to make a good decision about the table, unless it's someone else's table which I don't understand well.

I wrapped the above Perl code into a script you can run from the command-line with familiar command-line arguments (plus it reads from your .my.cnf file to get defaults). You can download it and have fun with it. Execute `perldoc duplicate-index-checker` for all the gory details, or just use the `--help` command-line argument. Let me know if you want me to tweak it &#8212; I'm happy to. If you find a scenario it doesn't work for, please put the `SHOW CREATE` statement in your comment.

One thing I also want to make it do, but it's past my bedtime so I won't do it tonight, is report duplicate foreign keys. I sometimes find this (actually I found a lot of them at my current employer). Maybe later this week.

For those who want more features, or don't like Perl, check out a nice (and far more mature) Java implementation of a similar tool: [MySQL Index Analyzer][3].

 [1]: http://www.mysqlperformanceblog.com/
 [2]: http://www.mysqlperformanceblog.com/2006/08/17/duplicate-indexes-and-redundant-indexes/
 [3]: http://mysql-index-analyzer.blogspot.com/
