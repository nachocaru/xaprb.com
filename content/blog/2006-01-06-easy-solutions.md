---
title: 'Don&#8217;t change a constant variable'
author: Baron Schwartz
excerpt: '<p>If a variable is declared as constant, it should never change.  If it needs to be changed, something is wrong.</p>'
layout: post
permalink: /2006/01/06/easy-solutions/
---
A company for whom I have done some coding advertises their years of service on their website. Every year after the New Year, someone notices the dates are out of whack, sends around an email and it has to be fixed. It&#8217;s not quite hard-coded, if that&#8217;s what you&#8217;re thinking. It&#8217;s just that the wrong thing is hard-coded in the website&#8217;s configuration file, `Config.asp`:

<pre>Const YearsOfService = 31</pre>

I&#8217;ve seen someone update that variable literally every year I&#8217;ve been involved with the company in question. Today it happened again:

<pre>Const YearsOfService = 32</pre>

A moment&#8217;s thought shows there is something wrong with this code. `YearsOfService` cannot possibly be a constant, right? Unless it&#8217;s posthumous and the company will never add another year of service. The issue is that we&#8217;re holding the wrong data constant: the real constant, which will not change (hence the name) is the year the company began offering service.

I proposed the following code:

<pre>YearsOfService = DateDiff("YYYY", "1/1/1974", Now())</pre>

I got the terse reply &#8220;Go for it.&#8221; Of course I did. Why is this so hard? I can see missing the obvious once, but year after year after year? In a team of six or seven people? How can you explain everyone missing it time after time? I don&#8217;t get it. This is really, really easy. Even if you postulate that it takes a deep thinker to notice the incongruence about a &#8220;constant&#8221; that has to be updated, it doesn&#8217;t take a genius to notice a pattern after you do something really simple a number of times.

I really want to wrap this post up by saying &#8220;it only seems easy, but there&#8217;s a factor that&#8217;s not obvious, which explains the whole thing.&#8221; But I can&#8217;t. I don&#8217;t see any such factor. If you were hoping for some insight, sorry, I can&#8217;t offer it. \*sigh\*