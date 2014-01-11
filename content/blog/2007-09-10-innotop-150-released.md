---
title: innotop 1.5.0 released
author: Baron Schwartz
excerpt: "<p>Version 1.5.0 of the innotop MySQL and InnoDB monitor is out.  This release is the first in the unstable 1.5.0 branch, which will eventually become the stable 1.6 branch.  I'm beginning to merge the various branches I've made to support some of our needs at my employer.  This first release adds some major new features and prepares for some other large improvements and new features.</p>"
layout: post
permalink: /2007/09/10/innotop-150-released/
description:
  - Version 1.5.0 of the innotop MySQL and InnoDB monitor is released.
tags:
  - monitoring
  - MySQL
  - SQL
---
<p class="download"><a href="http://code.google.com/p/innotop/">Download innotop</a></p>

<p>Version 1.5.0 of the innotop MySQL and InnoDB monitor is out.  This release is the first in the unstable 1.5.0 branch, which will eventually become the stable 1.6 branch.  I&#8217;m beginning to merge the various branches I&#8217;ve made to support some of our needs at my employer.  This first release adds some major new features and prepares for some other large improvements and new features.</p>

<h3>What&#8217;s new</h3>

<p>Here&#8217;s what&#8217;s new:</p>

<ul>
	<li> Added plugin functionality.</li>

	<li> Added group-by functionality.</li>

	<li> Moved the configuration file to a directory.</li>

	<li> Enhanced filtering and sorting on pivoted tables.</li>

	<li> Many small bug fixes.</li>
</ul>

<h3>Plugins</h3>

<p>Plugins let you hook custom code into innotop.  Your custom Perl module can extend or change innotop without touching its source code, and all you have to do is drop it into a directory and activate it (sound familiar to you WordPress users?).  As an example of how this is useful, about two dozen lines of code lets me add &#8220;program&#8221; and &#8220;unix_pid&#8221; columns into the Query List and InnoDB Transaction List modes.  These show the originating program and PID for connections by <a href="http://www.xaprb.com/blog/2006/07/23/how-to-track-what-owns-a-mysql-connection/">querying tables in which this data is stored</a>.  The plugin adds the columns and expressions for them, and then adds the data in by using innotop&#8217;s own DBI connections.</p>

<p>There&#8217;s an example plugin in the <a href="http://code.google.com/p/innotop/">documentation</a>.</p>

<h3>Grouping</h3>

<p>This functionality lets you apply something like a SQL <code>GROUP BY</code> to a table.  There are some built-in rules (press the &#8216;=&#8217; key in Q or T mode; it&#8217;s easier if you hide the header with the &#8216;h&#8217; key first).</p>

<p>The built-in rules let you group connections or transactions by status.  They also automagically show a &#8216;count&#8217; column, which is there but hidden until the grouping is applied.  Now you can see how many connections are in what status.  Here&#8217;s a screenshot of before and after:</p>

<p><a href='http://www.xaprb.com/blog/wp-content/uploads/2007/09/innotop-q-ungrouped.png' title='innotop ungrouped'><img src='http://www.xaprb.com/blog/wp-content/uploads/2007/09/innotop-q-ungrouped.thumbnail.png' alt='innotop ungrouped' /></a></p>

<p><a href='http://www.xaprb.com/blog/wp-content/uploads/2007/09/innotop-q-grouped.png' title='innotop grouped'><img src='http://www.xaprb.com/blog/wp-content/uploads/2007/09/innotop-q-grouped.thumbnail.png' alt='innotop grouped' /></a></p>

<p>You can toggle this on and off easily with the &#8216;=&#8217; key on any table.   (Most tables don&#8217;t have default group-by expressions, though, so you&#8217;ll have to read the docs to learn more about that.  As with any features, let me know if you have a useful default you want me to include in innotop).</p>

<h3>Notes</h3>

<p>Don&#8217;t be scared by the &#8220;unstable&#8221; designation.  It only means that I&#8217;m getting ready for a lot of changes that don&#8217;t belong in a stable branch; this release should generally be as good quality as any other.  And I don&#8217;t want to use a naming scheme like &#8220;innotop-6.0-pre-alpha-1_rel5&#8243;.  When I release a version I don&#8217;t think is good quality, I&#8217;ll let you know ;-)  Generally I&#8217;m going to confine that code to the Subversion repository.</p>

<p>As an aside, both this and the MySQL Toolkit project are becoming more popular, and as that happens, I&#8217;m also getting busier &#8212; among other things, I&#8217;m writing a book!  I must say SourceForge is great in some ways for helping to manage the project, but a lot of extra work in others.  For example, it created a bunch of default forums, trackers, and settings when I created the projects, and that&#8217;s been pretty hard to slog through.   The documentation system is not useful for my project.   I think I&#8217;ve <em>finally</em> figured out how to get emails when people submit bug reports.  I&#8217;m also trying to automate the tedious release process as much as I can, and it&#8217;s not proving easy.  I don&#8217;t mean this to be a litany of woes, because I know they and I are doing our respective bests; it&#8217;s more of a commentary on the increased work that comes with a &#8220;generic, flexible&#8221; system &#8212; which is what people always seem to want, until they get it.  I&#8217;m sure you all know what I mean!</p>

<p>Please go download, use, write plugins, and find and report bugs (via the sourceforge tracker, of course)!  And happy innotop-ing.</p>
