---
title: How to escalate privileges in MySQL
author: Baron Schwartz
excerpt: '<p>This article demonstrates an easy way to elevate my privileges in MySQL with default privileges.</p>'
layout: post
permalink: /2006/05/31/how-to-escalate-privileges-in-mysql/
description:
  - Explains why the common advice on how to add a MySQL user is a security problem.
---
In MySQL, privileges are stored in tables in the `mysql` database, so if I have `UPDATE` privileges to that database, it's easy to update my own privileges. For an example of what the desired privileges should be, run the following query:

<pre>select * from user where User='root';</pre>

The `Grant_priv` column is what I'm interested in. I just update that value to 'Y' for my user, execute `FLUSH PRIVILEGES`, log out, and log back in. I'm all-powerful! I can grant myself any privileges I want, grant other people privileges, and so on. Of course, I could do that before by updating the system tables anyway, but now I can do it more conveniently with the built-in administration commands.

This isn't just a weakness in the design of MySQL; Microsoft SQL Server 2000 also stores privileges in system tables (one of the reasons SQL injection attacks are so easy on an improperly configured instance of SQL Server 2000). 

The real point I want to make in this article is it's a bad idea to run the following query, so often recommended in how-to articles and books:

<pre>grant all on *.* to 'xaprb'@'%' identified by 'password';</pre>

If someone tells you that's the way to add a user, don't listen! You need to specify the databases and/or tables to which the user should have access. Otherwise, the user will have `UPDATE` permission in the system tables, and is all-powerful.
