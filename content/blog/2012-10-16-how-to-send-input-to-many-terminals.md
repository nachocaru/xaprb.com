---
title: How to send input to many terminals
author: Baron Schwartz
layout: post
permalink: /2012/10/16/how-to-send-input-to-many-terminals/
categories:
  - SQL
  - Sys Admin
  - Tools
---
Do you ever find yourself wanting to open several terminal windows and send the same commands to all of them? I&#8217;ve had this need many times, and I&#8217;ve never found a completely satisfactory solution. I&#8217;ve also known a lot of people who&#8217;ve written various sets of scripts to help them accomplish such tasks.

In no particular order, here are a few ways I&#8217;ve done this in the past:

1.  Facebook&#8217;s pmysql client
2.  The [dsh][1] tool
3.  Several screen windows named remoteXXX, followed by a bash for-loop: `while read cmd; do screen -X at remote# stuff "$cmd"; done`
4.  Using many PuTTY windows and the [puttycs][2] tool
5.  Opening many tabs in KDE&#8217;s Kterm tool and selecting the options to send input to all tabs

Here are some I&#8217;ve heard about, but never used:

1.  [PolySH][3]
2.  rcall
3.  A variety of &#8220;terminal multiplexor&#8221; web pages I&#8217;ve [bookmarked][4]

Of course, in many cases a technology like Chef or Puppet provides the true solution. But a lot of the MySQL users I&#8217;ve known haven&#8217;t grown to the point that they want to spend the upfront time and effort to learn and deploy something like that. They&#8217;re investing in development instead, and bearing the cost of a little less efficient systems administration process.

What&#8217;s your favorite technique for doing lots of things all at once?

 [1]: http://www.netfort.gr.jp/~dancer/software/dsh.html.en
 [2]: http://www.millardsoftware.com/puttycs
 [3]: http://guichaz.free.fr/polysh/
 [4]: http://delicious.com/xaprb/terminal+multiplexor