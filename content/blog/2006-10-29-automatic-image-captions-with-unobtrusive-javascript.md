---
title: Automatic image captions with unobtrusive JavaScript
author: Baron Schwartz
excerpt: "<p>You've probably heard of unobtrusive JavaScript.  It's a simple technique that lets you create richer documents without cluttered markup or accessibility problems.  I often see link decoration and drop-shadow effects done with unobtrusive JavaScript.  How about unobtrusive image captions?  Instead of writing a caption into the page, let JavaScript do it.  In this article I'll show you how simple this can be.</p>"
layout: post
permalink: /2006/10/29/automatic-image-captions-with-unobtrusive-javascript/
description:
  - |
    Adding "captions" to images is a common bad practice in web design.  It's much better to do it with semantic markup and unobtrusive JavaScript.  This article shows you how.
---
<p class="demo">
  <a href="/articles/automatic-image-captions.html">View the Demo</a>
</p>

You&#8217;ve probably heard of unobtrusive JavaScript. It&#8217;s a simple technique that lets you create richer documents without cluttered markup or accessibility problems. I often see link decoration and drop-shadow effects done with unobtrusive JavaScript. How about unobtrusive image captions? Instead of writing a caption into the page, let JavaScript do it. In this article I&#8217;ll show you how simple this can be.

### The idea

How often have you seen websites that use a `table` or a `div` to enclose an image and some text to create a &#8220;captioned&#8221; image? Far too often, I&#8217;d guess. Semantically speaking, though, nothing in the markup actually associates the image and the &#8220;caption&#8221; &#8212; this isn&#8217;t a good way to give an image a caption. Until HTML itself actually has a true mechanism for a captioned image, or until someone makes a [microformat][1] for it, you may be better off taking the path of compromise between richness and semantic content.

That compromise, in my view, is using unobtrusive JavaScript to add richness to the site after it is loaded. The document is delivered to the browser in plain-Jane fashion, then altered after the browser loads it. The end result is no more semantic than hard-coding all the extra markup, but it&#8217;s a good trade-off in my opinion.

Plus, it makes authoring content *much* easier. Let&#8217;s see how.

### The old way

Here&#8217;s typical code you might see to create a &#8220;captioned&#8221; image:

<pre>&lt;div style="width:100px"&gt;
   &lt;img src="treefrog.png" alt="A tree frog"
      width="100" height="100" /&gt;
   &lt;p&gt;A tree frog&lt;/p&gt;
&lt;/div&gt;</pre>

You may also see inline styles, a `table` instead of a `div`, and other ugliness.

### The new way

The better way to do this is simply eliminate all that redundant typing. What&#8217;s redundant, you say? Well, the width of the wrapper element and the text of the &#8220;caption,&#8221; to mention two things. The image already has a width &#8212; why repeat it in the wrapper element? The image already has a place for associated text in its `title` attribute &#8212; why write it out again?

Let&#8217;s strip things down to the bare minimum:

<pre>&lt;img src="treefrog.png" alt="A tree frog"
      title="A tree frog" class="figure"
      width="100" height="100" /&gt;</pre>

Does that look minimal to you? If you&#8217;re thinking the `alt` attribute and the `title` attribute are redundant, I disagree. The `alt` attribute is never to be presented to the user when the image can be presented. It is an alternate representation of the content when the image isn&#8217;t available. It is not a title for the image. That&#8217;s why there is a `title` attribute for images! If it were redundant to the `alt` attribute, it wouldn&#8217;t be there.

I propose this as the bare minimum for an image, except for one thing: CSS styling. You may want to use CSS to float your image to the left or right. Nobody wants an ugly break in the text flow for an image. But that&#8217;s where I&#8217;ll start with this article.

### CSS styling

Time for a demonstration of the starting point. I&#8217;ll insert two images from [stock.xchng][2], a great free stock photography site. I&#8217;ll float one of them left and the other right with the following CSS:

<pre>.left {
   float: left;
   margin-right: 5px;
}
.right {
   float: right;
   margin-left: 5px;
}</pre>

You can see a [demonstration here][3]. It&#8217;s pretty plain, isn&#8217;t it? But it works. Nothing fancy, but then again you can do a lot with this basic markup. Now let&#8217;s add some captions to those images.

### The magic

It&#8217;s actually really easy to lift the images out of the page, insert a wrapper element, and put the image back into the wrapper. There are some subtleties, and I&#8217;ve done a thing or two to make the technique easily extensible. Here&#8217;s the code:

<pre>function addCaptionsToImages() {
   wrapImagesInDiv( 'figure', [], [ 'float' ] );
}

