---
title: Duplicate index checker version 1.9 released
author: Baron Schwartz
excerpt: |
  <p>I've made more improvements to the <a href="http://www.xaprb.com/duplicate-index-checker/">duplicate index checker</a>.  I addressed a MySQL bug <a href="http://rpbouman.blogspot.com/">Roland Bouman</a> mentioned to me, added more tests to the suite, and made changes so it considers more types of indexes now (HASH, BTREE, SPATIAL).  I made no changes to the foreign key checking.</p>
layout: post
permalink: /2006/10/01/duplicate-index-checker-version-19-released/
description:
  - >
    This version of the MySQL duplicate index checker adds a workaround for a MySQL
    bug and better support for advanced index types.
---
I've made more improvements to the [duplicate index checker][1]. I addressed a [MySQL bug][2] [Roland Bouman][3] mentioned to me, added more tests to the suite, and made changes so it considers more types of indexes now ([HASH][4], BTREE, [SPATIAL][5]). I made no changes to the foreign key checking.

The [bug Roland mentioned][2] is a problem with `SHOW CREATE TABLE` that causes MySQL to show an index as type HASH when it's really a BTREE. I found a pretty easy workaround.

In the meantime, Roland has released a SQL-only method to find duplicate indexes in newer versions of MySQL. It's an excellent use of the INFORMATION_SCHEMA. He also wrote [an article on finding duplicate indexes][6] for O'Reilly Database, and for his own blog too.

Daniel Schneller has also continued to work on a [Java implementation of a GUI tool to find duplicate and redundant indexes][7].

 [1]: http://www.xaprb.com/duplicate-index-checker/
 [2]: http://bugs.mysql.com/bug.php?id=22632
 [3]: http://rpbouman.blogspot.com/
 [4]: http://dev.mysql.com/doc/refman/5.0/en/create-index.html
 [5]: http://dev.mysql.com/doc/refman/5.0/en/creating-spatial-indexes.html
 [6]: http://www.oreillynet.com/databases/blog/2006/09/_finding_redundant_indexes_usi.html
 [7]: http://mysql-index-analyzer.blogspot.com/
