---
title: Introducing MySQL Table Sync
permalink: /2007/03/18/introducing-mysql-table-sync/
description:
  - >
    MySQL Table Sync efficiently finds and resolves data differences between two
    MySQL tables, which may be on different servers.
---
<p class="download">
  <a href="http://code.google.com/p/maatkit">Download MySQL Table Sync</a>
</p>

MySQL Table Sync efficiently finds and resolves data (not structural) differences between two MySQL tables, which may be on different servers. It offers two search algorithms to find the rows that differ, and several methods to bring the destination table into sync with the source.

It's based on my earlier discussion on [how to find and resolve data differences between MySQL tables][1] and is part of the [MySQL Toolkit][2] project.

Acknowledgments are due before anything else: thanks to [Giuseppe Maxia, who laid the foundation several years ago][3] (and [released code for download too][4]). Thanks to Fabien Coelho, who extended this work into [pg_comparator][5] and wrote a very detailed analysis of the technique (see also ["Remote Comparison of Database Tables"][6]). Fabien kindly answered some questions I had over the last weeks.

### Efficient search for differences

I implemented both the top-down algorithm I proposed in my earlier post, and the bottom-up search algorithm developed by Maxia and Coelho.

The top-down search is my original work, and I implemented it nearly as proposed, except I converted it to breadth-first instead of depth-first search for technical reasons (there are also some practical advantages to breadth-first search). I also haven't implemented all the grouping strategies I proposed. Only simple groupings on columns are implemented.

I reworked the bottom-up algorithm to add running counts, indexed modulus columns, and some other efficiency, correctness and optimization changes. However, it is about 80% based on Coelho's algorithm, and I consulted the `pg_comparator` source code frequently while writing it.

Both algorithms are good for certain cases and poor for others.

### Methods to resolve the differences

I implemented a variety of options to resolve the differences between the tables, including one that relies on replication, which is ideally suited for re-syncing slaves that have drifted without having to re-initialize them completely. There are also many options to control locking, waiting for the slave to catch up to the master, and so on. This part of the tool is not terribly difficult or complex, but it's something no one has quite done before to my knowledge.

Work on this remains, however.

### The tool's present and future

The documentation is incomplete as of yet, and there are some things I still want to implement, but I wanted to get it out (release early, release often). I have used the tool in lots of tests, and have not found anything incorrect yet, but that doesn't mean there are no bugs. I have also used it &#8212; cautiously &#8212; in production. I re-synced a table that had drifted out of sync on a slave.

If you want to try it, I encourage you to run it in `--print` mode to begin with, and examine carefully the queries it emits. Its output is valid SQL, so you can actually execute the output to sync the destination table.

I'm sure there will be many changes to functionality, behavior and output in the future.

I really hope you'll try it and let me know what you think.

### About MySQL Toolkit

[MySQL Toolkit][2] is a set of essential tools for MySQL users, developers and administrators. The project's goal is to make high-quality command-line tools that follow the UNIX philosophy of doing one thing and doing it well. They are designed for scriptability and ease of processing with standard command-line utilities such as `awk` and `sed`. Other tools in the toolkit include a table checksummer and a duplicate key checker.

 [1]: /blog/2007/03/05/an-algorithm-to-find-and-resolve-data-differences-between-mysql-tables/
 [2]: http://code.google.com/p/maatkit
 [3]: http://www.sysadminmag.com/articles/2004/0408/
 [4]: http://www.perlmonks.org/?node_id=381053
 [5]: http://www.coelho.net/pg_comparator/
 [6]: http://cri.ensmp.fr/classement/doc/A-375.pdf
