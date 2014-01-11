---
title: 'A look at innotop&#8217;s new features'
author: Baron Schwartz
excerpt: "<p>I just made a snapshot of the development branch of the innotop MySQL and InnoDB monitor, and released it as version 1.3.0.  This code will eventually become version 1.4.  Here's what's new.</p>"
layout: post
permalink: /2007/01/16/a-look-at-innotops-new-features/
description:
  - A quick overview of the new features in innotop 1.3.0
---
I just made a snapshot of the development branch of the [innotop][1] MySQL and InnoDB monitor, and released it as version 1.3.0. This code will eventually become version 1.4. Here&#8217;s what&#8217;s new.

### Version number policy

Odd-numbered releases, such as 1.3.0, contain the code that will eventually become a stable release &#8212; in this case 1.4. Not all the features are there, and not all of them work perfectly, but it&#8217;s a development snapshot for community review and feedback. That said, there&#8217;s no dangerous code here, just the possibility of crashes.

### Major new features

The development branch of innotop is geared towards the eventual goal of monitoring a large number of servers at once. While there is much work to be done, the new features are a significant step towards the goal, in my opinion. With innotop 1.3.0 you can monitor multiple servers, organize them into groups, and switch between groups easily. If you don&#8217;t have that many servers to monitor, and don&#8217;t need to group them together, just press `@` to define and choose among server connections. If you&#8217;re interested in grouping servers together, take a look at what the `#` and `TAB` keys do.

Monitoring lots of servers at once makes life much easier if you manage a lot of machines that are involved in replication. To that end, I&#8217;ve also added a new mode to monitor master and slave status. You can see master and slave status in the same view; by default the data is grouped into slave SQL status, slave I/O status, and master status. This gives you a quick glance at whether the slaves are running, how far they lag the master, and so forth. Press `M` to enter this mode.

As always, you can press `?` at any time for context-sensitive help on these and other features.

You can use innotop in command-line scripting now. The command-line options are limited at this time, but I hope to get more feedback on the best way to do things before putting a lot more work into it. Right now, you can specify a config file from which innotop will determine what output to create. The output is tab-separated, and can be piped into `awk` or other command-line utilities for further processing.

I&#8217;ve also put a lot of work into making it easier to use innotop. There&#8217;s readline support to help you type the right thing (I recommend installing Term::ReadLine::Gnu for best performance). There&#8217;s a new &#8220;table editor&#8221; which allows you to determine which columns you want in the output. Press `^` to start the table editor.

While I&#8217;ve done a lot towards usability, some of the new features are still a bit rough. For example, user-defined expressions can now be the source of a column in the output, much like a spreadsheet. Suppose you want a column that shows the queries per second in the output; you can divide the queries by the uptime to get this. However, these expressions are basically Perl subroutines, so they&#8217;re probably not that useful to you at the moment, unless you know Perl. Likewise, you can do more complex filtering on the output, but you&#8217;re in Perl-land again. Over time I plan to make this more friendly.

I am trying to strike a balance between usability and learnability (yep, I&#8217;ve been reading [Joel Spolsky&#8217;s book on user-interface design][2]). I primarily intend for innotop to be a power-user tool. If you&#8217;re not a power-user, you probably don&#8217;t need it. However, I do want to make sure it is learnable, and I don&#8217;t want to ignore users who just have one server to monitor. You can help by telling me what you think.

### What&#8217;s next

I plan to finish fixing the things I&#8217;ve broken, polish off the new features, and finish the documentation before I slap a 1.4 label on the code and release it again. In the meantime I may make more incremental releases. This process will take me a little while, as I have several other projects I need to finish before I spend another large chunk of my spare time on innotop (I have spent a lot of time on it over the holidays).

You can download the new releases from [sourceforge][1] when they&#8217;re made. Initially a tar.gz and a zip file will always be made available; hopefully Debian and Ubuntu packages will follow soon after.

Stay tuned!

 [1]: http://code.google.com/p/innotop/
 [2]: http://www.amazon.com/gp/product/1893115941?ie=UTF8&#038;tag=xaprb-20&#038;link_code=as3&#038;camp=211189&#038;creative=373489&#038;creativeASIN=1893115941