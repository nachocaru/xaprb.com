---
title: MySQL disaster recovery by promoting a slave
author: Baron Schwartz
layout: post
permalink: /2009/01/20/mysql-disaster-recovery-by-promoting-a-slave/
categories:
  - High Availability
  - Maatkit
  - SQL
tags:
  - delayed slave
  - MySQL
---
I was just talking to someone who backs up their MySQL servers once a day with mysqldump, and I said in a catastrophe, you&#8217;re going to have to reload from a backup; that&#8217;s some amount of downtime, plus up to a day of lost data.

And they said &#8220;We can just promote a slave, we&#8217;ve done it before. It works fine.&#8221;

Granted, in some/many cases, this is fine. There are all sorts of caveats &#8212; for example, you either know that your [slave has the same data as the master][1] or you don&#8217;t care. But it&#8217;s fine for some things.

So then I said &#8220;what about DROP TABLE?&#8221;

And there was a pause. I assume they were realizing that the chance of accidental or malicious destruction of data is much higher than the chance of multiple servers dying at once. This is why slave != backup.

How about you?

Granted, you can use a [delayed slave][2] to protect against this particular scenario. But you still need &#8220;real&#8221; backups, and you still have to think about the worst case &#8212; restoring that backup.

 [1]: http://www.maatkit.org/doc/mk-table-checksum.html
 [2]: http://www.maatkit.org/doc/mk-slave-delay.html