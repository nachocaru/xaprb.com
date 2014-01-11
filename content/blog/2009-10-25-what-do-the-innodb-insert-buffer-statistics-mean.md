---
title: What do the InnoDB insert buffer statistics mean?
permalink: /2009/10/25/what-do-the-innodb-insert-buffer-statistics-mean/
categories:
  - SQL
tags:
  - InnoDB
---
Ever seen this in `SHOW INNODB STATUS` and wondered what it means?

`<pre>
-------------------------------------
INSERT BUFFER AND ADAPTIVE HASH INDEX
-------------------------------------
Ibuf: size 1, free list len 4634, seg size 4636,
</pre>` 
I've never been quite sure, and [Peter didn't really clarify things][1] himself, so I took a look at the source. If I'm not mistaken, the seg size is really one more than the number of records the insert buffer can hold, the free list length is the number that aren't in use, and the size is just `seg_size - (1 + free_list_len)`. These seem to be kept in lockstep as records are inserted and merged.

 [1]: http://www.mysqlperformanceblog.com/2006/07/17/show-innodb-status-walk-through/
