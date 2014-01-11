---
title: How scalable is your database?
permalink: /2013/02/24/how-scalable-is-your-database/
categories:
  - Scalability
  - SQL
---
Most of the time, when people say "scalability" they mean any of dozens of things. Most of the time, when I say it I mean [exactly one precisely defined thing][1]. However, I don't claim that's the only correct use of "scalability." There is another, in particular, that I think is very important to understand: the inherent limitations of the system. This second one doesn't have a single mathematical definition, but it's vital nonetheless.

I'll frame the discussion by asking this: how scalable is your database?

Using the two definitions I like to use the most, I answer the question in this way.

1.  Scalability in terms of the Universal Scalability Law is the degree to which you can add more workers (or units of hardware) and get equal returns in terms of system throughput.
2.  Scalability in terms of inherent limitations is how big you can actually make the system.

These are very different things. For example, the Universal Scalability Law doesn't say anything about the amount of data your database stores. But I think we all know that a MySQL server can only hold just so much data. True, it's a lot of data &#8212; there are lots of multi-terabyte MySQL servers out there. But if you need to put, say, 20 petabytes of data into MySQL, *you just can't do it*.

Similarly, if you need to write 40 million values per second into your MySQL server, *you just can't do it.* Nor can you support 10 million concurrent client connections. These things are *impossible* with MySQL.

I hear some people saying "of course you can! You shard it, dummy!"

Ah. But do you then have **a** database, or do you have **many**? You have many, of course. If you build your own sharding layer on top of lots of MySQL instances, one could argue that you then have a single very large database. But it isn't a "MySQL database" anymore. MySQL has been relegated to a component of this sharded DBMS. As a supporting crew member, MySQL can play a role in a 20PB database, but MySQL *[per se][2]* can't do it.

When you're designing a system of any kind, it's smart to keep in mind that a lot of technologies have practical limits that can't be exceeded. They may grow with time and Moore's Law, but they represent a cap you can't get around without doing something differently.

 [1]: http://www.perfdynamics.com/Manifesto/USLscalability.html
 [2]: http://dictionary.reference.com/browse/per+se
