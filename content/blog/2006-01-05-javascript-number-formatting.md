---
title: How to format numbers in JavaScript flexibly and efficiently
author: Baron Schwartz
excerpt: "<p>This article continues my series on parsing and formatting data with JavaScript, this time with numeric data.  I don't need to do number <em>parsing</em>, but <em>formatting</em> is very useful.  The technique is similar to my date formatting code -- code that writes code, using custom format specifier strings.  The result is number formatting functionality I hope will be familiar and easy to use.</p>"
layout: post
permalink: /2006/01/05/javascript-number-formatting/
description:
  - A JavaScript library for efficient, infinitely flexible number formatting.
tags:
  - formatting
  - format_strings
  - Javascript
  - library
  - numberformat
  - parsing
---
<p style="border:solid red 1px; background:yellow">
  If you have questions or comments or bugs report, or a change to make, be sure to use the project's new homepage: <a href="http://code.google.com/p/flexible-js-formatting/">Flexible JS Formatting Libraries</a>
</p>

<p class="download">
  <a href="/articles/number-functions.zip">Download number-functions</a>
</p>

This article continues my series on parsing and formatting data with JavaScript, this time with numeric data. I don't need to do number *parsing*, but *formatting* is very useful. The technique is similar to my [date formatting][1] code &#8212; code that writes code (for raw speed), using custom format specifier strings (for flexibility and ease of use). The result is number formatting functionality that is highly efficient, flexible, and easy to use.

First, the idea: you have a number, you want it formatted a certain way. Here's how:

<pre>var dollars = 5.001;
alert(dollars.numberFormat("$0.00");
// result: "$5.00"
var percent = .08134;
alert(percent.numberFormat("0.00%");
// result: "8.13%"
var bignum = 12831242485472;
alert(bignum.numberFormat("0,0,, million");
// result: "12,831,243 million"</pre>

My custom date formatting code used PHP's date-formatting syntax because it's much less context-sensitive and (I think) more useful than Microsoft's, but my number-formatting syntax is similar to Microsoft's because it's much more widely used and I don't see an existing, better alternative. Rather than documenting it separately, I'll just point you to the ([poor quality][2]) Microsoft documentation for the [.NET Custom Numeric Format Strings][3] functionality, and list the differences from my implementation:

*   Rounding works differently in multi-section format strings. In .NET with a two-section string, 
    > If the number to be formatted is negative, but becomes zero after rounding according to the format in the second section, then the resulting zero is formatted according to the first section. This is not true in my code &#8212; the number is formatted according to its value, and once the code decides which section applies, that section will be used no matter what happens during rounding.

*   Question marks are digit placeholders just like the number sign (`#`), but if there's no digit to insert, they get replaced with spaces, not removed. They can be used for space-padding, which might be useful for, say, accounting notation.
*   You don't have to enter quotes around strings that should be mixed in with the number placeholders. In fact, my syntax is much more permissive than the Microsoft syntax: anything can go anywhere. You can put arbitrary strings smack in the middle of your number if you want.
*   It's not internationalized.

I've only implemented a subset of the various number-formatting syntaxes I've seen in spreadsheets and so forth. The subset is about 85% complete in my opinion. However, I think it's *functionally* about 99% complete, which means I think 99% of the time you want to format a number, it will do what you want. The tradeoff is simplicity and speed. Number formatting is actually much more difficult than date formatting, and I've tried to keep the code sane.

I have a set of unit tests, which use the excellent [JsUnit][4] library. Bring up the [unit test page][5] and enter the following url to be tested: `www.xaprb.com/articles/number-test.html`.

Of course there's the obligatory [demo page][6], too.

 [1]: /blog/2005/12/12/javascript-closures-for-runtime-efficiency/
 [2]: /blog/2005/12/30/excel-calc-number-formatting/
 [3]: http://msdn.microsoft.com/library/en-us/cpguide/html/cpconcustomnumericformatstrings.asp
 [4]: http://www.edwardh.com/jsunit/
 [5]: /jsunit/testRunner.html
 [6]: /articles/number-formatting-demo.html
