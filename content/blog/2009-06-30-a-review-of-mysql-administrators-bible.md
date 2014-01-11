---
title: "A review of MySQL Administrator's Bible"
date: "2009-06-30"
permalink: /2009/06/30/a-review-of-mysql-administrators-bible/
categories:
  - Review
  - SQL
tags:
  - Keith Murphy
  - Sheeri Kritzer Cabral
---
<div id="attachment_1145" class="wp-caption alignleft" style="width: 250px">
  <a href="http://www.amazon.com/MySQL-Administrators-Bible-Wiley/dp/0470416912?tag=xaprb-20"><img src="http://www.xaprb.com/blog/wp-content/uploads/2009/06/mysql-administrators-bible-240x300.jpg" alt="MySQL Administrator&#039;s Bible" title="MySQL Administrator&#039;s Bible" width="240" height="300" class="size-medium wp-image-1145" /></a><p class="wp-caption-text">
    MySQL Administrator's Bible
  </p>
</div>

[MySQL Administrator's Bible][1] by Sheeri K. Cabral and Keith Murphy, 2009. Page count: 800+ pages. (Here's a [link to the publisher's site][2].)

This book is a comprehensive reference guide to MySQL that's accessible to beginning DBAs or DBAs familiar with another database. It has enough detail to be a useful companion throughout a DBA's career. It also covers many related technologies, such as memcached, at a moderate-but-useful level of detail. This isn't exactly a how-to book, and it isn't exactly a reference manual; it's more of a blend of the two.

The audience will depend on personal preferences. Some of the reference material is the type of thing I would look up with command-line `--help` options or the MySQL manual. But there are times when the reference aspect of the book is uniquely valuable. For example, the online documentation tends to list things alphabetically; the book might break them down into groups by function. An example is the `sql_mode` parameters, which it groups into categories like "Getting rid of silent failures, silent conversions, and silently allowing invalid data."

The non-reference aspect of the book has a lot of examples of how to do things, such as how to set up replication over SSL. This is exactly what I'd look for in a book. Otherwise, you're reduced to reading documentation (inefficient, mind-numbing) or trusting the information you find online, which is generally not something I do.

Speaking of trusting information, I was happy to see very few typos or errors. Occasionally I caught a minor slip. For example, when discussing the limited memory a 32-bit mysqld can use because it runs in a single process, there's a typo that mis-states this architectural feature as "mysqld is currently single-threaded," which is not quite the same thing. Overall, you can rely on the information you'll read in this book.

The book is divided into four parts: first steps, developing with MySQL, core administration, and a set of chapters and appendixes grouped under extending your skills. I think this organization works well. You can read the full Table Of Contents at the publisher's site linked above.

Coverage is for MySQL 5.1 and 6.0. As we know, 5.1 was GA'ed and 6.0 has been killed and replaced by a new release policy. This gives a slightly odd feeling to some passages, which speak about 5.1 in the past tense and 6.0 in the present tense! As far as I know, however, this book contains the most complete coverage of MySQL 5.1 in print. The only other similar book I've read that covers 5.1 is *[High Performance MySQL 2nd Edition][3]* &#8212; and that one is a bit light on details because there wasn't a lot of production knowledge of 5.1 yet (I'm the lead author of *HPM2e*, by the way).

Speaking of which, I think that *MySQL Administrator's Bible* is a very good complement to *High Performance MySQL, 2nd Edition*. The former is useful to people who have varying levels of knowledge, while the latter assumes a lot of experience and doesn't cover introductory material much. And the books have different topics, of course. So if you're new to databases, or if you're new to MySQL, you might do well to start with Sheeri's book, then continue or supplement your education with ours.

All in all, this is a book that's well worth buying if you're going to administer a serious MySQL installation. I tip my hat to Sheeri &#8212; I don't know how she did it. It's a huge project and she pulled through the last (and by far most difficult) part of it by herself.

*Disclosure: I tried to be a tech reviewer for this book, but I was over-committed and had to back out after a while.*

 [1]: http://www.amazon.com/MySQL-Administrators-Bible-Wiley/dp/0470416912?tag=xaprb-20
 [2]: http://www.wiley.com/WileyCDA/WileyTitle/productCd-0470416912.html
 [3]: http://tinyurl.com/highperfmysql
