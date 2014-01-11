---
title: A review of Pro MySQL (Kruckenberg and Pipes, Apress 2005)
date: "2007-02-10"
permalink: /2007/02/10/a-review-of-pro-mysql-kruckenberg-and-pipes-apress-2005/
categories:
  - Databases
---
Pro MySQL, by [Mike Kruckenberg][1] and [Jay Pipes][2], covers advanced MySQL topics, especially focusing on optimization and internals. I give it a solid 4 stars.

### Overview

[<img style="float:left" src="/articles/images/pro-mysql.jpg" alt="Pro MySQL book cover image" />][3] Pro MySQL covers a lot of topics you need to know, and probably will not learn about anywhere else.

The book's target audience is MySQL professionals. The authors assume significant depth of background in the subject area, and strive to put the finishing touches on your education &#8212; to take you from apprentice to journeyman, so to speak. I think they do a great job.

The writing is lucid and well-organized. It's also well-edited; apparently this book was not rushed to press as so many technical books are. It's exceptionally easy to read and understand. There are plenty of examples, but they do not interfere with the writing. Paragraphs are long enough that the pages are filled with large, solid chunks of text, without interruptions or distractions. Even footnotes are unusual. Unlike many other technical books, the page count is not inflated with endless code listings! Oh, and I don't think I saw any typos &#8212; I can't remember the last time I read a typo-free technical book.

Pro MySQL actually goes beyond "easy to read" and "well-organized." In fact, it's downright engaging. I found it so much fun to read that I put aside my wife's Christmas present (two volumes on the history of World War II, which is super-interesting) and started carrying this book with me everywhere till I finished reading it. I read it over lunch at work, in the waiting room at the doctor's office, and everywhere else I got a chance. It's that interesting.

On the downside, there are a couple of places where the book restates the official manual, and a technical blip or three. However, these are few and relatively minor.

### Organization

The book is organized in two parts. The first, "Design and Development," comprises the first 13 chapters, which I would roughly group into advanced technical topics and new features in MySQL 5.0. The second part, "Administration," covers the usual topics like installation, security and backup, but also has sections on replication and clusters.

I wanted to see how long and how many of each kind of chapter there are, so of course I threw it into a SQL table (spreadsheets are for wimps).

