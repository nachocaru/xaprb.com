---
title: MySQL Cacti templates 1.0.0 released
date: "2008-06-01"
permalink: /2008/06/01/mysql-cacti-templates-100-released/
categories:
  - SQL
  - Sys Admin
---
I just uploaded the 1.0.0 release of my [MySQL templates for Cacti][1]. Now there's an actual download under the Downloads tab. I solved a number of issues in this release. The changelog:

<pre>2008-06-01: version 1.0.0

	* Fixed when SHOW MASTER LOGS has no File_size column.
	* Fixed Cacti-version-specific problems with include files.
	* Fixed when binary log is not enabled.
	* Fixed some caching issues.
	* Fixed make-template.pl issues when downloaded from SVN.
	* Replication graph shows only slave_lag instead of Seconds_behind_master
	* Generate a version for Cacti 0.8.6i.
	* Support generating custom versions with make-template.pl.</pre>

 [1]: http://code.google.com/p/mysql-cacti-templates/
