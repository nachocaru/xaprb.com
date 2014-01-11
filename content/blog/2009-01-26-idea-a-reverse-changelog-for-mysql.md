---
title: 'Idea: a reverse changelog for MySQL'
author: Baron Schwartz
layout: post
permalink: /2009/01/26/idea-a-reverse-changelog-for-mysql/
categories:
  - SQL
tags:
  - MySQL
---
Most software changelogs list what&#8217;s changed and what bugs are fixed during each upgrade. But when you&#8217;re evaluating an upgrade, what you&#8217;re typically concerned about is slightly different &#8212; it&#8217;s a combination of what&#8217;s changed and what might have broken. The fixed bugs aren&#8217;t as important for most people, who are either using a workaround or aren&#8217;t using the software. What people ask is &#8220;what do I have to change in my application, and/or make sure I&#8217;m not going to run afoul of, in order to use this new version?&#8221;

One of the interesting things about this is that you don&#8217;t know until sometime in the future, and it&#8217;s never a finished process. So as you look back from each new version, you have more information about the older versions. You see bugs that were fixed, and weren&#8217;t known when an older version was released, but which affected that version. So a &#8220;20/20 hindsight changelog&#8221; is going to be an evolving thing.

Such a changelog might say something like &#8220;when upgrading to 5.0.45, watch out for [broken tmpdir handling][1]; upgrade to at least 5.0.48 to avoid this bug.&#8221; Yes, this is necessarily a pessimistic look at the server, but people who are responsible for mission-critical server deployments are typically pretty conservative, and the good ones focus actively on identifying and managing risks. So it&#8217;s a good kind of pessimism.

 [1]: http://bugs.mysql.com/bug.php?id=30287