---
title: Towards more diversity of speakers at MySQL Conference and Expo
date: "2009-02-06"
permalink: /2009/02/06/towards-more-diversity-of-speakers-at-mysql-conference-and-expo/
categories:
  - Commentary
  - Conferences
  - SQL
---
We (Percona) just [announced our Percona Performance Conference][1], and I wanted to tell you a little more about what we hope to accomplish with this conference. Let me show you some simple math that anyone can do.

There's a handy iCal download of the conference schedule on the conference website. iCal is a plain text format that is easy to parse with a scripting language. I downloaded this year's and last year's schedules, and aggregated the number of times each company and speaker is listed as presenting a session. Here's the [Perl script I used to do the calculations][2]; and here's the result of running the script.

<pre>baron@kanga:~$ perl ics.pl Desktop/*.ics
Desktop/2008.ics
	Number of speakers:              166
	Number of companies:             106
	Number of times Sun/MySQL speak: 73
	Number of times others speak:    131
Desktop/2009.ics
	Number of speakers:              124
	Number of companies:             58
	Number of times Sun/MySQL speak: 85
	Number of times others speak:    76
</pre>

This year's conference so far boasts only half the diversity of last year's in terms of companies represented, and only three-quarters the diversity of speakers. Companies other than Sun/MySQL speak only six-tenths as many times as they did last year. But Sun/MySQL's speakers take the lectern for 12 more sessions than they did last year. Last year, Sun/MySQL's employees spoke only about half as often as employees of other companies; this year Sun/MySQL dominates the roster.

It should be plain that the conference attendees could benefit from a greater diversity of independent experts this year. In fact, I am not the only person who has noticed. Many others, including prominent community members and companies with many employees who'd like to attend, have said unhappy words about it to me. One of the motivations for arranging the [Percona Performance Conference][3] was that users, customers, and community members clearly had a very important set of needs that were not being met. The Percona Performance Conference is explicitly designed to meet those needs. Increasing diversity is just one of the goals. (There are other needs, and we've tried to meet those too, but that's another post.)

We at Percona think the Percona Performance Conference will add value for everyone, *including paying attendees of the MySQL Conference and Expo*. I've heard numerous comments that lead me to believe the Percona Performance Conference will *actually increase attendance at the MySQL conference*, which should put more cash in Sun's coffers, and some of that will hopefully cycle back to support MySQL. This is one way we're [supporting the virtuous circle extolled by MySQL executives][4].

[MySQL's leaders believe in radical transparency][5], and I applaud them for that. Transparency comes not only from interviews with the media, however; it also comes from observers who analyze available information and draw conclusions. For every person who talks, emails, [Twitters][6], chats or [blogs][7] about this year's conference, many others have noticed, remained silent, and just made other plans. We hope some of those people will reconsider and come visit MySQL and Percona in Santa Clara this April. You'll see more diversity than you were expecting. I only regret that the announcement came so late; I know many of you have missed your window of opportunity to afford the travel to this event, or have made other plans.

 [1]: http://www.mysqlperformanceblog.com/2009/02/05/announcing-percona-performance-conference-2009-on-april-22-23/
 [2]: http://www.xaprb.com/blog/wp-content/uploads/2009/02/icspl.txt
 [3]: http://conferences.percona.com/
 [4]: http://www.theopenforce.com/2008/04/two-markets-in.html
 [5]: http://news.cnet.com/8301-13505_3-10130185-16.html
 [6]: http://twitter.com/joped/statuses/1159220807
 [7]: http://dba-mysql.blogspot.com/2009/02/missing-speakers-in-mysql-conference.html
