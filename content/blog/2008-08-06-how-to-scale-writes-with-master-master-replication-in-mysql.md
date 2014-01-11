---
title: How to scale writes with master-master replication in MySQL
author: Baron Schwartz
layout: post
permalink: /2008/08/06/how-to-scale-writes-with-master-master-replication-in-mysql/
description:
  - >
    Explains how a circular MySQL replication cluster can increase your write
    capacity.
categories:
  - SQL
tags:
  - High Availability
  - MySQL
  - replication
  - scaling
---
This post is SEO bait for people trying to scale MySQL's write capacity by writing to both servers in master-master replication. The short answer: you can't do it. It's impossible.

I keep hearing this line of reasoning: "if I make a MySQL replication 'cluster' and move half the writes to machine A and half of them to machine B, I can increase my overall write capacity." It's a fallacy. All writes are repeated on both machines: the writes you do on machine A are repeated via replication on machine B, and vice versa. You don't shield either machine from any of the load.

In addition, doing this introduces a very dangerous side effect: in case of a problem, neither machine has the authoritative data. Neither machine's data can be trusted, but neither machine's data can be discarded either. This is a very difficult situation to recover from. Save yourself grief, work, and money. **Never write to both masters**.
