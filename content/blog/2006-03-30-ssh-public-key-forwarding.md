---
title: SSH public-key forwarding
author: Baron Schwartz
excerpt: |
  <p><abbr title="Secure shell">SSH</abbr> is one of the most important tools I have.  I use it every day to communicate securely between many different computers, and consider it indespensable.   In this article I'll show you how to forward your SSH agent to connect from any remote server to any other remote server without putting your private key on either of them.</p>
layout: post
permalink: /2006/03/30/ssh-public-key-forwarding/
description:
  - >
    Explains how to forward SSH public keys to chain passwordless login from server
    to server, without putting your private key in multiple places.
---
SSH is one of the most important tools I have. I use it every day to communicate securely between many different computers, and consider it indespensable. In this article I&#8217;ll show you how to forward your SSH agent to connect from any remote server to any other remote server without putting your private key on either of them.

### Introduction

First, the concept: [SSH][1] is a secure protocol for setting up a communications channel between two computers on a network. This communications channel can act as the &#8220;carrier&#8221; for any number of uses. All traffic is encrypted, so you can get a &#8220;secure line&#8221; across an insecure network.

Probably the most familiar usage of SSH is connecting and logging in remotely to another computer. Once logged in, you can use the command line just as though you were sitting at the other computer&#8217;s terminal. Other uses include secure FTP, secure file copies, secure CVS access, running GUI applications on another computer and forwarding the display to the computer you&#8217;re working on so it appears to be running on your own computer, and on and on.

If there&#8217;s a UNIX or GNU/Linux distribution that doesn&#8217;t include SSH by default, I&#8217;ve never heard of it. Even Mac OS X includes it. Microsoft Windows does not, but there&#8217;s an *excellent* free implementation that runs under Windows: [PuTTY][2].

### No more passwords!

One of the really nice things about SSH is that it supports multiple authentication methods. One is passwords. Passwords, though, are one of the least secure and convenient methods of authenticating. Enter public-key authentication: SSH can authenticate me with an encryption key. If I put my public key on `someserver`, present my private key to the SSH program and tell it to connect to `someserver`, the SSH server on the other end uses my public key to log me in. I never have to type a password.

All I have to do is generate an encryption key pair. The keys are matched to each other in such a way that anything I encrypt with my private key can only be decrypted with my public key, and vice versa. That&#8217;s how I can log in without sending my private key to the other server &#8212; my SSH program just encrypts the traffic and sends it, and the server at the other end of the connection can either decrypt it or it can&#8217;t. If it has my public key available, it can.

Now, to make it really convenient, I need to load my private key into memory. I use the handy [keychain][3] program to do this. One done, my key is ready for use until I reboot the computer. At my previous employer I used PuTTY on Windows, so I used the Pageant program to load my private key. I also used the excellent free [CVS][4] client [TortoiseCVS][5] (there&#8217;s a similar one for [Subversion][6], too &#8212; [TortoiseSVN][7]).

Guess what? No more passwords! Any computer I connect to will just magically log me in, as long as it has my public key. For more information on this, please read the [keychain][3] documentation, especially the IBM DeveloperWorks articles to which it links.

One thing to watch out for: **don&#8217;t let anyone have your private key**. Keep it *private* and *secure*. Make sure you know which of your keys is the public key and which is the private key. Nobody needs your private key, and you shouldn&#8217;t have it on any other computer &#8212; you put your *public* key on the computers to which you need to connect.

### More convenience: forwarding keys

OK, so I&#8217;ve set everything up. I have put my public key on the two computers I connect to, `server1` and `server2`. I open a terminal and type `ssh server1`. Boom! I&#8217;m logged in. Then I realize I put a file on `server2` and I need it. I&#8217;m on `server1` right now. No problem; I connect via SSH. But wait, `server2` asks me for my password! What&#8217;s this?

What happened is, I logged into `server1` with my private key, but when I tried to connect to `server2`, my private key wasn&#8217;t available to authenticate me. At this point, I might copy my private key to `server1`, but that&#8217;s not the best way to do it. In fact, it&#8217;s possible to tell SSH to forward my private key to servers when I connect to them. This is in-memory only; the key never gets stored on the disk, so it stays secure. But it&#8217;s available if it&#8217;s needed to connect to other servers. This chain of forwarding can go on and on. All I need to do is tell SSH to forward the keys (more strictly, forward the *agent*, which has loaded my keys into memory). This is a configuration option, set in the `.ssh/config` file on my local computer &#8212; the one I&#8217;m sitting at:

<pre>Host *
ForwardAgent yes</pre>

That configuration directive tells SSH to forward my SSH agent to all hosts. Voila!

### Next steps

I&#8217;ve covered a lot of ground here, and not really gone into much depth with any of it, but I hope this gives you an idea of how much there is to SSH &#8212; one of those great tools that can be as simple or as complex as you need it to be. I&#8217;m not even pretending to be an expert; I know I don&#8217;t know that much about it myself. I only know as much as I&#8217;m motivated to learn :-)

While I&#8217;m on the subject, I want to point out that probably the most widely used implementation of SSH is OpenSSH. It&#8217;s from the same people that make [OpenBSD][8], a famously secure operating system. And though it is nearly ubiquitous and indispensable, even for Microsoft folks, very little attention goes to the fact that [it&#8217;s free but nobody really contributes money to it][9]. The [OpenSSH project is painfully underfunded][10], and there is widespread discussion about the problems this may cause. [I encourage you to donate][11] something to it, even if it&#8217;s just ten dollars. It is easily the most underfunded project I can think of, especially considering how much of the world depends on it.

 *[SSH]: Secure shell
 *[FTP]: File Transfer Protocol
 *[CVS]: Concurrent Versions System
 *[GUI]: Graphical User Interface

 [1]: http://www.openssh.com/
 [2]: http://www.chiark.greenend.org.uk/~sgtatham/putty/
 [3]: http://www.gentoo.org/proj/en/keychain/
 [4]: http://www.nongnu.org/cvs/
 [5]: http://www.tortoisecvs.org/
 [6]: http://subversion.tigris.org/
 [7]: http://tortoisesvn.tigris.org/
 [8]: http://www.openbsd.org
 [9]: http://www.thejemreport.com/mambo/content/view/239/1/
 [10]: http://os.newsforge.com/os/06/03/20/2050223.shtml
 [11]: http://www.openssh.com/donations.html