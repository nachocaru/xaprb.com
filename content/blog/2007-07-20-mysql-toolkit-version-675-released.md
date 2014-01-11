---
title: MySQL Toolkit version 675 released
author: Baron Schwartz
excerpt: "<p>I've just released changes to two of the tools in MySQL Toolkit.  MySQL Table Checksum got some convenient functionality to help you recursively check slaves for bad replicated checksum chunks.  MySQL Archiver got statistics-gathering functionality to help you optimize your archiving and purging jobs, plus a few important bug fixes.</p>"
layout: post
permalink: /2007/07/20/mysql-toolkit-version-675-released/
description:
  - >
    The new release of MySQL Toolkit contains enhanced functionality and some bug
    fixes.
tags:
  - archiving
  - checksum
  - MySQL
  - mysqltoolkit
  - purging
  - replication
  - SQL
---
<p class="download">
  <a href="http://code.google.com/p/maatkit">Download MySQL Toolkit</a>
</p>

I&#8217;ve just released changes to two of the tools in MySQL Toolkit. MySQL Table Checksum got some convenient functionality to help you recursively check slaves for bad replicated checksum chunks. MySQL Archiver got statistics-gathering functionality to help you optimize your archiving and purging jobs, plus a few important bug fixes.

Changes in MySQL Archiver:

*   Made &#8211;time suffix optional.
*   Added &#8211;statistics option to gather and print timing statistics.
*   Added signal handling so mysql-archiver exits cleanly when it can.
*   Changed exit status to 0 when &#8211;help is given.
*   Out-of-column-order primary keys were not ascended correctly.

Changes in MySQL Table Checksum:

*   Added &#8211;replcheck option to check &#8211;replicate results on slaves.
*   Added &#8211;recursecheck option to do &#8211;replcheck recursively.