<table class="borders collapsed compact">
  <tr>
    <th>
      num
    </th>
    
    <th>
      title
    </th>
    
    <th>
      p
    </th>
    
    <th>
      part
    </th>
    
    <th>
      section
    </th>
    
    <th>
      len
    </th>
  </tr>
  
  <tr>
    <td>
      1
    </td>
    
    <td>
      Analyzing Business Requirements
    </td>
    
    <td>
      3
    </td>
    
    <td>
      1
    </td>
    
    <td>
      Background
    </td>
    
    <td>
      36
    </td>
  </tr>
  
  <tr>
    <td>
      2
    </td>
    
    <td>
      Index Concepts
    </td>
    
    <td>
      39
    </td>
    
    <td>
      1
    </td>
    
    <td>
      Background
    </td>
    
    <td>
      30
    </td>
  </tr>
  
  <tr>
    <td>
      3
    </td>
    
    <td>
      Transaction Processing
    </td>
    
    <td>
      69
    </td>
    
    <td>
      1
    </td>
    
    <td>
      Background
    </td>
    
    <td>
      36
    </td>
  </tr>
  
  <tr>
    <td>
      4
    </td>
    
    <td>
      MySQL System Architecture
    </td>
    
    <td>
      105
    </td>
    
    <td>
      1
    </td>
    
    <td>
      Background
    </td>
    
    <td>
      48
    </td>
  </tr>
  
  <tr>
    <td>
      5
    </td>
    
    <td>
      Storage Engines and Data Types
    </td>
    
    <td>
      153
    </td>
    
    <td>
      1
    </td>
    
    <td>
      Background
    </td>
    
    <td>
      36
    </td>
  </tr>
  
  <tr>
    <td>
      6
    </td>
    
    <td>
      Benchmarking and Profiling
    </td>
    
    <td>
      189
    </td>
    
    <td>
      1
    </td>
    
    <td>
      Background
    </td>
    
    <td>
      46
    </td>
  </tr>
  
  <tr>
    <td>
      7
    </td>
    
    <td>
      Essential SQL
    </td>
    
    <td>
      235
    </td>
    
    <td>
      1
    </td>
    
    <td>
      Background
    </td>
    
    <td>
      64
    </td>
  </tr>
  
  <tr>
    <td>
      8
    </td>
    
    <td>
      SQL Scenarios
    </td>
    
    <td>
      299
    </td>
    
    <td>
      1
    </td>
    
    <td>
      Background
    </td>
    
    <td>
      50
    </td>
  </tr>
  
  <tr>
    <td>
      9
    </td>
    
    <td>
      Stored Procedures
    </td>
    
    <td>
      349
    </td>
    
    <td>
      1
    </td>
    
    <td>
      MySQL 5
    </td>
    
    <td>
      26
    </td>
  </tr>
  
  <tr>
    <td>
      10
    </td>
    
    <td>
      Functions
    </td>
    
    <td>
      375
    </td>
    
    <td>
      1
    </td>
    
    <td>
      MySQL 5
    </td>
    
    <td>
      30
    </td>
  </tr>
  
  <tr>
    <td>
      11
    </td>
    
    <td>
      Cursors
    </td>
    
    <td>
      405
    </td>
    
    <td>
      1
    </td>
    
    <td>
      MySQL 5
    </td>
    
    <td>
      14
    </td>
  </tr>
  
  <tr>
    <td>
      12
    </td>
    
    <td>
      Views
    </td>
    
    <td>
      419
    </td>
    
    <td>
      1
    </td>
    
    <td>
      MySQL 5
    </td>
    
    <td>
      24
    </td>
  </tr>
  
  <tr>
    <td>
      13
    </td>
    
    <td>
      Triggers
    </td>
    
    <td>
      443
    </td>
    
    <td>
      1
    </td>
    
    <td>
      MySQL 5
    </td>
    
    <td>
      26
    </td>
  </tr>
  
  <tr>
    <td>
      14
    </td>
    
    <td>
      MySQL Installation and Configuration
    </td>
    
    <td>
      469
    </td>
    
    <td>
      2
    </td>
    
    <td>
      Administration
    </td>
    
    <td>
      28
    </td>
  </tr>
  
  <tr>
    <td>
      15
    </td>
    
    <td>
      User Administration
    </td>
    
    <td>
      497
    </td>
    
    <td>
      2
    </td>
    
    <td>
      Administration
    </td>
    
    <td>
      36
    </td>
  </tr>
  
  <tr>
    <td>
      16
    </td>
    
    <td>
      Security
    </td>
    
    <td>
      533
    </td>
    
    <td>
      2
    </td>
    
    <td>
      Administration
    </td>
    
    <td>
      22
    </td>
  </tr>
  
  <tr>
    <td>
      17
    </td>
    
    <td>
      Backup and Restoration
    </td>
    
    <td>
      555
    </td>
    
    <td>
      2
    </td>
    
    <td>
      Administration
    </td>
    
    <td>
      30
    </td>
  </tr>
  
  <tr>
    <td>
      18
    </td>
    
    <td>
      Replication
    </td>
    
    <td>
      585
    </td>
    
    <td>
      2
    </td>
    
    <td>
      Administration
    </td>
    
    <td>
      32
    </td>
  </tr>
  
  <tr>
    <td>
      19
    </td>
    
    <td>
      Cluster
    </td>
    
    <td>
      617
    </td>
    
    <td>
      2
    </td>
    
    <td>
      Administration
    </td>
    
    <td>
      28
    </td>
  </tr>
  
  <tr>
    <td>
      20
    </td>
    
    <td>
      Troubleshooting
    </td>
    
    <td>
      645
    </td>
    
    <td>
      2
    </td>
    
    <td>
      Administration
    </td>
    
    <td>
      24
    </td>
  </tr>
  
  <tr>
    <td>
      21
    </td>
    
    <td>
      MySQL Data Dictionary
    </td>
    
    <td>
      669
    </td>
    
    <td>
      2
    </td>
    
    <td>
      Administration
    </td>
    
    <td>
      30
    </td>
  </tr>
</table>

Note: the "section" is my own way of grouping the chapters, as I explained above. Here's a graphical view of the book's organization, using one of the techniques I learned from [SQL Hacks][4]:

<pre>select section,
   count(*) as num_chaps,
   avg(len) as avg_chap_len,
   repeat('#', sum(len)/15) as total_pages
from chapters
group by section
order by field(section, 'Background', 'MySQL 5', 'Administration');</pre>

