---
title: "Xaprb now uses Hugo"
date: "2014-01-15"
url: /blog/2014/01/15/using-hugo/
categories:
  - About
---
I've switched this blog from Wordpress to [Hugo][1]. If you see any broken links or
other problems, let me know. I'll re-enable comments and other features in the
coming days.

**Why not Wordpress?** I've used Wordpress since very early days, but I've had my
fill of security problems, the need to worry about whether a database is up and
available, backups, plugin compatibility problems, upgrades, and performance
issues. In fact, while converting the content from Wordpress to Markdown, I
found a half-dozen pages that had been hacked by some link-farm since around
2007. This wasn't the first such problem I'd had; it was merely the only one I
hadn't detected and fixed. And I've been really diligent with Wordpress
security; I have done things like changing my admin username and customizing my
`.htaccess` file to block common attack vectors, in addition to the usual
"lockdown" measures that one takes with Wordpress.

In contrast to Wordpress or other CMSes that use a database, static content is
secure, fast, and worry-free. I'm particularly happy that my content is all in
Markdown format now. Even if I make another change in the future, the content is
now mostly well-structured and easy to transform as desired. (There are some
pages and articles that didn't convert so well, but I will clean them up later.)

Why Hugo? There are [lots][2] of static site generators. Good ones include
Octopress and Jekyll, and I've used those. However, they come with some of their
own annoyances: dependencies, the need to install Ruby and so on, and
particularly bothersome for this blog, performance issues. Octopress ran my CPU
fan at top speed for about 8 minutes to render this blog.

Hugo is written in Go, so it has zero dependencies (a single binary) and is
fast. It renders this blog in a couple of seconds. That's fast enough to run it
in server mode, `hugo server -w`, and I can just alt-tab back and forth between
my writing and my browser to preview my changes. By the time I've tabbed over,
the changes are ready to view.

Hugo isn't perfect. For example, it lacks a couple of features that are present
in Octopress or Jekyll. But it's more than good enough for my needs, and I
intend to contribute some improvements to it if I get time. I believe it has the
potential to be a leading static site/blog generator going forward. It's already
close to a complete replacement for something like Jekyll.

[1]: http://hugo.spf13.com
[2]: http://staticsitegenerators.net
