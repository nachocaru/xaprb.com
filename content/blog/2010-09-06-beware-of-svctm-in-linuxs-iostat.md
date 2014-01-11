---
title: "Beware of svctm in Linux's iostat"
author: Baron Schwartz
layout: post
permalink: /2010/09/06/beware-of-svctm-in-linuxs-iostat/
categories:
  - PostgreSQL
  - SQL
  - Sys Admin
tags:
  - MySQL
---
I've been studying the source of iostat again and trying to understand whether all of its [calculations I explained here][1] are valid and correct. Two of the columns did not seem consistent to me. The await and svctm columns are supposed to measure the average time from beginning to end of requests including device queueing, and actual time to service the request on the device, respectively. But there's really no instrumentation to support that distinction. The device statistics you can get from the kernel do not provide timing information about device queueing, only a) begin-to-end timing of completed requests and b) the time accumulated by requests that haven't yet completed. I concluded that the await is correct, but the svctm cannot be.

I just looked at [the sysstat website][2], and it has been updated recently to warn about this, too:

> svctm
> 
> The average service time (in milliseconds) for I/O requests that were issued to the device. Warning! Do not trust this field any more. This field will be removed in a future sysstat version.

 [1]: http://www.xaprb.com/blog/2010/01/09/how-linux-iostat-computes-its-results/
 [2]: http://sebastien.godard.pagesperso-orange.fr/
