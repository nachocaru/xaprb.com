---
title: How to switch from linuxthreads to NPTL on Gentoo
date: "2006-07-12"
permalink: /2006/07/12/how-to-switch-from-linuxthreads-to-nptl-on-gentoo/
description:
  - >
    Explains how to check your system for NPTL vs. linuxthreads, and switch to NPTL
    if your system uses linuxthreads.
---
This article explains how to enable the Native Posix Threading Library (NPTL) on Gentoo GNU/Linux, and how to disable the now-obsolete linuxthreads library so you don't have both on your system.

Linuxthreads and NPTL are part of glibc, the GNU C Library. The recommended threading library for GNU/Linux is now NPTL, not linuxthreads, even though the [linuxthreads][1] web page's excerpt in Google says it's "The recommended threads package for Linux, also included in glibc 2.0." Development on linuxthreads stopped a while ago, and NPTL is now mature and should be used instead, as it has many advantages.

### How to enable NPTL on Gentoo

Just as with many other things, Gentoo has a USE flag to turn NPTL on. The use flag is, appropriately, `nptl`. There's a twist, though. As the message during the emerge process notes,

> Warning! Gentoo's GLIBC with NPTL enabled now behaves like the glibc from almost every other distribution out there. This means that glibc is compiled -twice-, once with linuxthreads and once with nptl. The NPTL version is installed to lib/tls and is still used by default. If you do not need nor want the linuxthreads fallback, you can disable this behavior by adding nptlonly to USE to save yourself some compile time.

So, unless you want both libraries, you should add both `nptl` and `nptlonly` to your `/etc/make.conf`. Next you should run `revdep-rebuild` (from the `gentoolkit` package) to make sure everything is built to use it.

By the way, "tls" stands for "thread-local storage." [Wikipedia has a good article on TLS][2].

### How to tell if it's enabled

Even if it's set in your USE flags, your system might not be using NPTL for threading. It has to be enabled in your kernel, glibc has to be compiled with support for it, and there may even be other factors at play. Here are several ways to know if your system is set up to use it.

First, check whether software you compile can be configured with support for NPTL:

<pre>$ getconf GNU_LIBPTHREAD_VERSION
linuxthreads-0.10</pre>

If you see that output, this system is still using linuxthreads. Just to be sure, you can also execute the library (yep, the library itself can be executed):

<pre>$ /lib/libc.so.6
GNU C Library stable release version 2.3.6, by Roland McGrath et al.
... snip ...
Compiled on a Linux 2.6.11 system on 2006-06-18.
Available extensions:
        GNU libio by Per Bothner
        crypt add-on version 2.1 by Michael Glad and others
        linuxthreads-0.10 by Xavier Leroy
        The C stubs add-on version 2.1.2.
... snip ...</pre>

You want to look at the "Available extensions" section of the output. Again, in this example you can see linuxthreads is included, but not NPTL.

On the other hand, maybe if you execute `/lib/tls/... ` you'd find an NPTL version there. In any case, once you rebuild with the `nptlonly` USE flag, you should see the following from executing `/lib/lib.so.6`:

<pre>$ /lib/libc.so.6 
GNU C Library stable release version 2.3.6, by Roland McGrath et al.
... snip ...
Available extensions:
        GNU libio by Per Bothner
        crypt add-on version 2.1 by Michael Glad and others
        Native POSIX Threads Library by Ulrich Drepper et al
... snip ...</pre>

The `getconf` call should also return NPTL now.

Certain software will **not** use threads, even if it has linuxthreads available, unless it can use NPTL. Instead it will use multi-processing, which causes a lot more overhead. I have not found anything that complains about the lack of linuxthreads, so I believe it is safe to use `ntplonly`.

 [1]: http://cristal.inria.fr/~xleroy/linuxthreads/
 [2]: http://en.wikipedia.org/wiki/Thread-local_storage
