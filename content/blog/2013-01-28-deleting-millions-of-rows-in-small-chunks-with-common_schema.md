---
title: Deleting millions of rows in small chunks with common_schema
author: Baron Schwartz
layout: post
permalink: /2013/01/28/deleting-millions-of-rows-in-small-chunks-with-common_schema/
categories:
  - SQL
---
I wrote pt-archiver for jobs like deleting or archiving rows from a big table in small chunks. These days, that&#8217;s the kind of task I like doing inside the database, and Shlomi&#8217;s magical [common_schema][1] feels a lot more suited for this than an external Perl script.

When I say it&#8217;s magical, it really does feel magical. It&#8217;s amazing how he&#8217;s created an entire expressive scripting language that runs in MySQL and feels just right for the job.

Right now I&#8217;m watching this kind of stuff scroll by in my terminal:

    +---------------------+
    | rows_deleted_so_far |
    +---------------------+
    |             2871119 |
    +---------------------+
    1 row in set (7 min 42.67 sec)
    
    +---------------------+
    | rows_deleted_so_far |
    +---------------------+
    |             2872119 |
    +---------------------+
    1 row in set (7 min 42.75 sec)

Notice that the execution time is steadily increasing. Each chunk of 50,000 rows takes a small amount of time to delete, but the time shown is since the beginning of the job&#8217;s execution.

 [1]: http://code.google.com/p/common-schema/