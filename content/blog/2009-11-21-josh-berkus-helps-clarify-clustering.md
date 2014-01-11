---
title: Josh Berkus helps clarify clustering
date: "2009-11-21"
permalink: /2009/11/21/josh-berkus-helps-clarify-clustering/
categories:
  - Databases
---
If you haven't seen it, [Josh Berkus has a very concise way][1] to look at the confusing mess that is database "clustering" from the point of view of three distinct types of users: transactional, analytic, and online. I think that using this kind of distinction could help keep discussions clear &#8212; I've seen a lot of conversations around clustering run off the rails due to disagreements about what clustering means. MySQL Cluster, for example, is a huge red herring for a lot of people, but it seems to be a difficult process to learn it well enough to decide. If we called it a clustering solution for transactional users, but not for analytic or online users, it might help a lot.

 [1]: http://it.toolbox.com/blogs/database-soup/the-three-database-clustering-users-35473
