---
title: The state of MySQL client libraries
date: "2012-12-26"
permalink: /2012/12/26/the-state-of-mysql-client-libraries/
categories:
  - Databases
  - Open Source
---
Those who've been around the MySQL world are probably aware of the much-discussed topics of GPL licensing, dual licensing, and in particular, licensing of the client libraries (also called connectors or drivers) and the [FOSS exception][1] to that licensing. This is newly relevant with the announcement of a permissively-licensed MySQL-compatible client library for MariaDB.

The difference is that this time there's been some question about the provenance and history of the source code. Some people asked me about this. Some of them were aware of a relatively obscure detail: there've been permissively licensed MySQL client libraries for years, in the form of libdrizzle, a BSD-licensed library for the Drizzle fork of MySQL.

Here are some of the thoughts that seemed to be going through peoples' minds:

*   This changes everything, doesn't it? Now I don't have to to open-source my application or pay Oracle licensing fees.
*   Is the source code of these new connectors untainted, or am I exposing myself to liability problems by using it?
*   Isn't MariaDB's driver just a copy-paste and LGPL relicense of the BSD-licensed Drizzle driver? Sure, that's legal, but is it ethical?
*   Are these connectors really compatible, or will they cause problems?

Many people seem constitutionally incapable of understanding the GPL. I consider myself forever done with discussions about what the GPL permits or forbids, so I won't address that. But I thought some of these things were worth looking into, at least quickly.

In particular, I was curious whether the allegations of plagiarism on MariaDB's behalf were true. So I downloaded the latest release of the [Drizzle][2] and [MariaDB][3] C libraries, unpacked the source code, and just took a quick look. Here's what I found.

The first thing I wanted to check was the allegation that MariaDB's drivers were just an LGPL wrapper or copy-paste of Drizzle's libraries. A few minutes of study showed **no obvious plagiarism from Drizzle's source**. The MariaDB drivers appear to have a lot more code, documentation, tests, and so on, and it looks to be organized very differently than the Drizzle drivers. Files are in different directory hierarchies, code appears to be split up among files very differently, files are named differently, and so on. After about ten minutes of reading source, **I saw no code that looks similar**. A cursory grepping of the source code also shows words like "infile" that appear only in the MariaDB code. If there's plagiarism from Drizzle's library source code, it's going to take a little more work to find it. In fact, from what I see, the Drizzle libraries don't implement all of the protocol's features, and that tangentially answers one of the other questions about true compatibility.

The next question is about MariaDB's code versus MySQL's code. The MariaDB library's source looks and feels very similar to MySQL's source. This is no surprise to me. If Monty sat alone in a room and coded a library from scratch, based only on the MySQL protocol documents and his memory, I'd expect the result to look a lot like MySQL's source code anyway. But when I opened some of the files, things got less clear to me. For example, the copyright header in include/my_list.h begins with this:

    /* Copyright (C) 2000 MySQL AB &#038; MySQL Finland AB &#038; TCX DataKonsult AB
       
       This library is free software; you can redistribute it and/or
       modify it under the terms of the GNU Library General Public
       License as published by the Free Software Foundation; either
       version 2 of the License, or (at your option) any later version.

I was surprised. I thought I'd see a "clean-room" reimplementation of the protocol, with no relationship to MySQL's source code. But this file appears to be the same code as MySQL's, although the header says that the file is licensed under the LGPL. I compared that with the same header file in MySQL 5.6&#8242;s source code, and here's the result:

    /* Copyright (c) 2000, 2010, Oracle and/or its affiliates. All rights reserved.
    
       This program is free software; you can redistribute it and/or modify
       it under the terms of the GNU General Public License as published by
       the Free Software Foundation; version 2 of the License.

So that file is licensed under the "viral" copyleft GPL version 2 only, not the more permissive LGPL version 2 or later. Did the license terms on that file get changed over time? I am not surprised to see Oracle erasing prior copyright history and updating it to show themselves as the owners, but did they change the license from LGPL to GPL too? One way to find out is to check the MySQL 5.0 source code, because that was released before Sun or Oracle entered the picture. Here's the header file's copyright notice for MySQL 5.0.28:

    /* Copyright (C) 2000 MySQL AB
    
       This program is free software; you can redistribute it and/or modify
       it under the terms of the GNU General Public License as published by
       the Free Software Foundation; either version 2 of the License, or
       (at your option) any later version.

The license matches Oracle's, although of course the copyright owner has changed since then. So it looks to me like Oracle didn't change the license terms; they just updated the ownership information.

Some important questions arise from this. I'm not qualified to answer them because I'm neither a lawyer nor a MySQL historian, but I'm qualified to ask them and I'd surely like to know the answers:

1.  Is a legitimately LGPL-licensed copy of these header files available?
2.  What's the origin of the triple copyright ownership listed in MariaDB's header file, to include "MySQL Finland AB" and "TCX DataKonsult AB" ? What's the relationship between these entities and MySQL AB?

I think that perhaps someone from Monty Program or SkySQL is in the best position to answer these questions; in fact, Monty himself is probably the most knowledgeable. I'm looking forward to understanding more of the history around the source code and its licensing and provenance.

 [1]: http://www.mysql.com/about/legal/licensing/foss-exception/
 [2]: https://launchpad.net/libdrizzle/+download
 [3]: http://www.skysql.com/downloads/connectors/c
