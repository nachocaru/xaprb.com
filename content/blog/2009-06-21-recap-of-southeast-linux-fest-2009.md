---
title: Recap of Southeast Linux Fest 2009
date: "2009-06-21"
permalink: /blog/2009/06/21/recap-of-southeast-linux-fest-2009/
categories:
  - Conferences
  - Databases
---
Last weekend, my brother and I attended [SELF 2009][1]. A few thoughts on it:

The mixture of sessions was interesting. There were some really good ones. I think the best session I attended was an OpenSolaris/NetBeans/Glassfish/Virtualbox/ZFS session, given by a Sun employee. He was an excellent presenter, and really showed off the strengths of the technologies in a nice way. He started up enough VMs to make his OpenSolaris laptop chew into swap, and I thought it was fun to see how it dealt with that. I've heard Solaris and OpenSolaris do a lot better at avoiding and managing swapping than GNU/Linux, but I couldn't make any opinion from watching. I did think it was odd to have this session at a "Linux" (yes, they left off the GNU) conference. But I thought the session was a good addition to the conference. In other sessions, and in the hallways and expo, there was a lot more slant towards open-source software and gadgetry in general than there was towards GNU/Linux. The sessions that were about Linux or GNU/Linux were top-heavy towards topics like educational initiatives.

The Free Software Foundation had a booth in the expo hall. It was funny that they didn't boycott the event, because I know RMS won't speak at so-called "Linux User Groups" and insists they be called "GNU/Linux User Groups." I guess the FSF is not unified behind that banner. Regardless, I used the opportunity to renew my membership perpetually. I'm so lazy that I need something like this to stay involved!

The expo hall was dominated by Red Hat, Fedora, and SUSE; PostgreSQL was there, but not MySQL. There was a good variety and number of vendors. It was great to see the healthy support of the event, which was free, by the way.

Clemson, SC is not easy to get to, and while the Clemson campus was attractive and functioned fine, it's nothing you can't find elsewhere. I ended up driving over 9 hours to get to it. I'd have preferred the technology triangle, which if nothing else is close to major airports, bus and train stops, and Red Hat.

Richard Hipp talked about the great fsync() bug, a similar talk to the one he gave at the first OpenSQL Camp. Someone asked about Tokyo Cabinet and he responded that he hasn't found any fsync() calls in its source code. \*cough\* Something worth thinking about for on-disk usage (I haven't looked at its source much myself). TC can also be used in-memory-only, and a while back I suggested that usage of it for Drizzle to replace the Memory engine; I don't know what became of that.

 [1]: http://www.southeastlinuxfest.org/
