---
title: "Features I'd like to see in MySQL: CTEs"
date: "2013-09-09"
permalink: /2013/09/09/features-id-like-to-see-in-mysql-ctes/
categories:
  - Databases
---
The pace of MySQL engineering has been pretty brisk for the last few years. I think that most of the credit is due to Oracle, but one should not ignore Percona, Monty Program, Facebook, Google, Twitter, and others. Not only are these organizations (and the individuals I haven't mentioned) innovating a lot, they're providing pressure on Oracle to keep up the improvements, too. 
But if you look back over the last few years, MySQL is still functionally a lot like it used to be. OK, we've got row-based binary logging &#8212; but we had binary logging and replication before, this is just a variation on a theme. Partitioning &#8212; that's a variation on a theme (partitioned tables are a variation on non-partitioned tables). Performance &#8212; same thing, only faster. And so on. 
I'm painting things with too broad a brush. There's actually a lot of stuff that's NOT just a variation. 
But if you look around at what's out there in other open-source DBs, there's a lot of innovation, particularly in PostgreSQL, which has had CTEs (common table expressions) for a while. CTEs are not a variation on a theme. They are major new feature, analogous to going from no-subquery-support to supports-subqueries. They enable a lot of things like recursive queries, making a SQL database useful in many more types of situations &#8212; think graph-processing, for example, which is downright annoying without them. 
Will we see CTEs in MySQL soon?