if(typeof window.addEventListener != 'undefined') {
   window.addEventListener('load', addCaptionsToImages, false);
}
else if(typeof document.addEventListener != 'undefined') {
   document.addEventListener('load', addCaptionsToImages, false);
}
else if(typeof window.attachEvent != 'undefined') {
   window.attachEvent('onload', addCaptionsToImages);
}

function wrapImagesInDiv( className, attributes, styles ) {
   var images = document.getElementsByClassName(className);
   for ( var i = 0; i &lt; images.length; ++i ) {
      var img = images[i];
      // Lift the image out of the page and insert a div under it.
      var parent = img.parentNode;
      var frame = document.createElement('div');
      var txt = document.createTextNode(img.getAttribute('title'));
      parent.insertBefore(frame, img);
      parent.removeChild(img);
      frame.appendChild(img);
      frame.appendChild(txt);
      // These are special cases.  We always copy these from the image to the
      // div.
      frame.style.width = img.getAttribute('width') + 'px';
      frame.className = img.className;
      // Copy specified attributes and style properties from the image to the
      // div.
      for ( var j = 0; j &lt; attributes.length; ++j ) {
         frame.setAttribute(attributes[j], img.getAttribute(attributes[j]));
      }
      for ( var j = 0; j &lt; styles.length; ++j ) {
         frame.style[styles[j]] = img.style[styles[j]];
      }
   }
}</pre>

I&#8217;ll break that down a bit at a time. The first few lines define a function to be called on page load. I use [Scott Andrew&#8217;s cross-browser onload functionality][4] to add an event that&#8217;ll call the `wrapImagesInDiv` function with the desired arguments. I do this because I want the flexibility of passing desired arguments.

Next I define the `wrapImagesInDiv` function itself. This function accepts a class name, an array of attribute names, and an array of style property names. The class name defines the target elements: everything with a class of &#8220;figure.&#8221; The array of attribute names specifies which attribute values should be copied from the image to its wrapper, and likewise with style properties. You&#8217;ll see where I use those in a bit.

The first line inside the function uses the `document.getElementsByClassName` method supplied by the [Prototype library][5] to find all the images labelled with `class="figure"`. There are other ways to do this, but I think Prototype is ubiquitous enough that this is a fine choice.

After that, the script simply loops through the array of resulting objects. For each object, it gets a reference to the parent element, creates a `div` element, moves the image inside that, and appends the image&#8217;s `title` attribute as text afterward.

Then it does a couple of tricky things. First, it sizes the wrapper horizontally to match the image. This is necessary so the wrapper doesn&#8217;t take over the entire width of the page. Next it copies the image&#8217;s class to the wrapper. This is necessary to preserve any CSS styling that was used to place the image relative to the text. In my case, this preserves the left-floating and right-floating I created in the first example.

Finally, it loops through every other attribute and style property I specified, and copies those from the image to its wrapper. This is an easy way to get the same script to do lots of different things &#8212; you just give it different arguments. Do you want the wrapper to have the same `title` attribute as the image? Fine, just add &#8216;title&#8217; to the argument array &#8212; I&#8217;m all about choice.

I&#8217;ll add a couple extra lines of CSS to make things prettier, too. Here&#8217;s the result: [automatic image captions without ugly markup][6].

### Further tweaks

This is a really simple technique, and you can go much further with it. Here are some more ideas:

1.  Use Roger Johansson&#8217;s technique to [add custom corners, borders, and drop shadows][7]. Why not?
2.  In keeping with thinking of the images as &#8220;figures,&#8221; auto-number them, and create references to them on the fly by adding in other hooks for JavaScript.
3.  Tables could be figures, too, and you could auto-number and auto-reference them. But don&#8217;t auto-caption tables, because they already have a caption element of their own.
4.  Generate a table of figures for your document.

If you haven&#8217;t done much reading on [unobtrusive JavaScript][8], you really should. You can do so much with it. And the best part is, it lets you keep your HTML sooooo much cleaner and saves you so much work.

### Conclusion

I hope this article has helped you break out of a common web design rut and snazzy up your documents without adding un-semantic markup bloat. If you thought this was good, let me know! If you want to suggest some improvement, let me know that too! And if you want to [subscribe to my articles, go right ahead][9]. It&#8217;s free and easy.

 [1]: /blog/2006/08/30/why-you-should-take-microformats-seriously/
 [2]: http://www.sxc.hu/
 [3]: /articles/automatic-image-captions-before.html
 [4]: http://www.scottandrew.com/weblog/articles/cbs-events
 [5]: http://prototype.conio.net/
 [6]: /articles/automatic-image-captions.html
 [7]: http://www.456bereastreet.com/archive/200505/transparent_custom_corners_and_borders/
 [8]: http://onlinetools.org/articles/unobtrusivejavascript/
 [9]: /blog/subscribe