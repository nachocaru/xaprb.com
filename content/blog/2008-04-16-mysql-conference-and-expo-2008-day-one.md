---
title: MySQL Conference and Expo 2008, Day One
date: "2008-04-16"
permalink: /2008/04/16/mysql-conference-and-expo-2008-day-one/
description:
  - The first day of MySQL Conference and Expo was a great success.
categories:
  - Maatkit
  - PostgreSQL
  - SQL
tags:
  - Beat Vontobel
  - benchmarks
  - InnoDB
  - Lars Thalmann
  - Mats Kindahl
  - mysqluc2008
  - Paul McCullagh
  - pbxt
  - Percona
  - Peter Zaitsev
  - replication
  - Sergey Petrunia
  - Sphinx
  - Su Doku
  - The Blob
  - Vadim Tkachenko
---
Today is the first day at the conference (aside from the tutorials, which were yesterday). Here's what I went to:

### New Subquery Optimizations in 6.0

By Sergey Petrunia. This was a similar session to one I went to last year. MySQL has a few cases where subqueries are badly optimized, and this session went into the details of how this is being addressed in MySQL 6.0. There are several new optimization techniques for all types of subqueries, such as inside-out subqueries, materialization, and converting to joins. The optimizations apply to scalar subqueries and subqueries in the FROM clause. Performance results are very good, depending on which data you choose to illustrate. The overall point is that the worst-case subquery nastiness should be resolved. I'm speaking of WHERE NOT IN(SELECT&#8230;) and friends. It remains to be seen how this shakes out as 6.0 matures, and what edge cases will pop up.

### The Lost Art Of the Self Join

This was just great. Among many other things, Beat Vontobel showed how a Su Doku can be solved entirely with declarative queries: a very large self-join query against a table of digits and a table of the board's initial state. I had been promoting this session because last year's was so very good. I can't wait to see what he comes up with for next year. Can he find another creative idea? Time will tell.

He wasn't able to solve a 9&#215;9 puzzle with MySQL because of the limitation on the number of joins, but PostgreSQL had no trouble doing it.

### EXPLAIN Demystified

This was my session, of course. (Slides will be on the O'Reilly conference site, if they aren't already). It went great, I thought. The room was full and people were standing in the back of the room and in the door. The questions came fast and furious; all really good questions. I think we ended up exploring a lot of the MySQL query execution method, strengths, and weaknesses by the time we were through. And I gave away all the remaining Maatkit t-shirts. Hopefully the people who took them will wear them tomorrow and the conference will be sea of deep, rich red shirts.

Someone did an audio recording of the session, but I don't recall who it was.

### Investigating InnoDB Scalability Limits

This session was given by Peter Zaitsev (disclosure: I now work for [Percona][1], the company he co-founded). Peter and Vadim Tkachenko spent a lot of time over the last weeks and months running a dizzying array of benchmarks on MySQL 5.0.22, 5.0.51, and 5.1.24 (if I recall the versions correctly). They were able to show InnoDB's scaling patterns for a number of different micro-benchmarks on a variety of configurations. If you didn't attend, please look up the slides if you care about InnoDB performance. A lot of work went into the benchmarks &#8212; a lot of work. The slides should be on the conference website or on our blog, <http://www.mysqlperformanceblog.com/>.

### Replication Tricks and Tips

Lars Thalmann and Mats Kindahl gave this session. At a high level, I'd say it was a run-down of all the different ways you can use MySQL replication. Replication is really a flexible tool, and they covered a large array of the most important ways you can use it to achieve different purposes. Many of the techniques they mentioned are implemented by various tools in [Maatkit][2]. A couple of the others are implemented in [MySQL Master Master Manager][3] and [MySQL Semi Multi-Master][4] tools. Don't re-code these! You can save weeks of work and get quality code by using the pre-built tools. (I built Maatkit, so I know exactly how tricky it is to get some of these things right.)

### BoF Sessions

I dropped in on a few BoF sessions, including the Sphinx one and the PBXT/Blob Streaming one. (Keep an eye on the PrimeBase folks &#8212; they are up to great things.) Ronald Bradford protected me from those who wanted to get me drunk. Hint: it's really easy&#8230; I have to say, though, Monty's black vodka was amazing.

Speaking of Blob Streaming, Paul McCullagh and I were talking earlier in the day about the project's name, MyBS. This has been smirked about a few times. I think it's a great name, because after all my initials are BS (I usually insert one of my four middle names in to alleviate this problem, but I digress). The conversation went like this:

Me: I like it. My initials are BS.

Paul: BS actually means British Standard, so it can't be bad.

Me: Better than American Standard. That's a toilet.

We also debated the merits of watching the original move The Blob. It's a classic. It must be good.

 [1]: http://www.percona.com/
 [2]: http://www.maatkit.org/
 [3]: http://code.google.com/p/mysql-master-master/
 [4]: http://code.google.com/p/mysql-mmre/
