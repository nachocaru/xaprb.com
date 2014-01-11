---
title: 'Pop quiz: how can one slave break another slave'
author: Baron Schwartz
layout: post
permalink: /2009/03/14/pop-quiz-how-can-one-slave-break-another-slave/
categories:
  - SQL
tags:
  - MySQL
  - replication
---
Suppose you have a MySQL master-slave replication setup. It is very straightforward, nothing exotic at all. Imagine that it is the simplest possible setup. Everything is fine, there is nothing wrong or misconfigured with either server.

Now you add another slave, and replication on your existing slave fails. You did not change anything on your existing slave or master. How did this happen?