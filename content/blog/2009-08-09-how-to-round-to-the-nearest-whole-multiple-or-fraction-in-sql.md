---
title: How to round to the nearest whole multiple or fraction in SQL
date: "2009-08-09"
permalink: /2009/08/09/how-to-round-to-the-nearest-whole-multiple-or-fraction-in-sql/
categories:
  - Databases
  - Programming
---
Every once in a while, I find myself needing to round a number up to the nearest even power of 10, or round a time interval to the nearest quarter of an hour, or something like that. This is actually quite simple, but for some reason I always find myself confused about how to do it. I have to reason it out all over again, instead of just remembering how to do it. Perhaps writing this blog post will help me remember next time.

The basic idea for rounding to whole multiples is to divide the number, losing precision. Then round, floor, or ceiling the resulting number, and multiply to get back to the original magnitude. For rounding to fractions, reverse the process: multiply, round and divide again.

This actually works for any programming language, not just SQL. But I find myself doing it in SQL most often.

Here's an example of how to turn a year into a decade:

    mysql> SELECT FLOOR(YEAR(NOW()) / 10) * 10 AS decade;
    +--------+
    | decade |
    +--------+
    |   2000 | 
    +--------+

There are other ways to do this, of course. In this case, since the original year is expressed in decimal notation, and we are rounding down to the nearest power of 10, we could simply take the leftmost three digits and add a zero. But that wouldn't work if we were trying to "snap" to the nearest five-year interval. The technique I showed above does:

    mysql> SELECT FLOOR(YEAR(NOW()) / 5) * 5 AS half_decade;
    +-------------+
    | half_decade |
    +-------------+
    |        2005 | 
    +-------------+

Let's suppose we want to take an arbitrary number, and round it to the nearest 1/8th. In this case, we need to divide by 1/8 and then multiply by 1/8 again to get to the nearest fraction, because dividing by eight and multiplying by eight would actually get us to the nearest even power of eight. I'll just select random numbers between zero and 100 from one of the system tables to illustrate:

    mysql> SELECT ROUND((RAND() * 100) / .125) * .125 AS nearest_eighth
         > FROM mysql.help_topic LIMIT 10;
    +----------------+
    | nearest_eighth |
    +----------------+
    |         42.875 | 
    |         27.875 | 
    |         10.875 | 
    |         70.375 | 
    |         19.625 | 
    |         86.875 | 
    |         75.750 | 
    |         17.750 | 
    |         61.500 | 
    |         54.500 | 
    +----------------+

Of course, 1/8 is an easy number to write out in decimal: .125. It would not be so easy to write out 1/14. So naturally, we can do this by using inverses.

    mysql> SELECT ROUND((RAND() * 100) * 14) / 14 AS nearest_14th
         > FROM mysql.help_topic LIMIT 10;
    +--------------+
    | nearest_14th |
    +--------------+
    |      88.0714 | 
    |      76.7857 | 
    |      19.6429 | 
    |      67.8571 | 
    |      80.2857 | 
    |      98.0714 | 
    |      49.2857 | 
    |      52.2143 | 
    |      13.3571 | 
    |      10.0000 | 
    +--------------+

I hope this was useful to you. I'm betting I'll be referring back to it myself the next time I need to round a number to the nearest fraction or whole multiple of some other number.
