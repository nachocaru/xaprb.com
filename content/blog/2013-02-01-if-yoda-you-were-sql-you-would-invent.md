---
title: If yoda you were, SQL you would invent
author: Baron Schwartz
layout: post
permalink: /2013/02/01/if-yoda-you-were-sql-you-would-invent/
categories:
  - SQL
---
SQL is such a bizarre language. It is all backwards. Consider:

`<pre>SELECT   item_id, COUNT(*) AS qty, SUM(qty * price) AS total
FROM     line_item
WHERE    invoice_id = 18743
GROUP BY item_id
HAVING   SUM(discount) > 0
ORDER BY item_id;</pre>` 
What is the logical flow of this statement? If SQL were written in logical-flow order, it might look something like this:

`<pre>
FROM     line_item
WHERE    invoice_id = 18743
RETRIEVE item_id, qty, price, discount
GROUP BY item_id
COMPUTE  item_id, COUNT(*) AS qty, SUM(qty * price) AS total, SUM(discount)
HAVING   SUM(discount) > 0
PROJECT  item_id, qty, total
ORDER BY item_id;</pre>` 
SQL can get really hard to read and understand, really fast. Faster than any other language I can think of, and I&#8217;ve been programming in SQL for years. It&#8217;s such a weird language. It&#8217;s almost declarative, but it&#8217;s not. It feels a little pseudo-functional, like LISP, but it&#8217;s not. Even XSLT makes more sense than SQL!

How many fewer bugs would SQL programmers write if they didn&#8217;t have to do a mental translation between the Yoda-speak that is SQL and the logical operations the RDBMS executes? I&#8217;m not saying they should know the actual implementation, I&#8217;m just saying it&#8217;d be great if we didn&#8217;t obfuscate things more than needed.

But George Lucas wouldn&#8217;t like that, and I guess he was on the SQL committee.

<img src="http://www.xaprb.com/blog/wp-content/uploads/2013/02/34182677.jpg" alt="34182677" width="400" height="276" class="aligncenter size-full wp-image-3042" />

Comments, you have? MMmmmmmmmrmrrrrr! Leave them below, you will!