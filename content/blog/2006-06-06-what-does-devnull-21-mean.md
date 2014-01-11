---
title: "What does > /dev/null 2>&1 mean?"
author: Baron Schwartz
layout: post
permalink: /2006/06/06/what-does-devnull-21-mean/
---
I remember being confused for a very long time about the trailing garbage in commands I saw in Unix systems, especially while watching compilers do their work. Nobody I asked could tell me what the funny greater-thans, ampersands and numbers after the commands meant, and search engines never turned up anything but examples of it being used without explanation. In this article I'll explain those weird commands.

Here's an example command:

<pre>wibble &gt; /dev/null 2&gt;&1</pre>

### Output redirection

The greater-thans (`>`) in commands like these redirect the program's output somewhere. In this case, something is being redirected into `/dev/null`, and something is being redirected into `&1`.

### Standard in, out, and error

There are three standard sources of input and output for a program. Standard input usually comes from the keyboard if it's an interactive program, or from another program if it's processing the other program's output. The program *usually* prints to standard output, and *sometimes* prints to standard error. These three file descriptors (you can think of them as "data pipes") are often called STDIN, STDOUT, and STDERR.

Sometimes they're not named, they're numbered! The built-in numberings for them are 0, 1, and 2, in that order. By default, if you don't name or number one explicitly, you're talking about STDOUT.

Given that context, you can see the command above is redirecting standard output into `/dev/null`, which is a place you can dump anything you don't want (often called the bit-bucket), then redirecting standard error into standard output (you have to put an `&` in front of the destination when you do this).

The short explanation, therefore, is "all output from this command should be shoved into a black hole." That's one good way to make a program be really quiet!
