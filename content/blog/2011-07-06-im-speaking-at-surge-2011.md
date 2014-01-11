---
title: "I'm speaking at Surge 2011"
date: "2011-07-06"
permalink: /2011/07/06/im-speaking-at-surge-2011/
categories:
  - Conferences
  - Scalability
  - SQL
---
I'll be speaking at [Surge][1] again this year. This time, unlike last year's talk, I'm tackling a very concrete topic: [extracting scalability and performance metrics from TCP network traffic][2]. It turns out that most things that communicate over TCP can be analyzed very elegantly just by capturing arrival and departure timestamps of packets, nothing more. I'll show examples where different views on the same data pull out completely different insights about the application, even though we have no information about the application itself (okay, I actually know that it's a MySQL database, and a lot about the actual database and workload, but I don't need that in order to do what I'll show you). It's an amazingly powerful technique that I continue to find new ways to apply to real systems.

Take a look at the other speakers too &#8212; it is an impressive lineup. I hope you can attend. Last year's show was a great event.

 [1]: http://omniti.com/surge/
 [2]: http://omniti.com/surge/2011/speakers/baron-schwartz
