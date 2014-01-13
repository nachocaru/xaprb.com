---
title: More GnuCash to MySQL tools and queries
date: "2006-11-29"
permalink: /2006/11/29/more-gnucash-to-mysql-tools-and-queries/
categories:
  - Databases
---

I wrote a while ago about a program I wrote to [export GnuCash data into a MySQL database][1], including a couple of queries against the resulting schema. I've made some improvements since then to allow a simple overlay of my wife's categories onto the GnuCash hierarchy. This article explains the improved schema, and includes some more useful tools and queries.

### The improved schema

The heart of the schema that holds the GnuCash data remains the same, but I've added a table to overlay our categorization system onto it. The fundamental issue is the old multiple-hierarchy problem: some transactions should live in different places in the GnuCash account hierarchy than they belong in our expense summary. To remedy this, I just created a table to define our own categories. The resulting system is very simple, and defines a single level of hierarchy, where everything is at the top level; there are no nested categories (though you can simulate nested categories with a naming convention, such as "Auto:Repair").

This system is about as simple as possible. Here's the query to create the new table:

<pre>create table account_category (
   account char(31) not null primary key,
   category char(20)
) ENGINE=InnoDB;</pre>

It would be more normalized to place this data in the `account` table itself, but that makes it too easy to wipe out your category data when you recreate the schema. For that reason I decided to separate the account and its category.

### Category setup

There's a required initial setup before this is usable, of course: you have to define the categories and associate accounts with them. To ease this step, you should go through your GnuCash file and check the "placeholder" properties checkbox for any accounts you know only exist to hold other accounts. This way you won't have to worry about assigning them to categories. If you do this, you should run `gnucash2mysql` to re-create the schema and re-import the data.

Next, run the included `setup-categories.pl` script. It will ask you to enter a category name for each unassigned account. It prints the account hierarchy so you can easily tell what the account is. If you want to leave an account un-categorized, just press Enter and it'll be skipped.

The categorization requires that you understand the double-entry accounting principles on which GnuCash is built. The updated queries I've included in the download will include transaction splits that transfer money both **into and out of** a GnuCash account, so think about that as you assign the categories. For example, our GnuCash account "Bills:Groceries" is associated with "Groceries." When there is a transaction involving "Bills:Groceries," the money has to come from somewhere -- our checking account, for example. We don't want to include the checking account in any categories, or that money will get counted twice -- once as it leaves the checking account, once as it enters the "Bills::Groceries" expense account. This is the fundamental simplification I made to create a non-double-entry report of what we spend. On the other hand, maybe you want to do it differently. Suit yourself :-)

### When you're done

When you're done associating categories with accounts, you will find new queries in the package for your enjoyment.

### Miscellaneous improvements

In the time since I first wrote this program I've realized the benefits of using Perl libraries that are already installed on most systems. I've gotten rid of the dependencies on non-standard libraries in the new versions. That change should make the scripts easier to install and use. The scripts also read your .my.cnf file if it exists, so you don't have to specify MySQL options.

At the end of the day, these little scripts and queries are about having more than one way to do things. I hope you find them useful.

 [1]: http://www.xaprb.com/blog/2006/03/12/gnucash-to-mysql-export-script/
