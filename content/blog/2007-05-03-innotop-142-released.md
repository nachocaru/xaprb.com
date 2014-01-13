---
title: innotop 1.4.2 released
date: "2007-05-03"
permalink: /blog/2007/05/03/innotop-142-released/
categories:
  - Databases
  - Open Source
---

This release of the innotop MySQL and InnoDB monitor is a major upgrade in terms of functionality, code quality, and interface consistency. It is the result of me working for over a month to get innotop into shape for the recent MySQL Conference and Expo. Here's a summary of the changes:

### Major changes

*   Quick-filters to easily filter any column in any display
*   Compatibility with MySQL 3.23 through 6.0
*   Improved error handling when a server is down, permissions denied, etc
*   Use additional SHOW INNODB STATUS information in 5.1.x
*   Make all modes use tables consistently, so they can all be edited, filtered, colored and sorted consistently
*   Combine V, G and S modes into S mode, with v, g, and s hot-keys
*   Let DBD driver read MySQL option files; permit connections without user/pass/etc 
*   Compile SQL-like expressions into Perl subroutines; eliminate need to know Perl 
*   Do not save all config data to config file, only save user's customizations
*   Rewritten and improved command-line option handling
*   Added &#8211;count, &#8211;delay, and other command-line options to support run-and-exit operation 
*   Improve built-in variable sets
*   Improve help screen with three-part balanced-column layout
*   Simplify table-editor and improve hotkey support
*   Require Perl to have high-resolution time support (Time::HiRes)
*   Help the user choose a query to analyze or kill
*   Enable EXPLAIN, show-full-query in T mode just like Q mode
*   Let data-extraction access current, previous and incremental data sets all at once </ul> 
### Minor changes

*   Column stabilizing for Q mode
*   New color rules for T, Q, W modes
*   Apply slave I/O filter to Q mode
*   Improve detection of server version and other meta-data
*   Make connection timeout a config variable
*   Improve cross-version-compatible SQL syntax
*   Get some information from the DBD driver instead of asking MySQL for it
*   Improved error messages
*   Improve server group creation/editing
*   Improve connection/thread killing
*   Fix broken key bindings and restore previously mapped hot-keys for choosing columns
*   Some documentation updates (but not nearly enough)
*   Allow the user to specify graphing char in S mode (formerly G mode)
*   Allow easy switching between variable sets in S mode
*   Bind 'n' key globally to choose the 'next' server connection
*   Bind '%' key globally to filter displayed tables
*   Allow aligning columns on the decimal place for easy readability
*   Add hide_hdr config variable to hide column headers in tables
*   Add a feature to smartly run PURGE MASTER LOGS in Replication mode
*   Enable debug mode as a globally configurable variable
*   Improve error messages when an expression or filter doesn't compile or has a run-time error; die on error when debug is enabled
*   Allow user-configurable delays after executing SQL (to let the server settle down before taking another measurement)
*   Add an expression to show how long until a transaction is finished
*   Add skip_innodb as a global config variable
*   Add '%' after percentages to help disambiguate (user-configurable)
*   Add column to M mode to help see how fast slave is catching up to master
### Bug fixes

*   T and W modes had wrong value for wait_status column
*   Error tracking on connections didn't reset when the connection recovered
*   wait_timeout on connections couldn't be set before MySQL 4.0.3
*   There was a crash on 3.23 when wiping deadlocks
*   Lettercase changes in some result sets (SHOW MASTER/SLAVE STATUS) between MySQL versions crashed innotop
*   Inactive connections crashed innotop upon access to DBD driver
*   set_precision did not respect user defaults for number of digits
*   &#8211;inc command-line option could not be negated
*   InnoDB status parsing was not always parsing all needed information
*   S mode (formerly G mode) could crash trying to divide non-numeric data
*   M table didn't show Slave\_open\_temp_tables variable; incorrect lettercase
*   DBD drivers with broken AutoCommit would crash innotop
*   Some key bindings had incorrect labels
*   Some config-file loading routines could load data for things that didn't exist
*   Headers printed too often in S mode
*   High-resolution time was not used even when the user had it
*   Non-interactive mode printed blank lines sometimes
*   Q-mode header and statusbar showed different QPS numbers
*   Formulas for key-cache and query-cache hit ratios were wrong
*   Mac OS "Darwin" machines were mis-identified as Microsoft Windows
*   Some multiplications crashed when given undefined input
*   The commify transformation did not check its input and could crash
*   Specifying an invalid mode on the command line or config file could crash innotop
### What's next

In a word: documentation.

But that's not all. Take a look at the roadmap for the project, and you find such features as mutex monitoring, the ability to monitor a file instead of connecting to a MySQL server, and much more. Some of this functionality is already done, but it's not mature enough to release (feel free to use the latest trunk source, which is what I use every day; it usually works just fine).
