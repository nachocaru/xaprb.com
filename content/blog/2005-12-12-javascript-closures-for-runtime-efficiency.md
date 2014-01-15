---
title: JavaScript date parsing and formatting, Part 1
date: "2005-12-12"
url: /blog/2005/12/12/javascript-closures-for-runtime-efficiency/
categories:
  - Web
---
Have you ever written JavaScript code whose behavior is undefined until runtime, is inefficient, and could be written efficiently if you knew the behavior ahead of time? Here's a way to overcome this: defer it all till runtime, then dynamically build a more efficient function once you know what it has to do. In this article I'll use date formatting as an example of how to take a performance hit **once** on the first invocation, and get extremely fast performance thereafter.

### Motivation

Picture the following scenario:

*   a user supplies a formatting string for a date
*   the script parses the formatting string
*   the script loops through the formatting string and builds the formatted date

Lots of people ([1][1], [2][2], [3][3]) have written JavaScript date-formatting routines with this type of algorithm, which is usually fine unless you want efficiency (for example, processing a large table of values). Then it is a **terrible** approach.

### An example of the inefficient way to do it

I used to use the hard-coded, slow method on my [JavaScript date chooser][4]. Here's the old, inefficient formatting code:

<pre>Date.prototype.dateFormat = function(format) {
    var result = "";
    for (var i = 0; i &lt; format.length; ++i) {
        result += this.dateToString(format.charAt(i));
    }
    return result;
}

Date.prototype.dateToString = function(character) {
    switch (character) {
    case "Y":
        return this.getFullYear();
    // snip a bunch of lines
    default:
        return character;
    }
}</pre>

Here's how I used the code:

<pre>var d = new Date();
alert(d.dateFormat("Y-m-d"));</pre>

What's wrong with that? Well, looping is slow, and I shouldn't have to re-evaluate the format specifier every time I format a date with the same format specifier. That part of the code should be evaluated just once. For example, the formatting string `Y-m-d` should just be "compiled" into something like this:

<pre>return this.getFullYear() + '-' + this.getMonthName()...</pre>

That would be great! But, since the format specifier is passed in at runtime, how is it possible to hard-code that ahead of time?

### Programs that write programs

It's not possible to hard-code the more efficient method, because I don't know what it's going to do at runtime, but I *can* code it at runtime, since JavaScript has interesting features common to many languages that allow code to be treated as data and vice versa: JavaScript can write functions dynamically.

<blockquote cite="Andrew Hume">
  <p>
    Programs that write programs are the happiest programs in the world.
  </p>
</blockquote>

Lots of programming languages can do this. Perl and LISP in particular are great for it, and it's "what you do" in Artificial Intelligence work. In JavaScript, it's not too hard either: all I need to do is parse the format string and build a definition of the function that will implement it. Assuming I want to name the function `format0`, I would get something like this:

<pre>var funcString = "Date.prototype.format0 = function() {return this.getFullYear() + '-' + (zeroPad(this.getMonth() + 1)) + '-' + zeroPad(this.getDate());}"</pre>

This isn't a function, it's a string. But by `eval()`ing it, I can make it a function, and then when I want the date formatted as `Y-m-d`, I just do this:

<pre>var d = new Date();
alert(d.format0());</pre>

### How can I call a function without a name?

There's still an obvious problem -- I can't call this code at runtime because I don't know the name `format0` of my formatting function. It might be the 99th different formatting string that's been turned into a function, not the first. I need to save some way to look it up. How about the following?

*   call a function with a format specifier
*   do a hash lookup with the format specifier, looking for the function that implements the format
*   if the function doesn't exist, make one and store its name in the hashtable, keyed on the format string
*   call the function and return the result

Sounds good to me! Since JavaScript has associative arrays (objects are associative arrays), I'll use those as the hashtable. The resulting function looks for an entry in the hashtable, builds the function if it's not there, and then uses it. There's an initial cost the first time I format a string with a given format, but after that, it's cheap, so I can go to town. Essentially I'm unrolling and pre-compiling a loop. To prove it, I can `document.write(Date.prototype.format0);` and see what the code ended up being:

<pre>function () { return this.getFullYear() + "-" + String.leftPad(this.getMonth() + 1, 2, "0") + "-" + String.leftPad(this.getDate(), 2, "0"); }</pre>

The functions are named in the order in which they're defined: `format0`, `format1` and so forth. Why do that? Why not just use the formatting string's own value as the name of the function? Hashtable keys can be any string value, but functions have to have legal, callable names (at least in some browsers). That's why I'm making a legal name for the function and using the hashtable to look it up.

### Compatibility with PHP's `date` function

In order to implement nearly full compatibility with [PHP's `date` function][5], I had to write a good bit of code, adding my own functionality to the `Date` object (both to the object itself, and to the prototype). I created several named formatting patterns, similar to the Microsoft .NET formatting patterns, which can be used in lieu of defining your own (see the demo for more). I also added a few functions to some other built-in objects. Please let me know if you find anything wrong with this code. I only wrote it for English; it's not implemented for other cultures.

[Here is the JavaScript][6], and [here is a demo][7] of the whole shebang.

### Benchmarks

Is it really faster to do it the way I've described? Yes, it is. It is [way faster,][8] even when you compare it to code that has far fewer features.

 [1]: http://www.gazingus.org/html/Date_Formatting_Function.html
 [2]: http://www.mattkruse.com/javascript/date/source.html
 [3]: http://www.svendtofte.com/code/date_format/
 [4]: http://www.xaprb.com/blog/2005/09/29/javascript-date-chooser/
 [5]: http://www.php.net/manual/en/function.date.php
 [6]: http://www.xaprb.com/articles/date-functions.zip
 [7]: http://www.xaprb.com/articles/date-formatting-demo.html
 [8]: http://www.xaprb.com/blog/2006/05/14/javascript-date-formatting-benchmarks/
