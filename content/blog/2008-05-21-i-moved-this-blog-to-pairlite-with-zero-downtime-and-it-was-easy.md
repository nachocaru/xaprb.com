---
title: I moved this blog to pairLite with zero downtime, and it was easy
date: "2008-05-21"
url: /blog/2008/05/21/i-moved-this-blog-to-pairlite-with-zero-downtime-and-it-was-easy/
categories:
  - About
---
Did you notice that I moved this blog from [pair Networks][1] to [pairLite hosting][2]?

Probably not, unless you check the DNS of xaprb.com regularly!

Don't you hate it when people say "I'm moving my blog, I hope there won't be more than a few days of downtime, blah blah&#8230;" Why is this ever necessary, I wonder? I wonder the same thing about a lot of hosting providers -- recently I had a client in my [consulting practice][3] whose (very large, well-known) hosting provider tried to help them with some very simple MySQL work and ended up causing them an obscene amount of downtime, like many many days, and there was no end in sight. As I spoke on the phone with him and asked him about his business, he said "we have X thousand users in our beta." long pause. "Well, we did anyway." The poor man hadn't slept in I don't know how long. I could only empathize with what it must have felt like to say those words in that mental and physical state. And as I spoke with him I had to tell him, cringing as I said it, that his downtime was completely unnecessary. His host was utterly ignorant of what they were doing.

Does this ever happen to someone you know? It's such a shame. I wouldn't be surprised, really, if this client has a hard time recovering fully from this blow.

This is not to demonize hosting providers. They are often great at hosting. But they are not MySQL experts. (Some of them hire Percona to do their MySQL support, and that is good.) If you need expert MySQL help, [hire an expert][3]. We can also tell you what to watch out for on your shared hosting -- the hosting providers often don't understand the hardware requirements for a database server, and we constantly see simple and really bad avoidable mistakes such as a 32-bit OS on 64-bit hardware or a misconfigured RAID controller. Don't rely on your hosting provider for anything database-related, especially backups.

Similarly, if you need expert hosting, call an expert hosting provider, not someone who's just reselling. I've had such good luck with pair Networks (and now pairLite, their budget service) that I write love letters like this blog post constantly. And I recently [switched away from Embarq for my DSL][4] provider, to [BRIWorks, a local shop with really friendly, smart people][5] who charge me more money than Embarq, and yet I love them for it. (By the way, they're not just local; they can help you if you don't live in Charlottesville. If I wasn't already a pairLite customer, I'd use them.)

My point? With good hosting, and my skills with MySQL and PHP and Apache, I moved with no downtime. OK, it's not hard -- but neither is a non-corrupt MySQL backup that doesn't kill your entire business. If you know what you're doing.

If you don't know what you're doing, hire someone who does!

 [1]: http://www.pair.com/
 [2]: http://www.pairlite.com/
 [3]: http://www.percona.com/
 [4]: /blog/2007/11/23/why-is-embarq-hijacking-my-dns/
 [5]: http://www.briworks.com/
