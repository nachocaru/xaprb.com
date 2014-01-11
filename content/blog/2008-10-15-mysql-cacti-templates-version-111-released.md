---
title: MySQL Cacti templates version 1.1.1 released
date: "2008-10-15"
permalink: /2008/10/15/mysql-cacti-templates-version-111-released/
categories:
  - SQL
  - Tools
---
I've released version 1.1.1 of the [MySQL Cacti templates][1] I develop. The new templates work around more Cacti limitations, including the limitation on the length of the data returned from the poller script. There's also a new graph and many other niceties since the last release.

<!--more-->

Note that there are TWO incompatible changes with the previous version of the templates. You don't have to throw away your RRA files, you just have to delete and re-import over all the existing templates. It's not my fault, there was no other way to work around the limitations mentioned above. Really. Have fun upgrading!

Version 1.1.1 is actually just a repackaging of 1.1.0.

The changelog follows.

<pre>2008-10-15: version 1.1.1

	* The tarball didn't have make-template.pl mysql_definitions.pl (issue 34)

2008-10-14: version 1.1.0

	* Graphs fetched too much data, causing errors (incompatible; issue 28, 23).
	* Output of the poller script is compressed with short value names.
	* Checks can be disabled; no need to fetch INNODB STATUS if unwanted.
	* Queries could cause a MySQL thread stack overflow (issue 19).
	* Older PHP didn't have array_change_key_case function (issue 21).
	* The PROCESS privilege is required for MySQL 5.1.29 with InnoDB (issue 22).
	* Added an aggregated view of SHOW PROCESSLIST; requires PROCESS privilege.
	* The text on the graph could overflow the right-hand edge.
	* Truncated SHOW INNODB STATUS could cause an SQL error (issue 27).
	* The poller script requires proper cmdline options (incompatible change).
</pre>

 [1]: http://code.google.com/p/mysql-cacti-templates/
