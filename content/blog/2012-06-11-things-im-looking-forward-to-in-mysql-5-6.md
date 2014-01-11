---
title: 'Things I&#8217;m looking forward to in MySQL 5.6'
author: Baron Schwartz
layout: post
permalink: /2012/06/11/things-im-looking-forward-to-in-mysql-5-6/
categories:
  - SQL
---
As a tool author, I really look forward to working with MySQL 5.6. Many of the improvements will make life significantly easier for Percona Toolkit.

One illustration of this is in figuring out what the optimizer is doing when it plans a statement, and how it intends to use indexes. Compound indexes present challenges in some situations. Many of our tools have extensive checks to try to avoid executing queries that have bad execution plans. If the optimizer intends to use only a few of the columns in an index, how will we know?

Of course I have answers for this, but they aren&#8217;t as simple as they seem at first glance. The obvious method is to look at key_len in EXPLAIN. But what is the length of the full index? That&#8217;s a tricky thing to figure out. The simple case is always easy, but character sets, nullability, and so on make it much harder.

Having a lot more information about the process the planner uses to choose an execution plan will be invaluable here. Of course, we will have to support legacy versions for many years, and so there is some additional work every time there&#8217;s a major change in the server. But I frankly welcome this change. The longterm benefit will be worth it.