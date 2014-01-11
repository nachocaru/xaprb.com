---
title: 'Breaking news: SHOW INNODB STATUS ported to XML'
author: Baron Schwartz
layout: post
permalink: /2010/04/20/breaking-news-show-innodb-status-ported-to-xml/
categories:
  - SQL
  - XML
tags:
  - humor
  - InnoDB
---
If you&#8217;re like me, you&#8217;ve gotten tired of writing endless test cases for parsers that can understand the thousands of variations of text output by SHOW INNODB STATUS. I&#8217;ve decided to solve this issue once and for all by patching MySQL and InnoDB to output XML, the universal markup format, so tools can understand and manipulate it easily. Here&#8217;s a sample snippet:

`<pre><status><![CDATA[
=====================================
100320 15:46:24 INNODB MONITOR OUTPUT
=====================================
... text omitted, but you get the idea ...
]]>
</status></pre>` 
PS: Yes, this is a late April Fool&#8217;s joke.