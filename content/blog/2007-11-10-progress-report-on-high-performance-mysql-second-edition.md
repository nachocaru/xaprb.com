---
title: Progress report on High Performance MySQL, Second Edition
author: Baron Schwartz
excerpt: "<p>It's been a while since I've written about progress on the book.  I actually stopped working on it as much at the beginning of the month, because on October 31(st) I managed to finish a first draft of the last big chapter!  Now I'm back to full-time work at my employer, and I'm working on the book in the evenings and weekends only.  Read on for details of what I've been working on and what's next in the pipeline.</p>"
layout: post
permalink: /2007/11/10/progress-report-on-high-performance-mysql-second-edition/
description:
  - 'Status report on High Performance MySQL, Second Edition: Security, benchmarks, profiling, tuning, server status, indexing, query optimization, schema optimization'
tags:
  - benchmarks
  - High Availability
  - High Performance MySQL
  - indexing
  - MySQL
  - optimization
  - Peter Zaitsev
  - privileges
  - profiling
  - query optimization
  - scaling
  - schema optimization
  - security
  - server status
  - SQL
  - tuning
---
It's been a while since I've written about progress on the book. I actually stopped working on it as much at the beginning of the month, because on October 31st I managed to finish a first draft of the last big chapter (Scaling and High Availability)! Now I'm back to full-time work at my employer, and I'm working on the book in the evenings and weekends only.

This doesn't mean the book is close to being done, though. The editor is sending out some chapters for technical review, and there's still a lot more writing and revising to be done.

Last weekend I revised the Security chapter from the first edition, which I think will be the only chapter that we'll just revise and update, rather than completely rewriting (well, maybe the Architecture chapter could be considered a revision instead of a rewrite, but it's a stretch; we changed it a lot). I removed a lot of the material that repeated the MySQL manual, and added a lot of information and best practices on grants, new privileges and objects in MySQL 5, common tasks, common mistakes, and so on. The chapter ended up being nearly as long, even though I stripped out all the code listings and so on from the first edition (in fact, I reduced the first edition's material to a few paragraphs).

Beyond that, though, there are little details to finish out in many of the chapters. Examples that need to be finished, figures that need to be re-drawn, material that doesn't quite fit and needs to be re-arranged or even moved to another chapter; it's a lot of work. Peter Zaitsev has been reviewing some of the core chapters on query and schema optimization etc, and I'm revising them in response to his comments. That's what I spent today doing.

I think the biggest chunks of work that remain are going to be making chapters 3, 4, 5, 6 and 7 (benchmarking, profiling, schema, indexing, query optimization, advanced features, and server tuning) flow together well. The challenge here is how to organize the vast amount of material so it reads well, without too many forward references, and still be useful as a reference work. The detail we've gone into is incredible. It makes it very hard to find the single best place to mention each little bit of wisdom, because all of this material is completely inter-related. It's tough to flatten the graph of knowledge into a one-dimensional narrative.

It's not just these chapters that have a lot of inter-related material, of course. It's hard to talk about tuning the server settings (chapter 7) without bringing the OS and hardware (chapter 8) into it, and whenever you do this you also need to think about measuring and monitoring status information (chapter 14). Of course, you need to do that for benchmarking and profiling, too (chapter 3). I'm sure you see the dilemma!

The good news is, if we succeed in doing this well, you will find the book enormously useful. Stay tuned!
