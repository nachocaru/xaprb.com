---
title: MySQL 5.1.33, now with 4 secret bugs
author: Baron Schwartz
layout: post
permalink: /2009/04/09/mysql-5133-now-with-4-secret-bugs/
categories:
  - Open Source
  - SQL
tags:
  - Community
  - MySQL
  - Transparency
---
Some unsettling things happened in MySQL in the past week or so.

### New storage engine not mentioned in the changelog

There&#8217;s a bit of a storm brewing over at the MySQL Performance Blog, where [Vadim reports discovering a new storage engine][1] added without mention in the [5.1.33 changelog][2]. This is in defiance of the policy of not making changes in a production release. And it certainly belongs in the changelog &#8212; but there is no sign that anyone will remedy this problem.

Arjen Lentz, who is ex-MySQL and was Employee #25, [reported a bug on the licensing of this storage engine][3]. To my eyes, the engine&#8217;s license does not look right to include in a GPL database. Arjen agrees.

But the bug report he entered is now marked secret. This is a great way to draw attention to it. Now I&#8217;m wondering: does this have something to do with the [MySQL 5.1 community/enterprise split that was announced last year][4] but hasn&#8217;t been implemented yet? Maybe they&#8217;re going to unwrap something at the conference this year, [like they did last year][5]? I hope not. That was unpleasant and should not be repeated.

### Three private bug reports in the changelog

I noticed one private bug report in the 5.1.33 changelog itself. I wrote to the author of the 5.1.33 release announcement about it 3 days ago, but have received no response.

So after seeing that Arjen&#8217;s report was private, I just clicked through all the bugs mentioned in the 5.1.33 changelog and found two more that I&#8217;m barred from viewing. Here are all three:

<pre>* The MD5 algorithm now uses the Xfree implementation.
   (Bug#42434: <a href="http://bugs.mysql.com/42434">http://bugs.mysql.com/42434</a>)
 * Use of USE INDEX hints could cause EXPLAIN EXTENDED to crash.
   (Bug#43354: <a href="http://bugs.mysql.com/43354">http://bugs.mysql.com/43354</a>)
 * MySQL 5.1 crashed with index merge algorithm and merge tables.
   A query in the MyISAM merge table caused a crash if the index
   merge algorithm was being used.
   (Bug#40675: <a href="http://bugs.mysql.com/40675">http://bugs.mysql.com/40675</a>)
</pre>

What reason can there be to make those private? I would like to encourage MySQL to discontinue this practice except when vitally necessary to protect client data. In my opinion, when someone submits a private bug to a software project that wants to be open-source, there should be a strong push-back. Private client data can go into a private comment; the whole bug report doesn&#8217;t have to be sealed off. Consider the harm caused by private bug reports: it&#8217;s now much harder for me to see what changeset fixed the bug. I can&#8217;t see any of the discussion about it. I can&#8217;t make any decisions about whether it affects me or clients.

I am concerned about the lack of openness and transparency in all of these issues, and others have told me that they are too.

 [1]: http://www.mysqlperformanceblog.com/2009/04/06/mysql-and-ibm/
 [2]: http://dev.mysql.com/doc/refman/5.1/en/news-5-1-33.html
 [3]: http://bugs.mysql.com/44172
 [4]: http://blogs.mysql.com/kaj/2008/12/01/mysql-51-release-schedule/
 [5]: http://jcole.us/blog/archives/2008/04/14/just-announced-mysql-to-launch-new-features-only-in-mysql-enterprise/