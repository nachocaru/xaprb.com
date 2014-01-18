---
title: "How to find out who is locking a table  in MySQL"
date: "2006-07-31"
url: /blog/2006/07/31/how-to-analyze-innodb-mysql-locks/
categories:
  - Databases
---
MySQL is adding more tools to monitor its internals with every new release, but one thing it still lacks is a way to find out who is locking what, and therefore which transactions block which other ones. This is such a vital feature that I'm considering writing my own patch to the source! Still, it is possible, to a limited extent, to find out who's locking resources. In this article I'll explain how you can do that.

This article is the second in a series on how to use the [`innotop`][1] MySQL and InnoDB monitor.

### Introduction

Here's the situation: you are trying to update a table and every time you issue the query, it hangs until it times out and tells you the lock wait timeout was exceeded. Someone has locked the table you're trying to update, but you have no idea who. This can be incredibly frustrating, because this could go on indefinitely. I've sometimes had to put work off till another day, because the table is locked all day long.

I've found only a very limited set of circumstances in which MySQL will say what's happening with locks. These are all printed out in the text of `SHOW ENGINE INNODB STATUS`.

### When there was a deadlock

The first way to see locks is when there's been a deadlock. The status text will show transaction information on the transactions that deadlocked, which locks they held, and which they were waiting for. Here is a sample. Look at the sections titled "WAITING FOR THIS LOCK TO BE GRANTED" and "HOLDS THE LOCKS."

<pre>------------------------
LATEST DETECTED DEADLOCK
------------------------
060731 20:19:58
*** (1) TRANSACTION:
TRANSACTION 0 93698, ACTIVE 2 sec, process no 12767, OS thread id 1141946720 starting index read
mysql tables in use 1, locked 1
LOCK WAIT 4 lock struct(s), heap size 1216
MySQL thread id 3, query id 19 localhost root Updating
update test.innodb_deadlock_maker set a = 0 where a &lt;&gt; 0
*** (1) WAITING FOR THIS LOCK TO BE GRANTED:
RECORD LOCKS space id 0 page no 131120 n bits 72 index `GEN_CLUST_INDEX` of table `test/innodb_deadlock_maker` trx id 0 93698 lock_mode X waiting
Record lock, heap no 2 PHYSICAL RECORD: n_fields 4; compact format; info bits 0
 0: len 6; hex 000000019000; asc       ;; 1: len 6; hex 000000016e01; asc     n ;; 2: len 7; hex 80000000320110; asc     2  ;; 3: len 4; hex 80000000; asc     ;;

*** (2) TRANSACTION:
TRANSACTION 0 93699, ACTIVE 2 sec, process no 12767, OS thread id 1142212960 starting index read, thread declared inside InnoDB 500
mysql tables in use 1, locked 1
4 lock struct(s), heap size 1216
MySQL thread id 4, query id 20 localhost root Updating
update test.innodb_deadlock_maker set a = 1 where a &lt;&gt; 1
*** (2) HOLDS THE LOCK(S):
RECORD LOCKS space id 0 page no 131120 n bits 72 index `GEN_CLUST_INDEX` of table `test/innodb_deadlock_maker` trx id 0 93699 lock mode S
Record lock, heap no 1 PHYSICAL RECORD: n_fields 1; compact format; info bits 0
 0: len 8; hex 73757072656d756d; asc supremum;;

Record lock, heap no 2 PHYSICAL RECORD: n_fields 4; compact format; info bits 0
 0: len 6; hex 000000019000; asc       ;; 1: len 6; hex 000000016e01; asc     n ;; 2: len 7; hex 80000000320110; asc     2  ;; 3: len 4; hex 80000000; asc     ;;

Record lock, heap no 3 PHYSICAL RECORD: n_fields 4; compact format; info bits 0
 0: len 6; hex 000000019001; asc       ;; 1: len 6; hex 000000016e01; asc     n ;; 2: len 7; hex 8000000032011f; asc     2  ;; 3: len 4; hex 80000001; asc     ;;

