---
title: Josh Berkus helps clarify clustering
author: Baron Schwartz
layout: post
permalink: /2009/11/21/josh-berkus-helps-clarify-clustering/
categories:
  - PostgreSQL
  - SQL
tags:
  - clustering
  - Josh Berkus
  - MySQL Cluster
---
If you haven&#8217;t seen it, [Josh Berkus has a very concise way][1] to look at the confusing mess that is database &#8220;clustering&#8221; from the point of view of three distinct types of users: transactional, analytic, and online. I think that using this kind of distinction could help keep discussions clear &#8212; I&#8217;ve seen a lot of conversations around clustering run off the rails due to disagreements about what clustering means. MySQL Cluster, for example, is a huge red herring for a lot of people, but it seems to be a difficult process to learn it well enough to decide. If we called it a clustering solution for transactional users, but not for analytic or online users, it might help a lot.

 [1]: http://it.toolbox.com/blogs/database-soup/the-three-database-clustering-users-35473