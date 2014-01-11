---
title: JavaScript date chooser
date: "2005-09-29"
permalink: /2005/09/29/javascript-date-chooser/
---
<p style="border:solid red 1px; background:yellow">
  If you have questions or comments or bugs report, or a change to make, be sure to use the project's new homepage: <a href="http://code.google.com/p/flexible-js-formatting/">Flexible JS Formatting Libraries</a>
</p>

<p class="download">
  <a href="/articles/date-chooser.zip">Download date-chooser v1.1</a>
</p>

I wrote this date chooser because the ones I could find on the Internet were crummy, too complicated, or not free. The point is to make form entry more usable and help the user enter valid data (of course, you still need to validate your input when processing). I also wanted to code to be compact and fast, and not require a bunch of ugly code injected into the web page.

I made a [demo][1] so you can see it in action.

This code uses some code from my [article about date formatting and parsing via dynamic code generation][2], to implement a date-formatting syntax similar to [PHP's `date` function][3].

The script depends upon [date-functions.js][4], [datechooser.js][5], [select-free.css][6], and [datechooser.css][7].

### How to use it

To create a date-chooser on your HTML document, follow these steps:

1.  Include the CSS and JavaScript files in the `head` of your document.
2.  Wrap `select-free.css` in a conditional comment for IE, as in the demo.
3.  Create a form, a `div` to hold the date chooser, a form field to hold the results, and an image to trigger showing and hiding the chooser, as below.

Here's some sample code:

<pre>&lt;input id="dob" name="dob" size="10" maxlength="10" type="text"/&gt;&lt;img src="/files/calendar.gif" onclick="showChooser(this, 'dob', 'chooserSpan', 1950, 2010, 'Y-m-d', false);"/&gt;
&lt;div id="chooserSpan" class="dateChooser select-free" style="display: none; visibility: hidden; width: 160px;"&gt;
&lt;/div&gt;</pre>

This code causes the date chooser to be shown with a date range of 1950 to 2010, with the date formatted in ISO-8601 date format.

### Updates

On May 26 2006, I decided I could no longer procrastinate and integrated many of the helpful suggestions from the comments into the code. Thanks to all who wrote in comments suggesting improvements, and a big thanks to [Jared][8] for integrating a bunch of code for me and sending me a comment about it. Changes include a fix for the IE problem of `select` fields showing through, no conflicts with the [Prototype][9] library, and a cleaner show/hide behavior.

 [1]: /articles/javascript-date-chooser-demo.html
 [2]: /blog/2005/12/20/javascript-date-parsing/
 [3]: http://www.php.net/manual/en/function.date.php
 [4]: /articles/date-functions.js
 [5]: /articles/datechooser.js
 [6]: /articles/select-free.css
 [7]: /articles/datechooser.css
 [8]: http://www.hatwhite.com/
 [9]: http://prototype.conio.net/
