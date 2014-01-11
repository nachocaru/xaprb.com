---
title: Version 1.1.2 of improved Cacti templates released
date: "2009-05-07"
permalink: /2009/05/07/version-112-of-improved-cacti-templates-released/
categories:
  - GNU/Linux
  - PHP
  - SQL
tags:
  - Cacti
  - memcached
  - monitoring
  - MySQL
  - Nginx
---
I've packaged up and released version 1.1.2 of the [Cacti templates I've written for MySQL, Apache, memcached, nginx etc][1].

Anyone who would like to help write documentation (or do anything else, for that matter) is welcomed to participate. I'll give commit access at the drop of a hat.

Changelog:

<pre>2009-05-07: version 1.1.2

	* The parsing code did not handle InnoDB plugin / XtraDB (issue 52).
	* The servername was hardcoded in ss_get_by_ssh.php (issue 57).
	* Added Handler_ graphs (issue 47).
	* Config files can be used instead of editing the .php file (issue 39).
	* binary log space is now calculated without a MySQL query (issue 48).
	* There was no easy way to force inputs to be filled (issue 45).
	* Some graphs were partially hidden without --lower-limit (issue 43).
	* Flipped some elements across the Y axis (issue 42).
	* Added Apache, Nginx, and GNU/Linux templates.
	* Unknown output is now -1 instead of 0 to prevent spikes in graphs.
	* If you want to use a script server, you must now explicitly configure it.
	* UNIX sockets weren't permitted for MySQL (issue 38).
</pre>

 [1]: http://code.google.com/p/mysql-cacti-templates/
