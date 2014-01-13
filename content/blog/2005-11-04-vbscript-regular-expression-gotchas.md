---
title: How to avoid VBScript regular expression gotchas
date: "2005-11-04"
permalink: /blog/2005/11/04/vbscript-regular-expression-gotchas/
---
VBScript regular expressions are slightly troublesome, though they certainly help turn VBScript into less of a joke when it comes to text processing. The syntax lacks some of the niceties of Perl or .NET regexes, but is complete enough to be very useful. This article shows you how to avoid potentially serious problems, and explains an undocumented feature.

### Undocumented and incorrect behavior

1.  The documentation is incomplete. The RegExp object has an undocumented property, `Multiline`, which affects pattern matching using the `.` metacharacter. This property's default value is `False`, so `.` matches every character except a newline by default. When `Multiline` is `True`, the meaning of the `.` metacharacter is different; it then matches every character including a newline. This is the same behavior you will find in other languages, such as Perl and .NET.
2.  Backslashed special characters do not work correctly inside brackets. For example, it ought to be possible to match across newlines with the patterns `[.\n]*` and `[.\s]*`, but this prevents the pattern from matching anything at all, even when no newlines are involved.

### How to avoid memory leaks

There is a [memory-leak bug][1] which has been reported elsewhere on the Internet. An expression with more than 10 subexpressions in `Global` mode can leak memory. To avoid this bug, don't use a pattern with more than 10 subexpressions if the object's `Global` property is set to `True`.

### Documentation links

Here are two links to the Microsoft VBScript RegExp documentation on MSDN:

1.  [VBScript Regular Expression Syntax][2]
2.  [The VBScript RegExp object][3]

 [1]: http://blogs.msdn.com/ericlippert/archive/2005/03/01/382533.aspx
 [2]: http://msdn.microsoft.com/library/en-us/script56/html/0a8270d7-7d8f-4368-b2a7-065acb52fc54.asp
 [3]: http://msdn.microsoft.com/library/en-us/script56/html/9f1c25ba-46ce-46af-9f19-ac1d2bcf05d8.asp
