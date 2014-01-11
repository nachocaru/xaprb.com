---
title: How to number rows in MySQL
author: Baron Schwartz
excerpt: '<p>I wrote before about a generic, cross-platform way to simulate the SQL <code>ROW_NUMBER()</code> function in any RDBMS.  There is a much more efficient way to do this on MySQL with user variables.</p>'
layout: post
permalink: /2006/12/02/how-to-number-rows-in-mysql/
description:
  - >
    An efficient MySQL-specific method to number each row in a group with user
    variables.
tags:
  - MySQL
  - Ranked data
  - SQL
  - user defined variables
---
I wrote before about a generic, cross-platform way to simulate the SQL `ROW_NUMBER()` function in any RDBMS. There is a much more efficient way to do this on MySQL with user variables.

### Background

Please see my previous article on [how to simulate the `ROW_NUMBER()`][1] function for the background. I&#8217;ll use the same table structure and data in this article.

Unfortunately, that&#8217;s a quadratic algorithm, so it&#8217;s not something I&#8217;d do much (though I once did it over small sets of data in SQL Server 2000 at a jobsite).

### A more efficient method

In MySQL you can simultaneously assign to and read from [user variables][2] in a SELECT statement. This allows the following method of numbering rows:

<pre>set @type = '';
set @num  = 1;

select
   type,
   variety,
   @num := if(@type = type, @num + 1, 1) as row_number,
   @type := type as dummy
from fruits;

+--------+------------+------------+--------+
| type   | variety    | row_number | dummy  |
+--------+------------+------------+--------+
| apple  | fuji       |          1 | apple  | 
| apple  | gala       |          2 | apple  | 
| apple  | limbertwig |          3 | apple  | 
| cherry | bing       |          1 | cherry | 
| cherry | chelan     |          2 | cherry | 
| orange | navel      |          1 | orange | 
| orange | valencia   |          2 | orange | 
| pear   | bartlett   |          1 | pear   | 
| pear   | bradford   |          2 | pear   | 
+--------+------------+------------+--------+</pre>

How does that work? I&#8217;m restarting the row number each time the `type` column changes, by keeping track of the value it had in the last row. And I&#8217;m simultaneously incrementing and selecting the row number in each row.

The spurious `dummy` column has to be there, but if your version of MySQL supports it, you can use a subquery in the `FROM` clause to eliminate columns you don&#8217;t want in the results.

### Efficiency

All I&#8217;m doing is maintaining a bit of extra memory and performing a few small comparisons and assignments for each row, so this technique is very efficient. 
### Playing with fire

You can refer to the generated `row_number` column in a `HAVING` or `GROUP BY` clause, but don&#8217;t burn your fingers. This technique is very much like playing with fire. The result of assigning to a variable and using it in the same statement (in the `HAVING`, for example) depends on the query plan the server chooses, the phase of the moon, and probably other things too. Before you use this technique, you should read and understand the [section on user-defined variables in the MySQL Manual][2], and decide whether it&#8217;s safe for your query.

Now that you&#8217;ve read that section of the manual, particularly the part about the aliased expression, you should understand why the following query might be a safer paradigm when using the result in the `HAVING` clause, even though it produces another dummy column:

<pre>set @type = '';
set @num  = 1;

select
   type,
   variety,
   @num := if(@type = type, @num + 1, 1) as dummy_1,
   @type := type as dummy_2,
   @num as row_number
from fruits
group by type, variety
having row_number = 1;

+--------+----------+---------+---------+------------+
| type   | variety  | dummy_1 | dummy_2 | row_number |
+--------+----------+---------+---------+------------+
| apple  | fuji     |       1 | apple   | 1          | 
| cherry | bing     |       1 | cherry  | 1          | 
| orange | navel    |       1 | orange  | 1          | 
| pear   | bartlett |       1 | pear    | 1          | 
+--------+----------+---------+---------+------------+</pre>

(If I&#8217;m wrong about that, somebody please correct me).

A safer technique is to use a subquery in the `FROM` clause. This will cause the results to be materialized in a temporary table behind the scenes. It might be less efficient for some uses, though:

<pre>select type, variety
from (
   select
      type,
      variety,
      @num := if(@type = type, @num + 1, 1) as row_number,
      @type := type as dummy
   from fruits
) as x
where row_number = 1;

+--------+----------+
| type   | variety  |
+--------+----------+
| apple  | fuji     | 
| cherry | bing     | 
| orange | navel    | 
| pear   | bartlett | 
+--------+----------+</pre>

### Conclusion

This is an efficient, flexible way to generate and use row numbers in MySQL. I&#8217;ll leave it to you to find uses for it for right now, but I&#8217;m going to show you at least one application for this in an upcoming article.

 [1]: /blog/2005/09/27/simulating-the-sql-row_number-function/
 [2]: http://dev.mysql.com/doc/refman/5.0/en/user-variables.html