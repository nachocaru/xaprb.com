---
title: 'A bug in Microsoft SQL Server&#8217;s replace() function'
author: Baron Schwartz
excerpt: "<p>A bug in Microsoft SQL Server's REPLACE function treats CHAR and VARCHAR differently, causing replacements to fail sometimes.  This article presents a concise test case, demonstrating exactly what the bug is and when it happens.</p>"
layout: post
permalink: /2005/11/15/a-bug-in-microsoft-sql-servers-replace-function/
---
I have found a bug in Microsoft SQL Server&#8217;s replace() function. The function treats `char` and `varchar` differently, and replacements will fail in some cases. Here is a demonstration of the bug:

<pre>declare @string varchar(40),
    @find char(2),
    @replace char(1)
set @string = 'two  spaces'
set @find = '  '
set @replace = ' '
if replace(@string, @find, @replace) = 'two spaces'
    print 'Replacement worked'
else
    print 'Replacement failed'</pre>

Result: &#8220;Replacement failed.&#8221; This is clearly incorrect behavior. To make it more interesting, here are some test cases that succeed:

1.  Change the type of `@find` to `varchar(2)`.
2.  Change the value of @string to `'&nbsp;&nbsp;'` (two spaces).
3.  Use `replicate(@replace, 2)` instead of `@find`.

I found another discussion about this on Google groups, but it&#8217;s incoherent, doesn&#8217;t demonstrate the problem clearly, and speculates about the internal causes rather than suggesting ways to avoid the behavior (pointless). So I count that as &#8220;not posted elsewhere&#8221; and offer it here.