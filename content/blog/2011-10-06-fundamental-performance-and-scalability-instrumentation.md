---
title: Fundamental performance and scalability instrumentation
date: "2011-10-06"
permalink: /2011/10/06/fundamental-performance-and-scalability-instrumentation/
categories:
  - Conferences
  - PostgreSQL
  - Scalability
---
This post is a followup to some promises I made at Postgres Open.

Instrumentation can be a lot of work to add to a server, and it can add overhead to the server too. The bits of instrumentation I'll advocate in this post are few and trivial, but disproportionately powerful.

If all server software shipped with these metrics as the basic starting point, it would change the world forever:

1.  Time elapsed, in high resolution (preferably microseconds; milliseconds is okay; one-second is mostly useless). When I ask for this counter, it simply tells me either the time of day, or the server's uptime, or something like that. It can be used to determine the boundaries of an observation interval, defined by two measurements. It needs to be consistent with the other metrics that I'll explain next.
2.  The number of queries (statements) that have completed.
3.  The current number of queries being executed.
4.  The total execution time of all queries, including the in-progress time of currently executing queries, in high resolution. That is, if two queries executed with 1 second of response time each, the result is 2 seconds, no matter whether the queries executed concurrently or serially. If one query started executing .5 seconds ago and is still executing, it should contribute .5 second to the counter.
5.  The server's total busy time, in high resolution. This is different from the previous point in that it only shows the portion of the observation interval during which queries were executing, regardless of whether they were concurrent or not. If two queries with 1-second response time executed serially, the counter is 2. If they executed concurrently, the counter is something less than 2, because the overlapping time isn't double-counted.

In practice, these can be maintained as follows, in pseudo-code:

    
    global timestamp;
    global concurrency;
    global busytime;
    global totaltime;
    global queries;
    
    function run_query() {
      local now = time();
      if ( concurrency ) {
        busytime += now - timestamp;
        totaltime += (now - timestamp) * concurrency;
      }
      concurrency++;
      timestamp = now;
    
      // Execute the query, and when it completes...
    
      now = time();
      busytime += now - timestamp;
      totaltime += (now - timestamp) * concurrency;
      concurrency--;
      timestamp = now;
      queries++;
    }
    

I may have missed something there; I'm writing this off the cuff. If I've messed up, let me know and I'll fix it. In any case, these metrics can be used to derive all sorts of powerful things through applications of Little's Law and queueing theory, as well as providing the inputs to the Universal Scalability Law. They should be reported by simply reading from the variables marked as "global" above, to provide a consistent view of the metrics.
