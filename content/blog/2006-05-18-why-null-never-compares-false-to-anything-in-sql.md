---
title: Why NULL never compares false to anything in SQL
date: "2006-05-18"
url: /blog/2006/05/18/why-null-never-compares-false-to-anything-in-sql/
categories:
  - Databases
---
One of the most common questions SQL beginners have is why `NULL` values "don't work right" in `WHERE` clauses. In this article I'll explain it in a way I hope will make sense and be easy to remember.

If you're new to SQL and have a hard time understanding this article, I encourage you to keep puzzling over it until the light comes on. I had to do that myself (and I've had to think hard about it to write this article), and I've seen a number of people learn SQL. `NULL`s always seem to be an important sticking point.

### The query that won't work right

Here are two common queries that just don't work:

<pre>select * from table where column = null;

select * from table where column &lt;&gt; null;</pre>

They both return **no** rows! Countless SQL veterans have tried to explain this one to beginners. The beginner usually thinks the first row should return rows where `c1` is `NULL`. The veteran then points out that `NULL` is never equal to anything. The beginner then thinks, "if `NULL` isn't equal to anything, then '`WHERE COLUMN IS NOT EQUAL TO NULL`' is always true, so the second query should return all results!" The second `WHERE` clause is the logical opposite of the first, right? Right? Sadly, no it's not.

### The real problem: a language trap

The beginner has fallen into a language trap, which the experienced programmer probably set by saying "`NULL` is never equal to anything." That statement seems to imply "`NULL` is **NOT EQUAL TO**." Unfortunately, that's wrong. Not only is `NULL` not equal to anything, it's also **not unequal** to anything. This is where the language is confusing.

The truth is, saying anything with the words "equal" or "not equal" is a trap when discussing `NULL`s, because **there is no concept of equality or inequality, greater than or less than with `NULL`s**. Instead, one can only say "is" or "is not" (without the word "equal") when discussing `NULL`s.

### The right way to think about `NULL`

The correct way to understand `NULL` is that it is not a value. Not "this is a `NULL` value" but "this `NULL` is not a value." Everything either is a value, or it isn't. When something is a value, it is "1," or "hello," or "green," or "$5.00&#8243; etc -- but when something isn't a value, **it just isn't anything at all**. SQL represents "this has no value" by the special non-value `NULL`. When someone says "the `NULL` value," one should mentally disagree, because there's **no such thing**. `NULL` is the complete, total absence of any value whatsoever.

### What do you get when you compare a value to `NULL`?

Short answer: `NULL`. Every time. The result of comparing *anything* to `NULL`, even itself, is always, always `NULL`. A comparison to `NULL` is never true or false. Since `NULL` can never be equal to any value, it can never be unequal, either.

Sometimes people have difficulty understanding why a comparison to `NULL` can never be either true or false. Here's an informal proof that may help:

Given the following predicates,

1.  `NULL` is not a value
2.  No value can ever be equal to a non-value

Here's the proof by contradiction: Pretend for a moment that `NULL` is unequal to a value -- say a real number, excluding infinity and negative infinity. I'll choose an example number, say 5.

1.  Assume that `NULL <> 5`.
2.  That is, `NULL <> 5` is a true expression (comparison operations are boolean, true or false).
3.  That means "`NULL < 5 or NULL > 5`" is true, since I'm dealing with finite, real numbers; if it's not equal, it must be bigger or smaller.
4.  Therefore, there exists a real number equal to `NULL`; it's either less than 5 or greater than 5.
5.  That's a contradiction, because I took it as a given that no value can be equal to `NULL`.

Therefore `NULL` is neither equal to a value nor unequal to it, so any comparison involving `NULL` is **neither true nor false**. The result of a comparison involving `NULL` is not a boolean **value** -- it is a **non-value**. You just can't compare something that exists with something that doesn't exist.

It has to be this way, because if a comparison to a non-value had a defined value, every query could be rewritten to return a wrong result. It would be possible to transform expressions to equivalent expressions that gave the opposite answer, and so on.

### The correct way to write the queries

Instead of using boolean comparison operators such as less-than and greater-than, equal-to and not-equal-to, these queries must be written with the special comparison operator `IS NULL`:

<pre>select * from table where column is null;

select * from table where column is not null;</pre>

The `IS NULL` operator tests whether a value is null or not null, and returns a boolean.

### The truth is, I lied

I'm trying to write this article to help people understand how non-values work in queries, so I'm being generous with the truth.

Since computers only work with things that exist, non-existence isn't really possible, so `NULL`s must internally be implemented as some value, somewhere -- even if it's a value that indicates another value isn't a value (huh?).

I'm glossing over something about comparisons to `NULL`, too. `NULL`s result in tri-valued logic; booleans are no longer just `TRUE` and `FALSE`, but can be `UNKNOWN`, too. The result of comparing `NULL`s is `UNKNOWN`, which is not the same thing as `NULL`, but that's just semantic differences and deep mathematical pondering, and doesn't materially affect how you write queries.

MySQL, for example, implements `UNKNOWN` as `NULL`, though it it isn't perfectly consistent about it -- try these queries:

<pre>select unknown;
select null;
select true;
select false;
select null is unknown;
select false is null;
select true is null;
select unknown is null;</pre>

Just remember `NULL` is neither equal nor unequal to anything, and I promise you will always be safe. It's no use to get really picky about the fine points of `NULL` versus `UNKNOWN` and all that.

### A puzzler with `COUNT`

Someone posted a comment on the MySQL manual page about [extensions to the GROUP BY clause][1], and I think it's interesting to discuss here. The query is a way to count subsets within a group:

<pre>select shoeStyle,
   count(color) as Count,
   count(color = 'red' OR NULL) as redCount,
   count(color = 'green' OR NULL) as greenCount,
   count(color = 'blue' OR NULL) as blueCount
from bowlingShoes
group by shoeStyle;</pre>

The comment's author said "`OR NULL` is necessary, or you will just get a count of all rows in the group." Why is this?

If the `OR NULL` is omitted, the result of the expression is a boolean, `TRUE` or `FALSE`, which are actual values. The `COUNT` function counts any value that exists, not whether something is `TRUE` or `FALSE`, so the query is behaving correctly.

On the other hand, the result of the expression `color = 'green' OR NULL` is either `TRUE` or `NULL`. Boolean expressions are short-circuited when they're evaluated. As soon as the first sub-expression in a logical `OR` expression is true, the whole result is true, so when the color is green, the expression is `TRUE` immediately -- a `COUNT`-able value. If the color isn't green, the expression becomes `FALSE OR NULL`, which is `NULL`, of course -- not a `COUNT`-able value.

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
