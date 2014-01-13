---
title: Hindsight on a scalable replacement for InnoDB
date: "2009-05-09"
url: /blog/2009/05/09/hindsight-on-a-scalable-replacement-for-innodb/
categories:
  - Databases
---
A while ago I posted about a [comment a Sun performance engineer made about a scalable replacement for InnoDB][1]. At the time, I did not believe it referred to Falcon. In hindsight, it seems even clearer that [the Sun performance experts were already working hard on InnoDB itself][2].

Sun's engineers have shown that they can produce great results when they really take the problems seriously. And I'm sure that InnoDB's performance has untapped potential we don't see right now. However, it does not follow that their work on InnoDB is what was meant by a scalable replacement for InnoDB. Or does it?

General-purpose MVCC transactional storage engines with row-level locking, whatever their performance and scaling characteristics in edge cases, fall into a category together. A person assembling a MySQL server for general-purpose use might choose a different storage engine for various uses -- MyISAM here, Memory there&#8230; and use "one of those transactional engines" for the bulk of the work. PBXT, InnoDB, Falcon -- I don't see a justification for running more than one of those side by side. The operational costs alone (backups, training the users, etc) would be too high. It is also not at all clear that MySQL itself is ready for multiple transactional storage engines working together (e.g. cross-engine transactions) in the real world.

So what's left for Falcon? I think they are [asking themselves the same question][3] (brilliant gallows humor, by the way). I think Falcon's ideas and techniques are very interesting, but a storage engine -- especially one with such lofty goals -- is always a show-me undertaking that will require years to mature and prove itself even after the code is "ready." With or without the Oracle acquisition, this question has loomed for years: where's the justification for Falcon politically, functionally, economically? A third party engine such as PBXT, with eyes on replication at the storage engine level and other add-on functionality, has always seemed more likely to really add value than a straight-up InnoDB replacement.

But from my point of view, the biggest win in the short term would still be to drive InnoDB development forward at a consistent and accelerating pace to meet the needs of users and the advances in hardware. Of course, that's what XtraDB set out to do, and I think the XtraDB project has helped snap InnoDB out of their Percheron-like plod towards improvement. This is nothing but good; when it comes to competition among storage engines, no one should be resting on their laurels. I also see that [Sun's team has more good things in the works][4], which is great. I'd love for InnoDB to stop being a work horse and start being a quarter horse. We need it to be both scalable *and* high-performance.

 [1]: http://www.xaprb.com/blog/2009/01/13/what-is-the-scalable-replacement-for-innodb/
 [2]: http://dimitrik.free.fr/db_STRESS_MySQL_540_and_others_Apr2009.html
 [3]: http://carotid.blogspot.com/2009_04_01_archive.html#8499683187188909543
 [4]: http://blogs.sun.com/dlutz/entry/concurrent_commit_revisited
