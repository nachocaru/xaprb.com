---
title: MySQL Find 0.9.0 released
date: "2007-05-08"
permalink: /2007/05/08/mysql-find-090-released/
categories:
  - Databases
---

If you've used the UNIX `find` command for more than a trivial find-and-print, you know how powerful it is; it's almost a miniature programming environment to find and manipulate files and directories. What if you could do the same thing with MySQL tables and databases? That was the inspiration for writing this tool. I was about to write several other tools to do some MySQL administrative jobs when I realized I could generalize and make something much more useful and powerful.

This first release has only the functionality I needed for the jobs I had to do. Initially I just implemented commands for working with tables, but the design evolved into something that can be more powerful with minimal added work. Though I modelled the tool after `find`, I didn't build in all the complex expressions and conditions. Instead, I followed the general idea of having three kinds of options: regular options, tests, and actions.

The tests allow you to do things like select tables with more than a certain number of rows and with a given storage engine. There are numeric, date, and regular-expression tests.

You can apply actions to the selected tables, and as with `find`, the default action is to just print their names. There's a `--printf` option and two ways to `exec` SQL commands.

### What's it for?

By way of introduction, let me explain what I was going to write special-purpose tools to do, and then show you how I can do it with mysql-find instead.

*   The first job was a tool I had tentatively titled `mysql-measure-tables`, which would gather selected data about all tables (data size, index size, number of rows) and store it into another table for forensics and analysis over time.
*   The second was a `stale-table-sniper` tool to find scratch tables and delete them when a process fails to clean up after itself. I had something like this implemented at my employer, but it also needed to throw away tables in some databases after they got a few weeks old. These are tables the analysts create and don't delete.

Both are fairly easy to implement; really just a dozen or so lines of code. But as I began to implement the stale table sniper, it occurred to me that I should emulate `find` instead.

With `mysql-find`, now I can do these tasks and many more, very easily:

<pre># Delete scratch tables created by processes that died
mysql-find --pid '\D_(\d+)$' scratch --exec_plus "DROP TABLE %s";

# Delete old tables created by analysts
mysql-find --mtime +30 analyst_scratch --exec_plus "DROP TABLE %s";

# Save table size and row count for monitoring over time
mysql-find --noquote --exec "INSERT INTO stat.tblsize(db, tbl, idxlen, datalen, rowcount) VALUES('%D', '%N', %I, %d, %S)";
</pre>

I'll write separately about the `--pid` option and how I use it. It's a simple naming convention that makes life easy when you don't want to use temporary tables (in my case, because of replication). If you're curious, there are more details in the mysql-find man page.

Speaking of the man page, I hope you'll find the documentation complete and useful. There are examples to stimulate your imagination too.

It's not revolutionary, but it might be useful -- who knows.

### What's next?

What features are upcoming, you say? Actually, I don't have plans for any more functionality myself. This tool works for me as it is. But if you need something, hop onto the mailing lists, forums, or bug trackers at [MySQL Toolkit Sourceforge page][1] and ask. Other obvious additions would be the ability to work with databases, columns, indexes, foreign keys etc. And of course, if you find bugs, that's the place to report them.

### About MySQL Toolkit

[MySQL Toolkit][1] is a set of essential tools for MySQL users, developers and administrators. The project's goal is to make high-quality command-line tools that follow the UNIX philosophy of doing one thing and doing it well. They are designed for scriptability and ease of processing with standard command-line utilities such as `awk` and `sed`.

 [1]: http://code.google.com/p/maatkit
