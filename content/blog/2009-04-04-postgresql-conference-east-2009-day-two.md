---
title: PostgreSQL Conference East 2009, Day Two
date: "2009-04-04"
permalink: /2009/04/04/postgresql-conference-east-2009-day-two/
categories:
  - Conferences
  - PostgreSQL
tags:
  - Greg Sabino Mullane
  - Jonah Harris
  - Joshua Drake
  - Kevin Kempter
  - Norman Yamada
  - pgeast2009
---
I missed Friday and part of Saturday, but I was at [PostgreSQL Conference East 2009][1] for part of Saturday (and will be for part of Sunday too.) A brief recap of the talks I attended:

*   PostgreSQL Backup and Recovery &#8212; by [Kevin Kempter of Consistent State][2]. I arrived halfway through, and heard about PITR, Slony, and a few other topics.
*   Playing with Playr &#8212; by [Jonah Harris of myYearbook][3]. [Playr][4] is a tool that analyzes log files, and lets you replay them exactly (same timing, same commit order, same concurrency, etc). They use it to capture production traffic and replay it against a non-production machine to evaluate new hardware and see how it does on their workload. (We have built something similar at Percona, for MySQL.) There are some other tools too &#8212; Staplr, Primr. Interesting to hear how they're doing it, and get a different take on what has to be done to get it right; for example, setting the system clock to the date and time the production workload was measured.
*   Monitoring Postgres with check_postgres.pl &#8212; by [Greg Sabino Mullane of End Point][5]. A Nagios check, and yet it's so much more. Some good thoughts arose in my mind as I listened. For example, they are using a 'busybox' approach to make one script that you can invoke under many names and get different behaviors; I wonder if we can do that with Maatkit? There would be some tough things to think about with that approach. Also, the benefit of making a big empty file on the filesystem, so that if the system runs completely out of disk space you can delete the empty file and have enough free space to do some recovery work.
*   Reconciling and comparing databases using schemas, DBI-Link and Slony &#8212; by [Norman Yamada of the Millburn Corporation][6]. Interesting talk about the ever-relevant topic of building dev/stage/test datasets, testing against live data (but not on a production database), and nifty Postgres features (one of which was almost misconstrued as a bug) that make it possible. Lots of details about Slony, DBI-Link, etc, and a lively discussion or three.
*   Configuring a Warm Standby, the Easy Way &#8212; by [Joshua Drake of Command Prompt][7]. A talk about [Pitrtools][8], a project Joshua created to make PITR standbys much friendlier to set up and administer.

I had lunch and supper with various people (new faces to go with names, hooray!), and a lot of nice conversation about topics like databases and consulting. And of course, it's nice to see people again after a year, although some of them did make it to [OpenSQL Camp][9] 2008 so it hasn't been that long!

It seems the PostgreSQL consultants are seeing an uptick in demand just as we are at Percona, though one of them thought it was due to what MySQL was doing &#8212; until I told him everyone's demand was up across the board. I think it's mostly a sign of the economic times, though I'm no prophet.

 [1]: http://www.postgresqlconference.org/2009/east/
 [2]: http://www.consistentstate.com/
 [3]: http://www.myyearbook.com/
 [4]: https://area51.myyearbook.com/
 [5]: http://www.endpoint.com/
 [6]: http://www.millburncorp.com/
 [7]: http://www.commandprompt.com/
 [8]: https://projects.commandprompt.com/public/pitrtools/
 [9]: http://www.opensqlcamp.org/
