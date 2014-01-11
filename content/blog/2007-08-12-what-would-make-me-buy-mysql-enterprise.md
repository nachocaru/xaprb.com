---
title: What would make me buy MySQL Enterprise?
date: "2007-08-12"
permalink: /2007/08/12/what-would-make-me-buy-mysql-enterprise/
categories:
  - Databases
---
MySQL AB's [recent changes to the Community/Enterprise split][1] have made people go as far as calling the split a failure. I don't think it's working well either, but it could be fixed. Here's what I think would make Enterprise a compelling offer.

### I'd recommend Enterprise if I could

If the MySQL Enterprise Server were a good thing, I'd recommend it to my consulting clients. I'd suggest we start using it at my employer, too. I believe in supporting people and companies whose work benefits me. Here's the thing, though: I think it would be detrimental, even dangerous.

Why on earth would I think that?

Because nobody's testing the Enterprise source code before it's released.

It's getting bug fixes that haven't been stress-tested in the real world. Some of them are even being rolled back, many months later, because they were broken.

### Reasons I'd buy MySQL Enterprise

The reasons I'd buy a MySQL Enterprise subscription would be as follows, in order of importance:

1.  A stable, tested version of the server with well-known, documented limitations and bugs.
2.  Technical support.
3.  The knowledge base, etc, etc.

### But&#8230; that's what Enterprise is, right?

The [official list of benefits in an Enterprise subscription][2] looks like it matches my list, doesn't it?

<blockquote cite="http://www.mysql.com/products/enterprise/subscription_benefits.html">
  <p>
    MySQL Enterprise subscriptions include the following benefits:
  </p>
  
  <ol>
    <li>
      MySQL Enterprise Server: The MySQL Enterprise Server is the most reliable, secure and up-to-date version of MySQL in source and binary format.
    </li>
    <li>
      Extensive Reliability Testing&#8230;
    </li>
  </ol>
  
  <p>
    &#8230; etc &#8230;
  </p>
</blockquote>

The thing is, those first two bullets are **blatantly untrue**. Want proof? Look at the [change list for MySQL 5.0.48][3], which will be the next Monthly Rapid Update. Here are just a few of the changes near the top of the list, with my comments:

1.  Coercion of ASCII values to character sets that are a superset of ASCII sometimes was not done, resulting in illegal mix of collations errors. These cases now are resolved using repertoire, a new string expression attribute&#8230; 
    *   My comment: A [new, complex string expression attribute][4], designed to fix an edge case, is going straight into the "reliable" Enterprise branch? No way I want that untested change on my production servers.
2.  FEDERATED tables had an artificially low maximum of key length. 
    *   A fix to FEDERATED? FEDERATED is riddled with *basic* bugs and should not even be distributed with Enterprise, and even so, who cares if I can't make as long an index as I should be able to? I can work around it while the community tests it.
3.  In some cases, INSERT INTO &#8230; SELECT &#8230; GROUP BY could insert rows even if the SELECT by itself produced an empty result. 
    *   Another edge case, probably easy to avoid, that probably affects core parts of the server.
4.  In a stored function or trigger, when InnoDB detected deadlock, it attempted rollback and displayed an incorrect error message (Explicit or implicit commit is not allowed in stored function or trigger). Now InnoDB returns an error under these conditions and does not attempt rollback. 
    *   Changes to InnoDB's deadlock and rollback behavior should not be included in a hot-fix, especially since it only affects stored functions and triggers, which are also not ready for Enterprise.

These bug fixes address minor problems, but seem to have the potential to cause major damage if there's a problem with the fix itself. None of these should be included in a hot-fix release. In fact, after looking through the whole list, I don't see *anything* I would want to go to my production servers before six months of community testing. There's simply too much at stake. The upside of including these changes is so small, and the potential downside so large, that it doesn't make sense to include them.

### What would I not want in Enterprise?

Here are some things that would *not* attract me to Enterprise:

*   Patches and hot fixes.
*   New features.

Take a look at bullet points number three and four in the list of Enterprise benefits:

