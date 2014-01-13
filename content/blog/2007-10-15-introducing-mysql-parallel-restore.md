---
title: Introducing MySQL Parallel Restore
date: "2007-10-15"
permalink: /blog/2007/10/15/introducing-mysql-parallel-restore/
categories:
  - Databases
---

The new release of MySQL Toolkit (version 1051) updates MySQL Parallel Dump in minor ways, but more importantly, it adds MySQL Parallel Restore.

MySQL Parallel Restore is the reverse of MySQL Parallel Dump. You give it one or more files and/or directories, and it discovers all the files contained within them and loads them in parallel. It understands how to load SQL and/or TXT/CSV files. If you give it some of both, it loads the SQL first and then loads the TXT/CSV as delimited files with LOAD DATA INFILE.

It does not parallelize a single table. That is, it doesn't try to load two files into a table at the same time. But if you're loading multiple tables, it will do them in parallel.

It has what I consider to be smart defaults. For example, by default it commits between each delimited file it loads. And since the dump tool makes it easy to dump a table in chunks, this makes it much easier on the server to restore a very large table.

I've been following the "release early, release often" philosophy with these two tools. You should test carefully before you trust them with your data. If you can't restore your data accurately, it's probably a bug. I've been testing with the following procedure:

<pre>mysql-table-checksum -a ACCUM localhost > checksum-before
mysqldump --all-databases | gzip -c - > sanity.gz
mysql-parallel-dump ... options ... 
mysql-parallel-restore ... options ... default/
mysql-table-checksum -a ACCUM localhost > checksum-after
mysql-checksum-filter checksum-before checksum-after</pre>

If the checksums don't match after restoring, you can restore the original data from the sanity dump. I encourage you to report any bugs you find with this procedure. Incidentally, this exercise taught me that `LOAD DATA INFILE` is pretty hard to get just right. It has all sorts of weird dependencies on character sets that aren't documented. That's why I'm a little cautious and I'm asking you to tell me if you can't restore correctly.
