---
title: 'What&#8217;s wrong with MMM?'
author: Baron Schwartz
layout: post
permalink: /2011/05/04/whats-wrong-with-mmm/
categories:
  - Coding
  - High Availability
  - SQL
  - Tools
---
I am not a fan of the MMM tool for managing MySQL replication. This is a topic of vigorous debate among different people, and even within Percona not everyone feels the same way, which is why I&#8217;m posting it here instead of on an official Percona blog. There is room for legitimate differences of opinion, and my opinion is just my opinion. Nonetheless, I think it&#8217;s important to share, because a lot of people think of MMM as a high availability tool, and that&#8217;s not a decision to take lightly. At some point I just have to step off the treadmill and write a blog post to create awareness of what I see as a really bad situation that needs to be stopped.

I like software that is well documented and formally tested. A lot of software is usable even if it isn&#8217;t created by perfectionists. But there are two major things in the MySQL world for which I think we can all agree we need strong guarantees of correctness. One is backups. The other is High Availability (HA) tools. And this leads me to my position on MMM.

MMM is 1) fundamentally broken and unsuitable for use as a HA tool, and 2) absolutely cannot be fixed. I&#8217;ll take that in two parts.

First, it&#8217;s broken and untrustworthy. I could go into the technical details of why MMM is broken at the architectural and implementation level. I could talk about the way that it uses a distributed set of agents, which do not have a reliable communications channel, all maintain their own state which is not communicated or agreed upon across nodes, and don&#8217;t even share configuration. I could talk about the fact that MMM itself can&#8217;t be made HA or redundant &#8212; you can only have a single instance of it.

I could talk about lots of things, but you can argue with every one of those assertions. You can&#8217;t argue with the list of failures I&#8217;ve personally seen. It fails over with no reason when nothing is wrong &#8212; and botches it up, causing the entire replication cluster to get out of sync and break. It tries to fail over when something actually is wrong with the cluster, but it does things out of order and with no synchronization amongst the agents, leading to chaos. It can&#8217;t handle anything unexpected, such as the ordinary kinds of network, disk, etc failures you&#8217;d expect in systems that have something wrong (which is exactly when an HA tool is supposed to function). It doesn&#8217;t protect itself against the human doing something wrong, such as mixing up the agent configuration on different hosts. There are many bizarre ways MMM can fail, but these are all theoretical &#8212; until you witness them. I&#8217;ve witnessed them, and new customer cases on MMM failures are filed on a regular basis. Here&#8217;s one:

> In the recent past, we have had a couple of bad experiences with mmm-monitor tool which broke replication and brought our website down for a few hours.

And another:

> We have recently started testing MMM for MySQL and when using it under write load we have been experiencing &#8216;Duplicate entry&#8217; (1062) errors.

In short, MMM causes more downtime than it prevents. It&#8217;s a Low-Availability tool, not a High-Availability tool. It only takes one really good serious system-wide mess to take you down for a couple of days, working 24&#215;7 trying to scrape your data off the walls and put it back into the server. MMM brings new meaning to the term &#8220;cluster-f__k&#8221;.

Now, why isn&#8217;t it possible to fix it? One simple reason: MMM is completely untested and untestable. Change one line of code in Agent.pm&#8217;s master control flow and tell me that you&#8217;re confident that you know what it has just done to the whole system? You can&#8217;t do it. If you don&#8217;t have tests, you can&#8217;t change the code with confidence, period. And as I said before, HA and backup tools are where we need a zero-tolerance policy. &#8220;I think this fixed the bug&#8221; or &#8220;I think it&#8217;s safe to change this code&#8221; are not acceptable. I have seen a lot of bug fixes that cause new and interesting bugs. I appreciate the variety &#8212; life is boring if all we&#8217;re doing is seeing the same old bugs &#8212; but this isn&#8217;t what we need in an HA tool.

In order to fix MMM, it has to be completely rewritten from scratch. Among other things, decisions and actions need to be completely separated. Then the decisions can be verified with a test suite, and the actions can be verified independently. But if you do that, you don&#8217;t have MMM anymore, you have a new tool. Therefore MMM can&#8217;t be fixed, it can only be thrown out and reimplemented.

Note that I&#8217;m not claiming that MMM was developed by bad programmers or that it is bad quality. I am only claiming that a) it demonstrably doesn&#8217;t work correctly, and b) it can&#8217;t be fixed without a rigorous test suite, which can&#8217;t be added to it without a complete reimplementation.

I will go further and claim that the architecture of MMM is fundamentally unreliable, and it isn&#8217;t a good idea to reimplement it (it&#8217;s already been done once!). This we could argue for a long time, but I know of so many better architectures that I wouldn&#8217;t entertain the notion of building a new tool with the same architecture.

I have seen a number of people reach the same conclusions and then implement new systems in the same general vein as MMM, with a limited set of functionality to avoid some of the problems. For instance, Flipper is a single tool with no agents, so that&#8217;s an improvement. Unfortunately, these tools all suffer from the same problem: they aren&#8217;t formally tested. I simply can&#8217;t accept that in an HA tool.

If I&#8217;m such a perfectionist, why haven&#8217;t I built a tool that solves this problem? I have a limited amount of time, and at some point, I don&#8217;t do things for free. I&#8217;ve had multiple conversations that go like this: &#8220;My last replication downtime incident cost me $75k. I can&#8217;t let that happen again. What will it cost to build a correct solution? No way &#8212; I can&#8217;t pay $20k for a high availability tool that really works.&#8221;

There is active development on something related that I can&#8217;t talk much about now. But if you want, you can come to [Percona Live][1] and be among the first to find out.

 [1]: http://www.percona.com/live/