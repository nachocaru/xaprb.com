---
title: Seeking input on a badness score for query execution
date: "2009-06-26"
permalink: /2009/06/26/seeking-input-on-a-badness-score-for-query-execution/
categories:
  - Databases
  - Open Source
---
Suppose that you're writing a new Maatkit tool ([just a random example, really][1]) and its job is to measure the difference in execution of queries. The simplest metric is execution time.

Now suppose that you're trying to figure out a metric of badness. The query executes in a second on machine 1 and 1000 seconds on machine 2.  That's a pretty bad change.  How do you quantify this?

Now you've got a query that executes in 1ms on machine 1, and 10ms on machine 2.  It's a tenfold change.  Is it a bad change?  Maybe it's just the difference in which files were cached in memory, or network latency because someone flooded the TCP pipe and the packets had to be backed off and retried, or something like that.  Is this significant?  How should it contribute to the badness score?

Let's think of another example too.  Later in this mythical tool's life, we'll be examining EXPLAIN and looking at row estimates.  There are important differences between estimates of 1 row, 2 rows, 20 rows and 2000 rows.  But from 2 to 3 rows, or from 100 to 125 rows &#8212; is that a significant change? How should it contribute to the badness score?  What about this: a full table scan vs. an index scan, how should that contribute?

The general problem that I'm gesturing at here is a kind of generic badness score, which can be an accumulation of lots (dozens) of factors.  From my thinking on it so far, it's a very complex problem, because you want to avoid false positives, you want to really capture a badness score in a way that's quantifiable and sortable (this query is badder than that one, all things considered) and you don't want to miss small things in the noise (these queries are the same in 23 of the 24 metrics, and that 24th metric is enough to trigger the alarm).

The other thing that's worked its way into my small brain is this: it's got to be a solved problem (unless it's really intractable).  But I can't think of the right combination of things to point me to the right Computer Science literature.

Help?

 [1]: http://code.google.com/p/maatkit/wiki/mk_upgrade
