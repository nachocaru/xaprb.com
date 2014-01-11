---
title: Simple and complex types in XML Schema
author: Baron Schwartz
excerpt: "<p>If you've worked much with XML Schema, or tried to read a schema, you've probably run into markup that refers to simple and complex types.  These terms can be confusing.  In this article I'll explain what they mean in simple terminology, and point you to resources that can help you learn more.</p>"
layout: post
permalink: /2006/03/16/simple-and-complex-types-in-xml-schema/
description:
  - >
    Explains the difference between simple and complex element types, and element
    and content types in XML Schema.
---
If you&#8217;ve worked much with XML Schema, or tried to read a schema, you&#8217;ve probably run into markup that refers to simple and complex types. These terms can be confusing. In this article I&#8217;ll explain what they mean in simple terminology, and point you to resources that can help you learn more.

### Motivation

Suppose I&#8217;m writing code to talk to a web service, and I&#8217;ve been getting error messages complaining about something called &#8220;email&#8221; being malformed when I try to invoke the `getPreferences` operation. I want to figure out exactly what the service expects me to send it. I open up the WSDL and search until I find the relevant definitions:

<pre>&lt;element name="email"&gt;
  &lt;simpleType&gt;
    &lt;restriction base="xsd:string" /&gt;
  &lt;/simpleType&gt;
&lt;/element&gt;

&lt;element name="getPreferences"&gt;
  &lt;complexType&gt;
    &lt;sequence&gt;
      &lt;element name="email" type="email" /&gt;
    &lt;/sequence&gt;
  &lt;/complexType&gt;
&lt;/element&gt;</pre>

WSDL is written with [XML Schema][1], so I&#8217;m looking at an XML Schema document. But I&#8217;ve forgotten exactly what it means. What are `simpleType` and `complexType` again? Unless I work with schemas fairly frequently, I get confused about this (even though I&#8217;ve worked with schemas for many years). I always have to refresh my memory.

### The simple answer

The most succinct answer is as follows:

<blockquote cite="http://www.w3.org/TR/xmlschema-0/#DefnDeclars">
  <p>
    In XML Schema, there is a basic difference between complex types which allow elements in their content and may carry attributes, and simple types which cannot have element content and cannot carry attributes.
  </p>
</blockquote>

That&#8217;s from the [XML Schema Primer][2], which I *highly* recommend. I think it&#8217;s probably the best introduction to XML Schema.

To summarize,

*   simple types can only have content directly contained between the element&#8217;s opening and closing tags. They cannot have attributes or child elements.
*   complex types can have attributes, can contain other elements, can contain a mixture of elements and text, etc etc.

Now I know the web service is expecting an element that looks like the following:

<pre>&lt;getPreferences&gt;
  &lt;email&gt;john@nowhere.com&lt;/email&gt;
&lt;/getPreferences&gt;</pre>

### So why am I confused?

This is pretty simple. Why do I have to refresh my memory whenever I haven&#8217;t worked with schemas for a few months? The answer is, the above refers to *element type*. There&#8217;s also something called *content type*, and some of the names are similar (and therefore confusing). Each element&#8217;s content is one of several content types:

1.  A simple type&#8217;s content can be one of: 
    1.  atomic types, which have indivisible values, such as `#000` and `#AACCDD`
    2.  list types, which have whitespace-separated lists of indivisible values, such as `blue green red`
    3.  union types, which have either atomic or list values, but they can be the union of other types, such as `blue #000 red` for a set of colors
2.  Complex types have a &#8220;content model,&#8221; which refers to how the content (the data between the element&#8217;s opening and closing tags) is arranged: 
    1.  simple content is only character data, no child elements allowed
    2.  element-only content is only children, no data allowed
    3.  mixed content means character data and child elements can be intermingled
    4.  empty content means the element is empty (`<foo/>`) and either conveys information by just existing, or has attributes but no content.

Just to clarify: elements have an element type, and their content has a content type. By the way, attributes can only have simple types, because they cannot themselves have attributes or children.

For further reading, I again heartily recommend the Primer linked above. Another good resource is Priscilla Walmsley&#8217;s <span class="title">Definitive XML Schema</span>. She not only knows her stuff (she&#8217;s part of the W3C XML Schema Working Group), but she writes very well.

 *[WSDL]: Web services description language

 [1]: http://www.w3.org/XML/Schema
 [2]: http://www.w3.org/TR/xmlschema-0/