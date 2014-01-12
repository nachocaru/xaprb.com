---
title: Version 1.1.8 of Better Cacti Templates released
date: "2011-01-22"
permalink: /2011/01/22/version-1-1-8-of-better-cacti-templates-released/
categories:
  - Databases
  - Monitoring
  - Operations
  - Programming
---
I've released version 1.1.8 of the [Better Cacti Templates][1] project. This release includes a bunch of bug fixes and several important new graphs. There are [graphs][2] for the new [response-time statistics exposed in Percona Server][3], and a new set of graphs for [MongoDB][4].

There are [upgrade instructions][5] on the project wiki for this and all releases. There is also a comprehensive tutorial on [how to create your own graphs and templates][6] with this project. Use the [project issue tracker][7] (**not the comments on this post!**) to view and report issues, and use the [project mailing list][8] to discuss the templates and scripts.

The full changelog follows.

<pre>
2011-01-22: version 1.1.8

  * The cache file names could conflict due to omitting --port (issue 171).
  * Load-average parsing did not work correctly at high load (issue 170).
  * The --mpds option to make-template.pl did not create new inputs (issue 133).
  * The url and port were reversed in the Nginx commandline (issue 149).
  * Added $nc_cmd to ss_get_by_ssh.php (issue 154, issue 152).
  * InnoDB Transactions and other graphs showed NaN instead of 0 (issue 159).
  * Added graphs for Percona Server response-time distribution (issue 158).
  * Added graphs for MongoDB (issue 136).
  * Added a minimum option to the template construction logic (issue 169).
  * Added memtotal for Memory (issue 146).
  * make-template.pl sanity checks were too strict (issue 168).
</pre>

 [1]: http://code.google.com/p/mysql-cacti-templates/
 [2]: http://code.google.com/p/mysql-cacti-templates/wiki/MySQLTemplates#MySQL_Query_Response_Time_%28Microseconds%29
 [3]: http://www.percona.com/docs/wiki/percona-server:features:response_time_distribution
 [4]: http://code.google.com/p/mysql-cacti-templates/wiki/MongoDBTemplates
 [5]: http://code.google.com/p/mysql-cacti-templates/wiki/UpgradingTemplates
 [6]: http://code.google.com/p/mysql-cacti-templates/wiki/CreatingGraphs
 [7]: http://code.google.com/p/mysql-cacti-templates/issues/list
 [8]: http://groups.google.com/group/better-cacti-templates
