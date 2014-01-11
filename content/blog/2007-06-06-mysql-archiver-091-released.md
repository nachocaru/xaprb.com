---
title: MySQL Archiver 0.9.1 released
permalink: /2007/06/06/mysql-archiver-091-released/
description:
  - "MySQL archiver's unique algorithm efficiently archives data from a table to a file and/or another table without interfering with other queries."
tags:
  - archiving
  - data warehousing
  - MySQL
  - mysqltoolkit
  - sourceforge
  - SQL
---
<p class="download">
  <a href="http://code.google.com/p/maatkit">Download MySQL Archiver</a>
</p>

MySQL Archiver is the implementation of the [efficient forward-only archiving and purging strategies][1] I wrote about more than a year ago. It nibbles rows from a table, then inserts them into another table and/or writes them to a file. The object is to do this without interfering with critical online transaction-processing (OLTP) queries.

Several people have asked me to release this code, which I originally wrote for my employer. As it turns out, the delay has been fruitful. I learned a lot more about query optimization during this time, found bugs with my original approach, and got exposure to different archiving needs and techniques. As a result, this tool runs something like four to ten times faster than the code I wrote last year.

I decided to write and release it now because my employer has grown to the point we need to archive more data, faster, more flexibly. Instead of just open-sourcing the code I wrote last year, I have rewritten it from the ground up. We are using exactly the same code, and hope to benefit from community feedback and improvements.

I think the result is a good tool that does a lot of work for you:

*   It automatically writes efficient queries by inspecting table structures and indexes.
*   It handles transactions, lock timeouts and deadlocks.
*   It writes archived data to a file in the same format `LOAD DATA INFILE` uses by default.

It has a lot of options and functionality, so I won't go into it too much here. I also have several ideas I want to implement in the future, but I want to see what the community thinks of what I've done so far before I work on it too much more.

Despite the improvements, the basic approach remains the same: it finds the first row(s), and then on subsequent queries, it continues from where it left off, rather than scanning the whole table from the start. This makes it efficient to archive in small "nibbles," which avoids contention with OLTP queries.

I've put almost 30 extra-curricular hours into this recently. Most of the time has gone into making sure every different type of archiving job my employer needs to run can be generated as efficiently as possible with a minimum of fuss, such as a simple command-line option or two. I'm eager to hear what you think of it, whether it meets your needs, and how it can be improved. And I'm glad I've finally gotten it done after all this time!

### About MySQL Toolkit

[MySQL Toolkit][2] is a set of essential tools for MySQL users, developers and administrators. The project's goal is to make high-quality command-line tools that follow the UNIX philosophy of doing one thing and doing it well. They are designed for scriptability and ease of processing with standard command-line utilities such as `awk` and `sed`.

 [1]: /blog/2006/05/02/how-to-write-efficient-archiving-and-purging-jobs-in-sql/
 [2]: http://code.google.com/p/maatkit
