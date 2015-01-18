---
title: Making auto-resetting VirtualBox machines
date: "2011-08-31"
url: /blog/2011/08/31/making-auto-resetting-virtualbox-machines/
categories:
  - Desktop
---
I don't know if I've said this before, but I absolutely love VirtualBox. It makes it so easy to run Windows in the cases where I have to for a client's silly Windows-only VPN software or something like that. Windows runs better inside VirtualBox than it does on bare hardware.

One of the tricks I use constantly is to set up a bunch of VirtualBox instances with a common (shared) base disk image. You can do this by creating a machine, installing your operating system on it, then throwing away the machine and keeping the resulting disk image. You can then keep this image registered inside VirtualBox, but detached from any actual machines. Then set it immutable so it never changes again:

<pre>VBoxManage modifyhd HardDisks/Windows_XP.vdi --type immutable</pre>

Substitute the name of your actual disk image file. Now you have a freshly installed Windows image on that file, which can serve as the base for lots and lots of machines. I have one set up with Service Pack 3, all the usual annoyances disabled, etc etc.

Now here comes the magic: you can create special-purpose machines that always revert to the fresh image when you boot them up. Let's say I want an image with an annoying VPN installed. I will create a new machine, call it Windows\_XP\_VPN, and select the Windows_XP.vdi file as its disk image. After selecting this disk image, I juts go through all the rest of the settings, finish the wizard, and I have my machine. I boot it up, make some changes, and when I shut it down, all the changes it's made are stored in a *differencing* disk image file. It doesn't touch the base image file; any modifications are made to a copy-on-write image file.

The special characteristic of this differencing image file is that it resets on boot. If I shut down the machine and look at the image files, I'll see one that's oh, maybe a couple hundred megabytes. I can have lots of these images sharing the same base image file that usually ends up being multiple gigabytes, so sharing the base image file is a great way to save on disk space. But what happens when I restart this machine, is that the differencing file gets emptied first. If I boot up, save a file on the desktop, and restart, the file is gone. I'm back to the fresh image.

So this isn't the full solution, actually, because the nasty VPN software I installed isn't there after restart. I want it to persist. How can I do this? It's actually pretty simple. I'll just set the differencing image not to reset at boot:

<pre>VBoxManage modifyhd Machines/Windows_XP_VPN/Snapshots/[image file name] --autoreset false</pre>

Now this machine will store its state across reboots. However, I actually *like* Windows machines to reset at boot. If I don't have them doing that, they eventually fill up with garbage. I want a clean image, with the VPN installed, and every time I start the machine I want that minty-fresh just-installed nasty VPN feeling. How can I do this? It turns out this is also not hard. Instead of turning off autoreset on the image, I just take a snapshot after shutting down. Only the *most recent state* (which is stored in a differencing image file) will be configured as auto-reset. Snapshots are stored in a snapshot image file that doesn't get reset. Whatever changes I made before I took a snapshot, are persisted across reboots.

To illustrate this, let's say I start a fresh machine from my base disk image. Then I install VPN on that, and shut down. If I reboot now, I lose my VPN. But if I take a snapshot, and call it "VPN installed" or something like that, when I restart my VPN is still there. Now I'll make a folder and put it on the desktop, and reboot again. Presto -- the folder is gone, but the VPN is still there.

It's magic, and it's the nicest thing ever, especially for Windows. No worries about viruses, no problems installing some junk spyware that some customer thinks is a good screen-sharing tool, whatever. I can trash the machine, shut it down, and when I reboot it, it's spiffy clean.

And this brings me back to my original point: *I love VirtualBox*.
