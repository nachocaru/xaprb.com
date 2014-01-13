---
title: Can we afford big data, or do we need smart data?
date: "2012-11-15"
permalink: /blog/2012/11/15/can-we-afford-big-data-or-do-we-need-smart-data/
categories:
  - Commentary
  - Databases
---
With the Big Data craze that's sweeping the world of technology right now, I often ask myself whether we're deficit-spending, so to speak, with our data consumption habits. I've seen repeated examples of being unwilling to get rid of data, even though it's unused and nobody can think of a future use for it. At the same time, much Big Data processing I've seen is brute-force and costly: hitting a not-very-valuable nut with a giant, expensive sledgehammer. I think the combination of these two problems represents a giant opportunity, and I'm going to call the solution Smart Data for lack of a better word.

What's the problem, in 25 words or less? I think it's that we're collecting a lot of data *simply because we can*. Not because we know of any good use for it, but just because it's there.

What is the real cost of all of this data? I think we all know we're well behind the curve in making use of it. A huge industry is springing up to try to catch up to that. It's not a cheap industry, by and large, and I am not sure how much costs can come down. I think that we're going to get steamrolled by this. Organizations will own a lot of data, they'll need software and support organizations and staff to work with it, and they'll need a lot of hardware and power to store it and compute with it. By the time the problem becomes serious and they start to backpedal, there'll be a lot of political and psychological resistance. The costs of this resistance could be high: businesses could grow more slowly or fail, there will certainly be an environmental impact, there might be problems with security and privacy, and so forth.

That's why I believe that if we had a crystal ball, we'd find that we don't always need or want Big Data. We need and want what I'm going to call Smart Data.

I think most Big Data is utter garbage, collected in the hope that it might be useful, but then unused because no one can figure out whether it's useful. I think that much of it is inherently meaningless and useless, whether we can prove it or not.

Smart Data is a recognition of this. I see it as a set of practices that I believe we need to build around the lifecycle of Big Data. Smart Data is what you get when Big Data is no longer exciting "just because." The Smart Data lifecycle will vary, but might look like this:

1.  Capture and record everything, and don't delete any of it.
2.  Wait for a little while until the data is ready for analysis -- say, several cycles of seasonality.
3.  Analyze the data and determine which portions of it are meaningful, and what meaningful metrics can be distilled from it.
4.  Aggregate, compress, distill, extract, and otherwise winnow down the Big Data until the meaning and knowledge remains. In most cases I believe this will constitute a tiny fraction of the original dataset.
5.  Discard the original dataset, or place it into offline storage if you must.
6.  Stop retaining the whole incoming data stream. I see a variety of options here -- short-term retention, upfront winnowing, realtime streaming analysis and immediate discarding, and so on.
7.  Repeat. If you have a new question that you think the original data can answer, but the distilled data can't answer, then either go to your archives and pull it out, or if you've discarded it, start again at step 1 for a while and accumulate enough data to answer the question.

Here's a diagram that expresses some of these ideas.

<div id="attachment_2961" class="wp-caption aligncenter" style="width: 310px">
  <img src="http://www.xaprb.com/media/2012/11/smart-data-lifecycle-300x268.png" alt="" title="smart-data-lifecycle" width="300" height="268" class="size-medium wp-image-2961" /><p class="wp-caption-text">
    Smart Data Lifecycle
  </p>
</div>

I believe that there's an opportunity to keep the most valuable data and throw away the rest, because I've been able to do that in my own work. Much of the research I've done into MySQL performance, for example, is based on ignoring the huge stream of irrelevant data, and focusing on the signal buried in the noise. My work on extracting performance and scalability metrics from TCP traffic is an example, as is my more recent adaptive fault detection work. I've seen alternative implementations of similar ideas that require enormous amounts of data and very expensive computation, yet don't appear to provide any better results than my cheap-and-easy algorithms that operate efficiently on small amounts of data. I believe this approach represents a competitive advantage for businesses in particular.

What do you think? Are we drowning in data and we don't know it yet, or am I overreacting to a problem that doesn't exist?
