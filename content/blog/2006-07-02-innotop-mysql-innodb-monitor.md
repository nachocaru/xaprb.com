---
title: The innotop MySQL and InnoDB monitor
date: "2006-07-02"
url: /blog/2006/07/02/innotop-mysql-innodb-monitor/
categories:
  - Databases
  - Open Source
---

<p>MySQL and InnoDB expose lots of information about their internals, but it's hard to gather it all into one place and make sense of it.  I've written a tool to do that, and you are free to download and use it.  This article introduces <code>innotop</code>, a powerful text-mode MySQL and InnoDB monitoring tool.  It has lots of features, is  fast and configurable, and it's easy to use.</p>

<p>Note: I'm now making it a priority to make innotop very stable and robust.  If innotop crashes, please help me fix it.  <a href="http://www.xaprb.com/blog/2006/08/02/what-to-do-when-innotop-crashes/">Please read this article about how to submit a bug report for innotop</a>.  Thanks so much for helping me build a comprehensive test suite!</p>

<h3>Why another text-mode monitoring tool?</h3>

<p>Because the available ones aren't good enough.  I didn't want to duplicate anyone else's effort, but the other similar tools (mytop, mtop) haven't been actively maintained in years, don't work correctly with newer versions of MySQL, and frankly only offer a small fraction of the features I've built into <code>innotop</code>.</p>

<p>I said <code>innotop</code> has lots of features and is really flexible.  Here's just a small sampling to give an idea:</p>

<ol>
	<li>11 different modes to show lots of information in very useful ways</li>
	<li>completely configurable -- for example, you can choose which columns to see in every tabular display, in what order, what column to sort by, what direction to sort, add perl regex filters to any column, and on and on.</li>
	<li>offers features no other tool gives you, period.  What was the date, time, and query (plus lots of other info!) of each transaction involved in the last deadlock?  No other tool can give you that.  And that's just one of its dozens of unique features.</li>
	<li>it parses and displays InnoDB information, which is packed full of information.  No other tool even tries to do this.  Parsing the output of the InnoDB monitor is not for the faint of heart!</li>
	<li>its interactive help and configuration make it very easy to learn and highly productive to use.  What keys are mapped in the current mode?  Press '?' and find out.  What configuration variables can you change?  Press a key and find out.  Every function has context-sensitive help to keep you productive.</li>
</ol>

<p>Perhaps its most powerful and ambitious feature is the way it presents InnoDB internals.  MySQL is sorely lacking in instrumentation and analysis compared to other major relational database systems (for example, Microsoft SQL Server), and it is just no fun searching through the output of the InnoDB monitors to glean bits of information from it.  In my opinion, this feature alone is a major step forward to looking at what MySQL is doing internally.  The information has always been there, but until now it's been hard for <abbr title="Database Administrator">DBA</abbr>s to use.</p>

<p><code>innotop</code> is designed to do whatever you need it to do, and if it doesn't, you can let me know how to improve it.  I am continually using and improving this tool, in response to my own needs and those of other people using it.</p>

<h3>How to get and install <code>innotop</code></h3>

<p>You can <a href="http://code.google.com/p/innotop">download <code>innotop</code></a> from this link, and read the <a href="http://code.google.com/p/innotop/">documentation here</a> (generated from the embedded POD, which you can also read on the command-line).  You can also press the '?' key for online, context-sensitive help once <code>innotop</code> is running.</p>

<p>Please send improvements and suggestions to me.  I have been using it for quite a while now, but I'm sure there are bugs lurking around somewhere.  In particular, if you find any InnoDB monitor output it can't parse, please send me that output so I can add it to my test suite.</p>

<h3>Screenshots</h3>

<p>These screenshots are a bit contrived, since I'm getting them from a server that's basically idle, but I hope they give a sense of <code>innotop</code>'s features.  If you run <code>innotop</code> on a server that's doing anything, you'll see a lot more information in some of the modes.</p>

<p>InnoDB Transaction mode:</p>
<p><a href="/innotop/innotop-screenshot-T-mode.png"><img src="/innotop/innotop-screenshot-T-mode-thumb.png" alt="InnoDB Transaction Mode" width="200" height="117" /></a></p>

<p>Query List mode, with and without the header:</p>
<p><a href="/innotop/innotop-screenshot-Q-mode.png"><img src="/innotop/innotop-screenshot-Q-mode-thumb.png" alt="Query List Mode" width="200" height="120" /><a href="/innotop/innotop-screenshot-Q-mode-2.png"><img src="/innotop/innotop-screenshot-Q-mode-2-thumb.png" alt="Query List Mode with header and lots of inactive connections" width="200" height="136" /></a></p>

<p>InnoDB Foreign Key Error mode:</p>
<p><a href="/innotop/innotop-screenshot-F-mode.png"><img src="/innotop/innotop-screenshot-F-mode-thumb.png" alt="InnoDB Foreign Key Error mode" width="200" height="117" /></a></p>

<p>InnoDB Deadlock mode:</p>
<p><a href="/innotop/innotop-screenshot-D-mode.png"><img src="/innotop/innotop-screenshot-D-mode-thumb.png" alt="InnoDB Deadlock Mode" width="200" height="117" /></a></p>

<p>InnoDB I/O mode:</p>
<p><a href="/innotop/innotop-screenshot-I-mode.png"><img src="/innotop/innotop-screenshot-I-mode-thumb.png" alt="InnoDB I/O Mode" width="200" height="129" /></a></p>

<p>InnoDB Buffer mode:</p>
<p><a href="/innotop/innotop-screenshot-B-mode.png"><img src="/innotop/innotop-screenshot-B-mode-thumb.png" alt="InnoDB Buffer mode" width="200" height="129" /></a></p>

<p>InnoDB Row Operations mode:</p>
<p><a href="/innotop/innotop-screenshot-R-mode.png"><img src="/innotop/innotop-screenshot-R-mode-thumb.png" alt="InnoDB Row Operations" width="200" height="117" /></a></p>

<p>Load Graph mode:</p>
<p><a href="/innotop/innotop-screenshot-G-mode.png"><img src="/innotop/innotop-screenshot-G-mode-thumb.png" alt="Load Graph mode" width="200" height="117" /></a></p>

<p>Load Statistics mode:</p>
<p><a href="/innotop/innotop-screenshot-S-mode.png"><img src="/innotop/innotop-screenshot-S-mode-thumb.png" alt="Load Statistics mode" width="200" height="117" /></a></p>

<p>Variables and Status mode:</p>
<p><a href="/innotop/innotop-screenshot-V-mode.png"><img src="/innotop/innotop-screenshot-V-mode-thumb.png" alt="Variables and Status mode" width="200" height="117" /></a></p>

<p>Editing configuration on the fly:</p>
<p><a href="/innotop/innotop-screenshot-edit-config.png"><img src="/innotop/innotop-screenshot-edit-config-thumb.png" alt="Editing configuration on the fly" width="200" height="117" /></a></p>
