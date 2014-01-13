---
title: "Don't change a constant variable"
date: "2006-01-06"
url: /blog/2006/01/06/easy-solutions/
categories:
    - Programming
---
A company for whom I have done some coding advertises their years of service on their website. Every year after the New Year, someone notices the dates are out of whack, sends around an email and it has to be fixed. It's not quite hard-coded, if that's what you're thinking. It's just that the wrong thing is hard-coded in the website's configuration file, `Config.asp`:

<pre>Const YearsOfService = 31</pre>

I've seen someone update that variable literally every year I've been involved with the company in question. Today it happened again:

<pre>Const YearsOfService = 32</pre>

A moment's thought shows there is something wrong with this code. `YearsOfService` cannot possibly be a constant, right? Unless it's posthumous and the company will never add another year of service. The issue is that we're holding the wrong data constant: the real constant, which will not change (hence the name) is the year the company began offering service.

I proposed the following code:

<pre>YearsOfService = DateDiff("YYYY", "1/1/1974", Now())</pre>

I got the terse reply "Go for it." Of course I did. Why is this so hard? I can see missing the obvious once, but year after year after year? In a team of six or seven people? How can you explain everyone missing it time after time? I don't get it. This is really, really easy. Even if you postulate that it takes a deep thinker to notice the incongruence about a "constant" that has to be updated, it doesn't take a genius to notice a pattern after you do something really simple a number of times.

I really want to wrap this post up by saying "it only seems easy, but there's a factor that's not obvious, which explains the whole thing." But I can't. I don't see any such factor. If you were hoping for some insight, sorry, I can't offer it. \*sigh\*
