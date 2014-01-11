---
title: Version 0.1.154 of innotop released
author: Baron Schwartz
excerpt: "<p>I recently published an article on O'Reilly about monitoring tools for MySQL.  Of course I believe innotop is the best in its class, so I mentioned it.  But I also recently added some features to innotop, and made a stability fix too.</p>"
layout: post
permalink: /2006/10/21/version-01154-of-innotop-released/
description:
  - Notes on upgrades to the innotop MySQL and InnoDB monitor.
---
<p class="download">
  <a href="/innotop/">Download innotop</a>
</p>

I recently published an article on O&#8217;Reilly about monitoring tools for MySQL. Of course I believe [innotop][1] is the best in its class, so I mentioned it. But I also recently added some features to innotop, and made a stability fix too.

### Innotop upgrade: new features, stability

Now you can easily monitor open tables with innotop. Just get the latest version (your configuration file will be upgraded seamlessly) and press the &#8216;O&#8217; key (that&#8217;s capital &#8220;oh&#8221;).

This can be useful when a table is in use by a query, and things are timing out with a lock wait, yet you can&#8217;t find any transaction that has a lock. At least you can see which table (of potentially many accessed by a query) is causing the problem.

There&#8217;s a default filter to only show tables in use by one or more queries. As always, press the &#8216;w&#8217; key to add or remove &#8216;where&#8217; clauses (regular expression filters) on any column in the display. Press &#8216;c&#8217; to choose columns, and &#8216;s&#8217; to choose a sort column. Press &#8216;r&#8217; to reverse sort. Press &#8216;$&#8217; to see every configuration variable relevant to this screen, and &#8216;?&#8217; to see every key mapping for this screen.

I&#8217;m also continuing on the epic quest to make innotop handle basically any crap input you throw at it. Since the output of `SHOW INNODB STATUS` can be truncated right in the middle of something due to it being large, this means the InnoDBParser module might return hashes with half the expected keys, or keys whose values are undefined, and so forth. It may sound easy to handle this, until you realize the sheer size and complexity of the data in the status monitor. Checking each and every thing for complete and defined values (and providing defaults if something is missing) is tedious, and I hate to do it because it makes the code messy, but it&#8217;s a necessary evil. If you have problems with innotop crashing, please send me a crash report ([see this article to find out what information I need][2]). The good news is I haven&#8217;t received a crash report in a long time now, so perhaps it&#8217;s getting pretty good at &#8220;garbage in, useful information out.&#8221;

### Article on O&#8217;Reilly Network

O&#8217;Reilly just published my article on [Open Tools for MySQL Administrators][3], where I discuss the tools I&#8217;ve found useful for monitoring MySQL. I&#8217;ve learned a good bit from writing this, such as how to spell Giuseppe Maxia&#8217;s name right (apparently it&#8217;s pretty common to misspell it, my apologies for adding to that).

I am also watching the comments with interest. Someone has already mentioned a tool I didn&#8217;t know existed, [moodss][4]. It is a modular system for monitoring lots of things, with what looks like very nice MySQL monitoring functionality. I haven&#8217;t tried it, but I&#8217;m strongly considering installing it at work next week. I&#8217;ll let you know what I think.

I also got to work with chromatic &#8212; he edited the article. It&#8217;s a pleasure to be supported by someone so knowledgeable. In case you don&#8217;t know, chromatic is a great Perl programmer and has written a book on Extreme Programming.

### Miscellaneous

Someone sent me a message about a particular module I used in my [MySQL Query Profiler tool][5] for debugging purposes. Apparently, when I took out all the places I actually used it but didn&#8217;t remove the reference to the module, it caused some earlier versions of Perl to complain. I fixed that too.

Stay tuned for more goodness to come! At some point I&#8217;ll finish some of my 65 draft articles and publish them. Yep, I have 65 articles in various states of completion&#8230;! Yikes. You can [subscribe][6] if you want to be notified as soon as I publish anything new.

 [1]: /innotop/
 [2]: /blog/2006/08/02/what-to-do-when-innotop-crashes/
 [3]: http://www.oreillynet.com/pub/a/mysql/2006/10/19/mysql-tools.html
 [4]: http://jfontain.free.fr/mysql/
 [5]: /mysql-query-profiler/
 [6]: /blog/subscribe/