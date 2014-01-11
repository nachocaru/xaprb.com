---
title: Is 100% uptime really possible?
date: "2012-07-03"
permalink: /2012/07/03/is-100-uptime-really-possible/
categories:
  - Databases
---
This post isn't about NuoDB, although it was prompted by the phrase "100% uptime" that I've seen them use a few times. I want to suggest that people think slightly differently about uptime and availability.

The key to understanding uptime and thinking clearly about it, in my opinion, is to think instead about downtime. Uptime is the absence of downtime. Therefore, focus your attention on reducing downtime through a two-pronged approach. First, increase the mean time between failures (MTBF). Second, reduce the mean time to recovery (MTTR) when downtime happens. The techniques for achieving these goals are quite different; the second tends to be a technical solution, whereas the first usually requires a management solution.

Now, back to uptime. Is 100% uptime even possible? It depends on how you define it. Play funny with the definition, and you can draw a box around a period on your timeline where there was no downtime. During that period, presto! 100% uptime! But that's not legitimate, and we all know it.

What we mean when we say 100% uptime is that there will never be any downtime in the time period starting now and extending to infinity. You might legitimately tweak that definition a little bit &#8212; you could say no unplanned downtime, for example, instead of just no downtime, period.

So here's the thing. If there is any chance at all of downtime, then in the time period extending from now to infinity, the chance becomes a certainty. If we claim 100% uptime, we're claiming zero chance of downtime. That isn't "very small," but "zero." That is, we're claiming that downtime is literally impossible.

In the specific case of, say, NuoDB's database software, a 100% uptime claim means that it is impossible to take NuoDB offline regardless of what happens. That means that it can survive complete failure of its networking, storage, and compute facilities. That means that NuoDB itself has zero bugs that could ever cause problems or crash it. That means that NuoDB can't be screwed up by a human who makes a mistake.

Again, this isn't about NuoDB, which I'm sure is a remarkable piece of software. I just want to examine in clear terms what it really means to achieve such a goal. I would say 100% uptime is impossible to achieve. I don't think it is possible to completely eliminate every chance of failure in any system, and over a long period of time, a chance becomes a certainty. Downtime is not only always possible, but always inevitable.
