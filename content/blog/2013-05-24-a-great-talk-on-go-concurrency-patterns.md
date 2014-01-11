---
title: A great talk on Go concurrency patterns
permalink: /2013/05/24/a-great-talk-on-go-concurrency-patterns/
categories:
  - Conferences
  - Go
  - SQL
---
This [35-minute video][1] from the recent Google I/O conference explains how to use Go's concurrency primitives &#8212; goroutines, channels, and the `select` statement &#8212; to do things elegantly, correctly, and safely in a few lines of Go, which would otherwise turn your brain into a pretzel in most programming languages.

My favorite thing about Go is that a good Go program looks self-evident and obvious, even when it may be doing things that would be insanely complex in another language. Callbacks, closures, mutexes, and so on just disappear, and the program itself emerges, looking completely unimpressive. In many cases I think "what's the big deal about that?" until I realize how hard it would be to write in Java, or Perl, or so on. A lot of the code in Percona Toolkit, for example, involved "[pipelines][2]" of callbacks passing data along to other callbacks for further processing. These were hard to reason about, hard to make resilient to errors and allow clean termination, and were redesigned several times, never very successfully in my opinion. In Go, channels make those kinds of tasks so simple. Such a program in Go looks suspiciously like a Unix | pipe | and | filter | program. If you think about it, the Unix shell itself is a great example of using "channels" successfully to trivialize what would otherwise be a migraine-inducing task.

 [1]: https://developers.google.com/events/io/sessions/332768653
 [2]: http://bazaar.launchpad.net/~percona-toolkit-dev/percona-toolkit/2.1/view/head:/bin/pt-query-digest#L11835
