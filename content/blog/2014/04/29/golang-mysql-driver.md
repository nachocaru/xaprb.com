---
title: "Go MySQL Drivers"
date: "2014-04-29"
url: /blog/2014/04/29/golang-mysql-drivers/"
categories:
  - Databases
  - Programming
---

If you're interested in Google's Go programming language, perhaps you aren't
sure what drivers to use for MySQL. The good news is there are *excellent*
drivers for MySQL.

![Dolphin][1]

There are several opensource ones on GitHub and elsewhere,
but the driver I recommend is
[https://github.com/go-sql-driver/mysql/](https://github.com/go-sql-driver/mysql/).
Why?

* It is pure Go, not a wrapper around a C library, and is liberally licensed.
* It is high performance. A lot of work has gone into making it avoid
  allocations and consume minimal CPU.
* It is an excellent example of idiomatic Go in action. The authors understand
  how the `database/sql` package is supposed to be used. Some drivers aren't
  written to this standard and are clumsy or don't take advantage of
  `database/sql`.

This is the driver we use at VividCortex in production. We have had no issues
with this driver at all. Credit for that should go to three people who've put a
large amount of work into it: Julien Schmidt, Arne Hormann, and Brad
Fitzpatrick. There are more, but those are the key contributors in my opinion.

If you're curious how to write idiomatic Go code when accessing a database
through the `database/sql` package with this driver, I recommend
[http://go-database-sql.org/](http://go-database-sql.org/), which has benefited
greatly from the same contributors, as well as a variety of community members
and experts at VividCortex.

[Photo Credit][2]

[1]: /media/2014/04/dolphin.jpg
[2]: https://www.flickr.com/photos/chrismatos/8125817490/
