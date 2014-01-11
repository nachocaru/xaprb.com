---
title: MySQL manual gets improved searching
author: Baron Schwartz
layout: post
permalink: /2008/07/28/mysql-manual-gets-improved-searching/
categories:
  - SQL
tags:
  - documentation
  - Google
  - MySQL
---
Hooray! The [MySQL reference manual][1] has a new search system. It now uses a [Google Appliance][2] and the results should be a lot better. The old system was not very helpful. It used to break config variables into multiple words and search on them individually and give a billion results I didn&#8217;t care about. I&#8217;ve just tried to search for some things like key\_buffer\_size and got results I think are very useful.

I love the MySQL manual. It is a great example of quality software documentation. As someone recently mentioned, it is not released under a Free license though &#8212; that would be a great improvement, too!

When did this change happen, by the way? Maybe it&#8217;s been there for a while and I just missed it because I grew accustomed to using Google search instead.

Edit: I actually would suggest a change to this search, too. It&#8217;s the same change I have suggested in the past: put the document title in front of the manual&#8217;s title. Instead of &#8220;MySQL :: MySQL 5.1 Reference Manual :: 7.4.6.6 Restructuring a Key &#8230;&#8221; I would rather see &#8220;Restructuring a Key Cache :: MySQL 5.1 Reference Manual&#8221;. (Note that the title gets truncated as-is, and it&#8217;s hard to see in the browser&#8217;s titlebar/tab/system taskbar).

 [1]: http://dev.mysql.com/doc/
 [2]: http://www.google.com/enterprise/search.html