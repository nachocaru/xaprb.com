---
title: innotop 1.3.5 released
date: "2007-02-03"
permalink: /blog/2007/02/03/innotop-135-released/
categories:
  - Databases
  - Open Source
---
innotop 1.3.5 is the latest release of the [increasingly popular MySQL and InnoDB monitor][1]. I recommend everyone upgrade to this release. Aside from incomplete documentation, it's close to a stable 1.4 release (I'm counting on you to find the bugs!). There are many significant new features since version 1.3, which make it more powerful and easier to use. Here's what's new:

*   Support for colorizing rows. Default color rules are included for Q, T and M modes; it's easy to write your own. Color rules are really simple. You don't have to hack the source to customize colors!
*   Support for multi-column sorting so you can make sense of the output from many servers at once. The default sort rules will group things together sensibly, but of course you can customize them easily.
*   A more powerful, simpler syntax for doing awk-like calculations on column values. No need to know Perl. More about this in a future blog post.
*   Improvements to constrain column widths so the display is more stable and easier to watch. Headers are compacted by default in some modes so you can fit more on the screen.
*   A smoother config file upgrade from 1.x.
*   D mode (InnoDB deadlocks) is cleaned up and can handle multiple servers at once.
*   Lots of bug fixes.
*   Much better configuration-editing tools.

Many of the improvements are in default configuration settings, and the upgrade **will not upgrade** your configuration settings. So if you want (for example) the new default multi-column sorts, you will have to tweak your config file, or just delete those lines from the file and let innotop fill in the new defaults for you.

### Acknowledgements

Many thanks to Sebastien Estienne, Christian Hammers, and many others for suggesting improvements, finding bugs, helping with packaging, helping me learn how to use version control software better, and especially for all the compliments and positive feedback!

### The future

Lots of features are planned. You can always read the ROADMAP file to find out what's coming next. And if you want something sooner, please ask. A user told me he likes mytop's color display for easy readability, so I added color rules sooner than I'd planned. Let me know what's important to you.

 [1]: http://code.google.com/p/innotop
