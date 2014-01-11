---
title: Secure, easy Cacti graphing without SNMP
permalink: /2009/04/25/secure-easy-cacti-graphing-without-snmp/
categories:
  - SQL
  - Uncategorized
tags:
  - Apache
  - Cacti
  - Cacti templates
  - GNU/Linux
  - memcached
  - monitoring
  - MySQL
  - Nginx
---
[Cacti][1] is a great tool for collecting information about systems and graphing it. However, it likes to use SNMP, and SNMP is often not desirable. Instead, I often see the need for a method that is:

*   Secure. Use trusted, well-known, encrypted communication. Do not open up new ports.
*   Zero install on the monitored system.
*   As little installation or modification on the monitoring system as possible.

Over the last several years, I've slowly created more and more software to create Cacti graphs via standard POSIX command-line utilities over SSH with key-pair authentication. (I've also created similar software for Nagios, but that's another matter.) The major problem with the work I've done is that it's totally un-publicized.

The system works by passing command-line arguments to a local PHP script like any other Cacti script. This script then executes a remote SSH command, such as `ssh somehost uptime` and extracts statistics from the result.

The requirements are very simple. On the system to be monitored, a public key must be installed. On the monitoring system, the cacti user account must have a private SSH key that it can read and others can't. This is standard for any SSH key. The cacti user account must also have the SSH key fingerprint of the monitored system in its known_hosts file.

The work I've done thus far is available from Subversion in the [mysql-cacti-templates][2] project. This project has the scaffolding for creating Cacti templates easily, so I'm using it.

At this point, the following are available:

*   Apache
*   Operating system (CPU, memory, load average, etc)
*   Memcached
*   Nginx

Unfinished work includes network, disk, etc. The techniques to monitor something of which there is a variable number (e.g. there can be many disks, each of which needs its own graph) are a little more complex than simple things like monitoring overall CPU usage. So that's a work in progress. Once it's done, it'll make it really easy to discover and monitor multiples of *anything* &#8212; for example, multiple MySQL servers or memcached servers on a single host &#8212; without creating a new host for each resource to monitor.

As with the MySQL templates I created, these templates are comprehensive and have lots of nice properties most templates lack. This is something you get free with my scaffolding. If you've ever created templates by hand through the web interface, you should give my work a try. You can turn a three-day project into a few minutes and avoid bugs and other hassles. There are [instructions for creating Cacti templates][3] on the project wiki.

 [1]: http://www.cacti.net/
 [2]: http://code.google.com/p/mysql-cacti-templates
 [3]: http://code.google.com/p/mysql-cacti-templates/wiki/CreatingGraphs
