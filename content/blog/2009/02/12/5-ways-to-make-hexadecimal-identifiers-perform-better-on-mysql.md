---
title: 5 ways to make hexadecimal identifiers perform better on MySQL
date: "2009-02-12"
url: /blog/2009/02/12/5-ways-to-make-hexadecimal-identifiers-perform-better-on-mysql/
categories:
  - Databases
---
One of the most common patterns I see in my consulting work is identifiers that are generated by MD5() or UUID(). Many times this is done in an application framework or something similar -- not software the client has written. From the application programmer's point of view, it's just an incredibly handy idiom: generate a unique value and use it, you're done.

Those values tend to appear in session identifiers, but that's not the only place; I especially notice them in apps that use Java's Hibernate interfaces, whether session IDs are involved or not. They propagate themselves all around the other tables, where they become secondary indexes and even get combined with other columns to make even bigger keys.

What's wrong with this? There are two major things that hurt performance in such cases: larger data and indexes, and non-sequential values. I'll ignore the latter in this article, since whether an identifier is better off sequential or not is often dictated by specific technology choices (e.g. InnoDB's clustered primary keys.) But I do want to mention about the larger data and show some ways to alleviate the performance impact of using hexadecimal strings as identifiers.

I'll speak mostly about MySQL here, but the same techniques apply almost universally to any database.

### One: watch out for character set

Take a look at the following EXPLAIN plan:

<pre>mysql&gt; explain select * from t where id = '0cc175b9c0f1b6a831c399e269772661'\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: t
         type: const
possible_keys: PRIMARY
          key: PRIMARY
      key_len: 98
          ref: const
         rows: 1
        Extra: Using index
</pre>

Why is the index 98 bytes long? Simple -- the utf8 character set was used:

<pre>CREATE TABLE `t` (
  `id` varchar(32) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8
</pre>

You don't need to store hexadecimal values with utf8. It doesn't actually use any more space on disk for the table itself (long complex topic I won't get into) but it uses about three times more memory and disk space for sorts, group-by, implicit temp tables, and so on. This is MySQL-specific as far as I know.

### Two: use fixed-length, non-nullable values

You can see I'm storing the value in a VARCHAR. It would be better to store it in CHAR if all the values are the same length. And here I've made it non-NULL, but in many cases I see such columns are permitted to be NULL even when they will always have a value. These are generic best-practice kind of suggestions and apply to all cases, not just this case of hex identifiers. And I should point out that these are low-impact suggestions -- following them won't make a dramatic difference in typical cases (although it does matter a lot sometimes). If you're going to use utf8, stay away from fixed-length columns, by the way.

### Three: Make it BINARY

You don't actually need to store characters. The characters are just a way of representing numbers. Store them directly. For example, what is 00000000000000000000000000002E2A really? It's really the base-16 representation of the (base-ten) number 11818 and is much better stored as an integer in 4 bytes (or less) instead of 32.

The problem is, these long values aren't representable in commonly available integer storage sizes. They're much bigger than a BIGINT. However, MySQL does permit you to store them in a BINARY column, which is just a string of bytes with no character set semantics. It's more compactand it's a lot faster to do comparisons (and hence index lookups). You can use the HEX() and UNHEX() functions to transform between the representations, or just use hexadecimal literal syntax: 
<pre>mysql&gt; select x'7861707262';
+---------------+
| x'7861707262' |
+---------------+
| xaprb         | 
+---------------+
</pre>

This makes it easy to work with the values without having to do conversions in your code if that's more convenient (although note that you'll be sending more data from/to the server -- but if it makes it easier for your code, it might be a reasonable compromise). So instead of

<pre>select * from t where id = '0cc175b9c0f1b6a831c399e269772661';
</pre>

You can just add a single 'x' to the query, like this:

<pre>select * from t where id = x'0cc175b9c0f1b6a831c399e269772661';
</pre>

After converting the table to use a BINARY(16) column and re-inserting the same data in binary form, look at the difference it makes:

<pre>explain select * from t where id = x'0cc175b9c0f1b6a831c399e269772661'\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: t
         type: const
possible_keys: PRIMARY
          key: PRIMARY
      key_len: 16
          ref: const
         rows: 1
        Extra: Using index
</pre>

The lookup is on a much smaller value. If you're using a UUID() that is formatted with strings of hex characters separated by dashes, you can delete the dashes with REPLACE(); they are for visual formatting only and don't have any semantics.

### Four: use prefix indexes

In many but not all cases, you don't need to index the full length of the value. I usually find that the first 8 to 10 characters are unique. If it's a secondary index, this is generally good enough. The beauty of this approach is that you can apply it to existing applications without any need to modify the column to BINARY or anything else -- it's an indexing-only change and doesn't require the application or the queries to change. **This is a very low-hanging fruit** and it's usually an option even when other options are not feasible or desired.

Figuring out how much of the value to index can be complex when there is skew (more on this later). In the simplest cases you can just run a query like this:

<pre>mysql&gt; select count(distinct id), count(distinct left(id, 8)), count(distinct left(id, 9)) from t\G
*************************** 1. row ***************************
         count(distinct id): 2
count(distinct left(id, 8)): 2
count(distinct left(id, 9)): 2
</pre>

Here you can see I have a trivial 2-row test case so it's not a good example. In the real world you can compare the number of distinct values (you can omit that for a primary key, but this technique generally applies best to secondary indexes which may not be unique) to the number of distinct prefixes, for each prefix length, and choose the shortest one that's "good enough." Then make an index on that prefix.

### Five: build hash indexes

I've been working with one application that likes to combine such hex identifiers into "paths" similarly to a filesystem. So if you want to look up some row or other, you ask the database for "92eb5ffee6ae2fec3ad71c777531578f/0cc175b9c0f1b6a831c399e269772661&#8243; or even longer combinations of values.

This does two things. One, it makes keys really, really really long. Two, it makes a lot of duplicate prefixes, so prefix indexing simply doesn't work. The prefixes have skewed cardinalities so there are values for which a lot of rows will match.

When there's skew like this, you need to compare the average cardinality to the worst-case, which you can find with queries such as

<pre>mysql&gt; select left(id, 10) as left_10, count(*) as cnt from t
group by left_10 order by cnt desc limit 10;
+------------+-----+
| left_10    | cnt |
+------------+-----+
| 0cc175b9c0 |   1 | 
| 92eb5ffee6 |   1 | 
+------------+-----+
</pre>

Of course here you see again my trivial test case, but you might see very bad results; you might have a half-million rows in the table and one-third of them start with 0cc175b9c0. Even if you make the prefix 32 characters long, you'll still match one-third of the table. You don't get a good usable prefix until 32 characters plus 8 characters -- and a 40-character index is loooong. So prefix indexing really doesn't work in cases like this.

What you can do is generate a checksum of the values and index that. That's right, a hash-of-a-hash. For most cases, CRC32() works pretty well (if not, you can use a [64-bit hash function][1]). Create another column: 
<pre>mysql&gt; alter table t add crc int unsigned not null, add key(crc);
mysql&gt; update t set crc=crc32(id);
mysql&gt; explain select * from t use index(crc) where id = '0cc175b9c0f1b6a831c399e269772661' and crc=crc32('0cc175b9c0f1b6a831c399e269772661')\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: t
         type: ref
possible_keys: crc
          key: crc
      key_len: 4
          ref: const
         rows: 1
        Extra: Using where
</pre>

Now it's using the 4-byte index on the CRC values. (I had to say "use index(crc)" because on my silly test case there's so little data it used the PRIMARY key otherwise). You can keep the CRC column updated with a pair of triggers, or maintain it directly in your queries that modify the table. Triggers add side effects you might not desire.

The CRC column isn't guaranteed to be unique, so you need *both* criteria in the WHERE clause or this technique won't work. Hash collisions happen quickly; you will probably get a collision with about 100k values, which is much sooner than you might think -- don't assume that a 32-bit hash means you can put 4 billion rows in your table before you get a collision.

By the way, this isn't a suggestion that's unique to MySQL. Other database servers can do the same thing (and even in a more elegant way -- many other database servers support indexes over expressions). Here's an example of [how to build a hash index with Microsoft SQL Server][2]. (Anyone know what the underlying algorithm of CHECKSUM() is? It's not CRC32)

### Conclusion

Hexadecimal identifiers make your tables and indexes bigger, and slow down comparisons and lookups. My advice is usually "don't do it," but if you must use hexadecimal values for identifiers, hopefully this article has a few suggestions you can use to make them more efficient.

 [1]: http://www.xaprb.com/blog/2008/03/09/a-very-fast-fnv-hash-function-for-mysql/
 [2]: http://msdn.microsoft.com/en-us/library/aa258245(SQL.80).aspx
