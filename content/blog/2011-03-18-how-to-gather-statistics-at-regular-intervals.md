---
title: How to gather statistics at regular intervals
date: "2011-03-18"
permalink: /2011/03/18/how-to-gather-statistics-at-regular-intervals/
categories:
  - Operations
  - Programming
---
I gather a lot of statistics such as performance data. Sometimes I have multiple things going on a system and I want to be able to align and compare the resulting data from multiple processes later. That means they need to be aligned on time intervals. Here is a naive way to gather stats at intervals:

<pre>while sleep 1; do gather-some-stats; done
</pre>

There are two problems: each iteration will take longer than a second, so there will be drift; and the iterations will not be aligned exactly on the clock ticks, so the data isn't as easy to correlate with other samples. This becomes a bigger problem when there are many such jobs gathering data at longer intervals such as 15 seconds or 5 minutes, where the lack of correlation between samples can be frustrating.

Here is what I've been doing recently. Is there a better way?

<pre>INTERVAL=1
while true; do
   sleep=$(date +%s.%N | awk "{print $INTERVAL - (\$1 % $INTERVAL)}")
   sleep $sleep
   gather-some-stats
done
</pre>
