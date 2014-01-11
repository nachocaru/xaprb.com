---
title: JavaScript number-formatting library updated
author: Baron Schwartz
excerpt: |
  <p>I've released a new version of my <a href="/blog/2006/01/05/javascript-number-formatting/">powerful, flexible, efficient JavaScript number-formatting library</a>, which is probably the best available. This release adds a fix for zero-padding negative numbers.</p>
layout: post
permalink: /2007/06/19/javascript-number-formatting-library-updated/
description:
  - >
    This version of my powerful, flexible, efficient JavaScript number-formatting
    library fixes a zero-padding bug with negative numbers.
tags:
  - formatting
  - format_strings
  - Javascript
  - library
  - number formatting
  - numberformat
  - numbers
  - parsing
  - unit testing
---
<p class="download">
  <a href="/articles/number-functions.zip">Download number-functions</a>
</p>

I&#8217;ve released a new version of my [powerful, flexible, efficient JavaScript number-formatting library][1], which is probably the best available. This release adds a fix for zero-padding negative numbers.

If you find bugs, please send me test cases I can use to reproduce and add to the unit test suite. One test per line, like &#8220;input&#8221;, &#8220;format&#8221;, &#8220;expected&#8221; is best. For example, this is a great test case:

<pre>-1, "#,#.00", "-1.00"</pre>

I can plug that directly into the unit test suite, run it, and if it gives back &#8220;-01.00&#8243; it will fail the test. This makes it much easier and more convenient for me to fix bugs.

[Sponsoring][2] bug fixes wouldn&#8217;t hurt either ;-)

 [1]: /blog/2006/01/05/javascript-number-formatting/
 [2]: /blog/donate/