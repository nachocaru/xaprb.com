---
title: "Determining the USL's coefficient of performance, part 2"
date: "2013-01-03"
url: /blog/2013/01/03/determining-the-usls-coefficient-of-performance-part-2/
categories:
  - Databases
  - Performance
  - Scalability
---
[Last time][1] I said that the USL has a forgotten third coefficient, the coefficient of performance. This is the same thing as the system's throughput at concurrency=1, or C(1). How do you determine this coefficient? There are at least three ways.

Neil Gunther's writings, or at least those that I've read and remember, say that you should set it equal to your measurement of C(1). Most of his writing discusses a handful of measurements of the system: one at concurrency 1, and at least 4 to 6 at higher concurrencies. I can't remember a time when he's discussed taking more than one measurement of throughput at each level of concurrency, so I think the assumption is that you're going to take a single measurement at various concurrencies (or, in the case of hardware scalability, units of hardware), and you're done.

This tends to work quite well. I've blogged before about this: well-designed systems, measured in a carefully controlled test, tend to match the Universal Scalability Law model quite well. Here are [two][2] [examples][3]. 
Most systems I model aren't like that. I don't do my modeling in a lab. I get thousands, if not tens or hundreds of thousands, of measurements of throughput and concurrency from a MySQL server's real production traffic. How do you determine the system's throughput at concurrency=1 in this kind of situation? You may have hundreds or thousands of samples at or near concurrency=1, and here's the interesting thing: they aren't tightly clustered. This leads to the two additional techniques I've used.

Method 2 is fairly obvious: you can take an aggregate measure of the throughput at N=1. You can simply average, or you can use the median. In my experience, the latter tends to be a little more accurate, because the median essentially discards outliers. Given enough samples, it is very likely that the median is truly representative of the system's real behavior.

Finally, method 3 is to treat C(1) as one of the parameters to fit in the regression to the USL model. Instead of holding it as a fixed quantity, go ahead and let the regression find the best fit for it along with the other coefficients.

In practice, I tend to combine methods 2 and 3. I use method 2 to find a starting point for the coefficient, and then I let the regression tweak it as needed. In my experience, this usually produces good results. Sometimes the software doing the regression gets a little confused, or stuck at a local maximum, but otherwise it works well.

What if you don't have measurements at N=1? The best approach, in my experience, is to take the slope of the line from the first data point you have, and use that. N=1 will almost always be higher than this, because real systems are rarely linearly scalable. That's okay. If you let the regression adjust the coefficient as needed for the best fit, you'll end up with a good answer anyway.

 [1]: http://www.xaprb.com/blog/2013/01/02/determining-the-universal-scalability-laws-coefficient-of-performance/ "Determining the Universal Scalability Law’s coefficient of performance"
 [2]: http://www.mysqlperformanceblog.com/2011/01/26/modeling-innodb-scalability-on-multi-core-servers/
 [3]: http://www.mysqlperformanceblog.com/2011/02/28/is-voltdb-really-as-scalable-as-they-claim/
