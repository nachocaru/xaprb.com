---
title: MySQL Toolkit version 1204 released
date: "2007-11-04"
permalink: /blog/2007/11/04/mysql-toolkit-version-1204-released/
categories:
  - Databases
  - Open Source
---

This release fixes some minor bugs. It also adds a few major new features to several of the tools. The command-line option and help functionality, as well as several other pieces of common functionality, has been replaced with common modules that have a test suite. This is the first step towards a gradual rewrite to replace untested 'script' code with tested, maintainable code.

<pre>Changelog for mysql-archiver:

2007-11-04: version 1.0.2

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Replaced some code with modules that are unit-tested.
   * You can control binary logging with the 'a' and 'b' options in a DSN.
   * Destination plugins can now rewrite the INSERT statement.

Changelog for mysql-deadlock-logger:

2007-11-04: version 1.0.5

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Replaced some code with modules that are unit-tested.

Changelog for mysql-duplicate-key-checker:

2007-11-04: version 1.1.2

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Replaced some code with modules that are unit-tested.

Changelog for mysql-find:

2007-11-04: version 0.9.6

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Replaced some code with modules that are unit-tested.

Changelog for mysql-heartbeat:

2007-11-04: version 1.0.2

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Added support for PostgreSQL with the --dbidriver option.
   * Replaced some code with modules.

Changelog for mysql-parallel-dump:

2007-11-04: version 0.9.11

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Replaced some code with modules that are unit-tested.
   * Added --ignoreengine command-line option.
   * Do not dump data for Federated or Merge tables by default.
   * Some versions of mysqldump tried to do LOCK TABLES and hung.

Changelog for mysql-parallel-restore:

2007-11-04: version 0.9.1

   * Made command-line help easier to use.
   * Optimized the calls to CREATE DATABASE with the --createdb argument.
   * Removed the dependency on Term::ReadKey.
   * CHARACTER SET was added to LOAD DATA INFILE even before MySQL 5.0.38.
   * Replaced some code with modules that are unit-tested.
   * Fixed documentation formatting errors.

Changelog for mysql-query-profiler:

2007-11-04: version 1.1.6

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Replaced some code with modules that are unit-tested.

Changelog for mysql-show-grants:

2007-11-04: version 1.0.4

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Replaced some code with modules that are unit-tested.

Changelog for mysql-slave-delay:

2007-11-04: version 1.0.2

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Replaced some code with modules that are unit-tested.

Changelog for mysql-slave-restart:

2007-11-04: version 1.0.2

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Replaced some code with modules that are unit-tested.

Changelog for mysql-table-checksum:

2007-11-04: version 1.1.17

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Replaced some code with modules that are unit-tested.

Changelog for mysql-table-sync:

2007-11-04: version 0.9.8

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Replaced some code with modules that are unit-tested.

Changelog for mysql-visual-explain:

2007-11-04: version 1.0.4

   * Made command-line help easier to use.
   * Removed the dependency on Term::ReadKey.
   * Replaced some code with modules that are unit-tested.</pre>
