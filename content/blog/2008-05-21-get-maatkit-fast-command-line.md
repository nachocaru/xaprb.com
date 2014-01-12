---
title: Get Maatkit fast from the command line
date: "2008-05-21"
permalink: /2008/05/21/get-maatkit-fast-command-line/
categories:
  - Databases
  - Open Source
---
I have been using Maatkit in a different way since I joined [Percona][1] as a consultant. When I'm working on a system now, it's a new, unfamiliar system -- not one where I have already installed my favorite programs. And that means I want to grab my favorite productivity tools fast.

I intentionally wrote the [Maatkit][2] tools so they don't need to be "installed." You just run them, that's all. But I never made them easy to download.

I fixed that. Now, at the command line, you can just run this:

<pre>wget http://www.maatkit.org/get/mk-table-sync</pre>

Now it's ready to run. Behind the scenes are some Apache mod_rewrite rules, a Perl script or two, and Subversion. When you do this, you're getting the latest code from Subversion's trunk.\[1][2\] (I like to run on the bleeding edge. Releases are for people who want to install stuff.)

Because there's some Perl magic behind it, I made it even easier -- it does pattern-matching on partial names and Does The Right Thing:

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

The redirection is there because otherwise wget will save the file under the name 'sync' instead of 'mk-table-sync'.

And if you've forgotten which tools exist, you can just click on over to <http://www.maatkit.org/get/> and see.

A quick poll: instead of getting the latest trunk, should this give you the code from the last release? I can do that, if you want.

[1] OK, it's only refreshed every hour. So you're getting code that's up to an hour old.

[2] **update:** now /get/foo gets the latest release, and /trunk/foo gets the latest trunk code.

 [1]: http://www.percona.com/
 [2]: http://www.maatkit.org
