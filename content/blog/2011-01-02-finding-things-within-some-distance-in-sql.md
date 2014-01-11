---
title: Finding things within some distance in SQL
author: Baron Schwartz
layout: post
permalink: /2011/01/02/finding-things-within-some-distance-in-sql/
categories:
  - PostgreSQL
  - SQL
tags:
  - Geospatial Indexing
  - GIS
  - Great-Circle Formula
  - MBR
---
One of the query optimization scenarios I&#8217;ve seen a lot over the years is finding something within some distance from a point. For example, finding people within some distance of yourself, apartments in a radius from a postal code, and so on.

These queries usually use the great-circle formula. That might be because Google finds lots of pages claiming that this is the right way to do a radius search. &#8220;The earth is not flat!&#8221;, they all say. That&#8217;s true, but it doesn&#8217;t mean that the great-circle formula is a good approach. It&#8217;s usually a really bad approach, in fact. It&#8217;s needlessly precise for most things, not precise enough for others, and it&#8217;s an expensive query to execute; all the trig functions tend to eat a bunch of CPU, and make it impossible to use ordinary indexes. This is true for all of the databases I&#8217;ve used &#8212; MySQL, Postgres, and SQL Server.

The great-circle formula is needlessly precise for a few reasons:

1.  Within the radiuses I&#8217;ve usually seen, the earth **is** flat, or close enough that it doesn&#8217;t make a difference. Looking for an apartment within 25 miles of downtown? The error introduced by pretending that the earth is flat on such a small scale doesn&#8217;t matter. The Pythagorean theorem would work just as well.
2.  &#8220;Downtown&#8221; is not a point, it&#8217;s an area. Nobody is going to argue if you return search results that vary by a few miles, or even more.
3.  Nobody drives in a straight line from downtown to their apartment. People usually search within a physical radius as a proxy for &#8220;find me something conveniently close.&#8221; They don&#8217;t really expect the miles as-the-crow-flies to be a good proxy &#8212; it&#8217;s just one they&#8217;re used to. In reality, that apartment just across the river might be too far away from work, because you&#8217;d have to drive a long way to get to a bridge. (Unless you want to swim to the office every day, that is.)

In cases where you really do need precision, there&#8217;s a reasonable chance that the great-circle formula still isn&#8217;t right for you, because not only is the earth not flat, the earth isn&#8217;t a sphere either.

What&#8217;s the optimization I usually suggest? It&#8217;s usually perfectly acceptable to just return results within a square centered on the point of interest. In most cases, the results will be just as satisfactory to the users. The remainder are usually very special cases.