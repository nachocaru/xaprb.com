---
title: JavaScript formatting library update
date: "2007-06-25"
permalink: /blog/2007/06/25/javascript-formatting-library-update/
---
This is a quick update on the state of my [JavaScript date formatting libraries][1] and date chooser, and [JavaScript number formatting library][2]. It's been a while since I wrote them, and as you can tell my interests have turned to many other things, but thet remain the [best JavaScript formatting and parsing libraries][3] I've seen.

I originally started this post in May of 2006, intending to use the libraries to demonstrate how HTML tables can contain multi-dimensional data, and use the seldom-used HTML elements like `TFOOT` to generate aggregate data about the table. This was going to be the follow-up to my [tables and data with CSS][4] post. I had a rough draft sketched out somewhere: a table full of numbers, dates, currencies and strings. A drop-down menu and a "format paintbrush" would let you reformat it all on the fly, and it would all be generated from semantic information attached to the table cells, not hard-coded into the page.

This was only practical because of the efficiency of my libraries; to reformat entire date regions in the table in real-time, for example, you'd need to parse the value as a date in one format, then reformat it for output in another. It was to be a showcase of how much efficiency matters for some things.

Tangent: I suppose it's less important for people who aren't still running 500MHz laptops these days, but efficiency really matters for me; a lot of these flashy sites these days simply take too much CPU for my little old computer to run well. I stubbornly resist getting a new computer because I cringe at the thought of the environmental cost, but I'm slowly breaking down; it's gotten to the point my battery won't charge, and Dell doesn't even have a record of my service tag anymore. Spare parts for these things are long since unavailable.

Now I'm involved with quite different things, since I'm working more in programming and less in the Internet space. The good news is others keep reading and using all of my work -- not just the recent work -- which makes me happy. Just the other day Liran Tal wrote to tell me he's using my Javascript libraries in the [Daloradius][5] project (check it out, it's pretty cool). The date-parsing library found its way into some [ExtJS tools that extend the YUI libraries][6], too.

And a few days ago someone [sponsored][7] an improvement to the [number-formatting libraries][8].

Who knows -- someday I may end up building some browser GUI systems again and use these. In the meantime it's encouraging that they remain useful to people.

*Note:* This episode is pre-recorded. I'm taking a short hiatus from blogging and will respond to your comments when I return.

 [1]: /blog/2005/12/20/javascript-date-parsing/
 [2]: /blog/2006/01/05/javascript-number-formatting/
 [3]: /blog/2006/05/14/javascript-date-formatting-benchmarks/
 [4]: /blog/2006/01/02/tables-and-data-part-1/
 [5]: http://sourceforge.net/projects/daloradius
 [6]: http://extjs.com/
 [7]: /donate/
 [8]: /blog/2007/06/19/javascript-number-formatting-library-updated/
