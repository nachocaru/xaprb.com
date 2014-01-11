---
title: How to quote and encode XML attribute values
author: Baron Schwartz
excerpt: '<p>Attribute values in XML are usually double-quoted, but single-quotes can be used as well.  This article explains when and where you can use single and double quotes, and as a bonus, when and where you need to use entities for angle brackets.</p>'
layout: post
permalink: /2005/10/21/quotes-around-xml-attribute-values/
---
Attribute values in XML are usually double-quoted, but single-quotes can be used as well, according to the relevant part of the [XML Spec][1]. Here is the production:

<pre>[10] AttValue ::= '"' ([^&lt;&"] | Reference)* '"'
                  | "'" ([^&lt;&'] | Reference)* "'"</pre>

In plain English: an attribute consists of

*   a double or single quote
*   any number of the following: 
    *   any character but <, & or " OR
    *   an entity reference
*   the same character that was used to begin the attribute (double or single quote)

What's most interesting about this to me is that a < is forbidden inside attribute values, but a > is not. I always assumed both were illegal.

This is why I love reading specs. The XML spec is a great example of clear and terse writing. There is no chance for confusion when reading the productions themselves! Any secondary source can only obscure the matter, in my opinion.

 [1]: http://www.w3.org/TR/REC-xml/#NT-AttValue
