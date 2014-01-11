---
title: Subtleties in the Universal Scalability Law
author: Baron Schwartz
layout: post
permalink: /2011/04/16/subtleties-in-the-universal-scalability-law/
categories:
  - Scalability
tags:
  - Neil J. Gunther
---
Those of you who've been following my recent work on modeling system scalability might be interested in this. (It's not my work, by the way. I'm just trying to ski in the wake of [Neil Gunther][1].)

I've measured quite a few systems that have some strange bubbles in the scalability curve. As I explained in [my talk on Thursday][2], systems don't always follow the model precisely, because of their internal architecture. Systems sometimes behave differently at specific points because, say, an internal structure gets filled up and allocates a larger array to hold more of whatever it is, or CPU scheduling changes to balance threads across cores differently, or any of a number of other possibilities that are sometimes hard to understand or predict. Yes, this is hand-waving. But although it could sometimes take a lot of work to explain these kinds of things, it's easy to observe and measure them in action, so the phenomenon is clearly real. VoltDB, for example, does not follow the scalability curve at 1 and 2 nodes in the cluster because 1 and 2 nodes are magic numbers. In computer science we usually say that there are three types of numbers: 0, 1, and many. Turns out it's a little different for VoltDB.

So, for those of you who are curious about this, I now stop blathering and simply [direct you to Neil Gunther's blog to read more][3].

 [1]: http://www.perfdynamics.com/
 [2]: http://en.oreilly.com/mysql2011/public/schedule/detail/17153
 [3]: http://perfdynamics.blogspot.com/2011/02/usl-fine-point-sub-amdahl-scalability.html
