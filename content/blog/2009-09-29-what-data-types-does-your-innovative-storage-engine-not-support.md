---
title: What data types does your innovative storage engine NOT support?
permalink: /2009/09/29/what-data-types-does-your-innovative-storage-engine-not-support/
categories:
  - SQL
tags:
  - data types
  - Infobright
  - MySQL
  - storage engines
---
I've been investigating a few different storage engines for MySQL lately, and something I've noticed is that they all list what they support, but they generally don't say what they don't support. For example, Infobright's documentation shows [a list of every data type supported][1]. What's missing? Hmm, I don't see BLOB, BIT, ENUM, SET&#8230; it's kind of hard to tell. The same thing is true of the list of functions that are optimized inside Infobright's own code instead of at the server layer. I can see what's optimized, but I can't see whether FUNC_WHATEVER() is optimized without scanning the page &#8212; and there's no list of un-optimized functions.

I don't mean to pick on Infobright. I've recently looked at another third-party storage engine and they did exactly the same thing. It's just that the docs I saw weren't public as far as I know, so I can't mention them by name. XtraDB's documentation falls short too, of course, although it's pretty well understood that it is very similar to InnoDB.

For a product like this, I think the most helpful thing would be a page explaining two things: 1) the enhancements or extra functionality over the standard MySQL server, and 2) the unavailable or degraded functionality. It would also be good to have both high-level and detailed versions of this.

 [1]: http://www.infobright.org/wiki/Supported_Data_Types_and_Values/
