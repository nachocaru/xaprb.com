---
title: How to swap Caps-lock and Esc keys in Ubuntu
date: "2008-10-22"
permalink: /blog/2008/10/22/how-to-swap-caps-lock-and-esc-keys-in-ubuntu/
categories:
  - Desktop
  - Programming
---
Here's a productivity tip that has saved me countless work while typing. Swap your Caps-lock and Escape keys. If you're like most people, you use Caps-lock virtually never, and Escape quite a lot. Especially if you're a programmer who happens to use [the best text editor, Vim][1]. Read on to learn how to do this.

<!--more-->

An easy way to do it on Ubuntu with Gnome: step one, create a .xmodmaprc file. You can run the following command to create the file and put the correct contents into it:

<pre>echo &gt; ~/.xmodmaprc '! Swap caps lock and escape
remove Lock = Caps_Lock
keysym Escape = Caps_Lock
keysym Caps_Lock = Escape
add Lock = Caps_Lock'</pre>

Step two is to make this run every time you log in. Open up System-Preferences-Settings. Click the Add button to add a new entry to the additional startup programs list. In the "name" box, enter "xmodmap" or something else descriptive. In the Command box, enter "/usr/bin/xmodmap /home/[user]/.xmodmaprc", where [user] is your username.

And now get used to being able to hit Escape without reaching for it. If you like this, you might also be interested in using the [Dvorak][2] keyboard -- I can type on either Dvorak or QWERTY, but Dvorak has saved me from something approaching total paralysis of the hands, so it's worth checking into also.

As your reward for reading this far,

> Q: what's the integral of 1/cabin?
> 
> A1: Natural Log Cabin
> 
> A2: Houseboat (Natural Log Cabin + C)

 [1]: http://www.vim.org/
 [2]: http://en.wikipedia.org/wiki/Dvorak_Simplified_Keyboard
