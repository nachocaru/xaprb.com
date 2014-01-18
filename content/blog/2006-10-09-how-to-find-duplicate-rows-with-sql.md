---
title: How to find duplicate rows with SQL
date: "2006-10-09"
url: /blog/2006/10/09/how-to-find-duplicate-rows-with-sql/
categories:
  - Databases
---
This article shows how to find duplicated rows in a database table. This is a very common beginner question. The basic technique is straightforward. I'll also show some variations, such as how to find "duplicates in two columns" (a recent question on the #mysql IRC channel).

### How to find duplicated rows

The first step is to define what exactly makes a row a duplicate of another row. Most of the time this is easy: they have the same value in some column. I'll take this as a working definition for this article, but you may need to alter the queries below if your notion of "duplicate" is more complicated.

For this article, I'll use this sample data:

<pre>create table test(id int not null primary key, day date not null);

insert into test(id, day) values(1, '2006-10-08');
insert into test(id, day) values(2, '2006-10-08');
insert into test(id, day) values(3, '2006-10-09');

select * from test;
+----+------------+
| id | day        |
+----+------------+
|  1 | 2006-10-08 |
|  2 | 2006-10-08 |
|  3 | 2006-10-09 |
+----+------------+</pre>

The first two rows have the same value in the `day` column, so if I consider those to be duplicates, here's a query to find them. The query uses a `GROUP BY` clause to put all the rows with the same `day` value into one "group" and then count the size of the group:

<pre>select day, count(*) from test GROUP BY day;
+------------+----------+
| day        | count(*) |
+------------+----------+
| 2006-10-08 |        2 |
| 2006-10-09 |        1 |
+------------+----------+</pre>

The duplicated rows have a count greater than one. If you only want to see rows that are duplicated, you need to use a `HAVING` clause (not a `WHERE` clause), like this:

<pre>select day, count(*) from test group by day HAVING count(*) &gt; 1;
+------------+----------+
| day        | count(*) |
+------------+----------+
| 2006-10-08 |        2 |
+------------+----------+</pre>

This is the basic technique: group by the column that contains duplicates, and show only those groups having more than one row.

### Why can't you use a `WHERE` clause?

A `WHERE` clause filters the rows *before* they are grouped together. A `HAVING` clause filters them *after* grouping. That's why you can't use a `WHERE` clause in the above query.

### How to delete duplicate rows

A related question is how to delete the 'duplicate' rows once you find them. A common task when cleaning up bad data is to delete all but one of the duplicates, so you can put proper indexes and primary keys on the table, and prevent duplicates from getting into the table again.

Again, the first thing to do is make sure your definition is clear. Exactly which row do you want to keep? The 'first' one? The one with the largest value of some column? For this article, I'll assume you want to keep the 'first' row -- the one with the smallest value of the `id` column. That means you want to delete every other row.

Probably the easiest way to do this is with a temporary table. Especially in MySQL, there are some restrictions about selecting from a table and updating it in the same query. You can get around these, as I explain in my article [How to select from an update target in MySQL][1], but I'll just avoid these complications and use a temporary table.

The exact definition of the task is to **delete every row that has a duplicate, except the row with the minimal value of `id` for that group**. So you need to find not only the rows where there's more than one in the group, you also need to find **the row you want to keep**. You can do that with the `MIN()` function. Here are some queries to create the temporary table and find the data you need to do the `DELETE`:

<pre>create temporary table to_delete (day date not null, min_id int not null);

insert into to_delete(day, min_id)
   select day, MIN(id) from test group by day having count(*) &gt; 1;

select * from to_delete;
+------------+--------+
| day        | min_id |
+------------+--------+
| 2006-10-08 |      1 |
+------------+--------+</pre>

Now that you have this data, you can proceed to delete the 'bad' rows. There are many ways to do this, and some are better than others (see my [article about many-to-one problems in SQL][2]), but again I'll avoid the finer points and just show you a standard syntax that ought to work in any RDBMS that supports subqueries:

