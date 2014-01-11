---
title: 3 ways to write UPSERT and MERGE queries in MySQL
author: Baron Schwartz
excerpt: "<p>This article is a quick pointer on MySQL's three available tools for <code>UPSERT</code> (update/insert) or <code>MERGE</code> queries.</p>"
layout: post
permalink: /2006/06/17/3-ways-to-write-upsert-and-merge-queries-in-mysql/
description:
  - >
    Lists three techniques for doing UPSERT (update/insert) or MERGE queries in
    MySQL.
---
This article is a quick pointer on MySQL's three techniques for `UPSERT` (update/insert) or `MERGE` queries. I've written about this before, but since SQL 2003 has a `MERGE` statement (which Oracle and DB2 support), many people are asking for similar functionality in MySQL without realizing it already exists. I hope this article helps you find what you need.

The three tools are

1.  `REPLACE`
2.  `INSERT ... ON DUPLICATE KEY UPDATE ...`
3.  Transactional `UPDATE` followed by `INSERT`

I've discussed them in great detail in my article on [flexible insert and update statements in MySQL][1].

There are other methods too, such as `INSERT IGNORE`, but these are the three most important.

 [1]: /blog/2006/02/21/flexible-insert-and-update-in-mysql/
