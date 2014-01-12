---
title: MyISAM quote of the day
date: "2009-06-18"
permalink: /2009/06/18/myisam-quote-of-the-day/
categories:
  - Databases
---
Seen in #maatkit on Freenode:

> I never realized just how terrible recovering MyISAM from a crash can be

Sad but true -- it can be pretty painful. This is one of the reasons I pretty much recommend InnoDB (okay, okay, XtraDB) for most data unless it's read-only.
