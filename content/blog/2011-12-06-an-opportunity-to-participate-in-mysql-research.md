---
title: An opportunity to participate in MySQL research
permalink: /2011/12/06/an-opportunity-to-participate-in-mysql-research/
categories:
  - SQL
---
I'm researching algorithms for automatic fault detection in MySQL (see [my previous post][1] for context). I need real-world data samples to test the algorithm. Can you help by sending me a bit of data from your production server?

The end goal is an open-source tool that will be a standard part of a typical MySQL installation. The problem I'm trying to solve for all MySQL users is this: something went wrong, what was it? Most of the time there's no way to answer that; you have to set up a set of tools and hope you capture enough information to diagnose the problem next time. We need a tool that just runs all the time even when you don't think anything is going to go wrong.

You can help build this tool. I need samples from a wide variety of healthy and sick servers, both heavily and lightly loaded. I need samples that are between a few hours and a week or so long. Here is a script that will gather what I need:

`<pre>$ mysqladmin ext -i1 | awk '
	/Queries/{q=$4-qp;qp=$4}
	/Threads_connected/{tc=$4}
	/Threads_running/{print q, tc, $4}'</pre>` 
The output should look something like this:

`<pre>2147483647   136     7
  798   136     7
  767   134     9
  828   134     7
  683   134     7
  784   135     7
  614   134     7
  108   134    24
  187   134    31
  179   134    28
 1179   134     7
 1151   134     7
 1240   135     7
 1000   135     7</pre>` 
Please save this output to a file, and contact me at moc.brpax@norab (reversed) if you would like to offer a dataset for us to test on. If you need any help setting up the data collection, you can use the same email. I'd also appreciate if you'd help spread the word about this via Twitter or other means. Thanks very much!

 [1]: http://www.xaprb.com/blog/2011/12/01/automatically-detecting-abnormal-behavior-in-mysql/ "Automatically detecting abnormal behavior in MySQL"
