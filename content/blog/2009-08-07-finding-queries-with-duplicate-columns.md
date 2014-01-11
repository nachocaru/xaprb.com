---
title: Finding queries with duplicate columns
author: Baron Schwartz
layout: post
permalink: /2009/08/07/finding-queries-with-duplicate-columns/
categories:
  - Maatkit
  - SQL
---
A while ago I wrote about a [tool to help make upgrades safer][1]. Since then, we have gotten several people to help sponsor development on this tool, and a few of our customers are using it to help find problems before they upgrade their systems.

I can't think of a single one of the Maatkit tools that didn't grow out of the need for deeper insight into some part of the system. This tool is no exception. And as always, these tools are like flashlights. When you crouch down near the floor, and shine your flashlight under the refrigerator, you should expect to find a few things that make you cringe.

The other day, one of our customers was using this tool and we started getting an error. The error was caused by the part of the tool that verifies that result sets are the same. Our thought on how to do this was to checksum the results of a query. You can read the specification of exactly how we plan to do this if you want, but I'll just give you the short version here: use a subquery. But some queries cannot be put into a subquery without causing errors.

Here's an example:

    mysql> select a, a from t;
    +------+------+
    | a    | a    |
    +------+------+
    |    1 |    1 | 
    +------+------+

If you wrap this query into a subquery, you will get an error:

    mysql> select * from (select a, a from t) as a;
    ERROR 1060 (42S21): Duplicate column name 'a'

Of course the problem is that the innermost query is actually invalid in a relational sense. Once again, it comes back to the fact that [SQL doesn't keep you from doing things that make no sense][2].

The exact query that we were seeing on our client was a little bit more subtle, but it's still a fairly common pattern that I have seen in the real world:

    select a.*, [other stuff], a.column1 from ...

This type of query should be catchable by [mk-query-audit][3], when we write it. Oooh &#8212; another flashlight to find hairy things with wobbly eyes under your fridge!

 [1]: http://code.google.com/p/maatkit/wiki/mk_upgrade
 [2]: http://www.xaprb.com/blog/2009/03/29/a-review-of-sql-and-relational-theory-by-c-j-date/
 [3]: http://www.maatkit.org/doc/mk-query-advisor.html
