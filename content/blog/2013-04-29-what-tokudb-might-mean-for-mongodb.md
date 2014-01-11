---
title: What TokuDB might mean for MongoDB
date: "2013-04-29"
permalink: /2013/04/29/what-tokudb-might-mean-for-mongodb/
categories:
  - Databases
---
Last week [Tokutek][1] [announced][2] that they're open-sourcing their TokuDB storage engine for MySQL. If you're not familiar with TokuDB, it's an ACID-compliant storage engine with a high-performance index technology known as fractal tree indexing. Fractal trees have a number of nice characteristics, but perhaps the most interesting is that they deliver consistently high performance under varying conditions, such as when data grows much larger than memory or is updated frequently. B-tree indexes tend to get fragmented over time, and exhibit a performance cliff when data doesn't fit in memory anymore.

The MySQL community is excited about having access to TokuDB's source code, and rightly so. TokuDB is, broadly speaking, aimed at the same category of use cases as Oracle's InnoDB, which has been MySQL's leading storage engine for a long time.

MySQL's market size is large for an opensource product (roughly $500M to $1B USD, depending on who you talk to), and in a big pond, a stone causes wide ripples. I think the most significant implications, though, are for MongoDB. Tokutek has published a series of [benchmarks of MongoDB performance with TokuDB][3] as the storage engine instead of MongoDB's default storage engine. The results are compelling.

I think TokuDB will rapidly become the storage engine of choice for MongoDB, and could catapult MongoDB into the lead in the NoSQL database arena. This would have profound implications for opensource databases of all flavors, not just NoSQL databases.

It's worth revisiting a bit of ancient history for some context.

Way back in the olden days, MySQL's main storage engine was MyISAM. MyISAM is non-transactional and has table-level locking, meaning that a write (update, insert, delete, or similar) blocked all concurrent access to the table. This is okay for some uses, and can even be very good in special cases, but in the general case it is a disaster. MyISAM introduced some special workarounds for common cases (such as permitting nonblocking inserts to occur at the end of the table), but in the end, you can't fix table-level locking. A mixed workload needs storage that's designed for high read and write concurrency without blocking.

MyISAM had other problems, such as lacking transactions, being prone to data corruption, and long repair times after a crash.

As a result, MySQL as a whole was only interesting to a minority of users. For demanding applications it was little more than a curiosity.

Then came InnoDB. InnoDB introduced ACID transactions, automatic crash recovery, and most importantly, row-based locking and MVCC, which allowed highly concurrent access to rows, so readers and writers don't block each other. InnoDB was the magic that made MySQL a credible choice for a wide range of use cases.

Most of the interesting chapters in MySQL's history have involved InnoDB in one way or another. To list some highlights: Oracle bought InnoDB's creator Innobase Oy, MySQL scrambled to find a replacement (Maria, Falcon, PBXT), Sun's decision to acquire MySQL was said to be influenced by Falcon, Percona created XtraDB, and Oracle acquired Sun. Things are settling down now, but it's easy to forget how much of a soap opera the MySQL world has lived through because of InnoDB not being owned by MySQL.

And in the middle of all this came NoSQL databases. In the past half-dozen years, more databases have been invented, popularized, and forgotten than I care to think about. In many cases, though, these databases were criticized as ignoring or reinventing (badly) decades of learning in relational database technology, and even computer science in general. I know I've looked at my share of face-palm code.

Databases, by and large, depend on reliable, high-performance storage and retrieval subsystems more than anything else. Many of the NoSQL databases have interesting ideas built on top of bad, bad, bad storage code.

MongoDB is a case in point. MongoDB reinvented some of the worst parts of MySQL all over again. Storage was initially little more than mmap over a file. I think Mark Callaghan put it best in 2009, when he said "Reinventing MyISAM is not a feature." MongoDB's storage at that time really was MyISAM-like. It's improved somewhat since then, but it hasn't had the wholesale rip-and-replace improvement that I think is needed. Not only that, but MongoDB as a whole is still (predictably) built around the limitations of the underlying storage, with coarse-grained locking.

But MongoDB, like MySQL, has been relevant in spite of these shortcomings. Form your own opinion about why this is, but from my point of view there are two main reasons:

*   MongoDB was born in an era when the popular databases were frustratingly slow and clunky to work with, and innovation was stalled due to the political drama surrounding them.
*   MongoDB simply feels nice to developers. If you're not a developer, this is a little hard to explain, but it just feels good, like your favorite pair of jeans. Like a hug from a good friend. Like a hammock and a summer day. The difference between an SQL database and MongoDB for many developers is like the difference between an iPod and a cheap knockoff MP3 player. I could go on and on.

