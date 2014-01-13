---
title: GnuCash to MySQL export script
date: "2006-03-12"
permalink: /blog/2006/03/12/gnucash-to-mysql-export-script/
categories:
  - Databases
---
It's tax season, and this year I decided to export my GnuCash data into a MySQL database for analysis. This article is about that process, including source code for the export script and a couple of simple queries.

### The script

[GnuCash][1] is a powerful double-entry accounting system for managing personal and/or business finances. I've used it since about 2002, and find it adequate for my needs. However, the reporting is widely acknowledged to be one of its weakest points. Reporting is implemented in the [Scheme programming language][2], and if the included reports aren't enough, most people probably won't be able to write their own. Personally, I find it much easier (for certain reports) to write SQL queries instead. With that in mind, I set out to write a little script that will insert my GnuCash data into a MySQL database.

It's actually a fairly simple task; the GnuCash developers chose XML as the file format, so the data is easily accessible from other programs. I decided to export only the account structure and transactions, leaving alone the business features such as customers and invoices.

Before I started, though, I spent some time investigating the built-in PostgreSQL backend. The default data format is XML, but the GnuCash developers also have support for storing the data in a [PostgreSQL][3] database. Unfortunately, I couldn't get it to work. At least in version 1.8.11, it seems to be broken. In fact, the GnuCash website and developer mailing lists indicate this is a low priority for right now, as they are working towards a new version which uses an updated graphical toolkit ([GTK+][4]). Apparently the source is high-quality, but a bit out of date since the developers plan to revisit that once the new version is ready.

Satisfied that I'm not reinventing the wheel, I went ahead with a script to export the data myself. Since the XML format is really straightforward, I decided to do the simplest thing I could get to work. Perl seemed like a good choice. I am familiar with [expat][5], and Perl has an expat module, so that was also a natural choice for the XML parsing. The basic idea is to push the data through the script like drinking from a firehose, and when it detects certain things -- the start of an element, some character data, the end of an element -- call a function to handle the data. Depending on what the data is (what element I'm currently examining, etc) I either store it for later reference, or push it into the database. I also automated creating the necessary table structure in the database.

Access to a MySQL database is required. The script uses tables called account, transaction and split. The DDL used to create the tables is at the end of the Perl script file. I used InnoDB tables so I'd have transaction support.

The script requires these Perl modules: DBI, Term::ProgressBar, and XML::Parser::Expat. You can run it with the `--help` option to see how to run it.

### The queries

These queries assume precision decimal math. Versions of MySQL less than 5.0 use imprecise math. I wrote an article on [MySQL and decimal math][6]. If you have any issues with these queries, it may help to consult that article.

This query finds all unbalanced non-equity transactions by summing the splits:

<pre>select
    s.amount,
    a.name,
    t.description,
    t.posted
from account as a
    inner join (
        select transaction, sum(amount) as amount, max(account) as account
        from split
        group by transaction
        having sum(amount) &lt;&gt; 0
    ) as s on s.account = a.id
    inner join transaction as t on t.id = s.transaction
where a.type &lt;&gt; 'EQUITY'</pre>

This query sums all expenses for 2005 by month and account:

<pre>select date_format(posted, '%Y-%m') as month, name, sum(amount) as amount
from transaction as t
    inner join split as s on s.transaction = t.id
    inner join (
        select id, name from account
            where type='EXPENSE'
    ) as a on a.id = s.account
where year(posted) = 2005
group by date_format(posted, '%Y-%m'), name
order by date_format(posted, '%Y-%m'), name;</pre>

This query finds average monthly expenditures by account since January 2005:

<pre>select @num_months := count(distinct date_format(posted, '%Y-%m'))
    from transaction
    where posted &gt;= '2005-01-01';

select cast(sum(amount) / @num_months as decimal(8,2)) as 'Average monthly amount',
    concat(coalesce(grandparent_name, ''),
        if(grandparent_name is null, '', ' &gt; '),
        coalesce(parent_name, ''),
        if(parent_name is null, '', ' &gt; '),
        name) as name
from (
    select date_format(posted, '%Y-%m') as month,
        a.name,
        aa.name as parent_name,
        aaa.name as grandparent_name,
        sum(amount) as amount
    from transaction as t
        inner join split as s on s.transaction = t.id
        inner join (
            select id, name, parent from account
            where type='EXPENSE'
        ) as a on a.id = s.account
        left outer join account as aa on aa.id = a.parent
        left outer join account as aaa on aaa.id = aa.parent
    where posted &gt;= '2005-01-01'
    group by date_format(posted, '%Y-%m'), a.name
) as x
group by name
order by name;</pre>

 [1]: http://www.gnucash.org
 [2]: http://www.swiss.ai.mit.edu/projects/scheme/
 [3]: http://www.postgresql.org
 [4]: http://www.gtk.org
 [5]: http://expat.sourceforge.net
 [6]: /blog/2006/03/08/decimal-math-in-mysql/

 *[XML]: Extensible Markup Language
