---
title: 'Kickfire: stream-processing SQL queries'
author: Baron Schwartz
layout: post
permalink: /2008/04/04/kickfire-stream-processing-sql-queries/
categories:
  - SQL
tags:
  - caching
  - Cg
  - column store
  - CPUs
  - data warehousing
  - Graphics
  - Keith Murphy
  - Kickfire
  - MPP
  - MySQL
  - mysqluc2008
  - pluggable storage engine
  - QPU
  - Von Neumann bottleneck
---
Some of you have noticed [Kickfire][1], a new sponsor at this year's [MySQL Conference and Expo][2]. Like [Keith Murphy][3], I have been involved with them for a while now. This article explains the basics of how their technology is different from the current state of the art in complex queries on large amounts of data.

Kickfire is developing a MySQL appliance that combines a pluggable storage engine (for MySQL 5.1) with a new kind of chip. On the surface, the storage engine is not that revolutionary: it is a column-store engine with data compression and some other techniques to reduce disk I/O, which is kind of par for the course in data warehousing today. The chip is the really exciting part of the technology.

The simplest description of their chip is that it runs SQL natively.

OK, but now you need to do something: *get "SQL chip" out of your mind*. It doesn't work the way you think it does, and your pre-conceived ideas may prevent you from understanding how different this really is. (Everyone says their technology is a paradigm shift, so I expect you to be numb to this phrase.)

I can't explain all of the technology in this post, partially because of NDA, but I want to prepare you for when you do hear the details. If you're like me, you'll miss a lot of stuff because you have tunnel vision, and then you'll say "wait, I get it now! Can you please repeat everything you've been saying for the last hour so I can think about it all over again?"

### An important note

**Very important:** I have not seen this technology, tasted it, smelled it, or benchmarked it. This information is based on discussions with their engineering and other staff. I will not pretend to know anything I don't. I will be spending two days in the lab with the engineers next week, and then I will be able to write in greater detail with more confidence.

### How your computer currently works

To understand how Kickfire's chip works, you need to understand something you probably take for granted: how most chips work. Most computers today use the same architecture they always have: there's data that is held in the CPU, and data that is not. The CPU has registers, which hold a miniscule bit of data &#8211; the data it is currently working with. When the CPU processes an instruction that asks for some more data it doesn't have, the CPU has to go fetch it. In the meantime, the instruction can't complete.

As you might imagine, this is not terribly efficient. Fetching data that's not in the CPU can take hundreds of CPU cycles (or more). To work around this, computer architects have developed a hierarchy of caches: the on-chip cache, the main memory, and the hard drive, to name a few. The caches make it faster to get data when it's not already on hand. And modern chips have a pipeline, too. The pipeline looks at the instructions as they flow towards the CPU, tries to predict which data they're going to need, then pre-fetches it.

In the best case, this works okay. Not always &#8212; for example, the Pentium 4 has a very long pipeline, so the cost of a wrong branch prediction is very high. Another case is when you simply need a lot of data, such as tens of gigabytes. Suppose for your 10GB operation, you're only going to look at each byte once (a common occurrence in data warehousing queries). This renders your caches useless, because caches work on the principle that you're likely to look at recently accessed data again soon.

In these cases, the speed of the computation is constrained by the <a href="http://en.wikipedia.org/wiki/Von\_Neumann\_architecture">Von Neumann bottleneck</a>: the inefficient fetch-compute-wait cycle of constantly going to the memory (or disk) for more data, a teeny bit at a time. Remember, even in-memory data is very slow compared to data that's in the registers. Having a lot of fast memory is not a **solution** to the Von Neumann bottleneck. It's a **workaround** to reduce the cost.

### Kickfire's architecture

Kickfire is designed to work well where today's general-purpose computing architectures run queries slowly because they're sitting on their thumbs much of the time. Think data warehousing: complex queries with lots of data.

What is the industry's answer to this? So-called massively parallel processing, or MPP. Current MPP data-warehousing solutions are special-purpose database software that runs queries on dozens or hundreds of CPUs, which occupy a lot of storage space and require lots of power, hardware, and cooling. "If you throw enough Von Neumann machines at the problem simultaneously, they can answer your questions faster," or so the thinking goes. In other words, the current state of the art is to arrange conventional computers in new ways.

Kickfire takes the opposite approach: *stream processing*. This is a fundamentally different computing architecture. Stream processing is to Von Neumann machines as LISP is to C.

