---
title: Analyze and optimize memcached usage with Maatkit
author: Baron Schwartz
layout: post
permalink: /2009/07/25/analyze-and-optimize-memcached-usage-with-maatkit/
categories:
  - Maatkit
  - PostgreSQL
  - SQL
tags:
  - memcached
  - Schooner
---
Ryan posted [an article on the MySQL Performance Blog][1] about how to use mk-query-digest to analyze and understand your memcached usage with the same techniques you use for MySQL query analysis. This is an idea that came to me during the 2009 MySQL Conference, while talking to our friends from [Schooner, who sell a memcached appliance][2].

It suddenly struck me that the science of memcached performance is basically nonexistent, from the standpoint of developers and architects. Everyone treats it as a magical tool that just performs well and doesn&#8217;t need to be analyzed, which is demonstrably and self-evidently false. memcached itself is very fast, true, so it doesn&#8217;t usually become a performance bottleneck the way a database server does. But that&#8217;s not the point. There is a lot to win or lose in the way you use it, which can heavily influence your application&#8217;s performance. That&#8217;s what the new features in mk-query-digest are designed to analyze.

Here&#8217;s an example of the types of problems we&#8217;ve seen in production memcached usage, which are very hard to catch without a good tool. What if a &#8220;global&#8221; value is accidentally stored with a key that includes the user ID? This will cause the value to be duplicated again and again for every user, instead of being stored once. There are really only two ways to catch this: 1) know the application&#8217;s source code inside and out, and 2) analyze the memcached traffic scientifically. (Even if you know the source code well, there&#8217;s a good chance you can miss a bug like this.) I could go on listing the types of problems you can inadvertently create with a key-value database, but I&#8217;ll leave it at that.

The features are only available in trunk, and will be released with this month&#8217;s scheduled release.

 [1]: http://www.mysqlperformanceblog.com/2009/07/24/maatkit-now-supports-memcached/
 [2]: http://www.schoonerinfotech.com/