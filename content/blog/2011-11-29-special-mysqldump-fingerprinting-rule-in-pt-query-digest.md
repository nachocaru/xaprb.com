---
title: Special mysqldump fingerprinting rule in pt-query-digest
author: Baron Schwartz
layout: post
permalink: /2011/11/29/special-mysqldump-fingerprinting-rule-in-pt-query-digest/
categories:
  - Percona Toolkit
  - SQL
tags:
  - Percona Toolkit
---
The pt-query-digest tool has a number of special cases that affect how it &#8220;fingerprints&#8221; queries when it groups similar queries together to produce an aggregated report over the group. One of these is a special rule for queries that appear to come from mysqldump, of the following form:

``<pre>SELECT /*!40001 SQL_NO_CACHE */ * FROM `users`</pre>`` 
All such queries will be fingerprinted together and presented in a single class of queries. I remember many instances where mysqldump queries crowded the report of the &#8220;most important&#8221; queries and just caused other queries to be excluded. Grouping them together made it obvious that mysqldump&#8217;s load on the server was a problem, but didn&#8217;t obliterate other interesting things we wanted to see in the report.