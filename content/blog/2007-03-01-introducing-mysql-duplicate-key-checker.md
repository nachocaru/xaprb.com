---
title: Introducing MySQL Duplicate Key Checker
date: "2007-03-01"
permalink: /2007/03/01/introducing-mysql-duplicate-key-checker/
description:
  - >
    A powerful, scriptable tool to check MySQL tables for duplicate or redundant
    indexes and foreign keys
---
<p class="download">
  <a href="http://code.google.com/p/maatkit">Get MySQL Duplicate Key Checker</a>
</p>

I've just released MySQL Duplicate Key Checker on SourceForge. This is a complete rewrite of a [tool I initially released under a slightly different name][1]. It is now much more powerful and friendlier to use, especially for scripting, and has many more options.

As with the [MySQL Table Checksum][2] tool, it is part of [MySQL Toolkit][3].

### What's new

I've redesigned the program from the ground up to be more UNIX-friendly. In particular, the output is suitable for piping to `awk` or other tools.

The tool does a lot more for you by default. For example, it analyzes all tables in all databases. You can limit and exclude databases and tables, of course.

There are many more options. This tool is now much more general-purpose. Instead of merely finding duplicated or redundant indexes and foreign keys, the approach I took in this rewrite is to find and print information on *all* indexes and foreign keys &#8212; but filter out all but duplicates by default.

This means you can use the tool for other things. For example, you can get a list of all indexes. You could pipe a list of all foreign keys into another program, which describes or analyzes relationships and dependencies among your tables, perhaps to generate schema diagrams. If you want to write a tool for that purpose, please consider adding it to the toolkit. If I don't beat you to it, that is! It's on the list.

### Sample Output

The output is much more compact now. Here's a sample:

<pre>mysql-duplicate-key-checker -d gamer -t semaphore
DATABASE TABLE     ENGINE OBJECT           TYPE STRUCT   PARENT        COLUMNS
gamer    semaphore InnoDB PRIMARY          KEY  BTREE    NULL          `i`
gamer    semaphore InnoDB i                KEY  BTREE    NULL          `i`
gamer    semaphore InnoDB semaphore_ibfk_1 FK   NULL     `gamer`.`foo` `i`
gamer    semaphore InnoDB semaphore_ibfk_2 FK   NULL     `gamer`.`foo` `i`</pre>

You only see output if you have duplicated indexes or foreign keys (unless you disable the filtering, in which case you'll see everything). I deliberately added some duplicate keys to that table.

Redundant indexes aren't just exact duplicates, as I discussed in the original articles. A redundant index could just be a leftmost prefix of another index. And for foreign keys, keying the same columns to the same referenced table, in any order, suffices.

### Summary

Yet another tool! Yay!

 [1]: /blog/2006/09/17/duplicate-index-checker-version-18-released/
 [2]: /blog/2007/02/26/introducing-mysql-table-checksum/
 [3]: http://code.google.com/p/maatkit
