---
title: Growth limits of open-source vis-a-vis MySQL Toolkit
author: Baron Schwartz
excerpt: |
  <p><a href="http://opensourcestrategies.blogspot.com/2007/10/limits-of-open-source.html">Si Chen wrote recently about the growth limits of open-source projects</a>.  He points out that as a project becomes larger, it gets harder to maintain.  I can only agree.  As the <a href="http://mysqltoolkit.sourceforge.net">MySQL Toolkit</a> project has grown, it's become significantly more work to maintain, document, and enhance.</p>
layout: post
permalink: /2007/11/05/growth-limits-of-open-source-vis-a-vis-mysql-toolkit/
description:
  - >
    Growing an open-source project is a challenge that separates good and bad very
    clearly.
tags:
  - Kurt Vonnegut
  - MySQL
  - Perl
  - Si Chen
  - sourceforge
  - SQL
  - Test Driven Development
  - unit testing
  - Zmanda
---
[Si Chen wrote recently about the growth limits of open-source projects][1]. He points out that as a project becomes larger, it gets harder to maintain. I can only agree. As the [MySQL Toolkit][2] project has grown, it&#8217;s become significantly more work to maintain, document, and enhance. (This is why I&#8217;m asking you to [sponsor me for a week off my regular job to work on MySQL Table Sync][3], by the way. Please toss some money in the hat.)

Rewriting code so it&#8217;s testable is a major focus for me now. Some of these tools have gotten complicated enough that I can&#8217;t keep track of all the code. In other words, they&#8217;re collapsing under their own weight.

Back in the project&#8217;s humble beginnings, it seemed adequate to just copy and paste a few lines here and there; after all, these are just scripts, right? Right. So I&#8217;ll just copy a few lines of code that do command-line option parsing and help screens. Hey, it turns out that several of the tools can connect to more than one server, so simple -u, -h and -p options won&#8217;t do; so I invent a DSN-like notation that lets the tools connect to an arbitrary number of servers. Copy and paste that code, too. It&#8217;s only ten lines &#8212; no big deal. Pretty soon I find out that many of the standard Perl modules aren&#8217;t available, for a lot of people. And even when they&#8217;re available, people have old versions and can&#8217;t upgrade, so I can&#8217;t rely on basic things like the `quote_identifier()` function in DBI modules; time to write my own. Well, that&#8217;s only a single line! Surely that&#8217;s okay to copy and paste.

As Kurt Vonnegut says, &#8220;So it goes.&#8221; This is the death not only of quality, but of maintainability and extensibility. The Right Answer &#8482; is to write everything as modules, with proper test suites, and then make the scripts as minimalistic as possible &#8212; essentially gluing the modules together with a few lines of harder-to-test code. That&#8217;s how I&#8217;m used to working, too, but for some reason I can&#8217;t explain, it seemed okay not to work that way with this project. That has turned out to be a big mistake, which I&#8217;m slowly correcting out of necessity.

But it turns out it&#8217;s not that simple, either. I&#8217;ve gotten a lot of emails, phone calls from friends, and bug reports about how hard it is to install or update Perl, or get a CPAN module, on many systems. It turns out that a lot of companies are rightfully suspicious about CPAN (I have a tolerate-hate relationship with it myself), and won&#8217;t let my consultant friends install or upgrade any module without a lot of red tape. OK, you say, so bundle and distribute the modules the toolkit needs, and they can be installed locally with the toolkit. That sounds nice, but it&#8217;s even **worse** for a variety of reasons. Just to mention one: did you know that it can be a pain in the butt even to set `@INC` so a module *sitting in the same directory with the script* will be found by the script? (Please don&#8217;t tell me how easy it is, or I&#8217;ll let you respond to the next person trying to get it to work on an obscure platform with a Perl installation from the middle ages). Okay, I&#8217;ll mention two reasons: some Perl modules have to be compiled and customized just for the operating system you&#8217;re installing them on, or they&#8217;ll segfault (of all things)! Don&#8217;t get me wrong, I don&#8217;t think the grass is greener on the other side; no way do I want to try writing these things in C or Java. Perl is about as portable as it gets.

The net result is that I have to do a lot of little tricks to make these things standalone programs, as much as humanly possible. I&#8217;m trying to reduce dependencies on external modules, even those that are part of core Perl. I&#8217;m re-inventing functionality because it&#8217;s not available in all versions. I&#8217;m writing modules that can be tested, but I&#8217;m not shipping them as separate modules; I&#8217;m basically using `sed` to copy-and-paste the module&#8217;s code into the scripts.

Why am I doing all this work?

Because it&#8217;s less work than not doing it.

But it is *significantly* more work than just whacking together some &#8220;scripts&#8221; and uploading them. That&#8217;s why there is a critical mass beyond which it gets harder to grow a project. The solution to this is to find a way to do things differently, work smarter, not harder. The challenge is to switch the fight against the demons of bad code and maintainability so it&#8217;s on my terms. In other words, don&#8217;t fight against these characteristics of growth; make them work for me. I won&#8217;t say I&#8217;ve learned that lesson completely, but I&#8217;m starting. That&#8217;s why I&#8217;m automating basically everything about this project (though for some reason I can&#8217;t get WWW::Mechanize to stay logged into Sourceforge, so I&#8217;m having a hard time automating part of the release process).

I&#8217;m also considering ways to provide this toolkit without taking so much out of my own pocket. What started out as me developing tools for my employer, and them graciously agreeing to let me make them available for Sourceforge, has gone far beyond my employer&#8217;s needs now. I can&#8217;t ask my employer to carry the weight, so it has fallen to me for a while now. That&#8217;s okay for some period while I work out how to do it differently, but not indefinitely. Among other things, it cuts into time I want to spend with my wife. Charging for support has definitely crossed my mind, as has some kind of community/enterprise split (such as the one [Zmanda][4] does). I don&#8217;t want to go there yet &#8212; so I&#8217;m just asking for a week of sponsored time off work, to begin with.

By the way, the process of replacing copy/pasted code isn&#8217;t without its hitches. I just found and fixed a bug in MySQL Table Checksum that I caused by moving the DSN parsing code to a module. And someone else just reported a different bug in another tool, where it turns out the copy/pasted code wasn&#8217;t quite identical and I changed the functionality by moving it to the module. Release early, release often. Rely on users to [find bugs and report them][5]. So it goes.

 [1]: http://opensourcestrategies.blogspot.com/2007/10/limits-of-open-source.html
 [2]: http://code.google.com/p/maatkit
 [3]: http://www.xaprb.com/blog/2007/10/31/mysql-table-sync-bounty-lets-do-it/
 [4]: http://www.zmanda.com/
 [5]: http://code.google.com/p/maatkit/