---
title: "I'm a Postgres user, as it turns out"
author: Baron Schwartz
layout: post
permalink: /2009/11/03/im-a-postgres-user-as-it-turns-out/
categories:
  - PostgreSQL
  - SQL
tags:
  - humor
  - InnoDB
  - MySQL
---
Someone recently posted this to an email list as a sample of an interesting SHOW INNODB STATUS output:

`<pre title="use mariadb? use drizzle? drop database oracle?">mysql> SHOW ENGINE INNODB STATUS\G
          _______  _______
|\     /|(  ____ \(  ____ \
| )   ( || (    \/| (    \/
| |   | || (_____ | (__
| |   | |(_____  )|  __)
| |   | |      ) || (
| (___) |/\____) || (____/\
(_______)\_______)(_______/

 _______  _______  _______ _________ _______  _______  _______  _______
(  ____ )(  ___  )(  ____ \\__   __/(  ____ \(  ____ )(  ____ \(  ____ \
| (    )|| (   ) || (    \/   ) (   | (    \/| (    )|| (    \/| (    \/
| (____)|| |   | || (_____    | |   | |      | (____)|| (__    | (_____
|  _____)| |   | |(_____  )   | |   | | ____ |     __)|  __)   (_____  )
| (      | |   | |      ) |   | |   | | \_  )| (\ (   | (            ) |
| )      | (___) |/\____) |   | |   | (___) || ) \ \__| (____/\/\____) |
|/       (_______)\_______)   )_(   (_______)|/   \__/(_______/\_______) </pre>` 
I thought it was worth trying out, so I gave it a shot:

`<pre>mysql> use postgres
ERROR 1049 (42000): Unknown database 'postgres'
</pre>` 
Clearly I just need to create the database. Short work:

`<pre>mysql> create database postgres;
Query OK, 1 row affected (0.00 sec)

mysql> use postgres
Database changed
</pre>` 
So now I'm using Postgres. I still feel like I'm missing something, though. It feels a lot like reading [XKCD][1] comics. Where's the tooltip?

 [1]: http://xkcd.com/
