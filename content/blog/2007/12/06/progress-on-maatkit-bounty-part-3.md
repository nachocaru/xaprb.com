---
title: Progress on Maatkit bounty, part 3
date: "2007-12-06"
url: /blog/2007/12/06/progress-on-maatkit-bounty-part-3/
categories:
  - Databases
  - Open Source
---
This is the last day I'm taking off work to hack on mk-table-sync, and I thought it was time for (yet another) progress report. Here's what I have done so far:

*   All the code, except for a tiny bit of "glue" and "setup" code, is in modules.
*   Lots more tests for the modules.
*   A new sync algorithm (I still haven't rewritten the top-down and bottom-up, which are designed for network efficiency more than MySQL efficiency, and are very complicated). This algorithm is called "Chunk" and is based on the chunking module I'm re-using from two of the other tools. This allows syncing the table a bit at a time to avoid locking it so much.
*   The tool chooses its own parameters, including choosing the sync algorithm automatically by examining indexes.
*   Proper exit codes, as well as several other smaller issues requested via bug reports.
*   The tool now syncs entire servers. That is, you don't have to specify a table. It'll find all the tables and just sync them.
*   The tool can sync many servers. You give it five servers, it will treat the first as the source, and sync every table in the source to each of the four remaining servers in turn.
*   It can work via replication. It can discover a master's slaves via SHOW SLAVE HOSTS and sync each slave to the master. You can also point it at a slave and it'll discover the master, connect to it, and sync the slave to the master.
*   It integrates with mk-table-checksum's results. If you've given the &#8211;replicate option to mk-table-checksum, the slave's results are stored in a table. It can read that table and sync anything marked as different. This can be combined with sync-to-master and auto-discover-slaves functionality.
*   Lots of other bugs and problems are gone simply because I'm using the modules I wrote for other tools. This includes issues with table parsing, identifier quoting, etc etc. As an aside, I have to roll my own for almost everything, because I can't rely on things like DBI's `quote_identifier()` function -- it does not work in earlier versions, which are amazingly common in the real world.

Whew! So what isn't done yet?

*   Bi-directional syncing.
*   The Nibble sync algorithm. It will be preferred over Chunk and can be used in more cases.
*   Documentation.
*   Full support for wide characters. (This is non-trivial in Perl. I need to research it. A partial solution might not be hard, but I'm worried about the versions included in, for example, RHEL 3, which is very widely used.)
*   Updating other tools to work right with the changes to shared code.
*   Locking and transaction code. The tool will ultimately use FOR UPDATE/LOCK IN SHARE MODE automatically on InnoDB tables instead of locking them, for example.

Here's a sample of what it can do, using a replication sandbox I set up with Giuseppe's [MySQL Sandbox][1]. The sandbox contains a copy of the Sakila sample database. I'll just mangle a few films on the slaves:

<pre>baron@kanga:~$ cd rsandbox_5_0_45/
baron@kanga:~/rsandbox_5_0_45$ ./s1
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 6
Server version: 5.0.45-log MySQL Community Server (GPL)

Type 'help;' or '\h' for help. Type '\c' to clear the buffer.

slave1 [localhost] {msandbox} ((none)) &gt; update sakila.film set title='academy dinosaur2' limit 12;
Query OK, 12 rows affected, 12 warnings (0.07 sec)
Rows matched: 12  Changed: 12  Warnings: 0

slave1 [localhost] {msandbox} ((none)) &gt; Bye
baron@kanga:~/rsandbox_5_0_45$ ./s2
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 6
Server version: 5.0.45-log MySQL Community Server (GPL)

Type 'help;' or '\h' for help. Type '\c' to clear the buffer.

slave2 [localhost] {msandbox} ((none)) &gt; update sakila.film set title='academy dinosaur2' limit 1;
Query OK, 1 row affected, 1 warning (0.05 sec)
Rows matched: 1  Changed: 1  Warnings: 0

slave2 [localhost] {msandbox} ((none)) &gt; Bye</pre>

OK, now I've messed up the first 12 films on one slave, and the first 1 on another. I could just go ahead and sync them right away, but first I'll do a table checksum to demonstrate that functionality:

<pre>baron@kanga:~/rsandbox_5_0_45$ mk-table-checksum --replicate=test.checksum --port=16045 127.0.0.1 -q
</pre>

And now I'll tell the sync tool to go fix the differences the checksum revealed:

<pre>baron@kanga:~/rsandbox_5_0_45$ mk-table-sync  --replicate=test.checksum h=127.0.0.1,P=16045 -vx
# Syncing P=16046,h=127.0.0.1
# DELETE INSERT UPDATE ALGORITHM DATABASE.TABLE
#      0      0     12 Chunk     sakila.film
#      0      0      0 Chunk     sakila.film_text
# Syncing P=16047,h=127.0.0.1
# DELETE INSERT UPDATE ALGORITHM DATABASE.TABLE
#      0      0      0 Chunk     sakila.film
#      0      0      0 Chunk     sakila.film_text
baron@kanga:~/rsandbox_5_0_45$ 
</pre>

Pretty easy, huh? Take a look at the output: the first thing it did was fix the 12 films I changed. `sakila.film` has a trigger that updates `sakila.film_text`, so that table got changed too. The checksum tool caught this difference, but the differences were gone by the time the sync tool examined them, again due to the trigger. On the second slave, no differences were found at all, because the changes to the first slave were made on the master, automatically fixing the second slave. (This won't always be the case, but it worked in this example).

While I'd love to continue building the perfect beast, I'm going to have to call it quits around noon today and start cleaning up, writing the documentation, and getting ready to release the code. I'm not sure how much I'll finish in that time.

By the way, anyone who wants to is welcome to get the code from the [Maatkit][2] SVN repository! I never make a big deal out of that because I generally assume people want to run released code, but SVN is there if you want it...

 [1]: http://sourceforge.net/projects/mysql-sandbox
 [2]: http://code.google.com/p/maatkit/
