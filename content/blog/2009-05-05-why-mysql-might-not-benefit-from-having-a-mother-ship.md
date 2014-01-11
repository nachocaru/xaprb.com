---
title: Why MySQL might not benefit from having a mother ship
author: Baron Schwartz
layout: post
permalink: /2009/05/05/why-mysql-might-not-benefit-from-having-a-mother-ship/
categories:
  - Commentary
  - GNU/Linux
  - PostgreSQL
  - SQL
tags:
  - Apache
  - Drizzle
  - MySQL
  - Open Source
---
As I was driving with a colleague in California a couple of weeks ago during the conference, the topic of conversation turned to the notion that Percona and the rest of the MySQL community really need the presence of a central entity that provides a recognized home for the MySQL server. The conversation went something like &#8220;I was talking to so-and-so, and he said, *you know, you guys really need Sun/MySQL, because without the mother ship, things will fall apart and your own business will fail*.&#8221;

I happen to believe this is FUD, and that the reverse might actually be true. (This is one reason why we&#8217;re [competing][1] head-on with MySQL.) Having a &#8220;mother ship&#8221; is in the long run, a very complex scenario to fully understand. There are all sorts of causes and effects that play out in subtle ways. I honestly doubt anyone can really know what the true effect is.

So what *can* we say about the presence or absence of a single controlling organization, then? Simply this: we can look for examples of where power is decentralized, and see how it fares. Let&#8217;s see some names:

*   The Linux kernel.
*   The GNU/Linux operating system in all its variations.
*   PostgreSQL.
*   Apache.

There are more that I could mention. But these are good enough examples to show that a thriving ecosystem is possible when power is not completely concentrated. In many ways, these projects have been far more successful than MySQL. I invite you to simply take a look at the Postgres hackers mailing list to see the PostgreSQL project&#8217;s success first-hand.

I can mention a few effects I&#8217;ve seen in the MySQL world that I don&#8217;t see elsewhere, and which I attribute to the presence of MySQL the corporation. The single biggest one I see is how the community around MySQL differs from, say, the community around PostgreSQL. As I said in my recent keynote address at the [Percona Performance Conference][2], I think the best way to describe it is &#8220;MySQL *has* a community. PostgreSQL *is* a community.&#8221; (That&#8217;s a quote from a PostgreSQL community member.)

PostgreSQL isn&#8217;t the only project I can point to &#8212; Drizzle, for example, is taking a very good approach in my opinion. But any of these will do as an example. The key point is that there is a fundamentally different outlook on the relationship, both inside and outside MySQL, than there might be. On the outside, I have observed a lot of passivity and negativity. On the inside, I sometimes detect something that might be called paternalism.

Unflattering &#8212; yes, I&#8217;m being rather unflattering. But let&#8217;s be honest. The status quo between MySQL and &#8220;the community&#8221; is not good, not good at all. It resembles nothing so much as the relationship between users and producers of a proprietary product. That&#8217;s not bad for a proprietary product &#8212; but really bad for an open-source one. Just the fact that we talk about MySQL and &#8220;the community&#8221; as though they&#8217;re separate reveals a lot.

And I attribute this to the presence of a mother ship, however you might choose to label it. It creates a power relationship that I believe is a roadblock to a lot of good things. I know of examples in the last few weeks where the power relationship caused appalling problems with some of the foremost community members &#8212; situations that would never have happened in a relationship of equals. (I&#8217;m being discreet for a reason; I don&#8217;t want to cause any more heartache for those involved. Let&#8217;s just leave it at &#8220;the entire community suffered as a result.&#8221;) This kind of thing has been happening for *years*.

I firmly believe those who would truly participate in open source must recognize that there is no true meeting of the minds, unless everyone is an equal. Not just &#8220;treated as an equal&#8221; &#8212; if you hold the power, then *you can&#8217;t be an equal*, no matter how you try to treat others. Anyone who tries to be &#8220;more equal&#8221; than others is poisoning the well. The only solution I see is to [divest oneself of power][3].

I think there are [a lot of opportunities][4] here for everyone involved. And those who are best placed to take those opportunities, but don&#8217;t, merely create a vacuum that draws others in to do it in their stead. And that&#8217;s why I think that ultimately, the mother ship structure is not only unnecessary and sometimes detrimental, but may even become irrelevant.

I will be very curious to see how things change in the future. MySQL has a lot going for it: an incredible team of talented, dedicated employees; visionary leaders; unprecedented technology landscape; economic conditions &#8212; it&#8217;s an enviable position. What I&#8217;m most interested in is to see how they will nurture the [open-source nature of the product][5], which is its greatest strength &#8212; if it is teased out of the closed-source models that have bound it so tightly in recent years. The good news is, I think it&#8217;s theirs to lose; they can win if they play it right, but the rest of us win no matter what.

The day we see an [announcement like this one][6] for MySQL will be a great day indeed.

 [1]: http://www.xaprb.com/blog/2009/04/20/a-review-of-how-life-imitates-chess/
 [2]: http://conferences.percona.com/
 [3]: http://www.xaprb.com/blog/2009/03/08/making-maatkit-more-open-source-one-step-at-a-time/
 [4]: http://www.xaprb.com/blog/2007/08/12/what-would-make-me-buy-mysql-enterprise/
 [5]: http://www.xaprb.com/blog/2008/05/14/mysql-free-software-but-not-open-source/
 [6]: http://mysqlha.blogspot.com/2009/04/hack-on-drizzle-get-paid.html