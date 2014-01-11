---
title: How to write MySQL conditional comments
date: "2007-05-22"
permalink: /2007/05/22/how-to-write-mysql-conditional-comments/
---
MySQL's version-specific conditional comment syntax confused me for the longest time. Then I learned about `printf` formatting rules, and it all became clear. Read on if you don't already know what I mean.

First I'll explain what I'm talking about. [MySQL allows specially formatted comments with a server version number embedded in them][1]. Servers newer than the version number will execute the commented-out code, and older servers won't. This is really useful sometimes. For example, if you want a SQL script only to run on versions where that feature is supported, you can write it in a conditional comment. The output of mysqldump usually contains a lot of them.

They look like this: `/*!32358 ... CODE ...*/;`. One useful example is `SHOW /*!50002 GLOBAL */ STATUS`, which will show global status on all MySQL versions, instead of showing global status on older versions and session status on newer versions.

You can find examples in many places, but for a long time, I didn't know how to write my own. I didn't know which numbers should go where. For example, if I wanted to write something to run in 4.1.22 and greater, how should I write the version number? Is it `/*!4122*/` or `/*!41022*/` or `/*!40122*/`&#8230; I just got lost.

Once I figured it out, of course, it's very simple. The version number always has five digits. The first number is the major version. The next two are the minor version, left-padded with zeros, and the last are the revision, also left-padded. In terms of `sprintf`, it looks like `sprintf('%d%02d%02d', major, minor, revision)`. So the number I needed above was 40122.

The advantage to this formatting is that you can do a string comparison on the formatted version numbers to determine whether one is greater than the other; you don't have to compare each part of the version number separately.

I remembered my long period of confusion recently when I was writing some conditional comments for a new tool. It felt almost too simple to write about, but maybe I'm not the only one who was in the dark for a long time!

 [1]: http://dev.mysql.com/doc/refman/4.1/en/comments.html
