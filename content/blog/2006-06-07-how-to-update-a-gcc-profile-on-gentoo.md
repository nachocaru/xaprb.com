---
title: How to update a GCC profile on Gentoo
author: Baron Schwartz
excerpt: '<p>Multiple versions of <abbr title="Gnu Compiler Collection">GCC</abbr> can be installed side-by-side in a Gentoo GNU/Linux system.  This article is a quick overview of GCC profiles and how to manage them.</p>'
layout: post
permalink: /2006/06/07/how-to-update-a-gcc-profile-on-gentoo/
description:
  - >
    Explains how to configure GCC to use the newest installed version on Gentoo
    GNU/Linux.
---
Multiple versions of GCC can be installed side-by-side in a Gentoo GNU/Linux system. This article is a quick overview of GCC profiles and how to manage them.

### Slots in Gentoo

Gentoo allows installing multiple versions of packages side-by-side in different &#8220;slots.&#8221; This avoids dependency problems. For example, it&#8217;s possible to run programs that require different versions of libraries, because they can all coexist happily (the lack of this feature on Microsoft Windows is known as DLL hell).

Often an upgraded package will install in a new slot, rather than replacing the previous version. Sometimes the old version will continue to be the system default, even though there&#8217;s a newer version available. GCC is such a package.

### GCC profiles

GCC, and certain other packages such as MySQL, require the system administrator to explicitly select which version should be used. With MySQL and some other packages, the `eselect` tool selects the version, but selecting a version for GCC is more complex. Not only is there a version to select, but a &#8220;profile.&#8221; The profile is a set of behaviors and optimizations. The `gcc-config` tool selects a GCC profile, which is sourced from `/etc/profile`.

### How to select a profile

On my workstation at work, I became root, then ran the following command to view available profiles:

<pre># gcc-config -l
 [1] i686-pc-linux-gnu-3.3.6 *
 [2] i686-pc-linux-gnu-3.3.6-hardened
 [3] i686-pc-linux-gnu-3.3.6-hardenednopie
 [4] i686-pc-linux-gnu-3.3.6-hardenednopiessp
 [5] i686-pc-linux-gnu-3.3.6-hardenednossp
 [6] i686-pc-linux-gnu-3.4.6
 [7] i686-pc-linux-gnu-3.4.6-hardened
 [8] i686-pc-linux-gnu-3.4.6-hardenednopie
 [9] i686-pc-linux-gnu-3.4.6-hardenednopiessp
 [10] i686-pc-linux-gnu-3.4.6-hardenednossp</pre>

My current profile was `i686-pc-linux-gnu-3.3.6`, as indicated by the asterisk after that entry (`gcc-config -c` also prints this information). To choose a newer profile, I ran

<pre># gcc-config i686-pc-linux-gnu-3.4.6
 * Switching native-compiler to i686-pc-linux-gnu-3.4.6 ...
>>> Regenerating /etc/ld.so.cache...                                                                [ ok ]
 * If you intend to use the gcc from the new profile in an already
 * running shell, please remember to do:

 *   # source /etc/profile</pre>

As you can see, it switched me to the new profile, and advised me to update my environment variables if I wanted to use the new profile in my existing shell.

**Update** That&#8217;s not all; you need to do a bunch more work to make sure your system is stable and sane. Fortunately, Gentoo has a good document about this: [Gentoo GCC Upgrade Guide][1]. If I&#8217;d known about that document, I wouldn&#8217;t have written this article.

**Update** Wow, this is a major pain. The suggested way to do this basically involves re-compiling your entire system twice. That is not acceptable, especially if something fails to compile (as it seems to do fairly often, judging by other people&#8217;s experiences). This is my major gripe with Gentoo&#8217;s way of compiling from source. Actually, I have lots of gripes with that, but I&#8217;m still in love with Gentoo anyway.

Regardless, I&#8217;m going to try this [guide on recompiling each package only once][2] and see how it goes.

 *[GCC]: Gnu Compiler Collection
 *[DLL]: Dynamically Linked Library

 [1]: http://www.gentoo.org/doc/en/gcc-upgrading.xml
 [2]: http://forums.gentoo.org/viewtopic-t-494331.html