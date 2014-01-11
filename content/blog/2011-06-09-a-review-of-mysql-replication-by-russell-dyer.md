---
title: A review of MySQL Replication by Russell Dyer
permalink: /2011/06/09/a-review-of-mysql-replication-by-russell-dyer/
categories:
  - Review
  - SQL
---
[<img src="http://www.xaprb.com/blog/wp-content/uploads/2011/06/mysql_replication_front_cover_sm.jpg" alt="" style="float:left" title="mysql_replication_front_cover_sm" width="200" height="313" class="alignleft size-full wp-image-2360" />][1] [MySQL Replication][1] by Russell Dyer, Silent Killdeer, 2010. About 180 pages.

This is a pocket-sized guide to setting up and managing MySQL replication. It is self-published and made via print-on-demand technology. Topics include how replication works, setting up replication, making backups, and administering replication after it's working. There are several appendixes for replication-related functionality in the MySQL server and command-line tools.

This book doesn't go into great depth, so don't expect it to be a reference manual to replication internals or anything like that. It's more of a how-to manual for beginners, walking through the basics of binary and relay logs, SQL and I/O threads, and so on.

I wish it were more comprehensive in some areas, and talked about tools such as Percona XtraBackup and Maatkit. I don't think any book on replication today is complete without these tools. I also wish the text font had serifs and was colored black instead of a foggy gray color. This might be an artifact of the print-on-demand technology, I'm not sure.

Some readers will likely prefer the official MySQL manual to this book, while others might find the book to be a convenient and helpful reference. If I had to summarize the book in a sentence, I'd say that it tells readers the basics of setting up and administering replication, but excludes advanced topics, some of which I'd consider essential (e.g. Maatkit, Percona XtraBackup).

 [1]: http://www.amazon.com/MySQL-Replication-Administrators-Guide/dp/0983185409/?tag=xaprb-20
