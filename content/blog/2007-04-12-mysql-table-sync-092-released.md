---
title: MySQL Table Sync 0.9.2 released
date: "2007-04-12"
permalink: /2007/04/12/mysql-table-sync-092-released/
categories:
  - Databases
---
<p class="download">
  <a href="http://code.google.com/p/maatkit">Download MySQL Table Sync</a>
</p>

MySQL Table Sync 0.9.2 is a bug-fix release. Since the last release users have reported several bugs. I am still postponing new features until after the [MySQL Conference and Expo][1], because I am focusing on [the innotop session][2] I'll be presenting at the conference.

I have also created a new mailing list on [sourceforge][3] for discussing all things MySQL Toolkit. Thanks to a user for suggesting the mailing list &#8212; I needed a nudge.

What's new in version 0.9.2?

*   Documentation (added OPTIONS section to perldoc).
*   Bug fix: get a row at a time from the server by default. I didn't notice that the default behavior for the DBD driver is to fetch the entire result set into memory! This is a terrible idea on really large tables. This fix causes MySQL Table Sync to fetch a single row at a time from the server, so it never uses much memory and runs faster now.
*   Bug fix: when the user specifies &#8211;columns, ignore other columns. You can sync common columns in otherwise different tables now, and you can compare and sync only specified columns.
*   Bug fix: make sure fetch handle is active before trying to fetch a row. This isn't an issue in my development environment, but apparently some versions of Perl (?) or DBI (?) or DBD (?) have different behavior when the end of the resultset is hit. This fix makes more versions of whatever-is-the-problem happy.

More goodies will be forthcoming after the conference and whatever I end up doing to innotop in the next few weeks. There are many un-implemented or partially implemented features, and I intend to fix that.

### About MySQL Toolkit

[MySQL Toolkit][3] is a set of essential tools for MySQL users, developers and administrators. The project's goal is to make high-quality command-line tools that follow the UNIX philosophy of doing one thing and doing it well. They are designed for scriptability and ease of processing with standard command-line utilities such as `awk` and `sed`.

 [1]: http://www.mysqlconf.com/
 [2]: http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/13213
 [3]: http://code.google.com/p/maatkit
