---
title: "A growing trend: InnoDB mutex contention"
permalink: /2010/03/04/a-growing-trend-innodb-mutex-contention/
categories:
  - SQL
tags:
  - Concurrency
  - gdb
  - InnoDB
  - Mutex
---
I've been noticing an undeniable trend in my consulting engagements in the last year or so, and when I vocalized this today, heads nodded all around me. Everyone sees a growth in the number of cases where otherwise well-optimized systems are artificially limited by InnoDB contention problems.

A year ago, I simply wasn't seeing the need for analysis of GDB backtraces en masse. These days, I'm writing custom tools to gather and analyze backtraces. A year ago, I simply looked at the SEMAPHORE section of SHOW INNODB STATUS. These days I'm writing custom tools to aggregate and reformat that data so I can interpret it more easily. And I'm actually seeing cases of this type of problem multiple times every week. I remember the first time I ran into a server that was literally optimized to the limit, but struggling under the load. It was something new for me, not that long ago. Oh, I'd seen it before, plenty, but was always able to point out where something could be improved without changing InnoDB itself. Now it's commonplace: schemas are fine &#8212; check. Queries are all well-indexed &#8212; check. Everything else &#8212; check. InnoDB is bottlenecked and absolutely nothing can be improved &#8212; check.

Part of the difference is the rapidly improving hardware. It's getting hard to buy a server with fewer than 8 or even 16 cores, and 16GB of RAM feels like something I'd install in a wristwatch. But I also suspect that if I'd been characterizing the workload of servers over time in a way that was easy to compare, I'd see a clear trend towards bigger data and more queries per second. We're just pushing MySQL + InnoDB harder today than we ever have before.

What can be done? Well, InnoDB needs to be improved, that's all. Oracle, Percona, Google, Facebook and others are working on it, and in many cases these efforts have yielded dramatic results. But there is still much room for improvement.
