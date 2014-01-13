---
title: "A close look at New Relic's scalability chart"
date: "2013-01-07"
permalink: /blog/2013/01/07/a-close-look-at-new-relics-scalability-chart/
categories:
  - Databases
  - Performance
---

I've written a lot about modeling MySQL with the USL, and I like it best of all the scalability models I've seen, but it's not the only way to think about scalability. I was aware that New Relic supports a scalability chart, so I decided to take a peek at that. Here's a screenshot of the chart, from [their blog][1]: <p style="text-align: center;">

  <img class="aligncenter  wp-image-3012" alt="blog-rpm-response1" src="http://www.xaprb.com/blog/wp-content/uploads/2013/01/blog-rpm-response1.png" width="510" height="295" />

</p>



Here's how it works. It plots response time (or database time, or CPU) as the dependent variable, versus throughput as the independent variable. There's a line through it to indicate the general shape. Samples are charted as points in a scatter plot. The points are color-coded by the time of day. Outliers are automatically removed. 

The focus on response time is really good. That's one of the things I like about New Relic. While most systems show people status counters, and imply that they have some deep insight and meaningfulness (there's usually no meaning to be found in status counters!), New Relic is educating people about the importance of response time, or latency. 

But as I read through the blog posts about this chart, it struck me that there's something a little odd about it. The problem, I realized, is that it plots throughput as the independent variable on the chart. But throughput isn't an independent variable. Throughput is the system's output under load, and depends on a) the load on the system, b) the system's scalability. It's a *dependent* variable. 

In a chart like this, it would be even better to show the independent variable as the variable that one can really control: the concurrency or load on the system. By "load" I mean the usual definition: the amount of work waiting to be completed, i.e. the backlog; this is what a Unix load average measures. 

To explain a little more what I mean about throughput being dependent, not independent, here are a few ways to think about it: 


*   An independent variable should range from zero to infinity (negative numbers are unphysical in a situation like this, so we exclude that). Throughput has a very finite theoretical and practical upper bound, but concurrency can theoretically go to infinity as work arrives and doesn't complete.

*   An independent variable is the variable *you can control as an input parameter of a system under test*. It's dead-easy to achieve the desired concurrency for a benchmark or other test. It's *amazingly* difficult to manufacture a desired throughput for a benchmark, even in "easy" conditions. Computers are unruly beasts -- they are queueing systems, and random variations and dependencies cause throughput to fluctuate greatly. That's because throughput is measured at the *output* end of the system, after the queues inside the system have had their way with the input and introduced statistical fluctuations into it. It's quite easy to generate a desired *arrival rate* for a system under test, provided that you have an unbounded number of workers ready to keep submitting more requests as the system queues up and stalls existing workers, but arrivals are not the same as throughput :-) Any way you look at it, you can pick your concurrency and your arrival rate, but you really can't pick your throughput reliably. Throughput is an effect, not a cause.

*   An independent variable in a function must map to one and only one value of the dependent variable. But we know that as load increases, a system's throughput rises, peaks, and then falls again as retrograde scalability manifests itself. Suppose a system's throughput goes from 10,000 queries per second at 16 threads, to 20,000 at 32 threads, and back to 10,000 at 64 threads. Now if we flip the chart's axes around and treat throughput as an input, we'll find that a throughput of 10,000 queries per second would map to either 16 or 64 threads. That doesn't describe a real function.

So although the New Relic scalability chart shows some of the *effects* of the system's scalability, and it's great to visualize the variation in response time as throughput varies, it doesn't strike me as quite the right angle of approach. 

I'm curious to hear from people who may have used this feature. What did you use it for? Were you successful in gaining insight into scalability bottlenecks? How did it help you?



 [1]: http://blog.newrelic.com/2011/06/13/of-rainbows-and-polka-dots-new-relics-scalability-charts-explained/

