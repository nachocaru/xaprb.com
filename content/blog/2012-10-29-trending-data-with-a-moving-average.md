---
title: Trending data with a moving average
date: "2012-10-29"
permalink: /blog/2012/10/29/trending-data-with-a-moving-average/
categories:
  - Databases
---
In my recent talk at Surge and Percona Live about adaptive fault detection ([slides][1]), I claimed that hardcoded thresholds for alerting about error conditions are usually best to avoid in favor of dynamic or adaptive thresholds. (I actually went much further than that and said that it's possible to detect faults with great confidence in many systems like MySQL, without setting any thresholds at all.)

In this post I want to explain a little more about the moving averages I used for determining "normal" behavior in the examples I gave. There are two obvious candidates for moving averages: straightforward moving averages and exponentially weighted moving averages.

A straightforward moving average just computes the average (mean) over the last N samples of data. In my case, I used 60 samples. This requires keeping an array of the previous N samples and updating the average for every sample.

An exponential moving average doesn't require keeping samples. The average is a single number and you have a so-called "smoothing factor" &alpha;. For every new sample, you multiply the old average by 1-&alpha; and then add it to the new sample times &alpha;: `avg := (1-alpha)*avg + alpha*sample`.

Both techniques have their drawbacks. Both require a warm-up period, for example. Obviously, in the case of a 60-sample moving window, you require 60 samples before you can begin. The exponential moving average can be primed from the mean of the first 10 samples, in my experience. Both techniques also lag the trend in the samples to some extent. When there's a dramatic change in the pattern, they take a while to "catch up."

Here's a plot of some real data and the two techniques. Click through to see a larger image. The blue line is the sampled data, the red line is an exponential moving average with an average 60-second "memory," and the yellow line is a 60-second moving average.

[<img src="http://www.xaprb.com/media/2012/10/moving-averages-300x60.png" alt="" title="moving-averages" width="300" height="60" class="aligncenter size-medium wp-image-2927" />][2] 
Notice how the red line tends to course-correct more quickly and stay more true to the current behavior of the blue line. This is one advantage of the exponential moving average -- if that is what you desire.

It isn't obvious in this data, but the simple moving average has another disadvantage. Suppose there is a spike of very high values in the sampled data for a few seconds. For the next 60 seconds, this spike is going to be within the window, inflating the moving average. When it is discarded from the window, it causes the moving average to drop suddenly. I have found this to be problematic in several cases. It's especially obvious when you're calculating the standard deviation of the samples (or other sensitive statistics) over the moving window.

The exponential moving average doesn't have that problem because that spike never moves "out of the window." Its influence is there forever -- but as time passes, it gradually becomes smaller, in a smooth fashion. So you don't get abrupt spikes in the current average based on what happened 60 seconds ago.

This is just scratching the surface of the techniques I've explored on a large set of days to weeks of data from tens of thousands of real servers. As I get time, I'll try to write more about it in the future.

 [1]: http://www.xaprb.com/blog/2012/10/02/adaptive-fault-detection-in-mysql-servers/
 [2]: http://www.xaprb.com/media/2012/10/moving-averages.png
