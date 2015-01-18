---
title: "Don't use future reserved words as identifiers in JavaScript"
date: "2005-12-23"
url: /blog/2005/12/23/future-reserved-words/
categories:
  - Web
---
Just a quick note: I found recently that some browsers don't complain when I use future reserved words as identifiers in JavaScript. Specifically, I used `char` as a variable name, and no Windows browser had a problem with it -- but when I tested on Mac, both Safari and Firefox complained. Apparently there are differences in JavaScript implementation between the Windows and Mac versions of Firefox 1.5!

Nitty-gritty details: the [ECMA-262 spec][1] defines reserved words and future reserved words in section 7.5.1. Many OO-ish keywords like `implements` are reserved for the future, as well as specific data types like `int` and ... you guessed it, `char`.

 [1]: http://www.ecma-international.org/publications/standards/Ecma-262.htm
