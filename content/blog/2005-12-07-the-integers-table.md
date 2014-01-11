---
title: The integers table
author: Baron Schwartz
excerpt: '<p>This article introduces the integers table, which can be used to create any desired sequence of numbers, useful for solving a huge variety of problems.</p>'
layout: post
permalink: /2005/12/07/the-integers-table/
---
For the sake of adding cross-references and my own analysis, I&#8217;m going to replicate part of someone else&#8217;s idea. An [integers table][1] can be used to create any desired sequence of numbers, and the idea can be extended to other data types as well. It&#8217;s easy to use a [mutex table][2] as an integers table, so there&#8217;s no need for two tables of the values. You can even create tables with characters, use integers with date functions to generate a range of dates, and so forth. Here is the canonical integers table, and the canonical select from it:

<pre>create table integers(i int unsigned not null);
insert into integers(i) values (0), (1), (2), (3), (4), (5), (6), (7), (8), (9);

select (hundreds.i * 100) + (tens.i * 10) + units.i as iii
from integers as units
    cross join integers as tens
    cross join integers as hundreds;</pre>

A very useful technique indeed.

I use the integers table in a number of ways in my posts about SQL. Sometimes you&#8217;ll see me refer to it as the &#8220;numbers&#8221; table too.

 [1]: http://expertanswercenter.techtarget.com/eac/knowledgebaseAnswer/0,295199,sid63_gci978319,00.html
 [2]: /blog/2005/09/22/mutex-tables-in-sql/