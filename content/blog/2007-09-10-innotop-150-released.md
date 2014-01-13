---
title: innotop 1.5.0 released
date: "2007-09-10"
permalink: /blog/2007/09/10/innotop-150-released/
categories:
  - Databases
  - Open Source
---

<p>Version 1.5.0 of the innotop MySQL and InnoDB monitor is out.  This release is the first in the unstable 1.5.0 branch, which will eventually become the stable 1.6 branch.  I'm beginning to merge the various branches I've made to support some of our needs at my employer.  This first release adds some major new features and prepares for some other large improvements and new features.</p>

<h3>What's new</h3>

<p>Here's what's new:</p>

<ul>
	<li> Added plugin functionality.</li>

	<li> Added group-by functionality.</li>

	<li> Moved the configuration file to a directory.</li>

	<li> Enhanced filtering and sorting on pivoted tables.</li>

	<li> Many small bug fixes.</li>
</ul>

<h3>Plugins</h3>

<p>Plugins let you hook custom code into innotop.  Your custom Perl module can extend or change innotop without touching its source code, and all you have to do is drop it into a directory and activate it (sound familiar to you WordPress users?).  As an example of how this is useful, about two dozen lines of code lets me add "program" and "unix_pid" columns into the Query List and InnoDB Transaction List modes.  These show the originating program and PID for connections by <a href="http://www.xaprb.com/blog/2006/07/23/how-to-track-what-owns-a-mysql-connection/">querying tables in which this data is stored</a>.  The plugin adds the columns and expressions for them, and then adds the data in by using innotop's own DBI connections.</p>

<p>There's an example plugin in the <a href="http://code.google.com/p/innotop/">documentation</a>.</p>

<h3>Grouping</h3>

<p>This functionality lets you apply something like a SQL <code>GROUP BY</code> to a table.  There are some built-in rules (press the '=' key in Q or T mode; it's easier if you hide the header with the 'h' key first).</p>

<p>The built-in rules let you group connections or transactions by status.  They also automagically show a 'count' column, which is there but hidden until the grouping is applied.  Now you can see how many connections are in what status.  Here's a screenshot of before and after:</p>

<p><a href='http://www.xaprb.com/blog/wp-content/uploads/2007/09/innotop-q-ungrouped.png' title='innotop ungrouped'><img src='http://www.xaprb.com/blog/wp-content/uploads/2007/09/innotop-q-ungrouped.thumbnail.png' alt='innotop ungrouped' /></a></p>

<p><a href='http://www.xaprb.com/blog/wp-content/uploads/2007/09/innotop-q-grouped.png' title='innotop grouped'><img src='http://www.xaprb.com/blog/wp-content/uploads/2007/09/innotop-q-grouped.thumbnail.png' alt='innotop grouped' /></a></p>

<p>You can toggle this on and off easily with the '=' key on any table.   (Most tables don't have default group-by expressions, though, so you'll have to read the docs to learn more about that.  As with any features, let me know if you have a useful default you want me to include in innotop).</p>

<h3>Notes</h3>

<p>Don't be scared by the "unstable" designation.  It only means that I'm getting ready for a lot of changes that don't belong in a stable branch; this release should generally be as good quality as any other.  And I don't want to use a naming scheme like "innotop-6.0-pre-alpha-1_rel5&#8243;.  When I release a version I don't think is good quality, I'll let you know ;-)  Generally I'm going to confine that code to the Subversion repository.</p>

<p>As an aside, both this and the MySQL Toolkit project are becoming more popular, and as that happens, I'm also getting busier -- among other things, I'm writing a book!  I must say SourceForge is great in some ways for helping to manage the project, but a lot of extra work in others.  For example, it created a bunch of default forums, trackers, and settings when I created the projects, and that's been pretty hard to slog through.   The documentation system is not useful for my project.   I think I've <em>finally</em> figured out how to get emails when people submit bug reports.  I'm also trying to automate the tedious release process as much as I can, and it's not proving easy.  I don't mean this to be a litany of woes, because I know they and I are doing our respective bests; it's more of a commentary on the increased work that comes with a "generic, flexible" system -- which is what people always seem to want, until they get it.  I'm sure you all know what I mean!</p>

<p>Please go download, use, write plugins, and find and report bugs (via the sourceforge tracker, of course)!  And happy innotop-ing.</p>
