---
title: innotop version 1.4.3 released
author: Baron Schwartz
excerpt: '<p>Version 1.4.3 of the innotop MySQL and InnoDB monitor is out.  This release fixes some minor bugs and feature annoyances, and at last innotop has thorough documentation, available online!</p>'
layout: post
permalink: /2007/07/15/innotop-version-143-released/
description:
  - The new release of innotop fixes minor bugs and adds complete documentation
tags:
  - InnoDB
  - Innotop
  - monitoring
  - MySQL
  - mytop
  - SQL
---
<p class="download">
  <a href="http://code.google.com/p/innotop/">Download innotop</a>
</p>

Version 1.4.3 of the innotop MySQL and InnoDB monitor is out. This release fixes some minor bugs and feature annoyances, and at last innotop has thorough documentation, available online!

### What&#8217;s new

Here&#8217;s what&#8217;s new:

*   Added standard &#8211;version command-line option
*   Changed colors to cyan instead of blue; more visible on dark terminals.
*   Added information to the filter-choosing dialog.
*   Added column auto-completion when entering a filter expression.
*   Changed Term::ReadKey from optional to mandatory.
*   Clarified username in password prompting.
*   Ten thousand words of documentation! Documentation is embedded in innotop, installed as a man page, and [available online][1].

Bugs fixed:

*   innotop crashed in W mode when InnoDB status data was truncated.
*   innotop didn&#8217;t display errors in tables if debug was enabled.
*   The colored() subroutine wasn&#8217;t being created in non-interactive mode.
*   Don&#8217;t prompt to save password except the first time.

### What&#8217;s next

I don&#8217;t know how much time I&#8217;ll get to put into this in the coming months, but there&#8217;s already a lot of half-finished functionality in the Subversion repository, including the ability to write innotop plugins. If you&#8217;re interested, the code is in the trunk and in various branches.

Hopefully I&#8217;ll get time to work on some of that before the year is out.

 [1]: http://code.google.com/p/innotop/documentation/