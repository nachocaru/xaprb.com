---
title: Detecting MySQL server problems automatically
date: "2012-09-06"
url: /blog/2012/09/06/detecting-mysql-server-problems-automatically/
categories:
  - Databases
---
I [previously blogged about][1] work I was doing on automatically finding problems in a MySQL server, with no hardcoded thresholds or predetermined indicators of what is "bad behavior." I had to pause my studies on that for a while, due to time constraints. I've recently been able to resume and I'm happy to report that I'm making good progress.

One of the things I've done is a survey of existing literature on this subject. It turns out that the abnormality-detection techniques I've developed over the years are well-known in the operations research field. I reinvented some classic techniques used in Statistical Process Control (SPC). These include [Shewhart Control Charts][2], [exponentially weighted moving averages][3], and [Holt-Winters forecasting][4]. However, I was never satisfied with these approaches. They are simultaneously overly simplistic and too sensitive, so they produce false positives and false negatives when applied to MySQL status metrics. I suspect the same thing would happen in most server systems.

Given that the existing techniques I've found are inadequate, I've developed several more that satisfy me. I am currently testing them on a wide variety of real-world data to fine-tune them.

I can't claim to understand fully what I'm doing, although I think I grasp it intuitively. When I read what expert researchers have written on some of the simpler methods I decided aren't good enough, the math quickly overwhelms me, so I imagine that I am working with much more complex math in my new algorithms. (I also assume that my new algorithms are also reinvented wheels, and I will probably find out what they're really called at some future date.)

I'll present some of my work at [Percona Live][5] in a few weeks.

 [1]: http://www.xaprb.com/blog/2011/12/06/an-opportunity-to-participate-in-mysql-research/ "An opportunity to participate in MySQL research"
 [2]: http://en.wikipedia.org/wiki/Control_chart
 [3]: http://en.wikipedia.org/wiki/Exponential_smoothing
 [4]: http://www.sciencedirect.com/science/article/pii/S0169207003001134
 [5]: http://www.percona.com/live/nyc-2012/sessions/automated-mysql-fault-detection
