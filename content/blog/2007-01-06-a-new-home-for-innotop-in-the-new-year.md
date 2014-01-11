---
title: A new home for innotop in the new year
author: Baron Schwartz
excerpt: "<p>A couple of weeks ago I submitted a request to open a new project on Sourceforge for the innotop MySQL and InnoDB monitor.  I want to make it easier for others to collaborate, especially package maintainers. Yesterday I got word of its approval.  I have done a quick-and-dirty import of the source code into its new home, and I'm now continuing work on the next major version, which I've been working on for about six weeks.  This post is about Sourceforge, what I've gotten done, and also to ask for your help.</p>"
layout: post
permalink: /2007/01/06/a-new-home-for-innotop-in-the-new-year/
description:
  - I need your help making the best MySQL monitor better.
---
A couple of weeks ago I submitted a request to open a new project on Sourceforge for the innotop MySQL and InnoDB monitor. I want to make it easier for others to collaborate, especially package maintainers. Yesterday I got word of its approval. I have done a quick-and-dirty import of the source code into its new home, and I&#8217;m now continuing work on the next major version, which I&#8217;ve been working on for about six weeks. This post is about Sourceforge, what I&#8217;ve gotten done, and also to ask for your help.

### innotop&#8217;s new home on Sourceforge

The new project homepage is <http://code.google.com/p/innotop/>. Thus far all I have done is add the code to the Subversion repository.

I branched off from the last major release, what used to be called 0.1.162. This will become version 1.0 when I get a chance to make a package. I will probably not do a whole lot more on it; there is a bug fix or two to apply, and I&#8217;ll apply bug fixes going forward, but I don&#8217;t plan any major new features.

After branching, I slammed six weeks&#8217; worth of changes into one revision in the trunk. This will become 2.0 eventually.

### What&#8217;s done so far

I&#8217;ve lost track, actually, but here are some of the things I&#8217;ve gotten done.

*   Readline support.
*   Monitor multiple servers simultaneously.
*   Monitor master/slave status and control slaves.
*   Columns can have user-defined expressions as their data sources.
*   Better configuration tools.
*   InnoDB status information is merged into `SHOW VARIABLES` and `SHOW STATUS` information, so you can access it all together.
*   High-precision time support in more places.
*   Lots of tweaks to make things display more readably and compactly.
*   A ton of cleanup and rewriting to enable all this.

I know that&#8217;s not the whole list. That can&#8217;t be half of it. Oh well, read the commit messages if you want the whole story!

### What&#8217;s to do

There&#8217;s a fairly manageable to-do list at this point, but it will still take me a while. I want to add some more features, such as highlighting rows when they meet some criteria, sorting by multiple columns, more built-in configuration editing stuff, unattended output for processing by other scripts, and so forth.

One major change I&#8217;ll need to make at some point is multi-threading. For ease of development, at this time everything is single-threaded, but this becomes problematic when monitoring multiple servers.

I am implementing the features I want. Mostly. If you tell me what you want, I&#8217;ll do my best. I don&#8217;t often hear requests from users, but so far I&#8217;ve been able to fulfill every one. Most recently, I heard from a user whose terminal freaks out when it displays queries that have gzipped binary garble, so I wrote functionality to parse out quote-delimited strings and replace them with the text [BINARY] if they contain non-printable characters.

### How you can help

Certain parts of this work are easy for me. I like programming. I am decent with Perl. I know MySQL pretty well. I can write innotop (though if you want to help, by all means go ahead).

But I&#8217;m new to this whole thing of &#8220;running an open-source software project.&#8221; I don&#8217;t even know how to write a Makefile. I don&#8217;t have time or know-how to build Debian packages and RPMs, or even maintain the spec files. Heck, until a few days ago I didn&#8217;t even know how to branch (oh, I knew in theory, and I knew what commands to use, but I didn&#8217;t know &#8220;how it&#8217;s done&#8221;). Some of you have stepped in and helped, and I appreciate it. But there&#8217;s more to do.

Sourceforge gives the project a website, bug tracker, forums and mailing lists. I don&#8217;t have time to manage a website, a forum or a mailing list. I&#8217;ll take on the bug tracker if no one else will, but as far as I&#8217;m concerned these four jobs are open to anyone who wants to take them.

Sourceforge also provides a release management system. I&#8217;d love it if I could just tell someone &#8220;hey, X is stable now, time to make packages&#8221; and go back to programming.

Most importantly, there&#8217;s a real need for documentation. It&#8217;s getting more complicated to use innotop, and there&#8217;s no real guide telling people how to do it. People email me asking for features I&#8217;ve already built. (Sometimes I can&#8217;t even remember having built them, but don&#8217;t publish that, okay?)

If you want to do any of this, email me. I&#8217;m the project admin on Sourceforge, so all I have to do is give your Sourceforge account permission, and you can jump right in and help. I am *not* a micro-manager, so if you say you want to help, I&#8217;ll give you whatever permissions you need.

### The future

I fully intend to support anything that fits into innotop&#8217;s model of doing things, for whatever the MySQL community needs it for, within my time and ability constraints. That means if telcos want it to manage NDB clusters, I&#8217;ll do that. If SolidDB or Falcon or PBXT expose internals for monitoring, I&#8217;ll add in hooks for that. I&#8217;ve long ago contacted them and asked them to consider exposing such internals in a friendly way that doesn&#8217;t require string-parsing like InnoDB.

Most importantly from my perspective, I&#8217;m using it every day to monitor and manage the systems at work, and I&#8217;m not done making it easy yet. Whatever causes me trouble is going to get attention.

Here&#8217;s to a great 2007!