---
title: Why would anyone use a 32-bit OS in 2012?
date: "2012-10-24"
permalink: /2012/10/24/why-would-anyone-use-a-32-bit-os-in-2012/
categories:
  - SQL
---
I've been browsing some mailing lists and so on (it doesn't matter which ones) and came across the Great 32-Bit Debate afresh. The debate always starts with someone saying "I need 32-bit support" or "this doesn't work on 32-bit systems," and someone else raising an objection to that, saying that nobody uses 32-bit systems anymore and anyone who does is doing something wrong.

Why would anyone use a 32-bit OS in the year 2012? I can think of a few very good reasons.

1.  The universe isn't wholly x86_64 yet; there's still ARM and other non-server systems.
2.  Developer laptops often run 32-bit operating systems, especially when Linux is the developer's preference, because it works better with a lot of proprietary software such as Flash and audio drivers, and generally causes a lot less user headache. This is especially relevant because Ubuntu, Fedora, and other popular distributions are targeted towards 32-bit. My experience is that they just don't work as well in 64-bit versions. Besides, if my laptop has only 4GB of RAM (I've never had one with more than that), there's no benefit at all to 64-bit in any case.
3.  A cost-conscious person may very well spin up one of the smaller EC2 instances for lightweight jobs, and those are 32-bit. Many other cloud hosting providers follow the same pattern: getting a 64-bit instance is more expensive.

How is this relevant to MySQL? For a while some of the MySQL forks weren't available for 32-bit systems. It reminded me that a surprising number of people will use a product in edge-case ways, and failing to serve minorities ends up excluding the majority.
