---
title: Maatkit learns how to map-reduce
author: Baron Schwartz
layout: post
permalink: /2010/05/06/maatkit-learns-how-to-map-reduce/
categories:
  - Maatkit
  - Perl
  - SQL
  - Tools
---
The May release of Maatkit included a new feature in mk-query-digest. This allows you to process queries in many pieces, write out intermediate results, and then combine the pieces in a separate step. Maybe it's not exactly map-reduce, but it makes a good headline.

The purpose is to enable query analysis across an arbitrarily large group of servers. Process queries on all of them, ship the results to a central place, and then combine them together. Pre-processing the results has some nice benefits, such as reduced bandwidth requirements, speeding up processing by doing it in parallel, and reducing the workload on the central aggregator. One Percona customer with many MySQL instances is trying this out.

The `--save-results` option on mk-query-digest saves the digested results to a file, stopping just before the final stages of the query event pipeline. There is a tool in Subversion trunk, tentatively called mk-merge-mqd-results, which reads these saved files, aggregates them together, and then finishes the process of computing statistics and making a report.
