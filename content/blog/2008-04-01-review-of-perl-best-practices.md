---
title: Review of Perl Best Practices
author: Baron Schwartz
layout: post
permalink: /2008/04/01/review-of-perl-best-practices/
description:
  - Perl Best Practices is an essential Perl book that you should not be without.
tags:
  - Best Practices
  - coding standards
  - Damian Conway
  - readability
---
[<img src="http://www.oreilly.com/catalog/covers/0596001738_cat.gif" style="float:right" width="180" height="236" />][1]In my opinion, every Perl programmer needs at least these two books: the [Camel][2], and the [Dog (Perl Best Practices)][1].

The Camel teaches you how to program Perl: the syntax and so on. But the Dog teaches you how to program Perl sanely, by recommending that you use only a subset of Perl&#8217;s syntax and abilities.

The Camel tells you that there&#8217;s more than one way to do it, which is supposed to be a strength of Perl. The Dog tells you which way is &#8220;best.&#8221; And it tells you why the other ways are worth avoiding, and in which circumstances, and how badly you can get burned if you&#8217;re not careful.

The Dog also shows you a lot of ways to do things that you might not otherwise think about. In that sense, it&#8217;s not just stripping away. It&#8217;s also adding things that you might not get elsewhere. Example: you might not know about [List::Util][3].

The common complaint about Perl being a write-only language doesn&#8217;t have to be true if you follow the Dog&#8217;s suggestions. Perl can be a very readable language &#8212; and I mean readable for ordinary humans, so don&#8217;t think I&#8217;m just another Perl programmer insisting that something is readable when it looks like static to you. The Dog encourages readable coding. In fact, in the absence of any other coding standard, if you try to &#8220;follow the Dog&#8221; you&#8217;ll be doing a good job. (There&#8217;s really no need to invent your own coding standard, in my opinion. Just follow the Dog.)

It&#8217;s not perfect. I don&#8217;t always agree with its suggestions. For example, I think the use of &#8220;magic comments&#8221; to automagically add interactive progress bars to command-line programs is just a bad idea. (Comments should **never** change the behavior of a program). However, the vast majority of its suggestions have come from long experience. If you don&#8217;t agree with one of them, it&#8217;s worth following it anyway until you consider yourself expert enough to disagree with authority.

I consider this an essential Perl book. No Perl programmer should be without it.

 [1]: http://www.amazon.com/gp/redirect.html%3FASIN=0596001738%26tag=xaprb-20%26lcode=xm2%26cID=2025%26ccmID=165953%26location=/o/ASIN/0596001738%253FSubscriptionId=1N9AHEAQ2F6SVD97BE02
 [2]: http://www.amazon.com/gp/redirect.html%3FASIN=0596000278%26tag=xaprb-20%26lcode=xm2%26cID=2025%26ccmID=165953%26location=/o/ASIN/0596000278%253FSubscriptionId=1N9AHEAQ2F6SVD97BE02
 [3]: http://perldoc.perl.org/List/Util.html