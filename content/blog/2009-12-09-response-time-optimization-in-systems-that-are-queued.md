---
title: Response-time optimization in systems that are queued
date: "2009-12-09"
permalink: /2009/12/09/response-time-optimization-in-systems-that-are-queued/
categories:
  - Databases
---
The best overall method of performance optimization is optimization for response time. Users care about response time, not load average or cache hit ratios. The job of a system is to accept some request and do the required work, and deliver a result. The time elapsed between the request and the result is the response time.

### Methods of Response Time Optimization

Not all optimization methods are created equal. Here are a few I see commonly.

*   **No method**. Most people simply have no method of performance optimization at all. They just look for things that look "bad" and try to make them look "better." In the MySQL database world, the classic example is trying to improve a cache hit ratio. This is utter folly, and doesn't become any less stupid no matter how many times it is taught and repeated.
*   **Server Load Reduction**. One step up from that is to try to understand what work the database is performing and discover what part of that work consumes the most response time, then improve that to lower the load on the database server. This is better, but still not a logical way to optimize response time for the end user. Imagine that you've built your scaling strategy around archiving and purging unnecessary data -- a very sensible strategy. Most well-designed archiving and purging jobs are terribly inefficient, for a reason: they are designed to consume resources that are not needed by anything else, so they don't interfere with anything else. Archiving a billion rows from a table is best done in nibbles, not in billion-row chunks. The nibbles are going to be slow. If you measure the entire system and find out where the response time goes, you're almost guaranteed to find these jobs are a top offender. And yet they don't matter at all, because they have no impact on the user's response time. Server load reduction is a shotgun approach that sometimes yields results, because it's easy to aim a shotgun.
*   **Method R, or Goal-Driven Performance Optimization**. Two methods I know of that are based in sound thinking are Cary Millsap's Method R and Peter Zaitsev's Goal-Driven Performance Optimization. Cary wrote [an excellent book about his method][1], and I recommend buying that book and reading it at least twice. These methods are guaranteed to truly optimize the system in question: they will produce the best possible performance improvements with the least possible cost, and they have a termination condition that is satisfied when further improvements are either not possible or cost more than they are worth. A system that has been subjected to one of these methods can be confidently called "fully optimized."

### Response time in queued systems

Method R looks at where a system consumes time and sorts the biggest consumers to the top in a profile, then works on those first. [Amdahl's Law][2] guarantees that this is the best way to improve the system's performance.

Although the approach is correct, it doesn't mean it's easy. It might be easy if a system is stable. But unstable systems, those suffering from [queueing delay][3] (usually characterized by response time with a high standard deviation, a.k.a. "spikes" or "blips"), are much harder to optimize. The queries that are performing badly can no longer be assumed to be the source of the performance problem. Instead, they might be "good" queries that are the victim of something else happening.

Unstable systems suffer from a) dependencies between requests, and b) statistical variations in request arrival time, which causes queueing. The classic case is lock contention. Suppose someone goes to your OLTP database and runs an ad-hoc query against the table of invoice line items, and locks the table. Normally that table has specific, fast, well-indexed queries against it, but as soon as the ad-hoc query locks it, the queries instantly pile up and "look bad." The system becomes an unstable train wreck. Alas, database servers such as MySQL typically don't give the DBA enough information to blame the problem on a source.

Internal contention inside the database software itself is another potential cause of queueing. I can no longer remember the number of times I've disabled the query cache in MySQL and solved a system's random freezes. Typically, the only way to prove that the query cache mutex is the source of the problem is to take a backtrace in GDB. A complex piece of software without good instrumentation is pretty difficult to troubleshoot in conditions like this.

And that brings me back to Method R. I can see that the queries are suffering from unstable performance, but I cannot see directly how to optimize the system because it is un-instrumented. Unfortunately, falling back to system load optimization is often the best that can be done, in terms of maximum optimization with minimal cost. An expert can do this with as much rigor as possible, and hopefully with good knowledge of the system's internals can find the source of the problem quickly, but it's still a much harder problem.

And this is why it is a crime to write un-instrumented software: because when an un-instrumented system starts to get overloaded, it is very hard to determine the source of performance problems.

 [1]: http://www.xaprb.com/blog/2009/11/07/a-review-of-optimizing-oracle-performance-by-cary-millsap/
 [2]: http://en.wikipedia.org/wiki/Amdahl%27s_law
 [3]: http://en.wikipedia.org/wiki/Queueing_theory
