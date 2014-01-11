---
title: MySQL Table Checksum 1.1.5 released
date: "2007-05-16"
permalink: /2007/05/16/mysql-table-checksum-115-released/
categories:
  - Databases
---
<p class="download">
  <a href="http://code.google.com/p/maatkit">Download MySQL Table Checksum</a>
</p>

MySQL Table Checksum 1.1.5 adds a some useful features and fixes a couple of bugs. Now you can checksum tables in chunks, and there is an option to pause between chunks as well. This has already helped me recover a very large table that got out of sync on the slaves, and many of you have also requested this feature.

You can read the full release notes and documentation for the details, but here's an overview:

### Checksumming by chunks

This feature allows you to specify a maximum chunk size, such as one million. MySQL Table Checksum will look for the presence of a unique integer-valued column, such as an AUTO_INCREMENT primary key. If it finds such a column, it will start at the minimum of its range and checksum each range of a million together.

This doesn't mean one million rows per chunk; it means up to a million. If there are holes in the sequence of values, of course there will be fewer than a million rows in a chunk.

The output now includes an extra column &#8212; the chunk number. This starts at 1 for every table and counts up if the table is chunk-able. This column is included in the `--replicate` data as well, so you will need to add another column to your checksum table if you are using `--replicate`.

In addition to being easier on the server, doing checksums in chunks also means it's easier to use [MySQL Table Sync][1] to synchronize the table if you find problems with it. You can just work on the part of the table that has errors, instead of the whole table. (This code is in Subversion, but not yet released. I need to work on several other things with MySQL Table Sync as well).

I am mulling over ways to do chunking with non-numeric data, such as dates and characters. It would also be nice if it could handle multi-column keys. It seems much harder, but I may be able to find a way. I have already done a lot of work towards this end with the table-syncing algorithms I've designed. This functionality is just a first cut; I wanted to get feedback before adding any more. If you need to, you can manually specify a chunk column, which should let you use the functionality on tables MySQL Table Checksum would decline to chunk on its own.

### Pause between chunks

If you specify the `--sleep` option, MySQL Table Checksum will pause and release locks between every checksum. This works on whole tables and on chunks.

### Bug fixes

The most important bug fix is an optimization that was disabled due to a combination of things. The BIT_XOR strategy should be able to optimize itself and be faster now, though I don't know exactly how much.

### About MySQL Toolkit

[MySQL Toolkit][1] is a set of essential tools for MySQL users, developers and administrators. The project's goal is to make high-quality command-line tools that follow the UNIX philosophy of doing one thing and doing it well. They are designed for scriptability and ease of processing with standard command-line utilities such as `awk` and `sed`.

 [1]: http://code.google.com/p/maatkit
