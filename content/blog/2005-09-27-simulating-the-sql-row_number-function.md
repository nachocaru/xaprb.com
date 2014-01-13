---
title: How to simulate the SQL ROW_NUMBER function
date: "2005-09-27"
url: /blog/2005/09/27/simulating-the-sql-row_number-function/
categories:
  - Databases
---
If your RDBMS does not support the ROW\_NUMBER function, it is still possible to write some queries without it. ROW\_NUMBER operates over a partition of the result set, and returns a number for each row in a partition (it is possible to specify numbering schemes besides consecutive integers).

Ranking and windowing functions are available in Microsoft SQL Server 2005, and are part of the newer SQL standards. I expect it will be some time before MySQL implements them. I don't know about other systems such as PostgreSQL and Firebird. It has been a long time since I worked with Oracle, so I'm unsure about it, and viewing the Oracle documentation requires an account I'm unwilling to create.

### An easy solution

One easy solution is a temporary table with an identity (`AUTO_INCREMENT` in MySQL) column. Insert into the temporary table, then select from it again and use the values from the identity column. This only works when the result set contains a single partition, but it works very well and is very efficient.

### When the data has multiple partitions

If the data has multiple partitions, the solution is more complex. Here is one possible solution:

<pre>create table fruits (
    type varchar(10) not null,
    variety varchar(20) not null,
    primary key(type, variety));

insert into fruits values
('apple', 'gala'),
('apple', 'fuji'),
('apple', 'limbertwig'),
('orange', 'valencia'),
('orange', 'navel'),
('pear', 'bradford'),
('pear', 'bartlett'),
('cherry', 'bing'),
('cherry', 'chelan');

select l.type, l.variety, count(*) as num
from fruits as l
left outer join fruits as r
    on l.type = r.type
    and l.variety &gt;= r.variety
group by l.type, l.variety;

+--------+------------+-----+
| type   | variety    | num |
+--------+------------+-----+
| apple  | fuji       |   1 |
| apple  | gala       |   2 |
| apple  | limbertwig |   3 |
| cherry | bing       |   1 |
| cherry | chelan     |   2 |
| orange | navel      |   1 |
| orange | valencia   |   2 |
| pear   | bartlett   |   1 |
| pear   | bradford   |   2 |
+--------+------------+-----+</pre>

Here I've partitioned the data by the `type` column, so there are four partitions (apple, cherry, orange, pear). Notice the `num` column starts at 1 for each partition and counts upward.

The drawback to this solution is the LEFT OUTER JOIN with the >= in the join condition. This effectively makes the join a CROSS JOIN, which is inefficient (O(n<sup>2</sup>)). It may be a good idea to avoid this except on small data sets.

Another option on MySQL, but only with the MyISAM and BDB storage engines, is to use an `AUTO_INCREMENT` column as the second column in the primary key, which makes MySQL restart the numbering for each group.
