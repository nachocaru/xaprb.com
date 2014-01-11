---
title: Duplicate index checker improved
author: Baron Schwartz
excerpt: |
  <p>I've just improved the <a href="http://www.xaprb.com/blog/2006/08/28/how-to-find-duplicate-and-redundant-indexes-in-mysql/">MySQL duplicate index checker</a> I whipped together a few days ago.  As I guessed, my hasty coding left some things to be desired.  I've fixed some bugs, added support for finding duplicate foreign keys, and switched to a command-line parsing library that comes standard with Perl, so it's more convenient to run without needing to fetch modules from CPAN.</p>
layout: post
permalink: /2006/09/07/duplicate-index-checker-improved/
description:
  - 'I improved my MySQL duplicate index checker to find duplicate foreign keys too.  Plus I added some overall enhancements.'
---
I've just improved the [MySQL duplicate index checker][1] I whipped together a few days ago. As I guessed, my hasty coding left some things to be desired. I've fixed some bugs, added support for finding duplicate foreign keys, and switched to a command-line parsing library that comes standard with Perl, so it's more convenient to run without needing to fetch modules from CPAN.

You can download it from the original article. Let me know if there's anything I can do to improve it.

 [1]: http://www.xaprb.com/blog/2006/08/28/how-to-find-duplicate-and-redundant-indexes-in-mysql/
