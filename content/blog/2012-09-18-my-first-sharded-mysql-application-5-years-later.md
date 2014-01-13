---
title: My first sharded MySQL application, 5 years later
date: "2012-09-18"
url: /blog/2012/09/18/my-first-sharded-mysql-application-5-years-later/
categories:
  - Databases
---
High Performance MySQL has a long discussion on "sharding," examining many options and their benefits and drawbacks. What does sharding look like in the real world?

Years ago I helped shard a MySQL-based application, partitioning its data across multiple database servers. It was already pretty large and significantly complex, so as usual for applications that aren't designed with sharding in mind from day one, a major consideration for sharding was to make the migration strategy workable and minimize the disruption to the application code. It's never easy to build this in after the fact, but there is a clear line between approaches that keep the business running and those that don't.

We chose to shard by client. Each of the major tables had a client column already, and clients could be grouped onto servers without much effort. In addition, we maintained a one-to-one mapping of application servers with the database servers, and created DNS subdomains for each group of clients. This helped us minimize the code complexity and the need for central coordination. Instead of applications starting up and trying to figure out which clients they were supposed to manage, they just connected to their "master" DNS entry and looked for what existed. They had no knowledge that there were other shards and other clients out there on other servers. There were no cross-shard queries. This seemed hackish to me at the time, but in hindsight it was a very strategic choice.

The migration strategy was simple, also a very good choice. We provisioned and started the shard servers, and cloned the existing server's data onto them. Then we simply stopped replication from the existing server, deleted a few rows from the main client table to make some clients "vanish" on each shard, and we were done. Sure, all the other tables had tons of extra rows related to clients on other shards, but that was easy to purge asynchronously with mk-archiver (now pt-archiver in Percona Toolkit).

There was a "global" master server, used for a handful of things that needed central agreement. Initially this was the replication master of all of the shard masters, but then the few remaining things it was used for were migrated to application code, and replication was turned off. It has been a lightly loaded, disconnected little island since then.

There were endless little details, complaining applications that didn't behave right, and so on. All of minor importance, all fairly easily solved. The business was not disrupted at all, as I recall. This was helped by the fact that we built and tested the new system in parallel with keeping the existing system running, just to make sure it would work before we did the cutover.

And now, five years later? Things still look pretty similar. There are little annoyances, of course. "Client 184 -- which shard is that on?" Sometimes we want to run queries across shards. The usual. But things work okay for the most part.

There are some drawbacks. For example, multiple clients' data is co-located in tables, with client columns -- that's a lot of repetitive storing of the same number, over and over. (The tables are now partitioned by client, by and large.) And migrating clients to rebalance shards is laborious. It would be nicer if each client were in its own database, with no client columns. But that would have its own challenges; application code would be a lot more complex, and ad-hoc queries would be even more tedious and annoying to manage.

All things considered, I'm really not sure I'd change a thing.
