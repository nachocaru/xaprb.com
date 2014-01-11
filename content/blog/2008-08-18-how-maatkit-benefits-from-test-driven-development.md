---
title: How Maatkit benefits from test-driven development
author: Baron Schwartz
layout: post
permalink: /2008/08/18/how-maatkit-benefits-from-test-driven-development/
categories:
  - Coding
  - Maatkit
  - Perl
  - SQL
tags:
  - CRC32
  - Daniel Nichter
  - MySQL
  - Test Driven Development
  - The Rimm Kaufman Group
---
Over in [Maatkit][1]-land, [Daniel Nichter][2] and I practice [test-first programming, AKA test-driven development][3]. That is, we write tests for each new feature or to catch regressions on each bug we fix. And &#8212; this is crucial &#8212; we write the tests *before* we write the code.* The tests should initially fail, which is a validation that the new code actually works and the tests actually verify this. If we don&#8217;t first write a failing testcase, then our code lacks a very important guarantee: &#8220;if you break this code, then the test case will tell you so.&#8221; (A test that doesn&#8217;t fail when the code fails isn&#8217;t worth writing.)

<!--more-->

Most of the time when I do this, I write a test, it fails because I haven&#8217;t written any code yet, and I then go do some kind of clean-room coding. Then I run the test and it&#8217;s busted, and I have to go back to the code and figure out why, and after a few more tries I get it working. And then it feels great. (That&#8217;s the other thing about test-first coding. It&#8217;s really satisfying, like cooking the perfect dinner, arranging the plates beautifully and then eating.)

This time I wanted to write a pure-Perl implementation of CRC32, and embed it in mk-table-checksum. We try really hard never to rely on external modules, even modules that ought to be distributed with Perl itself. That keeps Maatkit as portable as possible and makes sure there is no installation hell. You can generally just get and run the Maatkit tools with no installation. So I referred to an existing CRC32 implementation, in [Digest::Crc32][4]. I wrote a test by referring to the value I got from MySQL&#8217;s built-in CRC32:

<pre>mysql> select crc32('hello world');
+----------------------+
| crc32('hello world') |
+----------------------+
|            222957957 | 
+----------------------+
1 row in set (0.00 sec)
</pre>

Here&#8217;s the test:

<pre>is($c-&gt;crc32('hello world'), 222957957, 'CRC32 of hello world');</pre>

CRC32 is CRC32, so my code better agree with a working implementation. And then I wrote the code, which is a refactoring of the math in the module I linked to above. And then I ran the test, and it Just Passed with no further ado. w00t! This is pretty much a historic first for me! I thought at first that I&#8217;d screwed something up with the test, but I checked again. This is like getting a hole-in-one for me :-) So I just thought I&#8217;d share it with you. It feels **awesome**.

If you&#8217;re not doing test-first coding, you ought to give it a try. If you are conscientious about writing tests first, your code will always be easy to test. If you don&#8217;t, you write untestable code. Then it&#8217;s tough or impossible to ever get tests on it, and you spend the rest of your life wasting time on stupid bugs and slow, fearful development, never knowing what else you are breaking with your &#8220;fixes.&#8221;

Test-driven development is one reason [The Rimm-Kaufman Group&#8217;s][5] in-house bidding system blows away their competition. (RKG is my previous employer.) The comprehensive unit-test suite lets you know right away if you&#8217;ve broken something. That keeps the code clean and makes it possible to be extremely productive. I remember once when one of my co-workers there implemented a major feature in a very short time. It was also incredibly helpful when sharding the databases (anyone ever done this without a test suite? Would you like to share about how much of your systems broke during sharding? It was almost a non-event at RKG). The people I worked with before I joined RKG looked at me like an alien when I tried to explain that this was possible.

If you&#8217;re thinking that your code is not &#8220;that kind of code,&#8221; that &#8220;only certain kinds of code lend themselves to unit tests,&#8221; then stop. I&#8217;ve heard this before, and you&#8217;re wrong. It&#8217;s only &#8220;untestable&#8221; because you didn&#8217;t write tests first. Write tests first, and your code &#8212; all of it! &#8212; will be &#8220;that kind of code&#8221; that is testable. It&#8217;s hard. No one says it&#8217;s not; good programming is much harder than sloppy programming. But it&#8217;s well worth it.

Converting untested, untestable code into tested code is not so much fun, though. And in my experience you&#8217;ll rarely be rewarded for it, and your coworkers will not appreciate you raising the bar for them. Maybe you need a new job. I hear RKG is hiring. Did I mention that their codebase is built from the ground up on unit tests?

* OK, we&#8217;re not perfectly disciplined about this, but we&#8217;re pretty good about it.

 [1]: http://www.maatkit.org/
 [2]: http://hackmysql.com/
 [3]: http://en.wikipedia.org/wiki/Test-driven_development
 [4]: http://search.cpan.org/~fays/Digest-Crc32-0.01/Crc32.pm
 [5]: http://www.rimmkaufman.com/