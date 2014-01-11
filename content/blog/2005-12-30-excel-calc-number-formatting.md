---
title: Excel vs. OpenOffice.org Calc in number formatting
author: Baron Schwartz
excerpt: |
  <p>I was playing with custom format strings in Excel recently and noticed something odd.  The number of digits to the left of the decimal place seemed to vary bizarrely when using custom format strings for exponential notation, in ways that contradict the documentation.  OpenOffice.org doesn't exhibit the same wackiness.  Which spreadsheet formats numbers more sanely?</p>
  
  <p style="text-align:center"><img src="/articles/images/excel-vs-calc.jpg" alt="Excel vs. Calc" width="162" height="110" /></p>
layout: post
permalink: /2005/12/30/excel-calc-number-formatting/
description:
  - "This article explains undocumented features in Microsoft Excel's number formatting specification."
---
I was playing with custom format strings in Excel recently and noticed something odd. The number of digits to the left of the decimal place seemed to vary bizarrely when using custom format strings for exponential notation, in ways that contradict the documentation. OpenOffice.org doesn&#8217;t exhibit the same wackiness. Which spreadsheet formats numbers more sanely?

<p style="text-align:center">
  <img src="/articles/images/excel-vs-calc.jpg" alt="Excel vs. Calc" width="162" height="110" />
</p>

If you&#8217;re not familiar with custom format strings, it&#8217;s just a way of making your own format. You can right-click on a cell, choose &#8220;Format Cells&#8230;&#8221; and click Custom at the bottom of the list, then enter a formatting string. The formatting syntax is used throughout Windows, and you rub elbows with it any number of ways when you program the Windows API, but the documentation seems to be only about 90% consistent between, say, Excel and the [.NET Numeric Format Strings documentation][1].

Back to the data I was seeing with Excel. I wanted to have two digits to the left of the decimal point and two to the right, for a total of four significant figures; the exponent should be zero-padded so it&#8217;s two digits as well. Here is how you can do that with Excel, according to the documentation: `00.00E+00`. Sounds good, but it doesn&#8217;t work in practice. Here&#8217;s some data, the actual results, and what I expected:

<table class="compact cleanHeaders elbowroom">
  <tr>
    <th>
      Number
    </th>
    
    <th>
      Actual Result
    </th>
    
    <th>
      Expected Result
    </th>
  </tr>
  
  <tr>
    <td style="text-align:right">
      1209384
    </td>
    
    <td style="text-align:right">
      120.94E+04
    </td>
    
    <td style="text-align:right">
      12.09E+05
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      192939393
    </td>
    
    <td style="text-align:right">
      01.93E+08
    </td>
    
    <td style="text-align:right">
      19.29E+07
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      1293
    </td>
    
    <td style="text-align:right">
      1293.00E+00
    </td>
    
    <td style="text-align:right">
      12.93E+02
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      3910102935348
    </td>
    
    <td style="text-align:right">
      03.91E+12
    </td>
    
    <td style="text-align:right">
      39.10E+11
    </td>
  </tr>
</table>

Wacky! Why on earth would Excel choose to format these numbers like it does? I played around with it for a while; it seemed to be unpredictable. It would put too many digits to the left of the decimal point, then when the number got one digit larger, suddenly switch to too few with a much larger exponent &#8212; what the heck? Then my coworker noticed the exponent Excel chose was always a multiple of four. I played around with more formats and figured out why: the exponent is a multiple of the number of digit placeholders to the left of the decimal point. Here is a table that makes this clear:

