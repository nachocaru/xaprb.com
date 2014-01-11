---
title: PostgreSQL adds windowing functions and common table expressions
date: "2009-01-21"
permalink: /2009/01/21/postgresql-adds-windowing-functions-and-common-table-expressions/
categories:
  - PostgreSQL
  - SQL
---
As [Hubert writes][1], [PostgreSQL 8.4 has windowing functions][2].

Well done. I've been watching progress on this for a while. It greatly enhances the expressiveness of SQL.

What about common table expressions (WITH and WITH RECURSIVE)? Yes, [PostgreSQL 8.4 will have common table expressions (WITH and WITH RECURSIVE)][3] as well. That's the "other" quantum leap in the expressiveness of SQL in my mind.

Meanwhile I'm helping a client rewrite subqueries and finding bugs in MySQL's subquery handling that cause equivalent expressions to return different results. Alas, nested-loop left-deep query plans made it easier for MySQL to have different storage engines, but hard for it to go beyond the basics of expressiveness in SQL. (Warning: uninformed opinion alert. Maybe I'm blaming the wrong thing.)

This post should not be regarded as MySQL bashing or PostgreSQL glorifying. Use the tool that works for you, standard disclaimers, etc etc.

 [1]: http://www.depesz.com/index.php/2009/01/21/waiting-for-84-window-functions/
 [2]: http://developer.postgresql.org/pgdocs/postgres/functions-window.html
 [3]: http://www.postgresql.org/about/featurematrix
