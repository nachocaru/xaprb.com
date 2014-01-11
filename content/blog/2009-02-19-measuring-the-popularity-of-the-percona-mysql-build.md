---
title: Measuring the popularity of the Percona MySQL build
date: "2009-02-19"
permalink: /2009/02/19/measuring-the-popularity-of-the-percona-mysql-build/
categories:
  - SQL
tags:
  - Percona
  - WordPress
---
I have a Google Alert on "percona". (And many other things &#8212; great way to keep tabs on competitors, what people are saying about you, etc.)

I've been seeing increasing amounts of this type of thing:

> MySQL server version: 5.0.67-percona-3 CATEGORY QUERY: SELECT wp\_term\_taxonomy.count as 'count', wp\_terms.term\_id, wp\_terms.name, wp\_terms.slug, wp\_term\_taxonomy.parent, wp\_term\_taxonomy.description FROM wp\_terms, wp\_term_taxonomy WHERE &#8230; 

Go to the page in question (sorry, I won't link it) and you don't see "percona" anywhere on it. View the source and you do. It's WordPress debugging output.

I'm glad to see the anecdotal evidence of more and more active use of the [Percona server builds][1], but at the same time, it's kind of like finding out that your best friend made it onto the Jerry Springer Show. Sometimes I think WordPress makes things too easy for novices.

 [1]: http://www.percona.com/percona-lab.html
