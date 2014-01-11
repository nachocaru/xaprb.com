---
title: MySQL Table Checksum 1.1.6 released
  <p>MySQL Table Checksum 1.1.6 enhances chunking, adds features and fixes bugs.  The chunking functionality is where I continue to put most of my effort. <strong>This release's behavior is incompatible with the last release</strong>, and it will probably change again in the future.</p>
  
  <p>Thanks to everyone who has been helping me chase down bugs, including one user who sent me a major patch!  It's a great feeling to get a patch.</p>
permalink: /2007/06/03/mysql-table-checksum-116-released/
description:
  - >
    MySQL Table Checksum helps you check master and slave servers for replication
    consistency.
---
<p class="download">
  <a href="http://code.google.com/p/maatkit">Download MySQL Table Checksum</a>
</p>

MySQL Table Checksum 1.1.6 enhances chunking, adds features and fixes bugs. The chunking functionality is where I continue to put most of my effort. **This release's behavior is incompatible with the last release**, and it will probably change again in the future.

Thanks to everyone who has been helping me chase down bugs, including one user who sent me a major patch! It's a great feeling to get a patch.

### Changes

Incompatible changes:

*   The chunking functionality no longer guarantees chunks will be no larger than the specified size. Use &#8211;chunksize-exact for that. Note that the chunking functionality is still experimental and likely to change further.

Changes:

*   Chunking now works with multiple-column indexes.
*   Added &#8211;quiet option, useful for cron jobs with &#8211;replicate.
*   Added &#8211;float-precision option; works around different floating-point formats.
*   Added &#8211;sleep-coef option; sleeps a multiple of the time the last checksum took.
*   Added error handling for tables that are dropped during checksumming.
*   Added documentation on the finer points of &#8211;replicate-do and &#8211;binlog-do.

Bugs fixed:

*   There was a race condition between listing and checksumming tables.
*   Perl's auto-vivify hashes could cause all tables to be skipped after the first VIEW.
*   Some DBIs did not consider ? inside a comment to be a placeholder.
*   Systems that return nothing from CHECKSUM TABLE crashed mysql-table-checksum.
*   &#8211;askpass did not print a newline after reading password.
*   Different TIMESTAMP display formatting could cause spurious checksum differences.
*   Checksumming by chunks did not work when the chunk column contained NULL.
*   &#8211;replicate did not always work correctly with binlog\_do\_db.

### About MySQL Toolkit

[MySQL Toolkit][1] is a set of essential tools for MySQL users, developers and administrators. The project's goal is to make high-quality command-line tools that follow the UNIX philosophy of doing one thing and doing it well. They are designed for scriptability and ease of processing with standard command-line utilities such as `awk` and `sed`.

 [1]: http://code.google.com/p/maatkit
