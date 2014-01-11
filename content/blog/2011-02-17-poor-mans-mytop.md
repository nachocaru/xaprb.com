---
title: "Poor man's mytop"
permalink: /2011/02/17/poor-mans-mytop/
categories:
  - Innotop
  - Perl
  - SQL
---
I often need to watch a server that's very minimally configured, e.g. has no Perl DBI libraries installed, and I shouldn't install anything. The following snippet is a quick way to do that:

<pre>watch 'mysqladmin proc | grep -v Sleep | cut -b0-130'</pre>

Replace **130** by the width of your terminal, naturally.

(Of course, [innotop][1] is much more featureful than mytop, but mytop is the essential functionality we're going for here!)

 [1]: http://code.google.com/p/innotop/
