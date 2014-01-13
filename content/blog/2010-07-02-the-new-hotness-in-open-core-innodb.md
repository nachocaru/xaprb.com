---
title: "The new hotness in open-core: InnoDB"
date: "2010-07-02"
url: /blog/2010/07/02/the-new-hotness-in-open-core-innodb/
categories:
  - Commentary
  - Databases
  - MySQL
  - Open Source
---
There's lots of buzz lately about the so-called ["open-core" business model of Marten Mickos's new employer][1]. But this is nothing new. Depending on how you define it, InnoDB is "open-core," and has been for a long time. The InnoDB Hot Backup (ibbackup) tool was always closed-source. Did anyone ever cry foul and claim that this made InnoDB itself not open-source, or accuse Innobase / Oracle of masquerading as open-source? I don't recall that happening, although sometimes people got suspicious about [the interplay between the backup tool and the storage engine][2]. Generally, though, the people I know who use InnoDB Hot Backup have no gripes about paying for it.

What is the difference between open-source with closed-source accessories, and crippleware? I think it depends on how people define the core functionality of software. Some might say that backup is core functionality for a database; and others would point to mysqldump and say that InnoDB isn't crippleware as long as there is *some* alternative.

I think InnoDB is an interesting case that illustrates what can happen when commercial and GPL play together. Part of that story is [the appearance of XtraBackup][3], an open-source competitor to InnoDB Hot Backup. Everyone's subject to the rules of the game, unless they restrict the "core," which would make it non-open-source to begin with.

 [1]: http://www.computerworlduk.com/community/blogs/index.cfm?entryid=3048&#038;blogid=41
 [2]: http://mituzas.lt/2010/05/08/on-hot-backups/
 [3]: http://www.mysqlperformanceblog.com/2009/02/24/xtrabackup-open-source-alternative-for-innodb-hot-backup-call-for-ideas/
