---
title: Version 0.1.149 of innotop released
date: "2006-09-05"
permalink: /2006/09/05/version-01149-of-innotop-released/
categories:
  - Databases
  - Open Source
---
Version 0.1.149 of the innotop MySQL and InnoDB monitor is a major upgrade. As of this version I'm declaring innotop "stable," meaning I've put some work into making it deal with unexpected input. It should be very resistant to any sort of crash now. You can [download innotop from its homepage][1].

I originally made it intolerant of unexpected input, because the output of `SHOW INNODB STATUS` varies so much and was never designed for parsability. Making it die when it couldn't parse something let me know there was a problem, but it caused many of you pain when you couldn't keep it running reliably. With this release I have switched my focus from research to stability.

Otherwise, there's not much new functionality since version 0.1.146.

If you experience crashes, that's a bug, and I'd love to hear about it. See [this article about what information I need][2] to debug and fix crashes.

 [1]: /innotop/
 [2]: http://www.xaprb.com/blog/2006/08/02/what-to-do-when-innotop-crashes/