<table class="compact elbowroom cleanHeaders">
  <tr>
    <th>
      Number
    </th>
    
    <th>
      ##00.00E+00
    </th>
    
    <th>
      #00.00E+00
    </th>
    
    <th>
      00.00E+00
    </th>
  </tr>
  
  <tr>
    <td style="text-align:right">
      1
    </td>
    
    <td style="text-align:right">
      01.00E+00
    </td>
    
    <td style="text-align:right">
      01.00E+00
    </td>
    
    <td style="text-align:right">
      01.00E+00
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      12
    </td>
    
    <td style="text-align:right">
      12.00E+00
    </td>
    
    <td style="text-align:right">
      12.00E+00
    </td>
    
    <td style="text-align:right">
      12.00E+00
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      123
    </td>
    
    <td style="text-align:right">
      123.00E+00
    </td>
    
    <td style="text-align:right">
      123.00E+00
    </td>
    
    <td style="text-align:right">
      01.23E+02
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      1234
    </td>
    
    <td style="text-align:right">
      1234.00E+00
    </td>
    
    <td style="text-align:right">
      01.23E+03
    </td>
    
    <td style="text-align:right">
      12.34E+02
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      12345
    </td>
    
    <td style="text-align:right">
      01.23E+04
    </td>
    
    <td style="text-align:right">
      12.35E+03
    </td>
    
    <td style="text-align:right">
      01.23E+04
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      123456
    </td>
    
    <td style="text-align:right">
      12.35E+04
    </td>
    
    <td style="text-align:right">
      123.46E+03
    </td>
    
    <td style="text-align:right">
      12.35E+04
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      1234567
    </td>
    
    <td style="text-align:right">
      123.46E+04
    </td>
    
    <td style="text-align:right">
      01.23E+06
    </td>
    
    <td style="text-align:right">
      01.23E+06
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      12345678
    </td>
    
    <td style="text-align:right">
      1234.57E+04
    </td>
    
    <td style="text-align:right">
      12.35E+06
    </td>
    
    <td style="text-align:right">
      12.35E+06
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      1234567890
    </td>
    
    <td style="text-align:right">
      12.35E+08
    </td>
    
    <td style="text-align:right">
      01.23E+09
    </td>
    
    <td style="text-align:right">
      12.35E+08
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      12345678901
    </td>
    
    <td style="text-align:right">
      123.46E+08
    </td>
    
    <td style="text-align:right">
      12.35E+09
    </td>
    
    <td style="text-align:right">
      01.23E+10
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      123456789012
    </td>
    
    <td style="text-align:right">
      1234.57E+08
    </td>
    
    <td style="text-align:right">
      123.46E+09
    </td>
    
    <td style="text-align:right">
      12.35E+10
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      1234567890123
    </td>
    
    <td style="text-align:right">
      01.23E+12
    </td>
    
    <td style="text-align:right">
      01.23E+12
    </td>
    
    <td style="text-align:right">
      01.23E+12
    </td>
  </tr>
</table>

Notice how the exponent is always a multiple of four in the first column, three in the second and two in the third.

I can&#8217;t find where this is documented, and it definitely contradicts the existing documentation which says those digits are used to control how the number, not the exponent, is formatted. I searched around the web and found other people agreed with me. OpenOffice.org&#8217;s Calc, on the other hand, clearly specifies that you control the number of significant digits, and the exponent is dependent on the value and the number format &#8212; so you really do have control over how the number itself is formatted. Here is the same data in Calc:

