---
title: "Amber Alert: Worse Than Nothing?"
date: "2014-02-12"
url: /blog/2014/02/12/amber-alert/
categories:
  - Operations
---
In the last few years, there's been a lot of discussion about alerts in the
circles I move in. There's general agreement that a lot of tools don't provide
good alerting mechanisms, including problems such as unclear alerts, alerts that
can't be acted upon, and alerts that lack context.

Yesterday and today at the Strata conference, my phone and lots of
phones around me started blaring klaxon sounds. When I looked at my phone, I saw
something like this (the screenshot is from a later update, but otherwise
similar):

![Overview][1]

I've seen alerts like this before, but they were alerts about severe weather
events, such as tornado watches. This one, frankly, looked like someone hacked
into the Verizon network and sent out spam alarms. Seriously --- what the hell,
a license plate? What?

Besides, it says **AMBER**, which is a cautionary color. It's not a red alert,
after all. It can't be anything serious, right?

The second time it happened I looked at the details:

![Details][2]

This is even less informative. It's an amber alert (not an urgent color like
red). But it's a sigificant threat to my life or property? I'm supposed to
respond to it immediately? Oh wait, my response is to "monitor" and "attend to
information sources." Almost everything on this whole screen is conflicting.
What a cluster-fudge of useless non-information!

Later I looked up some information online and found that an [amber alert][3] is a
child abduction alert. This one turned out to be a [false alarm][4].

All of this raises an obvious question: *why on earth would someone think that
making a bunch of people's cellphones quack with a cryptic message would convey
useful information?* For something as critical as a child abduction, they should
*get to the point and state it directly*. Judging by reactions around me, and
people I spoke to, almost nobody knows what an amber alert is. I certainly
didn't. When I tweeted about it, only one person in my network seemed to be
aware of it.

How can *anyone* take something like this seriously? All this does is make
people like me find the preferences for alerts and disable them.

In my opinion, this is an example of complete failure in alert design. I don't
think I can overstate how badly done this is. I want to say only a politician
could have dreamed up something so stupid...

But then I remember: oh, yeah. Pingdom alerts (we'll email you that your site is
down, but we won't tell you an HTTP status code or anything else remotely
useful.) Nagios alerts (we'll tell you `DISK CRITICAL` and follow that with
`(44% inode=97%)` -- anyone know what that means?). And so on.

Perhaps the amber alert system was designed by a system administrator, not a
politician.

[1]: /media/2014/02/amber-alert-overview.png
[2]: /media/2014/02/amber-alert-detail.png
[3]: http://en.wikipedia.org/wiki/AMBER_Alert
[4]: http://www.sfgate.com/crime/article/Person-of-interest-in-Amber-Alert-case-5228726.php
