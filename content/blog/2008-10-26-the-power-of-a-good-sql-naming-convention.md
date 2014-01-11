---
title: The power of a good SQL naming convention
date: "2008-10-26"
permalink: /2008/10/26/the-power-of-a-good-sql-naming-convention/
categories:
  - Coding
tags:
  - conventions
  - orm
  - sakila
  - Testing
---
At my previous employer, one of the early decisions that had huge payoffs later was the SQL naming conventions. A good naming convention is more than just a nicety. It lets you write programs that don't need to be told about the relationships among tables and columns.

There are many ways to do this, I think. But in practice, I think I've seen only a few customer systems that have a completely consistent, logical naming convention. And there are levels of convenience; some systems have a couple extra rules that make a big difference.

In this post I'll explain the components of my ideal naming conventions.

<!--more-->

*   Consistent letter case. I prefer all lowercase for readability and type-ability. Regardless, you need the same case for both table and column names, unless your chosen programming language is case-insensitive (and if it is, you should be flogged for using it).
*   This isn't mandatory, but word separators (underscores) are pretty nice. If you run things together, you can't tell the difference between "API rate sheet" and "a pirate sheet." Yeah, that's a real example.
*   If a table has a single-column primary key, such as an auto-increment column, then that column is named the same thing as the table. For example, the `user` table's primary key is called `user`. Naming it `id` or `user_id` or anything else may be logical and consistent too, but in my experience it leads to a lot more code.
*   If a column expresses a relationship among tables, name it the same as the related table. For example, a table of blog posts should have a column called `user` which is a foreign key to the `user` table.
*   Singular. Both table and column names are singular. Plurals add a ton of complexity, and defeat the niceness of naming columns and tables the same thing. Fooling around with conversions between plural and singular (goose/geese, moose/moose, cow/cattle) is a waste of synapses and code.

### Sakila's convention

That's not a lot of rules, is it? Let's see how the [Sakila sample database][1] would fare if these rules were applied to it. Two of the core tables are `actor` and `film`, with the "acted in" relationship expressed in the `film_actor` table. The tables look like this (simplified):

<pre>CREATE TABLE actor (
  actor_id smallint unsigned NOT NULL auto_increment,
  first_name varchar(45) NOT NULL,
  last_name varchar(45) NOT NULL,
  PRIMARY KEY  (actor_id)
);

CREATE TABLE film (
  film_id smallint unsigned NOT NULL auto_increment,
  title varchar(255) NOT NULL,
  description text,
  ... other columns ...
  PRIMARY KEY(film_id)
);

CREATE TABLE film_actor (
  actor_id smallint unsigned NOT NULL,
  film_id smallint unsigned NOT NULL,
  PRIMARY KEY  (actor_id,film_id)
);
</pre>

### What's right about this

This is already a pretty nice convention. For example, tables are singular, and the columns that have the same meaning have the same name everywhere. This means you can write

<pre>select actor.first_name
from actor
   inner join film_actor using(actor_id)
   inner join film using(film_id);</pre>

The ability to use the `USING` keyword in a join is one way to test whether your naming convention makes sense. If you had gone with the "every primary key is named `id`, and foreign keys are named `[table]_id`" convention that's pretty common, you'd have to write

<pre>from actor
   inner join film_actor on <strong>actor.id = film_actor.actor_id</strong>
   inner join film on <strong>film.id = film_actor.film_id</strong>;</pre>

This is not nearly as elegant. So Sakila's naming convention is pretty nice already.

### What I'd change about Sakila

If I had designed Sakila, I'd have done this:

<pre>CREATE TABLE actor (
  <strong>actor</strong> smallint unsigned NOT NULL auto_increment,
  first_name varchar(45) NOT NULL,
  last_name varchar(45) NOT NULL,
  PRIMARY KEY  (actor)
);

CREATE TABLE film (
  <strong>film</strong> smallint unsigned NOT NULL auto_increment,
  title varchar(255) NOT NULL,
  description text,
  ... other columns ...
  PRIMARY KEY(film)
);

CREATE TABLE <strong>cast</strong> (
  <strong>actor</strong> smallint unsigned NOT NULL,
  <strong>film</strong> smallint unsigned NOT NULL,
  PRIMARY KEY  (actor, film)
);
</pre>

It's not a dramatic change in this case, and it doesn't really simplify the example queries a lot, but consider what happens when you write an <acronym title="Object-relational mapping">ORM</acronym> on top of this simplified naming convention.

As an example, suppose your database has accounts that belong to clients, each of which is managed by a single employee. Look at the following code snippet:

<pre>$acc = new Account($account_no);
$email = new Email();
$email->to($acc->client->employee->email);
$email->body("Account $acc for client $acc->client is expired");
$email->send();
</pre>

If the table and column names match, such an ORM is really easy to build. If they don't, there's more code to write.

It's hard to estimate the reduction in lines of code, tests, and mistakes, but I think it's pretty significant; some five-line programs I've written might have needed thousands of lines of code without the naming conventions, and I'm sure a lot of code would have needed supporting meta-data tables to define the mappings between different types of data.

### Summary

Here are a couple of concrete ideas. With the conventions I've shown, it's easy to write a simple recursive program that can examine your entire database for data consistency, based only on naming conventions. And you can easily write a program to dump an account and all its related data (client, employee, and so on) for such purposes as migrating a client to a new shard or [creating a dataset for a test suite][2].

There are many good ways to do this, and your favorite method probably has lots to recommend it. But after having worked with lots of such systems myself (including one company who mandated that column names had to be globally unique, which was horrible), I still haven't seen anything better than the simple conventions I've described above. It's kind of a reductionistic "let's make this absolutely as simple as possible" philosophy, and it really pays off.

 [1]: http://dev.mysql.com/doc/sakila/en/sakila.html
 [2]: http://www.xaprb.com/blog/2008/08/19/how-to-unit-test-code-that-interacts-with-a-database/
