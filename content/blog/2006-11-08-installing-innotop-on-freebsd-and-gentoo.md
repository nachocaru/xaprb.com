---
title: Installing innotop on FreeBSD and Gentoo
date: "2006-11-08"
permalink: /2006/11/08/installing-innotop-on-freebsd-and-gentoo/
categories:
  - Databases
  - Open Source
---
I recently got a message letting me know FreeBSD users will soon be able to install the [innotop MySQL and InnoDB monitor][1] through ports. Gentoo GNU/Linux users can find innotop in Portage.

### FreeBSD adds innotop to ports

When this is finalized, FreeBSD users will be able to install innotop with the following commands:

<pre>cd /usr/ports/databases/innotop
make all install</pre>

This is great news. It makes innotop easier to find, install and use. It also means a lot to me that a FreeBSD maintainer thinks innotop is worth including in ports.

You can track the status of the PR at [ports/104722: New port: databases/innotop][2].

### innotop ebuilds for Gentoo

I've had an [open request to add innotop on the Gentoo bug system][3] for a long time, and it appears to have stagnated, but you can [download ebuilds for innotop][4] anyway. Since I'm no Gentoo developer, please do give feedback if you have any.

Since the Gentoo bug doesn't seem to be getting any attention, I've also opened an [innotop new-ebuild bug report with the fine folks at breakmygentoo][5]. This might result in innotop being included in their Portage overlay.

**Edit** One of the Gentoo developers saw this post and added innotop to the main Portage tree! Thank you! Gentoo users can now install innotop like this:

<pre>emerge innotop</pre>

Yay!

 [1]: http://www.xaprb.com/innotop/
 [2]: http://www.freebsd.org/cgi/query-pr.cgi?pr=ports/104722
 [3]: http://bugs.gentoo.org/show_bug.cgi?id=147600
 [4]: /innotop/src/
 [5]: https://bugs.breakmygentoo.net/view.php?id=257
