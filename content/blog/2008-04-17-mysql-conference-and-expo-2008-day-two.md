---
title: MySQL Conference and Expo 2008, Day Two
date: "2008-04-17"
permalink: /2008/04/17/mysql-conference-and-expo-2008-day-two/
description:
  - >
    Day two of the conference had less interesting sessions but lots of good
    interactions
categories:
  - SQL
tags:
  - Brian Aker
  - EnterpriseDB
  - Falcon
  - Grazr
  - Maatkit
  - Maria
  - mysqluc2008
  - Patrick Galbraith
  - Percona
  - query cache
  - Tokutek
---
Day two of the conference was a little disappointing, as far as sessions went. There were several time blocks where I simply wasn't interested in any of the sessions. Instead, I went to the expo hall and tried to pry straight answers out of sly salespeople. Here's what I attended.

### Paying It Forward: Harnessing the MySQL Contributory Resources

This was a talk focused on how MySQL has made it possible for community members to contribute to MySQL. There was quite a bit of talk about IRC channels, mailing lists, and the like. However, the talk gave short shrift to how MySQL plans to become truly open source (in terms of its development model, not its license). I think there was basically nothing to talk about there. I had a good conversation about some of my concerns with the speaker and some others from MySQL right afterwards.

There was basically nobody there &#8212; I didn't count, but I'd say maybe 10 or 12 people. I think this is a telling sign.

### Architecture of Maria: A New Storage Engine with a Transactional Design

I was interested in this talk because I'm interested in the tension between Falcon and Maria (and between Falcon and everything, for that matter) but I left and went to the expo hall again after a bit. The talk was good but I'd already seen and/or read it, and the question-and-answer component wasn't enough to keep me there.

### The MySQL Query Cache

This was the second session I gave at the conference, and again it was standing-room-only, with nearly 300 attendees according to the person who was watching the door. The questions were frequent and added a lot to the discussion. Slides will be on the conference website when they post them.

### Grazr: Lessons Learned Building a Web 2.0 Application Using MySQL

I was keenly interested in this talk because a) I am a big fan of Patrick Galbraith's work with many different projects, and b) I had heard a lot about [Grazr][1] but didn't know much about it. However, I missed most of the talk. About ten minutes into it, I got a call I couldn't refuse: my wife!

However, I did sneak back into the room for the last bit too. And I gave Grazr a try. Unfortunately, I got really confused by it; I tried a bunch of different ways to import my Google Reader's OPML. I got that to work, but then I couldn't figure out how to read the feeds in the OPML via Grazr. Then I think I figured that out (I'm not sure) but it didn't strike me as a very handy way to read my feeds. I'll try taking another look at it later if I get time. (I'm all ears if there's a better way to read feeds).

### Extending MySQL

This one was mostly for fun. I knew a lot about UDFs already (I've created some) and I knew about the pluggable storage engine API. But I didn't know about pluggable event daemons. Holy cow, what a great way to shoot yourself (or your server) in the foot! All the power of an atomic bomb, with all the safety of SPF 5 sunblock in a nuclear attack. Or something like that. But darn, it sure is nifty. Brian is a great speaker too &#8212; very lively.

You know, there's another way to extend MySQL that most people don't seem to know about, which Brian didn't mention. That is procedures (not stored procedures). They are sort of like a post-filter for a result set, and like UDFs they've been around forever. I have never heard of anyone writing their own, but there's an example in the server itself: [PROCEDURE ANALYSE][2].

### Expo hall

I went to the expo hall to meet and greet many of the companies that Percona (my employer) is already working with (doing independent benchmarks, performance verification, analysis etc) or will be in the future. I also wanted to grill some of the vendors on their technology. Usually I find them very cagey; they claim X times faster this-or-that, but won't tell you how, and won't tell you what their systems don't do well. I don't understand why they take this approach; you can't hide your system's strong and weak spots. There is no security through obscurity, and shrewd independent observers are going to get to the bottom of it with or without your permission.

So, for instance, I was talking with [Tokutek,][3] who claimed to be a drop-in replacement for InnoDB with 200x better performance and apparently no downsides. However, on closer questioning, I did get him to admit that the system has table-level locking. Thus it won't give any concurrency, so saying it's a drop-in InnoDB replacement is questionable. And the comparison against InnoDB seemed contrived to create a worst-case situation with bad tuning and a workload so it would perform terribly. An honest comparison tunes both systems to their highest performance and measures them; you can't tune one system as badly as possible and compare it to the other's best-case performance. I pressed on further and asked about range scans in some specific cases (they claim they're great at range queries, and equal to InnoDB on everything else). At last they admitted they can't perform well on some very common queries such as real-life queries InnoDB performs very well on for me. They said these are "point queries" but that's not true; you can design indexes to support many different ways to range-query a table in InnoDB and get great performance. So it sounds to me like Tokutek's storage format is extremely narrowly focused, and there is indeed a trade-off. I will be interested to see how their technology develops, though. It's not done yet.

### In general

There are a lot of Maatkit t-shirts walking around, which makes me happy. If I'd printed 200 of them, I probably could have given them all away. I was wearing a [PostgreSQL][4] t-shirt myself. Proudly, I might add. I'm not the only person here who's interested in PostgreSQL. This morning I met a person from EnterpriseDB.

Yesterday was a bit slow in terms of interesting sessions, but there was a lot going on in the hallways, the expo hall, the meetings over lunch, and so on.

 [1]: http://www.grazr.com/
 [2]: http://dev.mysql.com/doc/refman/4.1/en/procedure-analyse.html
 [3]: http://www.tokutek.com/
 [4]: http://www.postgresql.org/
