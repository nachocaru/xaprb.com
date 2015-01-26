---
title: Scalability, performance, capacity planning and USL at Hotsos Symposium
url: /blog/2012/03/07/scalability-performance-capacity-planning-and-usl-at-hotsos-symposium/
date: "2012-03-07"
categories:
  - Conferences
  - Scalability
  - Databases
---
I presented at this year's [Hotsos Symposium][1]. I am searching for a claim to specialness, and I think it may be that I am the first Hotsos presenter who's specifically focused on MySQL. True? I don't know, but I'll run with it for now.

> [VividCortex](https://vividcortex.com/) is the startup I founded in 2012. It's the easiest way to monitor what
> your servers are doing in production. It does TCP network
> traffic analysis. VividCortex offers [MySQL performance
> monitoring](https://vividcortex.com/monitoring/mysql/) and [PostgreSQL
> performance management](https://vividcortex.com/monitoring/postgres/) among many
> other features.


My topic was on extracting black-box performance metrics from TCP packet headers and timestamps and finding hidden performance problems in the system, without any knowledge of what the client and server are talking to each other about. I then extended the same data to performance and scalability modeling, which you can use for purposes such as forecasting, capacity planning, and bottleneck analysis.

This technique works on MySQL because its TCP protocol is half-duplex, and it'll work for any system with a half-duplex protocol. Does it work on Oracle Database? I am not sure, and no one else I've spoken to yet has been certain either. I can probably find out with a little research into the Oracle Database protocol.

I wrote a white paper that goes into my presentation topics in more details. You can find it [here][2], along with sample data and commands that you can use to reproduce my results. This covers Part I of my presentation, and I will publish another white paper with Part II in a while; probably after the [MySQL conference][3] in April.

My techniques are based on models and approaches that [Neil Gunther][4] developed, and Neil himself presented just after I did. His talk was about power-law distributions, and how a log-log plot renders a power-law relationship as linear. It turns out that power laws are related to fractals, the coastline of Britain, the frequency of word usage in the English language, and [response time in Oracle workloads][5]. I'm sure he will post some details on his [blog][6].

After the day's sessions ended, I ended up talking to Neil for a while. He explained and clarified a lot of things I didn't understand about his work, such as the relationship between repairman queueing and the Universal Scalability Law. He also saw through a variety of my misconceptions and set me straight. Apparently I need to attend one of his training classes. We followed this by eating dinner and sharing a bottle of wine until late in the evening, and Neil wouldn't let me pay in the end. A most enjoyable meal and conversation. Next time it's on me!

