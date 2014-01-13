---
title: Automatically detecting abnormal behavior in MySQL
date: "2011-12-01"
permalink: /blog/2011/12/01/automatically-detecting-abnormal-behavior-in-mysql/
categories:
  - Databases
---
Over the course of years, I have observed that the three most sensitive indicators of MySQL having a server lockup are the queries per second, number of connections, and number of queries running. Here is a chart of those three on a production system. Find the bad spot:

[<img src="http://www.xaprb.com/blog/wp-content/uploads/2011/12/qps-connections-running.png" alt="" title="qps-connections-running" width="513" height="324" class="size-full wp-image-2541" />][1]

I am currently working on developing an automated system that detects abnormal behavior in these three metrics, but doesn't require any a priori inputs or thresholds, e.g. you don't have to tell it "more than X is bad." (It could be that during a low period of the day, X is different than during the peak load.)

It turns out that this is hard to do reliably, without a lot of false positives and without false negatives (not triggering during an incident). If there is existing literature on the mathematical techniques to do this, I'd be interested in not reinventing the wheel. Does anyone have references to share?

 [1]: http://www.xaprb.com/blog/wp-content/uploads/2011/12/qps-connections-running.png
