---
title: "Idea: a reverse changelog for MySQL"
date: "2009-01-26"
permalink: /2009/01/26/idea-a-reverse-changelog-for-mysql/
categories:
  - SQL
---
Most software changelogs list what's changed and what bugs are fixed during each upgrade. But when you're evaluating an upgrade, what you're typically concerned about is slightly different &#8212; it's a combination of what's changed and what might have broken. The fixed bugs aren't as important for most people, who are either using a workaround or aren't using the software. What people ask is "what do I have to change in my application, and/or make sure I'm not going to run afoul of, in order to use this new version?"

One of the interesting things about this is that you don't know until sometime in the future, and it's never a finished process. So as you look back from each new version, you have more information about the older versions. You see bugs that were fixed, and weren't known when an older version was released, but which affected that version. So a "20/20 hindsight changelog" is going to be an evolving thing.

Such a changelog might say something like "when upgrading to 5.0.45, watch out for [broken tmpdir handling][1]; upgrade to at least 5.0.48 to avoid this bug." Yes, this is necessarily a pessimistic look at the server, but people who are responsible for mission-critical server deployments are typically pretty conservative, and the good ones focus actively on identifying and managing risks. So it's a good kind of pessimism.

 [1]: http://bugs.mysql.com/bug.php?id=30287
