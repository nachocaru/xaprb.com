---
title: "A bug in Microsoft SQL Server's replace() function"
date: "2005-11-15"
permalink: /blog/2005/11/15/a-bug-in-microsoft-sql-servers-replace-function/
categories:
  - Databases
---
I have found a bug in Microsoft SQL Server's replace() function. The function treats `char` and `varchar` differently, and replacements will fail in some cases. Here is a demonstration of the bug:

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

Result: "Replacement failed." This is clearly incorrect behavior. To make it more interesting, here are some test cases that succeed:

1.  Change the type of `@find` to `varchar(2)`.
2.  Change the value of @string to `'&nbsp;&nbsp;'` (two spaces).
3.  Use `replicate(@replace, 2)` instead of `@find`.

I found another discussion about this on Google groups, but it's incoherent, doesn't demonstrate the problem clearly, and speculates about the internal causes rather than suggesting ways to avoid the behavior (pointless). So I count that as "not posted elsewhere" and offer it here.
