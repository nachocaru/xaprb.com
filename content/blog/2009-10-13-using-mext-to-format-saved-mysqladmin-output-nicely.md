---
title: Using mext to format saved mysqladmin output nicely
author: Baron Schwartz
layout: post
permalink: /2009/10/13/using-mext-to-format-saved-mysqladmin-output-nicely/
categories:
  - SQL
tags:
  - mext
---
I wrote a while ago about how [mext][1] works &#8212; it runs &#8220;mysqladmin extended-status&#8221; and formats it nicely. But what if you want to use it to format *saved* output that you&#8217;ve put into a file? It&#8217;s actually very easy. You can tell it what command-line to run to generate its input. By default you are probably going to tell it to run &#8220;mysqladmin ext -ri10&#8243; or something like that, but you can just as easily make it run &#8220;cat my-saved-output&#8221;.

Let&#8217;s see how this can be useful. Imagine I have a server that stalls every now and then, and I&#8217;ve set up mk-loadavg to watch for this and capture information about system activity with a script that contains

<pre>$ mysqladmin ext -c 30 -i1 > mysqladmin-output.txt</pre>

That&#8217;ll gather 30 samples one second apart. Now I&#8217;ll format it:

<pre>$ wget -q http://www.maatkit.org/mext
$ sh mext -r -- cat mysqladmin-output.txt | less -S
</pre>

I&#8217;m piping the output into less -S so that I can see unwrapped output. 30 samples of mysql status variables are going to be aligned in columns next to each other, so without the -S flag I&#8217;ll probably see something unhelpful.

If you have a hard time visualizing the above, go ahead and run the commands! It&#8217;ll take only a minute, and it&#8217;ll make a lot more sense to you then. This is a really useful way to summarize and understand what is going on (or has gone on) inside your MySQL server.

 [1]: http://www.xaprb.com/blog/2009/04/11/formatting-mysqladmin-extended-status-nicely/