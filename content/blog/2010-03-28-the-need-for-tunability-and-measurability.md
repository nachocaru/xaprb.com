---
title: The need for tunability and measurability
date: "2010-03-28"
permalink: /2010/03/28/the-need-for-tunability-and-measurability/
categories:
  - PostgreSQL
  - SQL
---
To program is human, to instrument is divine. Complex systems that will support a heavy workload will eventually have to be tuned for it. There are two prerequisites for tuning: tunability, and measurability.

Tunability generally means configuration settings. Adding configuration settings is a sign of a humble and wise programmer. It means that the programmer acknowledges "I don't understand how this system will be used, what environment it will run in, or even what my code really does." Sometimes things are hard-coded. InnoDB is notorious for this, although don't take that to mean that I think Heikki Tuuri isn't humble and wise &#8212; nobody's perfect. Sometimes programmers set out to create systems that are self-tuning. I'm not aware of any success stories I can point to in this regard, but I can point to plenty of failures. Perhaps I can't think of any successes because I don't need to.

Measurability (instrumentation) is the next sign of a wise and humble programmer. If your system must be tuned, then it needs to be measured to enable wise decisions. There are at least two important kinds of metrics &#8212; a subject for another blog post. Most large systems I've worked with (primarily database systems, but operating systems too) are seriously lacking in measurability. A programmer who makes the system measurable acknowledges "I might be wrong, and if I am, it's a good thing to enable people to prove it," and realizes that "you cannot improve what you cannot measure."

Complex, high-load systems get micro-optimized, making them even more opaque. By the time an I/O operation in InnoDB reaches the disk, it's often impossible to blame it on a specific query. Not just because of lack of instrumentation &#8212; even with perfect instrumentation, I/O operations wouldn't be assignable one-to-one with user actions. Optimization does that, because a lot of optimizations are about deferring, anticipating, or combining work. That makes instrumentation even more important.

This weekend, I heard conflicting stories about instrumentation in Postgres. Someone claimed to have offered patches with a detailed set of instrumentation (I'd also heard this story from someone else at the same company, six months ago in a different place). He told me that the maintainers had declined it on the basis of the added overhead. Someone else told me that no such offer had been made, at least not in public where the decision could be taken to the mailing lists. I don't know what's true. I do know that stock Postgres is virtually un-instrumented in ways that matter a lot. The same can be said of MySQL, although interestingly the Venn diagram of the ways these two projects are instrumented doesn't overlap all that much.

The performance and maintenance cost of adding instrumentation to an application pales in comparison to the benefits. There's a famous quote from Oracle guru Tom Kyte, who when asked about the cost of Oracle's performance instrumentation, estimated it at negative ten percent. That is, without the ability to measure Oracle and thus improve it, it'd be at least ten percent slower. I think ten percent is a modest estimate for most systems I work with.
