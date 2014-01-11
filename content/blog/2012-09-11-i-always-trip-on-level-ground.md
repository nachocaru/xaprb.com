---
title: I always trip on level ground
author: Baron Schwartz
layout: post
permalink: /2012/09/11/i-always-trip-on-level-ground/
categories:
  - SQL
---
On the lighter side: I've always had trouble with mysqldump's expected syntax. You know, as the author of a book and all that, you might think I can get this to work. But pretty much every time I run this tool, it humiliates me. Witness:

    
    $ mysqldump --host localhost --password secr3t --all-databases
    Usage: mysqldump [OPTIONS] database [tables]
    OR     mysqldump [OPTIONS] --databases [OPTIONS] DB1 [DB2 DB3...]
    OR     mysqldump [OPTIONS] --all-databases [OPTIONS]
    For more options, use mysqldump --help
    

Alas.
