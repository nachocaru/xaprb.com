---
title: Stored procedure debugging in MySQL
author: Baron Schwartz
layout: post
permalink: /2012/11/01/stored-procedure-debugging-in-mysql/
categories:
  - SQL
---
I was just skimming through the latest &#8220;Meet the Experts&#8221; podcast from Oracle, whose topic is [debugging stored routines in MySQL][1]. The tl;dr (tl;dl?) version is if you&#8217;re working with Windows and .NET, you can install a Visual Studio plugin that lets you debug stored routines in the server via the .NET connection libraries. That&#8217;s pretty nice, for those who are using that platform. The podcast is only a few minutes, so if you&#8217;re interested, by all means listen to it, or take a look at the [documentation][2].

The ideal way to debug stored routines would be an API in the server, but that doesn&#8217;t exist. Nevertheless, I remembered having seen some sort-of implementations of debugging at times in the past. My memory was that they used some workarounds to inject debugging code into the routines, using some things like special tables to communicate the values of variables and so on. I searched my quick-snippets file and did a brief web search, and turned up a lot more options than I remembered! In addition to the feature explained in the Oracle podcast, these products also offer stored procedure debugging of one type or another:

*   [Hopper][3] ([beta demo][4])
*   [The Illatis Stepin][5] plugin for Eclipse
*   [MyDebugger][6]
*   [Devart dbForge][7]
*   And, if you want to do it yourself, here&#8217;s a pretty thorough walk-through from [BlueGecko][8]

I haven&#8217;t used any of the above, and I&#8217;m not endorsing them, but I thought it might be helpful to have a list in one place. Did I miss any? Please add more information in the comments.

 [1]: http://sqlhjalp.blogspot.com/2012/11/debugging-stored-routines-in-mysql.html
 [2]: http://dev.mysql.com/doc/refman/5.5/en/connector-net-visual-studio-debugger.html
 [3]: http://www.upscene.com/products.hopper.index.php
 [4]: http://www.upscene.com/products/hopper/demos/hopper_mysql_beta1.htm
 [5]: http://marketplace.eclipse.org/content/illatis-stepin-debugger-mysql-procedures
 [6]: http://mydebugger.com/
 [7]: http://www.devart.com/dbforge/mysql/studio/demostutorials/debugging.html#debugging
 [8]: http://www.bluegecko.net/mysql/debugging-stored-procedures/