---
title: Extended covering indexes
date: "2009-06-07"
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
As you can probably guess, I'm catching up on reading my blogs. I've just read with interest about [TokuDB's multiple clustering indexes][1]. It's kind of an obvious thought, once someone has pointed it out to you. I've only been around products that insist there can be Only One clustered index (and then there's [ScaleDB][2], who say "think differently already").

Anyway, we already know that there are quite a few database products that use clustered indexes and to avoid update overhead, require every non-clustered index to store the clustered key as the "pointer" for row lookups. Thus there are "hidden columns" which are present at the leaf nodes, but not the non-leaf nodes, of secondary indexes. Why not take that idea and run with it a little? Here's what I mean:

<pre>create table test (
  a int,
  b int,
  c int,
  primary key(a),
  key(b) <strong>plus(c)</strong>
);
</pre>

This would index column b, which because of the clustered primary key would contain column a at the leaf nodes; and additionally we've requested for it to store column c. And then we would be able to do this:

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

The "Using index" is the key to note there. (Yes, I invented that EXPLAIN result; it is not possible to get with current MySQL and current storage engines.) This strikes me as an improvement over TokuDB, which apparently says you can have all or none. Why not let people say which columns they want?

 [1]: http://tokutek.com/category/tokuview/introducing_multiple_clustering_indexes/
 [2]: http://www.scaledb.com/
