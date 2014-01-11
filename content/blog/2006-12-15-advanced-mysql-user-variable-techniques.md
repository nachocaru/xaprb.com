---
title: Advanced MySQL user variable techniques
  <p>MySQL's user variables have interesting properties that enable the useful techniques I wrote about in recent articles.  One property is that you can read from and assign to a user variable simultaneously, because an assignment can be an r-value (the 
  result of the assignment is the final value of the variable).  Another property, which sometimes causes confusing behavior, is un-intuitive evaluation time.  In this post I'll show you how to make sure your variables get updated at the time they're used, instead of potentially reading and updating them at different stages of query execution.  This technique enables a whole new range of applications for user variables.  As a bonus, it also avoids extra columns of output created by variable manipulations.</p>
permalink: /2006/12/15/advanced-mysql-user-variable-techniques/
description:
  - >
    Advanced techniques for user-variables in MySQL, avoiding non-deterministic
    results, and using variables anywhere you can use a function.
tags:
  - MySQL
  - Ranked data
  - SQL
  - user defined variables
---
MySQL's user variables have interesting properties that enable the useful techniques I wrote about in recent articles. One property is that you can read from and assign to a user variable simultaneously, because an assignment can be an r-value (the result of the assignment is the final value of the variable). Another property, which sometimes causes confusing behavior, is un-intuitive evaluation time. In this post I'll show you how to make sure your variables get updated at the time they're used, instead of potentially reading and updating them at different stages of query execution. This technique enables a whole new range of applications for user variables. As a bonus, it also avoids extra columns of output created by variable manipulations.

I will cover several things in this article: assignments as r-values and its side effects, lazy evaluation and its side effects, and finally a technique that lets you have non-lazy evaluation and avoid some side effects.

### Setup

I'll use the same data as in recent articles:

