---
title: 'New Maatkit tool: mk-table-usage'
author: Baron Schwartz
layout: post
permalink: /2011/05/10/new-maatkit-tool-mk-table-usage/
categories:
  - Maatkit
  - SQL
  - Tools
---
This month&#8217;s [Maatkit][1] release includes a new tool that&#8217;s kind of an old tool at the same time. We wrote it a couple years ago for a client who has a very large set of tables and many queries and developers, and wants the database&#8217;s schema and queries to self-document for data-flow analysis purposes. At the time, it was called mk-table-access and was rather limited &#8212; just a few lines of code wrapped around some existing modules, with an output format that wasn&#8217;t generic enough to be broadly useful. Thus we didn&#8217;t release it with Maatkit. We recently changed the name to mk-table-usage (to match mk-index-usage), included it in the Maatkit suite of tools, and enhanced the functionality a lot.

What&#8217;s this tool good for? Well, imagine that you&#8217;re a big MySQL user and you hire a new developer. Now you need to bring the new person up to speed with your environment. Or, you want to understand where the data in some table actually comes from. Or, you want to drop a column, but you&#8217;re not sure where that data is used and what other code will be affected. Or you want to find all SQL statements that modify a table. Wouldn&#8217;t it be nice to have a graph of all your tables and the data flows between them? With this tool you can parse the flow of data in SQL statements, in terms of Table-From &rarr; Table-To, and print the results, annotated by the statement&#8217;s fingerprint.

The client who sponsored the development of this tool is using it as an auditing mechanism, for some of the purposes I just mentioned, and also to help enforce their SQL coding standards. It can be used for a lot more than that, though. I haven&#8217;t done this yet, but it should be easy to write some quick 5-line script to transform it into graphviz format and produce graphs from it, or import into a table that represents edges and run queries against it, and so on. (The client is doing some of those things, but they aren&#8217;t asking me to help, so I&#8217;m taking their word for it that the output format they chose is easily amenable to these tasks.)

 [1]: http://www.maatkit.org/