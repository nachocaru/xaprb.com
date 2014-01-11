---
title: Less is more
author: Baron Schwartz
excerpt: 'Simpler is often better.  The ability to decide quickly between two equivalent solutions is what sets expert programmers apart.'
layout: post
permalink: /2005/09/27/less-is-more/
---
Simpler is often better. The ability to decide quickly between two equivalent solutions is what sets expert programmers apart. It has been demonstrated over and over again that a) there is more than a tenfold difference in productivity between programmers, and b) there is absolutely zero correlation between speed and quality in programming. Choosing the best solution to a problem is an acquired skill that takes time and experience, but it takes something more as well: a certain mental attitude. A determination to get things *done* and get it *right*, and *fast*. I have observed this quality in the best programmers I've worked with. There is just no comparing them to ordinary key-pressers. They are in a totally different league. They know how to analyze a problem, figure out what's really needed, see several solutions, decide on one, and then use their tools to the absolute best effect *get it done* with no wasting around.

As an example of a problem that will stump duller minds, suppose you want to make sure there is exactly one space after each comma in this text:

> Choosing the best solution to a problem is an acquired skill that takes time and experience,but it takes something more as well: a certain mental attitude. A determination to get things done and get it right, and fast. I have observed this quality in the best programmers I've worked with. There is just no comparing them to ordinary key-pressers. They are in a totally different league. They know how to analyze a problem,figure out what's really needed, see several solutions, decide on one,and then use their tools to the absolute best effect get it done with no wasting around.
A novice's solution is to use the mouse and keyboard to insert spaces where needed. This is slow and error-prone. It is a terrible solution.

A narcissist uses a regular expression replacement to find a word, followed by a comma, followed by a word. The narcissist captures the first and second words, then replaces the text by the first word, a comma, a space, and the second word. The narcissist has impressed himself, but he spent a bunch of time fooling around with pattern capturing and clustering, consulting reference manuals, and so forth. This is also a stupid solution.

The programmer who has no use for wasting his life with a keyboard and mouse, and equally little use for proving he can Do It The Hard Way, uses his text editor to

1.  replace `","` by `", "`
2.  replace `", &nbsp;"` by `", "`

There are probably other solutions, but life is short and the customer is waiting.
