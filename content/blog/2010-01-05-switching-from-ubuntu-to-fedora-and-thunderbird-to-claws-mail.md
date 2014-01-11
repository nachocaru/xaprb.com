---
title: Switching from Ubuntu to Fedora, and Thunderbird to Claws Mail
author: Baron Schwartz
layout: post
permalink: /2010/01/05/switching-from-ubuntu-to-fedora-and-thunderbird-to-claws-mail/
categories:
  - Desktop
  - GNU/Linux
tags:
  - Claws Mail
  - Fedora
  - Mozilla
  - Thunderbird
  - ubuntu
---
This weekend I backed up all my data, repartitioned my hard drive, and re-installed. I needed to do this because the only thing I had on the laptop was Ubuntu, and sadly, the reality is sometimes my clients use things that require me to use Windows (and sometimes a virtual machine won&#8217;t solve that). So now I&#8217;m dual-booting Windows. I think the last time I did that was sometime before 2001, so I&#8217;ve regressed 9 years.

I took this opportunity to switch from Ubuntu to Fedora. Why? They both released new versions almost at the same time, and I grabbed the live CDs and noticed that Fedora just worked better &#8212; better support for dual monitors, for example. And some things about Ubuntu have always irked me, such as &#8220;sorry, can&#8217;t play WAV file, that&#8217;s a proprietary codec, you must install some big package of proprietary codecs.&#8221; WHAT? When did a codec become necessary to play a PCM file? Codec stands for &#8220;code/decode&#8221; and that doesn&#8217;t make sense for PCM. Anyway, these are small things, but sometimes they add up. I did not do a default install of Fedora. I don&#8217;t trust ext4, and ext3 works fine for me, so I stayed with that. I also disabled SELinux right away &#8212; no thanks, \*shudder\*.

The much bigger switch was ditching Thunderbird in favor of [Claws][1]. I last used Claws back in&#8230; 2003, maybe? It was called Sylpheed Claws then, and was GTK1 or so. Now it&#8217;s much nicer looking. Anyway, Fedora installed Thunderbird 3, and after giving that a small test drive I decided that my long-standing love/hate relationship with Thunderbird was due for a change. I just need a mail client that can open a yes/no dialog in less than 1.5 seconds &#8212; is that too much to ask? I&#8217;m much happier with Claws. I use email a lot, probably something like 350 emails per day, and I&#8217;ve already found Claws more capable than Thunderbird in every way but one: I can&#8217;t quite figure out how to get the functionality I got from Thunderbird&#8217;s quicktext extension. Everything else is amazing &#8212; I don&#8217;t need extensions, everything&#8217;s built in by default. I use filters extensively, and the filtering and searching in Claws is much nicer than in Thunderbird. There are a handful of other things.

One notable thing is an archiving feature. I like to move emails to a folder after I&#8217;m done with them. I had sort of a hack in Thunderbird. The key combination Ctrl+Shift+M moves the selected message(s) to the same folder used for the last move operation. This worked acceptably well, until I moved a message elsewhere and forgot that my &#8220;archive&#8221; key combo no longer sent my messages to the archive. In Claws, I set up a custom action and attached it to the Y key, and voila I have real archiving functionality (without pressing 3 keys, too). I also remapped keys so it&#8217;s more vim-like. Gmail is the client I use for my personal accounts, so now I have consistent keystroke commands between both emails and my favorite text editor.

Another notable thing is that when I send an email, the sending process happens in the background. This is so much nicer. In Thunderbird, I&#8217;d Ctrl-Enter and then have to alt-tab my way past the sending dialog and the compose window, back to the main window to keep working; in Claws, I press Ctrl+Enter to send, and I&#8217;m immediately back at the main window. This might seem silly, but it&#8217;s actually a big deal. It helps me process email quite a bit faster.

 [1]: http://www.claws-mail.org/