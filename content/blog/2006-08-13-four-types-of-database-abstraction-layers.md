---
title: Four types of database abstraction layers
date: "2006-08-13"
url: /blog/2006/08/13/four-types-of-database-abstraction-layers/
categories:
  - Databases
---
Quite a few people have chimed in on a recent discussion about PHP, MySQL, database abstraction layers, and performance. I think enough viewpoints have been covered that I don't need to comment, but one question I don't see answered is "what are the qualities of a good SQL abstraction layer?" I think it's a very interesting -- and complicated -- question. As it turns out, the term has several meanings, and I think it's important to understand them.

I started drafting this article in February, but put it aside until the recent spate of articles prompted me to finish it. Here are links to some of those articles:

*   [Five common PHP database problems][1], the IBM developerWorks article that started it all.
*   [Kristian's response][2]
*   [Peter's response to Kristian's response][3]
*   [Brian Moon's thoughts ][4]

This issue has been discussed before, too. For example,

*   Jeremy Zawodny's take: [Database Abstraction Layers Must Die!][5] (posted over two years ago)
*   A [rant on templating systems that goes off into "database abstraction layers"][6], from 2001

That explains why I'm not going to jump into the fray with my thoughts on the developerWorks article; everything I'd say has been said before. I just want to see if I can clarify what people mean by "database abstraction layer," and lay out some ways to think about what's good and bad in such a system.

### Types of abstraction layers

People sometimes say "SQL abstraction layer" or "database interface" fairly loosely, assuming everyone knows what they mean. Not so -- I've seen at least four distinct meanings in common usage:

1.  A software library to *connect to a database server* and issue queries, fetch results etc.
2.  A software library to *present a common API to different database servers*.
3.  A software library to *automatically generate portable SQL queries*.
4.  A software library to *map Object-Oriented Programming to a relational database* (Object-Relational Mapping, or ORM)

Most libraries will also provide related functionality such as escaping quotes for preventing SQL injection attacks, getting server status, controlling transactions, and so forth.

Each type of interface usually builds upon the types that precede it in my numbering scheme. Each type has different goals, which you have to understand before you can decide what criteria to use when measuring goodness or badness.

### Type 1: Libraries that provide access to a database

Libraries that connect to specific database software, issue queries, and return results are generally written at a fairly low level, and their interfaces usually map directly to the specific server software they're written for. For example, the [PHP `mysql_` functions][7] are clearly just hooks into the MySQL drivers -- without any real abstraction as a high-level programmer would think of it.

Type 1 software doesn't really have a goal, except enabling access from the programming language to the database.

### Type 2: Libraries that present a common interface to different server software

Type 2 software does much the same as Type 1, but it abstracts away the guts of Type 1 software so every database system can be accessed with the same functions. This is what Jeremy means when he says

<blockquote cite="http://jeremy.zawodny.comhttp://www.xaprb.com/blog/archives/002194.html">
  <p>
    I use a revolutionary new programming technique. Instead of littering my code with those calls, I put my core data access layer into a library&#8211;a separate piece of reusable code that I can include in various parts of my application and&#8230; reuse!
  </p>
</blockquote>

Perl's [DBI][8] is a good example of Type 2 software. What is DBI, and what are its goals? From the homepage:

<blockquote cite="http://dbi.perl.org/">
  <p>
    The DBI is the standard database interface module for Perl. It defines a set of methods, variables and conventions that provide a consistent database interface independent of the actual database being used.
  </p>
</blockquote>

In other words, you don't have to look at documentation to know "what function fetches a row from my results if I'm connected to Firebird instead of MySQL?" You learn DBI, and that's it. PHP's [PDO][9] is similar too. I think this is what Jeremy means when he talks about a "Neutral API," though his article doesn't really make that very clear.

Type 2 software's goal is presenting your code a common API for different database systems.

### Type 3: Libraries that write portable SQL

The third type of software tries to abstract away the differences in SQL dialect between different database systems. For example, in some databases, you insert a row by the following SQL:

<pre>insert into table(col, col, col) values (val, val, val)</pre>

In others, you may do this:

<pre>insert into table set col = val, col = val, col = val</pre>

Type 3 software wants to help you avoid writing SQL so you can express in your code what you want the SQL to do, and let the abstraction layer sort out how to tell the database server to do it. This is typically accomplished with a non-SQL interface, such as in PHP's [PEAR::MDB2][10] package. From the documentation:

<blockquote cite="http://pear.php.net/manual/en/package.database.mdb2.intro.php">
  <p>
    It provides a common API for all support RDBMS. The main difference to most other database abstraction packages is that <strong>MDB2 goes much further to ensure portability</strong>. Among other things MDB2 features:
  </p>
  
  <ul>
    <li>
      An <strong>OO-style query API</strong>
    </li>
  </ul>
</blockquote>

The emphasis is mine. Type 3 software writes the queries for you behind the scenes. You don't write SQL. Programmers who advocate Type 3 software consider this a Good Thing, because they believe portable SQL will prevent vendor lock-in:

<blockquote cite="http://www.sitepoint.com/forums/showpost.php?p=498687">
  <p>
    &#8230; and when they decide to use another DBMS instead of MySQL (and they undoubtedly will at some point), the conversion will be painless.
  </p>
</blockquote>

Again, Type 2 hides API differences, but Type 3 goes further and hides SQL differences as well.

Type 3 software's goal is complete SQL portability between all supported systems.

### Type 4: Object-relational mapping software

The fourth type of software maps database objects to code objects. This is called ORM (Object-Relational Mapping). The typical mapping is that a database table is a class in an object-oriented language, and a row in the table is an instance of the class. Again in Perl, [Class::DBI][11] is an example of this. The paradigm of having one object per row in the table breaks out of the relational model where operations are performed on sets, not individual rows, but it can be handy for some uses.

Type 4 software writes the SQL for CRUD operations for you behind the scenes, so in that sense it is similar to Type 3 software. It also relies on Type 2 facilities so you can treat a row as an object everywhere, whether it's in Oracle or SQL Server.

Type 4 software's goal is to enable treating database rows as objects in your code.

### What makes a good database abstraction layer?

I've shown there are at least four completely different types of "database abstraction layer," and they have very different goals. It makes sense that "goodness" should be measured by different criteria as well, right? In fact, I think there should be some criteria in common, and some will be different.

The common criteria should be -- at a minimum -- speed/efficiency, correctness, good documentation, and platform portability (by which I mean, the system should compile and run on various hardware and operating system platforms).

Beyond that, each type will have different criteria:

1.  Type 1&#8242;s criteria should be just the basics I named above.
2.  Type 2&#8242;s criteria should be an interface that presents an adequate set of functionality for every database server, in a way that is "intuitive" or "elegant," whatever that means in the given language. It should be a thin wrapper around Type 1 software. It also needs to allow invoking database-specific operations. In other words, common functionality ought to be presented in a common form, but database-specific operations should never be taken away from the programmer.
3.  Type 3&#8242;s criteria should be that the auto-generated code is truly portable among databases, and it should result in writing much less code in your application. It, like Type 2, should also allow the programmer to invoke database-specific operations when needed. Since it is designed as a high-level abstraction away from the underlying SQL, it should also be "elegant."
4.  Type 4 software should hide the fact that an object is really a row in the database. The SQL it generates to hide this should be completely database-independent. Since it, like Type 3, is a convenience for the programmer, it ought to be very "elegant," and should provide **lots** of conveniences, such as knowing when a column is a foreign key and allowing navigation between a row and its related rows in the foreign key table in an object-oriented fashion.

### My opinions

Without getting into the discussions I mentioned above, I definitely have some opinions on what's good and bad about various database access software.

First, I think Type 1 software is too low-level for most application code, as others have said. The only reason I'd use it is if I really wanted raw access to a specific database, and couldn't accept any performance overhead. In every circumstance I can think of, it would be much better from a cost, coding and maintenance standpoint to call some Type 2 software and let it re-dispatch the call (remember, I'm assuming the Type 2 software should be a very thin wrapper around Type 1).

Regarding Type 2 software, some of the systems I've seen are definitely better than others. For example, I don't really care for Perl's DBI. I know that's heresy, but I think it could have done a much better job separating some concepts out. DBI basically treats the SQL world as a collection of two types of things: connections and statements. It has no separate concept of a result set, for example. In my opinion, that makes it pretty hard to remember what you get when you invoke an operation, and where you ought to be fetching rows from. It just doesn't make sense to me to fetch rows from a statement after executing it. Executing a statement should return a result, and I should fetch rows from the result, not the statement. I think DBI is awkward to use, and that's after I've been programming with it for seven years! I *still* have to look up the documentation to figure out what I need to do, after all this time.

In fact, I think the best-designed system I've seen is the Microsoft .NET `System.Data` class library. In this library, every concept is represented separately. For example, you open a `Connection`, create a `Command` object, and when you execute the `Command`, you get back an appropriate object to do further work. For example, `Command.ExecuteReader()` returns an object from which you can fetch rows. I'm not a fan of Microsoft, as you probably know, but I find this design highly intuitive.

I generally dislike Type 3 software, and I think anyone who's ever written serious applications that require real performance from a database system will probably agree, for fairly obvious reasons. For one thing, platform-independent SQL is a myth. Easy and/or painless conversion between different database systems is, too. It does not exist in the real world. And I don't agree with those who assert it's a common requirement, or that it would be a good thing. I think porting from one system to another is generally rare, and trying to write "portable" systems when there's no clear need is going to cause nothing but problems. [YAGNI][12].

I also dislike PHP's PEAR libraries. For example, in PEAR::DB and PEAR::MDB2, you never know what type of object you're going to get back from an operation! I said above a Type 3 SQL abstraction layer should be "elegant" and should result in writing less code. The PEAR error-handling paradigm is not elegant. Just one example: every action has to be followed by an `if` statement to check for an error. *That's what error handling is for.* You shouldn't have to write `if` statements -- the software should *throw an error when there's an error!* In my opinion, using these libraries results in ugly, complex code. And remember this: error-handling code is a huge risk anyway, because it's so hard to test adequately. Anything that makes error-handling harder to do well is to be avoided.

So I dislike Type 3 software; I'm also not very excited by Type 4, though I don't have such a strong aversion to it. It can be handy at times, but it can also promote a variety of truly bad practices (as [Sheeri Kritzer wrote recently, over-using surrogate keys can be one such bad practice][13]), and sometimes betrays a programmer's partial or complete lack of understanding of relational systems -- or worse yet, unwillingness or inability to think. I've been drafting an article on ORM for six months, so I'll save my full rant for now, but ORM systems usually betray a shallow understanding of Object-Oriented Programming, too.

### Summary

This has been a longish article, but that's because these are complicated issues. I hope I've teased things into some sort of order that helps you understand how methods of database access differ, and how database access software differs accordingly. I've laid out my taxonomy of such methods, from raw access to Object-Relational Mapping systems, stated the goal of each type of system, and defined what I think are useful criteria to measure how good such a system is. Finally, I told you why I prefer Type 2 systems for most uses.

 [1]: http://www-128.ibm.com/developerworks/opensource/library/os-php-dbmistake
 [2]: http://mysqldump.azundris.com/archives/57-Annotations-to-Five-Common-PHP-database-problems.html
 [3]: http://www.mysqlperformanceblog.com/2006/08/11/database-problems-in-mysqlphp-applications/
 [4]: http://doughboy.wordpress.com/2006/08/11/mysqlphp-problems/
 [5]: http://jeremy.zawodny.comhttp://www.xaprb.com/blog/archives/002194.html
 [6]: http://www.sitepoint.com/forums/showpost.php?p=498687
 [7]: http://www.php.net/manual/en/ref.mysql.php
 [8]: http://dbi.perl.org/
 [9]: http://www.php.net/pdo
 [10]: http://pear.php.net/manual/en/package.database.mdb2.php
 [11]: http://search.cpan.org/dist/Class-DBI/lib/Class/DBI.pm
 [12]: http://c2.com/xp/YouArentGonnaNeedIt.html
 [13]: http://sheeri.com/archives/99

 *[CRUD]: Create, Retrieve, Update and Delete
