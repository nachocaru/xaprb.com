---
title: A review of Guerrilla Capacity Planning by Neil Gunther
date: "2010-07-06"
permalink: /2010/07/06/a-review-of-guerrilla-capacity-planning-by-neil-gunther/
categories:
  - Review
  - SQL
tags:
  - Capacity Planning
  - Cary Millsap
  - Craig Shallahamer
  - John Allspaw
  - Neil Gunther
  - Neil J. Gunther
  - Queueing Theory
  - Scalability
  - Universal Scalability Model
---
<div id="attachment_1949" class="wp-caption alignleft" style="width: 163px">
  <a href="http://www.amazon.com/Guerrilla-Capacity-Planning-Tactical-Applications/dp/3540261389?tag=xaprb-20"><img src="http://www.xaprb.com/blog/wp-content/uploads/2010/07/guerrilla_capacity_planning.jpg" alt="Guerrilla Capacity Planning" title="Guerrilla Capacity Planning" width="153" height="231" class="size-full wp-image-1949" /></a><p class="wp-caption-text">
    Guerrilla Capacity Planning
  </p>
</div>

[Guerrilla Capacity Planning][1]. By Neil J. Gunther, Springer 2007. Page count: about 200 pages, plus appendixes. (Here's [a link to the publisher's site][2].)

Of all the books I've reviewed, this one has taken me the longest to study first. That's because there is a lot of math involved, and Neil Gunther knows a lot more about it than I do. Here's the short version: I'm learning how to use this in the real world, but that's going to take many months, probably years. I've already spent about 10 months studying this book, and have read it all the way through twice &#8212; parts of it five times or more. Needless to say, if I didn't think this was a book with value, I wouldn't be doing that. But you'll only get out of this book what you put in. If you want to learn a wholly new way to understand software and hardware scalability, and how to do capacity planning as a result, then buy the book and set aside some study time. But don't think you're going to breeze through this book and end up with a simple N-step method to take capacity forecasts to your boss. If you want that, buy [John Allspaw's book][3] instead. (If you're reading this blog post, you need that book.)

I don't want to spend a lot of time talking about Neil's method, because honestly the book isn't about the method first and foremost, and I think many readers will have a hard time digging the capacity planning method out of the math-ness. This book is, in a sense, a textbook or workbook for his training courses. It begins with a lot of general topics, such as how managers think about capacity, risk, what's needed in the world of businesses that are driven by Wall Street, ITIL, and so on. Then there's the mathematical background for the rest of the book, things like significant digits and expressing error.

The part of the book that I'm still studying begins in Chapter 4, which introduces ways to quantify scalability. The math begins with [Amdahl's Law][4], which you may have heard of. It turns out that not only can this be used to understand how much overall speedup is possible by speeding up part of a process, which is how I'm used to using it, but it can be used to model what is possible with parallelization. (I think I actually learned this in my university classes, but I'd forgotten its uses in parallel computing since then.) Anyway, it's a straightforward model that makes intuitive sense and is easy to accept. I believe in it because it's so logical and simple, and because I've worked with it for a long time. That's the last bit of math in this book that I can understand so solidly, because after that, we get into a lot of things that have to do with interaction between concurrently performed work, and *nothing* is ever intuitive about that domain.

Now, when you're talking about scalability, you generally are working with scalability of concurrent systems, and queueing theory is Topic Number One. Proper queueing theory is correctly modeled, under certain very restricted conditions, by the [Erlang C formula][5]. This is a complex bit of math, and although I believe in it, I don't understand it enough to know how it's derived or proven to be correct. Well, there's no Erlang C math in this book. Neil Gunther goes a completely different direction. Instead of modeling the impact of queueing through the math that describes the model, he creates a new model. Let's leave the model for later, and just look at what's nice about *not* using Erlang C math to model computer system scalability:

