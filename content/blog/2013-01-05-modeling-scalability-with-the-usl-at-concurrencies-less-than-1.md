---
title: Modeling scalability with the USL at concurrencies less than 1
date: "2013-01-05"
permalink: /blog/2013/01/05/modeling-scalability-with-the-usl-at-concurrencies-less-than-1/
categories:
  - Databases
  - Performance
---
[Last time][1] I said that you can set a starting value for the USL's coefficient of performance and let your modeling software (R, gnuplot, etc) manipulate this as part of the regression to find the best fit. However, there is a subtlety in the USL model that you need to be aware of. Here is a picture of the low-end of the curve:

<img src="http://www.xaprb.com/media/2013/01/usl1.png" alt="usl" width="490" height="486" class="aligncenter size-full wp-image-3008" />

The graph shows the USL model as the blue curve and linear scalability as the black line. Notice that at concurrencies less than 1, the value of the USL function is actually greater than the linear scalability function. This deserves some thought and explanation, because it can cause problems.

If you think about it, concurrency between one and zero is impossible. In fact, concurrency is not a smooth function, it is a step function. There can be zero requests resident in the system, one request, two requests, and so on -- but not 0.7 requests or 3.14159 requests. However, the USL is defined in terms of a continuous function, not a step function.

The trouble with the MySQL systems I usually model is that I generally observe them in the wild, which means that I get a large number of samples of throughput-and-concurrency, and I aggregate them. For example, I'll usually observe concurrency once per second, and average these samples over a minute or more for each point I want to feed into the USL model. This approach generates concurrency values that are real numbers, not just integers -- so it's entirely possible that during a given minute, the "average concurrency" on the system comes out to 0.7 or 3.14159. What's to be done with this?

In the perfect world, I'd like to delete "empty space" during which zero queries were executing, and determine the actual throughput at each integral value of concurrency. But it's a lot less convenient to do this, at best; and it's usually impractical or impossible. So I work with the data I have. In practice I find it's good enough.

Back to the funny anomaly where the USL predicts better-than-linear scalability between concurrency=0 and =1. The outcome is that the regression to the USL model can potentially skew the values of the USL coefficients, if you have any samples that lie between 0 and 1. Thus, it may be a good idea to discard these samples. This should not be a significant portion of your sample dataset anyway. If you don't have a lot of samples at higher concurrencies, you probably don't have enough data to model the system accurately, and you should act accordingly.

 [1]: http://www.xaprb.com/blog/2013/01/03/determining-the-usls-coefficient-of-performance-part-2/ "Determining the USL’s coefficient of performance, part 2"
