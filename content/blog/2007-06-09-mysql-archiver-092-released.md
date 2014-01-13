---
title: MySQL Archiver 0.9.2 released
date: "2007-06-09"
permalink: /blog/2007/06/09/mysql-archiver-092-released/
categories:
  - Databases
---

This release fixes some minor bugs and adds a plugin mechanism. Now you can extend MySQL Archiver with your own code easily. You could use this to run setup and tear-down, hook code into the archiving process, and more. Possibilities include building summary tables in a data warehouse during archiving, handling dependencies such as foreign keys before archiving each row, or applying advanced logic to determine which rows to archive.

The documentation contains full details about the plugin interface, including example code.
