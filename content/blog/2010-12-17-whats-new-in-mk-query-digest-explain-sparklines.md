---
title: 'What&#8217;s new in mk-query-digest: EXPLAIN sparklines'
author: Baron Schwartz
layout: post
permalink: /2010/12/17/whats-new-in-mk-query-digest-explain-sparklines/
categories:
  - SQL
---
This month&#8217;s [Maatkit][1] release has some nice new features and improvements to mk-query-digest. There is one that deserves its own blog post: EXPLAIN sparklines.

A &#8220;sparkline&#8221; is a simple type of chart that conveys important information without the details. We added a kind of ASCII sparkline to mk-query-digest to convey important information about the query&#8217;s EXPLAIN plan so you can see if the query is &#8220;bad&#8221; or not. It is kind of a cryptic geek code that you will need some help decoding. It&#8217;s intentionally compact, so that it can fit in the &#8220;profile&#8221; that mk-query-digest prints out from a normal report.

Here is an example of the profile report:

`<pre># Profile
# Rank Query ID           Response time    Calls R/Call   Apdx V/M   EXPLAIN Item
# ==== ================== ================ ===== ======== ==== ===== ======= =====
#    1 0x808CDA06B6EB3D5A     0.0141 83.5%     2   0.0071 1.00  0.00 aa      SELECT test.t
#    2 0x8305A7D4195D2096     0.0011  6.7%     6   0.0002 1.00  0.00 aa      SELECT test.t
</pre>` 
The EXPLAIN column appears if you add the *&#8211;explain* option to mk-query-digest. **Note: while writing this post I discovered a bug in the new functionality, which is now fixed in trunk, so if you want to use this you&#8217;ll need to &#8216;wget maatkit.org/trunk/mk-query-digest&#8217; to get a version that doesn&#8217;t have the bug.**

In this case, both queries are shown as **aa**. What is that? It&#8217;s our geek code, one character per table in the EXPLAIN plan. And if we look at the documentation, &#8216;a&#8217; is the shorthand for Type=ALL:

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
So &#8220;aa&#8221; is shorthand for &#8220;table scan the first table, and do a cross-join with the second table by scanning it too.&#8221; That&#8217;s a terrible query plan! Someone needs to fix their SQL or add some indexes or something.

The code includes a couple of other small but important bits of data about the EXPLAIN plan:

*   If the letter is upper-case, it means there was a &#8220;Using index&#8221; in the Extra column for that table, so it&#8217;s accessed through a covering index.
*   If there was a temporary table or filesort, it appears as T or F in the output, separated by a &#8220;>&#8221; character. This can appear before or after the rest of the EXPLAIN, depending on [the method MySQL uses to order the results][2].

Here are some more examples so you can practice reading the results:

*   **TF>cRn** is a three-table join: the first table is treated as a constant, the next table is accessed by &#8216;ref&#8217; with a covering index, and the final table is accessed by an index range scan. There is a temp table and filesort on the first or second table. (We actually know that it&#8217;s the second table, because the first table is treated as a constant.)
*   **aeeeE** is something like a star-schema join in a data warehousing query. The first table is accessed via a full table scan. It&#8217;s probably the fact table. The second, third, and fourth tables are accessed through an eq\_ref method; they are probably dimension tables. The last table is also an eq\_ref, but it uses a covering index.

 [1]: http://www.maatkit.org/
 [2]: http://s.petrunia.net/blog/?p=24