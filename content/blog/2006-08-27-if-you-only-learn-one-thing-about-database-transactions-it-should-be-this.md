---
title: If you only learn one thing about database transactions, it should be this
author: Baron Schwartz
excerpt: "<p>I've been writing a lot of articles about locks, deadlocks, and transactions recently, and it occurs to me I've neglected to mention the single most important thing to know.  If you only learn one thing about transactions in database systems, you should learn this, and learn it thoroughly -- burn it into your brain permanently, if possible.</p>"
layout: post
permalink: >
  /2006/08/27/if-you-only-learn-one-thing-about-database-transactions-it-should-be-this/
description:
  - >
    Explains one important thing to know about database transactions, and six
    suggestions to help achieve that goal.
---
I&#8217;ve been writing a lot of articles about locks, deadlocks, and transactions recently, and it occurs to me I&#8217;ve neglected to mention the single most important thing to know. If you only learn one thing about transactions in database systems, you should learn this, and learn it thoroughly &#8212; burn it into your brain permanently, if possible.

**The single most important thing you can do is keep your transactions as small as possible.**

That simple practice will improve performance, increase concurrency, reduce deadlocks, and generally create world peace. Plus it&#8217;ll make you think hard about your queries, which will probably make them higher-quality and better to maintain.

Now, how can you do it? Ah, that&#8217;s the trick. I offer you six simple suggestions.

### 1. Have the right attitude

The way to think about transactions is as an urgent mission. The instant you say `START TRANSACTION`, the race is on.

It&#8217;s like when you&#8217;re waiting in the car for the pouring rain to stop, before you make a mad dash for the house. You prepare yourself, unlock the door, unbuckle the seat belt&#8230; take a deep breath&#8230; *START TRANSACTION go go go go COMMIT!* 

### 2. Do as few statements as possible

Do only the statements you need to inside the transaction. Don&#8217;t make updates to `big_huge_table` and inserts to `giant_table`, then poke around inside other tables looking at little things of no consequence before finishing your work. Remember, a transaction is a set of statements that must all succeed together as a unit, or must all fail together as a unit. Include in your transaction only the statements that belong to that unit of work.

If you can do it all in a single query, you don&#8217;t even need a transaction. By definition, a single query is a one-statement transaction.

### 3. Prepare as much ahead of time as possible

To help include as few statements as possible in your transaction, look at the order of the queries. Can some of them be moved earlier in the sequence, before the `START TRANSACTION` statement? If so, good. Do as much preparation as possible before you start the work. Especially think about whether you can check to make sure there&#8217;s even work to be done, or whether you&#8217;re likely to be able to finish the work &#8212; if you can find that out ahead of time, you might be able to avoid even doing anything.

### 4. Touch the smallest amount of data possible

If possible, avoid changing data that doesn&#8217;t need to be changed. For example, if you&#8217;re updating a summary table and you know what was just changed in the table from which the summary is calculated, you may not need to update the entire summary &#8212; maybe just part of it. Use indexes wisely to constrain your work to just part of a table instead of doing the entire table. Use every bit of information at your disposal to avoid working with more data than you need to.

### 5. Don&#8217;t wait around before committing

The goal is to lock as few resources as possible, for the shortest time possible. To that end, look at whether you can re-order the statements within your transaction. Is it possible to make the big changes later in the transaction? Can you delay getting locks on the really important table, which everyone else is accessing at the same time, until near the end? If so, you might cut down the number of locks and the duration they&#8217;re held. And definitely commit the transaction as soon as you&#8217;re done.

### 6. Don&#8217;t sacrifice consistency

Transactions have a purpose, and you should not be so afraid of holding locks that you commit when only half the work is done. Use transactions deliberately and carefully to group a set of work together into a logical unit. By all means examine whether the unit is bigger than it needs to be, but don&#8217;t shoot yourself in the foot by committing before the work is all done, out of fear of deadlocks.

### Conclusion

Keeping transactions as small as possible is the most important thing to do, but it may not be obvious, especially if you&#8217;re less experienced with databases. A few easy practices, combined with simple awareness, can go a very long way. But remember &#8212; don&#8217;t defeat the purpose by cheating yourself out of the very benefits transactions give you.