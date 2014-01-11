---
title: "Determining the Universal Scalability Law's coefficient of performance"
permalink: >
categories:
---
If you're familiar with Neil Gunther's Universal Scalability Law, you may have heard it said that there are two coefficients, variously called alpha and beta or sigma and kappa. There are actually three coefficients, though. See?

<img src="http://www.xaprb.com/blog/wp-content/uploads/2013/01/usl.png" alt="usl" width="637" height="188" class="aligncenter size-full wp-image-3000" />

No, you don't see it &#8212; but it's actually there, as a hidden "1&#8243; multiplied by N in the numerator on the right-hand side. When you're using the USL to model a system's scalability, you need to use the C(1), the "capacity at one," as a multiplier. I call this the coefficient of performance. It's rarely 1; it's usually thousands.

To illustrate why this matters, consider two systems' throughput as load increases:

<img src="http://www.xaprb.com/blog/wp-content/uploads/2013/01/coeff-of-performance.png" alt="coeff-of-performance" width="489" height="486" class="aligncenter size-full wp-image-3001" />

The green line and the blue line are both linearly scalable systems. Add twice the concurrency, get twice the throughput. But the slope of the lines is different. The green system can do three times as much work as the blue system, even though it's no more scalable.

To model the USL, you need to determine C(1) by measuring the system under test. In my experience with real systems running in production, mostly MySQL servers, this is not simple. You can't just say "let's quiet the web app down, I want to load it with exactly one user for a few minutes and measure how fast it runs." Instead, you get a bunch of samples from production traffic, and you derive the throughput at concurrency=1 from that.

The result goes into the numerator as a multiplier of N, although it's usually omitted when the USL formula is shown.
