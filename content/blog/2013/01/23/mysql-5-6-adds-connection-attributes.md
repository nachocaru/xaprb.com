---
title: MySQL 5.6 adds connection attributes
date: "2013-01-23"
url: /blog/2013/01/23/mysql-5-6-adds-connection-attributes/
categories:
  - Databases
---
I enjoyed being able to add metadata to a connection in Microsoft SQL Server. I'd annotate my connections so that a DBA could learn a little bit by inspecting it. For example, what was its purpose, and from which application did it originate? The employer where I did this wasn't perfect at managing their database user accounts and so forth, and there were many servers with hundreds of databases on each server, so this was a good way to provide some extra hints.

That hasn't historically been available in MySQL, but with MySQL 5.6, [it will be][1]. This is a nice addition. I assume the support for it in the connector libraries will grow over time.

[I used to emulate this feature in client-side code][2]. That workaround is still in useful production deployment at a previous employer.

 [1]: http://dev.mysql.com/doc/refman/5.6/en/performance-schema-connection-attribute-tables.html
 [2]: http://www.xaprb.com/blog/2006/07/23/how-to-track-what-owns-a-mysql-connection/
