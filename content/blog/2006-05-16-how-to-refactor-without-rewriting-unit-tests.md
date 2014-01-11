---
title: How to write unit tests for ease of refactoring
author: Baron Schwartz
excerpt: "<p>Unit testing can help make code much more flexible by giving an unambigous, yes-or-no answer about whether the code is right.  In this article I'll explain an important principle for making unit tests most useful for refactoring.</p>"
layout: post
permalink: /2006/05/16/how-to-refactor-without-rewriting-unit-tests/
description:
  - >
    Explains why testing behavior, not implementation, can help avoid the need to
    change unit tests when the implementation changes.
---
Unit testing can help make code much more flexible by giving an unambigous, yes-or-no answer about whether the code is right. In this article I&#8217;ll explain an important principle for making unit tests most useful for refactoring: **Test the behavior, not the implementation**.

This may not seem important at first glance, but consider what happens when the implementation is tested. If the implementation changes, the test suite breaks! That makes correct refactoring impossible. Remember, to refactor correctly, the implementation must pass *exactly the same tests after the refactoring*.

Of course, in the real world, the test suite may not be absolutely complete and correct; the refactoring may reveal bugs the test suite didn&#8217;t catch, and if there are such bugs, that&#8217;s a good thing. So &#8220;don&#8217;t touch the tests&#8221; is not an ironclad rule, but it&#8217;s a good guiding principle for a disciplined approach.

Tesing only the behavior is a lofty goal, but in my opinion one worth striving towards. At my previous employer I wrote a .NET implementation of a special-purpose template language &#8212; essentially a re-code of XSLT. I had a very thorough test suite for the whole system, and was able to refactor from regular expression parsing to a state machine &#8212; a totally different strategy (well, okay, regexes are state machines too) without changing a single test, in an afternoon &#8212; without a single bug. That was a pretty complex language; it took me weeks to write the grammar and implement the first time, with help from two other people! It was one of my first experiences with real, hardcore unit testing, and I&#8217;ll never forget it.
It also taught me the valuable lesson I&#8217;m espousing in this article. It was partly because I was using a strongly typed language, and a highly cohesive, loosely coupled object-oriented design, that my tests were all about behavior and not implementation, but it was partly luck, too. In fact, I didn&#8217;t realize the distinction until I thought about refactoring another system at my present employer, where the unit tests check the type of the objects the system handles &#8212; making it impossible to re-implement with primitive types instead of user-defined types, unless I change the tests.

I think there&#8217;s a natural tendency to test the implementation as a coding assist. For instance, in a weakly typed language, it can be tough to make sure a variable has the desired type. I understand the desire to put it in the unit tests, and I am not sure where else it belongs, but I really think it doesn&#8217;t belong there. It makes the code harder to change, which defeats the purpose of unit testing.

 *[XSLT]: Extensible Stylesheet Language Transformations