<blockquote cite="http://www.mysql.com/products/enterprise/subscription_benefits.html">
  <ol>
    <li value="3">
      Updates and Upgrades with New Features: You receive the newest versions of MySQL Enterprise Server released during your active subscription term.
    </li>
    <li>
      Predicable Releases with Bug Fixes and Updates: Predictable and scheduled service packs ensure that a new, fully up-to-date version of the MySQL Enterprise Server is always available with the latest updates and bug fixes. Customers of MySQL Enterprise receive Monthly Rapid Updates &#038; Quarterly Service Packs
    </li>
  </ol>
</blockquote>

These are exactly the things I don't want in my Enterprise source code. These two "benefits" directly conflict with the first two benefits. They cannot coexist, period.

MySQL's marketing information says [new experimental features are unstable,][5] but [hot bug fixes are stable and reliable][2]. In reality, there's no difference between new features and new bug fixes; they are both unstable and untested and don't belong in a conservative, reliable product.

Until this changes, the Enterprise source code will continue to be less trustworthy than the Community source code, in my opinion. Even if the Community source doesn't get the bug fixes, at least you know what you're dealing with.

### How would I change the current release policy?

I think this is easiest to explain with diagrams. Here's the current release policy, as I understand it (I know this is over-simplified, but I'm trying to simplify this enough to show how I'd change it):

![MySQL Community and Enterprise Source Policy][6]

As I understand it now, the Community source gets (or is intended to get &#8212; it's not really working, but that's off-topic) frequent contributions from the community, and occasional bug fixes that are applied to the Enterprise source. The Community source is built and released infrequently.

On the other hand, the Enterprise source gets frequent hot fixes and releases, and infrequently gets features merged from the Community source after they're deemed stable.

I'm not sure who designed this scheme, but I think a lot of people tried to say it was a bad idea and they went ahead anyway. Perhaps the symmetry in the diagram appealed to [someone][7].

Here's how that would have to change before I'd buy Enterprise:

![MySQL Community and Enterprise Source Policy][8]

In this model, the Community gets *all* source code changes first, and after they are stable, they're merged into the Enterprise source. The Community code is built and released frequently, and Enterprise is extremely conservative.

This I'd pay for. This is a compelling offer that gives Enterprise customers substantial return for their money.

In this model, I'd be paying MySQL to do the painstaking work of looking at all the changes that happened in the Community source tree during the last release cycle, carefully selecting the good stuff, merging that into the Enterprise source tree, and testing the result. This is a proven model for creating high-quality software from a rapidly changing codebase. I don't know why MySQL invented their own method instead, but it was a mistake.

Notice something else about this: unless the MySQL developers know something about revision control and merging I don't (entirely possible, since I've never used the product they use), this is a lot simpler to manage. There are no cross-currents between the two source trees. It's not just the aesthetics of having all the arrows going the same direction; I'd be a *lot* more confident that the merges went smoothly in this model. I think there's a much lower chance of a mistake.

I also think the engineers would have a lot less work to do, and could concentrate more on making software and less on maintaining two complicated source trees. In fact, I believe the Community branch has actually been getting bug fixes too, contrary to my first diagram. This isn't what MySQL initially announced they'd do, but if I had to guess, I'd say the engineering team said it would be too much work to keep the bug fixes out of the Enterprise branch.

### Notice what I'm not saying about Community

I am explicitly avoiding saying something in particular about the Community source. I want quick release cycles and all patches applied there first, for one and only one reason: so the Enterprise source is trustworthy and stable. I'm *not* saying I want it so I can get the most bleeding-edge new fun stuff for free in Community. That is not a factor for me in the mindset I'm using to write this article &#8212; I am imagining myself as a customer who is very risk-averse (which is true).

This model would probably make some Community users happy too, though.

### What if I needed an immediate fix?

What if I found a serious bug in the software and needed it fixed right away for my business? Shouldn't MySQL release a hot-fix into the Enterprise tree for that?

**No**. I found a bug, who cares? If I found it, it means the community didn't find it first. If the community didn't find it, it probably only affects me. Therefore, the bug fix should go into the Community server.

