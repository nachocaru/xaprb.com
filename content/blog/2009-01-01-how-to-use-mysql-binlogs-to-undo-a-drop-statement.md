---
title: How to use MySQL binlogs to undo a DROP statement
author: Baron Schwartz
layout: post
permalink: /2009/01/01/how-to-use-mysql-binlogs-to-undo-a-drop-statement/
categories:
  - SQL
tags:
  - backups
  - binary logs
  - MySQL
  - recovery
---
This post is for people who are trying to roll back unwanted modifications to their MySQL database.

**You cannot use the binary logs to undo unwanted changes to your data**. The binary logs are for redoing statements, not undoing them. If you have a backup, you may be able to restore the backup and then replay binary logs to roll forward to the desired state. But you cannot roll backwards with the binary logs.

I say &#8220;may be able to&#8221; because depending on how you take the backup, even your backups and binary logs may not be enough to fully recover your data. If you don&#8217;t know how to do backups right, my advice is to hire someone who knows. It&#8217;s not something you should leave to chance.

I wrote this post because of all the people familiar with other databases, who do not know that their chosen backup strategy leads to a situation where it&#8217;s impossible to recover their data. Hopefully Google will lead them to it.