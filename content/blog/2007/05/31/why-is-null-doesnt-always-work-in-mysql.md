---
title: "Why IS NULL doesn't always work in MySQL"
date: "2007-05-31"
url: /blog/2007/05/31/why-is-null-doesnt-always-work-in-mysql/
categories:
  - Databases
---
How can a query like "SELECT * FROM tbl WHERE col IS NULL" return a row where the column has a (non-NULL) value? Read on to find out.

### First, a demonstration

Try this one yourself:

<pre>create table test(
   a int not null auto_increment,
   b int not null,
   primary key (a)
);

insert into test(a, b) values (0, 1);

select * from test where a is null;
+---+---+
| a | b |
+---+---+
| 1 | 1 | 
+---+---+</pre>

Your reaction might be, as mine was, "what the heck is going on here?" And then you might re-try the query, just because you can't believe your eyes, and guess what you get this time?

<pre>select * from test where a is null;
Empty set (0.00 sec)</pre>

### What happened?

A lot of weird things happened here: 
1.  MySQL didn't insert 0 into the first column; it inserted 1.
2.  I asked for rows where the first column is NULL, which should return no rows, but I got a row where it is clearly *not* NULL.
3.  I repeated the query and got a different result.

### It's a feature, not a bug

Believe it or not, these are features, not bugs. No, really!

1.  MySQL inserted a 1 into the column because by default, inserting either a zero or nothing (e.g. omitting the column or explicitly inserting NULL) into an auto-increment column tells MySQL to generate the next value in the auto-increment sequence. In newer MySQL versions, you can set the [Server SQL Mode][1] to disable this behavior.
2.  MySQL returned the last inserted row for compatibility with some brain-dead systems. (Does this make MySQL brain-dead? Well, maybe this particular behavior is a little brain-dead). This is controlled by the [SQL\_AUTO\_IS_NULL server variable][2], which according to the manual,
    
    > If set to 1 (the default), you can find the last inserted row for a table that contains an AUTO_INCREMENT column by using the following construct:
    > 
    > `WHERE auto_increment_column IS NULL`
    > 
    > This behavior is used by some ODBC programs, such as Access.

3.  MySQL only returns the last inserted row once; the next statement will return a sane result (`LAST_INSERT_ID()` does not have this limitation).

Bizarre, eh? However, any system that's really used much in the real world will end up with these kinds of idiosyncrasies to meet particular needs. Oh, the joy of trying to be compatible with Microsoft Access!

### Conclusion

Know thy [MySQL Manual][3]. I only discovered these things by accident. The good news is, the manual is really, really good; it has to be one of the best pieces of documentation I know. Now, if only [innotop][4]'s manual were that good...

 [1]: http://dev.mysql.com/doc/refman/5.0/en/server-sql-mode.html
 [2]: http://dev.mysql.com/doc/refman/5.0/en/set-option.html
 [3]: http://dev.mysql.com/doc/refman/5.0/en/
 [4]: http://code.google.com/p/innotop/
