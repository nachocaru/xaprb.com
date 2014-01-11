---
title: Version 1.1.3 of improved Cacti graphs for MySQL released
author: Baron Schwartz
layout: post
permalink: /2009/10/24/version-1-1-3-of-improved-cacti-graphs-for-mysql-released/
categories:
  - PHP
  - SQL
tags:
  - Cacti
  - MySQL
---
I&#8217;ve just released version 1.1.3 of the [Cacti templates I wrote for MySQL][1]. This is a bug-fix release only, and affects only ss\_get\_mysql\_stats.php. To upgrade from the previous release, upgrade ss\_get\_mysql\_stats.php. Don&#8217;t forget to save and restore your configuration options, if any. (Note that there is a feature to help with this: you can keep configuration options in ss\_get\_mysql\_stats.php.cnf to avoid making them in ss\_get\_mysql\_stats.php.)

Next up: actual template changes! More graphs!

The changelog follows.

`<pre>2009-10-24: version 1.1.3

        * This is a bug-fix release only, and contains no template changes.
        * To upgrade from the previous release, upgrade ss_get_mysql_stats.php.
        * MySQL 5.1 broke backwards compatibility with table_cache (issue 63).
        * Added a version number to the script (partial fix for issue 79).
        * Added a test suite (issue 76, issue 59).
        * Math operations were done in MySQL instead of PHP (issue 25).
        * SHOW STATUS values didn't override SHOW INNODB STATUS parsing (issue 24).
        * Long error messages were not appearing in the Cacti log.
        * SHOW INNODB STATUS parsing for unpurged_txns was broken.
        * SHOW INNODB STATUS parsing for innodb_lock_structs was broken.
        * SHOW INNODB STATUS parsing for pending_log_flushes was broken (issue 62).
        * SHOW INNODB STATUS parsing for pending_buf_pool_flushes was broken.
        * SHOW INNODB STATUS parsing for pending_ibuf_aio_reads was broken.
        * SHOW INNODB STATUS parsing for pending_aio_log_ios was broken.
        * SHOW INNODB STATUS parsing for pending_aio_sync_ios was broken.
        * Made SHOW INNODB STATUS parsing less sensitive to false positive matches.
</pre>`

 [1]: http://code.google.com/p/mysql-cacti-templates/