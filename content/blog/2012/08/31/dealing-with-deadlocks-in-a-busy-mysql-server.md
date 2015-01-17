---
title: Dealing with deadlocks in a busy MySQL server
date: "2012-08-31"
url: /blog/2012/08/31/dealing-with-deadlocks-in-a-busy-mysql-server/
categories:
  - Databases
---
The servers I help manage have a lot of deadlocks, especially around a few central tables that are important to many business functions. The queries against them are complex, and they crunch a lot of data in some cases. As a result, we have long-running transactions that often deadlock against others, and there are even many short-running jobs that touch only a single row at a time that can't get their work done sometimes.

I've often said that deadlocks are a fact of life in transactional systems. The application must be able to deal with the deadlocks. This is true, but it's not the whole story. The work needs to be done, unless it's user-triggered and the user gets frustrated and abandons what they're trying to do. That's not the case in the applications I use; if something fails, it will get retried until it succeeds, because work queues and doesn't go away until it's completed.

Depending on how long it takes for a process to deadlock, that can represent a huge amount of wasted work. A two-hour process that has to be restarted many times adds a lot of load to the system. This extra load in turn causes more deadlocks. It can become a vicious spiral, so it can be important to avoid deadlocks.

Avoiding deadlocks is a lot easier when you can observe them. This is difficult in MySQL, because you have to look at SHOW ENGINE INNODB STATUS for that information. I use pt-deadlock-logger to help with this. It still isn't perfect, in particular because SHOW ENGINE INNODB STATUS has a lot of problems. I hope that future versions of MySQL will provide this information through tables in some fashion. SHOW ENGINE INNODB STATUS is something I'd love to never look at or parse again, but unfortunately some crucial information is still unavailable anywhere else.

A couple of the basic principles for avoiding deadlocks are to do the work in small units if possible, and to avoid processing the data in such a way that deadlocks occur. For example, the order of locking resources can matter a lot. Sometimes you don't have enough control over this to completely solve the problem, but sometimes it helps.

Here are a few other techniques I've seen or used myself recently.

1.  **Creating work/scratch tables.** Many long-running processes update particular tables and reference other tables in read-only mode, but deadlock because of write operations happening on the tables they're reading. Beginning the process by creating a scratch table with a copy of the rows needed from the read-only tables, then committing the transaction, can ease this problem by limiting the lock dependencies among processes.
2.  **Moving work into the application.** I've recently replaced an INSERT..SELECT statement with a SELECT followed by an INSERT. As a bonus, this is more efficient for statement-based replication too.
3.  **Retry, but not right away.** Some processes were retrying deadlocked statements immediately. This is unlikely to succeed; waiting a while before retrying might give the conflicting process time to finish and release locks.

In the longer term, I'm looking forward to understanding the systems well enough to know whether a change to row-based replication and/or changing transaction isolation level will be possible. Those changes might help improve the systems in a variety of ways.
