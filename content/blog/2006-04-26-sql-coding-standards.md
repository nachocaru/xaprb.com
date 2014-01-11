---
title: My personal SQL coding standards
date: "2006-04-26"
permalink: /2006/04/26/sql-coding-standards/
categories:
  - Databases
---
Coding standards are a Good Thing. Unfortunately, most organizations don't have much in the way of SQL coding standards, and there aren't many automated tools to help. As a result, I believe SQL is often less consistently written than many other languages. Here are my suggestions.

The following are only my opinions.

### Indentation

I use indentation as with any other programming language. I prefer to indent the beginning of each clause in a statement equally, because I consider them all equally important; in other words, I don't consider the `ORDER BY` clause somehow "inferior to" the `WHERE` clause. The result looks like this:

<pre>select column ...
from ...
where ...
group by ...
order by ...</pre>

Some programmers prefer to indent each part of the statement in turn, which leads to code that looks like this:

<pre>select column ...
    from ...
        where ...
            group by ...
                order by ...</pre>

I find this visually confusing, and it is unmaneagable in larger queries. Another indentation style I really dislike is right-left-justification, thusly:

<pre>select column ...
    from table ...
   where criterion ...
group by groupingclause ...
  having havingclause ...
order by orderingclause ...</pre>

I think it's very hard to read, but more importantly, it's beastly to maintain. I have better things to do than spend a bunch of time placing my cursor at the beginning of the line, adding spaces to right-justify something, then deleting internal whitespace in the line to left-justify whatever is on the right-hand side of the justification boundary. And as soon as I delete or add another part to the query, I probably have to adjust everything all over again. The following style is almost as hard to maintain:

<pre>select      column,
            column2,
            column3
from        table ...
where       criterion ...</pre>

It looks great until you need to join tables or have subqueries. Then it's a disaster. Sometimes it's not only hard to maintain, it's hard to read, too. Take a look at this blog entry about [modelling hierarchies in SQL][1], and notice how hard it is to figure out which tables are joined to which others, where the join criteria are, and so forth.

When I need to break lines, I indent one level, like so:

<pre>select
    column1,
    column2,
    column3,
    column4,
from ...
where ...
group by ...
order by ...</pre>

When I write a clause that is part of another clause, I indent it as well. For example, `JOIN`s are part of the `FROM` clause, so they should be indented after the first line:

<pre>select column ...
from ...
    inner join ...
    inner join ...
    left outer join ...
where ...
group by ...
order by ...</pre>

When I write subqueries, I treat the opening and closing parentheses just as opening and closing braces in C, which I do **not** place on a line by themselves:

<pre>select column ...
from ...
    inner join (
        select column ...
        from table ...
    ) as x ...
    inner join ...
    left outer join ...
where ...
group by ...
order by ...</pre>

When I write `INSERT ... SELECT` statements, I indent everything but the first clause:

<pre>insert into ...
    select ...</pre>

### Keep lines short

I try to keep lines short enough that I don't have to scroll horizontally in a non-wrapping editor. This typically means no more than 80 characters wide. When I have to break a line, I break before operators (logical operators, such as `AND`, or mathematical operators like `+`). I indent each broken line one level from the first line of the broken clause, as I explained above.

Commas are not operators, and in my opinion belong at the end of the line. I think the following is very hard to read and maintain:

<pre>select
     col1
    ,col2
    ,col3 ...</pre>

The reasons why operators, but not commas, should go at the beginning of the line are well-discussed in the literature of other programming languages. The goals are immediate comprehension when reading code, and ease of maintenance.

### Uppercase or lowercase?

SQL is a case-insensitive language. There are two parts of the language to worry about: keywords and object names. I lowercase all keywords in queries, but I usually uppercase them in my writing, such as when I mention a `SELECT` statement in a sentence. Why? Simple: uppercasing them in normal writing makes them stand out, and since they're not surrounded by uppercased text, the shouting is short-lived. I lowercase keywords in queries, because

*   it is much easier to read mixed-case letters with ascenders and descenders (this has been proven time and time again in the laboratory)
*   it's a lot easier to type and time is precious, as are my tendons
*   any decent SQL editor highlights keywords anyway, making them stand out visually and obviating the need to uppercase them

As for object names, I type them in the correct case. If the object is named `SomeTable`, I think it's sloppy to type it as `sometable` or `SOMETABLE`. Uniformity is important for readability and maintainability, and typing an object name in its proper case is following the obvious leader. Some platforms, such as MySQL, are case-sensitive in this area anyway. This lack of uniformity is why I detest case-insensitive languages, and try to program as though they're case-sensitive anyway.

### Object naming standards

Tables, columns, views, stored procedures, indexes, and so forth can really benefit from naming standards. Here are my suggestions:

