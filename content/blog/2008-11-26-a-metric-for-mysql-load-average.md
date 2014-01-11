---
title: A metric for MySQL load average
author: Baron Schwartz
layout: post
permalink: /2008/11/26/a-metric-for-mysql-load-average/
categories:
  - SQL
tags:
  - loadavg
  - MySQL
  - Trevor Price
---
If you were to measure MySQL&#8217;s &#8220;loadavg,&#8221; how would you do it?

The following metric (in pseudocode) is borrowed from Trevor Price at [Aggregate Knowledge][1]. It&#8217;s a way to calculate average query response time. What do you think of it?

<pre>$start = microtime();
$status1 = SHOW GLOBAL STATUS LIKE Questions;
for ( 1 .. 100 ) {
   $num_running += SELECT COUNT(*) FROM SHOW PROCESSLIST WHERE Command = Query;
}
$time = microtime() - $start;
return 0 unless $time;
$status2 = SHOW GLOBAL STATUS LIKE Questions;
$qps = ($status2 - $status1) / $time;
return 0 unless $qps;
return ($num_running / 100) / $qps;
</pre>

If you do the dimensional analysis, if I&#8217;m not mistaken, it works. You get seconds. There are problems &#8212; for example, SHOW PROCESSLIST doesn&#8217;t show you what sampling theory predicts it will, for various reasons. What improvements can you suggest in order to solve the shortcomings? What other shortcomings do you see?

What other metrics can you suggest to get a dimensionless number that can give you an idea of the server&#8217;s load at a given time?

 [1]: http://www.aggregateknowledge.com/