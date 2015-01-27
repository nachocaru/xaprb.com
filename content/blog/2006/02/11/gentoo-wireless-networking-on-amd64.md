---
title: How to set up Gentoo wireless networking on AMD64
date: "2006-02-11"
url: /blog/2006/02/11/gentoo-wireless-networking-on-amd64/
categories:
  - Hardware
  - Desktop
---
This is a quick note on wireless networking on Gentoo GNU/Linux with a dual-core AMD 64-bit processor. It's not hard to do, but the choices for hardware are more limited.

First, installing Gentoo is just as easy as a standard installation. There is a separate installation document for it. All I needed to do was follow the instructions. I'm not expert with Gentoo, but I've installed it a half-dozen times or so since 2002... if it's not easy for you, wait 4 years and try again ;-)

Here's my hardware:

*   ECS KV2 Extreme Socket 939 VIA K8T800 Pro ATX AMD Motherboard
*   ASUS V9520-X/TD/64 Geforce FX5200 64MB DDR AGP 4X/8X Low Profile Video Card
*   Sunbeam PSU-CGMI450-US-SV ATX 450W Silver Tri Mirrored X-Plug Modular Power Supply
*   VANTEC Clear 18&#8243; ATA 66/100/133 IDE Round Cable, 2-Connector Model CBL-100IDE18-CS
*   AMD Athlon 64 3700+ San Diego 1GHz FSB Socket 939 Processor Model ADA3700BNBOX (*dual core, 2.2GHz*)
*   Patriot Signature 2GB (2 x 1GB) 184-Pin DDR SDRAM DDR 400 (PC 3200) Unbuffered System Memory Model PSD2G400KH
*   Western Digital Raptor WD360GD 36.7GB 10,000 RPM Serial ATA150 Hard Drive
*   Seagate Barracuda 7200.8 ST3250823AS 250GB 7200 RPM Serial ATA150 Hard Drive
*   2 Pioneer Beige IDE DVD Burners, Model DVR-110 D
*   COOLER MASTER Centurion 5 CAC-T05-UW Black Aluminum Bezel, SECC Chassis ATX Mid Tower Computer Case

I bought it all from NewEgg for about $900 and paid my brother's friend for his time helping me choose the hardware and install it (actually, that was my brother's friend's brother). If you want similar help, by the way, send me an email and I'll hook you up with him. I'd have been lost without his guidance.

As you can see, I forgot a network card! Oops! So I went to a local store and bought something that looked pretty standard. I looked online for it first, but I should have spent more time figuring out compatibility, because as I found out, it's not guaranteed on AMD64.

I bought a Linksys WRT54G, which has an RT2500 chipset. For those who don't know, it is the chipset -- the guts of the card -- which really matters. Most cards have a chipset that may be found in any number of other cards, all of which use the same driver. And manufacturers often change the chipset, sometimes to something totally different, which may be completely unsupported and nothing at all like the original (from a device driver point of view). I thought this chipset was going to be a breeze because the manufacturer has open-sourced the drivers (thank you!). Unfortunately, I found out it's not supported on more exotic platforms, including mine.

I searched around on the [Gentoo forums][1], and found a lot of weird stories of things working sometimes and not working other times; and I even had the bizarre experience of the card working for me, for just a few minutes. But there are two things in the way of full support: a) 64-bit processor and b) two of them (dual core). The RT2500 chip can be coaxed to work, apparently completely sporadically, in non-SMP mode. In other words, if you build your kernel *without SMP support* so it only uses one of the two cores, sometimes the drivers will compile. And, when that happens, sometimes the hardware will work and sometimes not. I paid too much for this machine to use half of my processor, so that wasn't good enough for me even if I could have gotten it to work reliably without SMP.

After some banging of the head against the wall, I returned the card and got one with an Atheros chipset. The card is a D-Link DWL-G510, hardware version B1, firmware version 2.11. Again, you may buy exactly the same card and find a different chip in it, so there are no guarantees. But there is no problem getting the card to work if it has the Atheros chipset.

I built the 2.6.15-gentoo-r4 kernel with SMP support and built in the encryption routines used by the card:

<pre>Processor type and features ---&gt;
    [*] Symmetric multi-processing support

Cryptographic options ---&gt; (I enabled them all)</pre>

then did `emerge madwifi-driver` (version 0.1443.20060207) and followed the instructions for setting up the `ath0` interface via `udev` (version 079-r1). These are well documented at many websites, including the Gentoo forums, but the output of `emerge` is really all you need. I didn't need to create the interface via a command as the instructions say; I was able to just let `udev` create it at boot.

Then all I needed to do was `modprobe ath_pci` and the interface appeared! Of course this module can be added to `/etc/modules.autoload.d/kernel-2.6`. Finally, I configured the network's settings for my access point.

After this bump in the road, it's been smooth sailing. The network works great -- better than my DSL, that's for sure. And I have to say, this machine absolutely flies. It probably has a lot to do with the large L1 cache (and everything else for that matter). Look at this:

<pre>tigger ~ # time emerge xorg-x11
[snip...]
real    24m59.155s
user    18m3.664s
sys     6m27.860s</pre>

Needless to say, there are no [problems running Firefox][2] on this machine.

 [1]: http://forums.gentoo.org
 [2]: /blog/2006/01/23/firefox-or-opera-on-slow-hardware/
