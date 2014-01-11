---
title: JavaScript date formatting benchmarks
author: Baron Schwartz
excerpt: "<p>Two earlier articles demonstrated how to parse and format dates flexibly with JavaScript.  I asserted in those articles that my approach was efficient, though I didn't provide any numbers to prove my claim.  This article compares the performance of my date-formatting library against several other date-formatting libraries I've found online.</p>"
layout: post
permalink: /2006/05/14/javascript-date-formatting-benchmarks/
description:
  - >
    Compares the performance of my date-parsing and date-formatting library against
    several other date-formatting libraries
---
<p style="border:solid red 1px; background:yellow">
  If you have questions or comments or bugs report, or a change to make, be sure to use the project&#8217;s new homepage: <a href="http://code.google.com/p/flexible-js-formatting/">Flexible JS Formatting Libraries</a>
</p>

Two earlier articles demonstrated how to [format][1] and [parse][2] dates flexibly with JavaScript. I asserted in those articles that my approach was efficient, though I didn&#8217;t provide any numbers to prove my claim. This article compares the performance of my date-formatting library against several other date-formatting libraries I&#8217;ve found online.

I&#8217;d like to benchmark my date-parsing library too, but I haven&#8217;t seen any comparable implementations. By the way, my date-formatting and date-parsing libraries are wrapped into a single file, so even though I&#8217;m not actually executing the date-parsing functions in this benchmark, they&#8217;re compiled anyway.

### Motivation

My motivation for this article is simply to demonstrate the truth of what I said earlier: writing code to write code can be very efficient. I&#8217;m explicitly *not* trying to say I&#8217;m &#8220;better&#8221; than anyone, or someone else does anything &#8220;wrong&#8221; or anything like that. This series of articles really isn&#8217;t even about date manipulation! It&#8217;s about demonstrating a programming technique: write a function that can write other functions, making it possible to **optimize code whose behavior depends on input that is not known until runtime**. That&#8217;s why my first date-formatting article was originally titled &#8220;JavaScript closures for runtime efficiency.&#8221;

Note that my motivation also isn&#8217;t to make the fastest date formatting code. I haven&#8217;t really tried to optimize for speed, but if I wanted to, I think I could probably find some bottlenecks and optimize my own code further.

All I&#8217;m trying to do is demonstrate the general coding methodology I used, because I often see folks using a much less optimal solution, probably because they don&#8217;t know about (or aren&#8217;t comfortable with) dynamic code generation. That&#8217;s just my opinion.

### Setup

I ran these benchmarks on Firefox 1.5.0.2 on my home computer, a fairly new and powerful AMD64 machine running Gentoo GNU/Linux. I won&#8217;t bother telling you all the hardware specs&#8230; that always makes my eyes glaze over.

I created a set of pages that do nothing but include the JavaScript files needed, and run 100,000 iterations of date-formatting. I closed my browser window between each test, and nothing else was running on my machine. I ran each test several times and averaged the results, rounding to four significant digits.

I had to increase the script timeout so Firefox wouldn&#8217;t interrupt the tests. I did this by opening `about:config`, then changing `dom.max_script_run_time` to 5000 seconds.

### Results

Here&#8217;s a graph of the times. The algorithms are in alphabetical order:

<img src="/articles/images/date-formatting-benchmark.png" alt="JavaScript date-formatting benchmark" height="311" width="463" /> 
Obviously, the method I use is much faster &#8212; between 3.15 and 4.89 times faster. Here are the results as numbers in a table. **WARNING**: If you click on the links to the benchmarks, your browser will probably freeze for the better part of a minute on a fast machine &#8212; maybe longer on a slow machine.

<table class="borders collapsed">
  <caption>Javascript date-formatting benchmark</caption> <tr>
    <th scope="row">
      Algorithm
    </th>
    
    <th scope="row">
      Time
    </th>
    
    <th scope="row">
      Relative Time
    </th>
    
    <th scope="row">
      Link to benchmark
    </th>
  </tr>
  
  <tr>
    <td>
      <a href="http://www.dojotoolkit.org/">Dojo</a>
    </td>
    
    <td>
      34.00 seconds
    </td>
    
    <td>
      3.15
    </td>
    
    <td>
      <a href="/articles/date-formatting-benchmarks/test-dojotoolkit.html">Link</a>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="http://web.archive.org/web/20050204062056/http://gazingus.org/html/Date_Formatting_Function.html">Gazingus</a>
    </td>
    
    <td>
      44.36
    </td>
    
    <td>
      4.11
    </td>
    
    <td>
      <a href="/articles/date-formatting-benchmarks/test-gazingus.html">Link</a>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="http://http://www.mattkruse.com/javascript/date/source.html">Matt Kruse</a>
    </td>
    
    <td>
      37.42
    </td>
    
    <td>
      3.46
    </td>
    
    <td>
      <a href="/articles/date-formatting-benchmarks/test-mattkruse.html">Link</a>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="http://www.svendtofte.com/code/date_format/">Svend Tofte</a>
    </td>
    
    <td>
      52.83
    </td>
    
    <td>
      4.89
    </td>
    
    <td>
      <a href="/articles/date-formatting-benchmarks/test-svendtofte.html">Link</a>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="/blog/2005/12/20/javascript-date-parsing/">Xaprb</a>
    </td>
    
    <td>
      10.80
    </td>
    
    <td>
      1.00
    </td>
    
    <td>
      <a href="/articles/date-formatting-benchmarks/test-xaprb.html">Link</a>
    </td>
  </tr>
</table>

### Is this an apples-to-apples comparison?

Absolutely not, and if it were, the slowness of the other methods would be even more obvious.

First of all, I&#8217;m only testing a single method of formatting &#8212; producing a date in YYYY-MM-DD format. I also haven&#8217;t been scientific enough to really be accurate.

Beyond that, though, these various bits of code I&#8217;ve benchmarked are vastly different. The one that provides the most similar *formatting* functionality to mine is Svend Tofte&#8217;s (that&#8217;s probably why it&#8217;s the slowest), but even that one only does *parsing*, not *formatting* (mine does both). The others are much less fully-featured, which means they&#8217;d probably be even less performant if someone extended them to implement the same set of functionality.

As I said above, I&#8217;m not doing this to pick on anyone, but the Dojo method is probably the least efficient. It&#8217;s the simplest of all, providing only a few formatting characters, and it&#8217;s not really that much faster than Svend Tofte&#8217;s implementation. It&#8217;s probably so slow because it a) uses lots of `if` statements and b) uses repeated string replacements with regular expressions. This is just a hunch, but if it had the rich feature set of my implementation or Svend Tofte&#8217;s, I think it would probably be the slowest by far.

 [1]: /blog/2005/12/12/javascript-closures-for-runtime-efficiency/
 [2]: /blog/2005/12/20/javascript-date-parsing/