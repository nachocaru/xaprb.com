---
title: Migrating US Government applications from Oracle to MySQL
author: Baron Schwartz
layout: post
permalink: /2009/02/19/migrating-us-government-applications-from-oracle-to-mysql/
categories:
  - Conferences
  - SQL
tags:
  - MySQL
  - MySQL Enterprise
  - Percona
  - Ronald Bradford
---
I just returned from a [MySQL Federal Migration Boot Camp][1], jointly presented by Carahsoft and Sun/MySQL. It was a half-day seminar on the topic of migrating applications to MySQL, targeted to the US Government sector. Specifically, most of the audience seemed to be running Oracle, though there were some users of other systems (Microsoft SQL Server, Sybase, Informix, etc).

[Ronald Bradford][2] presented the whole thing. I thought he did a great job giving a fair and balanced look at topics such as what types of applications are good candidates for migration, what gotchas you might encounter, etc. I&#8217;m sure someone looking at migrating in earnest would benefit from a whole day&#8217;s discussion (or a more focused engagement with a consultant), but I thought it was a great way to help people figure out whether they should dig deeper or just stay where they are.

Here are samples of the questions I heard:

*   Does MySQL provide encryption comparable to Oracle?
*   Can MySQL reach into Oracle to get legacy data?
*   Is there something comparable to Oracle Forms?
*   Can I embed MySQL into remote devices in the field? What license do I need to do that?
*   Can I store JPEG and TIFF images in MySQL?
*   Can I extend the stored procedure language to be PL/SQL compatible?
*   Does MySQL have multi-byte character set support?
*   What level of governance does MySQL have over third-party development?
*   How does MySQL incorporate features back from the community?
*   What is the best reliable source of information about differences between the community and enterprise versions of the server?
*   In terms of high availability, how does MySQL compare to Oracle RAC?
*   Can I do ETL of 400GB of data per hour into MySQL?
*   Does MySQL Enterprise have additional scalability over MySQL Community?
*   Are MySQL Migration tools free? What about for migration from Sybase?
*   Does MySQL not checksum its own data?
*   Is there any comparison to be drawn to migration from other opensource databases to MySQL?
*   Is there any way to store strings with trailing spaces in MySQL?
*   Is DDL replicated?
*   Are there any workarounds for the blocking nature of ALTER TABLE? What about in MySQL Cluster?
*   Is MySQL Cluster shared-everything or shared-nothing?
*   Oracle makes it tedious to keep up with patches. Is MySQL Enterprise easier? Can I get alerts about them? Are they all aggregated together?
*   I&#8217;m on the Community version and I have an Enterprise subscription. Do I have to upgrade to the Enterprise version of MySQL Server?
*   If I have a third-party SNMP monitoring tool, can MySQL Enterprise send SNMP traps to it?
*   Does MySQL Enterprise Gold include replication functionality?

I spoke to some people for a while afterwards. Some of them are MySQL Enterprise customers already and indicated that they&#8217;re actually not using their subscriptions. I asked them whether that&#8217;s important to them, and what is really a value for them; do they mind paying for it if they don&#8217;t use it? Maybe they just see a [MySQL support contract as an insurance policy?][3] (a few heads nodded yes). I asked people what they value in a support or consulting contract. Generally, I think what I heard can be boiled down to the following:

*   They want someone who stands behind the software they&#8217;ve installed, regardless of where that comes from.
*   They don&#8217;t like paying for things they don&#8217;t use.
*   One person said she finds it easier to search the manual for answers than to open a support ticket.

This is not scientific. This is a sample size of just a handful of people.

Afterwards there was a buffet lunch, which was tasty and had a lot of vegetarian options. I traded a few business cards and talked with a couple of people about topics like how you can design MySQL to replace Oracle RAC, which I believe is not a good way to approach MySQL. Maybe I&#8217;ll write more about that separately.

The sales presence during Ronald&#8217;s talk was very supportive &#8212; &#8220;we&#8217;re here if you have questions&#8221; &#8212; and not intrusive. At the very end, one of the sales people showed two slides about MySQL Enterprise, for a total of about 3 minutes, and explained their pricing model. However, from what I heard people say, there is some disconnect &#8212; the sales people think it&#8217;s very simple pricing, but everyone is confused about it. At least 5 people asked me to explain it, but I&#8217;m not sure why. I explained to a few curious people how [Percona&#8217;s pricing models][4] work.

Kudos to Ronald for a balanced and fair look at migration, and thanks to MySQL and Carahsoft for sponsoring the event!

 [1]: http://www.carahsoft.com/events/mysql/02-18-09/mysql02-18-09.html
 [2]: http://42sql.com/
 [3]: http://peterzaitsev.com/2009/02/14/how-support-is-different-from-the-car-insurance/
 [4]: http://www.percona.com/flexible-pricing-advantage.html