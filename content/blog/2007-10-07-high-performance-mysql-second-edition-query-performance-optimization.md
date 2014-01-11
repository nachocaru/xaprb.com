---
title: 'High Performance MySQL, Second Edition: Query Performance Optimization'
author: Baron Schwartz
excerpt: |
  <p>Your comments on the <a href="http://www.xaprb.com/blog/2007/10/05/high-performance-mysql-second-edition-advanced-sql-functionality/">Advanced MySQL Features</a> chapter were great.  A lot of the questions I got (in the comments and via email) about chapter 6 are really addressed in chapter 5, "Query Performance Optimization," so I'm posting its outline too.  I have the same questions:  are there things you'd like to see us cover?  Do you have any favorite techniques you'd like to see us include?  Any other comments or questions?</p>
layout: post
permalink: >
  /2007/10/07/high-performance-mysql-second-edition-query-performance-optimization/
description:
  - >
    Outline for the Query Performance Optimization chapter of High Performance
    MySQL, second edition.
tags:
  - High Performance MySQL
  - MySQL
  - optimization
  - SQL
---
Your comments on the [Advanced MySQL Features][1] chapter were great. A lot of the questions I got (in the comments and via email) about chapter 6 are really addressed in chapter 5, "Query Performance Optimization," so I'm posting its outline too. I have the same questions: are there things you'd like to see us cover? Do you have any favorite techniques you'd like to see us include? Any other comments or questions?

A bit of basic chapter information: It's currently 45 pages and very nearly a first draft, I think. The outline might be subject to change if we decide to rearrange the material, which actually might help in some places. As I pulled out the headings for this article, I noticed that some of the sections are just **huge**, and might benefit from being divided up a little bit more. But that's all going to come out in the wash; the focus right now is getting the material down in some order that makes sense, and making sure it's clear, concise, and correct.

[**Update**: I got curious how the page count in OpenOffice.org will translate to the page count on paper, so I opened one of the chapters from the first edition and it looks like every 10 pages in OpenOffice.org will be about 11 pages on paper. So this chapter really ought to be about 50 pages on paper].

Here's the chapter outline:

<pre>[Intro]
Slow Query Basics: Optimize Data Access
  Are You Asking the Database For Data You Don't Need?
  Is MySQL Examining Too Much Data?
    Rows Examined and Rows Returned
Ways to Restructure Queries
  Complex Queries Vs. Many Queries
  Chopping Up a Query
  Join Decomposition
Query Execution Basics
  Query States
  The Query Cache
  The Query Compiler and Optimizer
    The MySQL Query Optimizer
    Table and Index Statistics
    MySQL's Join Execution Strategy
    The Join Optimizer
  Returning Results to the Client
MySQL Query Optimizer Limitations
  Correlated Subqueries
  When a Correlated Subquery is Good
  UNION limitations
  Index Merge Optimizations
  Equality Propagation
  Parallel Execution
  Hash Joins
  Loose Index Scans
  MIN() and MAX()
  SELECT and UPDATE on the same table
Optimizing Specific Types of Queries
  Optimizing COUNT() Queries
    What COUNT() Does
    Myths About MyISAM
    Simple Optimizations
    More Complex Optimizations
  Optimizing JOIN Queries
  Optimizing Subqueries
  Optimizing GROUP BY and DISTINCT
    Optimizing GROUP BY WITH ROLLUP
  Optimizing ORDER BY
  Optimizing LIMIT and OFFSET
  Optimizing UNION
  Optimizing Range Queries
Query Optimizer Hints
User-Defined Variables</pre>

 [1]: http://www.xaprb.com/blog/2007/10/05/high-performance-mysql-second-edition-advanced-sql-functionality/