If I couldn't work around the problem (unlikely), I should be able to pay MySQL's support engineers to make me a custom patch and build just to fix this problem. I'd assume all the risk of that, of course. This unstable, experimental patch should not go into the Enterprise source, but other customers should hear about it.

Right now you might be considering the similarity to Red Hat Enterprise Linux, and thinking "but RHEL does get hot fixes, so why shouldn't MySQL Enterprise?" The reason is MySQL Enterprise isn't an entire operating system distribution of software, with third parties fixing defects in upstream source. The Community process I'm advocating should take care of the *vast* majority of such bugs. Someone might find a critical security flaw that would warrant a hot-fix to the Enterprise product without waiting six months. But seriously, look at the bugs people find in MySQL &#8212; look at that changelog I linked to. There are no critical security flaws or kernel buffer overflows &#8212; and those are the kinds of things RHEL gets hot fixes for.

Some people might be drawn to MySQL's current monthly hot-fix policy because they come from a Microsoft background, where Microsoft releasing service packs and hot-fixes is seen as a good thing. All I can say to those people is, you've become like a frog in a pot of boiling water. Microsoft's fixes and service packs are a broken way of fixing their broken software, and are not a good way to manage quality software, so you shouldn't measure the value of a release policy by whether it looks like Microsoft's.

### What would my ideal Enterprise version look like?

I'd really like to see MySQL AB stop adding new features and make the existing ones work better. The bugs I keep finding are usually quite simple, and I think that's a sign of a low-quality codebase. For example, try [creating a view that already exists][9]. It breaks replication. How did this bug go unnoticed for so long? In my opinion, it's because the server hasn't been stable since 5.0 was released, and nobody's using the bleeding-edge features as much as the core of the server, which is where I'd like MySQL AB to concentrate for the Enterprise version.

The Enterprise version I'd like to see doesn't have views. That's right, it doesn't have views, because nobody's used and tested them thoroughly yet (if they had, there wouldn't be so many bugs in them). It doesn't have triggers, stored procedures, the FEDERATED storage engine, stored functions &#8212; in terms of features, it's somewhere in version 4.1. That's what I'd call MySQL Enterprise. I don't want these features because I don't use them right now anyway, because they have the potential to cause such massive pain. I want them to go back to the community incubator so the bugs can get worked out. I'm managing just fine without using them, but I'm not managing fine with the pain they're causing just by being there even though I don't use them.

But at the same time the existing features, especially those needed for scaling and high availability, would be given a lot more attention. Replication would have much stronger assurances of accuracy and reliability. InnoDB would scale to more processors. The query optimizer would get a lot of love. In terms of improvements to existing features, my ideal Enterprise version is somewhere around 5.0.32. I chose that version because it was released about six or eight months ago, which means the [big changes in that version][10] would have been out in the Community for six or eight months and I'd be satisfied having them in the Enterprise version.

Right now, if you want to upgrade because of a bug that's fixed in a newer version, you upgrade into some other bugs. I'm seriously tired of upgrading into the newest, latest, greatest bugs, like [infinite loops in relay logs that fill hard drives with gigabytes of duplicate logs in a matter of minutes][11]. These bugs have cost a significant amount of money, time, and frustration. I would definitely recommend people buy and use Enterprise if it fixed bugs without introducing new ones, but I see no signs of that happening.

### MySQL's sales pitch doesn't convince me

There's one more thing I think MySQL would have to do to get me to buy Enterprise, and that's develop a better sales pitch. I'll explain that &#8212; keep reading.

I think the way the Community/Enterprise split is designed smacks of marketing people making decisions. I don't think this is ultimately going to be as successful a strategy for MySQL as it could be, because they won't be able to sell it as well. Why not? Because unlike many other products, the people who make decisions about their company's MySQL installations are engineers, by and large. The current marketing message sounds pretty condescending to an engineer.

I've even joined a MySQL webinar just to see. It was supposedly about scaling with MySQL, but in fact there was very little content. They spent a lot of time trying to say you should buy Enterprise. This was very strange, since the webinar was only open to current Enterprise customers. But the reasons they gave for choosing one or the other had me shaking my head in disbelief. It went something like this:

