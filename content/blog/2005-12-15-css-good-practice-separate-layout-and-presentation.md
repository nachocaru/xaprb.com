---
title: How to use CSS to go beyond separation of content and presentation
date: "2005-12-15"
url: /blog/2005/12/15/css-good-practice-separate-layout-and-presentation/
categories:
    - Web
---
One of CSS's loftiest goals was to help separate content and presentation on the Web<sup>1</sup>. It has succeeded to some degree, bringing great benefits in terms of maintainability, usability, and accessibility.

### Think at a higher level

There is much noise about content and presentation, but it's not the only beneficial separation. In fact, pick any dimensions you wish, and I think you can benefit by distinguishing among them *at least to some degree*: content, presentation, structure, behavior, and so forth.

One reason separation is good that it actually lets me factor out repetition and shared aspects, and deal with them just once. In this sense, I'm not just separating things in one place, I'm bringing them together in another. Aspect-Oriented Programming is a great example from the programming world. However, it is technique, rather than technology, that is important. CSS doesn't guarantee the separation -- it's how I use it that matters.

With this in mind, I am currently ruminating the following: I think it's a Good Thing to separate layout and presentation *within CSS*. Again, these are just dimensions within one technology; I think making the proper distinction between the two is just a good practice.

### Definitions

First let me define the terms as I use them in this article:

Layout Styles
:   dictate how the elements of the page are arranged: where is the navigation, is the content a fixed-width column that's centered on the page, and so forth. Layout markup is usually about setting some properties of elements that hold the "real content" of the page.

Presentational Styles
:   specify how the "real content" appears: font size, colors, borders, link hover effects and so forth.

### What this means on a real website

In terms of a typical website that uses CSS for both purposes (layout and presentation), many elements on the page will have both types of styles. Global navigation, for example, will almost certainly have some positioning styles attached to a container, and often will have hover effects on links too. What if I want to change how the page is laid out, but not be distracted by all the font sizes on headers, margins on the lists, and so forth? I've done this myself and found it difficult to sort through an entire stylesheet, ignoring the presentation haystack to find the layout needle. Since then I've tried to keep the two separate, either by just using comments to mark separate sections within the one file, or by using two files. `@include` is great for this -- the presentation stylesheet can include the layout stylesheet at the beginning. It helps a lot.

I don't consider myself an expert on this. Not much attention has been paid to good practices when writing stylesheets. Everyone's writing about standards, browsers, and so forth. For some reason, good writing practices don't seem to be sexy (yet), and maybe that's why everyone is eager to write about other things. I think this may have a lot to do with who's writing CSS. In many cases, it's not programmers, so as a programmer, I often find people's stylesheets to be big freakin' messes. In traditional programming, much effort has gone into studying what makes code maintainable, easily verifiable, and so forth. Similar work doesn't seem to exist for CSS (though I personally feel the same principles apply). There's not much, if any, guidance about style when writing CSS. How to indent, naming guidelines, and order of properties come to my mind when I think of this. Again, I don't think I have anything more to offer than other people, but I'm thinking about it. Maybe at some point I'll put some time into it and produce my own code standards for CSS. I'm sure others will start doing so as well, especially as CSS becomes more widely used and some people start getting stuck with bad code. When people get fed up with it, they'll do something about it :-)

### Perfection is an illusion

As a side note, I would like to say complete separation of content and presentation (or anything else) is not possible in many cases, despite some people's [insistence to the contrary][1]. It's a myth. A lot of this is because any given feature often belongs in several domains, so imposing a strict hierarchy rarely works (the realization that hierarchical taxonomies are flawed is exactly where all the "tagging" in Web 2.0 is coming from). I wrote my thesis on visual and informational representations of music and I've found it's rarely clear-cut, be it music or text. My experience with music made me take a fresh look at HTML, and I was amazed at how my perspective changed. There's much to be gained from an 80% solution, though, so fire away!

* * *

[1] People say this many different ways, such as "structure and presentation" and so forth. My memory says "content and presentation" was the first such phrase to be bandied about, and the terminology has changed over the last 6-8 years.

 [1]: http://www.alistapart.com/articles/separationdilemma/
