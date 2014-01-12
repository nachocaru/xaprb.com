---
title: What to do when MySQL says skip-innodb is defined
date: "2007-03-08"
permalink: /2007/03/08/what-to-do-when-mysql-says-skip-innodb-is-defined/
categories:
  - Databases
---
Are you seeing a MySQL error that says InnoDB support isn't enabled, even though it is? This article explains why it happens and how to fix it.

### The symptom

Suppose you call `SHOW INNODB STATUS` or another InnoDB-specific command and MySQL reports the following error:

"ERROR 1235 (42000): Cannot call SHOW INNODB STATUS because skip-innodb is defined"

Yet you search the MySQL configuration files and find that's not true. And you know you have InnoDB tables, too. What's going on?

As it turns out, the error message is a bit misleading. Many problems will cause this error message.

### Dig deeper

If InnoDB says it's disabled, it probably is. Look at a couple other things. Does `SHOW ENGINES` report InnoDB is disabled? How about `SHOW VARIABLES LIKE 'have_innodb'`? Try `SHOW TABLE STATUS` on an InnoDB table -- are most columns `NULL`?

If so, you most likely have an InnoDB configuration error. Not that you've disabled it with `skip-innodb`, but there's something wrong. If so, MySQL will still start, but the InnoDB storage engine, and tables that use it, will be disabled.

### One possible solution

When this happened to me, it was a config file upgrade that I didn't check carefully. The old directive for the InnoDB data file was as follows:

<pre>innodb_data_file_path           = ibdata1:10M:autoextend</pre>

When I upgraded the file, I changed it to

<pre>innodb_data_file_path = ibdata1:10M:autoextend:max:128M</pre>

That wouldn't have been a problem, except the file was already larger than 128MB. This is a slightly hard error to catch sometimes, because it may not show up in your MySQL error log (it doesn't on my Ubuntu laptop when I deliberately force the error to happen).

### A note of general caution

For those of you who are new to InnoDB configuration and administration, be careful. InnoDB has to be told exactly what to do. If you do anything wrong, such as set the permissions wrong on InnoDB's log or data files or directories, change the file sizes, or any of a bunch of other mistakes, it will be very unforgiving. It may even wipe your existing log and data files and replace them with new ones full of zeroes (yes, this will delete all your data).

The MySQL error log is your friend, but in many cases InnoDB doesn't flush any output to it for a long time, so you might for example start MySQL and see "MySQL NOT started." It might just be that InnoDB wasn't shut down nicely and has to roll back transactions to get to a consistent state. If so, that information will show up in the log files, but it might take a Very Long Time.

### If you need help

You can get help on the #mysql IRC channel, mailing lists, or just read the [MySQL manual][1]. I like the IRC channel best myself. It's friendly and there are a lot of smart people there to answer your questions.

 [1]: http://dev.mysql.com/doc/refman/5.0/en/index.html