<pre>CREATE TABLE fruits (
  type varchar(10) NOT NULL,
  variety varchar(20) NOT NULL,
  price decimal(5,2) NOT NULL default 0,
  PRIMARY KEY  (type,variety)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

insert into fruits(type, variety, price) values
('apple',  'gala',       2.79),
('apple',  'fuji',       0.24),
('apple',  'limbertwig', 2.87),
('orange', 'valencia',   3.59),
('orange', 'navel',      9.36),
('pear',   'bradford',   6.05),
('pear',   'bartlett',   2.14),
('cherry', 'bing',       2.55),
('cherry', 'chelan',     6.33);</pre>

### Simultaneous assignment and reading

MySQL lets you assign and read a variable at the same time. This is familiar in many programming languages where an assignment can be an r-value. For example,

<pre>set @test1 := 0;
set @test2 := @test1 := 5;
select @test1, @test2;
+--------+--------+
| @test1 | @test2 |
+--------+--------+
| 5      | 5      | 
+--------+--------+</pre>

The second statement sets `@test1` to 5, and then sets `@test2` to the result of that assignment, which is the current value of `@test1`. My previous articles have shown you how to exploit this to number rows in a result set, among other things. For example, you can keep a running count as MySQL processes rows, updating and returning the count at the same time.

### Side effects

Unfortunately, it got a bit messy sometimes. For example, the following batch, which restarts the numbering every time `type` changes, spews an extra `dummy` column into the output, because that column is where the calculations are taking place:

<pre>set @type := '', @num := 1;

select type, variety,
   @num := if(@type = type, @num + 1, 1) as row_number,
   @type := type as dummy
from fruits
order by type, variety;

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

In previous articles I suggested wrapping that query in a subquery so you can pick which columns you want in the output. That is a bit inefficient (it creates a temporary table internally) and feels kind of kludgey.

### Lazy evaluation

[MySQL doesn't evaluate expressions containing user variables until they are sent to the client][1], so some expressions don't work as expected. Setting a variable in one place (such as the `SELECT` list) and reading it another (such as the `HAVING` clause) might give weird results, like as those I demonstrated in my last article where every row was numbered 1 instead of getting incremented as expected.

Here's further clarification from the manual:

<blockquote cite="http://dev.mysql.com/doc/refman/5.0/en/user-variables.html">
  <p>
    In a SELECT statement, each expression is evaluated only when sent to the client. This means that in a HAVING, GROUP BY, or ORDER BY clause, you cannot refer to an expression that involves variables that are set in the SELECT list. For example, the following statement does not work as expected:
  </p>
  
  <p>
    <code>mysql&gt; SELECT (@aa:=id) AS a, (@aa+3) AS b FROM tbl_name HAVING b=5;</code>
  </p>
  
  <p>
    The reference to b in the HAVING clause refers to an alias for an expression in the SELECT list that uses @aa. This does not work as expected: @aa contains the value of id from the previous selected row, not from the current row.
  </p>
</blockquote>

In other words, the "alias" in the `HAVING` clause is probably a pointer to a memory location, whose content is not determined for the current row until the current row is output to the client &#8212; at which point it's too late to apply any `HAVING` criteria to the row.

### Side effects of lazy evaluation

In my last article I showed you how to select the top N rows from each group with user variables. To make that work right, I had to group the query, use a `HAVING` clause, and force a certain index order for that query &#8212; because of lazy evaluation. Otherwise, I might have been able to just use the variable in a `WHERE` clause, right? Lazy evaluation is why this doesn't work:

<pre>set @type := '', @num := 1;

select type, variety, price,
       @num := if(@type = type, @num + 1, 1) as row_number,
       @type := type as dummy
from fruits
where @num &lt;= 2;

+-------+------------+-------+------------+-------+
| type  | variety    | price | row_number | dummy |
+-------+------------+-------+------------+-------+
| apple | gala       |  2.79 |          1 | apple | 
| apple | fuji       |  0.24 |          2 | apple | 
| apple | limbertwig |  2.87 |          3 | apple | 
+-------+------------+-------+------------+-------+</pre>

That last row gets output even though it seems `@num` should have the value 3, eliminating it from the results. However, you can infer from this behavior that `@num` really had the value 2 at the time the `WHERE` clause was evaluated, and was only incremented to 3 after the row was sent to the client.

This aspect of user variable behavior makes user variables significantly harder to understand. Sometimes the results are non-deterministic and/or hard to predict. It would be great if there were a way to update those variables in the context in which they're declared, so they get assigned and read at the same time, instead of having to wait for rows to be sent to the client &#8212; a different step in the query execution plan.

### Forcing variable evaluation with multi-staged queries

If you understand the order of the steps MySQL uses to execute a query, you can see there are opportunities to make MySQL "finish up" variable assignments before sending the query to the next step. In fact, perhaps it's a bit misleading to say assignments in the `SELECT` are done when rows are sent. I think it's more accurate to say they're done when rows are *generated* for each stage in query execution.

You can see this in a subquery in the `FROM` clause, which is internally stored as an intermediate temporary table. Variable assignments are done before or as the rows are stored in the temporary table, so when results are read from the temporary table, there are no funny side effects.

Let me show you the previous query slightly rewritten, and you'll see what I mean:

<pre>set @type := '', @num := 1;

select type, variety, price, row_number
from (
   select type, variety, price,
       @num := if(@type = type, @num + 1, 1) as row_number,
       @type := type as dummy
   from fruits
) as x
where row_number &lt;= 2;

+--------+----------+-------+------------+
| type   | variety  | price | row_number |
+--------+----------+-------+------------+
| apple  | gala     |  2.79 |          1 | 
| apple  | fuji     |  0.24 |          2 | 
| orange | valencia |  3.59 |          1 | 
| orange | navel    |  9.36 |          2 | 
| pear   | bradford |  6.05 |          1 | 
| pear   | bartlett |  2.14 |          2 | 
| cherry | bing     |  2.55 |          1 | 
| cherry | chelan   |  6.33 |          2 | 
+--------+----------+-------+------------+</pre>

Just by introducing an intermediate step in the query, I forced the variables to be evaluated so the results, when they get to the outer `WHERE` clause, are deterministic. But as I mentioned before, this is kind of kludgey, and depending on the data, it might not be very efficient to create an intermediate temporary table for the results.

Are there better ways? You bet!

### Try 1: Use functions to force immediate evaluation

Here's an idea: what if certain functions evaluate their arguments immediately? You could exploit that to create a context that has to be evaluated first, sort of like parenthesizing an expression in an equation. You know, `a = (a + b) * (b + c)` means "do the additions first," which wouldn't be the case without the parentheses &#8212; normally multiplication comes before addition.

For this to work, you'd need a function that guarantees the expression is evaluated. For example, `COALESCE()` might be a good choice as long as you put the expression first in the argument list, since `COALESCE()` shortcuts and doesn't evaluate any more arguments as soon as it find a non-NULL argument.

Theoretically, then you could write something like the following and get the desired results:

<pre>set @type := '', @num := 1;

select type, variety, price,
   coalesce(@num := if(@type = type, @num + 1, 1)) as row_number
...</pre>

It doesn't work. Why not? Because the `COALESCE` itself isn't evaluated until the rows are generated. So much for that idea.

What about a scalar subquery, then?

<pre>set @num := 0, @type := '';

select type, variety, price,
   (select(@num := if(@type = type, @num + 1, 1))) as row_number,
...</pre>

Sorry, no dice. This gives exactly the same results.

This idea will not work, period. *Each and every expression in the `SELECT` list is evaluated as the rows are generated.* Functions are expressions, scalar subqueries are expressions&#8230; the only things that will work are operations that result in rows being evaluated for a final value.

### Try 2: Force my will on the query

One thing I do know: subqueries in the `FROM` clause are materialized to a temp table, so this will definitely result in rows being generated. This might do what I want, at the expense of generating temporary tables willy-nilly:

<pre>set @type := '', @num := 1;

select type, variety, price,
   (select n from (select @num := if(@type = type, @num + 1, 1) as n) as x) as row_number,
   (select t from (select @type := type as t) as x) as dummy
from fruits
where @num &lt;= 2;</pre>

That won't work either, as it turns out. The subqueries are correlated &#8212; they refer to columns from the outer table. That isn't allowed because of the intermediate step, which insulates the inner queries from the outer. This is a limitation of correlated subqueries: you can't nest a subquery in the `FROM` clause inside them.

This is really getting silly. It's time to stop trying to force this to work.

### Try 3: Work with me, son

What if I stop trying to get the `SELECT` clause to be evaluated at the same time as the `WHERE` clause? What if I work *with* the server's order of operations, and do all the evaluating *and* updating in the `WHERE` clause instead of in two places? Maybe it looks like this:

<pre>set @num := 0, @type := '';

select type, variety, price, @num
from fruits
where
   2 &gt;= @num := if(@type = type, @num + 1, 1)
   and @type := type;

+--------+------------+-------+------+
| type   | variety    | price | @num |
+--------+------------+-------+------+
| apple  | gala       |  2.79 | 0    | 
| apple  | fuji       |  0.24 | 0    | 
| apple  | limbertwig |  2.87 | 0    | 
| orange | valencia   |  3.59 | 0    | 
| orange | navel      |  9.36 | 0    | 
| pear   | bradford   |  6.05 | 0    | 
| pear   | bartlett   |  2.14 | 0    | 
| cherry | bing       |  2.55 | 0    | 
| cherry | chelan     |  6.33 | 0    | 
+--------+------------+-------+------+</pre>

Hmm, that was not really what I wanted. It looks like the variable is never getting updated at all! I'm not sure why not. Maybe if I 'parenthesize' the variable expression like I tried before? I'll use the `GREATEST()` function, which I know will evaluate all its arguments instead of short-cutting like `COALESCE()`:

<pre>set @num := 0, @type := '';

select type, variety, price, @num
from fruits
where
   2 &gt;= @num := greatest(0, if(@type = type, @num + 1, 1))
   and @type := type;</pre>

No, that gives the same result. I feel like I'm getting close, though. What if I separate out the assignment and comparison?

<pre>set @num := 0, @type := '';

select * from fruits
where @num := if(type = @type, @num + 1, 1)
   and @type := type
   and @num &lt;= 2;
Empty set (0.00 sec)

select @num, @type;
+------+-------+
| @num | @type |
+------+-------+
| 0    | 0     | 
+------+-------+</pre>

That didn't work either. How did `@type` get assigned an integer? It should be a string. It turns out the [`:=` operator has the lowest possible operator precedence][2], so that `WHERE` clause is actually equivalent to

<pre>where @num := (
   if(type = @type, @num + 1, 1)
      and (@type := (
         type and @num &lt;= 2)));</pre>

If I use parentheses right, maybe I can get it to do what I want:

<pre>select * from fruits
where (@num := if(type = @type, @num + 1, 1))
      and (@type := type)
      and (@num &lt;= 2);
Empty set (0.00 sec)

select @num, @type;
+------+--------+
| @num | @type  |
+------+--------+
| 9    | cherry | 
+------+--------+</pre>

Now I've gotten the variables to be assigned, but the `WHERE` clause is still eliminating all the rows. This feels so close to being right. What's missing?

### Pay dirt: do the assignment inside the function

In fact, I was very close. All I need to do is move the entire assignment and the evaluation inside the function. It seems the variable expressions need to be sealed away from the comparison operator. In the example below, I've put everything inside the `GREATEST()` function, but the expression that updates `@type` has an incompatible type (string), so I convert it to a number with `LENGTH()` and mask its value with `LEAST()`.

<pre>set @num := 0, @type := '';

select type, variety, price, @num
from fruits
where 2 &gt;= greatest(
   @num := if(@type = type, @num + 1, 1),
   least(0, length(@type := type)));</pre>

The entire `GREATEST()` expression evaluates to the resulting value of `@num`, which is what I want on the right-hand side of the comparison. And guess what? This works:

<pre>+--------+----------+-------+------+
| type   | variety  | price | @num |
+--------+----------+-------+------+
| apple  | gala     |  2.79 | 1    | 
| apple  | fuji     |  0.24 | 2    | 
| orange | valencia |  3.59 | 1    | 
| orange | navel    |  9.36 | 2    | 
| pear   | bradford |  6.05 | 1    | 
| pear   | bartlett |  2.14 | 2    | 
| cherry | bing     |  2.55 | 1    | 
| cherry | chelan   |  6.33 | 2    | 
+--------+----------+-------+------+</pre>

After playing with more and more combinations, I found another way that works too:

<pre>select *, @num
from fruits
where
   (@num := if(type = @type, @num + 1, 1)) is not null
   and (@type := type) is not null
   and (@num &lt;= 2);</pre>

I confess, I don't fully understand this. I figured it out through trial and error. If the user manual explains it well enough for me to have gotten there by reason, I don't know where. Can someone make it make sense please? I don't want to have to read the source&#8230;

### What's so great about this?

Two words: one pass. One pass through the table &#8212; no quadratic-time algorithms, no grouping or sorting. This is highly efficient. I showed you another technique with `UNION` in my last article, which might be more efficient in some cases. But if you have lots of types of fruit, each of which has just a few varieties, you will be hard-pressed to find a more efficient algorithm to output the first two rows from each group. In fact, I doubt it can be done.

### Spurious columns are gone

Putting the variable assignments inside functions not only let me put everything into the `WHERE` clause, it also got rid of the extra columns in the output &#8212; without kludges like subqueries. You can use this technique to clean up your output whenever you're doing row-by-row calculations.

### Notice the order of rows!

As in previous articles, rows are processed and numbered in order. I never really stated what I was trying to accomplish in the example above. The query I showed you will just output a maximum of two consecutive rows of the same type, in the order they're read from the table (actually, I guess that's the order they pass through the `WHERE `filter, which might not be the same). If I want to do something specific, such as get the two cheapest varieties from each type of fruit, I need to add an explicit `ORDER BY` to get the rows in order of price:

<pre>set @num := 0, @type := '';

select type, variety, price, @num
from fruits
where 2 &gt;= greatest(
   @num := if(@type = type, @num + 1, 1),
   least(0, length(@type := type)))
order by type, price;</pre>

Exercise for the reader: run this query without an index that can be used for ordering. What's in the `@num` column? Why? Add an index on `(type, price)` and try again. How does it change? Why? `EXPLAIN` the queries to find out.

### Is that all?

Nope. If you can put user-variable evaluations inside a function, you can put them anywhere you can put a function. That means you could, for example, put them in the `ORDER BY` clause, in the `JOIN` clause, in the `HAVING` clause&#8230; anywhere. Now that you know you can do this, you can manipulate variables in lots of places you couldn't do otherwise.

### Conclusion

In this article I showed you how two properties of MySQL's user variables (assignment is an r-value, and lazy evaluation) simultaneously cause side effects and give you great power. I showed you why you simply can't get around the fact that the `WHERE` clause and the `SELECT` list are evaluated at different times (I proved it by figuratively banging my head against a wall). I then showed you how you can tuck variable manipulations inside functions, masking out the manipulations and just getting the result, which can be used in a `WHERE` clause or anywhere else. You now have the tools you need to avoid the side effects of those properties I mentioned.

Finally, I showed you one place you might want to use such a technique to get the first N rows from each group. In certain cases, I think this is the most efficient algorithm possible, requiring just one pass through the table.

I don't know about you, but this opens up a lot of interesting possibilities. I have one particular use in mind that I'll write about next &#8212; another way to linearize a query that's normally extremely expensive.

What do you think? Leave a comment and let me know!

*Note: I'm taking a break from computers. This is pre-recorded.* I'll moderate your comments shortly.

 [1]: http://dev.mysql.com/doc/refman/5.0/en/user-variables.html
 [2]: http://dev.mysql.com/doc/refman/5.0/en/operator-precedence.html
