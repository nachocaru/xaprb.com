---
title: How to leave a program running after you log out
author: Baron Schwartz
layout: post
permalink: /2008/08/01/how-to-leave-a-program-running-after-you-log-out/
description:
  - "Explains how to run a program in the background so it doesn't exit when you disconnect."
categories:
  - GNU/Linux
  - Sys Admin
  - Tools
tags:
  - Bash
  - disown
  - LISP
  - nohup
  - screen
---
Have you ever run a command on a Unix-like system and then realized it&#8217;ll take a really long time, and you want to log out of the computer and leave it running? Or maybe you&#8217;ve connected over SSH to a remote server and executed a command that will take a while, and you&#8217;re really worried that your network connection will fail and kill the command.

There are several ways to log out without stopping the command. Let&#8217;s take a look.

### Method 1: Job Control

When I learned about job control in the [bash][1] shell, I was in the middle of an AI project on my [computer science department&#8217;s][2] servers. I had written a [LISP][3] program that simulated a little robot going from place to place delivering parts to an assembly line. The challenge was that he had to figure out the optimal route to do so, all the while never running out of fuel. (As it turns out, he was cursed by my professor with a small fuel tank.) The experiment was going to take at least 3 days &#8212; he had a lot of learning to do and a lot of parts to deliver. But I didn&#8217;t realize this until I checked the next morning and saw his progress. What to do?

After reading on the web, I learned that I could press Control-Z to suspend the job, and then &#8216;bg&#8217; to make it run in the background! Success! Then I logged out. And my job died. FAIL. Moral: test first.

Why did it die? Because when I logged out, the shell sent the SIGHUP signal to all of its jobs.

There&#8217;s a way to do this, though: press Control-Z, type &#8216;bg&#8217;, and then type &#8216;disown %1&#8242;. Now the job won&#8217;t get the SIGHUP signal. Here&#8217;s a demo:

<pre>baron@kanga:~$ run_forrest_run 
CTRL-Z
[1]+  Stopped                 run_forrest_run
baron@kanga:~$ bg
[1]+ run_forrest_run &#038;
baron@kanga:~$ disown %1
baron@kanga:~$</pre>

That&#8217;s method one: [disown][4] the job. It has a variety of shortcomings, though. Let&#8217;s see what Method 2 has to offer.

### Method 2: nohup

Method 2 is to use the [nohup][5] command. This starts the program in the background and directs its output to a file called nohup.out. Now you can log out and come back later.

What&#8217;s the difference? Whereas disown is a job control feature that is part of the bash shell, nohup is a built-in standard program. It also takes care of saving the program&#8217;s output for you. You can come back to it later and [tail][6] the file to see what your program has been telling you.

Demo time:

<pre>baron@kanga:~$ nohup run_forrest_run 
nohup: ignoring input and appending output to `nohup.out'
CTRL-Z
[1]+  Stopped                 nohup run_forrest_run
baron@kanga:~$ bg
[1]+ nohup run_forrest_run &#038;
baron@kanga:~$ 
</pre>

I consider both of these really crude, though. For example, after you log back in, how do you attach your terminal to the program&#8217;s standard input to type answers if it wants to ask you questions? This is just one thing that&#8217;s not ideal. You know what&#8217;s elegant? Method 3.

### Method 3: screen

[GNU Screen][7] is the bomb. There is only one thing it doesn&#8217;t do for me, and I&#8217;ll talk about that in another post. Before I tell you about other things, let me paste some text from the man page:

> Screen is a full-screen window manager that multiplexes a physical terminal between several processes (typically interactive shells). Each virtual terminal provides the functions of a DEC VT100 terminal and, in addition, several control functions from the ISO 6429 (ECMA 48, ANSI X3.64) and ISO 2022 standards (e.g. insert/delete line and support for multiple character sets). There is a scrollback history buffer for each virtual terminal and a copy-and-paste mechanism that allows moving text regions between windows. 

If that sounds intimidating, it ought to &#8212; screen has a really absurd amount of functionality and can take a long time to learn. I confess that I am not familiar with about 90% of what it can do. Every so often someone shows me something new and I feel humble. It&#8217;s a lot like [vim][8]: ten years on, and I still know only a little about it. I do know I can&#8217;t live without it.

Enough about that: how can it run commands after you log out?

Simple. Just type &#8220;screen -R -D&#8221; and then start working as you normally would. When you&#8217;re ready to quit, you can detach with &#8220;Control-A D&#8221;. Screen keeps running. When you log in again later, you can type &#8220;screen -R -D&#8221; and re-attach to the screen session. I would show you a screenshot of this, but it&#8217;s hard to do &#8212; you&#8217;ll see why if you type the commands yourself. A screencast would be the only way to do a decent demo, and I&#8217;m too lazy.

That&#8217;s not all screen can do: if your network connection goes down, screen doesn&#8217;t die. You only detached, you didn&#8217;t kill it. It keeps running in the background and you can re-attach to it after your network connection resumes. When I&#8217;m working on a client&#8217;s systems, I start screen by default! That way if something happens, I can get back to where I was. I can also log everything in my session to a file with &#8220;Control-A H&#8221; and other people can log in and share the connection to watch me or help me with &#8220;screen -xx&#8221;.

### Summary

So there you have it: good, better, best. I still use the first two methods sometimes when I run a command and then realize I should have started a screen session (or when screen isn&#8217;t installed, heaven forbid) but in general, screen is the arrow I&#8217;m always pulling out of the quiver.

By the way I&#8217;m intentionally leaving out some more shell features, such as starting a program in the background from the get-go with &. If you want to fill that in, leave a comment &#8212; I just wanted to keep this article on topic.

 [1]: http://linux.die.net/man/1/bash
 [2]: http://www.cs.virginia.edu/
 [3]: http://clisp.cons.org/
 [4]: http://linux.die.net/man/1/disown
 [5]: http://linux.die.net/man/1/nohup
 [6]: http://linux.die.net/man/1/tail
 [7]: http://linux.die.net/man/1/screen
 [8]: http://www.vim.org/