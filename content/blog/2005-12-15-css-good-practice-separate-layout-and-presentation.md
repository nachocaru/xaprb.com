---
title: How to use CSS to go beyond separation of content and presentation
author: Baron Schwartz
excerpt: '<p>CSS helps separate content and presentation in web pages.  This article explains how to take that to the next level.</p>'
layout: post
permalink: /2005/12/15/css-good-practice-separate-layout-and-presentation/
---
One of CSS&#8217;s loftiest goals was to help separate content and presentation on the Web<sup>1</sup>. It has succeeded to some degree, bringing great benefits in terms of maintainability, usability, and accessibility.

### Think at a higher level

There is much noise about content and presentation, but it&#8217;s not the only beneficial separation. In fact, pick any dimensions you wish, and I think you can benefit by distinguishing among them *at least to some degree*: content, presentation, structure, behavior, and so forth.

One reason separation is good that it actually lets me factor out repetition and shared aspects, and deal with them just once. In this sense, I&#8217;m not just separating things in one place, I&#8217;m bringing them together in another. Aspect-Oriented Programming is a great example from the programming world. However, it is technique, rather than technology, that is important. CSS doesn&#8217;t guarantee the separation &#8212; it&#8217;s how I use it that matters.

With this in mind, I am currently ruminating the following: I think it&#8217;s a Good Thing to separate layout and presentation *within CSS*. Again, these are just dimensions within one technology; I think making the proper distinction between the two is just a good practice.

### Definitions

First let me define the terms as I use them in this article:

Layout Styles
:   dictate how the elements of the page are arranged: where is the navigation, is the content a fixed-width column that&#8217;s centered on the page, and so forth. Layout markup is usually about setting some properties of elements that hold the &#8220;real content&#8221; of the page.

Presentational Styles
:   specify how the &#8220;real content&#8221; appears: font size, colors, borders, link hover effects and so forth.

### What this means on a real website

In terms of a typical website that uses CSS for both purposes (layout and presentation), many elements on the page will have both types of styles. Global navigation, for example, will almost certainly have some positioning styles attached to a container, and often will have hover effects on links too. What if I want to change how the page is laid out, but not be distracted by all the font sizes on headers, margins on the lists, and so forth? I&#8217;ve done this myself and found it difficult to sort through an entire stylesheet, ignoring the presentation haystack to find the layout needle. Since then I&#8217;ve tried to keep the two separate, either by just using comments to mark separate sections within the one file, or by using two files. `@include` is great for this &#8212; the presentation stylesheet can include the layout stylesheet at the beginning. It helps a lot.

I don&#8217;t consider myself an expert on this. Not much attention has been paid to good practices when writing stylesheets. Everyone&#8217;s writing about standards, browsers, and so forth. For some reason, good writing practices don&#8217;t seem to be sexy (yet), and maybe that&#8217;s why everyone is eager to write about other things. I think this may have a lot to do with who&#8217;s writing CSS. In many cases, it&#8217;s not programmers, so as a programmer, I often find people&#8217;s stylesheets to be big freakin&#8217; messes. In traditional programming, much effort has gone into studying what makes code maintainable, easily verifiable, and so forth. Similar work doesn&#8217;t seem to exist for CSS (though I personally feel the same principles apply). There&#8217;s not much, if any, guidance about style when writing CSS. How to indent, naming guidelines, and order of properties come to my mind when I think of this. Again, I don&#8217;t think I have anything more to offer than other people, but I&#8217;m thinking about it. Maybe at some point I&#8217;ll put some time into it and produce my own code standards for CSS. I&#8217;m sure others will start doing so as well, especially as CSS becomes more widely used and some people start getting stuck with bad code. When people get fed up with it, they&#8217;ll do something about it :-)

### Perfection is an illusion

As a side note, I would like to say complete separation of content and presentation (or anything else) is not possible in many cases, despite some people&#8217;s [insistence to the contrary][1]. It&#8217;s a myth. A lot of this is because any given feature often belongs in several domains, so imposing a strict hierarchy rarely works (the realization that hierarchical taxonomies are flawed is exactly where all the &#8220;tagging&#8221; in Web 2.0 is coming from). I wrote my thesis on visual and informational representations of music and I&#8217;ve found it&#8217;s rarely clear-cut, be it music or text. My experience with music made me take a fresh look at HTML, and I was amazed at how my perspective changed. There&#8217;s much to be gained from an 80% solution, though, so fire away!

* * *

[1] People say this many different ways, such as &#8220;structure and presentation&#8221; and so forth. My memory says &#8220;content and presentation&#8221; was the first such phrase to be bandied about, and the terminology has changed over the last 6-8 years.

 [1]: http://www.alistapart.com/articles/separationdilemma/