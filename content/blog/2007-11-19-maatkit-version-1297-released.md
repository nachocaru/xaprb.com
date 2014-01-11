---
title: Maatkit version 1297 released
author: Baron Schwartz
excerpt: |
  <p>Maatkit (formerly MySQL Toolkit) version 1297 contains a significant update to MySQL Table Checksum (which will be renamed soon to avoid trademark violations).  The changelog follows.  What you don't see in the changelog is <strong>the unit test suite!</strong>  I got a lot more of the code into modules that are tested and re-usable.</p>
  
  <pre>
  2007-11-18: version 1.1.19 
  
  * Check for needed privileges on --replicate table before beginning. 
  * Made some error messages more informative. 
  * Fixed child process exit status with 8-bit right-shift. 
  * Improved checksumming code auto-detects best algorithm and function. 
  * Added --ignoreengine option; ignores federated and merge by default. 
  * Added --columns and --checksum options. 
  * Removed --chunkcol, --chunksize-exact, --index options. 
  * --chunksize can be specified as a data size now. 
  * Improved chunking algorithm handles more cases and uses fewer chunks. 
  * Do not print --replcheck results for servers that are not slaves. 
  * Create only one DB connection for each host, not one per host/tbl/chunk. 
  * Code assumed backtick quoting, broke on SQL_MODE=ANSI (bug #1813030). 
  * There were many potential bugs with database and table name quoting. 
  * Child exit status errors could be masked by subsequent successes.</pre>
layout: post
permalink: /2007/11/19/maatkit-version-1297-released/
description:
  - >
    The new release of the Table Checksum tool for MySQL contains lots of bug fixes
    and new features.
tags:
  - checksum
  - MySQL
  - SQL
---
<p class="download">
  <a href="http://code.google.com/p/maatkit/">Download Maatkit</a>
</p>

Maatkit (formerly MySQL Toolkit) version 1297 contains a significant update to MySQL Table Checksum (which will be renamed soon to avoid trademark violations). The changelog follows. What you don&#8217;t see in the changelog is **the unit test suite!** I got a lot more of the code into modules that are tested and re-usable.

<pre>2007-11-18: version 1.1.19 

* Check for needed privileges on --replicate table before beginning. 
* Made some error messages more informative. 
* Fixed child process exit status with 8-bit right-shift. 
* Improved checksumming code auto-detects best algorithm and function. 
* Added --ignoreengine option; ignores federated and merge by default. 
* Added --columns and --checksum options. 
* Removed --chunkcol, --chunksize-exact, --index options. 
* --chunksize can be specified as a data size now. 
* Improved chunking algorithm handles more cases and uses fewer chunks. 
* Do not print --replcheck results for servers that are not slaves. 
* Create only one DB connection for each host, not one per host/tbl/chunk. 
* Code assumed backtick quoting, broke on SQL_MODE=ANSI (bug #1813030). 
* There were many potential bugs with database and table name quoting. 
* Child exit status errors could be masked by subsequent successes.</pre>