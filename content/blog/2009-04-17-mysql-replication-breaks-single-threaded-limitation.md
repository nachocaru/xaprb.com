---
title: MySQL replication breaks single-threaded limitation?
author: Baron Schwartz
layout: post
permalink: /2009/04/17/mysql-replication-breaks-single-threaded-limitation/
categories:
  - SQL
tags:
  - MySQL
  - replication
---
It's a feature preview with many limitations, but [this is still good news][1]. This has been a pretty severe performance limitation for replication in MySQL, which has prompted many a [workaround][2].

Interestingly, the feature preview is based on MySQL 5.1, which has recently seemed to be getting some [significant][3] [changes][4] even though it's a GA release. Does this signal a change to MySQL's release cycle, which has sometimes been characterized as too long? More good news?

 [1]: http://larsthalmann.blogspot.com/2009/04/feature-preview-multi-threaded-slave.html
 [2]: http://www.maatkit.org/doc/mk-slave-prefetch.html
 [3]: http://www.mysqlperformanceblog.com/2009/04/06/mysql-and-ibm/
 [4]: http://s.petrunia.net/blog/?p=52
