---
title: Using mext to format saved mysqladmin output nicely
permalink: /2009/10/13/using-mext-to-format-saved-mysqladmin-output-nicely/
categories:
  - SQL
tags:
  - mext
---
I wrote a while ago about how [mext][1] works &#8212; it runs "mysqladmin extended-status" and formats it nicely. But what if you want to use it to format *saved* output that you've put into a file? It's actually very easy. You can tell it what command-line to run to generate its input. By default you are probably going to tell it to run "mysqladmin ext -ri10&#8243; or something like that, but you can just as easily make it run "cat my-saved-output".

Let's see how this can be useful. Imagine I have a server that stalls every now and then, and I've set up mk-loadavg to watch for this and capture information about system activity with a script that contains

<pre>$ mysqladmin ext -c 30 -i1 > mysqladmin-output.txt</pre>

That'll gather 30 samples one second apart. Now I'll format it:

<pre>$ wget -q http://www.maatkit.org/mext
$ sh mext -r -- cat mysqladmin-output.txt | less -S
</pre>

I'm piping the output into less -S so that I can see unwrapped output. 30 samples of mysql status variables are going to be aligned in columns next to each other, so without the -S flag I'll probably see something unhelpful.

If you have a hard time visualizing the above, go ahead and run the commands! It'll take only a minute, and it'll make a lot more sense to you then. This is a really useful way to summarize and understand what is going on (or has gone on) inside your MySQL server.

 [1]: http://www.xaprb.com/blog/2009/04/11/formatting-mysqladmin-extended-status-nicely/