<table class="borders collapsed compact">
  <tr>
    <th>
      section
    </th>
    
    <th>
      num_chaps
    </th>
    
    <th>
      avg_chap_len
    </th>
    
    <th>
      total_pages
    </th>
  </tr>
  
  <tr>
    <td>
      Background
    </td>
    
    <td>
      8
    </td>
    
    <td>
      43.2500
    </td>
    
    <td>
      #######################
    </td>
  </tr>
  
  <tr>
    <td>
      MySQL 5
    </td>
    
    <td>
      5
    </td>
    
    <td>
      24.0000
    </td>
    
    <td>
      ########
    </td>
  </tr>
  
  <tr>
    <td>
      Administration
    </td>
    
    <td>
      8
    </td>
    
    <td>
      28.7500
    </td>
    
    <td>
      ###############
    </td>
  </tr>
</table>

You can see they devote significant space to explaining the background and theory of using MySQL (and indeed relational databases in general), but not so much to the new features in MySQL 5. This is to be expected, as MySQL 5 was brand-new at the time.

The following sections will explore these chapters in more detail.

### Part 1

Part 1, "Design and Development," has 13 chapters that pretty much fully cover the topics a well-rounded software engineer needs to master for professional MySQL usage. There are a few weak spots, but for the most part, this material is all necessary to the book &#8212; no long, boring chapters I wanted to skip to "get to the good stuff." It's almost all "good stuff."

Chapter 1 might be considered skip-worthy, because it's about team roles, why you might choose MySQL, and so forth. However, it still deserves reading because a) it's short and b) you should be interested in what Mike and Jay have to say about it. They're people you can learn from. They also give a very good overview of many RDBMSs, not just MySQL, and the strengths and weaknesses of each. If you're trying to decide which products to consider for your business, you should read this section. It is very balanced, one of the best such I've seen.

Chapter 2 covers index concepts in significant technical detail. This is the missing link most engineers need: how indexes are built, how disks work, clustered indexes, etc. If you don't know this material, you will make bad decisions about indexes.

Chapter 3 is about transactions, both in theory and how MySQL implements them. Topics include logging, recovery, and checkpointing. Many people consider this relevant only if you're using the InnoDB storage engine, but in my opinion you're pretty likely to need InnoDB for professional applications, so if you're trying to learn what you'll need to know, you should not only read this chapter, but come back to it after you finish the rest of the book.

Chapter 4 really digs in. It takes you on a guided tour of the MySQL system architecture, with frequent looks at tastefully abridged source code (and lots of references to where you should read more on your own). The chapter moves from an overview into resource management, storage engines and handlers, caching and memory, and so forth. It finishes up by tracing the execution path of a simple query, which is invaluable insight into how things work in the server; if you've ever tried to read the source code yourself, you'll really appreciate this. MySQL is well-designed, but there's a lot of code, and it helps a lot to have someone give such a clear overview.

Chapter 5 discusses storage engines in detail, especially MyISAM and InnoDB, which is appropriate given their popularity. For these two engines, the book explains everything down to the individual bits in the record format on disk. Other storage engines get about one page each. The chapter closes with a nine-page overview of what you need to think about when choosing a storage engine.

