---
title: Why I use explicit date math in SQL
date: "2006-12-20"
url: /blog/2006/12/20/why-i-use-explicit-date-math-in-sql/
categories:
  - Databases
---
I sometimes see advice to do SQL date operations with the + and &#8211; operators on platforms where they are overloaded for date types. I try to avoid that, because it can give unexpected results. I prefer to explicitly use the built-in date/time functions. I'll show you an example where the operators cause problems, but the functions do the right thing.

My example is in MySQL, but it applies to some other systems too. Suppose you have a table with something keyed on date, such as a count of alien sightings per day. Now you want to see how the count has changed over time. Today is 11th December 2006. What does this query return?

<pre>select day, num from counter
where counter = 'aliens sighted'
   and day &gt;= current_date - 15;</pre>

It doesn't return the last 15 days, if that's what you expected:

<pre>+------------+-----+
| day        | num |
+------------+-----+
| 2006-12-01 |  19 | 
| 2006-12-02 |  20 | 
| 2006-12-03 |  21 | 
| 2006-12-04 |  20 | 
| 2006-12-05 |  19 | 
| 2006-12-07 |  23 | 
| 2006-12-08 |  21 | 
| 2006-12-09 |  19 | 
| 2006-12-10 |  20 | 
| 2006-12-11 |  27 | 
+------------+-----+</pre>

Why not? Well, that `current_date - 15` doesn't result in a date 15 days ago. It results in an integer that is not a valid date:

<pre>select current_date - 15;
+-------------------+
| current_date - 15 |
+-------------------+
|          20061196 | 
+-------------------+</pre>

That's because this operation casts the date to MySQL's internal 3-byte integer representation (20061211) and subtracts 15 from it to get 20061196. What is the result?

<pre>select date(current_date - 15);
+-------------------------+
| date(current_date - 15) |
+-------------------------+
| NULL                    | 
+-------------------------+</pre>

It's an invalid date. It is better to use the date-manipulation functions and a) do date math, not integer math b) get a date back, not an integer. The query can be written as follows in MySQL:

<pre>select day, num from counter
where counter = 'aliens sighted'
   and day &gt;= date_sub(current_date, interval 15 day);
+------------+-----+
| day        | num |
+------------+-----+
| 2006-11-26 |  23 | 
| 2006-11-27 |  26 | 
| 2006-11-28 |  24 | 
| 2006-11-29 |  23 | 
| 2006-11-30 |  24 | 
| 2006-12-01 |  19 | 
| 2006-12-02 |  20 | 
| 2006-12-03 |  21 | 
| 2006-12-04 |  20 | 
| 2006-12-05 |  19 | 
| 2006-12-07 |  23 | 
| 2006-12-08 |  21 | 
| 2006-12-09 |  19 | 
| 2006-12-10 |  20 | 
| 2006-12-11 |  27 | 
+------------+-----+</pre>

Much better!

I continue to find that date math and date operations are confusing, and silently do something I don't expect. You can find two examples of this in my past articles: one about [SQL Server 2000][1] and one about [BETWEEN in MySQL][2].

Both problems were **very** hard to solve. That's why I'm careful with date operations. I find it's safest to leave nothing to chance.

*Note: I'm taking a break from computers and blogging. This is pre-recorded.* I'll moderate your comments shortly.

 [1]: /blog/2005/12/04/sql-server-2000-date-and-time-puzzler/
 [2]: /blog/2006/09/12/type-conversion-semantics-of-mysqls-between-operator/
