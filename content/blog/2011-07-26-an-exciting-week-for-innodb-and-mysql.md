---
title: An exciting week for InnoDB and MySQL
date: "2011-07-26"
permalink: /2011/07/26/an-exciting-week-for-innodb-and-mysql/
categories:
  - Databases
---
Congratulations and thanks to Monty Program on the release of [MariaDB 5.3][1]! This looks like a great release. (I haven't had a chance to try it yet.) I really welcome the query optimizer improvements; the list of changes is huge. There are a lot of fixes for problems I've seen for years. And there's group commit, and high-resolution date/time types, and lots more.

And congratulations and thanks to Oracle on the next series of [previews of what MySQL 5.6 will look like][2], including full-text search inside InnoDB, performance and scalability improvements, and usability and operational improvements. I love the batch of [informational blog posts from the InnoDB team][3] and others that usually comes out around such announcements. I learn a lot from reading them -- I can claim to know a bit about using InnoDB, and even its source code to some extent, but the real experts are the ones who create it. There is a lot to know about such a complex system, and it's great to have more than just the manual to learn from.

It is also really nice -- and this is *not* a gratuitous self-serving plug, but a sincere opinion I would have whether I worked for Percona or not -- to see that a lot of improvements from Percona and others are ending up in both Oracle's and Monty Program's versions of MySQL. When you combine the work that Oracle, Monty Program, Percona, Facebook, eBay, Google, DeNA, and many others are doing with InnoDB and MySQL, I think you can make the case that MySQL development is accelerating rapidly and MySQL has a very bright future. I am very happy that a lot of these features and improvements are getting field-tested to prove both their value and the correctness and quality of the engineering before becoming part of the "official" MySQL releases. Oracle's version of MySQL is really shaping up to be [the MySQL Enterprise I used to wish for][4].

 [1]: http://kb.askmonty.org/en/what-is-mariadb-53
 [2]: http://www.oracle.com/us/corporate/press/439460
 [3]: http://blogs.innodb.com/wp/2011/07/
 [4]: http://www.xaprb.com/blog/2007/08/12/what-would-make-me-buy-mysql-enterprise/ "What would make me buy MySQL Enterprise?"
