---
title: How to auto-mount removable devices in GNU/Linux
date: "2006-05-20"
url: /blog/2006/05/20/how-to-auto-mount-removable-devices-in-gnulinux/
categories:
  - Desktop
---
Most operating systems have an auto-mount feature to detect and mount devices, such as USB flash drives, when they're plugged in. GNU/Linux is no exception. It's easy to install and just as easy to use. In this article I'll show you how to get auto-mounting without changing `/etc/fstab`, writing udev rules, or installing a huge desktop environment such as Gnome or KDE.

### There's more than one way to do it

There are lots of ways to get things auto-mounted. I've browsed around the Gentoo forums, and I see dozens of ways people do it. Some people write `udev` rules to recognize devices. Others write custom shell scripts, tinker with `/etc/fstab`, or do a combination of lots of things. Probably the most common methods, though, are to use the built-in functionality that comes with the KDE or Gnome desktop environments -- or to use the software *they* use, but not use the desktop environment itself.

Gnome uses `gnome-volume-manager` and `gnome-volume-properties` to auto-mount devices, and when appropriate runs a program, such as a `gphoto2` in the case of a digital camera. I'm not sure exactly how KDE does automounting, since I haven't used it in many years. What I am fairly sure of is that they both use the same programs to get their work done under the hood. These programs are `hal` (the Hardware Abstraction Layer), `dbus` (a system message bus), and `udev` (userspace device filesystems).

In my opinion, some methods are definitely easier than others. I suggest you either install Gnome or KDE, or if you're a minimalist like myself, just install a system that doesn't require a huge set of dependencies.

### Using Gnome

If you're running Gnome, or if you have it installed but run another desktop environment, such as XFCE, you need `gnome-volume-manager` to be running. Gnome usually starts it automatically. If you use another desktop environment, you need to start it so it runs in the background. For example, you could put this in your `.xinitrc`file:

<pre>gnome-volume-manager &
startxfce4</pre>

That starts it running in the background, then starts XFCE.

Once you've got it running, you can run `gnome-volume-properties` to configure what it should do when it detects and mounts a volume. It can run programs, open a file browser, and so forth.

### My favorite method

I prefer not to use `gnome-volume-manager`. For one thing, it requires an X server to be running, so it won't work if I don't want to start a windowing environment. Sometimes I just want to log in and work at the command line. It also requires me to install tons of other "stuff" I just don't really need. Don't get me wrong, I think Gnome is nice. I just think less is more.

So, I prefer to run software that does nothing but sit in the background waiting to be notified that something has been plugged in. The `ivman` program does that very nicely, and it's very small.

For this to work, it needs the same things Gnome relies on: `hal`, `dbus`, and `udev`. All three need to be running as daemons. If you're using Gentoo, you almost certainly have udev already, since it's been part of the standard installation instructions for years. Other distributions should have udev as well. Installing `hal` through your distribution's package management system should install `dbus` as a dependency. Likewise, starting the `hald` daemon should start `dbus` as a dependency. In Gentoo, installing `ivman` will install these as dependencies, so it's as easy as

<pre>tigger ~ # emerge ivman
tigger ~ # rc-update add hald default</pre>

Now all the software I need is installed, and `hald` and `dbus` will start when the computer boots. All that remains is to give myself the proper permissions, and start `ivman`. As root, I can run `vigr` or use `usermod` to make myself a member of the `plugdev` group. I need to log out and back in for this to take effect. To start `ivman` automatically, I can add it to the end of my `.bashrc` file:

<pre>ivman --nofork &gt; /dev/null 2&gt;&1 &</pre>

Now I'm done. When I plug a device in, `ivman` finds it and mounts it (actually, it can do a lot more than just mount it; read the man page). I have the permissions I need to change files on the device and unmount it again. It appears under `/media`. If I'm running a file manager such as Nautilus, it shows up on the desktop and in the left-hand pane of the browser view, and I can unmount it with a right-click.

I'm running `ivman` as myself, not system-wide. There are security and convenience reasons for doing so. The man page explains more about it. It can also automatically run itself as a daemon in the background, but I'm choosing not to do that so a) it quits when I log out for security, and b) I don't get multiple instances running when I log in and out repeatedly.

### Summary

I recommend one of two methods:

1.  Use Gnome or KDE
2.  Install `ivman`, make yourself a member of the `plugdev` group, and start `ivman` from your `.bashrc`

So that's it, it just works. I hope this helps you avoid a bunch of hacking, `udev` rules, and shell scripts.
