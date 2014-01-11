---
title: Thinking clearly about fitting a model to data
author: Baron Schwartz
layout: post
permalink: /2013/01/31/thinking-clearly-about-fitting-a-model-to-data/
categories:
  - Modeling
---
I have often seen people fitting curves to sets of data without first understanding whether that is appropriate. I once even [used this blog][1] to criticize someone for doing that.

I was trying to explain that it&#8217;s wrong to fit a model to a set of measurements, unless the model actually describes the process that produced the measurements.

All of my explanations (and rants) have fallen far short of the clarity and simplicity of this [curve-fitting guide][2]. It&#8217;s a user&#8217;s manual for the GraphPad software, but it&#8217;s really about curve-fitting in general. It is *excellent* reading. Here are a few selected gems:

> Choosing a model is a scientific decision. You should base your choice on your understanding of chemistry or physiology (or genetics, etc.). The choice should not be based solely on the shape of the graph&#8230; Don&#8217;t use a computer program as a way to avoid understanding your experimental system, or to avoid making scientific decisions.

> Your goal in using a model is not necessarily to describe your system perfectly. A perfect model may have too many parameters to be useful. Rather, your goal is to find as simple a model as possible that comes close to describing your system. You want a model to be simple enough so you can fit the model to data, but complicated enough to fit your data well and give you parameters that help you understand the system, reach valid scientific conclusions, and design new experiments.

This software user&#8217;s manual is better than any textbook I&#8217;ve read. There&#8217;s no fluff, just common sense, uncommonly well-written.

I&#8217;ll leave you with another example of curve-fitting that took place recently: [predicting Github&#8217;s user growth][3]. Does the author use a model that&#8217;s known to actually describe the processes at work in the growth of a population? A commenter makes a *great* point: &#8220;I&#8217;d love to see what happens if you just fit to the first 3 years and chart out the modelled prediction vs reality for years 4 and 5.&#8221; That&#8217;s one of the fastest ways to tell whether you&#8217;re seeing things. All meaning has pattern, but not all pattern has meaning. That&#8217;s a Neil Gunther quote.

Speaking of that, Neil Gunther counters with a [power law model][4]. He thinks Redmonk is wrong and it&#8217;ll take quite a bit longer for Github to hit 5 million users. My money&#8217;s on Neil Gunther.

 [1]: http://www.xaprb.com/blog/2011/01/15/sleep-while-you-can-because-it-wont-last-long/ "Sleep while you can, because it won’t last long"
 [2]: http://graphpad.com/guides/prism/6/curve-fitting/
 [3]: http://redmonk.com/dberkholz/2013/01/21/github-will-hit-5-million-users-within-a-year/
 [4]: https://groups.google.com/d/topic/guerrilla-capacity-planning/Hd9SQy654c4/discussion