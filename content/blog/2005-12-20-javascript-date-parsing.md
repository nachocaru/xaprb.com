---
title: Javascript date parsing and formatting, Part 2
date: "2005-12-20"
url: /blog/2005/12/20/javascript-date-parsing/
---
<p style="border:solid red 1px; background:yellow">
  If you have questions or comments or bugs report, or a change to make, be sure to use the project's new homepage: <a href="http://code.google.com/p/flexible-js-formatting/">Flexible JS Formatting Libraries</a>
</p>

In this post I'll explain how I built on my runtime [date-formatting functionality][1] into the date-parsing realm. The result is a date-parsing library that literally creates itself at runtime.

### The demo

I have a [demo of the date-parsing library][2] online for your enjoyment.

### How it works

The technique is similar to my date-formatting library:

*   accept some input such as `2005-10-11`
*   accept a format specifier such as `Y-m-d`
*   use the format specifier to create a function capable of interpreting date strings in the given format

This allows parsing dates very efficiently and flexibly. In fact, the function that gets built will parse dates with as much detail as possible, down to the second, defaulting to a less precise date when there's less information.

The date-parsing code is a bit more complex than the formatting code. The parsing code has to build a regular expression which will successfully match a well-formed input, as specified by the format string. It inserts groups into the regular expression wherever it sees some data it can use to deduce the value of the date, and keeps track of the groups so it can use the captured values as parameters to the `Date` constructor. For example, if it sees the character `Y` in the format string, it knows that value can be captured in the regular expression and used as the `year` parameter to the `Date` constructor. It matches, but doesn't use, other data to ensure it is validly formatted. For example, the day of the week isn't helpful when parsing a date. The demo will make this clear.

### Round-trip processing

In many cases, depending on the format string, it should be possible to use the date-parsing code together with the date-formatting code for round-trip processing. Take a date, format it with some format string, then read it back in with the same format string, and you should get the same date. Of course, you need to preserve whatever level of detail you want to get back -- you won't get everything back if you throw it away during the formatting step. You'll see that in the demo too.

### The files

I'm wrapping the [date-formatting and date-parsing code][3] up into a single file. I've also upgraded the [Javascript date-chooser][4] to use both the date-parsing and date-formatting functionality. Please use and enjoy, and if you find any bugs, let me know. Likewise, if you make any improvements, that's great too -- please pass them on to me so I can pass them on to others.

### What it's not

This code is **not** a JavaScript implementation of <a href="http://www.php.net/manual/en/function.strtotime.php">strtotime</a>. That's too difficult and not that useful in my opinion. (For those not familiar with it, `strtotime` can understand input like "two weeks ago next Sunday"). It's also **not internationalized**. It only works for my little slice of the universe: the English language -- though international date-formatting standards (ISO 8601, highly recommended) make that a moot point anyway.

 [1]: /blog/2005/12/12/javascript-closures-for-runtime-efficiency/
 [2]: /articles/javascript-date-parsing-demo.html
 [3]: /articles/date-functions.js
 [4]: /blog/2005/09/29/javascript-date-chooser/
