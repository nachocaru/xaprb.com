---
title: "High Performance MySQL, Second Edition: Backup and Recovery"
date: "2007-09-19"
url: /blog/2007/09/19/high-performance-mysql-second-edition-backup-and-recovery/
categories:
  - Databases
---
Progress on High Performance MySQL, Second Edition is coming along nicely. You have probably noticed the lack of epic multi-part articles on this blog lately -- that's because I'm spending most of my spare time on the book. At this point, we have significant work done on some of the hardest chapters, like Schema Optimization and Query Optimization. I've been deep in the guts of those hard optimization chapters for a while now, so I decided to venture into lighter territory: Backup and Recovery, which is one of the few chapters we planned to "revise and expand" from the first edition, rather than completely writing from scratch.

Since we decided to take that approach, I began by following the outline from the first edition, and figured I'd re-read the first edition's chapter and re-outline, then add more material as appropriate. To my surprise, I found this chapter in the first edition is one of the most cursory (I don't mean to criticize too much -- you'll see where I'm going with this in a second). It's quite short and doesn't really discuss recovery at all, despite the chapter title. There's one sub-section titled "Recovery," but it's only a few paragraphs, and mostly discusses *dumping*, not recovery! [**Edit**: whoops, I see each subsection in the "Tools and Techniques" has a few words about how to restore backups created with that specific tool. But there's still not much general advice about how to restore backups.]

The chapter devotes a lot of space to code listings and such, and not enough on how to do high-performance backups in a high-performance application, in my opinion. I quickly decided it needs to be *significantly* expanded, not just updated, and I scrapped the original text and became more liberal with the outline. I'm referring to the first edition as I write, but I'm not keeping any of the text. Chalk it up to perfectionism.

The outline, as I have it so far, is as follows. If you compare it to the first edition, you'll see I've rearranged it quite a bit:

<pre>1  Why Backups?
   (very brief, even more so than the first edition)
2 Considerations and Tradeoffs
   2.1 How Much Can You Afford to Lose?
   2.2 Online or Offline?
   2.3 Dump or Raw Backup?
   2.4 Onsite or Offsite?
   2.5 What to Back Up
   2.6 Storage Engines and Consistency
   2.7 Replication
3 Restoring from a Backup
   3.1 Copying Files Across the Network
   3.2 Starting MySQL
   3.3 Point-In-Time Recovery
4 Tools and Techniques
   4.1 mysqldump
   4.2 mysqlhotcopy
   4.3 Zmanda Recovery Manager
   4.4 InnoDB Hot Backup
   4.5 Offline Backups
   4.6 Filesystem Snapshots
   4.7 MySQL Global Hot Backup
   4.8 Automating and Scripting Backups
5 Rolling Your Own Backup Script</pre>

At this point, I have written sections 1, 2 and 3, which are about 11 pages in OpenOffice.org (compare to 6 pages on paper in the first edition). I'm sure this will only grow as other things occur to me. The outline of section 4 is completely open to change, and section 5 might not even happen; if you can script, you can script. Otherwise, you might want to use one of the tools listed in section 4. All in all, I'd say we're looking at about 25 to 30 pages, just based on what's in my head and not yet written down.

Now, to come to my point: what would be helpful to you? Are there any challenges you'd like me to cover, such as how you back up a data warehouse with terabytes of data? (I've already done that, in What To Back Up, but feel free to ask anyway.) Are there challenges *you* have had to solve, which you think would be very helpful to others? This chapter is largely open to suggestion at this point. If you tell me/us what you'd like to see, this is your opportunity to get at least four experts to solve your problems in-depth.

The usual disclaimers apply: no guarantees, this is all open to change, this is top-secret pre-production material anyway and you never saw this web page. What is the first rule of Fight Club, again?

I'm looking forward to your feedback.
