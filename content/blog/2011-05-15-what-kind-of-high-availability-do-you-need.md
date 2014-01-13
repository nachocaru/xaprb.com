---
title: What kind of High Availability do you need?
date: "2011-05-15"
url: /blog/2011/05/15/what-kind-of-high-availability-do-you-need/
categories:
  - Databases
---
Henrik just wrote a good article on [different ways of achieving high availability with MySQL][1]. I was going to respond in the comments, but decided it is better not to post such a long comment there.

One of the questions I think is useful to ask is what kind of high availability is desired. It is quite possible for a group of several people to stand in a hallway and talk about high availability, all of them apparently discussing the same thing but really talking about very different things.

Henrik says "At MySQL/Sun we recommended against asynchronous replication as a HA solution so that was the end of it as far as MMM was concerned. Instead we recommended DRBD, shared disk or MySQL Cluster based solutions." Notice that all of those are synchronous technologies (at least, the way MySQL recommended them to be configured), generally employed to ensure a specific desirable property -- no loss of data. But "I must not lose any committed transaction" and "my database must be available" are actually orthogonal requirements. One is about availability, the other is durability.

A lot of people who say they want High Availability actually want High Durability.

There are a great many MySQL users for whom writes are much less valuable than reads. I would point to an advertising-supported website as a canonical example. If the system isn't available -- that is, available to serve read queries -- then a lot of money is lost. If someone's latest comment on a blog post is lost -- who cares? Money continues to flow.

This is why a lot of people want a system that keeps the database online, even if some writes are lost. Note that loss of writes is not the same thing as consistency -- consistency and durability are also orthogonal for most users' purposes. So we aren't talking about eventual consistency or any of the other buzzwords, but simply "the system must respond to read queries."

Asynchronous replication is well suited to many such users' availability requirements, as long as replication does not fail (halt) through a write conflict or some other failure mode. (It is often perfectly acceptable for it to fail in other ways, as long as it does not halt.) That's why a lot of users are interested in the specific type of "high availability" that a system such as MMM is intended to provide (but, as I mentioned, [actually doesn't provide][2]). In other words, MMM would be great for a lot of people, if it worked correctly.

I have also been exposed to applications for which this kind of availability-trumps-durability paradigm is absolutely unacceptable. The advertising system upon which the advertising-supported website relies for its income is a good example. Users know they can build sites that only need to be available for reads, precisely because they are trusting that Google AdSense is highly available for writes! Delegating writes to someone else is the easiest way to build systems.

There is a place for DRBD and MySQL Cluster, and there are also many situations that are served by neither the DRBD nor the MMM type of solution.

Josh Berkus wrote a while back about [three types of cluster users][3], as opposed to three types of clusters. I think it's helpful to approach the conversation from that angle sometimes too. As a consultant, I almost always do that when I enter a discussion with a customer who wants a "cluster" or "high availability." Those are basically code phrases that tell me I need to start at the beginning and ensure we are all talking about the same requirements!

I also agree with Henrik about the need to turn off automatic failover. In many, many situations this is by far the best approach. Sometimes people state requirements that, if one steps back and looks at them afresh, quite obviously indicate that an automatic failover is the last thing that's desirable. For example, if someone tells me that he expects failover to be required less than once a year, this is almost guaranteed not to be a good case for automatic failover. A system that's tested so infrequently is almost certainly not going to work right when it's needed. In such cases, it's far better to leave everything alone until an expert human can resolve the problem, rather than have a stupid machine destroy what would otherwise be a fixable system.

 [1]: http://openlife.cc/blogs/2011/may/different-ways-doing-ha-mysql
 [2]: http://www.xaprb.com/blog/2011/05/04/whats-wrong-with-mmm/
 [3]: http://it.toolbox.com/blogs/database-soup/the-three-database-clustering-users-35473