*** (2) WAITING FOR THIS LOCK TO BE GRANTED:
RECORD LOCKS space id 0 page no 131120 n bits 72 index `GEN_CLUST_INDEX` of table `test/innodb_deadlock_maker` trx id 0 93699 lock_mode X waiting
Record lock, heap no 2 PHYSICAL RECORD: n_fields 4; compact format; info bits 0
 0: len 6; hex 000000019000; asc       ;; 1: len 6; hex 000000016e01; asc     n ;; 2: len 7; hex 80000000320110; asc     2  ;; 3: len 4; hex 80000000; asc     ;;

*** WE ROLL BACK TRANSACTION (2)</pre>

More importantly, the lines beginning "RECORD LOCKS space id 0&#8243; show which index of which table was locked. That is the real meat of the matter -- that's what you need to know.

There's just one problem: after there's been a deadlock, it's too late. You don't want to know what held locks in the past, you want to know what holds them now. The deadlock information isn't usually helpful in finding out what transaction is blocking something from happening.

### When a transaction is waiting for locks

The next place you can sometimes see lock information is in the transaction section of the output. Here's a sample:

<pre>---TRANSACTION 0 93789802, ACTIVE 19 sec, process no 9544, OS thread id 389120018
MySQL thread id 23740, query id 194861248 worker1.office 192.168.0.12 robot
---TRANSACTION 0 93789797, ACTIVE 20 sec, process no 9537, OS thread id 389005359 starting index read
mysql tables in use 1, locked 1
LOCK WAIT 2 lock struct(s), heap size 320
MySQL thread id 23733, query id 194861215 elpaso 192.168.0.31 robot Updating
update test.test set col1 = 4
------- TRX HAS BEEN WAITING 20 SEC FOR THIS LOCK TO BE GRANTED:
RECORD LOCKS space id 0 page no 299998 n bits 200 index `PRIMARY` of table `test/test` trx id 0 93789797 lock_mode X locks rec but not gap waiting
Record lock, heap no 77 PHYSICAL RECORD: n_fields 15; compact format; info bits 0 
 0: len 4; hex 80474fd6; asc  GO ;; 1: len 6; hex 000005970680; asc       ;; 2: len 7; hex 000017c02b176c; asc     + l;; 3: len 4; hex 80000003; asc     ;; 4: len 8; hex 800000000da0c93a; asc        :;; 5: len 8; hex 800000000eb2ea7e; asc        ~;; 6: len 4; hex c771fe44; asc  q D;; 7: len 4; hex 8000003e; asc    &gt;;; 8: len 8; hex 8000123eb9e5dfd5; asc    &gt;    ;; 9: len 4; hex 8000003a; asc    :;; 10: len 8; hex 8000123eb9e43603; asc    &gt;  6 ;; 11: len 4; hex 80000035; asc    5;; 12: len 8; hex 8000123eb9d6c130; asc    &gt;   0;; 13: len 4; hex 80000033; asc    3;; 14: len 8; hex 8000123eb9c7c853; asc    &gt;   S;;
 
---------------------
---TRANSACTION 0 93789679, ACTIVE 31082 sec, process no 9535, OS thread id 388972583 starting index read, thread declared inside InnoDB 6
mysql tables in use 4, locked 4
11614 lock struct(s), heap size 683328
MySQL thread id 23731, query id 194861117 elpaso 192.168.0.31 robot</pre>

Notice the first transaction has been waiting 20 seconds for a lock to be granted, and it tells you which table and index as above. The other transaction I included (there were many in this section, but I omitted most) says it has 4 tables open and 4 locked. What it doesn't say is which ones.

Again, there's some information here, but not a lot. If you issue a query and it hangs and waits for a lock, knowing what lock it's waiting for isn't really helpful. And knowing some other transaction holds a lock isn't *always* helpful either.

It can be useful sometimes though, and that's better than nothing. If you only see two transactions with locks, you know the one that's **not** waiting for a lock is probably the one that holds them. Notice something scary in the information above? Transaction "0 93789771&#8243;, on connection 23731, has been active for... eight and a half hours! Whoa. It's time to [find out what owns that connection][2] and possibly kill it.

