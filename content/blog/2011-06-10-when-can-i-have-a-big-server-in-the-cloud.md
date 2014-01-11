---
title: When can I have a big server in the cloud?
author: Baron Schwartz
layout: post
permalink: /2011/06/10/when-can-i-have-a-big-server-in-the-cloud/
categories:
  - High Availability
  - Scalability
  - SQL
tags:
  - Cloud Computing
---
I was at a conference recently talking with a Major Cloud Hosting Provider and mentioned that for database servers, I really want large instances, quite a bit larger than the largest I can get now. The lack of cloud servers with lots of memory, many *fast* cores, and fast I/O and network performance leads to premature sharding, which is costly. A large number of applications can currently run on a single real server, but would require sharding to run in any of the popular cloud providers&#8217; environments. And many of those applications aren&#8217;t growing rapidly, so by the time they outgrow today&#8217;s hardware we can pretty much count on simply upgrading and staying on a single machine.

The person I was talking to actually seemed to become angry at me, and basically called me an idiot. This person&#8217;s opinion is that no one should be running on anything larger than 4GB of memory, and anyone who doesn&#8217;t build their system to be sharded and massively horizontally scaled is clueless.

I&#8217;ve received similar push-back from a lot of cloud hosting providers. When I work through the math with clients, a lot of them don&#8217;t like the ultimate price/performance ratio offered by cloud hosting. Hype doesn&#8217;t drive everyone&#8217;s business decisions, so a lot of people are wisely staying far away from cloud hosting for their applications, or even moving whole applications out of cloud hosting into real hardware to consolidate machines and save a lot of money. Some of them are using flash storage devices such as Fusion-io to further lower their TCO (this isn&#8217;t the right answer for every app, though).

Why do cloud hosting providers work so hard to make everyone buy lots of anemic machines and shard their applications an order of magnitude more than is required? Why aren&#8217;t they jumping to offer really beefy instances? I think there are a couple of simple reasons.

First, they want to colocate virtual machines and over-provision, just as airlines sell more tickets than there are seats in the plane. It&#8217;s a numbers game: sell more capacity than you really have, and bet on some of the instances not using all resources allocated to them. Win! Of course, this is only possible with lots of small instances; the law of large numbers doesn&#8217;t work without lots of instances, and large instances can&#8217;t be colocated. Cloud providers tend to dislike dedicated instances, which leads to the second reason. They don&#8217;t want to make strong claims about the availability of any particular machine. This is where the cloud paradigm of &#8220;you must build to recover from machines vanishing without warning&#8221; comes from. A dedicated beefy instance wouldn&#8217;t let the hosting provider push that responsibility onto the application.

There are lots more reasons &#8212; all of them combining into one big overall &#8220;cloud application architecture best practice&#8221; &#8212; but I think those are two of the showstoppers.

I really think this is a wrong paradigm. People talk about the cloud being the technology of the future, but in many ways it&#8217;s pretty stone-age compared to what smart system architects can achieve with high-quality hardware and networking at a much lower cost, with very strong guarantees of performance, consistency, and availability.

Cloud computing is new enough that we don&#8217;t understand, in a collective sense, how to think about it. (I know that lots of individuals do, but as a whole, there isn&#8217;t much of a shared understanding.) The real value proposition that I want to see emerge from cloud computing is pretty much orthogonal to what everyone&#8217;s raving about these days. I want to see the DevOps engineering discipline build momentum around the idea that systems should be treated as services, with architectural components provisioned and controlled through APIs. That can be done completely independently of many of the characteristics of current cloud computing platforms (virtualization, ephemerality, horizontally scaled architectures&#8230;)

And like most people, I&#8217;ve got an ego and I don&#8217;t appreciate repeatedly being called a moron by cloud computing providers&#8217; sales people, who don&#8217;t know anything about running database servers. I can do math and understand price/performance, and I know the cost and difficulty of building a sharded application. I look forward to the day when I don&#8217;t have to just bite my tongue and walk on to the next booth. I look forward to cloud hosting providers advancing to the year 2005 or so. I&#8217;m sure it will happen as we figure this all out.

Feel free to comment, but don&#8217;t expect me to approve your comment if you&#8217;re from a cloud provider and you&#8217;re plugging your platform :)