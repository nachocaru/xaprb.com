---
title: MySQL Toolkit released as one package
date: "2007-06-10"
permalink: /2007/06/10/mysql-toolkit-released-as-one-package/
---
<p class="download">
  <a href="http://code.google.com/p/maatkit/">Download MySQL Toolkit</a>
</p>

It's finally here: a single-file download for all the tools in MySQL Toolkit. During this process I also upgraded every package in the toolkit to a new release, combining new versioning and some simple non-functional changes with (mostly minor) changes I'd committed but not yet released. Details are at the end of this post.

I ended up not using a Makefile for the build process, because I wanted to it to be more auto-magical than I know how to do with a Makefile. Instead I wrote a very simple Perl build script. Anyone who can teach me a better way to do it, please do! The final package follows the familiar Perl installation process, of course: `perl Makefile.PL; make install`.

The most important thing this will do is make it easier to distribute. It's a real hassle to maintain a bunch of packages for, say, Debian &#8212; but it's easy to maintain a single package. I hope soon the toolkit will be distributed with some GNU/Linux distributions and maybe with FreeBSD, as innotop is.

It's gotten to the point that packaging and releasing these tools takes a good bit of time, which I never foresaw. There's just a lot of stuff I have to do very carefully, like making change logs, tagging the source, building the packages, uploading them to sourceforge, going to sourceforge and making a new release, entering all the right information, and so forth. It all adds up. "Release early, release often" has its advantages, but it is a burden too.

If you want to support my work, I have now made an [Amazon wishlist][1].

Here's a unified changelog:

*   mysql-show-grants 2007-06-10: version 1.0.1 
    *   Added &#8211;defaults-file option. 
    *   Added standard &#8211;version command-line option. 
    *   Added &#8211;defaults-file option. 
*   mysql-find 2007-06-10: version 0.9.2 
    *   &#8211;pid had a race condition. 
    *   Unrecognized &#8211;sprintf directives could cause crashes. 
    *   Added &#8211;defaults-file option. 
    *   Added standard &#8211;version command-line option. 
*   mysql-table-sync 2007-06-10: version 0.9.4 
    *   Added &#8211;defaults-file option. 
    *   Added standard &#8211;version command-line option. 
*   mysql-duplicate-key-checker 2007-06-10: version 1.0.3 
    *   Added &#8211;defaults-file option. 
    *   Added standard &#8211;version command-line option. 
*   mysql-deadlock-logger 2007-06-10: version 1.0.1 
    *   MySQL 5.1 shows tables in db.tbl format, not db/tbl 
    *   Added &#8211;defaults-file option. 
    *   Added standard &#8211;version command-line option. 
*   mysql-query-profiler 2007-06-10: version 1.1.1 
    *   Added &#8211;defaults-file option. 
    *   Added standard &#8211;version command-line option. 
    *   Added &#8211;defaults-file option. 
*   mysql-table-checksum 2007-06-10: version 1.1.7 
    *   Added &#8211;defaults-file option.
    *   Added standard &#8211;version command-line option.

 [1]: http://www.amazon.com/gp/registry/registry.html?id=LOE4ZUTKFU39
