---
title: 'What does &#8220;> /dev/null 2>&#038;1&#8243; mean?'
author: Baron Schwartz
excerpt: "<p>I remember being confused for a very long time about the trailing garbage in commands I saw in Unix systems, especially while watching compilers do their work.  Nobody I asked could tell me what the funny greater-thans, ampersands and numbers after the commands meant, and search engines never turned up anything but examples of it being used without explanation.  In this article I'll explain those weird commands.</p>"
layout: post
permalink: /2006/06/06/what-does-devnull-21-mean/
description:
  - 'Explains what "2>&1 > /dev/null" means.'
---
I remember being confused for a very long time about the trailing garbage in commands I saw in Unix systems, especially while watching compilers do their work. Nobody I asked could tell me what the funny greater-thans, ampersands and numbers after the commands meant, and search engines never turned up anything but examples of it being used without explanation. In this article I&#8217;ll explain those weird commands.

Here&#8217;s an example command:

<pre>wibble &gt; /dev/null 2&gt;&1</pre>

### Output redirection

The greater-thans (`>`) in commands like these redirect the program&#8217;s output somewhere. In this case, something is being redirected into `/dev/null`, and something is being redirected into `&1`.

### Standard in, out, and error

There are three standard sources of input and output for a program. Standard input usually comes from the keyboard if it&#8217;s an interactive program, or from another program if it&#8217;s processing the other program&#8217;s output. The program *usually* prints to standard output, and *sometimes* prints to standard error. These three file descriptors (you can think of them as &#8220;data pipes&#8221;) are often called STDIN, STDOUT, and STDERR.

Sometimes they&#8217;re not named, they&#8217;re numbered! The built-in numberings for them are 0, 1, and 2, in that order. By default, if you don&#8217;t name or number one explicitly, you&#8217;re talking about STDOUT.

Given that context, you can see the command above is redirecting standard output into `/dev/null`, which is a place you can dump anything you don&#8217;t want (often called the bit-bucket), then redirecting standard error into standard output (you have to put an `&` in front of the destination when you do this).

The short explanation, therefore, is &#8220;all output from this command should be shoved into a black hole.&#8221; That&#8217;s one good way to make a program be really quiet!