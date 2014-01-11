---
title: 'Features I&#8217;d like to see in InnoDB'
author: Baron Schwartz
layout: post
permalink: /2011/10/12/features-id-like-to-see-in-innodb/
categories:
  - SQL
---
I had some conversations with a few people at Oracle Open World about features that would be beneficial in InnoDB. They encouraged me to blog my thoughts, so I am.

Someday I&#8217;d like to have a clear mental list of features I want in MySQL in general, but that is a much harder list to organize and prioritize. InnoDB is an easier place to get started.

First, I&#8217;d like truly online, nonblocking DDL. I see two ways this could work: reading the old version of rows and writing the new version, or doing a shadow-copy and building the new table in the background. The first way has the advantage of being lazy, so the schema change is instantaneous, and you really never pay any additional cost. However, it has the disadvantage that it might be hard to implement multiple schema changes if a previous change isn&#8217;t fully finished, so to speak (I can see a lot of bugs if there are more than 2 versions of the schema at a time). This is a limitation I&#8217;d be okay with. If I need to make a schema change and then I can&#8217;t make another change for a while until I run some statement that updates every row to its current value, that&#8217;s okay. The second version would work something like Facebook&#8217;s online-schema-change tool, except it would be implemented internally. I&#8217;m frankly unfamiliar with the actual source code of fast index creation, but I imagine it could be used as a starting point. The disadvantage is that the schema would actually be changed; it wouldn&#8217;t be lazy, so it would add load to the server at the time of the change.

Second, I&#8217;d like the ability to extend secondary indexes with additional columns, similar to INCLUDE in Microsoft SQL Server. This could make it a lot cheaper to have many covering indexes without incurring the cost of keeping the columns in the non-leaf nodes that we don&#8217;t want to sort and index on (we just want the values available to cover the query). The benefits of this feature should be pretty obvious. I don&#8217;t know how hard this would be.

Third, I&#8217;d like InnoDB to fadvise() the transaction log file blocks after it writes them, to tell the operating system it won&#8217;t need them again. This is something we did in XtraBackup and it makes a big difference on Linux. This could make it practical to have much larger transaction logs without causing swap pressure and competing for the buffer pool. Linux is not smart about dropping blocks from the cache otherwise, and tends to keep blocks in cache even when they will not be used again until the logs are recycled. I assume, but am not as sure, that OS readahead should suffice to read those blocks back into the cache as the log writing circles around to the tail.

Three feature requests should be enough for one day. Hopefully this is useful. What features would you like to see?