---
title: New Maatkit tool to compute index usage
date: "2010-05-10"
permalink: /2010/05/10/new-maatkit-tool-to-compute-index-usage/
categories:
  - Databases
  - Open Source
  - Operations
  - Programming
---
In a couple of recent consulting cases, I needed a tool to analyze how a log of queries accesses indexes and tables in the database, specifically, to find out which indexes are not used. I initially hacked together something similar to [Daniel Nichter's mysqlidxchk][1], but using the framework provided by Maatkit, which gave me a pretty good start right out of the box. This was useful in the very tight time constraints I was under, but was not a complete solution. Alas, I could not use anything like [Percona's enhancements for finding unused indexes][2].

So, in response to another consultant's customer request (and sponsorship -- thank you!) I spent more time actually writing a real tool in the Maatkit style, with full tests and all the rest of the usual goodies. The resulting tool finds all indexes in a server, EXPLAINs the log of queries against the server, and reports which indexes were never selected by EXPLAIN.

Such a tool invites many interesting questions beyond "which indexes are not used." Here are a few samples:

*   Which queries have several possible execution plans?
*   Which indexes are chosen instead of other indexes?
*   Which queries have many variations? Only one variation?
*   Which indexes are considered as alternates for other indexes?

I plan to add functionality for these kinds of questions in the future. But for right now, there's a start on this tool in [Subversion trunk][3], under mk-index-usage. I am interested in feedback on it; what doesn't it handle correctly? What else could it do for you? Please post your questions and suggestions to the Maatkit mailing list, or report an issue on the Maatkit project's issue tracker.

It's kind of nice to be writing a single-purpose tool again. Many of the Maatkit tools are extremely complex at this point, some with more than 50 command-line options. This one doesn't have any options at all, besides the standard ones to connect to a MySQL server.

 [1]: http://hackmysql.com/mysqlidxchk
 [2]: http://www.mysqlperformanceblog.com/2009/01/15/dropping-unused-indexes/
 [3]: http://maatkit.googlecode.com/svn/trunk/mk-index-usage/
