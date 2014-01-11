---
title: Aspersa, a new opensource toolkit
author: Baron Schwartz
layout: post
permalink: /2010/04/21/aspersa-a-new-opensource-toolkit/
categories:
  - Aspersa
  - Open Source
  - SQL
  - Sys Admin
  - Tools
---
Some of the utilities we were adding to [Maatkit][1] really did not belong there. Yes, this included some of the functionality in the now-retired mk-audit tool. We really learned a lesson about what it&#8217;s possible to support, design, spec, code, and test in a single tool.

I&#8217;ve moved those tools to a new project, [Aspersa][2]. Some folks are revolting and calling it Asparagus, because apparently that&#8217;s easier to say. Aspersa is the name of the common garden snail, which turns out to be a fascinating creature. It is also slow. Draw your own conclusions.

This project is more of a home for simple scripts and snippets &#8212; a simple place I can grab all the little utilities I use to make my life easy. There is a &#8220;summary&#8221; tool that largely replaces mk-audit&#8217;s functionality outside the database, and I plan to add a &#8220;mysql-summary&#8221; tool to summarize the database.

I don&#8217;t plan to make &#8220;releases.&#8221; You get the tools with wget directly from SVN trunk. There is no separate website, and little to no documentation, but there is a mailing list, and you&#8217;re invited to join and contribute.

 [1]: http://www.maatkit.org/
 [2]: http://code.google.com/p/aspersa/