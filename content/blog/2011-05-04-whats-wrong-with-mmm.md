---
title: "What's wrong with MMM?"
author: Baron Schwartz
layout: post
permalink: /2011/05/04/whats-wrong-with-mmm/
categories:
  - Coding
  - High Availability
  - SQL
  - Tools
---
I am not a fan of the MMM tool for managing MySQL replication. This is a topic of vigorous debate among different people, and even within Percona not everyone feels the same way, which is why I'm posting it here instead of on an official Percona blog. There is room for legitimate differences of opinion, and my opinion is just my opinion. Nonetheless, I think it's important to share, because a lot of people think of MMM as a high availability tool, and that's not a decision to take lightly. At some point I just have to step off the treadmill and write a blog post to create awareness of what I see as a really bad situation that needs to be stopped.

I like software that is well documented and formally tested. A lot of software is usable even if it isn't created by perfectionists. But there are two major things in the MySQL world for which I think we can all agree we need strong guarantees of correctness. One is backups. The other is High Availability (HA) tools. And this leads me to my position on MMM.

MMM is 1) fundamentally broken and unsuitable for use as a HA tool, and 2) absolutely cannot be fixed. I'll take that in two parts.

First, it's broken and untrustworthy. I could go into the technical details of why MMM is broken at the architectural and implementation level. I could talk about the way that it uses a distributed set of agents, which do not have a reliable communications channel, all maintain their own state which is not communicated or agreed upon across nodes, and don't even share configuration. I could talk about the fact that MMM itself can't be made HA or redundant &#8212; you can only have a single instance of it.

I could talk about lots of things, but you can argue with every one of those assertions. You can't argue with the list of failures I've personally seen. It fails over with no reason when nothing is wrong &#8212; and botches it up, causing the entire replication cluster to get out of sync and break. It tries to fail over when something actually is wrong with the cluster, but it does things out of order and with no synchronization amongst the agents, leading to chaos. It can't handle anything unexpected, such as the ordinary kinds of network, disk, etc failures you'd expect in systems that have something wrong (which is exactly when an HA tool is supposed to function). It doesn't protect itself against the human doing something wrong, such as mixing up the agent configuration on different hosts. There are many bizarre ways MMM can fail, but these are all theoretical &#8212; until you witness them. I've witnessed them, and new customer cases on MMM failures are filed on a regular basis. Here's one:

> In the recent past, we have had a couple of bad experiences with mmm-monitor tool which broke replication and brought our website down for a few hours.

And another:

> We have recently started testing MMM for MySQL and when using it under write load we have been experiencing 'Duplicate entry' (1062) errors.

In short, MMM causes more downtime than it prevents. It's a Low-Availability tool, not a High-Availability tool. It only takes one really good serious system-wide mess to take you down for a couple of days, working 24&#215;7 trying to scrape your data off the walls and put it back into the server. MMM brings new meaning to the term "cluster-f__k".

Now, why isn't it possible to fix it? One simple reason: MMM is completely untested and untestable. Change one line of code in Agent.pm's master control flow and tell me that you're confident that you know what it has just done to the whole system? You can't do it. If you don't have tests, you can't change the code with confidence, period. And as I said before, HA and backup tools are where we need a zero-tolerance policy. "I think this fixed the bug" or "I think it's safe to change this code" are not acceptable. I have seen a lot of bug fixes that cause new and interesting bugs. I appreciate the variety &#8212; life is boring if all we're doing is seeing the same old bugs &#8212; but this isn't what we need in an HA tool.

In order to fix MMM, it has to be completely rewritten from scratch. Among other things, decisions and actions need to be completely separated. Then the decisions can be verified with a test suite, and the actions can be verified independently. But if you do that, you don't have MMM anymore, you have a new tool. Therefore MMM can't be fixed, it can only be thrown out and reimplemented.

Note that I'm not claiming that MMM was developed by bad programmers or that it is bad quality. I am only claiming that a) it demonstrably doesn't work correctly, and b) it can't be fixed without a rigorous test suite, which can't be added to it without a complete reimplementation.

I will go further and claim that the architecture of MMM is fundamentally unreliable, and it isn't a good idea to reimplement it (it's already been done once!). This we could argue for a long time, but I know of so many better architectures that I wouldn't entertain the notion of building a new tool with the same architecture.

I have seen a number of people reach the same conclusions and then implement new systems in the same general vein as MMM, with a limited set of functionality to avoid some of the problems. For instance, Flipper is a single tool with no agents, so that's an improvement. Unfortunately, these tools all suffer from the same problem: they aren't formally tested. I simply can't accept that in an HA tool.

If I'm such a perfectionist, why haven't I built a tool that solves this problem? I have a limited amount of time, and at some point, I don't do things for free. I've had multiple conversations that go like this: "My last replication downtime incident cost me $75k. I can't let that happen again. What will it cost to build a correct solution? No way &#8212; I can't pay $20k for a high availability tool that really works."

There is active development on something related that I can't talk much about now. But if you want, you can come to [Percona Live][1] and be among the first to find out.

 [1]: http://www.percona.com/live/
