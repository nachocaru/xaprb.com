---
title: Try mk-query-advisor, a new Maatkit tool
date: "2010-03-16"
permalink: /2010/03/16/try-mk-query-advisor-a-new-maatkit-tool/
categories:
  - Maatkit
  - SQL
  - Tools
---
[We][1] have an early draft of a new tool available for you to use and test. It uses heuristics to find problems in SQL. Please use it and give feedback! Here's how:

`<pre>$ wget http://www.maatkit.org/trunk/mk-query-advisor
$ perl mk-query-advisor /var/log/mysql/slow.log
</pre>` 
By default it consumes a log file in MySQL's slow query log format, but it can also parse the general-log format, and if you have any other kind of log you can feed it through mk-query-digest to transform the log into something it can recognize. Tell me if you'd be able to spot the mixture of join styles and use of leading % wildcards in the following query without help:

``<pre>
# Query ID 0x643E813A9ABDA151 at byte 2001701
# CRIT JOI.001 Mixing comma and ANSI joins.
# WARN ARG.001 Argument with leading wildcard.
SELECT `rhubarb_series_title`.`id`, `rhubarb_series_title`.`series_id`,
`rhubarb_series_title`.`title`, `rhubarb_series_title`.`url`,
`rhubarb_series_title`.`type`, `rhubarb_series`.`id`, `rhubarb_series`.`title`,
`rhubarb_series`.`alt_title`, `rhubarb_series`.`url`, `rhubarb_series`.`aka`,
`rhubarb_series`.`author`, `rhubarb_series`.`artist`,
`rhubarb_series`.`summary`, `rhubarb_series`.`logo`,
`rhubarb_series`.`logo_updated`, `rhubarb_series`.`us_publisher`,
`rhubarb_series`.`jp_publisher`, `rhubarb_series`.`start_date`,
`rhubarb_series`.`official_website`, `rhubarb_series`.`create_time`,
`rhubarb_series`.`modify_time`, `rhubarb_series`.`poster_id`,
`rhubarb_series`.`note`, `rhubarb_series`.`status`,
`rhubarb_series`.`status_note`, `rhubarb_series`.`suspended`,
`rhubarb_series`.`licensed`, `rhubarb_series`.`warning`,
`rhubarb_series`.`no_ads`, `rhubarb_series`.`orientation`,
`rhubarb_series`.`gen_js`, `rhubarb_series`.`image_pre`,
`rhubarb_series`.`views`, `rhubarb_series`.`rank`,
`rhubarb_series`.`last_chapter`, `rhubarb_series`.`last_updated`,
`rhubarb_series`.`bookmark_count`, `rhubarb_series`.`ad_pre`, `auth_user`.`id`,
`auth_user`.`username`, `auth_user`.`first_name`, `auth_user`.`last_name`,
`auth_user`.`email`, `auth_user`.`password`, `auth_user`.`is_staff`,
`auth_user`.`is_active`, `auth_user`.`is_superuser`, `auth_user`.`last_login`,
`auth_user`.`date_joined` FROM `rhubarb_series_title` INNER JOIN
`rhubarb_series` AS `rhubarb_series_title__series` ON
`rhubarb_series_title`.`series_id` = `rhubarb_series_title__series`.`id` ,
`rhubarb_series`,  `auth_user` WHERE (`rhubarb_series_title__series`.`suspended`
= 0 AND `rhubarb_series_title__series`.`author` LIKE '%onetwo%' AND
`rhubarb_series_title__series`.`author` LIKE '%threefour%') AND
`rhubarb_series_title`.`series_id` = `rhubarb_series`.`id` AND
`rhubarb_series`.`poster_id` = `auth_user`.`id`
</pre>`` 
Yes, that's a real query, slightly obfuscated.

If you find bugs, [report them][2]. If you find a "bad query" that doesn't trigger any heuristic, [report that too][2]. We're only getting started, but I feel sure that this tool will become a sort of best-practices advisor as we make it more capable. The Google Code issue tracker has [a full initial spec][3], and [the wiki has a roadmap][4].

 [1]: http://www.maatkit.org/
 [2]: http://code.google.com/p/maatkit/issues/list
 [3]: http://code.google.com/p/maatkit/issues/detail?id=861
 [4]: http://code.google.com/p/maatkit/wiki/mk_query_advisor
