---
title: Failure scenarios and solutions in master-master replication
date: "2009-08-30"
permalink: /2009/08/30/failure-scenarios-and-solutions-in-master-master-replication/
categories:
  - SQL
tags:
  - clustering
  - failover
  - fencing
  - MMM
  - MySQL
  - replication
  - STONITH
---
I've been thinking recently about the failure scenarios of MySQL replication clusters, such as master-master pairs or master-master-with-slaves. There are a few tools that are designed to help manage failover and load balancing in such clusters, by moving virtual IP addresses around. The ones I'm familiar with don't always do the right thing when an irregularity is detected. I've been debating what the best way to do replication clustering with automatic failover really is.

I'd like to hear your thoughts on the following question: what types of scenarios require what kind of response from such a tool?

I can think of a number of failures. Let me give just a few simple examples in a master-master pair:

Problem: Query overload on the writable master makes mysqld unresponsive
:   Do nothing. Moving the queries to another server will cause cascading failures.

Problem: The writable master is completely unreachable
:   Fence the writable master and promote the standby master.

Problem: The writable master is reachable but unresponsive due to overload-induced swapping
:   Do nothing. Moving the load to another server will cause cascading failures.

I don't want to bias the jury, so I'll stop there and ask you to contribute your failure scenarios and what you think the correct action should be.
