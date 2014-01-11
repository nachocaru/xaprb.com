---
title: A progress report on MySQL Table Sync
permalink: /2007/04/02/a-progress-report-on-mysql-table-sync/
description:
  - >
    A progress report on the mysql-table-sync tool, which efficiently compares two
    MySQL tables on different servers, finds differences in the data and resolves
    them.
---
I wrote an article late last week about [benchmark results for the two table-synchronization algorithms][1] I've been implementing for the [MySQL Table Sync][2] tool. I've spent some time developing a test suite for the tool, and learned some really interesting things about the general problem of synchronizing tables.

### Progress on MySQL Table Sync

My test suite caught some great bugs, but not as many as I'd expected, which is a great feeling. I haven't yet packaged the fixes up and released them to Sourceforge, by the way, so my earlier comment &#8212; "I consider this tool unsuitable for production use" &#8212; still holds. (You can grab the code from Subversion if you wish).

The biggest bug was an error in my log-base-two arithmetic in the bottom-up sync algorithm. It's the kind of thing that stares me in the face and I don't see it until I have a nice test suite. I also found that I was doing drilldowns in the wrong order in the top-down algorithm.

I've added some features and documentation, too. This tool is getting pretty complex, and I want to give good guidance on how to use it.

### A tough problem

I discovered there are lots of subtleties to finding and resolving differences between tables, which the literature had not prepared me for (probably because previous efforts weren't trying to cover all the cases I am). One interesting problem I found was comparing tables with characters Perl doesn't sort the same way as MySQL.

This is an issue because the tool does not fetch both tables into memory and examine them there. That would be a disaster on large data sets. Instead, it uses a merge algorithm to work with just one row at a time from each table. It basically gets a forward-only cursor into the tables. Working with one row at a time is not how I'm used to dealing with relational data, so I had to think creatively and ask for help.

The solution &#8212; and I think this is the only way to do this &#8212; is to ask MySQL to compare character data when I'm not confident Perl will sort it the same way MySQL will. The `STRCMP()` function, along with careful use of charsets and collations, is the key. This adds a small bit of extra network traffic in some cases, but I was able to optimize this to only do calls to MySQL when really needed. The number of extra calls should be very small for normal cases.

The tool will now (as of the latest trunk code) work very well on every test case I've been able to generate. This is not completely solved for earlier versions of MySQL, and I still have a TODO or three in the code, but I have generated thousands of random tables, filled them with random data, messed with the data in random ways, and run the sync tool against them &#8212; and it syncs them every time.

### Another interesting problem

There are cases where there is literally no way to update rows whose non-primary key columns have changed. Consider the following example:

<pre>create table test1(
  a int not null primary key,
  b int not null, unique key(b)
);
insert into test1(a,b) values(1,1),(2,2);

create table test2 like test1;
insert into test2(a,b) values(1,2),(2,1);

select * from test1;
+---+---+
| a | b |
+---+---+
| 1 | 1 | 
| 2 | 2 | 
+---+---+

select * from test2;
+---+---+
| a | b |
+---+---+
| 1 | 2 | 
| 2 | 1 | 
+---+---+</pre>

Notice that column `b` has a unique key on it. Now let's run the sync tool against these two tables, and ask it to print out the queries it would issue to sync the tables:

<pre>$ mysql-table-sync -1 test1 test2 -p
UPDATE `test2` SET `b`='1' WHERE `a` = '1';
UPDATE `test2` SET `b`='2' WHERE `a` = '2';</pre>

It found that the two rows have the same primary key in each table, so of course they must be the same row &#8212; it's just that their `b` value has changed. The rows must therefore be updated, right? Let's try again and tell it to execute the queries to sync the table this time:

<pre>$ mysql-table-sync -1 test1 test2 -x
DBD::mysql::db do failed: Duplicate entry '1' for key 2 at mysql-table-sync line 1028.</pre>

This table cannot be synced with straightforward `UPDATE` statements. I see three ways to do it:

1.  update one row to another value, fix the second row, then fix the first row again.
2.  delete one row and update the other, then re-insert the first.
3.  delete both rows and then re-insert the correct data.

The third technique is the only feasible one to do programmatically. I've added such a feature to the tool, and it will now handle these two tables correctly:

<pre>$ mysql-table-sync test1 test2 -p --deleteinsert
DELETE FROM `test2` WHERE `a` = '1';
DELETE FROM `test2` WHERE `a` = '2';
INSERT INTO `test2`(`a`,`b`) VALUES('1','1');
INSERT INTO `test2`(`a`,`b`) VALUES('2','2');</pre>

The neat thing is, it only required a couple lines of code to change. That's always a good feeling.

### General MySQL Toolkit news

There is much more to do. If you want to help, it would be great to have a volunteer webmaster for the project, among other things.

In other unrelated news, I noticed this project has been in Sourceforge's top 1000 for a while now, hovering in the 800 and 900 range. I'm kind of surprised &#8212; Sourceforge has hundreds of thousands of projects. I expect this is somewhat inflated by the fact that I have so far not released the tools in one package, so the download numbers may be a bit higher than they'd otherwise be.

 [1]: /blog/2007/03/30/comparison-of-table-sync-algorithms/
 [2]: http://code.google.com/p/maatkit
