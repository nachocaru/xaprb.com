---
title: Does MySQL really have an open-source business model?
date: "2008-12-23"
url: /blog/2008/12/23/does-mysql-really-have-an-open-source-business-model/
categories:
  - Commentary
  - Databases
---
I've been thinking about the business of what's variously come to be called commercial open-source and enterprise open-source. I'm interested in the gestalt -- the product, development processes, marketing, licensing and so on.

MySQL has tried many different ways to earn money. These include dual licensing, support subscriptions, a knowledgebase, consulting, an [Enterprise/Community split][1], [trying to make parts of the server closed-source][2], [making tools in a split community/premium version][3], [building functionality externally in closed-source software][4] where they can charge for it, and most recently creating [three tiers of functionality for the MySQL 5.1 server][5]. And these are only the highlights -- MySQL has courageously tried a lot of different models, far more than the blogosphere regularly acknowledges.

But are any of them really open-source business models? I have posited before that [the MySQL server is not really open-source][6]. I've come to believe that the MySQL business model is not an open-source one, either. I think all of these different approaches are steps towards a more closed-source business model.

Why is this happening? I believe that the sales department is the strongest influence in this direction. I've formed this opinion over the last couple of years, in part through many conversations with people on both the inside and outside of MySQL. And more recently, as a Percona employee I have been able to talk with many people who have negotiated with the MySQL sales team and then opted not to buy from them. They sometimes volunteer information on what it's like and why they've come to talk to Percona instead.

I've also heard from insiders that the familiar sales tactics don't work for MySQL. I believe this is because they rely on ways to gain leverage in the sales negotiations (e.g. lock-in, bundling, upselling, withholding). Many of these levers find no fulcrum in truly open-source software. The story is that the sales team came back to the rest of the company and said *you have to give us something we can sell. This isn't working*.

As I see it, the changes in MySQL's business models over the last few years have produced a self-reinforcing cycle, something like this:

1.  Experienced customers who understand the merits of open-source software recognize that MySQL has trended towards closed-source and isn't really offering a compelling open-source value. They don't buy, and&#8230;
2.  &#8230; MySQL trends further towards closed-source and tries to sell that; as a result, customers new to open-source software are not educated about its true value.

So instead of making MySQL more open-source and evangelizing that, MySQL might have left themselves few options other than to fall back to closed-source models. And that virtually requires closed-source products to sell. You can call it "feature differentiation," or "value add," or even "crippleware" (and Monty Widenius himself has done that) -- the fact is it's not open-source MySQL is trying to sell. Their offerings that are closest to being open-source are not for sale.

At the sales level, it appears to be working. I've heard that many more people are buying than before. I don't doubt that. This fact is touted as proof that MySQL is successfully building an open-source software business, and the pundits love to applaud it, even [urging MySQL to take a harder line][7]. I suppose they don't see the irony of saying that the [open-source business model is perfected by becoming closed-source][8].

I don't identify with this stance. I would prefer to see the open-source philosophy spread from the company to the customers and community, rather than allowing the customers and sales people to drive closed-source values back through the gate.

Unfortunately, I don't think MySQL will not do an about-face, because the market for real open-source simply isn't as big as MySQL wants. If your goal is to make money first and foremost,<sup>[1]</sup> instead of creating value for customers, you can do that better with closed-source software. And I think that as a result, MySQL might be working against itself, because open-source and Free Software are fundamentally about creating value for the users. If the users and the customers are the same people, there's a conflict of interest: the software wants to create value, but the business wants to create revenue.

The good news is that MySQL is Free Software, so it does not simply live inside of MySQL or Sun. Free Software is a meritocracy; there's equal opportunity for all of us, and in that sense Sun/MySQL are offered the same chance as the rest of us to serve this community. No one is in a position of ownership or control (remember, Sun purchased *MySQL the company*, not *MySQL the database*). We are all called to be stewards. I believe that if Sun/MySQL accept this role, MySQL the database and MySQL the company will prosper together; if not, MySQL the database will find a new home. The business of MySQL is associated with MySQL the database through freedom and choice, not bound through force.

I believe that a closed-source business model around MySQL will ultimately lose momentum, and those who work to set MySQL free will earn the community's trust and support. I realize that I'm contradicting all the experienced people who really know a lot about business, and I'm happy to let the passing of time correct me if I'm wrong.
These are interesting times. None of this is without precedent, yet there is so much we don't know. I think it's fine to keep trying different approaches and see what works. I've chosen my position based on my principles and beliefs, and I've tried to align myself with what I see as the Tao of Free Software, if you will. I'll be continuing to observe and participate, and re-evaluate my position if necessary.

<sup>[1]</sup>For the record, I have no problem with a company whose goal is first and foremost to make money.

 [1]: http://www.xaprb.com/blog/2007/08/12/what-would-make-me-buy-mysql-enterprise/
 [2]: http://developers.slashdot.org/developers/08/05/06/2125235.shtml
 [3]: http://dev.mysql.com/workbench/?p=13
 [4]: http://www.xaprb.com/blog/2008/11/20/an-alternative-to-the-mysql-query-analyzer/
 [5]: http://blogs.mysql.com/kaj/2008/12/01/mysql-51-release-schedule/
 [6]: http://www.xaprb.com/blog/2008/05/14/mysql-free-software-but-not-open-source/
 [7]: http://news.cnet.com/8301-13505_3-10122963-16.html
 [8]: http://weblog.infoworld.com/openresource/archives/2008/12/the_cost_of_dev.html