<table class="compact elbowroom cleanHeaders">
  <tr>
    <th>
      Number
    </th>
    
    <th>
      ##00.00E+00
    </th>
    
    <th>
      #00.00E+00
    </th>
    
    <th>
      00.00E+00
    </th>
  </tr>
  
  <tr>
    <td style="text-align:right">
      1
    </td>
    
    <td style="text-align:right">
      1000.00E-03
    </td>
    
    <td style="text-align:right">
      100.00E-02
    </td>
    
    <td style="text-align:right">
      10.00E-01
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      12
    </td>
    
    <td style="text-align:right">
      1200.00E-02
    </td>
    
    <td style="text-align:right">
      120.00E-01
    </td>
    
    <td style="text-align:right">
      12.00E+00
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      123
    </td>
    
    <td style="text-align:right">
      1230.00E-01
    </td>
    
    <td style="text-align:right">
      123.00E+00
    </td>
    
    <td style="text-align:right">
      12.30E+01
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      1234
    </td>
    
    <td style="text-align:right">
      1234.00E+00
    </td>
    
    <td style="text-align:right">
      123.00E+01
    </td>
    
    <td style="text-align:right">
      12.34E+02
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      12345
    </td>
    
    <td style="text-align:right">
      1230.00E+01
    </td>
    
    <td style="text-align:right">
      123.50E+02
    </td>
    
    <td style="text-align:right">
      12.30E+03
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      123456
    </td>
    
    <td style="text-align:right">
      1235.00E+02
    </td>
    
    <td style="text-align:right">
      123.46E+03
    </td>
    
    <td style="text-align:right">
      12.35E+04
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      1234567
    </td>
    
    <td style="text-align:right">
      1234.60E+03
    </td>
    
    <td style="text-align:right">
      123.00E+04
    </td>
    
    <td style="text-align:right">
      12.30E+05
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      12345678
    </td>
    
    <td style="text-align:right">
      1234.57E+04
    </td>
    
    <td style="text-align:right">
      123.50E+05
    </td>
    
    <td style="text-align:right">
      12.35E+06
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      1234567890
    </td>
    
    <td style="text-align:right">
      1235.00E+06
    </td>
    
    <td style="text-align:right">
      123.00E+07
    </td>
    
    <td style="text-align:right">
      12.35E+08
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      12345678901
    </td>
    
    <td style="text-align:right">
      1234.60E+07
    </td>
    
    <td style="text-align:right">
      123.50E+08
    </td>
    
    <td style="text-align:right">
      12.30E+09
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      123456789012
    </td>
    
    <td style="text-align:right">
      1234.57E+08
    </td>
    
    <td style="text-align:right">
      123.46E+09
    </td>
    
    <td style="text-align:right">
      12.35E+10
    </td>
  </tr>
  
  <tr>
    <td style="text-align:right">
      1234567890123
    </td>
    
    <td style="text-align:right">
      1230.00E+09
    </td>
    
    <td style="text-align:right">
      123.00E+10
    </td>
    
    <td style="text-align:right">
      12.30E+11
    </td>
  </tr>
</table>

Which is better? Well, it depends. I&#8217;m categorically in favor of OpenOffice.org because it&#8217;s [Free Software][2], of course. I also think it&#8217;s a superior product in many ways: openness, standards compliance, price, security, interoperability, and so forth. But in this particular aspect, I can&#8217;t really say which is &#8220;better.&#8221; The two products have different ways of doing it, that&#8217;s all. If I want to control how my numbers are formatted, I go with OpenOffice.org. On the other hand, Excel&#8217;s &#8220;feature&#8221; seems to lend itself well to engineering notation &#8212; a way to write numbers with exponents that are multiples of three, which correspond to Metric unit prefixes such as kilo, nano and so forth. Engineering notation requires control over significant figures though, which Excel throws out the window! (You can choose the &#8220;scientific&#8221; number format and select a number of decimal places, but that&#8217;s not exactly the same thing).

Even though OpenOffice.org is better, I&#8217;m going to avoid the &#8220;which is better&#8221; question and ask the questions I&#8217;ve not been able to answer: can I use &#8220;engineering notation&#8221; in Excel and get it to honor my instructions about significant figures? Can I get OpenOffice.org to do engineering notation? And finally, if anyone knows of some authoritative specification of how Microsoft products do number formatting, I&#8217;d be grateful for a link, because I can&#8217;t find it &#8212; the documentation I see is really poor (I have no such problem with Calc, and if I did, I could look at the source code). If I find any answers of my own to these questions, I&#8217;ll update this post.

And in case you&#8217;re wondering whether this post is related to my work on [date formatting in JavaScript][3], yes it is. I&#8217;ll be finishing up some work on number formatting soon. I just need to write more unit tests.

 [1]: http://msdn.microsoft.com/library/en-us/cpguide/html/cpconNumericFormatStrings.asp
 [2]: http://www.gnu.org/philosophy/free-sw.html
 [3]: /blog/2005/12/12/javascript-closures-for-runtime-efficiency/