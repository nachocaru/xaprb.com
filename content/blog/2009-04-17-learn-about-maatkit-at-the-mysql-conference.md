---
title: Learn about Maatkit at the MySQL Conference
author: Baron Schwartz
layout: post
permalink: /2009/04/17/learn-about-maatkit-at-the-mysql-conference/
categories:
  - Conferences
  - Maatkit
  - SQL
tags:
  - mysqlconf2009
---
I&#8217;m [presenting][1] about [Maatkit][2], the toolkit I created to make life better with MySQL, at the MySQL conference next week.

I&#8217;m going to give you a whirlwind tour through some of Maatkit&#8217;s features and functionality. The toolkit is much too large and complex to cover more than a small part of it in depth. So here is your advance warning: I&#8217;m going to go through a lot of material, and I won&#8217;t be stopping for lengthy discussions :-) The Maatkit documentation is very thorough, and I hope to introduce you to things that could be of use to you, so you can go learn about those topics from the documentation.

Let me give you an idea: when I&#8217;m optimizing queries, I open up the output of [mk-query-digest][3] in Vim, navigate to the query I&#8217;m working on, CTRL-V to start visual selection mode, select the part of the query I&#8217;m interested in, type :!mysql -vr, press Enter, and I get my EXPLAIN, SHOW CREATE TABLE, or whatever pasted right into my file, which helps make a nice analysis report I can send to the client. I just skipped a lot of important information. Did I go too fast? Well, pretend you&#8217;re at the conference: now you know you want to go home, learn Vim, and use mk-query-digest for query analysis.

 [1]: http://www.mysqlconf.com/mysql2009/public/schedule/detail/5677
 [2]: http://www.maatkit.org/
 [3]: http://www.maatkit.org/doc/mk-query-digest.html