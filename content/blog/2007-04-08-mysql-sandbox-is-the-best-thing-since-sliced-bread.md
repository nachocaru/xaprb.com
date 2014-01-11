---
title: MySQL Sandbox is the best thing since sliced bread
author: Baron Schwartz
excerpt: "<p>I've been preparing for my innotop session at the upcoming MySQL conference, and enlisted Giuseppe Maxia's MySQL Sandbox to help me get a bunch of MySQL servers, from 3.23.58 to 5.2.3, running on one machine.  It was super-easy and has helped me find some bugs in innotop.  I should have done this a long time ago.</p>"
layout: post
permalink: /2007/04/08/mysql-sandbox-is-the-best-thing-since-sliced-bread/
description:
  - >
    MySQL Sandbox gets many versions of MySQL set up to run from your home directory
    in a few seconds.
---
I&#8217;ve been preparing for my [innotop session][1] at the [upcoming MySQL conference][2], and enlisted [Giuseppe Maxia&#8217;s MySQL Sandbox][3] to help me get a bunch of MySQL servers, from 3.23.58 to 5.2.3, running on one machine. It was super-easy and has helped me find some bugs in [innotop][4]. I should have done this a long time ago.

To get started, I just read through Giuseppe&#8217;s Sandbox article on O&#8217;Reilly Databases Blog. After reading this, I downloaded the scripts and a bunch of binary distributions of MySQL (I&#8217;m using Ubuntu). I took the &#8220;how to make it easy&#8221; advice and unpacked them all in /opt/mysql:

<pre>baron@wabbit:~ $ ls /opt/mysql
3.23.58  4.0.27  4.1.0  4.1.22  5.1.15  5.2.3</pre>

After that, all I had to do was change to the sandbox directory and say `./express_install.pl <version>` for each version, and it set everything up for me. Boy, was that easy! Before I did this, I had spent a couple hours reading through the manual&#8217;s instructions on how to get many servers on one machine &#8212; this was much faster and easier.

The next step for me was setting up some of the servers as slaves of others. I needed to modify the config files to set the server-id, and to make them listen to TCP connections, but that was trivial.

Then I pointed innotop at all of them and started finding bugs in innotop (and a few in MySQL&#8217;s documentation too). Who knew [SHOW OPEN TABLES behaved so differently in 3.23.58][5]? It was high time I did this; I actually feel a little silly for putting it off so long.

 [1]: http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/13213
 [2]: http://www.mysqlconf.com/
 [3]: http://sourceforge.net/projects/mysql-sandbox
 [4]: http://code.google.com/p/innotop
 [5]: http://bugs.mysql.com/bug.php?id=27706