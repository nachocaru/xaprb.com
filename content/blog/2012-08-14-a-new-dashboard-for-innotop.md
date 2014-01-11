---
title: A new dashboard for innotop
permalink: /2012/08/14/a-new-dashboard-for-innotop/
categories:
  - Innotop
  - SQL
---
I'm using innotop again every day, for the first time in a few years. I found that I didn't like the tool that the younger and less experienced version of me created. It is very flexible and has the ability to surface a lot of information about MySQL, but not all on one screen. I wanted a "single pane of glass" health dashboard for the servers I'm monitoring, instead of having to look on various screens for important bits of information.

The good news is, innotop is very extensible and I know the code because I wrote most of it, so in a short while I had a dashboard that suited me. I committed these changes to trunk, so if you wish you can easily get the code:

    $ wget innotop.googlecode.com/svn/trunk/innotop
    $ chmod +x innotop
    $ ./innotop
    

You can select the new 'A' mode by pressing the capital 'A' key. Here is a screenshot (click for full size version):

[<img src="http://www.xaprb.com/blog/wp-content/uploads/2012/08/innotop-mode-A-300x236.png" alt="" title="innotop-mode-A" width="300" height="236" class="aligncenter size-medium wp-image-2777" />][1]

Each line in the table is a single server. From the left, the columns are the server's name, uptime, QPS sparkline, current QPS, length of longest-running user query (excludes replication and system users), number of user threads running (ditto on the meaning of that) as a sparkline and current value, number of connections, open tables, whether replication is OK, how much replication is lagging, and the total of all InnoDB's pending I/O operations.

The coloration is based on the length of the MaxSQL column and ReplLag column. If Repl is not Yes, the row is colored black on a red background.

 [1]: http://www.xaprb.com/blog/wp-content/uploads/2012/08/innotop-mode-A.png
