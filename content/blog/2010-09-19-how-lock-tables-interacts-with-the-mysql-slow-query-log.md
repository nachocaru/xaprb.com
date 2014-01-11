---
title: How LOCK TABLES interacts with the MySQL slow query log
date: "2010-09-19"
permalink: /2010/09/19/how-lock-tables-interacts-with-the-mysql-slow-query-log/
categories:
  - SQL
tags:
  - LOCK TABLES
  - microslow logging
  - slow query log
---
Here's a little trivia that you might find helpful. Suppose that I have the following in the MySQL slow query log (abbreviated for clarity):

`<pre>
# User@Host: root[root] @ localhost [127.0.0.1]
# Time: 100919 17:58:52
# Query_time: 9.648427  Lock_time: 8.648039
select sleep(1) from t limit 1;
</pre>` 
To get this into the slow query log, I set the long\_query\_time to 0 and opened two sessions. In one session I ran `LOCK TABLES t WRITE`, and in the other I tried to select from that table. As you can see above, **1) LOCK TABLES contributes to the Lock_time number**, and **2) the Query_time is the sum of execution time and lock time**.

Now, I'll set long\_query\_time = 2 and run the same test. What happens? Nothing shows up in the slow query log, because **3) the time spent waiting for table locks doesn't count towards the slow query time threshold**.

A final note: it was rumored that the LOCK TABLES query itself is somehow a special-case that is never logged to the slow query log. However, this is not true; if long\_query\_time is set to zero, the LOCK TABLES query will appear in the log.
