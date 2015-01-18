---
title: A PHP implementation of the XML DOM
date: "2006-10-31"
url: /blog/2006/10/31/dom4php-a-php-dom-implementation/
categories:
  - Web
  - Programming
---

Several years ago I wrote a pure PHP library for manipulating [XML][1] documents with the Document Object Model ([DOM][2]) in [PHP][3] 4, without external libraries such as libxml. This is often useful on shared hosting providers, where you can't get C extensions installed. The library uses [PHP4&#8242;s built-in SAX ][4]functions, which are enabled by default. Today I'm re-releasing this library under the LGPL (EDIT: later re-released under MIT). You can find it [here](https://github.com/xaprb/dom4php)

### Introduction

It's not too hard to build a DOM implementation on top of SAX. In fact, many DOM libraries actually use this technique. You just need to know the [DOM core specification][5] really well, and understand SAX really well. Everything else is easy, haha. The truth is, I don't know how well I knew the spec back then, and I've no time to check right now, so you'll have to let me know.

Since I wrote this years ago, before I was enamored of unit testing, I don't know how good it is. I've used it for several years in production systems without ever looking at the actual code again -- I just use it and take for granted that it works. I may or may not have time to actually write tests for it (probably not, sorry). Maybe you can help me with that. It shouldn't be hard, but I just don't have the time for it.

If you do want to hack the source, I encourage you to be ready to use a debugger. Getting references right is the tricky part. There are *lots* of references to be built and manipulated in a structure as complex as the DOM, and handling references correctly in PHP 4 is anything but easy for most people.

### Documentation

I never wrote much documentation for this library, but I might attempt to remedy that at some point (I probably don't have time though -- sorry). In the meantime, here's a synopsis to get you started:

<pre>&lt;?php

# Create a parser and parse a simple document.
include_once("XmlParser.php");
$parser   = new XmlParser($encoding = 'ISO-8859-1'); # encoding is optional
$document = $parser-&gt;parse('&lt;p class="test"&gt;&lt;strong&gt;this is a document&lt;/strong&gt;&lt;/p&gt;');

# Add a text node.
$text =& $document-&gt;createTextNode('foozle');
$document-&gt;childNodes[0]-&gt;appendChild($text);

# Navigate around the document a bit, starting at the new node we just added.
$strong =& $text-&gt;previousSibling;
echo "The content of the node is '" . $strong-&gt;childNodes[0]-&gt;data . "'\n";

# Serialize the XML document to a string.  Do NOT use print_r() as the cyclic
# data structures will cause problems.  Instead, create an instance of the
# XmlSerializer class.
include_once("XmlSerializer.php");
$serializer = new XmlSerializer("XML");
echo $serializer-&gt;serializeNode($document);
echo "\n";

?&gt;</pre>

The real documentation is the [DOM core specification][5], as I said. The object you get back from calling `parse()` is a `Document`, and you just use the DOM as normal after that.

### Differences from the DOM spec

The DOM spec is pretty heavy-weight, and coding something like this in pure PHP isn't as efficient as using a C library. I made a couple of compromises for simplicity, performance, and convenience. The result should be a nearly complete DOM implementation, with much less code and overhead than it would take to follow the spec exactly. Here are the differences from the official specification:

1.  ID attributes (refer to the XML spec if you don't know what that means) are assumed to be named "id" and are kept in a lookup table with the document. This makes sure you can't duplicate an ID, and provides fast access to any element by ID. If you need to change the name from "id" to something else, you can do that.
2.  Attributes aren't object-ified. Instead, attributes are stored as a lighter-weight associative array with each `Node`. You can set and retrieve attributes with object methods, but they aren't objects themselves.
3.  `Node` contains some convenience methods not found in the official spec. These are, for example, `getElementsByAttributeValue()`. Most of them are only used internally, but a few are meant for external use too.
4.  Many of the interfaces in the official spec aren't really necessary for an 80% solution, including `DOMImplementation` and `NamedNodeMap`. I omit those.
5.  No support for namespaces or namespace methods (e.g. `createAttributeNS`)

There may be other differences too, but I can't think of them right now. Write into the comments if you see anything I missed. By the way, if you need some of the missing pieces such as `NamedNodeMap`, I can provide skeleton classes for you; I originally coded them, but then deleted them.

### License

I'm releasing this under the [GNU LGPL][6]. At one time I had licensed it under the normal GPL, but [this isn't appropriate for a library][7], so I'm re-licensing it. EDIT: re-re-licensed under MIT. See [https://github.com/xaprb/dom4php](https://github.com/xaprb/dom4php).

### Feedback welcome, and thanks for all the fish

Please do leave feedback in the comments. Since I wrote this years ago and haven't really thought about it since then, I have no idea how good it is -- I can only say I haven't run into any bugs in a while. Maybe I haven't implemented some things I should have, or maybe there are braindead things I've done, who knows. Regardless, I hope you find it helpful.

See you next time!

 [1]: http://www.w3.org/XML/
 [2]: http://www.w3.org/DOM/
 [3]: http://www.php.net/
 [4]: http://php.net/xml
 [5]: http://www.w3.org/TR/DOM-Level-2-Core/core.html
 [6]: http://www.gnu.org/copyleft/lgpl.html
 [7]: http://www.xaprb.com/blog/2006/06/19/xaprb-scripts-relicensed/

