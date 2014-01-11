---
title: SHOW PROCESSLIST in MySQL 5.6
author: Baron Schwartz
layout: post
permalink: /2012/10/11/show-processlist-in-mysql-5-6/
categories:
  - SQL
---
Mark Leith [writes][1] that it&#8217;s time to say goodbye to SHOW PROCESSLIST in MySQL 5.6, and use the Performance Schema replacement for it instead, because the older tools cause some blocking, and the Performance Schema replacement is completely non-blocking.

On the face of it that&#8217;s a good thing, but I wonder whether we&#8217;ll want to keep some blocking functionality around anyway. Inspecting systems that are doing concurrent work can be hard unless you can see a variety of views on them. One such is looking at the state of all the concurrent work at an instant in time. This is sometimes indispensable for troubleshooting: you will see causes and effects you&#8217;ll never see in counters and metrics, no matter how many you capture or how sophisticated the analysis.

I haven&#8217;t seen MySQL 5.6 in production usage yet, but I wonder: when I do, will the view of SHOW PROCESSLIST and the new Performance Schema tables look a little different? Will the non-blocking nature of the Performance Schema table lose the ability to capture and express specific types of system state at a single instant in time?

I don&#8217;t know, but I&#8217;m eager to find out. I have a feeling we&#8217;ll all spend the next couple of years really learning how to use the new capabilities in MySQL 5.6.

 [1]: http://www.markleith.co.uk/2012/07/13/monitoring-processes-with-performance-schema-in-mysql-5-6/