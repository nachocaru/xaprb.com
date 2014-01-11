---
title: "SHOW COLUMN TYPES: A hidden MySQL treat?"
author: Baron Schwartz
excerpt: "<p>I was poking around in the MySQL source code, namely in sql/sql_yacc.yy, and found a hidden treat: there's a <code>SHOW COLUMN TYPES</code> command.  It's fun to read source code!</p>"
layout: post
permalink: /2006/09/19/show-column-types-a-hidden-mysql-treat/
description:
  - >
    The MySQL source code has included an undocumented SHOW COLUMN TYPES command for
    a long time.
---
I was poking around in the MySQL source code, namely in sql/sql_yacc.yy, and found a hidden treat: there's a `SHOW COLUMN TYPES` command. It's fun to read source code!

The command is undocumented, but does work. It returns just two rows, which give information about `TINYINT` and `TINYINT UNSIGNED`. And it has been in the source for a long time, certainly since version 4.1.21. There's even a status counter for it in the `SHOW STATUS` command: `Com_show_column_types`.

It's clearly unfinished ([here's a bug report about it][1]), and I think I can guess why: it's just duplicate information that, like code comments, can get out of date and be a pain to maintain. If it were me, I'd yank it out of the source, and fix up the online help instead, which on version 5.0.24a-log says pretty much nothing helpful:

<pre>mysql&gt; help column types;
Name: 'Column Types'
Description:
AUTO_INCREMENTExamples:
N</pre>

Another possibility would be to put it in the `INFORMATION_SCHEMA` instead, but I don't think the SQL standard mentions such information being there. I could be wrong about this, but I don't see it. Can anyone confirm this? It strikes me as an odd omission, since there are other views that seem less essential, such as `DATA_TYPE_PRIVILEGES`, `COLLATIONS`, and `USER_DEFINED_TYPES`.

 [1]: http://bugs.mysql.com/bug.php?id=5299
