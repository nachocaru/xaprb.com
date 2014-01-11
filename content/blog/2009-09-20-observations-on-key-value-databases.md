---
title: Observations on key-value databases
author: Baron Schwartz
layout: post
permalink: /2009/09/20/observations-on-key-value-databases/
categories:
  - SQL
tags:
  - cassandra
  - distributed
  - key value
  - Keyspace
  - memcached
  - NoSQL
  - redis
  - replication
  - synchronous
  - Tokyo Cabinet
  - Tokyo Tyrant
---
Key-value databases are catching fire these days. Memcached, Redis, Cassandra, Keyspace, Tokyo Tyrant, and a handful of others are surging in popularity, judging by the contents of my feed reader.

I find a number of things interesting about these tools.

*   There are many more of them than open-source traditional relational databases. (edit: I mean that there are many options that all seem similar to each other, instead of 3 or 4 standing out as the giants.)
*   It seems that a lot of people are simultaneously inventing solutions to their problems in private without being aware of each other, then open-sourcing the results. That points to a sudden sea change in architectures. Tipping points tend to be abrupt, which would explain isolated redundant development.
*   Many of the products are feature-rich with things programmers need: diverse language bindings, APIs, embeddability, and the ability to speak familiar protocols such as memcached protocol.
*   I think there are more solutions here than the ecosystem will support, and in five years a few will stand out as the most popular.
*   This process of paring down the gene pool is win-win because they're open-source, and nothing will be lost.
*   Choosing which one to use is no easy task even for a highly skilled, technical, up-to-date person. Perhaps the decision-makers will choose on the availability of commercial support and consulting.
*   Many of them offer built-in, dead-simple, distributed, synchronous replication. This is very difficult to achieve with traditional relational databases. What makes key-value databases different? They don't have MVCC, for one thing; but I'm not sure of the complete answer to that question, to tell the truth.

We live in interesting times.
