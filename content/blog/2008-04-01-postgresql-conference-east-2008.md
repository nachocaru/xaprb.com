---
title: PostgreSQL Conference East 2008
author: Baron Schwartz
excerpt: '<p><a href="http://www.postgresql.org"><img src="http://www.postgresql.org/layout/images/hdr_left.png" width="230" height="80" alt="PostgreSQL" style="float:right" /></a>As a I wrote a couple of days ago, I went to the second day of <a href="http://postgresqlconference.org/">PostgreSQL Conference East 2008</a> last Sunday.  I had a good time and really enjoyed meeting everyone, listening, learning, and occasionally talking.  I asked a number of fearless-newbie questions that paid off handsomely: people were very willing to humor me.</p>'
layout: post
permalink: /2008/04/01/postgresql-conference-east-2008/
description:
  - >
    PostgreSQL Conference East 2008 was a great chance for me to learn about
    Postgres and meet people.
tags:
  - Bruce Momjian
  - conference
  - EnterpriseDB
  - Hibernate
  - Joshua Drake
  - Lewis Cunningham
  - Magnus Hagander
  - MySQL
  - Nikolay Samokhvalov
  - pgconference08
  - PostgreSQL
  - Robert Treat
  - Selena Deckelmann
  - XML
---
[<img src="http://www.postgresql.org/layout/images/hdr_left.png" width="230" height="80" alt="PostgreSQL" style="float:right" />][1]As a I wrote a couple of days ago, I went to the second day of [PostgreSQL Conference East 2008][2] last Sunday. I had a good time and really enjoyed meeting everyone, listening, learning, and occasionally talking. I asked a number of fearless-newbie questions that paid off handsomely: people were very willing to humor me. I also left with a beautiful t-shirt, mug, and bag combo thanks to [EnterpriseDB][3]. The bag has already been put to use for a grocery shopping trip.

Note to conference/website organizers: I can&#8217;t link to anything but the front page, so I assume my link above will someday point to the 2009 conference, or the 2008 West conference. It would be good to give each event a permalink right from the start&#8230;

One thing that surprised me was the distance people traveled to attend. I thought this would be an east-coast USA thing, but people came from Portland, Russia, and beyond.

### Roundtable

The first event was an open discussion. At the front of the room were [Bruce Momjian][4], [Joshua Drake][5], [Magnus Hagander][6], and [Selena Deckelmann][7]. The first question was about the future of Postgres: what are the goals for the 9.0 release? The answers varied, but generally the sense was that in the future Postgres should continue to add more features and not only catch up to, but surpass the &#8220;big boys.&#8221; Special mention went to recursive queries, windowing functions, point-in-time recovery, and more standards compatibility.

This was followed by a lengthy discussion on user groups, global vs. local, and so on. One interesting quote here is that no one can buy Postgres because there&#8217;s literally no one to buy it from.

After that I poked my hand up and asked what you say to people migrating from other RDBMSs, such as MySQL. I received a warm welcome, a statement that Postgres is hands-down superior to MySQL period, and a lot of interesting commentary on the differences in the communities between the two. I have been thinking a lot on the MySQL community and am not yet ready to put my thoughts into words, so I&#8217;ll just give an overview of what the panelists said: the communities are quite opposite in many respects, both organizationally and psychologically.

This was followed by a question about how to encourage development of a feature that &#8220;people need.&#8221; This also went quite deep into the open-source mindset and development methodology, with people pointing out that the Postgres community is a meritocracy and you cannot co-opt it with money. At the same time, what &#8220;the community&#8221; wants isn&#8217;t what goes into the codebase: the itches that get scratched are the hacker itches, not the community itches. Sometimes these are one and the same.

Apparently one of the community itches is in-place upgrades. I gather that an upgrade requires a dump and reload because releases are not capable of reading files written by previous releases. This sounded like a pretty severe problem, yet the &#8220;hacker itch&#8221; wasn&#8217;t there. People said that they frequently get told &#8220;that&#8217;s already solved: dump and reload.&#8221; Not a solution with large data volumes.

The discussion then turned to why more people aren&#8217;t capable of meeting their own needs. My personal belief here is that the big corporations are buying the minds of the smart people by infiltrating universities and schools, and we (we the citizens of the USA, not we the hackers) are just standing by and letting it happen as though it&#8217;s a good thing for powerful vested interests to be &#8220;giving&#8221; our schools &#8220;free&#8221; software and other things that they cannot inspect, hack, and change. The other problem is that universities aren&#8217;t teaching data. They&#8217;re teaching everything but data, yet that&#8217;s the most important part of the technology economy today. Tools are not as important: they exist only to work with data. You&#8217;re lucky to find someone who&#8217;s been university-educated in any database, much less an open-source or Free Software one.

Most of what I heard from the panel agreed with my personal views, but they didn&#8217;t focus on the problem in the university as much as I feel is important. And just as importantly, perhaps I didn&#8217;t hear enough recognition as I wished that there&#8217;s a real chance to change this: commercial/opensource companies like EnterpriseDB can really pull a long lever here by counter-infiltrating the classroom. Aside from just legislating the proprietary software right out of the classroom &#8212; which I think would be a good start &#8212; we can subvert them also.

