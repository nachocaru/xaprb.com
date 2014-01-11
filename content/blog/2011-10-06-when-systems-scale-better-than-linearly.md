---
title: When systems scale better than linearly
author: Baron Schwartz
layout: post
permalink: /2011/10/06/when-systems-scale-better-than-linearly/
categories:
  - PostgreSQL
  - Scalability
  - SQL
---
I&#8217;ve been seeing a few occasions where [Neil J. Gunther&#8217;s][1] Universal Scalability Law doesn&#8217;t seem to model all of the important factors in a system as it scales. Models are only models, and they&#8217;re not the whole truth, so they never match reality perfectly. But there appear to be a small number of cases where systems can actually scale a bit better than linearly over a portion of the domain, due to what I&#8217;ve been calling an &#8220;economy of scale.&#8221; I believe that the Universal Scalability Law might need a third factor (seriality, coherency, and the new factor, economy of scale). I don&#8217;t think that the results I&#8217;m seeing can be modeled adequately with only two parameters.

Here are two publicly available cases that appear to demonstrate this phenomenon: Robert Haas&#8217;s recent blog post on PostgreSQL, titled [Scalability, in Graphical Form, Analyzed][2] and Mikael Ronstrom&#8217;s post from May on MySQL (NDB) Cluster, titled [Better than Linear Scaling is Possible][3].

Dr. Ronstrom&#8217;s post discusses the mechanics of the phenomenon, and speculates (I&#8217;m not sure it&#8217;s conclusive) that it is from a combination of partitioning and better use of CPU caches. Now someone needs to do the math to figure out how to include this factor into the equation.

The good thing about the Universal Scalability Law is how simple and applicable it is for many systems. It&#8217;s nice that this economy-of-scale factor seems to be unusual and the simpler model remains easy to apply for a large variety of tasks.

 [1]: http://www.perfdynamics.com/
 [2]: http://rhaas.blogspot.com/2011/09/scalability-in-graphical-form-analyzed.html
 [3]: http://mikaelronstrom.blogspot.com/2011/05/better-than-linear-scaling-is-possible.html