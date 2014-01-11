---
title: 'Free MySQL webinar: zero-downtime schema changes'
author: Baron Schwartz
layout: post
permalink: /2012/07/17/free-mysql-webinar-zero-downtime-schema-changes/
categories:
  - SQL
---
If you haven&#8217;t checked into [pt-online-schema-change][1] yet, now&#8217;s a great time to sign up for my [free webinar][2] Thursday, July 19, 3-4 PM EDT. I&#8217;ll explain and demonstrate the tool, and walk you through everything you need to decide whether it&#8217;s right for you.
If you haven&#8217;t even *heard* about pt-online-schema-change yet, the short version is it lets you alter tables in MySQL with practically no downtime at all. This even works for really big tables that might take hours or days to alter &#8212; normally a blocking operation. In fact, 37Signals just wrote a blog post saying it has [helped them achieve 99.99%][3] uptime for their Basecamp service.

 [1]: http://www.percona.com/doc/percona-toolkit/pt-online-schema-change.html
 [2]: https://www3.gotomeeting.com/register/506420958
 [3]: http://37signals.com/svn/posts/3208-new-basecamp-available-9999-of-the-time-since-launch