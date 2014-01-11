---
title: Recap of Southeast Linux Fest 2009
author: Baron Schwartz
layout: post
permalink: /2009/06/21/recap-of-southeast-linux-fest-2009/
categories:
  - Conferences
  - PostgreSQL
  - SQL
tags:
  - Drizzle
  - Fedora
  - Glassfish
  - NetBeans
  - OpenSolaris
  - OpenSQL Camp
  - PostgreSQL
  - Red Hat
  - Richard Hipp
  - self2009
  - SUSE
  - Tokyo Cabinet
  - VirtualBox
  - ZFS
---
Last weekend, my brother and I attended [SELF 2009][1]. A few thoughts on it:

The mixture of sessions was interesting. There were some really good ones. I think the best session I attended was an OpenSolaris/NetBeans/Glassfish/Virtualbox/ZFS session, given by a Sun employee. He was an excellent presenter, and really showed off the strengths of the technologies in a nice way. He started up enough VMs to make his OpenSolaris laptop chew into swap, and I thought it was fun to see how it dealt with that. I&#8217;ve heard Solaris and OpenSolaris do a lot better at avoiding and managing swapping than GNU/Linux, but I couldn&#8217;t make any opinion from watching. I did think it was odd to have this session at a &#8220;Linux&#8221; (yes, they left off the GNU) conference. But I thought the session was a good addition to the conference. In other sessions, and in the hallways and expo, there was a lot more slant towards open-source software and gadgetry in general than there was towards GNU/Linux. The sessions that were about Linux or GNU/Linux were top-heavy towards topics like educational initiatives.

The Free Software Foundation had a booth in the expo hall. It was funny that they didn&#8217;t boycott the event, because I know RMS won&#8217;t speak at so-called &#8220;Linux User Groups&#8221; and insists they be called &#8220;GNU/Linux User Groups.&#8221; I guess the FSF is not unified behind that banner. Regardless, I used the opportunity to renew my membership perpetually. I&#8217;m so lazy that I need something like this to stay involved!

The expo hall was dominated by Red Hat, Fedora, and SUSE; PostgreSQL was there, but not MySQL. There was a good variety and number of vendors. It was great to see the healthy support of the event, which was free, by the way.

Clemson, SC is not easy to get to, and while the Clemson campus was attractive and functioned fine, it&#8217;s nothing you can&#8217;t find elsewhere. I ended up driving over 9 hours to get to it. I&#8217;d have preferred the technology triangle, which if nothing else is close to major airports, bus and train stops, and Red Hat.

Richard Hipp talked about the great fsync() bug, a similar talk to the one he gave at the first OpenSQL Camp. Someone asked about Tokyo Cabinet and he responded that he hasn&#8217;t found any fsync() calls in its source code. \*cough\* Something worth thinking about for on-disk usage (I haven&#8217;t looked at its source much myself). TC can also be used in-memory-only, and a while back I suggested that usage of it for Drizzle to replace the Memory engine; I don&#8217;t know what became of that.

 [1]: http://www.southeastlinuxfest.org/