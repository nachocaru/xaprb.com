---
title: How to prelink mozilla-firefox-bin
date: "2005-10-03"
url: /blog/2005/10/03/prelinking-mozilla-firefox-bin/
categories:
  - Desktop
  - Web
---
Gentoo GNU/Linux users can enjoy additional performance enhancements by prelinking binaries. The documentation is unclear on whether binary packages can be prelinked. I tried it and it seems to work fine.

It is clear that any software I've compiled on my own machine can be safely prelinked, but since I have a very slow, old laptop, I also use some software precompiled as binary packages. Mozilla Firefox is one (<kbd>emerge mozilla-firefox-bin</kbd>). This is installed under /opt, which is masked out of the prelink path, so it doesn't get prelinked automatically. I prelinked it manually by running <kbd>prelink -Rm /opt/firefox</kbd> and everything seems to be fine.

This is completely safe, because prelinking is fully reversible.
