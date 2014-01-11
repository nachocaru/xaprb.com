---
title: 'Using Go's auto-reconnecting MySQL client libraries'
author: Baron Schwartz
layout: post
permalink: /2012/11/01/using-gos-auto-reconnecting-mysql-client-libraries/
categories:
  - SQL
---
I've been doing a little bit of programming in Go recently, and really enjoying it. It's an awesome language with really solid libraries. It reminds me a lot of the .NET framework in that it's well-thought-out, but the Go language itself is a lot smaller, less formal, and a lot more expressive than I ever found C# to be. And that's saying a lot &#8212; C# was my previous favorite language, along with the occasional Java, C++, Python, JavaScript, and &#8212; gasp &#8212; Visual Basic 6. Go beats them all.

But I digress. I'm writing Go applications that talk to MySQL. Some of them talk to the database in read-only ways, and I just wanted to share this neat little nugget about the [MyMySQL client libraries][1] (pure-Go implementation; not a wrapper around a C library). One of its features, which you can enable optionally, is autorc. This stands for auto-reconnect to the server. It's done very smartly. In fact, you don't even have to connect at all; you just query the server, and the connection either opens or reopens. I've tested it and it's really working well.

This has removed a large pile of smelly code from my application. It's awesome. That's all, folks!

 [1]: https://github.com/ziutek/mymysql
