---
title: A better way to build Cacti templates
permalink: /2010/05/25/a-better-way-to-build-cacti-templates/
categories:
  - Cacti
  - SQL
  - Sys Admin
  - Tools
---
The traditional way to build Cacti templates is through the Cacti web interface. This is an *enormous* amount of work, and the result is generally not very consistent or good quality. The process is too error-prone. You can export the templates as XML, but they tend to have problems such as version incompatibilities with other Cacti installations, and it's hard to adapt them for user preferences such as different graph image sizes and polling intervals.

The way I build Cacti templates is exactly the opposite. I create a data structure in a file, which looks like many configuration file syntaxes you've probably worked with. It represents the graphs, templates, scripts, and so on. From this, a tool generates the XML template file, which is a universal template definition, and is a breeze to import into Cacti. It is completely consistent and has zero cruft in it. This process prevents errors, and the results are perfect every time. (There's a test suite, by the way.)

All the tools, documentation, how-tos, examples, and pre-fabricated scripts and templates you need are at the [Better Cacti Templates][1] open-source project. If you want to build your own templates, pay special attention to [the documentation on creating graphs][2].

 [1]: http://code.google.com/p/mysql-cacti-templates/
 [2]: http://code.google.com/p/mysql-cacti-templates/wiki/CreatingGraphs
