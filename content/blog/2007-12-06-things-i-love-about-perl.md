---
title: Things I love about Perl
date: "2007-12-06"
url: /blog/2007/12/06/things-i-love-about-perl/
categories:
  - Programming
---
I don't love everything about Perl, but I love its sense of humor, which I think probably comes from its creators' senses of humor. From the Perl function documentation for `redo`:

> "last", "next", or "redo" may appear within a "continue" block. "last" and "redo" will behave as if they had been executed within the main block. So will "next", but since it will execute a "continue" block, it may be more entertaining.

"Entertaining," in this context, means "if we were omniscient and looking over your shoulder while you spend a day debugging your occasional infinite loop or other bizarre behavior, we would be wildly entertained."

At least that's how I read it.

Sometimes the sense of humor, especially when imitated by neophytes trying to pretend to be part of The Gang Of Perl Greats, degrades into obnoxious sarcasm that obscures rather than documents. But this is fairly rare in the core documentation or other writings from the language's authors.

If you've never read [Programming Perl][1], you're missing out on a lot of extremely subtle, very sharp and intelligent wit. I don't have my copy of the book at hand, but one joke that comes to mind is how to write the Lord of the Rings trilogy with a regular expression substitution:

<pre>($lotr = $hobbit) =~ s/bilbo/frodo/g;</pre>

Or something like that. There are many fun examples that manage to teach the matter at hand *more* clearly, and keep me engaged more, than even the clearest straightforward explanation could.

Often imitated, but never equaled in any other book I've read. For example, I tried to read [Extreme Programming Refactored][2] (I really really tried, honest!) but could not make it through. I found myself getting irritated and wanting them to *get to the point*.

When Larry Wall et al make a joke about Gandalf, it *is* the point.

 [1]: http://www.amazon.com/gp/product/0596000278?ie=UTF8&#038;tag=xaprb-20&#038;link_code=as3&#038;camp=211189&#038;creative=373489&#038;creativeASIN=0596000278
 [2]: http://www.amazon.com/gp/product/1590590961?ie=UTF8&#038;tag=xaprb-20&#038;link_code=as3&#038;camp=211189&#038;creative=373489&#038;creativeASIN=1590590961
