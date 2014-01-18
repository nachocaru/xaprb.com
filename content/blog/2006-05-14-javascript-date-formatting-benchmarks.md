---
title: JavaScript date formatting benchmarks
date: "2006-05-14"
url: /blog/2006/05/14/javascript-date-formatting-benchmarks/
categories:
  - Web
---
<p style="border:solid red 1px; background:yellow">
  If you have questions or comments or bugs report, or a change to make, be sure to use the project's new homepage: <a href="http://code.google.com/p/flexible-js-formatting/">Flexible JS Formatting Libraries</a>
</p>

Two earlier articles demonstrated how to [format][1] and [parse][2] dates flexibly with JavaScript. I asserted in those articles that my approach was efficient, though I didn't provide any numbers to prove my claim. This article compares the performance of my date-formatting library against several other date-formatting libraries I've found online.

I'd like to benchmark my date-parsing library too, but I haven't seen any comparable implementations. By the way, my date-formatting and date-parsing libraries are wrapped into a single file, so even though I'm not actually executing the date-parsing functions in this benchmark, they're compiled anyway.

### Motivation

My motivation for this article is simply to demonstrate the truth of what I said earlier: writing code to write code can be very efficient. I'm explicitly *not* trying to say I'm "better" than anyone, or someone else does anything "wrong" or anything like that. This series of articles really isn't even about date manipulation! It's about demonstrating a programming technique: write a function that can write other functions, making it possible to **optimize code whose behavior depends on input that is not known until runtime**. That's why my first date-formatting article was originally titled "JavaScript closures for runtime efficiency."

Note that my motivation also isn't to make the fastest date formatting code. I haven't really tried to optimize for speed, but if I wanted to, I think I could probably find some bottlenecks and optimize my own code further.

All I'm trying to do is demonstrate the general coding methodology I used, because I often see folks using a much less optimal solution, probably because they don't know about (or aren't comfortable with) dynamic code generation. That's just my opinion.

### Setup

I ran these benchmarks on Firefox 1.5.0.2 on my home computer, a fairly new and powerful AMD64 machine running Gentoo GNU/Linux. I won't bother telling you all the hardware specs&#8230; that always makes my eyes glaze over.

I created a set of pages that do nothing but include the JavaScript files needed, and run 100,000 iterations of date-formatting. I closed my browser window between each test, and nothing else was running on my machine. I ran each test several times and averaged the results, rounding to four significant digits.

I had to increase the script timeout so Firefox wouldn't interrupt the tests. I did this by opening `about:config`, then changing `dom.max_script_run_time` to 5000 seconds.

### Results

Here's a graph of the times. The algorithms are in alphabetical order:

<img src="/media/2006/05/date-formatting-benchmark.png" alt="JavaScript date-formatting benchmark" height="311" width="463" /> 
Obviously, the method I use is much faster -- between 3.15 and 4.89 times faster. Here are the results as numbers in a table. **WARNING**: If you click on the links to the benchmarks, your browser will probably freeze for the better part of a minute on a fast machine -- maybe longer on a slow machine.

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
      <a href="/media/2006/05/date-formatting-benchmarks/test-dojotoolkit.html">Link</a>
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
      <a href="/media/2006/05/date-formatting-benchmarks/test-gazingus.html">Link</a>
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
      <a href="/media/2006/05/date-formatting-benchmarks/test-mattkruse.html">Link</a>
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
      <a href="/media/2006/05/date-formatting-benchmarks/test-svendtofte.html">Link</a>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="http://www.xaprb.com/blog/2005/12/20/javascript-date-parsing/">Xaprb</a>
    </td>
    
    <td>
      10.80
    </td>
    
    <td>
      1.00
    </td>
    
    <td>
      <a href="/media/2006/05/date-formatting-benchmarks/test-xaprb.html">Link</a>
    </td>
  </tr>
</table>

### Is this an apples-to-apples comparison?

Absolutely not, and if it were, the slowness of the other methods would be even more obvious.

First of all, I'm only testing a single method of formatting -- producing a date in YYYY-MM-DD format. I also haven't been scientific enough to really be accurate.

Beyond that, though, these various bits of code I've benchmarked are vastly different. The one that provides the most similar *formatting* functionality to mine is Svend Tofte's (that's probably why it's the slowest), but even that one only does *parsing*, not *formatting* (mine does both). The others are much less fully-featured, which means they'd probably be even less performant if someone extended them to implement the same set of functionality.

As I said above, I'm not doing this to pick on anyone, but the Dojo method is probably the least efficient. It's the simplest of all, providing only a few formatting characters, and it's not really that much faster than Svend Tofte's implementation. It's probably so slow because it a) uses lots of `if` statements and b) uses repeated string replacements with regular expressions. This is just a hunch, but if it had the rich feature set of my implementation or Svend Tofte's, I think it would probably be the slowest by far.

 [1]: http://www.xaprb.com/blog/2005/12/12/javascript-closures-for-runtime-efficiency/
 [2]: http://www.xaprb.com/blog/2005/12/20/javascript-date-parsing/
