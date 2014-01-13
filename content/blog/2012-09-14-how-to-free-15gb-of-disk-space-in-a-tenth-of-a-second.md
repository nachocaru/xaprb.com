---
title: How to free 15GB of disk space in a tenth of a second
date: "2012-09-14"
permalink: /blog/2012/09/14/how-to-free-15gb-of-disk-space-in-a-tenth-of-a-second/
categories:
  - Databases
---
One of the MySQL servers I help manage was encountering some problems with a full data directory. It was a bit mysterious, because we couldn't find any files to account for the increased usage. Here are some things we checked:

1.  A recursive `ls -l` didn't show any more, or larger, files than usual.
2.  Using `lsof` and looking at the SIZE column didn't either.
3.  There were not enough temporary files or tables open (as shown by `lsof`) to account for the disk space.

Oddly, someone discovered that FLUSH TABLES would drop disk usage by about 15GB in a fraction of a second, allowing the server to continue running without problems.

I carefully measured all of the items in the above list before and after FLUSH TABLES. No doubt about it: no files went away, no files shrank, yet `df` and `du` showed the difference in the space free and space used in the data directory. The changes were isolated to an 'archive' database that contains old archived-off data in MyISAM-only tables. Archiving jobs add rows to these tables on an ongoing basis.

I decided to use `du` to measure the disk usage of each file individually, and got results. Hundreds of MyISAM data and index files showed disk usage differences before and after the FLUSH TABLES. All together, these differences added up to the free space difference observed. Here's a small sample of before-and-after:

    < 131076        /var/lib/mysql/data/archive/tbl1#P#cl638.MYI
    < 131076        /var/lib/mysql/data/archive/tbl2#P#cl34.MYI
    < 131076        /var/lib/mysql/data/archive/tbl3#P#cl636.MYI
    ---
    > 2652  /var/lib/mysql/data/archive/tbl1#P#cl638.MYI
    > 4024  /var/lib/mysql/data/archive/tbl2#P#cl34.MYI
    > 8920  /var/lib/mysql/data/archive/tbl3#P#cl636.MYI

This puzzled me a little bit. I tried to decide: is this a kernel bug? XFS bug? MyISAM bug? LVM bug? Known behavior, not-a-bug?

Then I noticed the "before" size seemed to be in some pretty consistent ranges. The samples above show file sizes of 128MB, and there were many more examples of that. Suspicious. On a hunch, I checked the mount options:

<pre>
/dev/mapper/shardvg-mysql on /var/lib/mysql type xfs (rw,noatime,allocsize=128M)
</pre>

A quick read of the `allocsize `mount option explains it. The space is preallocated for buffered I/O. InnoDB is not using buffered I/O, so the `.ibd` files don't show this behavior. I think this allocation size might be excessive, and I don't know why it was chosen, but at least now the problem is clear, and I can see a couple options for solving it.
