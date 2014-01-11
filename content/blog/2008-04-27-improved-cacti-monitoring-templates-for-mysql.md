---
title: Improved Cacti monitoring templates for MySQL
author: Baron Schwartz
layout: post
permalink: /2008/04/27/improved-cacti-monitoring-templates-for-mysql/
categories:
  - SQL
tags:
  - Alexey Kovyrin
  - Cacti
  - Cacti templates
  - graphing
  - monitoring
  - MySQL
  - Rimm Kaufman Group
---
<p class="download">
  <a href="http://code.google.com/p/mysql-cacti-templates/">Download MySQL Cacti templates</a>
</p>

As promised, I&#8217;ve created some improved software for monitoring MySQL via [Cacti][1]. I began using the [de facto MySQL Cacti templates][2] a while ago, but found some things I needed to improve about them. As time passed, I rewrote everything from scratch. The resulting templates are much improved.

You can grab the templates by browsing the source repository on the project&#8217;s homepage.

In no particular order, here are some things I improved:

*   Standard polling interval and graph size by default.
*   Full captions on every graph; you don&#8217;t have to guess at how big the values are. Each graph has current, max, and average values printed at the bottom for every value on it.
*   Much more data is captured. I&#8217;ve graphed almost everything I could think of.
*   The graphs are grouped better. Most graphs have only related values. There are some exceptions, but not many.
*   The templates don&#8217;t hijack your existing installation. They don&#8217;t depend on or alter anything in your default Cacti installation.
*   The script that gathers the data is totally rewritten from scratch, and much improved. For example, [the math works on 32-bit systems][3]. It has caching built-in so [each poll cycle results in just one request to the server, instead of one request per graph][4]. (This is a weakness of Cacti I&#8217;m trying to work around). It also has debugging aids and other good coding stuff.
*   By default, it assumes you have the same username and password across every server you&#8217;re monitoring, so you don&#8217;t have to fill in a username and password for every single graph you create.
*   One data template == one graph template. This helps work around another Cacti limitation.
*   Lots more. Honestly I can&#8217;t really remember everything I&#8217;ve done. I&#8217;m sure you&#8217;ll help me remember by asking me how to get X feature working the way you want, and I&#8217;ll go &#8220;oh, yeah, that&#8217;s another thing I improved&#8230;&#8221;

Cacti templates are very laborious to create if they&#8217;re complex at all; it takes a long time and is very error-prone. Instead of doing it through Cacti&#8217;s web interface and exporting a huge XML file, I eliminated the redundancies and created a small, easy-to-maintain file from which I generate the XML template with a Perl script. This gives the added benefit of letting me (or you) generate templates with different parameters such as polling interval or graph size. The README file has the full details. However, I&#8217;ve pre-generated a set of templates that matches Cacti&#8217;s defaults, so you can probably just use that.

This has taken a lot of time. In particular, I spent a lot of time working on it at my former employer, [The Rimm-Kaufman Group][5] (kudos to them for letting me open-source the work) and I just spent most of my weekend writing the scripts to convert from the compact format to XML templates, so it&#8217;s possible to maintain these beasts. Plus I had to develop the compact format, too. This took a lot of time because I had to understand the Cacti data model, which is pretty complex.

**Please enter issue reports for bugs, feature requests, etc at the [Google project homepage][6], *not* in the comments of this blog post**. I do not look through comments on my blog when I&#8217;m trying to remember what I should be working on for a software project.

If these templates help you and you feel like [visiting my Amazon.com wishlist and sending something my way][7], I&#8217;d appreciate it!

<small>PS: You may also be interested in <a href="http://blog.kovyrin.net/2007/10/06/useful-cacti-templates-to-monitor-your-servers/">Alexey Kovyrin&#8217;s list of templates for monitoring servers</a>.</small>

 [1]: http://www.cacti.net/
 [2]: http://faemalia.net/mysqlUtils/
 [3]: http://www.mysqlperformanceblog.com/2007/03/27/integers-in-php-running-with-scissors-and-portability/
 [4]: http://forums.cacti.net/viewtopic.php?t=26448
 [5]: http://www.rimmkaufman.com
 [6]: http://code.google.com/p/mysql-cacti-templates/issues/list
 [7]: http://www.amazon.com/gp/registry/wishlist/LOE4ZUTKFU39