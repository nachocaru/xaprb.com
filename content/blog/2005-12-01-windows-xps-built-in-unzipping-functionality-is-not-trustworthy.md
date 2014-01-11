---
title: 'Windows XP's built-in unzipping functionality is not trustworthy'
author: Baron Schwartz
excerpt: "<p>Window's XP's integrated ZIP functionality is not trustworthy.  You should not rely on it to correctly unzip or show the contents of archives.</p>"
layout: post
permalink: /2005/12/01/windows-xps-built-in-unzipping-functionality-is-not-trustworthy/
---
Window's XP's integrated ZIP functionality (built into Windows Explorer) is not trustworthy. You should not rely on it to correctly unzip or show the contents of archives. The problem is related to special characters in filenames. If a filename has one of the [forbidden characters][1], Windows XP simply doesn't extract or show the files. A recent example is the [9rules][2] media kit, which 9rules sent me when I was accepted to the network. I opened it at home but didn't have time to make the requested changes to my site. I decided to do it after work, on my employer's Windows XP machine, and was puzzled because some directories were missing. It turns out the directory had a colon in the name.

It isn't really Windows's fault; after all, Windows is just showing you the files it thinks are legal. You could argue the real problem is just an invalid (for Windows) archive. But I will stand my ground on this point: Windows should not be hiding errors from you. If Windows can't open and display the contents of an archive, it should say so, and not lead you to believe everything worked. This is a basic principle of building reliable, correct software. You need to know when it fails (and in many cases, define fatal errors and explicitly disallow any efforts to recover, [as is the case with XML][3]).

 [1]: /blog/2005/11/17/maximizing-filesystem-portability/
 [2]: http://9rules.com
 [3]: http://www.w3.org/TR/REC-xml/#dt-fatal
