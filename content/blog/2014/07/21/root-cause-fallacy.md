---
title: "The Root Cause Fallacy"
date: "2014-07-21"
url: /blog/2014/07/21/root-cause-fallacy/
categories:
  - Operations
---

Wouldn't you like to find the root cause of that downtime incident? Many people
would. But experience has taught me that there is no such thing as a single root
cause. Instead, there's a chain of interrelated causes, each of which is
necessary but none of which is sufficient to cause the overall problem.

I am often reminded of an outage years ago. It was "caused" by a failed disk.
But the disk was in a RAID5 array, and another disk in that array had failed
some time previously. Backups had also failed some time previously, so there
were no backups. Health checks didn't notify anyone of the degraded disk array,
due to a misconfigured alerting system. Alerting and backups failed because the
person in charge of operations was not performing his duties.  The operations
person was still in the driver's seat because of management dysfunction.

If you really want to get to the root cause of a problem, you need to use the
Five Whys approach. I rarely do that because I already know where it ends. The
CEO or equivalent is always the problem. It's turtles all the way down (or up).
Saying that the CEO is ultimately responsible is true but useless. The CEO is
ultimately responsible for *everything*.

![Turtles](/media/2014/07/turtles.jpg)

<!--more-->

That's why the search for a root cause is usually a witch-hunt in disguise, trying
to find someone or something to blame. If you think there is really a single
cause, you eventually must identify a single person. If you stop short of that,
everyone knows the process was a farce. But blaming a person is also a farce.
Everyone knows that someone's being thrown under the bus and that wasn't the
real problem.

There are several solutions to this dilemma. One is to stop looking for a
*single* root cause, and instead identify the *system* of conditions or
dysfunctions that jointly caused the observed problem. This allows something
constructive to come out of the postmortem, instead of inexorably bringing
pressure to bear on a well-meaning person who will then be sacrificed to appease
the false gods of reductionist blame-gaming.

Another is to change the culture and own failures as opportunities. Navigating
this can be tricky. I've heard from more than one person who was fired from a
workforce with a supposedly "blameless culture" policy after tripping over a
booby-trap. I haven't attended one yet, but I've heard that Dave Zwieback's
postmortem workshops are excellent.

More and more people I speak to are either doubtful or outright reject
root-cause analysis these days. That's a good thing. I used to be pressured for
root-cause analysis years ago, and there was always an airtight and unspoken
assumption that *of course* such a thing exists and is the right way to handle
the aftermath of an incident. I'm happy the times are changing. These days, even
some companies have stopped saying their tools or products can find root causes.
Maybe this trend will allow us to replace the manifest failures of root-cause
analysis with something more helpful.

[Pic Credit](https://www.flickr.com/photos/animaltourism/5096371069/)
