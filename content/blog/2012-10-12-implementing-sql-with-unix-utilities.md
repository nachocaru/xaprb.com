---
title: Implementing SQL with Unix utilities
date: "2012-10-12"
url: /blog/2012/10/12/implementing-sql-with-unix-utilities/
categories:
  - Databases
---

As I've become a better shell programmer over the last year or two, I've been surprised to discover some tools I didn't know about. It eventually dawned on me, as I did more and more brute-force processing of large datasets, as well as some of the more delicate things that went into Aspersa -> Percona Toolkit, that many tasks I used to do with SQL and spreadsheets can be accomplished easily with well-structured text files and Unix utilities. And they don't require loading data into a database or spreadsheet (the latter of which almost always performs terribly).



To give an idea, here are some of the relational operations (in SQL speak) you can perform:



1.  **SELECT col1, col2&#8230;** can be implemented with several variants of Unix utilities: `cut` and `awk` are the two most obvious. I tend to use `awk` only when needed, or when it's more convenient to combine operations into a single tool.

2.  **JOIN** can be implemented with the&#8230; wait for it&#8230; `join` utility. You'll need to `sort` its input first, though.

3.  Many **GROUP BY** operations can be performed with combinations of `grep -c`, `sort` with or without the `-urnk` options (look at the man page -- you can apply options to individual sort keys), and `uniq` with or without the `-c` option. Many more can be done with 20 or 30 characters of `awk`. 

    *   Output formatting is easy with `column`, especially with the `-t` option.</ol> 

    In addition to the above, Bash's subshell input operator syntaxes can help avoid a lot of temporary files. For example, if you want to join two unsorted files, you can do it like this:

    

    <pre>$ join <(sort file1) <(sort file2)</pre>


    That's kind of an overview -- I end up hacking together a bunch of things, and I'm sure I'm forgetting something. But pipe-and-filter programming with whitespace-delimited files is generally a much more powerful (and performant) paradigm than I realized a few years ago, and that's the point I wanted to share overall.

    

    As a concrete example, I remember a mailing list thread that began with "I have a 500GB file of 600 billion strings, max length 2000 characters, unsorted, non-unique, and I need a list of the unique strings." Suggestions included Hadoop, custom programs, Gearman, more Hadoop, and so on -- and the ultimate solution was `sort -u` and `sort --merge`, trivially parallelized with Bash. (By the way, an easy way to parallelize things is [`xargs -P`][1].) 

    What are your favorite "low-level" power programming techniques?



 [1]: http://www.xaprb.com/blog/2009/05/01/an-easy-way-to-run-many-tasks-in-parallel/

