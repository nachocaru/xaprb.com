---
title: MyISAM quote of the day
permalink: /2009/06/18/myisam-quote-of-the-day/
categories:
  - SQL
tags:
  - InnoDB
  - myisam
  - MySQL
  - XtraDB
---
Seen in #maatkit on Freenode:

> I never realized just how terrible recovering MyISAM from a crash can be

Sad but true &#8212; it can be pretty painful. This is one of the reasons I pretty much recommend InnoDB (okay, okay, XtraDB) for most data unless it's read-only.
