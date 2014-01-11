---
title: How to unit-test code that interacts with a database
author: Baron Schwartz
layout: post
permalink: /2008/08/19/how-to-unit-test-code-that-interacts-with-a-database/
description:
  - How to unit test a database
categories:
  - Coding
  - SQL
tags:
  - MySQL
  - Test Driven Development
  - testing a database
  - The Rimm Kaufman Group
  - unit testing
---
I got some interesting comments on my previous article about [unit testing Maatkit][1], including echoes of my own conversion to the unit-testing religion. One of the objections I've heard a lot about unit-testing is how it's impossible to test code that talks to a database. "It's too hard," they say. "Oh, it's easy to test a module that calculates a square root, but a database? Way too much work!"

<!--more-->

**Note:** As commenters have pointed out, I'm not necessarily using "unit" in the agreed-upon way here. Everything I say can be applied to ultra-pure unit testing too, but I go beyond that. I will hold fast to my assertions about mocking though \*grin\*

### Is it really impossible or even hard?

I disagree. In one of my previous articles I said [The Rimm-Kaufman Group][2], my previous employer, has a comprehensive unit-test suite. When I say comprehensive I mean it: database interaction is fully tested, too. I know because I was heavily involved in building it. Even extremely complex things like big reports that are generated from lots of data are tested. And believe me, sharding the databases would have been much harder without complete code coverage. It's really not that complicated to unit-test against a database, and it's so worth it. Here are some hints about how you can do this.

There are many ways to do it, but I'll just describe the basics of the system I helped build. There are several moving parts to the test suite ("[smoke][3]"), but one of them sets a magical environment variable. And then, all code that connects to a database server magically gets back a different database connection from the create\_me\_a_connection() function. This is because there is a database connection abstraction library that respects the environment variable. It's really pretty simple for the most part; instead of doing DBI->connect(&#8230;) you just call this function, which is a thin wrapper that hands back a connection object.

This wrapper is itself unit-tested thoroughly, too. This ensures that when some code is being run from a test, it cannot (I mean cannot!) connect to a production database, and vice versa. There are some conventions about production and test servers that make sure the abstraction library can tell for sure. If there's any confusion, of course, it will die in a non-recoverable way. Safety first.

### Building a good development environment

Just as each developer has their own copy of the code from version control, each developer has their own private database server running on the dev machine. There are some simple conventions that make this possible: Unix user ID plus a constant for the port number, etc. It's really quite easy. The private database server is a slightly modified version of [Giuseppe Maxia's MySQL Sandbox tool][4]. It can be torn down and set up afresh as desired. It is wiped clean and re-filled at the start of every test, with a small, tightly focused dataset carefully chosen to represent the conditions the code is supposed to work with. (Each test has its own dataset).

If this sounds like a system that can't work on a large scale, well, it does. That's the secret sauce that I won't reveal in this post. (It's my past employer after all, and I can't go revealing everything about them can I?) You just have to be smart about it. When a database is central to your business, you either figure out how to get this right, or you pay the consequences in lost time and poor code quality.

I and the other developers there (another secret: it's a small team; [small teams build great things][5]) built several quick utilities to help develop unit tests against a database. There are utilities to get a minimal necessary dataset for testing and dump it into a file that can be loaded by the test. There are utilities that can migrate schemas and update the tests to match the schema changes. And so on, and so on. This is possible because of careful planning for testability, and really smart things like super-consistent and sensible naming conventions for database objects. (Ruby On Rails owes a lot of its success to simple things like this, too. Conventions are really powerful.) Maybe I'll write about the database naming conventions some other time &#8212; I have to credit Alan Rimm-Kaufman a lot for designing those conventions. It was a stroke of genius.

### Things to avoid

There are several things I *do not* recommend doing when you unit-test code that talks to a database. I'll just mention a couple:<ul 

*   Don't [mock][6] anything! In general I think mocking is the devil. Most of the mock objects I've ever seen reflected a propensity to [test an implementation instead of a behavior][7], which is also the devil. Write all your code to test a test instance of something real, and do not mock up a database to test against. It is a rabbit-hole that you will not emerge from easily.
*   Never let a test connect to a production database. Never, ever. Worlds of hurt will follow. Not only are you risking your production data, but what about the risk to your code? You're testing against things that will almost certainly change and break your tests; and you're possibly polluting your live data with testing data and/or changing live data from the tests.
*   I also recommend developing unit tests for your current database functionality if you're thinking about changing it much. [Don't like MySQL's lax error handling? Plan to set the SQL_MODE to something stricter?][8] Dive into that database abstraction library and make your tests run in strict mode first by setting SQL_MODE on every new connection that's created when running inside a test; fix all the breakage in the test suite; feel sure that your code isn't going to break in production. That was easy!</ul> 
### Summary

Once your creative juices get flowing, you'll see tons of places your unit test suite can help you out.

If you're in the Oracle or SQL Server world, or any other world where you can't just set up and discard database instances at will due to licensing problems, you're going to have to be a little more inventive. But you can still do it. (Don't you wish you'd chosen [Freedom][9]?) And unit tests are just as beneficial for apps based on Oracle as they are for MySQL.

Have fun! Go forth and test some more!

 [1]: http://www.xaprb.com/blog/2008/08/18/how-maatkit-benefits-from-test-driven-development/
 [2]: http://www.rimmkaufman.com/rkgblog/
 [3]: http://c2.com/cgi/wiki?SmokeTest
 [4]: https://launchpad.net/mysql-sandbox
 [5]: http://www.craigslist.org/
 [6]: http://c2.com/cgi/wiki?MockObject
 [7]: http://www.xaprb.com/blog/2006/05/16/how-to-refactor-without-rewriting-unit-tests/
 [8]: http://dev.mysql.com/doc/en/server-sql-mode.html
 [9]: http://www.fsf.org/
