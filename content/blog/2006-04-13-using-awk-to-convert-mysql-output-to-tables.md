---
title: How to convert MySQL output to HTML tables
date: "2006-04-13"
permalink: /2006/04/13/using-awk-to-convert-mysql-output-to-tables/
description:
  - >
    Shows two ways to pipe the output from the MySQL client into programs that
    convert it to HTML tables.
---
In this article I'll explain how to control the output of the `mysql` client program and feed it to another program to transform the results as desired. I often transform output into HTML tables for these blog articles &#8212; at least, I do when I'm not being lazy.

The `mysql` command-line program can accept a command and print the results directly to STDOUT. The default output behavior differs depending on where its input comes from. When the input comes via STDIN, the output is tab-separated values. When the input comes via the `-e` or `--execute` options, or when the `-t` option is specified, the output is in "tabular" format, with borders drawn by pipes, dashes and plus characters.

Results can also be printed vertically, as they are when an interactive command is terminated with `\G` instead of a semicolon. The command-line option for this format is `-E` or `--vertical`.

I usually select results in non-tabular format and feed them to `awk` to turn them into HTML. Here is a quick one-liner that will format the first two columns:

`echo "select ..." | mysql | sed -e 's/\|//g' | awk '{a++; if(a<2){print "<tr><th>" $1 "</th><th>" $2 "</th></tr>";} else { print "<tr><td>" $1 "</td><td>" $2 "</td></tr>"; }}'`

The result is formatted into HTML rows and columns, and all I need to do is wrap it in a set of `<table>` tags.

I sometimes use Perl, too. Here's a script I've saved in my `PATH` so I can pipe results into it:

<pre>#!/usr/bin/perl
use strict;
use warnings;

LINE:
while (my $line = &lt;STDIN&gt;) {
    next LINE if $line =~ m/^\+/;
    chomp $line;
    if ($line =~ m/^\|/) {
        $line =~ s#^\| | \|$##g;
        chomp $line;
        print "&lt;tr&gt;&lt;td&gt;"
            . join("&lt;/td&gt;&lt;td&gt;", split(/(?&lt;=\S)\s+\|\s+(?=\S)/, $line))
            . "&lt;/td&gt;&lt;/tr&gt;\n";
    }
    else {
        print "&lt;tr&gt;&lt;td&gt;"
            . join("&lt;/td&gt;&lt;td&gt;", split(/\t/, $line))
            . "&lt;/td&gt;&lt;/tr&gt;\n";
    }
}</pre>

**Update** Looks like the MySQL folks already did this work for me, duh. The `-H` option outputs HTML for query results.

 *[HTML]: Hypertext Markup Language
 *[STDOUT]: Standard output
 *[STDIN]: Standard input
