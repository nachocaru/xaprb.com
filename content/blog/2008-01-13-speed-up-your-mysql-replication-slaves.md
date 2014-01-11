---
title: Speed up your MySQL replication slaves
author: Baron Schwartz
excerpt: |
  <p>Paul Tuckfield of YouTube has spoken about how he sped up his slaves by pre-fetching the slave's relay logs.  I wrote an implementation of this, tried it on my workload, and it didn't speed them up.  (I didn't expect it to; I don't have the right workload).  I had a few email exchanges with Paul and some other experts on the topic and we agreed my workload isn't going to benefit from the pre-fetching.</p>
  
  <p>In the meantime, I've got a pretty sophisticated implementation of Paul's idea just sitting around, unused.  I haven't released it for the same reasons Paul didn't release his: I'm afraid it might do more harm than good.</p>
  
  <p>However, if you'd like the code, send me an email at [baron at this domain] and I'll share the code with you.  In return, I would like you to tell me about your hardware and your workload, and to do at least some rudimentary benchmarks to show whether it works or not on your workload.  If I find that this is beneficial for some people, I may go ahead and release the code as part of Maatkit.</p>
layout: post
permalink: /2008/01/13/speed-up-your-mysql-replication-slaves/
tags:
  - MySQL
  - Paul Tuckfield
  - replication
  - SQL
---
Paul Tuckfield of YouTube has spoken about how he sped up his slaves by pre-fetching the slave's relay logs. I wrote an implementation of this, tried it on my workload, and it didn't speed them up. (I didn't expect it to; I don't have the right workload). I had a few email exchanges with Paul and some other experts on the topic and we agreed my workload isn't going to benefit from the pre-fetching.

In the meantime, I've got a pretty sophisticated implementation of Paul's idea just sitting around, unused. I haven't released it for the same reasons Paul didn't release his: I'm afraid it might do more harm than good.

<del datetime="2008-01-24T13:10:20+00:00">However, if you'd like the code, send me an email at [baron at this domain] and I'll share the code with you. In return, I would like you to tell me about your hardware and your workload, and to do at least some rudimentary benchmarks to show whether it works or not on your workload. If I find that this is beneficial for some people, I may go ahead and release the code as part of Maatkit.</del>

Update: it's part of Maatkit now.
