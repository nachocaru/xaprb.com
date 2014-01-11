---
title: 'Measuring free space in InnoDB&#8217;s global tablespace'
author: Baron Schwartz
layout: post
permalink: /2012/09/07/measuring-free-space-in-innodbs-global-tablespace/
categories:
  - SQL
---
With `innodb_file_per_table=1`, InnoDB places every table&#8217;s data and indexes in a separate `.ibd` file, but there is still a &#8220;global&#8221; system tablespace, stored by default in a file named `ibdata1`. This contains some of each table&#8217;s data, such as the undo log and insert buffer. If it is fixed-size, you can fill it up and crash the server, as I&#8217;ve mentioned in a few recent blog posts.

In older versions of MySQL, the `SHOW TABLE STATUS` command showed the amount of space free in the tablespace as an entry in the `Comment` column. If you weren&#8217;t using `innodb_file_per_table`, you could use this to see how full your tablespace was.

The servers I&#8217;m managing use `innodb_file_per_table=1`, so I thought perhaps I can find out how full the system tablespace is by disabling `innodb_file_per_table`, creating a table, and enabling it again. This quickly reminded me that the setting is global only, not per-connection. It would be nice to have more flexibility for that option.

But then I discovered that it didn&#8217;t work anyway. My new table, created in the system tablespace instead of in its own file, doesn&#8217;t show anything in the `Comment` column. And the `INFORMATION_SCHEMA.TABLESPACES` table appears to be a stub; it is empty and the [docs][1] say nothing meaningful about it.

Are there any other options for measuring the space usage in the tablespace? I&#8217;d rather do this within the server itself than use an external tool like xtrabackup.

 [1]: http://dev.mysql.com/doc/refman/5.5/en/tablespaces-table.html