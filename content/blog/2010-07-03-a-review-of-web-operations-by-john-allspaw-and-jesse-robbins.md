---
title: A review of Web Operations by John Allspaw and Jesse Robbins
author: Baron Schwartz
layout: post
permalink: /2010/07/03/a-review-of-web-operations-by-john-allspaw-and-jesse-robbins/
categories:
  - Operations
  - Review
  - SQL
  - Sys Admin
tags:
  - Brian Moon
  - Eric Florenzano
  - Eric Ries
  - Heather Champ
  - Jake Loomis
  - Jesse Robbins
  - John Allspaw
  - NoSQL
  - Richard Cook
  - Theo Schlossnagle
  - Web Operations
---
<div id="attachment_1864" class="wp-caption alignleft" style="width: 190px">
  <a href="http://www.amazon.com/Web-Operations-Keeping-Data-Time/dp/1449377440?tag=xaprb-20"><img src="http://www.xaprb.com/blog/wp-content/uploads/2010/05/web_operations.gif" alt="Web Operations" title="Web Operations" width="180" height="236" class="size-full wp-image-1864" /></a><p class="wp-caption-text">
    Web Operations
  </p>
</div>

[Web Operations][1]. By John Allspaw and Jesse Robbins, O&#8217;Reilly 2010, with a chapter by myself. (Here&#8217;s [a link to the publisher&#8217;s site][2]).

I wrote a chapter for this book, and it&#8217;s now on shelves in bookstores near you. I got my dead-tree copy today and read everyone else&#8217;s contributions to it. It&#8217;s a good book. A group effort such as this one is necessarily going to have some differences in style and even overlapping content, but overall it works very well. It includes chapters from some really smart people, some of whom I was not previously familiar with. John and Jesse obviously have good connections. A lot of the folks are from Flickr.

Here are the highlights in my opinion.

*   Theo Schlossnagle, who has a place on my list of [essential books][3], opens things with an overview of what web operations really is, and why it&#8217;s hard. Don&#8217;t skip this. Theo&#8217;s introduction is concise and thoughtful.
*   Eric Ries discusses the benefits of continuous deployment. He is right on the money. Right out of college I spent 3 years as a developer at a company with very little engineering discipline, and then left for another company built by a small ace team practicing extreme programming. Eric nails the benefits of continuous deployment &#8212; he really gets it. I hadn&#8217;t heard of Eric before, but now I&#8217;ve subscribed to [his blog][4].
*   John Allspaw (whose book on capacity planning is also on my list of essentials) and Richard Cook discuss how complex systems fail. This chapter appeared in part as a [whitepaper and blog post on John&#8217;s blog][5], and is expanded in this book. I have spent a lot of time examining failures for clients, and as VP of Consulting, also a lot of time examining Percona&#8217;s own mistakes. I fully agree with the conclusions in this chapter. A few key points: there is never a single root cause; our desire to find one blinds us and keeps us from learning; *true* failures are inherently unpredictable and happen only when a series of things fails; avoiding failure requires experience with failure. This echoes another book I&#8217;ve read recently, [The Black Swan][6].
*   [Brian Moon&#8217;s][7] chapter on unexpected traffic spikes. If you get a chance to hear Brian speak, take it. He&#8217;s an engaging guy with interesting and relevant stories to tell. Stories are always a better experience than bullet points.
*   Jake Loomis&#8217;s chapter on postmortems. My own research into prevention of emergencies agrees almost perfectly with his list of things to do on page 225. Read this chapter carefully! Now, knowing how to put this into action is hard &#8212; very hard &#8212; but at least you&#8217;ll have a place to start. The worst compliment I ever got after fixing a system that&#8217;d run out of hard drive space (due to utter lack of basic monitoring) was that I&#8217;d &#8220;saved the day.&#8221; Baloney. Postmortems can be a great way to learn your infrastructure&#8217;s weaknesses and prevent emergencies in the future. I&#8217;m fully confident that this particular client will again deploy new servers without adding them into Nagios, and the results will be predictable.
*   Naturally, my chapter about choosing a relational database architecture for web applications (skewed towards MySQL). There is a chapter on NoSQL databases by Eric Florenzano as well, but it is more introductionary-level.

What wasn&#8217;t so good? I didn&#8217;t get a lot of value out of John&#8217;s interview with Heather Champ, on community management and web operations. I did not think the interview format worked well in a book full of essays. But that might just be me. Also, a couple of places in two or three chapters felt a bit rant-ish without a lot of clear actionable advice; I think readers won&#8217;t get so much out of this.

Overall, though, this is a great book, badly needed, on a topic that is simply not yet recognized for its true importance. As Theo writes, we&#8217;re seeing the emergence of web operations as a very large profession; it&#8217;s one whose definition is not yet formalized or agreed-upon, but that&#8217;ll change. It&#8217;s too important not to. Jesse&#8217;s introduction repeats this sentiment: the world now relies on the web, and so the world relies also on the engineers who make it run. Web operations is work that matters.

 [1]: http://www.amazon.com/Web-Operations-Keeping-Data-Time/dp/1449377440?tag=xaprb-20
 [2]: http://oreilly.com/catalog/0636920000136
 [3]: http://www.xaprb.com/blog/essential-books
 [4]: http://www.startuplessonslearned.com/
 [5]: http://www.kitchensoap.com/2009/11/12/how-complex-systems-fail-a-webops-perspective/
 [6]: http://www.amazon.com/Black-Swan-Impact-Highly-Improbable/dp/1400063515?tag=xaprb-20
 [7]: http://brian.moonspot.net/