---
title: Is automated failover the root of all evil?
permalink: /2012/09/17/is-automated-failover-the-root-of-all-evil/
categories:
  - SQL
---
Github's recent [post-mortem][1] is well worth reading. They had a series of interrelated failures that caused their MySQL servers to become unavailable. The money quote:

> The automated failover of our main production database could be described as the root cause of both of these downtime events. In each situation in which that occurred, if any member of our operations team had been asked if the failover should have been performed, the answer would have been a resounding no. There are many situations in which automated failover is an excellent strategy for ensuring the availability of a service. After careful consideration, we've determined that ensuring the availability of our primary production database is not one of these situations.
Most automated failover tools receive a lot of engineering effort to answer questions like these: Is the system really dead, or just unreachable? Do I have a quorum, or is there a split brain? Is failover really the right thing to do?

The category I don't often see targeted as much is this question, which I consider far more important: Is the system in a situation that I [the system] know I am capable of resolving correctly? Is anything in a state that I haven't been programmed to understand and assess?

I haven't looked recently at the source code of the systems that Github identified as making wrong decisions, and I don't know Pacemaker. But I know I have spent a lot of time and effort trying to write a specification for a system that could detect whether automated failover would be safe to attempt, and it's *hard*. One thing that's not all that hard, though, is making sure that *only one attempt is made* to do a failover. One of the best ways to create a [nightmare situation][2] is to fail to a standby, then fail away from it. If I ever create an HA tool such as the ones I've designed-but-not-implemented, there will be a hard stop after one attempt. If the standby doesn't look healthy, someone should call a human, end of story.

 [1]: https://github.com/blog/1261-github-availability-this-week
 [2]: http://www.xaprb.com/blog/2011/05/04/whats-wrong-with-mmm/
