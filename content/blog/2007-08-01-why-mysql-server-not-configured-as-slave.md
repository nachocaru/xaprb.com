---
title: Why MySQL says the server is not configured as a slave
permalink: /2007/08/01/why-mysql-server-not-configured-as-slave/
description:
  - "Explains the most common causes of MySQL's ERROR 1200 (HY000): The server is not configured as slave."
tags:
  - configuration
  - master
  - MySQL
  - replication
  - slave
  - SQL
  - troubleshooting
---
Is MySQL giving you the error message "ERROR 1200 (HY000): The server is not configured as slave; fix in config file or with CHANGE MASTER TO" when you try to run START SLAVE? There are a few simple troubleshooting steps to take, but I always forget what to do. This article is to help me remember in the future!

*   First, make sure you have run [CHANGE MASTER TO][1] and configured the server as a slave. If you've done this, you should get some output from [SHOW SLAVE STATUS][2]. If so, go to the next step.
*   Next, make sure you have set a server ID on both the master and the slave. Try running `SHOW VARIABLES LIKE 'server_id'` on both servers. If the value is zero or one, check the configuration file for an explicit setting, because zero or one is often the default value when nothing is specified. I have seen this cause the slave to fail, even in cases where the master's ID is 1, which ought to work okay but sometimes doesn't.
*   Finally, make sure your master and slave have different server IDs (on small networks, I usually set the server ID to the last octet in the server's IP address, because it's handy and easy to remember). MySQL slaves will refuse to replicate from a master with the same ID.

You should now be able to run [START SLAVE][3] and start your slave replicating from the master.

Did I miss anything? Let me know, and I'll add it!

 [1]: http://dev.mysql.com/doc/en/change-master-to.html
 [2]: http://dev.mysql.com/doc/en/show-slave-status.html
 [3]: http://dev.mysql.com/doc/en/start-slave.html