Chapter 6 covers benchmarking and profiling. The authors claim that these skills set professionals apart, and I agree. In fact, long before I read this book I wrote a [MySQL query profiling tool][5], which as far as I know is *still* the only one of its kind (most developers seem to think it's enough to run a query and see how long it takes).
Chapter 7, "Essential SQL," is one of the most important chapters, but it isn't as uniformly good as the rest of the book. It's a bit too basic in places, and I think the authors should have assumed their readers were already trained in some of the topics they cover, such as the different types of joins. On the plus side, they open the chapter with recommendations for writing good SQL code, and I was happy to see that; this is something professionals care about, but few people advocate otherwise (the authors agree almost wholly with my own [SQL coding standards][6], which made me smile).
This chapter also repeats some material from the official manual, and contains some technical bloopers, such as an erroneous explanation of dependent subquery optimizations on page 268, which might lead some unsuspecting programmers to write a subquery that will run longer than the half-life of hydrogen. Alas.

The more advanced parts of Chapter 7 also made me think "yes, but there's more to it than that" a few times. On page 282, they show different ways to rewrite a "[find the max row][7]" type of query that aren't really equivalent in all cases, but they don't say so. Sometimes there are ways to write queries as joins when they claim it can only be done with subqueries. And on page 286, they actually give the correct answer to the situation they incorrectly analyzed on page 268. However, on the whole Chapter 7 is well worth spending a lot of time with.

Chapter 8, "SQL Scenarios," is really good. It's filled with the types of things [Peter Zaitsev][8] and I tend to write about &#8212; how to optimize so multiple indexes can be used, duplicate entries, and so forth. There's a very clear explanation of the nested set model of storing hierarchical data, the best I've read in fact. This chapter has more code listings than others, but there's still a high prose-to-code ratio, so your eyes won't glaze over.
You should spend a lot of time reading chapters 7 and 8. These are probably the two chapters you'll come back to most often, too. They're the core of the book for most readers, in my opinion.

Chapters 9 through 13 cover features new in MySQL 5: stored procedures, functions, cursors, views and triggers. As I showed above, these chapters are quite a bit shorter on average than the others. The depth of coverage is correspondingly less. The tone tends to be a bit guarded, too; I think the authors wanted to explain the new features, but since they hadn't been hammered on by the community very extensively yet, there just wasn't enough practical experience to know and cover all the nuances.

### Part 2

The second part of the book is about administration. While some of the material isn't unique to the book, it is well-written and organized, making it useful anyway. Some parts cover topics I haven't found well-presented elsewhere.

Chapter 14 is a fairly routine discussion of installation and the most basic configuration, which is at roughly the same level as Chapter 1 in the first part of the book. Chapter 15 covers user administration. The sections discuss privileges, how they work, and how to manage them from the command line and with the GUI MySQL Administrator tool (which unfortunately I have never been able to get to work for this purpose; it always hangs. Maybe I should file a bug on that). Chapter 16, "Security," is also not terribly in-depth, but again it provides full coverage of topics a professional needs to know. Ditto Chapter 17, "Backup and Restoration."

Chapter 18, "Replication," gets into the more advanced topics again. There's a lot of information about how replication really works; this can be gleaned from the manual, but it's nicely presented here. Some of it I haven't been able to find in the manual, for example, what each line in the master.info file means. Chapter 19, "Cluster," is at a similar level of depth. If you want to know whether replication or clustering will solve some specific scenario, so you know whether to look into them in more detail, these chapters will probably answer that for you. They will probably *not* be sufficient information for you to successfully set up and manage these features, though. You will need to read the manual, and in the case of NDB Cluster, you should probably buy the book from MySQL ([MySQL Clustering by Alex Davies and Harrison Fisk, MySQL Press, 2006][9]). To be fair, at the time Pro MySQL was published, I think it was the only material on Cluster in print.

Chapter 20 is about troubleshooting, and explains where you should look and what to investigate when something goes wrong. This will help with basic trouble, but the real troubleshooting guide is the whole book &#8212; if you've read the rest of the book, you already know more than you'll learn from this chapter. And finally, Chapter 21 introduces another feature new to MySQL 5.0, the INFORMATION_SCHEMA database, which is part of the SQL:2003 standard.

On the whole, Part 2 isn't the strongest part of the book, but it's definitely worth reading.

### Summary

Pro MySQL belongs on your bookshelf if your company uses MySQL. It belongs in your hands if you are responsible for MySQL at your company.

This isn't a typical 10-pound doorweight book full of "code listings" and screenshots. It does have a high page count, but for the most part it's all packed full of information, most of which you either won't find elsewhere or won't find in any one place.

The best part of the book is the excellent writing and organization. It makes it clear and engaging. It's an easy read, even when the material is highly technical and difficult to understand. Kudos to Mike and Jay for bucking the trend and writing a really good technical book!

 [1]: http://mike.kruckenberg.com/
 [2]: http://jpipes.com/index.php
 [3]: http://www.apress.com/book/bookDisplay.html?bID=433
 [4]: /blog/2007/01/02/a-review-of-oreillys-sql-hacks/
 [5]: /mysql-query-profiler/
 [6]: /blog/2006/04/26/sql-coding-standards/
 [7]: /blog/2006/12/07/how-to-select-the-firstleastmax-row-per-group-in-sql/
 [8]: http://www.mysqlperformanceblog.com/
 [9]: http://www.informit.com/bookstore/product.asp?isbn=0672328550&#038;rl=1
