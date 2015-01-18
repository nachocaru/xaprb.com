---
title: Have you tested pt-online-schema-change?
date: "2012-05-22"
url: /blog/2012/05/22/have-you-tested-pt-online-schema-change/
categories:
  - Databases
---
I've been seeing a lot of interest in pt-online-schema-change (nonblocking MySQL schema changes), with a lively discussion on the mailing list (which I think I'm not keeping up with...) and a couple of bug reports filed. I'm really interested whether people have tested it rigorously to ensure that it maintains your data integrity. I have done so, and there is a set of tests for it in the codebase, but nothing replaces real-world testing. If you find any problems or have questions, please address them to the [percona-discussion Google Group][1].

 [1]: https://groups.google.com/forum/?fromgroups#!forum/percona-discussion
