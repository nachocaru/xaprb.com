---
title: 'Profiling a process's IO usage with ioprofile'
author: Baron Schwartz
layout: post
permalink: /2010/10/07/profiling-a-processs-io-usage-with-ioprofile/
categories:
  - Aspersa
  - SQL
  - Tools
tags:
  - MySQL
---
I've written a [tool to profile a process's IO usage][1]. It works by gathering *lsof* and *strace* from a process, and then figuring out how the file descriptors, function calls, and filenames are all related to each other. The manual page has examples. I'm curious to see how it works for you. Note that it might be a good idea to run this on your development or staging system before you go running it against your production MySQL server &#8212; there are rumors of strace misbehaving on some kernels.

 [1]: http://aspersa.googlecode.com/svn/html/ioprofile.html
