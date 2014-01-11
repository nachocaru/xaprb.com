---
title: Ubuntu on Dell Inspiron 1501
  <p>I recently bought a Dell Inspiron 1501, which I got a great deal on thanks to the fine people at <a href="http://www.dealnews.com/">DealNews</a>.  The base system was $449 shipped, and I chose to upgrade the processor to dual AMD64s.  But I didn't buy the system that came with Ubuntu pre-installed; for whatever reason, the one that came with Windows offered a special discount (normally the Windows tax for otherwise identical machines appears to be around $150, and I'm certainly not going to run Windows).</p>
  
  <p>Therefore, I was not sure Ubuntu would support all the hardware.  It's the same story it's been for as long as I've been using computers: hardware manufacturers withhold specifications from the Free Software world, so there is always a chance something will be a trouble.  The good news is, I've only noticed two very minor incompatibilities out of the box.</p>
permalink: /2007/07/24/ubuntu-on-dell-inspiron-1501/
description:
  - >
    Ubuntu 7.04 works almost perfectly on a Dell Inspiron 1501, and I was able to
    fix a minor driver issue with the wireless card right away.
tags:
  - dealnews
  - dell
  - hardware
  - networking
  - ubuntu
---
I recently bought a Dell Inspiron 1501, which I got a great deal on thanks to the fine people at [DealNews][1]. The base system was $449 shipped, and I chose to upgrade the processor to dual AMD64s. But I didn't buy the system that came with Ubuntu pre-installed; for whatever reason, the one that came with Windows offered a special discount (normally the Windows tax for otherwise identical machines appears to be around $150, and I'm certainly not going to run Windows).

Therefore, I was not sure Ubuntu would support all the hardware. It's the same story it's been for as long as I've been using computers: hardware manufacturers withhold specifications from the Free Software world, so there is always a chance something will be a trouble. The good news is, I've only noticed two very minor incompatibilities out of the box.

One is that the Fn+arrow keys won't change my screen brightness, at least under XFCE. Strangely, my ancient Dell laptop had no trouble with that. I assume the old one was a hardware-controlled feature and this one needs some software support, but I could be wrong.

The other thing is the built-in wireless card, which isn't supported with Ubuntu 7.04&#8242;s drivers out of the box. However, I quickly found a set of [drivers for the Broadcom Corporation Dell Wireless 1390][2] card, and was up and running shortly thereafter. The only thing I had to do after installing the drivers was press the Fn+F2 key, which turns the card on.

Otherwise everything works brilliantly.

And now for a rant: click through to that page about the drivers, and you'll see an example of what I consider the Ubuntu sudo disease. There's even a screenshot of someone typing `sudo uname -a` and using sudo to remove a file he didn't create with sudo. I think unfortunately, Ubuntu's policy of allowing one to run any command with sudo has created a crop of people who don't understand what should and shouldn't be privileged; some of them seem to believe that 'sudo' is what you type at the beginning of every command. It completely defeats the purpose and circumvents the security gained by not running as root. For my part, when I want to administer my system, I become root, do what I need to do, and then quit again. I rarely sudo any command other than `sudo su -`.

But that's just me.

 [1]: http://www.dealnews.com/
 [2]: http://www.linux-geek.org/index.php/2007/04/22/dell-1390-native-linux-driver-how-to-updated