<pre>delete from test
   where exists(
      select * from to_delete
      where to_delete.day = test.day and to_delete.min_id &lt;&gt; test.id
   )</pre>

If your RDBMS does not support subqueries, or if it's more efficient, you may wish to do a multi-table delete. The syntax for this varies between systems, so you need to consult your system's documentation. You may also need to do all of this in a transaction to avoid other users changing the data while you're working, if that's a concern.

### How to find duplicates in multiple columns

Someone recently asked a question similar to this on the #mysql IRC channel:

> I have a table with columns `b` and `c` that links two other tables `b` and `c`, and I want to find all rows that have duplicates in either `b` or `c`.

It was difficult to understand exactly what this meant, but after some conversation I grasped it: the person wanted to be able to put unique indexes on columns `b` and `c` separately.

It's pretty easy to find rows with duplicate values in one or the other column, as I showed you above: just group by that column and count the group size. And it's easy to find entire rows that are exact duplicates of other rows: just group by as many columns as you need. But it's harder to identify rows that have either a duplicated `b` value or a duplicated `c` value. Take the following sample table, which is roughly what the person described:

<pre>create table a_b_c(
   a int not null primary key auto_increment,
   b int,
   c int
);

insert into a_b_c(b,c) values (1, 1);
insert into a_b_c(b,c) values (1, 2);
insert into a_b_c(b,c) values (1, 3);
insert into a_b_c(b,c) values (2, 1);
insert into a_b_c(b,c) values (2, 2);
insert into a_b_c(b,c) values (2, 3);
insert into a_b_c(b,c) values (3, 1);
insert into a_b_c(b,c) values (3, 2);
insert into a_b_c(b,c) values (3, 3);</pre>

Now, you can easily see there are some 'duplicate' rows in this table, but no two rows actually have the same tuple `{b, c}`. That's why this is a bit more difficult to solve.

### Queries that don't work

If you group by two columns together, you'll get various results depending on how you group and count. This is where the IRC user was getting stumped. Sometimes queries would find some duplicates but not others. Here are some of the things this person tried:

<pre>select b, c, count(*) from a_b_c
group by b, c
having count(distinct b &gt; 1)
   or count(distinct c &gt; 1);</pre>

This query returns every row in the table, with a `COUNT(*)` of 1, which seems to be wrong behavior, but it's actually not. Why? Because the `> 1` is inside the `COUNT()`. It's pretty easy to miss, but this query is actually the same as

<pre>select b, c, count(*) from a_b_c
group by b, c
having count(1)
   or count(1);</pre>

Why? Because `(b > 1)` is a boolean expression. That's not what you want at all. You want

<pre>select b, c, count(*) from a_b_c
group by b, c
having count(distinct b) &gt; 1
   or count(distinct c) &gt; 1;</pre>

This returns zero rows, of course, because there are no duplicate `{b, c}` tuples. The person tried many other combinations of `HAVING` clauses and ORs and ANDs, grouping by one column and counting the other, and so forth:

<pre>select b, count(*) from a_b_c group by b having count(distinct c) &gt; 1;
+------+----------+
| b    | count(*) |
+------+----------+
|    1 |        3 |
|    2 |        3 |
|    3 |        3 |
+------+----------+</pre>

Nothing found all the duplicates, though. What I think made it most frustrating is that it partially worked, making the person think it was almost the right query... perhaps just another variation would get it...

In fact, it's **impossible** to do with this type of simple `GROUP BY` query. Why is this? It's because when you group by one column, you distribute like values of the *other* column across multiple groups. You can see this visually by ordering by those columns, which is what grouping does. First, order by column `b` and see how they are grouped:

