---
title: Sending the query to the data
date: "2013-09-13"
permalink: /blog/2013/09/13/sending-the-query-to-the-data/
categories:
  - Databases
---

It's common wisdom that large-scale database systems require distributing the data across machines. But what seems to be missing in a lot of discussions is distributing the query processing too. By this I mean the actual computation that's performed on the data. 

I just had a conversation with Peter Zaitsev yesterday that helped make concrete some thoughts I've been having about Cassandra for a while. Because Cassandra doesn't allow you to really do any computation in the data (aggregating, evaluating expressions, and so on), if you're going to use it for truly Big data, you're going to fetch enormous amounts of data across the network. Sure, you're distributing the storage and retrieval across many machines -- but you're locating your data far from your processing. You have a distant low-level key-value store, in essence, and you have to write a database wrapper on top of it if you're going to use it for anything non-trivial. 

The queries need to be sent to the data in fragments. Breaking up the query, sending fragments of them to the appropriate location close to the data, evaluating them, perhaps sending them along with partial results to further nodes and continuing, and eventually (or incrementally) assembling final results and streaming them back to the client, is a big piece of the puzzle that's missing in many systems with similar designs. Some other systems do offer so-called distributed processing (usually in the form of a kind of map-reduce) but I haven't seen a smart open-source implementation of it yet. By smart I mean high-performance, efficient, and generalized/generalizable, such that it has very few bad-behavior edge-cases. I've seen some systems that, if you have just the right data and queries, will work ok for limited use cases but fall back (with no protection) to worst-case full-cluster-scan nightmares for other types of queries. 

Distributed hash tables with simple storage and retrieval aren't enough, no matter how much frosting is applied, unless they can also do computation. Both data and queries need to be distributed in a distributed system. I think this is one reason why people continue to shard with technologies they know, such as MySQL. For specialized use cases it's often not all that hard to write a sharded system that is optimized for the particular types of data access needed, and MySQL has pretty sophisticated abilities to do computations close to the data, in comparison with most open-source distributed key-value stores.

