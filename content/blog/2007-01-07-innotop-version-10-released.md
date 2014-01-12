---
title: innotop version 1.0 released
date: "2007-01-07"
permalink: /2007/01/07/innotop-version-10-released/
categories:
  - Databases
  - Open Source
---
<p>I've made the 1.0 release I promised yesterday, and it is available for download on the <a href="http://code.google.com/p/innotop/">innotop project homepage</a>.  I'm now working on version 1.3, which is will become 1.4, which is on the road to version 2.0.  I've added a project roadmap for versions 1.4, 1.6, 1.8 and 2.0.</p>

<p>Thanks to Sebastien Estienne, who is maintaining the Debian/Ubuntu innotop packages, for helping me decide how to arrange the source repository, branching and tagging practices, and more.  He's right &#8212; once I have things set up right, it's not hard.  Go me!</p>

<p>Lenz Grimmer contributed an RPM spec file, which users can use to build an installable RPM directly from the tarball on RPM-based systems.  As soon as I verify that I've gotten it right, I'll make an unstable 1.3 release.  I'll write more about it then.  I hope at least some people will begin using 1.3 so I get feedback on the (many) changes I've made.</p>

<h3>A little bit of history</h3>

<p>My baby is getting all grown up!  Many of you probably don't realize how innotop started.  Here's the email to my coworkers:</p>

<blockquote><p>Date: Mon, 05 Jun 2006 09:57:32 -0400<br />
From: Me<br />
To: Greg, John, Alan, Peter<br />
Subject: tool I wrote over the weekend<br /

<p>In my home directory on kenya, in bin/ you will find a little gizmo 
called innodb-tx-monitor, which I wrote over the weekend.  It parses the 
output of SHOW INNODB STATUS.  I am going to maintain and improve this 
and make it available on my website for the world to use, so if you have 
any improvements to suggest or code changes to make&#8230; it's definitely a 
rough draft as of this point, but hey.</p>

<p>I use it like this:</p>

<p><code>watch --interval=20 innodb-tx-monitor -host usa -user baron -db test 
-pw password</code></p>

<p>At some point I want to make it interactive-ish, like mytop, and not 
have to run within watch, and have a config file so the password isn't 
there for others to see on the command line, etc etc.  Lots of ideas. 
Send me yours :-)</p></blockquote>

<p>I no longer have the code from that try &#8212; it was little more than a shell script at that time.  But the first version of innotop I committed to my CVS repository is 444 lines, <em>including a sample of the InnoDB monitor output I pasted in for my reference</em>, and InnoDBParser.pm was 394 lines total.  It looked like this when I ran it from <code>watch</code>:</p>

<p><a href="/articles/innotop-blast-from-past.png"><img src="/articles/innotop-blast-from-past-thumb.png" alt="screenshot of innotop, CVS revision 1.1" /></a></p>

<p>Given the transactions being held open for 23,000 seconds (it still makes me cringe), I'm sure you can see why I was motivated to write this utility.</p>

<p>Today innotop and InnoDBParser.pm are a combined total of over 5,000 lines of code.  If I'd written it in anything but Perl, it'd likely be many times that size.  Wow!</p>

<p>Happy 1.0, innotop!  Here's to a bright and useful future.</p>
