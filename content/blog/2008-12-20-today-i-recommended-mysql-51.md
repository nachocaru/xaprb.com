---
title: Today I recommended MySQL 5.1
date: "2008-12-20"
permalink: /2008/12/20/today-i-recommended-mysql-51/
categories:
  - Databases
---
Today I recommended that a customer begin using MySQL 5.1 for development of their new product. There is virtually no risk of doing this, and in fact, the risk of not doing so is quite material. Upgrading the database later would be silly when you could start using it now and find out how best to work with it. Notice that the single criterion I'm mentioning is risk, not features.

I just wanted to mention this in case it appears that I'm anti-5.1. I'm not. I'm all for it when it's appropriate.

For their existing product, which will end-of-life when the new one is done, I suggested that they just upgrade to the latest stable [Percona build][1]. They're on 5.0.37, and a lot of bugs have been fixed since then. And they need to measure what the application is doing, and the Percona builds give significantly more insight into that.

 [1]: http://www.percona.com/percona-lab.html
