---
title: Sessions of interest at MySQL Conference and Expo 2009
author: Baron Schwartz
layout: post
permalink: /2009/04/11/sessions-of-interest-at-mysql-conference-and-expo-2009/
categories:
  - Conferences
  - Maatkit
  - SQL
---
I haven&#8217;t really decided my schedule yet during the [conference][1], but I thought I&#8217;d mention these sessions that look interesting to me.

I&#8217;m presenting a session on [how to use Maatkit][2], which I think attendees will get a lot of benefit from.

*   Tuesday 
    *   This is Not a Web App: The Evolution of a MySQL Deployment at Google (keynote). Mark Callaghan, need I say more?
    *   MySQL and Search at Craigslist. Jeremy has gotten back into technical work after a career at Yahoo! that seemed to lead him away from his heart&#8217;s desire. I&#8217;d like to hear about the things he&#8217;s done, especially since I understand it involves replacing a lot of overloaded MySQL machines with a few underloaded Sphinx machines.
    *   Distributed Innodb Caching with memcached. Matt and Yves have been doing really ground-breaking work here. It might not seem revolutionary, but it is: they&#8217;re dipping their toes into the future when optimizing code for slow, sequential-access disks is a crime.
    *   Rethinking MySQL, Enter Drizzle. I doubt I&#8217;ll be able to get in the door for this one.
    *   If You Love It, Break It: Testing MySQL with the Random Query Generator. Ah, that sounds nifty.
    *   The PBXT Storage Engine: Meeting Future Challenges. I continue to watch PBXT keenly. IMO it is one of the key storage engines of the future.
    *   Advanced Query Manipulation with MySQL Proxy. Proxy is a tool that&#8217;ll only become more useful in the future, too.
    *   Introduction to Using DTrace with MySQL. I&#8217;d like to learn about DTrace.
    *   Solving Common SQL Problems with the SeqEngine. It&#8217;s Beat Vontobel &#8212; he always amazes and delights the audience.
    *   MySQL Proxy Meets: Binlogs. Hmm, I think there&#8217;s a lot going on behind the scenes here. I think Jan is being shy and has something really nifty to unwrap.
    *   Understanding and Control of MySQL Query Optimizer: Traditional and Novel Tools and Techniques. Sergey&#8217;s talks are always interesting for true propeller heads.
    *   Faster Data Reduction and Smoothing for Analysis &#038; Archival in MySQL. I think a lot of my clients could benefit from this!
*   Wednesday 
    *   The [Percona Performance Conference][3]. From 8:30 AM to 10:30 PM, and I think every single session is a must-see. But I&#8217;m biased, because I helped pick sessions.
    *   Using Q4M: A Message Queue Storage Engine for MySQL. Queues are one of the hardest design patterns to scale with traditional techniques. Anyone who has a queue (jobs to process, comments to moderate, articles to approve, clicks to aggregate, &#8220;stuff to do and then mark as done&#8221;) should get something from this.
    *   libdrizzle: A New Client Library for Drizzle and MySQL. I really think the Drizzle developers&#8217; work will have far-reaching impacts.
    *   Monitoring 101: Simple Stuff to Save Your Bacon. What it says.
    *   High Availability and Scalability Patches from Google. Good luck fitting in the door on this one, too.
    *   SAN Performance on a Internal Disk Budget: The Coming Solid State Disk Revolution. More from Matt Yonkovit.
    *   Innodb Database Recovery Techniques. Obligatory plug &#8212; Peter Zaitsev.
    *   MySQL Performance on EC2. Mark Callaghan? Mark Callaghan! But I have not a clue about this one. I didn&#8217;t know he was into EC2. Google doesn&#8217;t outsource their infrastructure, do they?
    *   There are several time slots on Wednesday when there is nothing of great interest to me. I will be at the Maatkit dot-org booth in the expo hall during this time, or maybe at the Percona conference.
*   Thursday
    *   More Percona Performance Conference. Fill your brain! More, more, more!
    *   Deep-inspecting MySQL with DTrace. I can&#8217;t decide whether this or the earlier one is likely to be better. Domas is a wizard.
    *   Map/Reduce and Queues for MySQL Using Gearman. Gearman is something I have my eyes on &#8212; either that or Spread. For a secret project.
    *   MySQL Support Internals. They run a world-class operation and they&#8217;re my competition.
    *   Dormando&#8217;s Proxy for MySQL. Just because.
    *   Advanced Master-Slave Replication with Tungsten Failover. I keep meaning to evaluate this, but haven&#8217;t had time.
    *   Memory Management in MySQL and Drizzle. A specialized topic, and Stewart knows a lot of stuff.
    *   memcached Functions for MySQL: Seemless Caching in MySQL. There&#8217;s a lot of neat stuff here.
    *   MySQL Row Change Event Extraction and Publish. From Google. What else are they up to?
    *   InnoDB Performance and Usability Patches. By Vadim. This is a must-see for anyone who wants leading edge InnoDB features and performance. Percona&#8217;s work isn&#8217;t very well documented (yet) so this will be a great way to learn about the stuff we&#8217;ve done that you might not otherwise find out.
    *   SPIDER Storage Engine: Database Sharding by Storage Engine. This one is interesting. It looks like Federated with parallelism and potentially other features. I looked at the source, but it is really unclear to me what it does, and there is nary a comment to be found.
    *   **Make Your Life Easier with Maatkit**. I think I&#8217;ll attend this one, since I&#8217;m presenting.
I&#8217;ll be spreading my time out over a lot of different things, and I don&#8217;t think I&#8217;ll be getting much sleep at the conference, so I&#8217;ll have to see what I can fit in. But these are the sessions I think look the most interesting.

 [1]: http://www.mysqlconf.com/
 [2]: http://www.mysqlconf.com/mysql2009/public/schedule/detail/5677
 [3]: http://conferences.percona.com/