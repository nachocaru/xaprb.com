---
title: Summary of beCamp 2008
date: "2008-05-04"
permalink: /blog/2008/05/04/summary-of-becamp-2008/
---
Yesterday I went to [beCamp 2008][1] along with four roomfuls of other people interested in technology (perhaps close to 100 people total). The conference was a lot of fun. Not everything went as planned, but that was as planned. This was an [Open Spaces conference][2] and I thought it worked very well. From an email [Eric Pugh][3] sent:

> Basically it all boils down to:
> 
> Open Space is the Law of Two Feet: if anyone finds themselves in a place where they are neither learning nor contributing they should move to somewhere more productive. And from the law flow four principles:
> 
> *   Whoever comes are the right people
> *   Whatever happens is the only thing that could have
> *   Whenever it starts is the right time
> *   When it's over, it's over

### From Hadoop to Bang-Splat

I used the law of two feet a time or two. In fact, the first session I wanted to go to, which was about [Hadoop][4] and [MapReduce][5], had no knowledgeable attendees. Someone overslept. OK, that's the way it goes: move along.

From there I went to a session about Unix command-line productivity. Most of the sessions I saw were traditional in that they had one person standing up talking and many people sitting and listening, but not all. This one had several clever command-line gurus mentioning their favorite power tips.

I learned about bang-splat and bang-dollar. The bangs have always gotten me in Bash: I avoid them because I've never felt like reading the Bash man page section on them. (Am I too lazy, or not lazy enough?) So it was great to hear some people say "bang-splat and bang-dollar are great" and then explain them. That was easy for me, and now I know how they can be useful to me.

This problem-first type of tip is great for me: tell me the problem, then how to solve it, rather than telling me what the solution is and leaving me guessing what kinds of problems I can solve with it. (The Bash man page is solution-first).

In case you're wondering, bang-splat substitutes the arguments to the last command, and bang-dollar substitutes the last argument of the last command. So, instead of this:

<pre>$ touch file1 file2 file3
$ rm file1 file2 file3</pre>

I can do this:

<pre>$ touch file1 file2 file3
$ rm !*</pre>

There were lots of other nice tips too.

### MySQL Performance

I ended up doing a talk on MySQL performance basics. I had no idea what the audience was looking for, so I winged it. I did make some slides, but most of the talk isn't on the slides. You can get the slides from [Percona's slide page][6]. It seemed to be useful to the folks attending, who had a wide variety of experience and knowledge about MySQL.

### Cloud Computing

This session began with a demo of how to create an entire application stack in a few minutes with [Cohesive Flexible Technologies][7]. Someone else then demoed a similar thing using [RightScale][8]. [rPath][9]'s [Jeff Uphoff][10] was also in the room, but we didn't get to see a demo of that. During this session the talk turned to various topics including a little bit of the topics I wanted to hear about in the Hadoop session.

### Lunch

Lunch was catered Indian food provided by the [Rimm-Kaufman Group][11]. Yum.

### Large Scale Storage

This session was sort of a round-table. The two people who talked the most were [Josh Malone][12] from the [National Radio Astronomy Observatory][13] and the [Library of Congress][14], both of whom have a lot of storage needs they are unsure how to meet. Some people from UVA's library were there as well, but I didn't ask what they were working on.

This reminded me a lot of a [recent keynote Jacek Becla gave at another conference][15]. He's with the Stanford Linear Accelerator Center, who are going to be generating a lotta data pretty soon.

### High Availability Linux

This one started off with more from Josh Malone, who demoed [Nagios][16] briefly and then talked about his storage and backup systems. He uses [BackupPC][17], which sounds pretty neat and very smart. We then talked about some of the things he's looking into doing, with audience suggestions to look into shared storage or [DRBD][18]. We also looked at [UltraMonkey][19] briefly -- it looks like it's stagnating, though. And the [Linux HA][20] project.

### Google App Engine

Finally, someone showed us a [calculator application they'd built on Google App Engine][21], including the code and talking about the data model somewhat. It looks like a neat idea, but the lock-in worries me, a sentiment that was voiced by many others in the room.

 [1]: http://barcamp.org/beCamp2008
 [2]: http://martinfowler.com/bliki/OpenSpace.html
 [3]: http://www.opensourceconnections.com/
 [4]: http://hadoop.apache.org/core/
 [5]: http://labs.google.com/papers/mapreduce.html
 [6]: http://www.percona.com/presentations.html
 [7]: http://www.cohesiveft.com/
 [8]: http://www.rightscale.com/
 [9]: http://www.rpath.com/
 [10]: http://blogs.conary.com/index.php/juphoff
 [11]: http://www.rimmkaufman.com/
 [12]: http://www.cv.nrao.edu/~jmalone/
 [13]: http://www.nrao.edu/
 [14]: http://www.loc.gov/
 [15]: http://en.oreilly.com/mysql2008/public/schedule/detail/1865
 [16]: http://www.nagios.org/
 [17]: http://backuppc.sourceforge.net/
 [18]: http://www.drbd.org/
 [19]: http://www.ultramonkey.org/
 [20]: http://linux-ha.org/
 [21]: http://gi89.appspot.com/
