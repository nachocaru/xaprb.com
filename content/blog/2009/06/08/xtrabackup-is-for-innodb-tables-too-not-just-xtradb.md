---
title: Xtrabackup is for InnoDB tables too, not just XtraDB
date: "2009-06-08"
url: /blog/2009/06/08/xtrabackup-is-for-innodb-tables-too-not-just-xtradb/
categories:
  - Databases
---
Just thought it was worth pointing out that [Percona Xtrabackup][1] is not just for XtraDB. It works great for InnoDB tables, too.

So if mysqldump can't handle it anymore, LVM snapshots kill your server and you don't want to buy proprietary backup software, you might take a look at Xtrabackup.

 [1]: https://launchpad.net/percona-xtrabackup
