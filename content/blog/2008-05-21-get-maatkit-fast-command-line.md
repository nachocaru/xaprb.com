---
title: Get Maatkit fast from the command line
author: Baron Schwartz
layout: post
permalink: /2008/05/21/get-maatkit-fast-command-line/
tags:
  - Apache
  - mod_rewrite
  - Subversion
---
I have been using Maatkit in a different way since I joined [Percona][1] as a consultant. When I&#8217;m working on a system now, it&#8217;s a new, unfamiliar system &#8212; not one where I have already installed my favorite programs. And that means I want to grab my favorite productivity tools fast.

I intentionally wrote the [Maatkit][2] tools so they don&#8217;t need to be &#8220;installed.&#8221; You just run them, that&#8217;s all. But I never made them easy to download.

I fixed that. Now, at the command line, you can just run this:

<pre>wget http://www.maatkit.org/get/mk-table-sync</pre>

Now it&#8217;s ready to run. Behind the scenes are some Apache mod_rewrite rules, a Perl script or two, and Subversion. When you do this, you&#8217;re getting the latest code from Subversion&#8217;s trunk.\[1][2\] (I like to run on the bleeding edge. Releases are for people who want to install stuff.)

Because there&#8217;s some Perl magic behind it, I made it even easier &#8212; it does pattern-matching on partial names and Does The Right Thing:

<pre>baron@kanga:~$ wget http://www.maatkit.org/get/sync
--21:38:50--  http://www.maatkit.org/get/sync
           =&gt; `sync'
Resolving www.maatkit.org... 64.130.10.15
Connecting to www.maatkit.org|64.130.10.15|:80... connected.
HTTP request sent, awaiting response... 302 Moved
Location: http://www.maatkit.org/get/mk-table-sync [following]
--21:38:50--  http://www.maatkit.org/get/mk-table-sync
           =&gt; `mk-table-sync'
Connecting to www.maatkit.org|64.130.10.15|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: unspecified [application/x-perl]

    [      &lt;=&gt;                            ] 163,259      136.51K/s             

21:38:51 (136.13 KB/s) - `mk-table-sync' saved [163259]</pre>

The redirection is there because otherwise wget will save the file under the name &#8216;sync&#8217; instead of &#8216;mk-table-sync&#8217;.

And if you&#8217;ve forgotten which tools exist, you can just click on over to <http://www.maatkit.org/get/> and see.

A quick poll: instead of getting the latest trunk, should this give you the code from the last release? I can do that, if you want.

[1] OK, it&#8217;s only refreshed every hour. So you&#8217;re getting code that&#8217;s up to an hour old.

[2] **update:** now /get/foo gets the latest release, and /trunk/foo gets the latest trunk code.

 [1]: http://www.percona.com/
 [2]: http://www.maatkit.org