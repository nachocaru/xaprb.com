---
title: Eliminating duplicate users in MySQL
date: "2013-06-26"
permalink: /2013/06/26/eliminating-duplicate-users-in-mysql/
categories:
  - SQL
---
This is hypothetical.

What would happen if I did the following?

    alter table mysql.user add unique key(User);

I'm tossing this out there for people to think about because I've always thought that MySQL's authentication model is a nuisance:

> MySQL considers both your host name and user name in identifying you because there is no reason to assume that a given user name belongs to the same person on all hosts. For example, the user joe who connects from office.example.com need not be the same person as the user joe who connects from home.example.com. MySQL handles this by enabling you to distinguish users on different hosts that happen to have the same name: You can grant one set of privileges for connections by joe from office.example.com, and a different set of privileges for connections by joe from home.example.com. ([source][1])

The above paragraph sounds to me like the real reason the irksome "you are a different user depending on where you connect from" behavior was an early customer feature request. Any large and complex system is going to have some features like this, which end up being misfeatures in the long run. In MySQL, the rule of unintended consequences plays out like this: you create a user and you can't log in, you create duplicate users, etc, etc.

What if you could only create one user with a given username? This would not solve the problem entirely unless you put a trigger on the table to disallow anything in the host column except the % symbol. What if you did that?

How much of the Internet would just break spectacularly if everyone went and added this index and trigger to their servers? What kinds of breakage would we see?

 [1]: http://dev.mysql.com/doc/refman/5.6/en/privilege-system.html
