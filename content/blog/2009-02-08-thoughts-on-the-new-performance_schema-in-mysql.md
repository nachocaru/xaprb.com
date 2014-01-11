---
title: Thoughts on the new PERFORMANCE_SCHEMA in MySQL
author: Baron Schwartz
layout: post
permalink: /2009/02/08/thoughts-on-the-new-performance_schema-in-mysql/
categories:
  - SQL
tags:
  - MySQL
  - performance
  - PERFORMANCE_SCHEMA
---
[Peter Gulutzan][1] and [Mark Leith][2] have both written about [the new PERFORMANCE_SCHEMA in MySQL][3]. I&#8217;ve read through the worklog, or most of it &#8212; there were some spots where Firefox seemed to start overlaying parts with other parts, quite weird. But anyway I&#8217;ve read as much as I can.

Obviously many people have been putting a ton of thought into this for years, and I can&#8217;t pretend to judge their work in a single sitting. But I have opinions nevertheless.

If the implementation turns out to be as good as the initial swing at it looks, this is a great development. This is the way things should be done &#8212; this is, finally, the level of detail of instrumentation other databases have. There&#8217;s a lot of complexity; it is a *large* worklog and I can&#8217;t say whether it&#8217;s complete or something is put in the wrong place or will turn out to be not quite what&#8217;s needed; that&#8217;s where I stop trying to form an opinion. But overall, this is just a great development.

A few questions and comments, though.

*   Why has this not been public? You put four years of work into this without any community input? What a shame.
*   Mark says &#8220;Thereâ€™s no stats for InnoDB yet, though I canâ€™t see that lasting for long.&#8221; I can. Why don&#8217;t you see InnoDB being slow to add support for it?
*   What version is this intended for? 6.x is kind of vague after four years of work.
*   Information by itself is no use unless you can act on it. I predict that a lot of neglected bug reports will get revisited if this information can be brought to bear on it. I also predict that if implemented fully, this will show people where the hot spots in their server are; and yet they&#8217;ll be unable to fix them.

 [1]: http://blogs.mysql.com/peterg/2009/02/05/mysql-performance-schema/
 [2]: http://www.markleith.co.uk/?p=112
 [3]: http://forge.mysql.com/worklog/task.php?id=2360