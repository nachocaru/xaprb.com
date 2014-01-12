---
title: Introducing MySQL Parallel Dump
date: "2007-09-30"
permalink: /2007/09/30/introducing-mysql-parallel-dump/
categories:
  - Databases
---
A while ago [Peter Zaitsev wrote about his wishes for mysqldump][1]. These included multi-threaded dumps and "safe" dumps that would wait for a server to restart if it crashed, then keep dumping other tables. I've had sketches of this done for a while, but during this week I fleshed it out while writing about [backup and recovery for our upcoming book][2]. I had my own list of features I wanted to add:

*   Support for backup sets, with the backup configuration stored in the database itself.
*   Emphasis on tab-delimited dumps.
*   Sane defaults, focused on ease of use and ease of recovery.
*   Support for compression by default.

The resulting script is satisfactory to me. If you just run it without arguments, it connects to the server mentioned in your .my.cnf file and dumps all databases and tables, one file per table, gzipped, in parallel (at least two, but by default it detects the number of CPUs and runs that many in parallel).

<pre>baron@kanga $ mysql-parallel-dump
SET     DATABASE TABLE                      TIME STATUS THREADS
default mysql    columns_priv                  0      0       2
default mysql    db                            0      0       2
default mysql    help_category                 0      0       2
default mysql    func                          0      0       2
default mysql    help_keyword                  0      0       2
...snip...
default test     t1                            0      0       2
default test     t2                            0      0       1</pre>

You can tell it to dump elsewhere, and it's easy to dump all tables in tab-delimited format. Here it's reading its configuration from the database, writing to /tmp, and not backing up tables that have been dumped in the last 5 minutes:

<pre>baron@kanga $ mysql-parallel-dump --basedir /tmp --tab --sets set1 \
    --settable test.backupset --age 5m
Nothing to do for set set1
baron@kanga $ ls -lR /tmp/set1
/tmp/set1:
total 8
-rw-rw-rw- 1 baron baron   40 2007-09-30 21:43 00_master_data.sql
drwxrwxrwx 2 baron baron 4096 2007-09-30 21:43 test

/tmp/set1/test:
total 16
-rw-rw-rw- 1 baron baron 549 2007-09-30 21:43 t1.sql.gz
-rw-rw-rw- 1 baron baron  31 2007-09-30 21:43 t1.txt.gz
-rw-rw-rw- 1 baron baron 550 2007-09-30 21:43 t2.sql.gz
-rw-rw-rw- 1 baron baron  29 2007-09-30 21:43 t2.txt.gz</pre>

And as you can see, it knows I've dumped those tables recently and didn't do them again. Pretty handy for scheduling and resuming backups, no? It makes it easy to keep going if something happens in the middle of the backup and you want to restart.

I'm aware of the similar [mysqlpdump][3] script, and I generally don't like duplicating other people's efforts, but I decided to go ahead and finish what I'd started. To tell you the truth, neither script is complicated. It's just a matter of providing a sensible wrapper around existing functionality (in my case, that's mysqldump and SELECT INTO OUTFILE, which I do directly rather than asking mysqldump to do it with -T, which just makes mysqldump into the same kind of wrapper). I also wanted to provide it as part of the MySQL Toolkit, so it's all in the same place. Frankly, I also built in a lot more functionality than mysqlpdump has, and I consider the defaults to be more useful. I'd love for mysqldump itself to have better defaults &#8212; especially for dumping large datasets, which it's frankly pretty poor at right now. One of these days MySQL AB will make me obsolete, I just know it&#8230;

Oh, and in keeping with my tradition, it's sort of ridiculously sophisticated and overly generic. It has a little macro language that you can use to basically turn it into a loop iterator over the selected databases and tables, and run any command you wish. Here's an example:

<pre>mysql-parallel-dump -- mysqldump --skip-lock-tables '%D' '%N' \| gzip --fast -c - \> '%D.%N.gz'</pre>

That basically duplicates the built-in defaults (except the defaults are actually a lot more complicated than that). But it illustrates how you could use this as a shell to select which tables to dump and fork off sub-processes, handling all the locking, error checking, and so forth for them. Here I'm spawning off mysqldump, but it would be just as easy to execute a custom script.

There's one more wish Peter and I both have, but which is impossible for right now as far as we know. That's to do parallel SELECT INTO OUTFILE dumps for a bunch of tables in one transaction. This will not be possible until more than one connection can participate in a single transaction. Ask the MySQL guys about that one!

This script is part of MySQL Toolkit and will be released as soon as I have time. There are a few other bug fixes I want to include. In the meantime, if you're dying to get it, you can grab it from the [MySQL Toolkit][4] subversion repository.

 [1]: http://www.mysqlperformanceblog.com/2007/05/22/wishes-for-mysqldump/
 [2]: http://www.xaprb.com/blog/2007/09/19/high-performance-mysql-second-edition-backup-and-recovery/
 [3]: http://www.fr3nd.net/projects/mysqlpdump/
 [4]: http://code.google.com/p/maatkit/
