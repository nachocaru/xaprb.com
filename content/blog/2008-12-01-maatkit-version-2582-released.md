---
title: Maatkit version 2582 released
date: "2008-12-01"
permalink: /2008/12/01/maatkit-version-2582-released/
categories:
  - Databases
  - Open Source
  - Programming
---

The December release is here! There are some goodies in this release, but the major one is an initial version of mk-log-parser, a slow log analysis tool that is carefully designed (with lots of input from Percona consultants) to make slow log analysis as productive and easy as possible. It's based on a lot of work Daniel and I have done on log analysis over the years (I actually wrote the initial version a long time ago but never released it). Our goal is to finally put all the mostly-good-enough log parsing tools to rest. There are bugs, we know that; but we'd like you to use the tool and give us feedback anyway.

We also made mk-audit a little more robust, although we didn't really start to touch the massive TODO list for it. And we fixed a few bugs in mk-table-checksum and mk-table-sync, as well as making them more efficient.

As usual, please use the [mailing list][1] and [issue system][2] for anything but compliments.

 [1]: http://groups.google.com/group/maatkit-discuss
 [2]: http://code.google.com/p/maatkit/issues/list
