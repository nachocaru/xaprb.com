---
title: "How to use Linux's CONFIG_IKCONFIG_PROC feature"
date: "2006-05-23"
url: /blog/2006/05/23/how-to-use-linuxs-proc-config-feature/
categories:
    - Desktop
---
This article gives an overview of the Linux kernel's `CONFIG_IKCONFIG_PROC` feature, which stores in the kernel the config file used to build it.

### What it is

Linux can store a gzip-compressed kernel configuration file in the kernel itself, and make it available when the kernel is booted. This is very useful for determining how the kernel was configured when it was built. It makes it possible to re-create a kernel without having the configuration saved separately, makes it easier to debug problems with a kernel, and so forth.

### How to enable this feature

There are two steps to making the kernel config available in the kernel when the system is booted. First, select the option to store the configuration file; second, select the option to make it available as the file `/proc/config.gz`. 
When using the menuconfig system to edit a kernel configuration file, say yes to 
<pre>File systems  ---&gt;
   Pseudo filesystems  ---&gt;
   [*] /proc file system support</pre>

That enables the `/proc` virtual filesystem; read the help file for more on that. Then enable the following:

<pre>General setup  ---&gt;
   [*] Kernel .config support
   [*]   Enable access to .config through /proc/config.gz</pre>

When editing the file by hand, say Y to `CONFIG_PROC_FS`, `CONFIG_IKCONFIG`, and `CONFIG_IKCONFIG_PROC`.

### How to use it

If I have a working kernel but lost the config file I used to build it, I can boot the kernel and uncompress `/proc/config.gz`:

<pre>zcat /proc/config.gz &gt; somefile</pre>

One place I've found this helpful is when building a kernel on a system I don't know well. I can boot a live CD, for example the Gentoo live CD, and steal its configuration as a starting point. This doesn't always work perfectly, but it's easier than starting from scratch, in my opinion.

By the way, in this and all articles on this blog, I draw a distinction between Linux and the operating system. Linux is a kernel, not an operating system. GNU utilities constitute the rest of the operating system, which is why I use the term GNU/Linux when referring to the operating system as a whole.
