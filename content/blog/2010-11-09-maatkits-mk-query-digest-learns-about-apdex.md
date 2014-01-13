---
title: "Maatkit's mk-query-digest learns about Apdex"
date: "2010-11-09"
permalink: /blog/2010/11/09/maatkits-mk-query-digest-learns-about-apdex/
categories:
  - Databases
  - Open Source
---
This month's [Maatkit][1] release, which just hit the download servers, contains a new feature for mk-query-digest: Apdex scores. The Apdex performance index is a *sensible* metric of how satisfactory the response time to a request is. Of all the scientific metrics I've seen, it's the most practical; and of all the practical ones I've seen, it's the most scientific.

To use this feature, you need to know what the [Apdex threshold][2] means, and you need to know [how to configure this in mk-query-digest][3].

And then you can ask and answer practical questions such as "which classes of queries against this MySQL server are not satisfying users?" Or, because mk-query-digest supports the HTTP protocol, you can pose the same question about your web application overall.

 [1]: http://code.google.com/p/maatkit/
 [2]: http://www.apdex.org/specs.html
 [3]: http://www.maatkit.org/doc/mk-query-digest.html#apdex_threshold
