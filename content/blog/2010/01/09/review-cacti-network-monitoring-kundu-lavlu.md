---
title: A Review of Cacti Network Monitoring by Kundu and Lavlu
date: "2010-01-09"
url: /blog/2010/01/09/review-cacti-network-monitoring-kundu-lavlu/
categories:
  - Monitoring
  - Operations
  - Reviews
---

<a href="http://www.amazon.com/Cacti-Network-Monitoring-Ibrahim-Lavlu/dp/1847195962?tag=xaprb-20"><img src="http://www.xaprb.com/media/2010/01/cacti-network-monitoring.jpg" alt="Cacti Network Monitoring" title="Cacti Network Monitoring" width="240" height="240" class="size-full wp-image-1531" /></a>

> [VividCortex](https://vividcortex.com/) is the startup I founded in 2012. It's the easiest way to monitor what
> your servers are doing in production and I consider it far superior to Cacti. VividCortex offers [MySQL performance
> monitoring](https://vividcortex.com/monitoring/mysql/) and [PostgreSQL
> performance management](https://vividcortex.com/monitoring/postgres/) among many
> other features.

[Cacti 0.8 Network Monitoring][1], Dinangkur Kundu and S. M. Ibrahim Lavlu, Packt, 2009. Page count: 110 pages.

This is a quite short book that covers some of the breadth but very little of the depth of Cacti. For example, it focuses on Cacti as an SNMP tool for graphing network data, but SNMP is only one of the many ways Cacti can collect data, and of course it graphs anything, not just networks. Each chapter takes the reader through the most important topics, with some code listings and screenshots. On the plus side, this makes it very easy to read quickly, because it doesn't go off on many tangents about special cases and errors.

I don't want to criticize too much, but I think I should give a summary of the major shortcomings. First, the book is just too small, especially for the price. It is also not very well edited; it seems to have been edited by non-English speakers. Finally, it constantly refers to Cacti as a monitoring tool, even talking about the need to find out about crashed equipment and so on -- but it doesn't clearly say that Cacti is only for performance graphing, not for monitoring and alerting. I wish they had not flung the word "monitoring" around so casually.

In terms of topics, it has an overview, installation, creating graphs, creating templates, managing users, SNMP, data queries, and basic administration. The strongest point is the explanation of SNMP. The other chapters have a lot of needless information and screenshots. The installation chapter, for example, goes through installing prerequisites from APT -- which APT can do itself.

In the end it's light reading that shouldn't take you long to finish -- an overview in case you don't know much about Cacti.

 [1]: http://www.amazon.com/Cacti-Network-Monitoring-Ibrahim-Lavlu/dp/1847195962?tag=xaprb-20
