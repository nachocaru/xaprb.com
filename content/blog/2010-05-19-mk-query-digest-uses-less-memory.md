---
title: mk-query-digest uses less memory
permalink: /2010/05/19/mk-query-digest-uses-less-memory/
categories:
  - Maatkit
  - SQL
tags:
  - Daniel Nichter
---
Daniel changed [mk-query-digest][1] to use much less memory. It parsed and aggregated a 2GB MySQL slow query log file in a few dozen megabytes of memory for me yesterday. Thanks to Facebook for sponsoring this work.

 [1]: http://www.maatkit.org/
