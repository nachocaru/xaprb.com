---
title: Why NULL never compares false to anything in SQL
author: Baron Schwartz
excerpt: |
  <p>One of the most common questions SQL beginners have is why <code>NULL</code> values "don't work right" in <code>WHERE</code> clauses.  In this article I'll explain it in a way I hope will make sense and be easy to remember.</p>
layout: post
permalink: /2006/05/18/why-null-never-compares-false-to-anything-in-sql/
description:
  - 'A tutorial for understanding NULL values in SQL.  Explains why NULL is neither equal or unequal to anything, and a way to think about NULL that makes it easy to write queries correctly.'
---
One of the most common questions SQL beginners have is why `NULL` values &#8220;don&#8217;t work right&#8221; in `WHERE` clauses. In this article I&#8217;ll explain it in a way I hope will make sense and be easy to remember.

If you&#8217;re new to SQL and have a hard time understanding this article, I encourage you to keep puzzling over it until the light comes on. I had to do that myself (and I&#8217;ve had to think hard about it to write this article), and I&#8217;ve seen a number of people learn SQL. `NULL`s always seem to be an important sticking point.

### The query that won&#8217;t work right

Here are two common queries that just don&#8217;t work:

<pre>select * from table where column = null;

select * from table where column &lt;&gt; null;</pre>

They both return **no** rows! Countless SQL veterans have tried to explain this one to beginners. The beginner usually thinks the first row should return rows where `c1` is `NULL`. The veteran then points out that `NULL` is never equal to anything. The beginner then thinks, &#8220;if `NULL` isn&#8217;t equal to anything, then &#8216;`WHERE COLUMN IS NOT EQUAL TO NULL`&#8216; is always true, so the second query should return all results!&#8221; The second `WHERE` clause is the logical opposite of the first, right? Right? Sadly, no it&#8217;s not.

### The real problem: a language trap

The beginner has fallen into a language trap, which the experienced programmer probably set by saying &#8220;`NULL` is never equal to anything.&#8221; That statement seems to imply &#8220;`NULL` is **NOT EQUAL TO**.&#8221; Unfortunately, that&#8217;s wrong. Not only is `NULL` not equal to anything, it&#8217;s also **not unequal** to anything. This is where the language is confusing.

The truth is, saying anything with the words &#8220;equal&#8221; or &#8220;not equal&#8221; is a trap when discussing `NULL`s, because **there is no concept of equality or inequality, greater than or less than with `NULL`s**. Instead, one can only say &#8220;is&#8221; or &#8220;is not&#8221; (without the word &#8220;equal&#8221;) when discussing `NULL`s.

### The right way to think about `NULL`

The correct way to understand `NULL` is that it is not a value. Not &#8220;this is a `NULL` value&#8221; but &#8220;this `NULL` is not a value.&#8221; Everything either is a value, or it isn&#8217;t. When something is a value, it is &#8220;1,&#8221; or &#8220;hello,&#8221; or &#8220;green,&#8221; or &#8220;$5.00&#8243; etc &#8212; but when something isn&#8217;t a value, **it just isn&#8217;t anything at all**. SQL represents &#8220;this has no value&#8221; by the special non-value `NULL`. When someone says &#8220;the `NULL` value,&#8221; one should mentally disagree, because there&#8217;s **no such thing**. `NULL` is the complete, total absence of any value whatsoever.

### What do you get when you compare a value to `NULL`?

Short answer: `NULL`. Every time. The result of comparing *anything* to `NULL`, even itself, is always, always `NULL`. A comparison to `NULL` is never true or false. Since `NULL` can never be equal to any value, it can never be unequal, either.

Sometimes people have difficulty understanding why a comparison to `NULL` can never be either true or false. Here&#8217;s an informal proof that may help:

Given the following predicates,

1.  `NULL` is not a value
2.  No value can ever be equal to a non-value

Here&#8217;s the proof by contradiction: Pretend for a moment that `NULL` is unequal to a value &#8212; say a real number, excluding infinity and negative infinity. I&#8217;ll choose an example number, say 5.

