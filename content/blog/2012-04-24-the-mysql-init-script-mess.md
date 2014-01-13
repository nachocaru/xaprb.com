---
title: The MySQL init-script mess
date: "2012-04-24"
permalink: /blog/2012/04/24/the-mysql-init-script-mess/
categories:
  - Databases
---
I don't think there is a single good-quality MySQL init script for a Unix-like operating system. On Windows, there is the service facility, and I used to write Windows services. Based on that, I believe Windows has a pretty good claim to better reliability for start/stop services with MySQL.

What's wrong with the init scripts? Well, let me count the reasons! Wait, I'm out of fingers and toes.

I'll just mention the two annoying ones that I've run into most recently. Both are on Debian, though there is nothing especially broken about Debian's init scripts. The first one comes from parsing my.cnf wrong and not treating pid-file and pid\_file identically. The server treats them identically, thus, so should any other program that reads the my.cnf file (there's this program called my\_print_defaults&#8230; use it!). The second bug is because Debian uses two configuration files for start/stop services: the init script reads /etc/mysql/debian.cnf for no discernable reason. (I guess they never heard of using [sections] in the /etc/mysql/my.cnf file, or just reading the [mysqld] section.) So if you configure your server to place its socket in a non-default location, you have to redundantly update /etc/mysql/debian.cnf too, or the init script will fail. Duplication of configuration parameters is just stupid, period.

These are fairly mundane bugs. I've seen literally dozens more. Part of the problem is that each distribution that packages up and redistributes MySQL tends to ship with their own init script, instead of reusing the official scripts provided by MySQL. Understandable, because mysqld_safe is generic and doesn't really integrate well with any system's init facilities. But man, do they reinvent a bunch of lovely bugs, mostly related to things like parsing the .cnf files, handling pid files, handling sockets, special user accounts, braindead look-before-you-leap patterns of pinging before actually doing a task, stupid timeouts, wrong handling of log files and log file rotation, dumb hacks with syslog, failing to check for real evidence of a running process (you can't trust what a cache file on disk says!), adding facepalm-worthy CHECK TABLES automatically on every table on server startup, and on and on.

The official mysqld_safe script tends to be a little less broken, in my experience, but still has many unlovely behaviors and missing features that I'd consider to be bugs.

I haven't even mentioned the "manage multiple instances" scripts yet. Boy, do those have a ton of bugs. They do stupid things like grepping configuration files for strings that may or may not be in the configuration files. I remember one emergency case where MySQL couldn't be started on a box because the string "mysql\_multi" didn't exist in a my.cnf file clearly designed for multiple instances to run. I added a comment to the effect of "# This comment is necessary for mysql\_multi to work" and the problem was solved. A sane script would actually check for multiple instance definitions, not for some arbitrary string of characters. Anyway, this is just one tiny example, I don't mean to dwell on it.

What happens when you have a bad init script? [All kinds of things][1]. You can't shut down the server gracefully, so if you shut down the system, you hard-crash MySQL eventually, and good luck getting replication back after that in most cases. You can't start the server correctly, or it reports the wrong thing and then tries to start several instances, and the second one borks the first one's pid file and/or socket, causing the aforementioned shutdown problem or worse. And on it goes.

My principle is usually "don't complain, do something about it." But there's a problem, in this case: writing a good init script is actually a significantly complex software engineering project. It is NOT "just a script." (Insert my usual rant about the need for an actual test suite.) And that is not something I am working on at the moment, nor has it ever become my priority for the last several years. So in this case I'm complaining, because the writing on the wall says that I am probably never going to work on this, and I'd at least like there to be some visibility about what a serious problem this is.

Distribution maintainers could probably improve the situation significantly by taking a look at each other's bug reports. If everyone solved the same bugs everyone else has solved (and don't forget bugs in mysqld_safe, too) that would be a big step forward.

 [1]: http://www.percona.com/files/white-papers/causes-of-downtime-in-mysql.pdf
