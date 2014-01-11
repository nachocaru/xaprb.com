---
title: "High Performance MySQL, Second Edition: Advanced SQL Functionality"
date: "2007-10-05"
permalink: /2007/10/05/high-performance-mysql-second-edition-advanced-sql-functionality/
---
Work continues apace on [High Performance MySQL, Second Edition][1] (the link leads to the chapter outline). I'm working now on Chapter 6, Advanced SQL Functionality, and thought I'd solicit input on it. Are there things you'd like to see us cover? Do you have any favorite techniques you'd like to see us include? Feel free to leave feedback in the comments. The chapter is already significantly done, with 26 pages written, but the ink's not on paper yet, so there's still time to correct omissions!

I should note that there are separate chapters on architecture, schema and indexing design, application optimization, query optimization, etc. We're trying to focus this chapter on "advanced features" and how to get high performance out of them. Also, the outline is still subject to change: there's so much material that it's hard to decide the best place to put something, and exactly what is an "advanced feature" might be open to interpretation, or we might feel something is better placed elsewhere. That said, please throw your ideas at us and we'll worry about the details for you. Here's the outline of this chapter, as of three minutes ago:

<pre>[Intro]
The MySQL Query Cache
  Operational Detail and Caveats
  Optimizations
  Alternatives
Prepared Statements and Multiple Query Execution
  Client-side Prepared Statements
  Client-side Prepared Statements
  Optimization of the Execution Plan
  Server-side Prepared Statements
  Prepared Statements in Stored Procedures
  Prepared Statement Caveats
Cursors
  Client-side Cursors
Stored Procedures
  Pros and Cons
  Recommendation
  Example
User Defined Functions
Events
Views
  Updatable Views
  Limitations of Updatable Views
  Security
  Performance
Triggers
Working with Multi-byte Character Sets
Full-Text Search
  Full-Text Search Queries
  Changes in MySQL 5.1
  Full-Text Trade-Offs and Workarounds
  Full-Text Tuning and Optimization
Foreign Key Constraints
Merge Tables and Partitioning
  Merge Tables
    Merge Table Performance Limitations
    Merge Table Strengths
  Partitioned Tables
    Optimizing Queries Against Partitioned Tables
    Maintaining Partitioned Tables
Distributed Transactions (XA)</pre>

 [1]: http://www.xaprb.com/blog/2007/08/30/coming-soon-high-performance-mysql-second-edition/
