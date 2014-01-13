---
title: "Breaking news: SHOW INNODB STATUS ported to XML"
date: "2010-04-20"
permalink: /blog/2010/04/20/breaking-news-show-innodb-status-ported-to-xml/
categories:
  - Databases
  - Web
---
If you're like me, you've gotten tired of writing endless test cases for parsers that can understand the thousands of variations of text output by SHOW INNODB STATUS. I've decided to solve this issue once and for all by patching MySQL and InnoDB to output XML, the universal markup format, so tools can understand and manipulate it easily. Here's a sample snippet:

<pre>&lt;status&gt;&lt;![CDATA[
=====================================
100320 15:46:24 INNODB MONITOR OUTPUT
=====================================
... text omitted, but you get the idea ...
]]>
&lt/status&gt;</pre>

PS: Yes, this is a late April Fool's joke.
