---
title: What makes relational databases relational?
author: Baron Schwartz
layout: post
permalink: /2012/03/13/what-makes-relational-databases-relational/
categories:
  - PostgreSQL
  - SQL
---
Do you know why relational databases are called relational? I commonly see explanations such as this:

> an RDBMS is called a relational database system because the data is stored in tables.

There, now that&#8217;s all cleared up! Or not.

The most common explanation or reason I hear cited for the name is that it&#8217;s because of relationships between data. But this isn&#8217;t really accurate.

The real reason is because of something called relational algebra, which takes its name from a mathematical construct called a relation. It really doesn&#8217;t have any obvious or intuitive association with &#8220;relationships.&#8221; It&#8217;s one of those words that a mathematician redefined for a very specific purpose, and that was the end of it. Just like in computer science, where we use words such as &#8220;inheritance,&#8221; &#8220;class,&#8221; and &#8220;instantiate&#8221; in very specific ways that don&#8217;t make sense to non-programmers, &#8220;relation&#8221; has a meaning that makes most people&#8217;s eyes glaze over.

Now, we can get into further arguments about whether relational databases are really relational &#8212; and lots of people do that &#8212; but I&#8217;ll stay away from that for the time being.

And in my best Paul Harvey voice, it&#8217;s time to say &#8220;and now you know&#8230; the rest of the story!&#8221;