It's difficult to overstate the importance of this, because it means that MongoDB may well become an enterprise database, despite what bad opinions you may have about it now. Why is this? It's because developers are king in the modern IT enterprise. Developers determine what technologies get adopted in IT. CTOs like to think the decisions come from the top down, but I've seen it work the other way time and time again. Developers start to use something that frustrates them less than the alternatives, and a groundswell begins that's impossible to stop. Someday the CTO discovers that the question of whether to use technology X was decided by a junior developer long ago and deployed to production, and now it's too late.

I've done it myself. At Crutchfield I hijacked the company-wide policy that migration from legacy VB6 to .NET would proceed along the lines of a transition to VB.NET. I was fighting through awful code day in and day out, and I knew that a more restrictive language would prevent a lot of bad practices. So I wrote several major systems in C# without asking permission. It's a lot easier to get forgiveness than permission. Then I showed off what I'd done. When I left Crutchfield, the IT department had chosen C#, not VB.NET, as its language of the future (even though there were, and probably still are, major VB.NET applications).

Similarly, at Crutchfield I was provided a 15-inch CRT monitor to work on. This was 2003, you understand. Even at that time, it was awful. How can you expect a developer to work on a flickering, small monitor? I bought my own large-screen LCD and put it in my cubicle. Management ordered me to remove it because it was causing a flood of "hey, how did Baron get a nice monitor?" questions, but the camel already had a nose under the tent. I took my monitor home, but not too long after that we all started to get nicer monitors. I brought my own nice chair to work, too. All told I probably forced Crutchfield to spend thousands of dollars upgrading equipment. You have to be careful about headstrong kids like me &#8212; don't turn your backs on us for a moment.

This story illustrates why MongoDB is likely to become a major database: because developers enjoy working with it. It feels pleasant and elegant. Remember, most technology decisions are based on how people feel, not on facts. We're not rational beings, so don't expect the best solution to win. Expect people to choose what makes them happy.

And with the availability of TokuDB, MongoDB is lovable by a lot more people. With reliable storage and transactions, uncool kids can like it too.

It goes further than just the storage engine. The kernel of MongoDB has code that needs to be fixed, such as the coarse-grained locking code. Tokutek basically forked MongoDB in order to insert TokuDB into it. They had to, in order to get all that locking out of the way and allow MongoDB to shine with TokuDB on the backend.

I'm not sure exactly how this will play out &#8212; will Tokutek start offering a competitive product? Will there be opensource community-based forks of MongoDB that integrate TokuDB? Will 10gen do the engineering to offer TokuDB as a backend? Will 10gen and Tokutek partner to do the engineering and provide support? Will 10gen acquire Tokutek? Will a large company acquire both? You decide.

But I believe that a few things are inevitable, and don't require a crystal ball to guess.

Anyone who cares about MongoDB is going to be using TokuDB as their storage backend within a matter of months. It's happened before &#8212; look at what happened to MySQL and InnoDB. Look at Riak; people dropped Bitcask like a hot potato when LevelDB storage arrived (although it hasn't been a perfect solution).

Just to be clear, I do not think that MongoDB's parallels with MySQL's history must inevitably repeat in all aspects of the story. The world of databases today (big data, cloud, mobile) is not in the same situation it was when MySQL was creeping into general awareness (web, gaming, social, general lack of good alternatives to commercial databases), and the reasons people use MongoDB now are different from the reasons people chose MySQL back in the day. Still, there's a good chance that MySQL's past can teach us about MongoDB's future, and for some use cases, MongoDB deployments will soon accelerate rapidly. I expect a larger commercial ecosystem to emerge, too; right now the MongoDB market is worth tens of millions, and I'd guess in a few years we'll look back and see a sharp inflection point in 2013 and 2014. TokuDB could help propel MongoDB's market size into hundreds of millions of dollars, which is a position occupied uniquely by MySQL today in the opensource database world.

[It's getting real][4] in the MongoDB world &#8212; this is going to be interesting to watch.

 [1]: http://www.tokutek.com/
 [2]: http://www.tokutek.com/2013/04/announcing-tokudb-v7-open-source-and-more/
 [3]: http://www.tokutek.com/tag/mongodb/
 [4]: http://www.youtube.com/watch?v=2UFc1pr2yUU