Around this point someone in the room opined that one of the things that&#8217;s unique about Postgres is the difficulty of finding a competent DBA, and the expense of hiring them. This person said that it&#8217;s easy to find Oracle DBAs, and you can hire a good MySQL DBA a dime-a-dozen for $35,000 USD per year. I kept my mouth shut, but suffice to say [this is not my experience at all][8]. I think we&#8217;re all in the same boat here, and this is a case of the grass looking greener on the other side.

The great quote I heard in this session was &#8220;We take Oracle DBAs and try to break them.&#8221; Someone please step up and take credit for that one :-)

### SQL/XML for Developers

This talk was by [Lewis Cunningham][9] of EnterpriseDB. He introduced people to XML and then showed the functions that have recently (which release?) been added to Postgres for manipulating XML documents and document fragments. There&#8217;s also a native XML datatype, which I asked a few questions about. Apparently it is TEXT under the hood, with a well-formedness check in front of it. I asked a little about the storage format, and was told TEXT is stored out-of-line for large values, lz-compressed, and not allocated a page-at-a-time as with MySQL&#8217;s InnoDB engine (so it&#8217;s not as wasteful &#8212; I wanted to get a sense of whether it would be very inefficient to store XML in Postgres from the memory/disk point of view).

The XML functionality in Postgres is built upon the excellent and ubiquitous [libxml2][10] library. The developer who coded the XML functionality was also in the room. His name is [Nikolay Samokhvalov][11].

I asked about indexing. Since Postgres offers functional indexing (that is, you can index the result of a function &#8212; not &#8220;its indexing works&#8221;), in theory you could index XML documents by indexing the result of an XPath expression, for example. I was looking for the &#8220;yes, but&#8221; and I got it: there are some planner (query optimizer, for MySQL folks) limitations to this approach.

The great quote from this session was the response to &#8220;what would you use instead of Hibernate?&#8221; ([Hibernate][12] is a Java ORM system). The response was &#8220;hand-code it in assembly.&#8221; Beautiful.

### Big, Bad, Broken, PostgreSQL

This talk was by [Robert Treat][13] of [OmniTI][14]. He described how a data warehouse turned into a train wreck and how they recovered it. The exact cause of failure is apparently still not known. But it sounded like an interesting, sleepless time. This was a pretty [technical discussion][15]. One thing I found interesting was the definition of &#8220;large&#8221; data warehouse. To my mind, a terabyte or two isn&#8217;t exceptionally large. Is that very large in the Postgres world? I&#8217;m not trying to be a jerk&#8230; just trying to understand. I think one of the reasons it might be large goes back to what people were saying about the need to dump and reload for every upgrade: doing that for a TB of data sounds like a significant barrier to building really large systems.

### Monitoring PostgreSQL with ptop

This session was given by [Selena Deckelmann][7]. [ptop][16] is a top clone that is literally derived from the Unix top utility. It has the ability to monitor current queries as well as looking at the statistics from the operating system itself.

(Tangent: This is an interesting approach, and one which an [innotop][17] user has said he&#8217;s working on adding to innotop. innotop can monitor many systems at once, but it doesn&#8217;t monitor the operating system &#8212; it talks only to the MySQL server. This user was talking about opening an SSH connection to each server and looking at /proc/vmstat and /proc/diskstats as well).

Sorry for going off on a tangent. Anyway, ptop is a C app that Selena and one other person maintain. It can show the current processes, list of locks, explain queries, and so on. One interesting limitation is that it can&#8217;t monitor a whole server: it&#8217;s constrained to a single database. I gather this is because PostgreSQL&#8217;s statistics views, which it queries, are per-database.

### Afterward

After the conference ended, a few of us piled into cars and followed Bruce into DC for a tour. We visited the Lincoln Memorial, the Viet Nam Memorial, went through the World War II memorial, and up to the Washington Monument. At this point I split and went back home.

All in all a great time and great people, and I&#8217;m sorry I missed the first day. This event is so close to me (3 hours drive) that I will really try to make the entire weekend next time, unless it again conflicts with my wife&#8217;s 10-mile race schedule.

 [1]: http://www.postgresql.org
 [2]: http://postgresqlconference.org/
 [3]: http://www.enterprisedb.com/
 [4]: http://momjian.us/
 [5]: http://www.commandprompt.com/blogs/joshua_drake/
 [6]: http://people.planetpostgresql.org/mha/
 [7]: http://www.chesnok.com/daily/
 [8]: http://www.xaprb.com/blog/2008/03/06/send-your-employees-to-the-mysql-conference/
 [9]: http://lewiscunningham.com/
 [10]: http://xmlsoft.org/
 [11]: http://postgresmen.ru/
 [12]: http://www.hibernate.org/
 [13]: http://www.oreillynet.com/pub/au/2723
 [14]: http://www.omniti.com
 [15]: http://www.youtube.com/watch?v=wwd_d_nYxdI
 [16]: http://ptop.projects.postgresql.org/
 [17]: http://code.google.com/p/innotop/