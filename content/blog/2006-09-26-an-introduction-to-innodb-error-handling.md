---
title: An introduction to InnoDB error handling
author: Baron Schwartz
excerpt: "<p>Do you know the fine details of MySQL's transactional error handling with the InnoDB storage engine?  If you're writing transactional SQL, you need to be prepared to handle errors appropriately, and to do that, you need to know how MySQL handles them.  This article introduces you to the topic.</p>"
layout: post
permalink: /2006/09/26/an-introduction-to-innodb-error-handling/
description:
  - >
    You need to know how InnoDB handles different types of errors, so your can code
    your application logic correctly.
---
Do you know the fine details of MySQL's transactional error handling with the InnoDB storage engine? If you're writing transactional SQL, you need to be prepared to handle errors appropriately, and to do that, you need to know how MySQL handles them. This article introduces you to the topic.

### How InnoDB differs from other engines

When a MySQL query has an error in a non-transactional storage engine, such as MyISAM, the results are anybody's guess. For example, if your `INSERT` against a MyISAM table causes a duplicate index violation when it's halfway done, it stops, leaving half the data inserted. Not so in InnoDB; even if you're not in an explicit transaction, each individual statement is a mini-transaction unto itself. It either completely succeeds, or completely fails.

Many programmers are familiar with this distinction, but what happens when you're in the middle of a multi-statement transaction?

### Common types of errors

There are three common types of errors you'll encounter in these situations:

1.  A statement times out. This happens when the statement requests a lock for which it must wait. Another transaction or statement has locked the resource in question, blocking all or certain types of access to the resource. This typically happens when your statement tries to insert, update or delete a row which is locked by another writer, or locked in share mode by a statement such as `INSERT... SELECT`. Your statement waits for some time, but if it doesn't get the lock, it will eventually time out and abort with an error.
2.  A statement causes a deadlock. This happens when statements request locks in such a way that there's a cycle of waiting lock requests. A *waits-for graph* is used to detect this situation; if there is a cycle in the graph, there's a deadlock (you may want to read up on cycle-detection algorithms elsewhere if you're interested). One statement must be chosen as the deadlock victim so others can proceed. If you issued that statement, your statement will be aborted with an error. To minimize the cost of rolling back the victim, InnoDB currently chooses the transaction that has performed the fewest InnoDB updates (it disregards updates to data stored in other storage engines).
3.  A statement violates an integrity constraint, such as a unique index or a foreign key. The statement is aborted with an error.

InnoDB handles each type of error slightly differently, and doesn't always follow the SQL standard.

### How InnoDB handles these errors

When InnoDB aborts because of a lock wait timeout, it rolls back only the statement that times out, unless your version of MySQL is older than 5.0.13. In these cases, it rolls back the entire transaction. That is, if you have issued five statements in the transaction, and the sixth times out, the first five are rolled back too. The behavior in 5.0.13 and newer is more logical and better to work with &#8212; you should be able to retry just the statement that timed out, and if it succeeds, continue with further statements in your transaction.

If you are having issues with lock wait timeouts, you may have some transactions holding locks too long. MySQL has limited tools to help you solve these problems, but if you browse through my past articles, you'll see I have written extensively about how to determine what is blocking your statement. Unfortunately, there's only so much you can do.

When your statement is aborted because of a deadlock, the *entire transaction* is rolled back. This means you cannot just retry the last statement and continue your work. However, if you started the transaction explicitly (i.e. it wasn't an implicit one-statement transaction), the `START TRANSACTION` statement is not rolled back. The effect is that you're still in a transaction, but all your work has been erased.

Finally, integrity constraints can be handled at various places within MySQL, including higher-level layers, but when a violation occurs within InnoDB, just the offending statement is rolled back. Duplicate-key violations can be avoided with the `IGNORE` option to the `INSERT` statement so they're silently ignored.

### How locks are handled

You can see there are two possibilities for what happens during an error: either the entire transaction is rolled back, or just the offending statement. What happens to locks held by the transaction?

As it turns out, locks are not released when a single statement is rolled back, but when the entire transaction is rolled back, all its locks are released, too. An easy way to remember this is that the entire-transaction rollback scenario basically wipes your transaction and leaves you with a fresh start.

### Further reading

I always recommend you read the MySQL manual. In this case, you should read at least [section 14.2.15, InnoDB Error Handling][1], and you may want to read more of the sub-sections of chapter 14, too.

 [1]: http://dev.mysql.com/doc/refman/5.0/en/innodb-error-handling.html
