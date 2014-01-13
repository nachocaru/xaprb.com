---
title: The difference between subqueries and derived tables in SQL
date: "2005-09-26"
permalink: /blog/2005/09/26/sql-subqueries-and-derived-tables/
categories:
  - Databases
---
Many people are confused by SQL terminology, particularly by subqueries and derived tables, and use the terms incorrectly. In fact the official terminology is defined very specifically. It is a good idea to use the right language. Not only does it foster clear understanding, but among people who know the difference, it helps create a good impression of competence and attention to detail.

The official standard defines a derived table as follows:<sup>[1]</sup>

> ## 4.3 Tables
> 
> A table has an ordered collection of one or more columns and an unordered collection of zero or more rows. Each column has a name and a data type. Each row has, for each column, exactly one value in the data type of that column. SQL-data consists entirely of table variables, called base tables. An operation that references zero or more base tables and returns a table is called a query. The result of a query is called a derived table.

Here is the actual production from the SQL grammar:

> <pre>&lt;derived table&gt; ::= &lt;table subquery&gt;</pre>

This makes it clear that "derived table" is a much more general term than is commonly used by many, especially those familiar with Microsoft SQL Server. Those folks typically mean a subquery in the FROM clause. The real meaning is "the result of a table subquery."

There are actually three types of subquery: scalar, row, and table. Here is the subquery definition:

> ## 7.15 <subquery>
> 
> ### Function
> 
> Specify a scalar value, a row, or a table derived from a <query expression>.
> 
> ### Format
> 
> <pre>&lt;scalar subquery&gt; ::= &lt;subquery&gt;
&lt;row subquery&gt; ::= &lt;subquery&gt;
&lt;table subquery&gt; ::= &lt;subquery&gt;
&lt;subquery&gt; ::= &lt;left paren&gt; &lt;query expression&gt; &lt;right paren&gt;</pre>

There are other common terms for various types of subqueries. Most people use different terms depending on how subqueries are used. For example, a subquery with *outer references* is often called a *correlated subquery*. Here is an example:

<pre>select emp.Name, emp.Dept, emp.Salary
from employees as emp
where Salary > (
    select avg(Salary)
    from employees as inn
    where inn.Dept = emp.Dept);</pre>

Notice the distinction between a derived table and a base table. A base table is the actual named database table, whereas a derived table is the result of any table subquery. Some people also use the term *anonymous view* to denote a derived table, especially one in the FROM clause.

When someone from the Microsoft SQL Server world speaks of derived tables, it is likely s/he is speaking of a subquery in the FROM clause. Just remember, a derived table is defined much more broadly, and this is a specific use of the term.

* * *

<p class="footnote">
  [1] I do not have a copy of the final SQL-2003 standard, because it is not free and I am not rich. I do have access to a very late draft of the standard.
</p>
