---
title: A shell for a new Perl MySQL program
date: "2006-12-28"
permalink: /blog/2006/12/28/a-shell-for-a-new-perl-mysql-program/
categories:
  - Databases
---

Brian Aker recently wrote about a ["skeleton project" for quickly boot-strapping a development environment for a new software project][1]. I do something similar for Perl programs that I want to connect to MySQL.

Brian's skeleton project is different from mine. Mine is just a skeleton for a Perl script, not an entire software project. But perhaps you'll find it useful anyway.

The code included in the file takes care of getting all the info you need to connect to a MySQL instance. By default, it starts by opening and reading your .my.cnf file if it exists. If it can't find that, it asks you for any missing information (username, password, etc). There's a section for generating a command-line help output, and a section where you can add more command-line options easily. And finally, it actually opens a DBI connection to a MySQL instance, in case you can't remember the syntax (I never can).

I haven't fully commented what it does, but if you're familiar with Perl it ought to be pretty self-evident. Let me know if I need to clarify anything. Enjoy!

 [1]: http://krow.livejournal.com/465978.html
