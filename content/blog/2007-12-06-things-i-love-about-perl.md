---
title: Things I love about Perl
author: Baron Schwartz
excerpt: |
  <p>I don't love everything about Perl, but I love its sense of humor, which I think probably comes from its creators' senses of humor.  From the Perl function documentation for <code>redo</code>:</p>
  
  <blockquote><p>"last", "next", or "redo" may appear within a "continue" block.  "last" and "redo" will behave as if they had been executed within the main block.  So will "next", but since it will execute a "continue" block, it may be more entertaining.</p></blockquote>
  
  <p>"Entertaining," in this context, means "if we were omniscient and looking over your shoulder while you spend a day debugging your occasional infinite loop or other bizarre behavior, we would be wildly entertained."</p>
layout: post
permalink: /2007/12/06/things-i-love-about-perl/
tags:
  - Gandalf
  - humor
  - Larry Wall
  - LOTR
  - Perl
  - XP
---
I don&#8217;t love everything about Perl, but I love its sense of humor, which I think probably comes from its creators&#8217; senses of humor. From the Perl function documentation for `redo`:

> &#8220;last&#8221;, &#8220;next&#8221;, or &#8220;redo&#8221; may appear within a &#8220;continue&#8221; block. &#8220;last&#8221; and &#8220;redo&#8221; will behave as if they had been executed within the main block. So will &#8220;next&#8221;, but since it will execute a &#8220;continue&#8221; block, it may be more entertaining.

&#8220;Entertaining,&#8221; in this context, means &#8220;if we were omniscient and looking over your shoulder while you spend a day debugging your occasional infinite loop or other bizarre behavior, we would be wildly entertained.&#8221;

At least that&#8217;s how I read it.

Sometimes the sense of humor, especially when imitated by neophytes trying to pretend to be part of The Gang Of Perl Greats, degrades into obnoxious sarcasm that obscures rather than documents. But this is fairly rare in the core documentation or other writings from the language&#8217;s authors.

If you&#8217;ve never read [Programming Perl][1], you&#8217;re missing out on a lot of extremely subtle, very sharp and intelligent wit. I don&#8217;t have my copy of the book at hand, but one joke that comes to mind is how to write the Lord of the Rings trilogy with a regular expression substitution:

<pre>($lotr = $hobbit) =~ s/bilbo/frodo/g;</pre>

Or something like that. There are many fun examples that manage to teach the matter at hand *more* clearly, and keep me engaged more, than even the clearest straightforward explanation could.

Often imitated, but never equaled in any other book I&#8217;ve read. For example, I tried to read [Extreme Programming Refactored][2] (I really really tried, honest!) but could not make it through. I found myself getting irritated and wanting them to *get to the point*.

When Larry Wall et al make a joke about Gandalf, it *is* the point.

 [1]: http://www.amazon.com/gp/product/0596000278?ie=UTF8&#038;tag=xaprb-20&#038;link_code=as3&#038;camp=211189&#038;creative=373489&#038;creativeASIN=0596000278
 [2]: http://www.amazon.com/gp/product/1590590961?ie=UTF8&#038;tag=xaprb-20&#038;link_code=as3&#038;camp=211189&#038;creative=373489&#038;creativeASIN=1590590961