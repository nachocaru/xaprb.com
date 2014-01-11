---
title: The bigger they are, the harder they fall
author: Baron Schwartz
layout: post
permalink: /2011/04/25/the-bigger-they-are-the-harder-they-fall/
categories:
  - Commentary
tags:
  - Cloud Computing
  - rant
---
I see that a lot of people just don't get it when they start talking about high availability, redundancy, failover, etc. This is probably not going to change, but maybe I can try anyway.

Let's think about how you can survive a massive Amazon AWS failure. You build your application to automatically move services to another part of the infrastructure that's still up. Great! Now assume that everyone else is smart, too. Their applications move, too. What happens next?

The whole AWS cloud melts to the ground. Have you never seen this happen, where one instance of something fails and others pick up the load and fail in turn? I have. OK, so let's say that you're really smart, and you also have the ability to move to an entirely different provider. Now suppose that other people are smart too. Next stop &#8212; Rackspace Cloud is down, and so is Joyent, and so on.

You can't just pretend that "the cloud" is infinite. It isn't. Stop trying! In "the cloud," you still have to do capacity planning, even though it's [hard or impossible][1], and you still have to think about the possibility that the resources you assume are there aren't. Let's think about cloud computing's older name &#8212; utility computing. Can you think of any utilities that have had capacity shortages, brownouts, or even cascading failures? I worked a bunch of case studies on them in my engineering classes, but I also lived through some of them myself.

This is why some old-fashioned, stupid, clueless people still own their own hardware. Those dumb clod-jumpers aren't hip enough to move into the cloud where everything is magical. I bet they have kerosene lanterns for when the lights go out, too.

With economies of scale come failures at scale. You can't have it both ways.

 [1]: http://www.xaprb.com/blog/2010/06/01/under-provisioning-the-curse-of-the-cloud/
