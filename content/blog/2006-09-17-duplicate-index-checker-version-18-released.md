---
title: Duplicate index checker version 1.8 released
author: Baron Schwartz
excerpt: |
  <p>What was a 5-minute script has become a bigger project.  I've made more improvements to the <a href="http://www.xaprb.com/blog/2006/08/28/how-to-find-duplicate-and-redundant-indexes-in-mysql/">duplicate index checker</a>.  Soon it will require product activation and have security vulnerabilities every week.  Seriously: this is the third iteration, and <a href="http://c2.com/cgi/wiki?ThreeStrikesAndYouAutomate">three strikes and you automate</a>, so I automated.  I have a test suite now (your contributions welcome), and I addressed two shortcomings readers pointed out in comments on the original article.  You now get better foreign key checking, and FULLTEXT indexes are ignored.</p>
layout: post
permalink: /2006/09/17/duplicate-index-checker-version-18-released/
description:
  - >
    More improvements to a handy Perl script to quickly find duplicate and redundant
    indexes and foreign keys in MySQL tables.
---
What was a 5-minute script has become a bigger project. I&#8217;ve made more improvements to the [duplicate index checker][1]. Soon it will require product activation and have security vulnerabilities every week. Seriously: this is the third iteration, and [three strikes and you automate][2], so I automated. I have a test suite now (your contributions welcome), and I addressed two shortcomings readers pointed out in comments on the original article. You now get better foreign key checking, and FULLTEXT indexes are ignored.

Several people pointed out that FULLTEXT indexes shouldn&#8217;t be considered duplicates of regular indexes. In fact, Peter even wrote that on his original article. I ignored it because I don&#8217;t use them on anything right now, so it&#8217;s not a priority for me. But it is for you, so I stopped ignoring them. It was a 7-character change to the script! I really should have done that sooner.

Roland pointed out that the order of columns in a foreign key doesn&#8217;t matter, so a foreign key from (a,b) to (a,b) is functionally the same as one from (b,a) to (b,a). This is where my simplistic string-comparison algorithm is too low-fidelity; it won&#8217;t catch duplicate foreign keys unless the columns are in the same order. Fortunately, it&#8217;s easy to solve and still use string matching: I can just sort the columns in the foreign key definition. Assuming your column names don&#8217;t have any commas in them, the following Perl code will find the columns inside parentheses, split them into an array, sort the array, and join them back together again:

<pre>$fk =~ s#(?&lt;=\()([^\)]+)(?=\))#join(', ', sort(split(/, /, $1)))#ge;</pre>

It&#8217;s possible because of the magic of Perl substitutions. The final `ge;` says to do the search globally, and then execute the results (the part between the rightmost two `#` characters) as Perl code. Nasty, but it does the job quickly. Now 

<pre>FOREIGN KEY (`seq`, `name`) REFERENCES `p` (`seq`, `name`)</pre>

canonicalizes to

<pre>FOREIGN KEY (`name`, `seq`) REFERENCES `p` (`name`, `seq`)</pre>

and I can continue to use string matching. You can probably tell it&#8217;s my favorite technique, and I&#8217;m stubbornly trying to use it as long as possible. To a man with a hammer, everything looks like a nail.

There&#8217;s a catch. If you have two foreign keys with &#8220;crossed columns&#8221; like this:

<pre>FOREIGN KEY (`name`, `seq`) REFERENCES `p` (`name`, `seq`)
FOREIGN KEY (`name`, `seq`) REFERENCES `p` (`seq`, `name`)</pre>

They aren&#8217;t duplicates, but they&#8217;ll canonicalize to the same thing and my tool will warn you. But if you&#8217;ve done that, you have probably made a very big mistake.

You can download it from the original article, as always.

 [1]: http://www.xaprb.com/blog/2006/08/28/how-to-find-duplicate-and-redundant-indexes-in-mysql/
 [2]: http://c2.com/cgi/wiki?ThreeStrikesAndYouAutomate