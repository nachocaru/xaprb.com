---
title: What to do when innotop crashes
date: "2006-08-02"
url: /blog/2006/08/02/what-to-do-when-innotop-crashes/
categories:
  - Databases
  - Open Source
---
A couple of people have written in reporting [`innotop`][1] crashes. Unfortunately I don't have access to enough variations of operating systems and MySQL versions to test everything myself, but if you're able to help by sending me a bug report when `innotop` crashes, I'm willing to work on fixing it! I hope soon I'll have a much larger test suite, and am grateful for your help with that. This article explains what information I need to reproduce and debug crashes.

I hope you're not getting crashes, but as this is new software and I haven't been able to test it in that many different environments, it's to be expected I suppose.

By the way, even if it does crash, **it is safe to use**. `innotop` doesn't modify anything on your server, it just reads and formats status information.

### How to help me fix bugs

If you can do the following when `innotop` crashes, I'd be very grateful:

1.  Ensure 'debug' is on in your configuration file. Open up `$HOME/.innotop`and look for the line starting `debug=`. It should say `debug=1`. If not, make it so; this will enable lots more debugging information. This option is enabled by default in the version I'm distributing now.
2.  If 'debug' mode was on, your crash should have written to a file called `$HOME/.innotop_core_dump`. Please send me that file. If 'debug' wasn't on, maybe `innotop` will crash again if you try to restart it after setting the option, and it'll write the core dump file.
3.  Please let me know your operating system, Perl version, and the OS and MySQL version of the MySQL server you connected to.
4.  If you can send me your configuration file (don't forget to remove your MySQL password from it if you saved it there!), that would also be helpful. The configuration file is stored in `$HOME/.innotop`.

You can send this to me any way you wish. An attachment to an email is fine. You can send to .

Thank you so much for your help!

### How to restart `innotop` after a crash

If your crash was caused by selecting a certain mode, for example by pressing the 'R' key, `innotop` may have saved that mode into its configuration file when it crashed, and may try to start up again in that mode. In this case it may crash again before you can get it started.

You can specify the mode on the command-line to solve this:

<pre>% innotop -mode Q</pre>

 [1]: /innotop/