*   Tables should have singular names. In my experience, it makes names of related objects much easier to manage. You might not think so at first, but I've seen more than one organization change their mind after it gets really messy and switch from plural to singular. This point, however, is probably the biggest single invitation to a flame war in coding standards.
*   Choose a naming convention for indexes and foreign keys, such as FK\_child\_parent and IX\_table\_col.
*   Don't run words together in names. Either use MixedCapitalization to separate them, or use underscores\_to\_separate_words. All-lowercase words mashed together are hard to both read and type, and make it too easy to make typos. Here are some examples of names (in this case, column names) that are hard to read: `emailwhenrowsexceed`, `clientsteamleader`, `apiratesheet`.
*   Name things what they are, not what they do. I once redesigned a schema with a table naming standard that encouraged naming tables in a "ThisToThat" fashion. For example, one of the table names was something like "ProdGroupToSuperProdGroupAssociationToProdMenuCategoryAssociation." Not only was that a super-long, confusing, meaningless name, it turned out the table had only one column not involved in relationships to other tables, called "CategoryOrder." This column recorded the preferred ordering of a ProdGroup's Category records. There was a default ordering, and this table had records only when the default ordering needed to be overriden. Therefore, the table recorded category ordering, and I renamed it to something more sensible, like CategoryOrdering.
*   Long is not good, but short is even worse. Don't kid yourself &#8212; when you come back 6 months later to maintain the code you thought was crystal-clear, you'll no longer have any idea what `srdvpls4tp` is (`standard_deviation_plus_4_time_period`).
*   Abbreviations are only good when they're so overwhelmingly common they're part of everyday English, in my opinion. At the risk of picking on my current employer, `costrecon` is a poor name because "recon" is a more common abbreviation for "reconnaissance" than "reconciliation" (the intended meaning). I can never remember what the "other recon word" is. It is literally an effort for me to think of "reconciliation."
*   I hate Hungarian naming schemes, and all variations thereof. They just make everything harder to read and write, and they are like comments &#8212; they're just a maintenance hazard.

I see I'm starting to go on longer than I want to. Much has been written about naming in other languages, and it all applies to SQL, so I'll leave it at that. Good naming is good naming.

### Write out the full syntax

It's much clearer to write the full syntax of the language than to use shortcuts. For example, I always explicitly state whether a `JOIN` is a `FULL`, `LEFT`, or `INNER` join.

Likewise, I always use the `AS` keyword in aliases. Including it draws attention to the fact that something is being renamed, and omitting it can cause some subtle bugs. If it's omitted, the difference between an alias and the next element in a list is a comma &#8212; a small, easy-to-miss character. For instance,

<pre>select a b, c, d, e
from table1 table2</pre>

That's just hard to read. Look again &#8212; it's not doing what you might think. Did you find both bugs?

### Always insert into named columns

You'll see me do it in this blog for brevity, but in the real world I never do blind (anonymous) inserts. It's hard to figure out what data goes where, and if a table structure changes, blind inserts will break &#8212; possibly badly, but even worse, possibly not badly, in which case inserts will succeed and corrupt the data data, instead of failing and at least preserving data integrity.

This is an anonymous insert:

<pre>insert into t1 values (1, 5);</pre>

This is better, because it uses named columns:

<pre>insert into t1(c2, c5) values (1, 5)</pre>

### Joins

Old-style joins, where the tables are named in the `FROM` clause but no join clauses are given, are hard to read, write and maintain. Since the join criteria end up in the `WHERE` clause, it's hard to tell what's a join criterion and what is for eliminating unwanted rows. I never use old-style joins.

I never use `RIGHT OUTER` joins. They can always be rewritten as `LEFT OUTER` joins, which people expect and can understand more readily.

It really helps improve readability if the order of the `ON` statements in join clauses is consistent. For example,

<pre>...
from table1
    inner join table2 on <strong>table1</strong>.a = table2.a
    inner join table3 on <strong>table1</strong>.b = table3.b
...</pre>

This is a lot easier to understand than

<pre>...
from table1
    inner join table2 on <strong>table1</strong>.a = table2.a
    inner join table3 on table3.b = <strong>table1</strong>.b
...</pre>

I think it's important to fully qualify tables in joins too, even if the columns aren't ambiguous. It lets me know where the data is coming from without forcing me to go back and forth from the query to the table structure. I try to qualify *everywhere* I refer to a column, not just in one section of a query, when more than one table is involved in the query.

Fully qualifying also future-proofs the join. If a column name is unambiguous because it only appears in one table, but then someone adds a column with the same name to another table, the query will cause an error. And it may be hard to figure out how to fix the query, if you don't know [which table had the column originally and which it just got added to][2].

`USING` clauses can greatly simplify and clarify joins, but may not behave the same as standard `ON` clauses on a given platform, even between different versions (as in MySQL 4 and 5). I think they're good to use when they help, but only when the statement is fully qualified, so there's no ambiguity. And I avoid `NATURAL JOIN`, because it's not future-proof if someone adds columns to the tables involved. I think a `NATURAL JOIN` is the `JOIN` equivalent to a blind insert, which I discussed above.

### Grouping and ordering

SQL allows referring to columns by number, but then you have to do a bunch of mental cross-references between the `GROUP BY` and `ORDER BY` clauses to figure out how the data is sorted and ordered:

<pre>select c1, c2, sum(c3), max(c4)
from t1
group by 1, 2
order by 2, 4</pre>

is much less readable and maintainable than

<pre>select c1, c2, sum(c3), max(c4)
from t1
group by c1, c2
order by c2, max(c4)</pre>

I continue to refer people to this post on [how to group data correctly in SQL][3]. It is a weak point for many programmers.

### Tools

A lot of my opinions on coding standards are informed by great books like [Perl Best Practices][4].

Other programming languages have great tools to help maintain consistent coding style (such as `perltidy` or `indent`), but I can't find the equivalent in SQL. There is one [online SQL formatter][5], but I don't think it does a very good job. If I'm faced with catastrophically ugly code, I suppose it's a place to start, but I wouldn't use it to enforce a coding standard.

 [1]: http://rpbouman.blogspot.com/2005/08/yet-another-way-to-model-hierarchies.html
 [2]: /blog/2006/07/09/so-you-think-your-code-is-in-version-control/
 [3]: http://weblogs.sqlteam.com/jeffs/archive/2005/12/14/8546.aspx
 [4]: http://www.oreilly.com/catalog/perlbp/
 [5]: http://www.wangz.net/cgi-bin/pp/gsqlparser/sqlpp/sqlformat.tpl