The take-away here is, if you're getting blocked on an InnoDB table, and you're lucky enough to see only one other transaction with locks, it's probably the one blocking you.

### What about table locks?

Ah, good question. What if the table isn't InnoDB, or what if someone locked it with `LOCK TABLES`, and it doesn't show up in the output of `SHOW ENGINE INNODB STATUS`? As far as I know, you're helpless. I don't know how to get any information on who's locking the table then. Table lock information doesn't seem to be exposed in any fashion -- only row lock information.

In fact, if you're in a transaction, `LOCK TABLES` seems to "kick you out" of the transaction. Try experimenting with `START TRANSACTION` and `LOCK TABLES` on an InnoDB table, and you'll see what I mean. If you lock a table for writing, then try to select from it in another connection, the other connection will block. If you then issue `START TRANSACTION` on the first connection, the second connection will immediately unblock, and the first connection's transaction will disappear from the InnoDB status text.

### Who wants to read all that mess?

Who, indeed? The text I included above is a pain to read, and it's not even representative of what you'll really be looking at. For one thing, you might have to scan through 40 or more transactions to find the ones you care about, and then there's all the other information in the output, some of which can be voluminous (such as deadlocks). What a hassle!

Fortunately, there's a tool to do that for you: `<a href="http://www.xaprb.com/blog/2006/07/02/innotop-mysql-innodb-monitor/">innotop</a>`. This tool formats the output neatly and gives you filtering options to display only transactions with locks (or just sort them to the top of the display). Here's how you can do that:

Start innotop and use the "T" key to enter InnoDB Transaction mode, if it's not already in that mode. You will see a list of transactions. Next, make the "Locks," "Tbl Used," and "Tbl Lck" columns visible. Press the "c" key to activate the "choose columns" dialog:

[<img src="/innotop/thumb-innotop-choose-columns.png" alt="innotop screenshot" width="200" height="118" />][3]

Press Return and you should see something that looks like this:

[<img src="/innotop/thumb-innotop-default-T-display.png" alt="innotop screenshot" width="200" height="118" />][4]

Now sort transactions with locks to the top by pressing the "s" key and choosing "lock\_structs" as the sort column. You may need to press the "r" key afterwards to reverse the sort order if they go to the bottom instead. Alternatively, you can use the "w" key to add a filter on the "lock\_structs" column, such as "[1-9]" to match only rows where the column isn't zero (this is a handy filter to add in general, just so you can see how many transactions have locks).

Here's a screenshot of me changing the sort column, and adding a filter:

[<img src="/innotop/thumb-innotop-choose-sort-column.png" alt="innotop screenshot" width="200" height="118" />][5][<img src="/innotop/thumb-innotop-add-filter.png" alt="innotop screenshot" width="200" height="118" />][6]

And here's a screenshot of the result:

[<img src="/innotop/thumb-innotop-filtered-view.png" alt="innotop screenshot" width="200" height="118" />][7] 
In this example you could see the locks without hiding the other rows, but when you have a very busy server it can really help to hide all the transactions without locks.

Isn't that easier than digging through the output of `SHOW ENGINE INNODB STATUS`? I think so.

### Is there more?

Though I've searched the Internet, searched the source code and the MySQL manual, I haven't been able to find any other ways to get information on current locks in MySQL. But I'd be delighted if you prove me wrong! If you have anything to add, please comment.

 [1]: http://www.xaprb.com/innotop/
 [2]: http://www.xaprb.com/blog/2006/07/23/how-to-track-what-owns-a-mysql-connection/
 [3]: http://www.xaprb.com/innotop/innotop-choose-columns.png
 [4]: http://www.xaprb.com/innotop/innotop-default-T-display.png
 [5]: http://www.xaprb.com/innotop/innotop-choose-sort-column.png
 [6]: http://www.xaprb.com/innotop/innotop-add-filter.png
 [7]: http://www.xaprb.com/innotop/innotop-filtered-view.png
