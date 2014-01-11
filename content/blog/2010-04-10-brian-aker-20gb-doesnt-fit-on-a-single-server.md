---
title: "Brian Aker: 20GB doesn't fit on a single server"
date: "2010-04-10"
permalink: /2010/04/10/brian-aker-20gb-doesnt-fit-on-a-single-server/
categories:
  - Commentary
  - Databases
---
[Brian][1] got [interviewed by O'Relly][2] recently, and part of it quoted him as saying this:

> When everything doesn't fit onto a computer, you have to be able to migrate data to multiple nodes. You need some sort of scaling solution there&#8230; MapReduce works as a solution when your queries are operating over a lot of data; Google sizes of data. Few companies have Google-sized datasets though. The average sites you see, they're 10-20 gigs of data.

Users shouldn't need to put that data onto multiple machines anyway. In fact, I don't think we need a multi-machine solution for the common case at all. We need software that can scale up with today's hardware. 37signals likes to run boxes with half a terabyte of RAM. Are we there yet with MySQL and InnoDB? No. Postgres? No. Anything open-source? Not that I know of. We've got database software that can only do a fraction of what it **should** be able to on that size of server.

I think we have to be clear about the use case for a solution that partitions data across multiple machines. It isn't 20GB of data, and in my opinion it **shouldn't** even be half a terabyte. I think that in the ideal world, we **should** be thinking about that for terabytes and larger &#8212; and in a few years, single-server datasets **should** be even larger.

I say **should** because today's database software obviously has a lot of catching up to do.

 [1]: http://tangent.org/
 [2]: http://radar.oreilly.com/2010/04/a-mysql-update-from-brian-aker.html
