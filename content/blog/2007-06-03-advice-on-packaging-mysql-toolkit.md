---
title: I need your advice on how to package MySQL Toolkit as one file
date: "2007-06-03"
permalink: /2007/06/03/advice-on-packaging-mysql-toolkit/
---
Since starting the [innotop][1] and [mysqltoolkit][2] projects on Sourceforge, I have learned a lot about how to use source control more effectively &#8212; especially how branching and tagging can be used. Still, I have limited experience. I want to package all the tools in MySQL Toolkit together and release them in one archive, but I don't know the best way to do it; every idea seems to have drawbacks. Read on for the details, and if you have suggestions, would you please leave comments for me?

### How I'm versioning things

I've been versioning each tool separately, following this naming convention: incremental changes and bug-fixes increment the revision number, major changes bump the minor version, and really really big earth-shaking changes bump the major version number.

Versioning each tool separately makes sense to me, because some tools are stable and others are only half-done. I don't release version 1.0.x until I think the tool satisfies some large subset of user needs, and is stable and safe to use.

### How the source is organized now

Right now I have organized the Subversion tree like this:

<pre>/branches
   /1.1
      /mysql-table-checksum
/tags
   /0.8.0
      /mysql-table-sync
   /0.9.0
      /mysql-deadlock-logger
      /mysql-show-grants
      /mysql-table-maintainer
      /mysql-table-sync
/trunk
   /mysql-deadlock-logger
   /mysql-duplicate-key-checker
   /mysql-find
   /mysql-query-profiler
   /mysql-show-grants
   /mysql-table-checksum
   /mysql-table-sync</pre>

I rarely branch anything; I do most development in /trunk. When I'm ready to release something, I do a `svn copy` to /tags/version/whatever. If the tag already exists I just copy into it; if not I make a new tag subdirectory and copy into that. I try not to make any changes in /tags (but occasionally I want to change the README file or something and I do it there). I'm not super-disciplined about all this, but I rarely deviate from it.

At this point you may be saying "whoa, that's awkward." Please let me know if you think there is a better or more natural way to do this. It does feel awkward to me somehow. And it feels like this directory structure, though it grew out of my policy of versioning tools separately, has made the goal of one package more difficult.

### How I release packages

Each tool's subdirectory has a Makefile that has rules to copy the files into a subdirectory, use `sed` to inject the current version number (contained in the Makefile) into them, and bundle them up. Then I upload them to SourceForge. The resulting package has a Makefile.PL file which, when executed, generates a Makefile with an install rule.

This seems a little redundant to me, and in fact a couple of times I've accidentally had the Makefile's version number disagree with the version number of the /tags subdirectory. I keep thinking I should be omitting the version number in the Makefile and pulling it from the current directory name in /tags when I build. Or the reverse: have the tagging process be a rule in the Makefile, and that way I can't tag something wrong.

### How to package things up as one

I have several goals here:

1.  I want to be able to issue a single `make` and end up with the latest version of all the tools bundled up together.
2.  I want the user who unpacks the result to be able to run `make install` just once and get all of them installed.
3.  I want to be able to make Debian packages, Gentoo ebuilds and such.
4.  I want unified documentation with a TOC and cross-links. Currently each tool has its own POD section, which you can read with `perldoc`, and which by default gets turned into a man page by the install process. I keep thinking of having a man page for the whole package, with an overview of the toolkit's several parts and links to each tool's documentation for details. I also want to be able to generate HTML from this and put it on the Sourceforge project's homepage. POD seems to be a good way to go for the time being, and feels simpler than DocBook or some other format. Thoughts?

I can think of a couple ways to do this. One is to have a single Makefile somewhere that recurses into the /tags subdirectory and finds the latest of each tool, runs the "make" process on it, and bundles everything up with an auto-generated Makefile.PL. It also needs to generate a unified README or CHANGELOG of the latest set of changes for each tool.

A big question with this approach is what kind of version number policy to have for the unified package. Maybe the same type of thing as for the individual packages: bump the revision number when one or more packages get minor revisions, bump the minor version number when one or more packages gets a new minor revision, and bump the major version number when&#8230; ummm&#8230; a major event happens? It's a little less clear what that would mean.

Another thought is to abandon individual packages altogether and put all the tools into one package with the same version number. This feels wrong to me, but as far as I can tell it's not unheard of. For example, I don't know where InnoDB's version policy is documented, but it seems to be synced with the MySQL version numbers. On the other hand, the individual tools from MySQL say things like "mysql Ver 14.12 Distrib 5.0.24a" and "mysqldump Ver 10.10 Distrib 5.0.24a," so they're not all given the same version number.

Another question is whether I should keep releasing individual packages at all, or just release the unified package. I'm inclined to stop releasing individual packages and save myself the work.

### What do you suggest?

I would love to hear ideas, whether you've been doing this for decades or never did it at all. I'm not afraid to do a lot of work once if it will save me a lot of work on an ongoing basis (for example, completely re-organizing the source tree). And I'm willing to hear you say I've been doing it the wrong way, if you think that's the case. My goal here is to learn from people with more experience and/or more ideas. Thanks for your time!

 [1]: http://code.google.com/p/innotop
 [2]: http://code.google.com/p/maatkit
