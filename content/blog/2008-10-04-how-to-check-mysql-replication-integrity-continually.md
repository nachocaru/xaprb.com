---
title: How to check MySQL replication integrity continually
author: Baron Schwartz
layout: post
permalink: /2008/10/04/how-to-check-mysql-replication-integrity-continually/
categories:
  - Maatkit
  - SQL
tags:
  - checksumming
  - MySQL
---
I have recently added some features to [Maatkit&#8217;s mk-table-checksum][1] tool that can make it easy to checksum the relevant parts of your data more frequently (i.e. [continually, but not continuously][2]). This in turn makes it possible for you to find out *much* sooner if a slave becomes different from its master, and then you can take action before the differences affect more of your data.

<!--more-->

The new features let you apply your knowledge of your data to the checksumming operation. For example, if table X is append-only, then you can make it checksum only the new rows (those inserted since the last checksum). If the table is MyISAM, then it has a last-modified timestamp, which comes from the .MYI file&#8217;s timestamp &#8212; that&#8217;s another easy way to find out whether the table has changed since the last time you ran the checksum.

The new features also let you checksum only part of the data. For example, you can checksum 1/7th of your data each day, which is pretty likely to catch differences if they&#8217;re widespread. And just in case they&#8217;re localized, you can checksum a different portion each day so you cover the whole dataset each week.

Finally, you can apply these new options per-table, so some tables get checksummed one way and some another way. In fact, there&#8217;s now a mechanism for you to specify *most* options per-table, so you can specify the checksum algorithm, sleep time, chunksize, and a bunch of other things.

Let&#8217;s take a look at the new features.

### Checksumming only part of the data

Suppose you want a rough idea of whether your data is really different on a slave. Maybe you&#8217;re a consultant who needs to check a really big data set to see if there&#8217;s cause for concern. (Hmm, this sounds familiar, almost as though&#8230; nevermind.) One way to do that is to checksum a random sample of the rows. Let&#8217;s checksum 5% of the data:

<pre>mk-table-checksum --replicate test.checksum --chunksize 1000 --probability 5 localhost</pre>

When this completes, you can check the results on the slave.

While this is handy, it&#8217;s not what you need if you&#8217;re trying to set up a routine job to check all your data on an ongoing basis. You want complete coverage over some period of time. That&#8217;s what `--modulo` and `--offset` are for. Let&#8217;s do 1/7th of the data every day, to achieve full coverage over the course of a week:

<pre>mk-table-checksum --replicate test.checksum --chunksize 1000 \
   --modulo 7 --offset 'WEEKDAY(NOW())' localhost</pre>

Notice that I&#8217;m passing a SQL expression to the `--offset` option. There&#8217;s a little bit of magic here. The tool puts `SELECT` in front of this and executes it in MySQL; if there&#8217;s no error, then the result of the `SELECT` is used as the option&#8217;s argument.

### Checksumming only changed data

The final new feature is the ability to checksum based on newness.

Scenario 1 is tables that don&#8217;t change often, so they can be skipped entirely. Let&#8217;s skip things that haven&#8217;t changed in the last week:

<pre>mk-table-checksum --replicate test.checksum --chunksize 1000 \
   --since 'CURRENT_DATE - INTERVAL 7 DAY' localhost</pre>

Again, the argument is an expression that MySQL can evaluate. (You could also write clever things here, such as selecting from an actual table.) If the table has an `Update_time` timestamp, and the value of `--since` looks like a temporal value, then the two are compared and the table can be skipped or checksummed, based on that comparison.

But there&#8217;s another scenario. The `--since` value can also be the value of the table&#8217;s primary key (actually, the column by which the table is chunked, but the primary key is usually preferred for that.) Suppose you have an auto_increment primary key column named ID. Last time you checksummed, the maximum value in that column was 123,456. This time we can checksum only newer rows:

<pre>mk-table-checksum --replicate test.checksum --chunksize 1000 \
   --tables mydb.mytbl --since 123456 localhost</pre>

The table will be divided into chunks of 1000 rows based on the range of values in the ID column, and the `--since` value will be applied as an extra `WHERE` clause mentioning that column. You can also use the `--sincecol` option to specify which column to apply the `WHERE` clause to, if necessary.

### Putting it all together

So far these options are useful, but of course you don&#8217;t want to checksum your servers one table at a time with an option here, an option there, and so on. Let&#8217;s see how to simplify this so you can just run the tool and make it Do The Right Thing on every table.

This is the purpose of the `--argtable` argument, which lets you specify per-table options for the checksum operation. You create a table &#8212; I&#8217;ll use `checksum_args`, but you can call it whatever you like. What&#8217;s important is the columns in the table:

<pre>CREATE TABLE checksum_args (
     db         char(64)     NOT NULL,
     tbl        char(64)     NOT NULL,
     -- other columns as desired
     PRIMARY KEY (db, tbl)
  );
</pre>

You pass the name of this table to the tool:

<pre>mk-table-checksum --argtable mydb.checksum_args [other options....]</pre>

Now you can add columns to the table, named the same as the short form of some of mk-table-checksum&#8217;s options. For example, if you want mydb.mytbl to be checksummed in chunks of 500 rows, add a `C` column to the table. (The short form of `--chunksize` is `-C`.) Now insert a row into the table:

<pre>insert into checksum_args(db, tbl, C) values('mydb', 'mytbl', 500);</pre>

You can also add a `since` column to this table. And finally, you can use `--savesince` to specify whether to save the last-used `--since` back into the table after the checksum operation. This way the value persists from one run to the next. For tables that are skipped based on the timestamp of the table (instead of the biggest known value of the chunk column), the current timestamp is saved instead.

You can also add the `--modulo` and `--offset` into the table.

<pre>insert into checksum_args(db, tbl, C, M, O)
  values('mydb', 'mytbl', 500, 7, 'DAYOFWEEK(NOW())');</pre>

### Conclusion

So that&#8217;s a quick overview of the new features, which open up a range of new possibilities for frequent checksumming of data. Note that frequent isn&#8217;t the same as continuous (which is also not the same thing as continual, so don&#8217;t say the title of this post is false advertising). Continuous verification that a slave is in sync with the master requires some support in the server. However, you could easily checksum the newest rows in certain tables as often as you want, like every minute. In fact it&#8217;s probably a good idea to do checksums *more* often, and in smaller nibbles, with the new features I&#8217;ve explained here. You can ease the workload that way &#8212; spread it over time.

The features are still evolving, and the newest code in the Subversion trunk is what you should probably look at if you&#8217;re interested in using them. (Some of them aren&#8217;t completed in the last release.) If you have suggestions or find bugs, please use the [Maatkit Google Code project][3] to communicate them to the dev team.

But most of all, enjoy and profit from this work, and spread the word about Maatkit!

<p style="border:1px solid red; padding:2em; margin: 2em; background: yellow">
  Note: In the spring of 2009, there was a major effort to clean up and standardize Maatkit command-line options, so the specific command-line options and column names mentioned in this blog post are no longer valid. Thanks to Sheeri for pointing these out. For example, use chunk-size instead of C, because the -C option went away and &#8211;chunk-size took its place.
</p>

 [1]: http://www.maatkit.org/
 [2]: http://www.drgrammar.org/faqs/#59
 [3]: http://code.google.com/p/maatkit/