1.  Assume that `NULL <> 5`.
2.  That is, `NULL <> 5` is a true expression (comparison operations are boolean, true or false).
3.  That means &#8220;`NULL < 5 or NULL > 5`&#8221; is true, since I&#8217;m dealing with finite, real numbers; if it&#8217;s not equal, it must be bigger or smaller.
4.  Therefore, there exists a real number equal to `NULL`; it&#8217;s either less than 5 or greater than 5.
5.  That&#8217;s a contradiction, because I took it as a given that no value can be equal to `NULL`.

Therefore `NULL` is neither equal to a value nor unequal to it, so any comparison involving `NULL` is **neither true nor false**. The result of a comparison involving `NULL` is not a boolean **value** &#8212; it is a **non-value**. You just can&#8217;t compare something that exists with something that doesn&#8217;t exist.

It has to be this way, because if a comparison to a non-value had a defined value, every query could be rewritten to return a wrong result. It would be possible to transform expressions to equivalent expressions that gave the opposite answer, and so on.

### The correct way to write the queries

Instead of using boolean comparison operators such as less-than and greater-than, equal-to and not-equal-to, these queries must be written with the special comparison operator `IS NULL`:

<pre>select * from table where column is null;

select * from table where column is not null;</pre>

The `IS NULL` operator tests whether a value is null or not null, and returns a boolean.

### The truth is, I lied

I&#8217;m trying to write this article to help people understand how non-values work in queries, so I&#8217;m being generous with the truth.

Since computers only work with things that exist, non-existence isn&#8217;t really possible, so `NULL`s must internally be implemented as some value, somewhere &#8212; even if it&#8217;s a value that indicates another value isn&#8217;t a value (huh?).

I&#8217;m glossing over something about comparisons to `NULL`, too. `NULL`s result in tri-valued logic; booleans are no longer just `TRUE` and `FALSE`, but can be `UNKNOWN`, too. The result of comparing `NULL`s is `UNKNOWN`, which is not the same thing as `NULL`, but that&#8217;s just semantic differences and deep mathematical pondering, and doesn&#8217;t materially affect how you write queries.

MySQL, for example, implements `UNKNOWN` as `NULL`, though it it isn&#8217;t perfectly consistent about it &#8212; try these queries:

<pre>select unknown;
select null;
select true;
select false;
select null is unknown;
select false is null;
select true is null;
select unknown is null;</pre>

Just remember `NULL` is neither equal nor unequal to anything, and I promise you will always be safe. It&#8217;s no use to get really picky about the fine points of `NULL` versus `UNKNOWN` and all that.

### A puzzler with `COUNT`

Someone posted a comment on the MySQL manual page about [extensions to the GROUP BY clause][1], and I think it&#8217;s interesting to discuss here. The query is a way to count subsets within a group:

<pre>select shoeStyle,
   count(color) as Count,
   count(color = 'red' OR NULL) as redCount,
   count(color = 'green' OR NULL) as greenCount,
   count(color = 'blue' OR NULL) as blueCount
from bowlingShoes
group by shoeStyle;</pre>

The comment&#8217;s author said &#8220;`OR NULL` is necessary, or you will just get a count of all rows in the group.&#8221; Why is this?

If the `OR NULL` is omitted, the result of the expression is a boolean, `TRUE` or `FALSE`, which are actual values. The `COUNT` function counts any value that exists, not whether something is `TRUE` or `FALSE`, so the query is behaving correctly.

On the other hand, the result of the expression `color = 'green' OR NULL` is either `TRUE` or `NULL`. Boolean expressions are short-circuited when they&#8217;re evaluated. As soon as the first sub-expression in a logical `OR` expression is true, the whole result is true, so when the color is green, the expression is `TRUE` immediately &#8212; a `COUNT`-able value. If the color isn&#8217;t green, the expression becomes `FALSE OR NULL`, which is `NULL`, of course &#8212; not a `COUNT`-able value.

You can see this in action with the following queries:

<pre>mysql&gt; select true or null;
+--------------+
| true or null |
+--------------+
| 1            |
+--------------+
1 row in set (0.00 sec)

mysql&gt; select false or null;
+---------------+
| false or null |
+---------------+
| NULL          |
+---------------+
1 row in set (0.00 sec)</pre>

 [1]: http://dev.mysql.com/doc/refman/5.0/en/group-by-hidden-fields.html