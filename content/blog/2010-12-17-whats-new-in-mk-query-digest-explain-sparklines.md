---
title: "What's new in mk-query-digest: EXPLAIN sparklines"
date: "2010-12-17"
permalink: /2010/12/17/whats-new-in-mk-query-digest-explain-sparklines/
categories:
  - Databases
---
This month's [Maatkit][1] release has some nice new features and improvements to mk-query-digest. There is one that deserves its own blog post: EXPLAIN sparklines.

A "sparkline" is a simple type of chart that conveys important information without the details. We added a kind of ASCII sparkline to mk-query-digest to convey important information about the query's EXPLAIN plan so you can see if the query is "bad" or not. It is kind of a cryptic geek code that you will need some help decoding. It's intentionally compact, so that it can fit in the "profile" that mk-query-digest prints out from a normal report.

Here is an example of the profile report:

`<pre># Profile
# Rank Query ID           Response time    Calls R/Call   Apdx V/M   EXPLAIN Item
# ==== ================== ================ ===== ======== ==== ===== ======= =====
#    1 0x808CDA06B6EB3D5A     0.0141 83.5%     2   0.0071 1.00  0.00 aa      SELECT test.t
#    2 0x8305A7D4195D2096     0.0011  6.7%     6   0.0002 1.00  0.00 aa      SELECT test.t
</pre>` 
The EXPLAIN column appears if you add the *&#8211;explain* option to mk-query-digest. **Note: while writing this post I discovered a bug in the new functionality, which is now fixed in trunk, so if you want to use this you'll need to 'wget maatkit.org/trunk/mk-query-digest' to get a version that doesn't have the bug.**

In this case, both queries are shown as **aa**. What is that? It's our geek code, one character per table in the EXPLAIN plan. And if we look at the documentation, 'a' is the shorthand for Type=ALL:

`<pre>The abbreviated table access codes are:

  a  ALL
  c  const
  e  eq_ref
  f  fulltext
  i  index
  m  index_merge
  n  range
  o  ref_or_null
  r  ref
  s  system
  u  unique_subquery
</pre>` 
So "aa" is shorthand for "table scan the first table, and do a cross-join with the second table by scanning it too." That's a terrible query plan! Someone needs to fix their SQL or add some indexes or something.

The code includes a couple of other small but important bits of data about the EXPLAIN plan:

*   If the letter is upper-case, it means there was a "Using index" in the Extra column for that table, so it's accessed through a covering index.
*   If there was a temporary table or filesort, it appears as T or F in the output, separated by a ">" character. This can appear before or after the rest of the EXPLAIN, depending on [the method MySQL uses to order the results][2].

Here are some more examples so you can practice reading the results:

*   **TF>cRn** is a three-table join: the first table is treated as a constant, the next table is accessed by 'ref' with a covering index, and the final table is accessed by an index range scan. There is a temp table and filesort on the first or second table. (We actually know that it's the second table, because the first table is treated as a constant.)
*   **aeeeE** is something like a star-schema join in a data warehousing query. The first table is accessed via a full table scan. It's probably the fact table. The second, third, and fourth tables are accessed through an eq\_ref method; they are probably dimension tables. The last table is also an eq\_ref, but it uses a covering index.

 [1]: http://www.maatkit.org/
 [2]: http://s.petrunia.net/blog/?p=24