<table class="collapsed borders">
  <tr>
    <th>
      a
    </th>
    
    <th>
      b
    </th>
    
    <th>
      c
    </th>
  </tr>
  
  <tr>
    <td>
      7
    </td>
    
    <td>
      1
    </td>
    
    <td>
      1
    </td>
  </tr>
  
  <tr>
    <td>
      8
    </td>
    
    <td>
      1
    </td>
    
    <td>
      2
    </td>
  </tr>
  
  <tr>
    <td>
      9
    </td>
    
    <td>
      1
    </td>
    
    <td>
      3
    </td>
  </tr>
  
  <tr>
    <td>
      10
    </td>
    
    <td>
      2
    </td>
    
    <td>
      1
    </td>
  </tr>
  
  <tr>
    <td>
      11
    </td>
    
    <td>
      2
    </td>
    
    <td>
      2
    </td>
  </tr>
  
  <tr>
    <td>
      12
    </td>
    
    <td>
      2
    </td>
    
    <td>
      3
    </td>
  </tr>
  
  <tr>
    <td>
      13
    </td>
    
    <td>
      3
    </td>
    
    <td>
      1
    </td>
  </tr>
  
  <tr>
    <td>
      14
    </td>
    
    <td>
      3
    </td>
    
    <td>
      2
    </td>
  </tr>
  
  <tr>
    <td>
      15
    </td>
    
    <td>
      3
    </td>
    
    <td>
      3
    </td>
  </tr>
</table>

When you order (group) by column `b`, the duplicate values in column `c` are distributed into different groups, so you can't count them with `COUNT(DISTINCT c)` as the person was trying to do. Aggregate functions such as `COUNT()` only operate within a group, and have no access to rows that are placed in other groups. Similarly, when you order by `c`, the duplicate values in column `b` are distributed into different groups. It is not possible to make this query do what's desired.

### Some correct solutions

Probably the simplest solution is to *find the duplicates for each column separately* and `UNION` them together, like this:

<pre>select b as value, count(*) as cnt, 'b' as what_col
 from a_b_c group by b having count(*) &gt; 1
 union
 select c as value, count(*) as cnt, 'c' as what_col
 from a_b_c group by c having count(*) &gt; 1;
+-------+-----+----------+
| value | cnt | what_col |
+-------+-----+----------+
|     1 |   3 | b        |
|     2 |   3 | b        |
|     3 |   3 | b        |
|     1 |   3 | c        |
|     2 |   3 | c        |
|     3 |   3 | c        |
+-------+-----+----------+</pre>

The `what_col` column in the output indicates what column the duplicate value was found in. Another approach is to use subqueries:

<pre>select a, b, c from a_b_c
 where b in (select b from a_b_c group by b having count(*) &gt; 1)
    or c in (select c from a_b_c group by c having count(*) &gt; 1);
+----+------+------+
| a  | b    | c    |
+----+------+------+
|  7 |    1 |    1 |
|  8 |    1 |    2 |
|  9 |    1 |    3 |
| 10 |    2 |    1 |
| 11 |    2 |    2 |
| 12 |    2 |    3 |
| 13 |    3 |    1 |
| 14 |    3 |    2 |
| 15 |    3 |    3 |
+----+------+------+</pre>

This is probably much less efficient than the `UNION` approach, and will show every duplicated row, not just the values that are duplicated. Still another approach is to do self-joins against grouped subqueries in the `FROM` clause. This is more complicated to write correctly, but might be necessary for some complex data, or for efficiency:

<pre>select a, a_b_c.b, a_b_c.c
from a_b_c
   left outer join (
      select b from a_b_c group by b having count(*) &gt; 1
   ) as b on a_b_c.b = b.b
   left outer join (
      select c from a_b_c group by c having count(*) &gt; 1
   ) as c on a_b_c.c = c.c
where b.b is not null or c.c is not null</pre>

Any of these queries will do, and I'm sure there are other ways too. If you can use `UNION`, it's probably the easiest.

 [1]: http://www.xaprb.com/blog/2006/06/23/how-to-select-from-an-update-target-in-mysql/
 [2]: http://www.xaprb.com/blog/2006/03/11/many-to-one-problems-in-sql/

 *[RDBMS]: Relational Database Management System
