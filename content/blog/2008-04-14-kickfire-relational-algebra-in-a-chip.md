---
title: 'Kickfire: relational algebra in a chip'
author: Baron Schwartz
layout: post
permalink: /2008/04/14/kickfire-relational-algebra-in-a-chip/
description:
  - "Kickfire's TPC-H benchmarks are out now, and this post examines Kickfire's architecture and capabilities."
categories:
  - SQL
tags:
  - ARIES
  - column store
  - data warehousing
  - Kickfire
  - MySQL
  - Ravi Krishnamurthy
  - stream processing
  - TPC H
---
I spent the day Thursday with some of Kickfire&#8217;s engineers at their headquarters. In this article, I&#8217;d like to go over a little of the system&#8217;s architecture and some other details.

Everything in quotation marks in this article is a quote. (I don&#8217;t use quotes when I&#8217;m glossing over a technical point &#8212; at least, not in this article.)

Even though I saw one of Kickfire&#8217;s engineers running queries on the system, they didn&#8217;t let me actually take the keyboard and type into it myself. So everything I&#8217;m writing here is **still second-hand knowledge**. It&#8217;s an unreleased product that&#8217;s in very rapid development, so this is understandable.

<a href="http://www.tpc.org/tpch/results/tpch\_perf\_results.asp?resulttype=noncluster&version=2%&currencyID=0">Kickfire&#8217;s TPC-H benchmarks are now published</a>, so you can see the results of what I&#8217;ve been seeing them work on. They are now #1 in the world, in two categories. Visit them at their booth in the exhibition area at the conference, and you will be able to see more for yourself.

### The big picture

At a high level, Kickfire is an appliance consisting of two or more commodity rack-mountable 1U pizza-box units.

One unit contains the Kickfire chip and a lot of standard, high-speed, server-grade ECC memory. This unit is what executes the queries at high speed.

The other unit is connected to the Kickfire chip unit via a standard PCIe interconnect. It runs stock CentOS 5, with MySQL 5.1. Kickfire has their own storage engine, which uses fairly well-known techniques such as column storage and compression.

To the outside world, the unit behaves just like an ordinary MySQL server. You connect to it in the same manner, you issue the same kinds of queries, you manage users and privileges the same way, and so on. However, when you run a query, it doesn&#8217;t get executed in the traditional MySQL manner (nested-loop joins with calls to the storage engine via the storage engine API). Instead, the query goes to the Kickfire chip and executes there. The chip is designed to execute queries very fast, through a variety of techiques that a) I&#8217;m not allowed to tell you about yet or b) are sometimes unclear to me because Kickfire was being a little protective about some of my technical questions.

I met with quite a few people at Kickfire, but I&#8217;ll just mention one: Ravi Krishnamurthy. Before Kickfire approached me, I had not heard of him. Anyway, I&#8217;ll just link to <a href="http://scholar.google.com/scholar?q=ravi+krishnamurthy">Ravi Krishnamurthy</a> on Google Scholar, and let you read up on his papers if you want. It&#8217;s enough to say that I really enjoyed speaking with him and the other people at Kickfire.

One of the overall impressions I got was that the Kickfire engineers aren&#8217;t the type to do something halfway. When complete, this is not intended to be a system that has only some of the features you&#8217;d expect.

### I/O bottlenecks

The Kickfire chip has no registers. Instead, the Kickfire chip addresses a very large amount of memory directly. Remember, registers are a bottleneck. As I said in <a href="http://www.xaprb.com/blog/2008/04/04/kickfire-stream-processing-sql-queries/">my first article on Kickfire</a>, using registers to process large amounts of data is like using a paper cup to fill your bathtub. Allowing the chip to address this memory directly removes a huge bottleneck.

There is still on-disk storage, though. (And no, it&#8217;s not SSD.) The interconnect between the on-disk storage and the memory is a standard PCIe connection. Nothing exotic or proprietary. But the system is apparently capable of moving a very large amount of data at very high speed from the disks to the Kickfire chip&#8217;s memory, where it can be addressed in O(1) speed like an array lookup.

Another interesting technique is that the system does not decompress the data to operate on it. According to the engineers, the queries run on the data in its compressed form. As Ravi told me, implementing this is &#8220;not for the faint of heart.&#8221;

Kickfire seems to have really worked hard at removing bottlenecks wherever possible. For example, they&#8217;ve rewritten the out-of-the-box drivers for key pieces of the commodity hardware they&#8217;re using.

### Souped-up MySQL

If you know how MySQL executes queries, the statement &#8220;Kickfire executes joins directly in the Kickfire chip&#8221; implies that the Kickfire system isn&#8217;t just a storage engine, because MySQL currently processes many of the most costly parts of queries at the server level, not in the storage engine. Obviously Kickfire is not going to perform well unless it changes that. Kickfire has in fact built their own optimizer, which replaces the MySQL optimizer. It compiles the incoming query into a series of macro-operations, which apparently are very similar to the basic relational operators (project, join, etc). This is then sent to the chip for execution, and as the chip produces results it injects them back into the stream of bytes that the server normally uses to send results back to the client.

The Kickfire chip doesn&#8217;t implement everything in hardware. For example, there is no MD5() function in the chip. When it encounters an operation it can&#8217;t do in hardware, it makes a call back to the MySQL server to fill in the gaps in its functionality.

The rewritten optimizer sounds like an interesting piece of engineering. Ravi told me with pride that the optimizer is &#8220;world-class&#8221; and &#8220;can stand toe-to-toe with the best optimizers in the database industry.&#8221; It is a cost-based optimizer with rewrites (e.g. it transforms the operator tree into the most efficient equivalent structure) and it is exhaustive (e.g. it tries all possible combinations to find the best execution plan, unlike MySQL&#8217;s optimizer which by default switches to a greedy search when the number of tables to be joined becomes large [correction: as Timour pointed out to me today, I made it sound like MySQL's optimizer isn't exhaustive; I neglected to mention that you can configure it]).

I asked whether they had benchmarked the optimizer&#8217;s performance. (I mean how fast it can find an optimal query plan, not the performance of its results.) Of course, there is no standard benchmark for this, but I think it&#8217;s interesting just to compare it against the MySQL optimizer. They had not done this, but I think they will now that I have mentioned it. I think it&#8217;s relevant because if you use Kickfire for short queries, a slow-performing optimizer could actually become noticeable.

### Is it really stream processing?

I wanted to know whether the chip really does stream processing, or whether it is only conceptually stream processing that&#8217;s really implemented some other way. It sounds to me like it&#8217;s the genuine article. I asked some pointed questions to this effect, such as &#8220;is there a way to interrupt a partially completed query.&#8221; As it turns out there is, but only because the stream processor apparently does time-slicing like a standard chip, and when it comes up for air it can check to see if a query should be aborted. In general, I was told, there is no interruption once the data stream starts flowing. That lets the query literally &#8220;run at the speed of electrons.&#8221;

But what about subqueries, you ask? That&#8217;s what I asked too. Stream processing is all very well for joins, but what about a correlated subquery, for example?

It turns out that if you&#8217;re clever, you can figure out ways to decorrelate them and then execute them in streaming fashion. The same holds for aggregation over data that&#8217;s not in the order needed for streamed aggregation. Pretty interesting ideas; I can&#8217;t go into them, because those are proprietary, but Ravi and I talked about them for quite a while.

And very large IN() lists can be turned into a relation and treated like any other.

### Storage

Storage is obviously crucial to processing extremely large amounts of data very fast. A few of the things I noted about the storage:

*   Each column is stored in a fixed width. This is how Kickfire can look up a row as though it&#8217;s doing an array access.
*   The internal representation is chosen automatically and may not match what you think. Kickfire can profile data as it&#8217;s loaded, and choose the type as it goes.
*   If you tell Kickfire you&#8217;ll only store values that are X large in a column, and it builds its column storage space to hold that large a value, what happens when you then start adding larger values later? Ravi explained how it works, and it&#8217;s proprietary right now, but suffice to say that Kickfire does not need to rewrite all the data you&#8217;ve already stored if you suddenly start storing values you didn&#8217;t anticipate. Yet, it can still maintain O(1) array-lookup performance on the compressed data.
*   You can pass the storage engine special comments in the CREATE TABLE statement to tell it what kinds of data each column will get. These comments are part of MySQL&#8217;s standard syntax &#8212; Kickfire has not changed the MySQL parser, so it should be 100% syntax-compatible with a standard MySQL server.
*   Kickfire has a very Oracle-like set of features around tablespaces, extents, and so on. You can have multiple tablespaces, and you can add devices to tablespaces, etc.
*   Storage is transactional and ACID-compliant, with logging and <a href="http://en.wikipedia.org/wiki/Algorithms\_for\_Recovery\_and\_Isolation\_Exploiting\_Semantics">ARIES</a> recovery much like Oracle, InnoDB, etc. If it surprises you that a system built for large data warehouses would be transactional and ACID-compliant, welcome to the club. I was expecting the usual special-case behavior, you know, you can load data but you can&#8217;t update it, or something like that. But as I said, Kickfire isn&#8217;t doing this halfway. Plus, TPC-H requires ACID properties.

### Loading, ETL, and star schemas

Loading data is also important to accelerate: executing queries on large amounts of data isn&#8217;t good if it takes forever to get the data into the server. Kickfire has their own suite of tools, including one for loading data that accelerates the load process with the SQL chip itself.

Kickfire&#8217;s attitude towards star schemas is that you shouldn&#8217;t need to build a special schema for your data warehouse. They think their system will be so fast that you can keep your data in the same schema you use for OLTP. If that turns out to be true, that will save a lot of work. (How much effort have you put into building a separate schema for your data warehouse?)

### Other notes of interest

Here are some other tidbits I thought I&#8217;d share with you:

*   The system has support for foreign keys. It automatically creates indexes on foreign keys and primary keys.
*   The standard types of indexes don&#8217;t really apply. Instead, the indexes are &#8220;hardware-friendly&#8221; (the other term they used was that the indexes are &#8220;impedance-matched to the hardware&#8221;). There are special features for indexing ranges of dates and indexing words inside a string (but this is not a full-text index; I&#8217;m unclear on how it really works, but it helps accelerate LIKE queries, which is important for the TPC-H benchmarks)
*   The deadlock detection is via cycle detection in the waits-for graph, not timeout-based. As a result, it should be fast.
*   The system I saw was running in debug mode, and wrote its optimized query plan to a file for every query. I talked with them about making this available via SQL. The plan is much more detailed and informative than MySQL&#8217;s EXPLAIN. They asked me whether it would be a good idea to wedge this information into EXPLAIN, and I told them I wouldn&#8217;t do that; <a href="http://en.oreilly.com/mysql2008/public/schedule/detail/300">EXPLAIN is a tabular output that doesn&#8217;t make much sense unless you really know how to read it</a>. When you&#8217;re trying to understand a query plan, which is generally a tree of relational operators, you need a <a href="http://www.xaprb.com/blog/2007/07/29/introducing-mysql-visual-explain/">hierarchical view of it</a>.
*   They told me that they use the INFORMATION_SCHEMA extensively, but I did not get a chance to look at it myself.
*   They also told me that they use UDFs extensively for system management, but again I can&#8217;t confirm.

### Licensing

As you probably know, I&#8217;m a strong believer in <a href="http://www.fsf.org/">Free Software</a>. I am not aware of any plans for Kickfire to release the source code for their modified version of MySQL or their storage engine or optimizer. These are the satellite diamonds that surround the crown jewels: open-sourcing them would make it easier to reverse engineer the chip, which they don&#8217;t want. However, they&#8217;ve promised me that they&#8217;re going to open-source some of the migration tools, etc etc. Not initially, but as time permits; and later they&#8217;ll look at open-sourcing other parts.

I have made sure that they know where I stand on this: I think the ethical thing to do is GPL all the code that they ship, and I think everyone I talked to heard me say that at least once. If you&#8217;re going to buy their magical hardware, you deserve to have the source code for everything that runs on it, too. And they need to release the interface specs for their hardware so people can use it in new and surprising ways. Who knows &#8212; someone could use it to find a cure for cancer.

### Summary

My two days with Kickfire left me with a lot more questions, not surprisingly, and I don&#8217;t think that will change until I actually get access to a machine and start testing it myself. I saw a lot of slideshows; I saw some demos; I walked into the server rooms and saw the pretty blinking lights; but I&#8217;m not going to tell you that Kickfire will do X or Y because I don&#8217;t know a heck of a lot. I was hoping for more hands-on experience and in-depth technical details, but that wasn&#8217;t the way it really worked out. However, based on what I&#8217;ve seen, I have no reason to believe other than that Kickfire&#8217;s system will do what they claim: it will run large, complex queries on very large datasets extremely quickly.