For those of you who aren't LISP programmers, here's another analogy: In stream processing, you take a bunch of data and you shove it through the chip without stopping. Rather than the chip asking for data from the storage subsystem as needed, the data actually gets pushed at the chip. That is, it's push-processing instead of the conventional pull-processing.

Conventional processing is like trying to fill your bathtub from the sink with a paper cup. Stream processing is like putting your tub under the sink and opening the drain.

I'm taking some liberties here, to illustrate the differences. As I said, I haven't seen the wiring diagrams of the Kickfire chip. But hopefully you get the concept.

This is not a new idea. If you've worked with modern graphics cards, you've seen this in action. Programming languages like <a href="http://en.wikipedia.org/wiki/Cg\_%28programming\_language%29">Cg</a> express the stream-processing concepts elegantly. If you've ever been in a classroom full of C++ programmers trying to learn Cg, you've seen how hard it is to grasp this different approach. Essentially, graphics programming on one of these chips is a series of transformations, not a series of instructions. You input some vertexes at one end of the processor, and you tell the chip to do some matrix multiplies and so on. Out pops the result at the other end.

If this doesn't sound much different from instructions&#8230; well, meditate on it. It's like an assembly line, but nobody leaves their station along the conveyor belt. In a traditional CPU, the "person" at the conveyor *constantly* leaves to go get the materials he needs.

Kickfire runs in commodity hardware, and it is just one or two servers, not racks full. Like many other systems designed for large amounts of data, it uses a column data store. Unlike many other systems, it uses an industry standard interconnect and a custom pluggable MySQL storage engine.

### What took so long?

Stream processing is the obvious way to run SQL queries. Some readers may never have thought about it this way, but my guess is that a lot of you already think of SQL in a stream-processing way, even though you might know that computers today really implement it in conventional ways. I have always tried to think of it this way, and I <a href="http://www.xaprb.com/blog/2005/10/03/understanding-sql-joins/">always try to explain SQL as a stream</a>, too.

So when I was on a call with the Kickfire engineers and it finally sunk in, I felt really silly. Why didn't I think of that? It's so obvious.

But then again, most breakthroughs are really obvious in hindsight.

### Performance

I have seen initial benchmark results, but I'm under NDA about them. I can't say any more yet. And I haven't run any benchmarks myself yet, nor have I had access to the hardware. So this is all theoretical until I get my hands on the system. Caveat emptor, your mileage may vary, etc etc.

One thing I'm interested in is how well the system performs for general-purpose queries. When you take it away from complex queries on lots of data, does it still have an advantage? I'll be trying to get an answer to that question next week.

### About Kickfire

They are still in stealth mode and my NDA prevents me from being able to tell you a lot or answer all your questions yet. But someday they will no longer be in stealth mode, and you'll find out everything you want to then.

Hint: they are going to be giving a <a href="http://en.oreilly.com/mysql2008/public/schedule/detail/3286">keynote address</a> on their technology, but there's not much detail in the description. Come to the keynote and find out.

### Why am I writing this?

Well, they promised me chocolate&#8230;

Seriously: I do have an agenda, but there are actually several motivations here. The first is that they initially contacted me because of my involvement with the MySQL community. Of course they're hoping to gain publicity through me, but they also wanted to let the community have some input. I've been sort of a secret liason for you, representing your interests to Kickfire. I've advocated pretty strongly for certain things I'll go into in a later post.

The other reason I'm working with them is that I'm excited about their technology, even though I don't have hard evidence about their claims and benchmarks yet. If what they're saying is true, their product will be very good for the environment. It will let people save a lot of energy (power, cooling, the need to build data centers) and it will help avoid the need to build a bunch of servers. Computers are extremely toxic to manufacture.

I'm also interested in seeing them succeed because I anticipate that even if this product isn't what it claims to be, they'll prove the concept and there will be a competitive rush into this space. That is guaranteed to produce a lot of changes in how people build computers, probably in more areas than just data warehousing. So I'm happy that they're starting this, because others will finish it whether they do or not. And that's good news for the environment, too.

Stay tuned. More details are forthcoming.

PS: if you have questions you'd like me to look into while I'm onsite with the engineers, feel free to post them in the comments. But I probably can't answer them yet.

 [1]: http://www.kickfire.com/
 [2]: http://www.mysqlconf.com/
 [3]: http://www.paragon-cs.com/wordpress/?p=132
