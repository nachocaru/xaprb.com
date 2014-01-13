---
title: A fun use of SUBSTRING_INDEX and friends in MySQL
date: "2009-09-15"
permalink: /blog/2009/09/15/a-fun-use-of-substring_index-and-friends-in-mysql/
categories:
  - Databases
---
I used to develop with MySQL, and those were the golden days. These days I don't write queries so much. But yesterday I needed to answer this question: are there any issues in our issue-tracking system that meet the following criteria?

*   The last two or more emails are from the customer
*   These emails were separated by at least two hours (i.e. it wasn't a single train of thought)

I could do it with all kinds of correlated subqueries and so on -- but maybe I could also just do it without them, no? Can this be done with plain old JOINS and GROUP BY? I'm sure you know the answer.

Here's my approach: group emails by issue, and concatenate the dates they were sent in reverse order. If an email was sent from Percona to the customer, replace the date with a magical OUTBOUND constant. The result might look like this: "2009-09-11 13:17:34,OUTBOUND,&#8230;". I'll change this to create a good sample string, which I'll use from now on:

<pre>set @email_dates := '2009-09-11 13:17:34,2009-09-11 12:26:17,2009-09-11 12:10:34,OUTBOUND,2009-09-11 12:02:47';</pre>

Now I'm sure you can see the task ahead: a bunch of position calculations, nasty substrings, and so on. But MySQL has some really handy functions that make it easier to work with these kinds of string manipulations, and that's what I want to write about.

The first question to answer is how long the string of consecutive inbound emails was. We can use the `FIND_IN_SET` function for this:

<pre>SELECT FIND_IN_SET('OUTBOUND', @email_dates) -1 AS inbound;
+---------+
| inbound |
+---------+
|       3 | 
+---------+
</pre>

So the last 3 emails were inbound. But what if there were no emails, or if they were all inbound? The function will return -1 then. I could do some special-case logic to count the number of emails by counting the number of commas in the string, but that's actually the hard way. I'm already using GROUP BY to concatenate the dates into a string, so it's easier to just use COUNT(*). I'm working on a small part of the problem with a user variable, but if I put it back into the GROUP BY, the logic would be something like this:

<pre>LEAST(COUNT(*), GREATEST(0, FIND_IN_SET(.....)))</pre>

I'll handle that later, and keep working with the contents of the variable for now. Next I'll extract the first and last dates from that range. The first date is easy:

<pre>SELECT SUBSTRING_INDEX(@email_dates, ',', 1) AS most_recent_email;
+---------------------+
| most_recent_email   |
+---------------------+
| 2009-09-11 13:17:34 | 
+---------------------+
</pre>

Now to get the Nth, which usually involves a bunch of `SUBSTRING`, `REVERSE`, etc. But `SUBSTRING_INDEX` makes it easier: I'll get the substring up to the Nth index, and then get the last substring from that. I'll keep the code simple here by substituting the `FIND_IN_SET` expression with `@nth` below:

<pre>SELECT SUBSTRING_INDEX(
   SUBSTRING_INDEX(@email_dates, ',', @nth), ',', -1) AS oldest_email;
+---------------------+
| oldest_email        |
+---------------------+
| 2009-09-11 12:10:34 | 
+---------------------+
</pre>

Now it's a simple matter of using date and time math functions to compute the elapsed time between the first and last email in the consecutive incoming range. The full query looks like this (slightly altered, and using a subquery in the FROM clause, for this post):

<pre>SELECT
   email_count,
   CONCAT('Last ', 
      LEAST(email_count, GREATEST(0, FIND_IN_SET('OUTBOUND', email_dates) -1)),
      ' emails are inbound, with a ',
      TIMESTAMPDIFF(HOUR,
         SUBSTRING_INDEX(SUBSTRING_INDEX(email_dates, ',',
            LEAST(email_count,
               GREATEST(0, FIND_IN_SET('OUTBOUND', email_dates) -1))), ',', - 1),
         SUBSTRING_INDEX(email_dates, ',', 1)),
      ' hour spread'  
   ) AS emails_spread
FROM (
   SELECT COUNT(*) AS email_count,
   GROUP_CONCAT(IF(email_from LIKE '%@percona.com%', 'OUTBOUND', email_date)
      ORDER BY email_date DESC) AS email_dates
   FROM issue_emails
   GROUP BY issue_id
) AS e
+-------------+---------------------------------------------------+
| email_count | emails_spread                                     |
+-------------+---------------------------------------------------+
|         179 | Last 2 emails are inbound, with a 4 hour spread   | 
</pre>

The golden days of SQL coding live again!
