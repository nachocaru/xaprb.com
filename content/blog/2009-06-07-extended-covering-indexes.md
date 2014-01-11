---
title: Extended covering indexes
author: Baron Schwartz
layout: post
permalink: /2009/06/07/extended-covering-indexes/
categories:
  - SQL
tags:
  - Clustered indexes
  - Covering indexes
  - InnoDB
  - MySQL
  - TokuDB
  - Tokutek
---
As you can probably guess, I&#8217;m catching up on reading my blogs. I&#8217;ve just read with interest about [TokuDB&#8217;s multiple clustering indexes][1]. It&#8217;s kind of an obvious thought, once someone has pointed it out to you. I&#8217;ve only been around products that insist there can be Only One clustered index (and then there&#8217;s [ScaleDB][2], who say &#8220;think differently already&#8221;).

Anyway, we already know that there are quite a few database products that use clustered indexes and to avoid update overhead, require every non-clustered index to store the clustered key as the &#8220;pointer&#8221; for row lookups. Thus there are &#8220;hidden columns&#8221; which are present at the leaf nodes, but not the non-leaf nodes, of secondary indexes. Why not take that idea and run with it a little? Here&#8217;s what I mean:

<pre>create table test (
  a int,
  b int,
  c int,
  primary key(a),
  key(b) <strong>plus(c)</strong>
);
</pre>

This would index column b, which because of the clustered primary key would contain column a at the leaf nodes; and additionally we&#8217;ve requested for it to store column c. And then we would be able to do this:

<pre>explain select c from test where b = 1\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: test
         type: ref
possible_keys: b
          key: b
      key_len: 5
          ref: const
         rows: 1
        Extra: Using index
</pre>

The &#8220;Using index&#8221; is the key to note there. (Yes, I invented that EXPLAIN result; it is not possible to get with current MySQL and current storage engines.) This strikes me as an improvement over TokuDB, which apparently says you can have all or none. Why not let people say which columns they want?

 [1]: http://tokutek.com/category/tokuview/introducing_multiple_clustering_indexes/
 [2]: http://www.scaledb.com/