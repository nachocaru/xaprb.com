---
title: Interesting findings about one of the Go database drivers for MySQL
author: Baron Schwartz
layout: post
permalink: /2012/12/28/interesting-findings-about-one-of-the-go-database-drivers-for-mysql/
categories:
  - SQL
---
Moral of the upcoming story: when your systems rely on someone else&#8217;s software, make sure you test it thoroughly to understand how it works.

I found a couple of interesting things about the [go-mysql-driver][1] driver for Go. One is that it prepares every query before executing it, and then closes it afterwards, if you&#8217;re just using the db.Query() or db.QueryRow() functionality. There is zero benefit to this; Bill Karwin has probably listed it as an antipattern somewhere. I asked for one query, but I got three.

The other is that it doesn&#8217;t open the database connection when you call db.Open(). You can call that function and get no error. The first query on the resulting &#8220;db&#8221; object will actually connect to MySQL. Thus it&#8217;s actually kind of like the other major opensource Go/MySQL driver ([mymysql][2]), which has an &#8220;autorc&#8221; interface that will automatically reconnect to the server. In normal usage, go-mysql-driver will reconnect more or less silently if you kill its connection to the server.

How did I discover these things? By tailing the general log, of course &#8212; and by running KILL on some connections. Good old-fashioned stuff. My manual version of [Chaos Monkey][3] :-)

I try to follow the principle of least surprise with my own software, but it&#8217;s good never to assume anything about anyone else&#8217;s.

 [1]: http://code.google.com/p/go-mysql-driver/
 [2]: https://github.com/ziutek/mymysql
 [3]: http://techblog.netflix.com/2012/07/chaos-monkey-released-into-wild.html