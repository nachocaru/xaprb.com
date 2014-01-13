---
title: Tips and tricks for bitwise arithmetic
date: "2005-09-28"
url: /blog/2005/09/28/bitwise-arithmetic/
categories:
    - Programming
---
Bitwise arithmetic can be very useful, and not just for C and graphics programmers, but for all types of programming tasks. Those who use it frequently enough become fluent. Here I present a few tips. As I think of more, I will add them here.

### Signed versus unsigned

Remember numbers can be signed or unsigned. Know the difference, and know the arithmetic for both. For example, when checking to see if a certain bit is set:

<pre>if (number & mask &gt; 0) // wrong!  It could be &lt; 0
if (number & mask != 0) // confusing.  Bad practice!
if (number & mask == mask) // good!</pre>

### Let the compiler optimize

When you care about performance and want a 1/0 value indicating whether a (compile-time constant) bit is set, don't write conditional logic. Conditional logic ends up being branches and jumps in the final instruction set, and this is a severe performance hit. Branches and jumps cause the processor to have to speculate about what instructions are in the future, interfering with pipelining and pre-fetching of memory. It might seem trivial, but it's not; all the memory access can be avoided (huge saving!) and the pipeline can stay full. Instead, write your test like this:

<pre>bitset = (number & bit) / bit;</pre>

Why is this optimal? The compiler is smart enough to recognize you are dividing by a constant multiple of two, and can emit a `shift` instruction, so your actual instruction ends up being very cheap indeed, with no need for branching. If you're writing it in SQL, this is also much better than using a CASE statement:

<pre>set @bitset = case when @number & @bit &lt;> 0 then 1 else 0 end; -- bad!
set @bitset = (@number & @bit) / @bit; -- good!</pre>

The CASE statement is to be avoided because it's essentially a function call.

### Switching two values

You can switch two values without a temporary variable by bitwise `XOR`ing them three times, e.g.

<pre>declare @a int, @b int
select @a = 5, @b = 10
set @a = @a ^ @b
set @b = @a ^ @b
set @a = @a ^ @b
select @a, @b</pre>

Or, in MySQL,

<pre>select @a := 5, @b := 10;
select @a := (@a ^ @b);
select @b := (@a ^ @b);
select @a := (@a ^ @b);
select @a, @b;
+------+------+
| @a   | @b   |
+------+------+
| 10   | 5    |
+------+------+</pre>

### Multiply by 1/0 instead of using a conditional

This isn't strictly bitwise arithmetic, it's about using the power of true and false. This tip is especially useful in SQL. It comes up often when I'm writing a query to use valid values and ignore invalid ones, especially in updates from a grouped set of data. For example, suppose I want to calculate whether orders are valid in one query, then find the total value of valid orders, total value of all orders, count of items on valid orders, and count of items on all orders in a single query. The first query will be something that ends up setting a 1 or 0 value in a column, something like `update order set valid = 1 where...`. The second query could now look something like the following:

<pre>select
   sum(case when o.valid = 1 then i.value else 0 end) as valid_value,
   sum(i.value) as valid_value,
   sum(case when o.valid = 1 then 1 else 0 end) as valid_items,
   count(*) as total_items
from orders as o
   inner join ordered_items as i on i.order = o.order_id
group by o.order_id</pre>

All those `case when` statements are inefficient and hard to read, write, debug and maintain. The following is much simpler:

<pre>select
   sum(o.valid = 1 * i.value) as valid_value,
   sum(i.value) as total_value,
   sum(i.value) as valid_items,
   count(*) as total_items
from orders as o
   inner join ordered_items as i on i.order = o.order_id
group by o.order_id</pre>

To negate the logic, use bitwise `XOR`. For example, suppose I have a table of aggregated sales data that's over-normalized to include a 1/0 flag in the primary key:

<pre>create table salesdata (
   day date not null,
   is_catalog tinyint not null,
   orders int not null,
   sales decimal(12,2) not null,
   primary key(day, is_catalog_sale)
);</pre>

I want to de-normalize this data and end up with the following structure:

<pre>create table salesdata_denormalized (
   day date not null,
   non_catalog_orders int not null,
   non_catalog_sales decimal(12,2) not null,
   catalog_orders int not null,
   catalog_sales decimal(12,2) not null,
   primary key(day)
);</pre>

The following query will do it efficiently and compactly:

<pre>insert into salesdata_denormalized
  (day, non_catalog_orders, non_catalog_sales, catalog_orders, catalog_sales)
select
   day,
   sum(orders * (is_catalog ^ 1)),
   sum(sales * (is_catalog ^ 1)),
   sum(orders * is_catalog),
   sum(sales * is_catalog)
from salesdata
group by day;</pre>