> You should choose MySQL Enterprise if you're making money with MySQL, because Enterprise is the version for making money. If you plan to use MySQL to make money, you should use Enterprise. On the other hand, you should use Community if you're just experimenting with MySQL. It's free and has lots of hot new features, like SHOW PROFILE and um, uh, that's it. Anyway, you should use it if you're just experimenting, because it's the version for experimenting. Oh, and you should use it for your testing if you're an Enterprise customer, because it's for experimenting with, and tests are experiments.

These aren't direct quotes, but they probably aren't far off &#8212; they certainly capture the spirit, if not the letter, of the webinar. Their strongest reason for using Enterprise was "because you should use Enterprise," and they said it several times. And when they said Enterprise users should run Community on their test systems, I thought "you're kidding. I'm going to test with a different version of the product than I run in production? Enough already." I signed off with about five minutes left in the webinar.

The bottom line is, I don't trust a company that assumes I won't have a problem with such nonsense. I know there are smart engineers working on the MySQL server, but the marketing message is the face the world sees. In my experience, that ends up giving the marketing people the right to make decisions, even when the engineers disapprove. Therefore, I have no confidence the people making the decisions about how MySQL is developed and released are competent to do so.

If MySQL's marketing materials were written and presented by people with serious tech savvy, I'd be a lot more comfortable about the invisible parts of the company. I assume most other engineers are going to extrapolate backwards from the faÃ§ade, just like me, and conclude the decision-making process is untrustworthy.

Incidentally, this is exactly why my current employer (an advertising agency) rocks: because the sales folks and execs have decades of experience running companies in the industries we serve, and the people who answer when you call to discuss your account are analysts, not customer service reps. Whoever picks up the phone is an Excel wizard and has a SQL window (not a reporting system, a SQL prompt) open directly to an analysis server &#8212; our analysts and sales people are smart and capable and generally have business or engineering degrees from top universities; they're not just friendly voices.

Contrary to popular wisdom, you can tell a lot about the book by looking at the cover. That's why MySQL needs a sales pitch that's convincing and respectable to an engineer.

### Conclusion

MySQL AB says it needs to offer its paying customers something of value, and rightly so. Unfortunately, someone who doesn't seem to understand software engineering at all has decided on a truly backwards way to do that. The result is a release policy that seriously degrades the quality of both product versions. MySQL AB's marketing folks keep trying to say the Emperor's new clothes are beautiful, but proof by repeated assertion just doesn't work on people who know software engineering.

Put another way, MySQL AB is trying to sell Enterprise on the so-called benefit of *including* bug fixes so the product is "more stable." This is an oxymoron. They should be selling the service of *excluding* untrusted code instead.

The current Enterprise offering not only isn't compelling, but is designed to actually be *lower quality than the Community source* because there are fewer people testing it. Not using the Enterprise source is a no-brainer for me. However, if they'll correct this mistake and start producing a source tree that's conservative, high-quality, and stable, I'll recommend people buy it. I wish MySQL well in their efforts to commercialize the product, but I don't want what they're trying to sell right now.

 [1]: http://www.planetmysql.org/kaj/?p=123
 [2]: http://www.mysql.com/products/enterprise/subscription_benefits.html
 [3]: http://dev.mysql.com/doc/refman/5.0/en/releasenotes-es-5-0-48.html
 [4]: http://dev.mysql.com/doc/refman/5.0/en/charset-repertoire.html
 [5]: http://www.mysql.com/products/which-edition.html
 [6]: http://www.xaprb.com/blog/wp-content/uploads/2007/08/mysql-enterprise-community-current.png
 [7]: http://en.wikipedia.org/wiki/Pointy_Haired_Boss
 [8]: http://www.xaprb.com/blog/wp-content/uploads/2007/08/mysql-community-enterprise-desired.png
 [9]: http://bugs.mysql.com/bug.php?id=28244
 [10]: http://bugs.mysql.com/bug.php?id=24200
 [11]: http://bugs.mysql.com/bug.php?id=28421
