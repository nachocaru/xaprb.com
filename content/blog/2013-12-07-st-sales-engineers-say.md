---
title: "S**t sales engineers say"
date: "2013-12-07"
permalink: /2013/12/07/st-sales-engineers-say/
categories:
  - SQL
---
Here's a trip down memory lane. I was just cleaning out some stuff and I found some notes I took from a hilarious MySQL seminar a few years back. I won't say when or where, to protect the guilty.[1] 
I found it so absurd that I had to write down what I was witnessing. Enough time has passed that we can probably all laugh about this now. Times and people have changed. 
The seminar was a sales pitch in disguise, of course. The speakers were singing Powerpoint Karaoke to slides real tech people had written. Every now and then, when they advanced a slide, they must have had a panicked moment. "I don't remember this slide at all!" they must have been thinking. So they'd mumble something really funny and trying-too-hard-to-be-casual about "oh, yeah, [insert topic here] but you all already know this, I won't bore you with the details [advance slide hastily]." It's strange how transparent that is to the audience. 
Here are some of the things the sales "engineers" said during this seminar, in response to audience questions: 
*   Q. How does auto-increment work in replication? A: On slaves, you have to ALTER TABLE to remove auto-increment because only one table in a cluster can be auto-increment. When you switch replication to a different master you have to ALTER TABLE on all servers in the whole cluster to add/remove auto-increment. (This lie was told early in the day. Each successive person who took a turn presenting built upon it instead of correcting it. I'm not sure whether this was admirable teamwork or cowardly face-saving.) 
    *   Q. Does InnoDB's log grow forever? A: Yes. You have to back up, delete, and restore your database if you want to shrink it. 
        *   Q. What size sort buffer should I have? A: 128MB is the suggested starting point. You want this sucker to be BIG. </ul> 
            There was more, but that's enough for a chuckle. Note to sales engineers everywhere: beware the guy in the front row scribbling notes and grinning. 
            What are your best memories of worst sales engineer moments? 
            *1. For the avoidance of doubt, it was NOT any of the trainers, support staff, consultants, or otherwise anyone prominently visible to the community. Nor was it anyone else whose name I've mentioned before. I doubt any readers of this blog, except for former MySQL AB employees (pre-Sun), would have ever heard of these people. I had to think hard to remember who those names belonged to.*
