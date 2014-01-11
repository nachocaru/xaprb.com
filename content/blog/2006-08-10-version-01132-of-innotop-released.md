---
title: Version 0.1.132 of innotop released
author: Baron Schwartz
excerpt: |
  <p>I've released another version of the innotop MySQL and InnoDB monitor.  As always, you can <a href="http://www.xaprb.com/innotop/">download innotop from its homepage</a>.</p>
  
  <p>It's worth upgrading to this version not only because of the new features, but also because it should handle more special cases without crashing.  Of course, if it does crash, I appreciate your help fixing it; see <a href="http://www.xaprb.com/blog/2006/08/02/what-to-do-when-innotop-crashes/">this article about what information I need</a>.</p>
layout: post
permalink: /2006/08/10/version-01132-of-innotop-released/
description:
  - A new version of the innotop MySQL and InnoDB monitor is available.
---
I&#8217;ve released another version of the innotop MySQL and InnoDB monitor. As always, you can [download innotop from its homepage][1].

It&#8217;s worth upgrading to this version not only because of the new features, but also because it should handle more special cases without crashing. Of course, if it does crash, I appreciate your help fixing it; see [this article about what information I need][2].

Changes since version 0.1.123 include:

1.  Fixes to deal with older versions of Perl. Thanks to everyone who helped me find out what was wrong.
2.  Add &#8220;W&#8221; mode to display InnoDB locks.
3.  Add more information to various displays throughout.
4.  Handle special cases, and display more information, in InnoDB Deadlock mode.
5.  Tons and tons of tedious special-case parsing to handle InnoDB&#8217;s bewildering array of nearly unparseable messages about foreign key errors. After reading a lot of source code, I&#8217;ve decided that there are such a wide range of error messages even within one MySQL release, not to mention different ones in different versions, that I should stop focusing on this and work on other things for a bit. Note to anyone thinking of building anything like InnoDB, which outputs status text&#8230; please consider that someone may want to use a machine to read it someday (some of the InnoDB status text is even hard to figure out if you&#8217;re a human!) Parsability is not that hard to do, and it makes everything so much more useful. Not that I&#8217;m complaining :-)
6.  A lot more tests in the test suite&#8230; thanks to everyone who sent me dumps of `SHOW ENGINE INNODB STATUS`!
7.  Fix some minor issues with the innotop configuration file, especially when upgrading versions, and with the InnoDB statusbar display.
8.  Dozens of minor annoyances and little bugs that caused crashes.

I&#8217;ve gotten some good feedback from some of you &#8212; keep that coming! Not only do I like hearing how innotop helps you, but I appreciate feature requests and suggestions too.

The next thing I want to work on is some features to really analyze the information, instead of just dumping it all to the screen and letting you try to make sense of it. I&#8217;m planning to build some heuristics that will make suggestions like &#8220;your query cache isn&#8217;t very effective,&#8221; &#8220;you have a lot of table locks waited,&#8221; or so on. Again, if you have suggestions, let me know.

 [1]: http://www.xaprb.com/innotop/
 [2]: http://www.xaprb.com/blog/2006/08/02/what-to-do-when-innotop-crashes/