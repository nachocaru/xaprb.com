---
title: MySQL Table Checksum 1.1.9 released
  <p>This release fixes some bugs and improves the chunking functionality.  MySQL Table Checksum had a few minor bugs and one major bug with the chunking functionality.  I also rewrote the chunking, though the behavior is backwards compatible.  I am very happy with the way it works now, and will probably not make any more incompatible changes to it.  The changes enabled me to add support for chunking on float, double and decimal columns.</p>
  
  <p>It still doesn't support chunking on character-based columns, though I know now how I'll do it if I do.  Also, support for ENUM and SET shouldn't be hard to add.  I have no need for these features myself.  If you need it, please file a bug report on the Sourceforge tracker.</p>
permalink: /2007/07/10/mysql-table-checksum-119-released/
description:
  - The new release of MySQL Toolkit contains improvements to MySQL Table Checksum
tags:
  - mysql checksum replication
---
<p class="download">
  <a href="http://code.google.com/p/maatkit">Download MySQL Toolkit</a>
</p>

This release fixes some bugs and improves the chunking functionality. MySQL Table Checksum had a few minor bugs and one major bug with the chunking functionality. I also rewrote the chunking, though the behavior is backwards compatible. I am very happy with the way it works now, and will probably not make any more incompatible changes to it. The changes enabled me to add support for chunking on float, double and decimal columns.

It still doesn't support chunking on character-based columns, though I know now how I'll do it if I do. Also, support for ENUM and SET shouldn't be hard to add. I have no need for these features myself. If you need it, please file a bug report on the Sourceforge tracker.
