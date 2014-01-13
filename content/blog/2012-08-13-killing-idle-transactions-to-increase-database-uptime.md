---
title: Killing idle transactions to increase database uptime
date: "2012-08-13"
url: /blog/2012/08/13/killing-idle-transactions-to-increase-database-uptime/
categories:
  - Databases
---
Killing long-running idle transactions is a good way to increase the uptime of a MySQL server. This may sound strange, but open transactions will eventually bring the server down, and it is better to hurt a single application than the many that will be hurt when that happens.
Long-running idle transactions are usually caused by a programmer mistake or an unexpected condition that causes an application not to be able to do its work. The potential number of sources for such problems is unlimited, so it's virtually impossible to prevent long-running transactions. You can find and solve them when they happen, but you can't ensure that you'll never get one from an unexpected source (because, by definition, the source is unexpected).

That is why it's a good idea to run an idle-transaction killer. There are also other types of things you can profitably kill and help your uptime even more, but those are sometimes more complex to identify. A long-running idle transaction is easy to identify and kill.

The pt-kill program from Percona Toolkit is one query-killer program. I think it can be made easier to use and more intelligent. This will make it easier in the future for DBAs to set-and-forget.
