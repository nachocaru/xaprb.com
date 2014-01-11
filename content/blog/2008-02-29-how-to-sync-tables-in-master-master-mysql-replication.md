---
title: How to sync tables in master-master MySQL replication
date: "2008-02-29"
permalink: /2008/02/29/how-to-sync-tables-in-master-master-mysql-replication/
---
Suppose you have a master-master replication setup, and you know one of the tables has the wrong data. How do you re-sync it with the other server?

**Warning: don't just use any tool for this job**! You may destroy your good copy of the data.

If your table is large, you'll probably want to use a tool that can smartly find the differences in a very large dataset, and fix only the rows that need to be fixed. There are several tools that are either able to do this, or claim to be able to do this. However, most of them are not replication-aware, and are likely to either **break replication or destroy data**.

To see why this is, let's look at a typical scenario. You have server1 and server2 set up as co-masters. On server1, your copy of sakila.film has correct data. On server2, somehow you are missing a row in that table. A hypothetical sync tool will compare the two copies of the data and find the missing row, then insert it on server2. This INSERT statement will flow through replication to server1, where it will cause a duplicate key error and stop replication.

You can probably think of many other scenarios with lots of bad side effects, so I won't list any more. I'll leave it at this: when you are synchronizing data on a slave (even if it is also a master), you must not change data on the slave. Changing data on the slave can cause so much trouble in so many different ways! The correct way to do this is to make the changes on the master, and let them flow through replication to the slave.

As far as I know, there is only one tool that is capable of doing this. It is mk-table-sync, which is part of [Maatkit][1]. However, even this tool will let you point the gun at your foot and pull the trigger, if you don't use it correctly.

The correct way to sync a master-master setup with mk-table-sync is with the `--synctomaster` option, which tells it to make changes on the master:

<pre>mk-table-sync --synctomaster h=server2,D=sakila,t=film</pre>

Notice that I'm connecting to the slave, but instructing it to make changes on the master. (Yes, it is able to find the master by inspecting the slave).

If you do the following, you'll probably cause problems:

<pre>mk-table-sync h=server1,D=sakila,t=film h=server2</pre>

I've just updated the documentation to point out the subtleties with master-master replication. However, you should always keep in mind: it's not just master-master replication. *Any* replication configuration is best synchronized by making the changes on the master, and you should *always* avoid changing data on a slave &#8212; even to "fix" the slave. I might also add a feature to mk-table-sync to warn you when it detects that you are trying to change data on a slave.

 [1]: http://code.google.com/p/maatkit/
