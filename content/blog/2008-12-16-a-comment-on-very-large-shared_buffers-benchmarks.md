---
title: A comment on very large shared_buffers benchmarks
date: "2008-12-16"
permalink: /2008/12/16/a-comment-on-very-large-shared_buffers-benchmarks/
categories:
  - PostgreSQL
tags:
  - Kenny Gorman
---
I tried to post a comment to [Kenny Gorman's post on Tuning for very large shared_buffers][1] article, but it seems to have gone into the spam bucket. I was torn about whether it's worth a separate post anyway, so this tipped me over the edge.

My question is what happens in the other 3 scenarios that weren't measured? Namely,

*   Test#4: buffered I/O and 20GB of shared_buffers
*   Test#5: direct I/O and 500MB of shared_buffers
*   Test#6: direct I/O and 2GB of shared_buffers

Without these, I'm unable to form an opinion on the article's conclusions:

> A modest gain can be had when using a very large (comparatively) shared_buffers setting when combining that change with direct I/O. The PostgreSQL cache does scale quite nicely up to at least a 20GB cache size when configured in this manner.
I'm also unclear on what the X-axis on the graph represents.

 [1]: http://www.kennygorman.com/wordpress/?p=284
