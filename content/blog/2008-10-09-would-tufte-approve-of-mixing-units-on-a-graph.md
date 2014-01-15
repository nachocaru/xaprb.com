---
title: Would Tufte approve of mixing units on a graph?
date: "2008-10-09"
url: /blog/2008/10/09/would-tufte-approve-of-mixing-units-on-a-graph/
categories:
  - Databases
  - Programming
---
I've created a set of [Cacti templates for graphing stats about MySQL][1]. While these were based on several other people's work, there are many improvements. One of them in particular I want to bring up, and I'll go so far as to say it ought to be a "best practice" for graphing. That is, don't mix units on a graph.

<!--more-->

In the simplest terms, this means that just because things are related doesn't mean they belong together. I made an effort to separate things onto different graphs when they have different units. For example, the query cache metrics don't all belong together. There are memory metrics, there are block metrics, and there are metrics about queries. If you jam them all together, the differences in the units will cause various graphs to obliterate each other. Some values are much larger than others, and that'll cause some values to be minuscule on the graph.

The graph templates that inspired me to create mine mashed them all together and then scaled things [logarithmically][2] to compensate for the resulting problems. This does not address the root of the matter. By contrast, my templates split them apart, so all the things whose unit is "query" are on one graph together. Then I looked at the remaining stats (units: blocks and units: bytes) and decided that in the interest of not having way too many graphs, I'd put them together. I'm still not sure this was a great idea, and I have a nagging Tufte voice in my head. Anyway, I tried to strike a balance in this specific case, but in general I kept things separate.

One of the great things about Cacti is that you can graph whatever you want. You can graph the temperature on your server's hard drives, or the Dow Jones Industrial Average, or whatever. So you can have a single graphing solution for your whole company's needs. By contrast, MySQL Enterprise Monitor is focused on a single purpose. So it should do a really good job at it, right? Actually, no, they get it wrong too -- they mix units. Here you can see exactly the effect I'm talking about; one value can obliterate the other. (You get points if you guess what's going on in this graph.)

<div id="attachment_608" class="wp-caption aligncenter" style="width: 310px">
  <a href="/media/2008/10/mysql-enterprise-monitor-query-cache.png"><img src="/media/2008/10/mysql-enterprise-monitor-query-cache-300x121.png" alt="MySQL Enterprise Monitor Query Cache Graph" title="mysql-enterprise-monitor-query-cache" width="300" height="121" class="size-medium wp-image-608" /></a><p class="wp-caption-text">
    MySQL Enterprise Monitor Query Cache Graph
  </p>
</div>

I've tried to make the Cacti templates for MySQL as useful as possible, and judging by the graphs I see on client sites (these templates are quite popular, independent of me or my employer) they do a pretty good job. There's still room for improvement, though. I'm adding more carefully selected bits of information into the graphs, and making them more robust to deal with bizarre errors that happen in real life. And of course, always finding new ways to work around the limitations of PHP and Cacti, both of which have their quirks.

Are there wishes you have for these graphs, too? If so, [submit an issue report on the Google Code project][3]. Just don't ask me to graph unrelated things together, OK?

PS: sometimes things with the same units are still much bigger or smaller than each other. That's why my templates always print out the values in numbers along the bottom of the graph, so you can see the magnitude of the values, not just look at the lines.

 [1]: http://code.google.com/p/mysql-cacti-templates/
 [2]: http://www.xkcd.com/485/
 [3]: http://code.google.com/p/mysql-cacti-templates/issues/list
