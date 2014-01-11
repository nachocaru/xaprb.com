---
title: Designing a database interface for programmers
author: Baron Schwartz
layout: post
permalink: /2012/10/22/designing-a-database-interface-for-programmers/
categories:
  - Go
  - SQL
---
How do you connect to and converse with your database of choice (MySQL, in my case)? Chances are it&#8217;s largely formed by the programming language you choose. I&#8217;ve worked with a variety of programming languages. Anytime I begin learning a new one, I am reminded again that there&#8217;s more than one way to skin a cat.

Over the last few years, I&#8217;ve mostly programmed in Perl and shell. The shell interface to MySQL is simple: the `mysql` command-line tool. There is not much to think about. In Perl, however, the standard is to use DBI. I have grown accustomed to DBI over the years, but that doesn&#8217;t mean I like it. I think it&#8217;s one of the worst database APIs I&#8217;ve seen. The abstractions it uses (there are only two object abstractions: connections and &#8220;statement handles&#8221;) are awkward to the extreme.

It does get worse, though. PHP historically used libmysql&#8217;s C library for connecting to MySQL, and similarly used native drivers/libraries for every other database. You had no notion of abstraction: you called the library&#8217;s functions directly. Sure, there were PEAR libraries to wrap around this, but a) they were ugly too, and not really a PHP standard, and b) the language could have done us all a favor and defined a common interface that all of the drivers could be wrapped inside. That&#8217;s what every other language tends to do, love it or hate it. When I wrote a lot of PHP, and this was before the newer drivers were available, I wrote a set of classes to abstract away from the raw libmysql C function calls.

Guess what design I chose to emulate for that? Microsoft&#8217;s. Microsoft&#8217;s database interaction libraries make a lot of sense for me. There&#8217;s a notion of a Connection. You can create a Statement that&#8217;s tied to the connection, and when you execute the Statement, you get a Result, and so on. This is fairly consistent for VBScript (ASP), Visual Basic, the .NET class libraries, and so on. It is a clean and straightforward design. The functions you want to execute map to verbs you think about, and the nouns/objects are also obvious. You execute a Statement to get a Result.

Think about that in contrast to Perl, where you prepare a Statement against a Database (not a Connection?) and then execute a Statement ($sth) to get&#8230; nothing but an indication of whether it succeeded, and then you start retrieving rows from&#8230; the $sth? Huh? But rows don&#8217;t belong to a Statement, they belong to a Result! Oh, I get it, after I execute a Statement, it shape-shifts into a Result. And then I can re-execute it&#8230; bleh. All of the nouns are overloaded with several meanings because there aren&#8217;t enough nouns to represent the variety of concepts, and the verbs are attached to the wrong nouns, and it&#8217;s just ugly.

Funny enough, I never wrote a sane interface around DBI. (It&#8217;s already a wrapper anyway.) I just dealt with it. But I never liked it, and somehow I must have been like the frog in the teapot and never jumped out.

I&#8217;m learning a new language now &#8212; Go &#8212; and it&#8217;s time to learn how Go wants me to think about databases. Will it be sane or awkward? I don&#8217;t know yet. The documentation doesn&#8217;t take any time to introduce it, so I&#8217;ll just work through it and see how it&#8217;s done.