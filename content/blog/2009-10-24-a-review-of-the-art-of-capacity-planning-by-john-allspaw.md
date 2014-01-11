---
title: A review of The Art of Capacity Planning by John Allspaw
author: Baron Schwartz
layout: post
permalink: /2009/10/24/a-review-of-the-art-of-capacity-planning-by-john-allspaw/
categories:
  - Review
  - SQL
  - Sys Admin
tags:
  - Capacity Planning
  - John Allspaw
  - queuing theory
---
<div id="attachment_1376" class="wp-caption alignleft" style="width: 190px">
  <a href="http://www.amazon.com/Art-Capacity-Planning-Scaling-Resources/dp/0596518579/?tag=xaprb-20"><img src="http://www.xaprb.com/blog/wp-content/uploads/2009/10/Art-Capacity-Planning.gif" alt="The Art of Capacity Planning" title="The Art of Capacity Planning" width="180" height="236" class="size-full wp-image-1376" /></a><p class="wp-caption-text">
    The Art of Capacity Planning
  </p>
</div>

[The Art of Capacity Planning][1]. By John Allspaw, O'Reilly 2008. Page count: 130 pages. (Here's [a link to the publisher's site][2].)

This is an outstanding book. As far as I know Ewen Fortune was the first Perconian to read it, and it's been spreading amongst us since then. I got my copy last week, and read it last night when I couldn't sleep for some reason. It took me about 90 minutes to read.

This book doesn't teach in generalities &#8212; it shows you exactly what to do. Rather than outlining the process of capacity planning (and it is a process!) and then letting you figure out how to apply it, the book shows you the process and then walks you through it several times with real examples.

The book is also intensely practical, focusing on what makes the application and the business successful. It doesn't get any more straightforward than this: "You don't want to be caught unprepared when growth takes place&#8230; Conversely, the company financial officers will not hold you in high regard either when you've purchased a lot of equipment that lay idle, only to see its price drop a few months later."

There are several discussions of special cases, such as when database and web server reside on the same hardware. These side trips serve two purposes: they help you see how to apply the process of capacity planning in more complex situations, and they cement the importance of the process even in the straightforward cases, so you learn it better.

Let me summarize the process:

1.  Define your goals, so you can measure whether performance is acceptable.
2.  Measure and graph *everything*, especially metrics that show whether you're meeting the goal.
3.  Inspect and correlate historical metrics to learn the limiting factor (I/O, CPU, network bandwidth, etc).
4.  Use real-world load (not lab tests) to discover the ceiling of that factor. Measure this by increasing the load and observing when performance stops meeting the goal.
5.  Use curve-fitting on historical metrics to derive an equation that describes your growth.
6.  Project the curve into the future and find out how long it's going to be until you hit the capacity ceiling, and therefore when performance will become unacceptable.
7.  Given the knowledge of how long it'll take you to deploy more capacity, work backwards and see when you need to start the procurement process.

This isn't the whole story. For example, some things aren't about performance, they're about literal capacity, such as available disk storage. But I'm summarizing. The point is to figure out what resource limits you, and predict when you're going to run out of it. This is *so much simpler* than I've seen this done before. Queuing theory impresses me too, but I think this is much more practical, and likely to be more accurate in my opinion.

The book ends with a chapter on deployment, and a few useful appendixes. I thought the chapter on deployment was a little less useful than the rest of the book, because it's not specific and actionable enough. However, there's still a lot to learn from it.

I highly recommend this book. Everyone on the operations team should probably have their own copy.

 [1]: http://www.amazon.com/Art-Capacity-Planning-Scaling-Resources/dp/0596518579/?tag=xaprb-20
 [2]: http://oreilly.com/catalog/9780596518585
