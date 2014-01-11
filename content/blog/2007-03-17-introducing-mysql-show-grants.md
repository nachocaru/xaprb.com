---
title: 'Introducing MySQL Toolkit&#8217;s Show Grants tool'
author: Baron Schwartz
excerpt: "<p>MySQL Toolkit's Show Grants tool makes it easy to extract grants from a MySQL server in canonical form. You can use it to replicate grants between servers, diff grants, and avoid spurious changesets in version control systems.</p>"
layout: post
permalink: /2007/03/17/introducing-mysql-show-grants/
description:
  - >
    MySQL Show Grants makes it easy to extract, compare, canonicalize, diff and
    replicate MySQL grants between servers.
---
<p class="download">
  <a href="http://code.google.com/p/maatkit">Download MySQL Show Grants</a>
</p>

MySQL Toolkit&#8217;s Show Grants tool makes it easy to extract grants from a MySQL server in canonical form. You can use it to replicate grants between servers, diff grants, and avoid spurious changesets in version control systems. It&#8217;s part of the [Maatkit][1] project on Google Code.

It&#8217;s a fairly simple tool that connects to a MySQL server, issues `SHOW GRANTS`, and prints the results. By default it prints grants for every user, but you can specify users to show and users to ignore.

### Why a tool for such a simple task?

It&#8217;s not as simple as it sounds. By default the output you get from running `SHOW GRANTS` is not canonicalized. The default output for the same grants is different on different servers, and in fact even on the same server if you wait and try again later! This means you can&#8217;t `diff` or visually inspect grants easily. It also means you&#8217;ll get spurious changesets if you&#8217;re [automatically saving grants into version control][2].

This tool canonicalizes the grants in three ways:

*   If there are multiple rows of output, they&#8217;re sorted.
*   If there&#8217;s a row that contains the `IDENTIFIED BY` clause, which defines the user&#8217;s password, it comes first.
*   Grants are sorted within the rows, so `GRANT SELECT, INSERT...` becomes `GRANT INSERT, SELECT...`

Besides canonicalizing grants, it&#8217;s a more convenient way to extract grants from one server and insert them on another. The output is semicolon-terminated so you can pipe it right into `mysql` and execute the grant statements.

### About MySQL Toolkit

[MySQL Toolkit][1] is a set of essential tools for MySQL users, developers and administrators. The project&#8217;s goal is to make high-quality command-line tools that follow the UNIX philosophy of doing one thing and doing it well. They are designed for scriptability and ease of processing with standard command-line utilities such as `awk` and `sed`. Other tools in the toolkit include a table checksummer and a duplicate key checker.

 [1]: http://code.google.com/p/maatkit
 [2]: /blog/2006/07/09/so-you-think-your-code-is-in-version-control/