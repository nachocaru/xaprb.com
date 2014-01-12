---
title: How to set up dual monitors in Ubuntu on Dell Inspiron 1501
date: "2007-08-10"
permalink: /2007/08/10/how-to-set-up-dual-monitors-in-ubuntu-on-dell-inspiron-1501/
---
It took me about five minutes to get dual monitors working on my Dell Inspiron 1501 under Ubuntu 7.04. Here's how I did it.

1.  I tried the xorg driver, which had been working fine on just the laptop display, but it wouldn't work; I could get either the external display or the internal display to show, but not both. If you get it working, post a comment and let me know.
2.  I enabled the proprietary driver via Ubuntu's Restricted Drivers Manager.
3.  I read the [Gentoo Wiki page on dual monitors][1].
4.  As root, I ran  
    `aticonfig --initial=dual-head --screen-layout=above -v`
5.  I rebooted.

At the moment, I'm typing into Firefox on the laptop monitor. My Dell 1800FP monitor is perched right above it; it's the same width in pixels, and almost the same physical width. I have no windows open on that monitor, but I do have a [nice background image][2]! XFCE configures the backgrounds for each display separately.

I've been using this setup for about a week now. It's not flawless, but the flaws don't get in my way much. Here are the problems I've noticed:

1.  The driver is proprietary. Okay, this is a major flaw.
2.  The driver doesn't work perfectly. Occasionally a weird defect in the screen image appears and won't go away until X is restarted. It looks like a bar code and usually shows up near the bottom right of one of the monitors, often right over the clock in my system tray.
3.  If I log out of XFCE, my system hangs and I have to use the Alt-PrntScrn keys to shut it down and restart it.
4.  When I start my laptop, only the display on my laptop shows anything (perhaps the login screen isn't dual-monitor capable). As soon as I log in, both monitors become active. While this is happening, my mouse randomly jumps between the top-left corner of the two monitors.
5.  The two monitors are running two different X displays. I'm not crystal-clear on how this should normally work, but I get the idea Xinerama isn't the same as this and should work better (I don't know if I can set up Xinerama with the proprietary driver, but I don't think so). This has a variety of side effects: 
    1.  Windows I open on one display can't be moved to the other (oddly, I can drag and drop between displays, which I didn't expect).
    2.  I can't alt-tab to the other display. 
        *   When I click on a link in Thunderbird, if Firefox is running on the other display, it says Firefox is already running but not responding, and refuses to open the link. I can't get Firefox running on both displays at once.
        *   My XFCE panel on the laptop display doesn't show windows on the other display. I tried creating a panel for that display too (XFCE recognizes that there are two displays and lets me place the panel on either one), but I couldn't place it at the bottom of the display. When I chose to place it at the bottom, it seemed to place itself 768 pixels from the top (the external monitor is 1280&#215;1024, but the laptop display is 1280&#215;768). So I placed it at the top of the display, added a taskbar applet to it, and voila I had what I wanted -- but when I rebooted, the panel showed up on the laptop display again.</ol> 
    
    Otherwise I haven't noticed any troubles. Anyone who has suggestions on these issues, feel free to post a comment!

 [1]: http://gentoo-wiki.com/HOWTO_Dual_Monitors
 [2]: http://www.deviantart.com/deviation/55040068/
