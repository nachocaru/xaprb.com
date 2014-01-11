---
title: Why would anyone use a 32-bit OS in 2012?
author: Baron Schwartz
layout: post
permalink: /2012/10/24/why-would-anyone-use-a-32-bit-os-in-2012/
categories:
  - SQL
---
I&#8217;ve been browsing some mailing lists and so on (it doesn&#8217;t matter which ones) and came across the Great 32-Bit Debate afresh. The debate always starts with someone saying &#8220;I need 32-bit support&#8221; or &#8220;this doesn&#8217;t work on 32-bit systems,&#8221; and someone else raising an objection to that, saying that nobody uses 32-bit systems anymore and anyone who does is doing something wrong.

Why would anyone use a 32-bit OS in the year 2012? I can think of a few very good reasons.

1.  The universe isn&#8217;t wholly x86_64 yet; there&#8217;s still ARM and other non-server systems.
2.  Developer laptops often run 32-bit operating systems, especially when Linux is the developer&#8217;s preference, because it works better with a lot of proprietary software such as Flash and audio drivers, and generally causes a lot less user headache. This is especially relevant because Ubuntu, Fedora, and other popular distributions are targeted towards 32-bit. My experience is that they just don&#8217;t work as well in 64-bit versions. Besides, if my laptop has only 4GB of RAM (I&#8217;ve never had one with more than that), there&#8217;s no benefit at all to 64-bit in any case.
3.  A cost-conscious person may very well spin up one of the smaller EC2 instances for lightweight jobs, and those are 32-bit. Many other cloud hosting providers follow the same pattern: getting a 64-bit instance is more expensive.

How is this relevant to MySQL? For a while some of the MySQL forks weren&#8217;t available for 32-bit systems. It reminded me that a surprising number of people will use a product in edge-case ways, and failing to serve minorities ends up excluding the majority.