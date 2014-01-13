---
title: Why not to use CSS for columnar layouts
date: "2005-11-25"
url: /blog/2005/11/25/multi-column-hypocrisy/
categories:
    - Web
---
Using `DIV` tags and CSS to format a single text into multiple columns is just as bad as using tables for layout. This article explains why.

Everyone agrees tables are not for layout, because tables are supposed to contain tabular data. Similarly, `DIV` elements aren't the right tool for columns, because they are supposed to group content into a generic container -- either to group related elements simply for grouping's sake, or to identify actual content and apply meta-data such as language or class. From the spec:

> The `DIV` and `SPAN` elements, in conjunction with the `id` and `class` attributes, offer a generic mechanism for adding structure to documents.
The keyword is **structure**. Using `DIV` elements to lay out text into columns isn't structural, it's presentational. Consider how columnar text is typically accomplished: `DIV` elements, floated left so they'll stack next to each other. This is not semantically meaningful! In particular, the text must be split into multiple `DIV`s to get it into columns. Now the text, which is **one** piece of content and should not be divided, has been divided as though it's **many** pieces of content.

Many people don't like to admit it, taking a sort of "end justifies the means" attitude and forcing the content into columns with hacks, but **HTML and CSS currently provide no mechanism for presenting a single text in multiple columns** (CSS 3, which is not finalized, will provide a mechanism, and beta versions of Firefox currently support it). What bothers me the most about the hacks is those who approve of and admire them. Violating standards is nothing to be happy about or advocate. Those who do so are certainly not on the cutting edge. The cutting edge is about semantics and standards, not about ignoring semantics and violating standards.

If you must put your text into columns, there's a good [AListApart article about laying out columns with JavaScript][1]. The advantage of this (as opposed to actually coding separate `DIV`s) is that the content *is* in a single `DIV` until the JavaScript works on it. In other words, the document your Web server delivers to the user agent has all the content in a single `DIV`. Only JavaScript-enabled user agents will see multiple columns. For practical purposes, that really means only visual browsers at this point. This is acceptable to me, because it doesn't mess with the structure of the document, unless it's in a user agent that doesn't actually *present* structure to the user anyway.

For purists though, there's no getting around it until CSS 3: anything you do to format a single text into multiple columns is a hack, also known as an abuse. How quick we are to criticize people who used tables for layout, but how soon we forget our high-minded principles when we can't have what we want.

 *[CSS]: Cascading Style Sheets
 *[HTML]: Hypertext Markup Language

 [1]: http://www.alistapart.com/articles/css3multicolumn
