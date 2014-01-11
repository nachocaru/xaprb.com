---
title: Three updated tools in MySQL Toolkit
author: Baron Schwartz
excerpt: |
  <p>I've just released three updates to tools in <a href="http://sourceforge.net/projects/mysqltoolkit">MySQL Toolkit</a>.  The updated programs are MySQL Query Profiler (major new features and helper script), MySQL Table Sync (bug fixes, documentation, features), and MySQL Table Checksum (minor sanity check enhancement).</p>
layout: post
permalink: /2007/04/05/is-mysql-ready-for-the-enterprise/
description:
  - >
    Introduces major new functionality in MySQL Query Profiler and important bug
    fixes in MySQL Table Sync
---
<p class="download">
  <a href="http://code.google.com/p/maatkit">Download MySQL Toolkit</a>
</p>

I've just released three updates to tools in [MySQL Toolkit][1]. The updated programs are MySQL Query Profiler (major new features and helper script), MySQL Table Sync (bug fixes, documentation, features), and MySQL Table Checksum (minor sanity check enhancement).

### MySQL Query Profiler 1.1.0

I've added the ability to profile more data, including an educated guess at the number of filesorts.

The tool can now profile external programs. There are several ways you can do this:

1.  Run the tool. It takes a status snapshot, then pauses while you run whatever external query or program you want to profile. Then it takes another snapshot and reports on what happened.
2.  Run the tool and pipe commands into it via standard input. It executes them, taking status snapshots after every one.
3.  Run the tool and give it a file of commands to execute and profile. These are shell commands, not SQL queries.

I also enhanced the command-line behavior so it acts just like you'd expect any pipe-and-filter program to work. You can shove input into its STDIN, give it multiple files to read and profile, give it the &#8211; file so it reads from STDIN, and so on. The normal UNIX-ish behavior.

I also wrote a helper script that can extract and line up bits of the output so you can compare profiling results side-by-side. This is a major usability boost in my opinion. Say you want to profile your application's queries individually, but there are a thousand of them and you only want to see every tenth one. That's now easy to do, and they're lined up so you can just look across the rows and see the differences.

### MySQL Table Sync 0.9.1

This release fixes a bunch of bugs with arithmetic and so forth. It also adds new features, like the ability to do the sync in a single transaction so it can be rolled back. There's more documentation too.

I've written a test suite that generates random data, copies it to another table, randomly screws it up, and then fixes it. This helped me catch the bugs. I haven't seen it fail in a long time now.

However &#8212; caveat emptor. I am still leery of saying this is production-ready yet. For one thing, it's not feature-complete!

### MySQL Table Checksum 1.0.4

There's a bit of new documentation on the checksum algorithm in this release, but the important thing is a sanity check that makes sure all the servers you're running the checksum on have the same behavior for some of the crucial checksum code. MySQL changed some behavior that will make checksums different before and after version 4.0.14. MySQL Table Checksum now sanity-checks for this.

### About MySQL Toolkit

[MySQL Toolkit][1] is a set of essential tools for MySQL users, developers and administrators. The project's goal is to make high-quality command-line tools that follow the UNIX philosophy of doing one thing and doing it well. They are designed for scriptability and ease of processing with standard command-line utilities such as `awk` and `sed`.

 [1]: http://code.google.com/p/maatkit
