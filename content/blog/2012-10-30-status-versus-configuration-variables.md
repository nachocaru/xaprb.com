---
title: Status versus configuration variables
permalink: /2012/10/30/status-versus-configuration-variables/
categories:
  - SQL
---
MySQL's SHOW STATUS and SHOW VARIABLES commands (or queries against the corresponding INFORMATION_SCHEMA tables) don't always show what they say. In particular, SHOW STATUS contains several rows that aren't status-related, but are really configuration variables in my opinion (and it is an opinion &#8212; sometimes the difference isn't black and white).

Here's a short list of some status counters that I think are really better off as configuration variables:

*   Innodb\_page\_size
*   Slave\_heartbeat\_period
*   Ssl_cipher
*   Ssl\_cipher\_list
*   Ssl\_ctx\_verify_depth
*   Ssl\_ctx\_verify_mode
*   Ssl\_default\_timeout
*   Ssl\_session\_cache_mode
*   Ssl\_verify\_depth
*   Ssl\_verify\_mode
*   Ssl_version

Most of those are legacy, but Slave\_heartbeat\_period is a recent addition.

Can you think of others? What are your favorite oddities of SHOW STATUS and SHOW VARIABLES?
