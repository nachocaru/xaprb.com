---
title: "Installing CyanogenMod on the Barnes and Noble Nook HD+"
date: "2015-01-19"
categories:
  - Hardware
---

I [wrote previously](/blog/2014/03/01/barnes-noble-nook-hd/) about how much I
was using and enjoying my 9-inch Barnes and Noble Nook HD+. I'm still using and
enjoying it, but a few of the things I mentioned in that article---the useless home
screen, the schizophrenic updates from two app stores at once, and so
on---started to annoy me. I started to fantasize about installing a clean,
uncluttered Android operating system on it instead of using the Nook operating
system. The best-known general-purpose Android OS is CyanogenMod, and that's
what I was thinking about.

![cyanogenmod](/media/2015/01/cyanogenmod.jpg)

Last time I did this, I didn't like the result. I'll explain why, then move on
to show you how to install CyanogenMod easily on the Nook HD+ and talk about the
results. (I'm very happy thus far).

<!--more-->

### It Didn't End Well Last Time

I never wrote about this, but when I [previously had a 7-inch Nook
Color](/blog/2011/06/04/using-the-nook-color-as-a-full-featured-android-tablet/),
and installed CyanogenMod on it, I was happy at first but after a while it
wasn't what I wanted anymore.

I had a number of issues with things like Netflix not working, exiting with an
error about being unsupported on this device (though clearly it wasn't the
device, since the stock Nook OS had Netflix), various apps not working well, and
so on. The base OS seemed to work well enough, but after trying to install some
more apps, I found some problems. Combine that with the not-large-enough size
and the short battery life, and I just eventually sold it on eBay. I tried
wiping it and reinstalling stock Nook OS, but for some reason I must have not
backed up the stock ROM correctly, and it didn't really function right.

So I was very hesitant to go through the same experience again with my new Nook.
I like the hardware and user experience of the new one. It's light, it's a good
size, it has great battery life, and it's powerful enough (mostly). What if I
ended up with a glitchy OS again, or problems with apps?

### Trying Less Drastic Measures

To mitigate this risk, first I tried a couple of alternatives. One was to
install a custom home screen via the Nova Launcher app, instead of the Nook home
screen. This let me get rid of the large, ugly area where Nook wanted to show me
things I didn't want to buy. Combined with a nice sharp Zen-rocks-and-a-flower
wallpaper, it felt like a much nicer user experience.

The lock screen was still ugly, though. I tried disabling that and replacing it
with another one from the app store, but that never worked very well; I was
unable to really disable the Nook's lock screen, and the new lock screen didn't
work right. The default Nook lock screen is really pretty embarrassing. There's
a high-resolution screen on the device and the lock screen looks like it was
made for a low-res device. I'm nitpicking, but my point is you can skin some of
the Nook, but not all of it, so the user interface still feels cheap.

There were other minor problems---clearly the Nook OS is based on an old version
of Android. Fast task switching (and task killing) aren't possible.  There's
also lots of little annoyances like having apps pop up messages "Syncing Your
Library" while watching a movie. 

Two major problems remained. One was the bloatware installed on the Nook,
including the Nook app store that irritatingly kept overwriting versions of apps
installed from the Google Play store. More serious, though, was the app
instability. Gmail was unusable for a couple of weeks while some bug worked its
way through the release process. Gmail is a big part of why I have the tablet to
begin with. And even after it became usable again, it would crash at random
times. I'd be watching a movie and see a pop-up, "Unfortunately, Gmail has
stopped." I'd open the Chrome browser and it would lock up the tablet for 30
seconds and then kill itself. I am not sure if I'm right, but I blame this on
the Nook app store and/or the ancient Nook OS, not on Gmail.

Another problem was performance. I installed [Monument
Valley](http://www.monumentvalleygame.com/) and I love, love, *love* it. It's
just amazing. But the Nook didn't seem quite fast enough. Graphics 
stuttered, and there were visual glitches and other artifacts.

There were some other things---inability to encrypt the whole device, for
example.

So although the skinned device was a lot nicer, it was still starting to wear on
me. And I read online that CyanogenMod solved these problems: clean,
uncluttered; latest version of Android; lots of performance improvements; safety
and privacy improvements over and above even Google's open-source Android
releases; ability to encrypt the whole device.

So I decided to go for it and install CyanogenMod! But not on **my** device. I
didn't want to take the chance of wiping it and ending up wishing I hadn't.
When I bought my first Nook HD+ 9-inch tablet, they were selling for $175 or so,
and $100 or so refurbished on eBay. Now they're discontinued, and eBay is the
best place to buy one. I got a practically brand-new one for $109 including
shipping. **This** device would be my sandbox. And if I liked it, well, I have a
gift idea for what to do with the extra one.

### Installing CyanogenMod On The Nook HD+ 9-Inch

Installing CyanogenMod is really quite easy. The online forums are
super-confusing, though. That's the hard part. All the instructions seem to
cater to someone who already knows what they're doing, or they're written in a
spastic style that is impossible to understand. In many cases they just plain
don't work; they are written by people who are speculating/extrapolating and
haven't done it themselves.

So I'm going to walk you through it plain and simple. I'll follow the
instructions on the [CyanogenMod Wiki for the Nook
HD+](http://wiki.cyanogenmod.org/w/Ovation_Info) and the corresponding
[installation
instructions](http://wiki.cyanogenmod.org/w/Install_CM_for_ovation) with some
clarifications and extra details. A lot is missing or assumed there.

**What To Know**

Some terminology, in case you encounter it on the Internet:

* CM = CyanogenMod, the operating system you'll install on the tablet
* CWM = ClockworkMod, a "recovery" system for installing new software
* Gapps = Google Apps, the Google-branded Android ecosystem apps including the Google Play store (not at all related to Google's office and productivity suite for businesses)
* adb = the Android debug bridge, software you'll use to communicate with the Nook when it is booted into recovery mode

**What You'll Do**

You're going to follow these steps:

* Download CyanogenMod, Google Apps, and adb
* Download ClockworkMod and make a bootable SD card with it
* Boot the Nook to the ClockworkMod recovery operating system
* Use the Android Debugger to transfer CyanogenMod and Google Apps to the Nook
* Use ClockworkMod to install these two onto the Nook
* You're done

**What You'll Need**

* A computer with USB and an SD card reader
* A micro-SD card and an adapter for using it in a full-size SD card reader. Mine is 2GB, but you won't go wrong if you use a larger one
* A fully charged Nook

**What To Download**

You need to download some things before you start. Don't unzip these files, just
download them. Don't put them onto the SD card. Just keep them on your computer.

CyanogenMod: the Nook HD+ is code-named "ovation". Get the [latest ovation
snapshot build](http://download.cyanogenmod.org/?type=snapshot&device=ovation)
and download it to your computer. Make a note of the CyanogenMod version you
download. I downloaded the following file just now:

    cm-11-20141112-SNAPSHOT-M12-ovation.zip

This is CyanogenMod version 11.

Google Apps: you'll want the proprietary Google Apps, which will give you access
to the Google Play store and so on. Download them from this link:
http://wiki.cyanogenmod.org/w/Gapps Choose the correct version of them for your
OS, in my case for CyanogenMod (CM) version 11. I downloaded this file:

    gapps-kk-20140606-signed.zip

ClockworkMod: any version that is built for the Nook HD+. This is the sketchiest
part of the process, because you typically have to hunt around for something
built by someone and just linked into a forum thread. You don't need the latest
and greatest, you just need something that'll boot up from a micro SD card. I
downloaded `NookHDplus-CWM-6046-for-internal-memory-rev0-(07-13-14).zip` from
[this XDA
thread](http://forum.xda-developers.com/showpost.php?p=42406126&postcount=7) and
found it to work fine. Download this to your computer as well.

**Making A Bootable Micro SD Card**

For some reason, the online instructions all do this simple task in bizarre
ways. I think a part of that may be due to people using Windows, which doesn't
have the `dd` command. If you use Windows, you may need to download a bunch of
stuff as instructed on the XDA thread I just linked to. But if you use a
Unix-based OS, you can just put your SD card into your computer and copy the
recovery image onto it with `dd`. 

You'll need to make sure the SD card device is unmounted, and figure out what the
device's Unix path is. I assume you can do that without my help. On my Mac, the
device was `/dev/disk2`.

Then, unzip the ClockworkMod file, and `dd` the `recovery.img` onto the device, e.g.

    sudo dd bs=4m if=recovery.img of=/dev/your/device/here

This will take a few minutes to complete.

Now you have a card that you can put into the Nook's card reader and boot it up.
Instead of booting up to the Nook OS, it will boot up to the "recovery mode"
operating system on the card. Try it. You should see the Nook splash screen for
a second or two, then a Cyanoboot logo will appear:

![cyanoboot](/media/2015/01/cyanoboot.png)

A moment later you should see a menu with options to do some basic operations---reboot,
install, backup, and so on. If this doesn't work, you'll need to
re-read, perhaps read online info... keep working until you get it. It worked
the first time for me.

Use the volume keys to highlight the desired menu item, the Nook's home button (the
N button) to select/OK the highlighted item, and the power button to go back.

Note that, instead of following the confused and contradictory instructions
online about copying various files to this bootable SD card, and whether that
will or won't work and in what order you have to do it, we are only putting the
`recovery.img` file onto it.

**Make A Backup**

Once you have the Nook booted into recovery mode on the SD card, you need to
make a backup. Use the volume keys to go to "backup and restore" and choose
"backup to /sdcard" and let this run. It may take a while. This will be your
backup in case you want to restore the stock Nook OS and all your data.

While this is working, move on to the next step.

**Install the Android Debug Bridge**

The Android debug bridge (adb) software lets you connect your computer to the Nook
when it's booted into recovery mode. We'll use it to copy the necessary files to
the Nook's internal storage and then to install these.

Follow the instructions on the [CyanogenMod
Wiki](http://wiki.cyanogenmod.org/w/Adb) to install adb. Please read the
instructions carefully. You basically need to download some software, unzip it,
execute it, and in the menu that appears, select a fairly minimal set of tools
to install. The initial install isn't the full suite of software, it's just an
installer you use to get the stuff you really need.

You don't need to really "install" the software on your computer, it's more a
matter of downloading. For example, 
I did not modify my computer's `$PATH` variable to put `adb` into my path. I
just opened a terminal and executed `./platform-tools/adb <options>` to do what
I needed. Afterwards I deleted the directory from my downloads folder and my
computer is clean and unaltered, with nothing "installed."

**Wipe The Nook**

Presumably your Nook's backup has finished now. Next, 
you have to completely reset the Nook. You can't install CyanogenMod onto a Nook
that hasn't been reset. I don't quite understand why, but the installation
process failed for me (and others online) until a factory reset.

Don't use the factory reset in the Nook itself. Use the reset function built
into your bootable ClockworkMod disk. Select **wipe data/factory reset** and let
it run. It should only take a moment.

**Mount The Nook's Internal Storage**

You have to mount the Nook's internal storage (often referred to as "sdcard"
although it is not really a card) so you can copy the files you're going to
install. Navigate back to the main menu and select **mounts and storage**, then
**mount /data**. For some reason ClockworkMod refers to it under different
names, but this is the correct thing to mount on the Nook HD+.

**Copy CyanogenMod and Google Apps to the Nook**

There are a couple ways to install software onto the Nook. I tried the
"sideload" method mentioned in the CyanogenMod wiki's instructions, but it
didn't work. The "push and install" method worked, so that's what I'll document
here.

Remove the USB cable from the Nook power charger and plug it into your computer.
Your computer is now connected via USB to the Nook.

Now you can use the `adb push` tool to copy the downloaded software from your
computer to the Nook, and tell the Nook to store the zip files in `/sdcard`/,
which is the storage you just mounted on the Nook. In my case, it looked like this:

    ~/Downloads/android-sdk-macosx/platform-tools/adb push ~/Downloads/cm-11-20141112-SNAPSHOT-M12-ovation.zip /sdcard/
    ~/Downloads/android-sdk-macosx/platform-tools/adb push ~/Downloads/gapps-kk-20140606-signed.zip /sdcard/

These take a few moments to transfer. When I did it, they took about 55 and 40 seconds,
respectively.

**Install The New Software**

Now you're ready to take the plunge! On the Nook, use the power button to return
to the main menu, and select **install zip**, then **install zip from /sdcard**.
Select the CyanogenMod zip file and install it, then the Google Apps (gapps) zip
file and install that.

If you don't see the files: reboot the Nook and try the transfer again. I have
gone through this process a couple of times and had the transfer appear to
succeed (but the files never appeared in the ClockworkMod menu), then when I
rebooted the Nook and tried again, it worked fine. I believe it was a problem
mounting the `/sdcard` directory.

After installing: Reboot. You're done. First boot will take a minute or two;
you'll be presented with a setup menu after that. Subsequent boots will take about 20 seconds in my experience.

### Results

The process of installing CyanogenMod onto an Android device is a bit like
buying a computer with Windows and replacing it with Linux.

Thus far, I have noticed the following results from using my freshly installed
CyanogenMod operating system:

1. It is faster and graphics are noticeably better. No glitches or visual
	artifacts in Monument Valley, for example.
2. All the Nook-specific annoyances are gone, naturally.
3. Hulu's app wouldn't install, saying "Your device isn't compatible with this
	version." Too bad; with the stock Nook OS, it installed OK. Not that I ever
	used it, but it installed.
4. No problems with Netflix, Spotify, Pandora, and lots and lots of other apps.
5. I discovered things I didn't even know about my Nook's hardware. For example,
	I thought it didn't have a microphone. With the newer version of Android
	that's installed now, the Google Now "OK Google..." instructions work fine.
	It hears and recognizes my voice! Mind blown!
6. Having a clean, uncluttered tablet OS is so nice!
7. Full-device encryption doesn't do anything. It shows an Android logo, but no
	progress bar or other feedback. I didn't realize it was stuck until I got
	suspicious after 10 hours or so, checked online, and found that this is
	apparently a known problem. Alas, I still cannot take this device out of my
	house or put any sensitive data on it, because [it is not secure
	enough](/blog/2013/12/18/secure-your-accounts-and-devices/) for me.

In other words, I'm loving it as a tablet to use around the home.

I leave you with this precious gift from Ida, the protagonist in Monument Valley. You're welcome.

![Ida and the Flower](/media/2015/01/ida-flower.png)
