---
title: Progress on Maatkit bounty, part 4
date: "2007-12-06"
permalink: /2007/12/06/progress-on-maatkit-bounty-part-4/
categories:
  - Databases
  - Open Source
---
&#8230; I didn't get two-way sync done, and I didn't get the Nibble algorithm done. That much I expected. But I also didn't get the current work released tonight because I'm paranoid about breaking things. I'm trying to go through all the tools and write at least a basic test for them to be sure they can do the simplest "unit of work" (such as mk-find running and printing out that it finds the mysql.columns_priv table).

It's good that I'm doing this. I found that mk-heartbeat suddenly doesn't work on my Ubuntu 7.10 laptop. It goes into infinite sleep. Can anyone repro this and/or diagnose? The same code works fine on Gentoo servers at work, and I have heard no complaints.

**Update** the problem is the combination of `sleep()` and `alarm()`, which I inherited in the code from the contributors. I even had a comment in the code about it not being safe in general, but I assumed it would work OK since there was no argument to `sleep()` (infinite sleep). But it doesn't; the results are undefined and system-dependent. I re-implemented this code without using `alarm()` and will release it soon.

Hopefully I'll be able to release something very soon. Release early/often is fine, but "knowingly release brokenness" isn't in my code of conduct :)