*   The Erlang C formula requires complex calculations.
*   It is valid only in restricted conditions, and [it's a lot of work to prove that your workload conforms][6].
*   It models queueing delay, but it doesn't model coherency delay.
*   It requires inputs such as service time, which are difficult or impossible to measure accurately.

Someone once said that all models are wrong, but some models are useful. Neil Gunther heads in the direction of a more useful model. First, he proves that two parameters are necessary and sufficient to create a realistic model. Next, he introduces another parameter into Amdahl's Law to account for coherency delay. The resulting (still simple) equation models serial delay (the reverse of parallel speedup) and coherency delay. Now we have a model for how a system scales *under a given workload as you increasingly parallelize the hardware*. This is the **universal scalability model**. From the mathematical point of view, it's the crowning achievement of this book. I'm very much summarizing, by the way. There's a lot to think about in developing such a model, so the reader gets quite a tour de force here. Along the way Neil shows how you can arrive at the same surprising result through an entirely different route, without even using Amdahl's Law as a starting point.

There are other models. Neil discusses these. They all have problems. Some don't model what we know can happen in the real world &#8212; retrograde scaling &#8212; where performance can decrease when you add more power to a system. Others are physically impossible, predicting negative speedup. Negative speedup means the system's performance goes below zero. As in, you ask it to do work, and it, uh, takes back work it's already done? Impossible. So it certainly looks like Neil's model is the strongest contender. By the way, [Craig Shallahamer's book on forecasting Oracle performance][7] uses the universal scalability model, although without the mathematical rigor.

Now, the problem is how to apply this in the real world. To model a system's performance, you have to know the value of those two magical parameters. How on earth can you find these values? This seems to be just as hard as Erlang C math. But Neil shows the second most remarkable thing: if you transform the universal scalability model around a bit, then **you get a polynomial of degree two**. This is exciting because if you take some measurements of your system's observed performance at different points on the scalability curve (holding the work per processor constant, and adding more processors), and then transform those measurements in an equivalent manner, you can **fit a regression curve** through those points. Now you can reverse the transformations to the equation, plug in the coefficients of the quadratic equation that resulted from the curve-fitting, and out come the parameters you need for the universal scalability equation! Final result: you can extrapolate out beyond your observations and predict the system's scalability.

We're not done. All of this was about hardware scalability: "how much faster will this system run if I add more CPUs?" Software scalability is next. Neil goes back to the basics, starting with how Amdahl's Law applies to software speedup, and essentially covers all the same ground we've already covered, but this time modeling what happens when you hold the hardware constant, and increase the concurrency of the workload the software is serving. It turns out that exactly the same scalability model holds for software as it did for hardware. This is why he calls it the universal scalability model. But not only that, it works for multi-tier architectures of arbitrary complexity.

And this is why I say I am not competent to really prove or disprove the validity of the whole thing. It makes sense to me that even a multi-tier architecture can conform to a model with two parameters. As we know in the real world, there is usually a single worst bottleneck, a weakest link. And therefore no matter how complex the architecture, the dominant factors limiting scalability are still coherency and/or queueing at the bottleneck, and how much you can parallelize (Amdahl's Law). Thus, the universal scalability model intuitively might be valid for such architectures. But proving it &#8212; wow, that's way beyond me. I know my limits. I'm taking it all on faith, experience, and intuition at this point.

In my mind, the results Neil Gunther derives up to this point in the book would have been plenty. However, there's lots more left in the book. The rest of the book is about how to use the model for capacity planning, but surprisingly, it's not about just how to use the universal scalability model. It's about Guerrilla Capacity Planning in the real world. Right after exploring software scalability, he dives into virtualization for a whole chapter &#8212; and then shows you how to measure, model, and predict the scalability of various virtualization technologies. Next chapter: web site capacity planning. After that? "Gargantuan Computing: GRIDs and P2P." Yep, he analyzes the scalability limits of Gnutella and friends. And then, apparently just because he can, he dissects arguments about network traffic in general (read: "how scalable is the Internet?"). I can't pretend to understand all this myself. I'm just following along.

I have a feeling that Neil Gunther is kind of like Einstein: his real gift is his ability to create thought experiments that make the model accessible to mortals. Maybe someday he'll be a legend you learn about in CS101 classes, or maybe someday he'll be proven wrong like Newton, who knows. In the meantime, I'm going to keep working on applying it all in the real world, especially to MySQL, and see what comes of it. The fact that I'm still doing that bears out what I said earlier: you aren't going to just waltz through this book and come away with a clear picture of how to work through a capacity planning method. You'll have some work to do. If you want an elegant and simple capacity planning method, then you should buy [John Allspaw's *The Art Of Capacity Planning*][3] instead.

 [1]: http://www.amazon.com/Guerrilla-Capacity-Planning-Tactical-Applications/dp/3540261389?tag=xaprb-20
 [2]: http://www.springer.com/computer/communication+networks/book/978-3-540-26138-4
 [3]: http://www.xaprb.com/blog/2009/10/24/a-review-of-the-art-of-capacity-planning-by-john-allspaw/
 [4]: http://en.wikipedia.org/wiki/Amdahl%27s_law
 [5]: http://en.wikipedia.org/wiki/Erlang_%28unit%29#Erlang_C_formula
 [6]: http://carymillsap.blogspot.com/2010/03/robbs-question-about-mmm.html
 [7]: http://www.xaprb.com/blog/2010/05/01/a-review-of-forecasting-oracle-performance-by-craig-shallahamer/
