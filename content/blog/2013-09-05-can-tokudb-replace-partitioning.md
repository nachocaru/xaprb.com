---
title: Can TokuDB replace partitioning?
date: "2013-09-05"
permalink: /2013/09/05/can-tokudb-replace-partitioning/
categories:
  - SQL
---
I've been considering using TokuDB for a large dataset, primarily because of its high compression. The data is append-only, never updated, rarely read, and purged after a configurable time. 
I use partitions to drop old data a day at a time. It's much more efficient than deleting rows, and it lets me avoid indexing the data on the time dimension. Partitioning serves as a crude form of indexing, as well as helping purge old data. 
I wondered if TokuDB supports partitioning. Then I remembered some older posts from the Tokutek blog about partitioning. The [claim][1] is that "there are almost always better (higher performing, more robust, lower maintenance) alternatives to partitioning." 
I'm not sure this is true for my use case, for a couple of reasons. 
First, I clearly fall into the only category that the flowchart acknowledges may be a good use case for partitioning: I do need instant block deletes. Paying for data ingestion as well as purging doesn't make sense in my case. It's like eating a hot hot curry &#8212; I don't want to feel the pain on the way out too :-) 
<img src="http://www.xaprb.com/blog/wp-content/uploads/2013/09/Partition-Flow-Chart1-251x300.png" alt="Partition-Flow-Chart1" width="251" height="300" class="aligncenter size-medium wp-image-3257" /> 
Secondly, data size matters a lot. If I need to create a redundant index on the timestamp dimension, no matter how good TokuDB's compression is, it'll inflate my storage and I/O costs. And make my backups bigger, and so on, and so on. I don't want an index that I don't need. My queries operate very efficiently without the timestamp index, and creating one only to help delete older data fast wouldn't make sense. 
In the end I got sidetracked and decided to write this blog post. And I didn't find out whether TokuDB supports partitioning or not! Silly me.

 [1]: http://www.tokutek.com/2011/03/mysql-partitioning-a-flow-chart/
