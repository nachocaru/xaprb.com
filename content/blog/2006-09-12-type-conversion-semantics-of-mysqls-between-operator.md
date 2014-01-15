---
title: "Type conversion semantics of MySQL's BETWEEN operator"
date: "2006-09-12"
url: /blog/2006/09/12/type-conversion-semantics-of-mysqls-between-operator/
categories:
  - Databases
---
I got bitten by an implicit type conversion with MySQL recently. This article is about avoiding implicit type conversions, and the weird places you might find them.

### Introduction

Here's the setup: I was trying to select every day in the current month. Have you read my article about how [stringifying dates is faster than comparing them as dates][1]? At the time I wrote this query, I was experimenting with such things after seeing my co-workers do it a lot, for example, taking the left ten characters of a `timestamp` column to get the date part of it. As a result, I took a shortcut to find the beginning of the month: I selected the left seven characters of a `date` column.

In many queries this would be OK, but in my particular query it caused trouble. Here's a test suite so you can follow along:

<pre>create table date_test(d date primary key);

insert into date_test(d)
   select date_sub(current_date, interval i day)
   from number
   where i &lt;= 60;

select d from date_test
   where d between left(current_date, 7) and last_day(current_date);</pre>

What does this query do? You might think it selects every row where `d` is in the current month, but it selects every row in the table. Why? Something must be getting converted to an unexpected type, right?

### What does `BETWEEN` really do?

[Sheeri wrote recently about how `BETWEEN` optimizes to exactly the same thing as two comparisons][2]. In theory, yes, but apparently not in practice:

<pre>select d from date_test
   where d &gt;= left(current_date, 7) and d &lt;= last_day(current_date);</pre>

That query does what I wanted -- it selects rows where `d` is in the current month. It behaves differently from `BETWEEN`. What's the difference?

I have read through the manual to try to understand [MySQL's type conversion rules][3] for these queries. The manual isn't crystal clear, and I can't figure out what conversion is really happening. Are things getting converted to strings? Dates? Dates are actually stored as 3-byte numbers; are they converted to numbers here? I can't tell.

I'm guessing, though I'm not sure, that `BETWEEN` must convert all three operands to the same type, whereas two `WHERE` comparisons don't have to be of the same type. So, for example, the non-`BETWEEN` query is probably converting both operands to strings in the `>=`, and both operands are already `DATE` in the `<=`. From the manual again:

<blockquote cite="http://dev.mysql.com/doc/refman/5.0/en/comparison-operators.html">
  <p>
    If expr is greater than or equal to min and expr is less than or equal to max, BETWEEN returns 1, otherwise it returns 0. This is equivalent to the expression (min <= expr AND expr <= max) if all the arguments are of the same type. Otherwise type conversion takes place according to the rules described in Section 12.1.2, 'Type Conversion in Expression Evaluation', but applied to all the three arguments.
  </p>
</blockquote>

That really doesn't clarify things for me. I still don't know whether they all get converted to the same type for `BETWEEN`, and I'm not sure how the rules of type conversion are applied to dates (are they numbers, strings...?)

### Trying to figure out what type conversion really happens

Here's another possible lead: the query causes warnings, which say 'Incorrect date value: '2006-09' for column 'd' at row 1'. OK, so what does '2006-09' convert to? Plugging it into any date function shows that it comes out as `NULL`:

<pre>select date('2006-09');
+-----------------+
| date('2006-09') |
+-----------------+
| NULL            | 
+-----------------+</pre>

Assuming that the conversion is to the `DATE` type, and is implemented internally with a date function, then my `BETWEEN` query would be

<pre>select d from date_test
   where d between NULL and last_day(current_date);</pre>

Of course, that selects no rows, so that can't be what's happening.

Whatever '2006-09' is converted to is less than any legal date value, as far as I can tell; it must be ending up as zero, the empty string, or '0000-00-00' depending on its final type.

### Conclusion

The moral of this story is that it's always better to be explicit, and avoid queries that don't have an obvious type conversion. Especially with `BETWEEN`, it seems to be better to only use it when all three operands are the same type to begin with. I'm sure if I ran MySQL in a debugger, or read a lot of source code, I could figure it out, but that would be a disaster waiting to bite the next developer. Another good reason to avoid such ambiguities is to prevent changes in semantics from causing problems when we upgrade MySQL. Like every product, it has been known to break backwards compatibility, so I would never want to rely on implicit conversions (this bit me once before -- I had a similar [date puzzler on SQL Server][4] too).

My new query, which I feel very confident about, is

<pre>select d from date_test
   where d &gt;= date_sub(current_date, interval (day(current_date) - 1) day)
      and d &lt;= last_day(current_date);</pre>

I think you can agree there's no ambiguity there! Everything is explicitly `DATE` types from start to finish.

 [1]: http://www.xaprb.com/blog/2006/06/12/benchmarks-for-date-operations-in-mysql/
 [2]: http://sheeri.com/archives/120
 [3]: http://dev.mysql.com/doc/refman/5.0/en/type-conversion.html
 [4]: http://www.xaprb.com/blog/2005/12/04/sql-server-2000-date-and-time-puzzler/
