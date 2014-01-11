---
title: "Pop quiz: when will a filesystem copy be an incomplete backup?"
date: "2010-09-25"
permalink: /2010/09/25/pop-quiz-when-will-a-filesystem-copy-be-an-incomplete-backup/
categories:
  - SQL
tags:
  - backup
  - MySQL
---
Let's suppose that your backup process looks like this: you stop a replication slave, shut down MySQL, and copy away the data directory. Assume that the slave is perfect and has the same data as the master. Nothing is broken, nothing is wrong, everything is working fine. In most cases, this should work, right?

Under what kinds of circumstances will you **not** get all your data back if you restore the file copy and start MySQL?
