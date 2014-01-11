---
title: "Measuring free space in InnoDB's global tablespace"
date: "2012-09-07"
permalink: /2012/09/07/measuring-free-space-in-innodbs-global-tablespace/
categories:
  - SQL
---
With `innodb_file_per_table=1`, InnoDB places every table's data and indexes in a separate `.ibd` file, but there is still a "global" system tablespace, stored by default in a file named `ibdata1`. This contains some of each table's data, such as the undo log and insert buffer. If it is fixed-size, you can fill it up and crash the server, as I've mentioned in a few recent blog posts.

In older versions of MySQL, the `SHOW TABLE STATUS` command showed the amount of space free in the tablespace as an entry in the `Comment` column. If you weren't using `innodb_file_per_table`, you could use this to see how full your tablespace was.

The servers I'm managing use `innodb_file_per_table=1`, so I thought perhaps I can find out how full the system tablespace is by disabling `innodb_file_per_table`, creating a table, and enabling it again. This quickly reminded me that the setting is global only, not per-connection. It would be nice to have more flexibility for that option.

But then I discovered that it didn't work anyway. My new table, created in the system tablespace instead of in its own file, doesn't show anything in the `Comment` column. And the `INFORMATION_SCHEMA.TABLESPACES` table appears to be a stub; it is empty and the [docs][1] say nothing meaningful about it.

Are there any other options for measuring the space usage in the tablespace? I'd rather do this within the server itself than use an external tool like xtrabackup.

 [1]: http://dev.mysql.com/doc/refman/5.5/en/tablespaces-table.html
