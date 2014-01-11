---
title: JavaScript formatting library update
author: Baron Schwartz
excerpt: |
  <p>This is a quick update on the state of my <a href="http://www.xaprb.comhttp://www.xaprb.com/blog/2005/12/20/javascript-date-parsing/">JavaScript date formatting libraries</a> and date chooser, and <a href="/blog/2006/01/05/javascript-number-formatting/">JavaScript number formatting library</a>.  It's been a while since I wrote them, and as you can tell my interests have turned to many other things, but thet remain the <a href="http://www.xaprb.com/blog/2006/05/14/javascript-date-formatting-benchmarks/">best JavaScript formatting and parsing libraries</a> I've seen.</p>
layout: post
permalink: /2007/06/25/javascript-formatting-library-update/
description:
  - High performance JavaScript date and number parsing and formatting libraries.
tags:
  - daloradius
  - date formatting
  - date parsing
  - extjs
  - html
  - Javascript
  - Liran Tal
  - number formatting
---
This is a quick update on the state of my [JavaScript date formatting libraries][1] and date chooser, and [JavaScript number formatting library][2]. It&#8217;s been a while since I wrote them, and as you can tell my interests have turned to many other things, but thet remain the [best JavaScript formatting and parsing libraries][3] I&#8217;ve seen.

I originally started this post in May of 2006, intending to use the libraries to demonstrate how HTML tables can contain multi-dimensional data, and use the seldom-used HTML elements like `TFOOT` to generate aggregate data about the table. This was going to be the follow-up to my [tables and data with CSS][4] post. I had a rough draft sketched out somewhere: a table full of numbers, dates, currencies and strings. A drop-down menu and a &#8220;format paintbrush&#8221; would let you reformat it all on the fly, and it would all be generated from semantic information attached to the table cells, not hard-coded into the page.

This was only practical because of the efficiency of my libraries; to reformat entire date regions in the table in real-time, for example, you&#8217;d need to parse the value as a date in one format, then reformat it for output in another. It was to be a showcase of how much efficiency matters for some things.

Tangent: I suppose it&#8217;s less important for people who aren&#8217;t still running 500MHz laptops these days, but efficiency really matters for me; a lot of these flashy sites these days simply take too much CPU for my little old computer to run well. I stubbornly resist getting a new computer because I cringe at the thought of the environmental cost, but I&#8217;m slowly breaking down; it&#8217;s gotten to the point my battery won&#8217;t charge, and Dell doesn&#8217;t even have a record of my service tag anymore. Spare parts for these things are long since unavailable.

Now I&#8217;m involved with quite different things, since I&#8217;m working more in programming and less in the Internet space. The good news is others keep reading and using all of my work &#8212; not just the recent work &#8212; which makes me happy. Just the other day Liran Tal wrote to tell me he&#8217;s using my Javascript libraries in the [Daloradius][5] project (check it out, it&#8217;s pretty cool). The date-parsing library found its way into some [ExtJS tools that extend the YUI libraries][6], too.

And a few days ago someone [sponsored][7] an improvement to the [number-formatting libraries][8].

Who knows &#8212; someday I may end up building some browser GUI systems again and use these. In the meantime it&#8217;s encouraging that they remain useful to people.

*Note:* This episode is pre-recorded. I&#8217;m taking a short hiatus from blogging and will respond to your comments when I return.

 [1]: /blog/2005/12/20/javascript-date-parsing/
 [2]: /blog/2006/01/05/javascript-number-formatting/
 [3]: /blog/2006/05/14/javascript-date-formatting-benchmarks/
 [4]: /blog/2006/01/02/tables-and-data-part-1/
 [5]: http://sourceforge.net/projects/daloradius
 [6]: http://extjs.com/
 [7]: /donate/
 [8]: /blog/2007/06/19/javascript-number-formatting-library-updated/