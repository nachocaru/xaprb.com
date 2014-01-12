---
title: "The cache-oblivious algorithms inside Tokutek's TokuDB"
date: "2009-06-07"
permalink: /2009/06/07/the-cache-oblivious-algorithms-inside-tokuteks-tokudb/
categories:
  - Databases
---
[Tokutek][1] have said they are working towards explaining their indexing algorithms. I spoke to some of the Tokutek people over the last 14 months or so about this, although I didn't really start to pay attention until the beginning of the year. While Vadim, Peter and I were writing [our blog post on TokuDB][2], I asked them to provide scholarly references, and they did, but warned me it would be dense reading, in part because it's so academic. Mark Callaghan also told me he had gotten them to walk him through the math behind their indexing algorithm and found it hard.

Here's a blog post with [links to the research behind their work][3]. I'm happy to say that after working through one of the papers at a superficial level, I agree -- it's pretty dense, though I think the concepts can be made understandable to mortals. It took me an hour and a half, but I didn't take the time to convince myself of the validity of the proofs; that would probably take a long time. Moreover, I think these papers only describe parts of the foundation, not the actual implementation. I look forward to the layman's version, which I'm sure will be more accessible to Bears of Very Small Brain like myself.

Disclaimer: I work for Percona, and Percona was paid to do some benchmarking and analysis for Tokutek. However, I am not paid to say this: I think TokuDB is one of the more interesting technologies I've seen in a while. By that, I mean it's actually something new, a real advancement in applied computer science. Not just the same old B-Trees with a different twist of lemon.

 [1]: http://www.tokutek.com/
 [2]: http://www.mysqlperformanceblog.com/2009/04/28/detailed-review-of-tokutek-storage-engine/
 [3]: http://tokutek.com/category/tokuview/publications_related_to_fractal_tree_indexing/
