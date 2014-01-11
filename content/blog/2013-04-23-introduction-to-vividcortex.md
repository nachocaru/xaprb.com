---
title: Introduction to VividCortex
date: "2013-04-23"
permalink: /2013/04/23/introduction-to-vividcortex/
categories:
  - Databases
---
We're ironing out a kink that's preventing Planet MySQL from aggregating VividCortex's blog feed, so while that's in progress, I'll post a quick note on what we're up to at [VividCortex][1], for the Planet MySQL readers.

VividCortex is a monitoring and analysis product for MySQL, provided as Software-As-A-Service, with agents that run in your systems and report back to our APIs. The agents are super-efficient and non-obtrusive (you've probably noticed my posts about Go recently). They gather high-resolution data about your systems and our web application helps you make sense of it.

VividCortex is shockingly easy to install &#8212; if you're slow at the keyboard, it takes 30 seconds. In less than a minute you can get insight into what your MySQL servers are doing. We are in closed beta right now, with a long waiting list. We're working with a small set of alpha customers to get the product ready for an open beta.

Our technology and UI focus around four key areas: easy observability of all of your systems (including very large numbers of servers), fluidly browsing and inspecting to swiftly drill into areas of interest, advanced and highly accurate problem detection, and problem diagnosis. In all of these areas we're truly breaking new ground, unlike anything you can get from legacy monitoring systems, whether commercial or opensource. (Can you think of any existing product that can actually diagnose problems for you?)

One of the enabling technologies is a new kind of fault detection algorithm. We've written a [series][2] [of][3] [blog][4] [posts][5] [on][6] this explaining why it's needed and how it works.

Feel free to ask me more questions, [sign up for our beta][7], or grab me in the halls at the [Percona Live MySQL Conference and Expo][8]. I'd be glad to tell you more.

 [1]: https://vividcortex.com/
 [2]: https://vividcortex.com/blog/2013/04/08/why-you-should-almost-never-alert-on-thresholds/
 [3]: https://vividcortex.com/blog/2013/04/09/a-sure-fire-recipe-for-monitoring-disaster/
 [4]: https://vividcortex.com/blog/2013/04/10/2-reasons-why-threshold-based-monitoring-is-hopelessly-broken/
 [5]: https://vividcortex.com/blog/2013/04/16/does-it-really-matter-if-monitoring-isnt-built-for-humans/
 [6]: https://vividcortex.com/blog/2013/04/17/how-does-adaptive-fault-detection-work-does-it-really-eliminate-thresholds/
 [7]: https://vividcortex.com/sign-up/
 [8]: http://www.percona.com/live/mysql-conference-2013/
