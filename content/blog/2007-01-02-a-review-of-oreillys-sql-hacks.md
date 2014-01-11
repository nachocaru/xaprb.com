---
title: "A review of O'Reilly's SQL Hacks"
permalink: /2007/01/02/a-review-of-oreillys-sql-hacks/
description:
  - "I give this O'Reilly book 3 out of 5 stars for good content, but poor editing and reviewing."
---
I recently read O'Reilly's [SQL Hacks][1], by Andrew Cumming and Gordon Russell. It's an interesting and rewarding mixture of tips and tricks for novice to expert users.

### Overview

The book consists of 100 hacks, organized into 12 chapters whose topics and level roughly progress from complete novice to advanced. There are 366 pages of real content. The index is good; for example, on the topic of dates, which is one of the main things I use references for, it has dozens of entries, many pointing to the same entries but worded in a different way, which can be very helpful for such a topic.

I give it 3 out of 5 stars because there's some really good content, but there's also some that shouldn't have made it past technical reviewers, and it could have been better organized and more carefully edited.

If you approach the book as the authoritative source of expertise on how to solve every problem, you'll be disappointed (and if you don't know any better, you might be misled into some very bad solutions to particular problems). If you approach it as the opinions and suggestions of several people, who have things to teach you but are by no means the last word on any given subject, you may get a lot out of it. I did.

Incidentally, many of the hacks appear on this and other websites, but that shouldn't stop you from getting a copy.

### There's some really good content

Some of the hacks are great. For example, Hack #24, "Multiply Across a Result Set," shows you how to make up for the lack of a built-in `PRODUCT()` aggregate function with `EXP(SUM(LN(col)))`. It's simple, but I never thought of it, and now I have it tucked away for easy reference when I need it. That's worth something &#8212; I won't know how much until I need it.

There are also some great hacks about date math, which is always a bear. Having the complex math to find the second Tuesday of the month, or the last Thursday, easily at hand is great.

These and other gems make the book worth both reading through once and owning permanently. It was worth it for me to read once for the great ideas it gave me, like #24, and so I'll know whether it contains a solution to something I'm working on. It's worth owning permanently because I want to have it at hand for quick reference when I'm solving problems that are tough to memorize, and don't want to derive the solutions from first principles. Date math falls into that category.

### Reviewers were asleep at the wheel

**Update: I assumed too much below; perhaps the technical reviewers did raise concerns but were not listened to, or something else might have happened. I won't change what I wrote, so you can see my thoughts as I originally wrote them, but I want to say I've thought better of it now.**

Some of the hacks miss obvious good solutions and propose bad ones instead. Take #16, "Search for a String Across Columns." The hack is introduced with the question "does anyone have yellow anywhere in their room?" Then it advocates bludgeoning this query to death with the following blunt instrument:

<pre>select name from bedroom
where concat(floorcolor, ceilingcolor, wallcolor) like '%yellow%'</pre>

That really makes me cringe. There are many ways to do that better, most obviously:

<pre>select name from bedroom
where 'yellow' in(floorcolor, ceilingcolor, wallcolor);</pre>

The query isn't written to return results where someone's room has 'yellow-orange' or some other partial string matching. It explicitly states that concatenating, and then using a pattern matching operator, is better because it helps you avoid errors in typing. I disagree with this cost-benefit analysis; it's an ugly kludge that will completely defeat indexing on any system I know of (the book mentions that it "will not usually employ an index," which is an understatement).

It also won't work right, because it smashes values together and loses the boundaries between them, which they go on to solve (in most but not all cases, but they don't say that) with an uglier version of the same thing, instead of writing the query right.

This trick shows up again in Hack #88, which is also better solved with standard SQL. I wrote an admonition *not* to use these techniques in my employer's copy of the book. Where were the technical reviewers on these? These techniques are a DBA's nightmare, and any reviewer decently familiar with SQL should have cried foul and presented the better ways to solve the problems.

There are some syntactic issues, too. The book shows you how to run each of the examples on several different RDBMSs, which is good, but sometimes incompatibilities they mention don't really exist. For example, `CREATE TABLE SELECT` in MySQL can also accept an optional `AS`, so it can be compatible with other systems, but the authors don't say that. You also don't need to prefix literal dates with `DATE` in MySQL and SQL Server, so some of the date examples could be rewritten to run without change on more systems.

Sometimes standard good practices fall by the wayside. For example, Hack #24 uses the `!=` operator, which isn't standard SQL.

### Better editing would increase its usefulness

The book isn't very clearly organized. Sometimes topics are hidden inside other topics. For example, if you want to know how to reduce the precision of numbers and dates, you wouldn't look for it inside a hack titled "Break it Down By Range," which is about grouping data into buckets. Similarly, if I want to find out how to get the top row from each group, I'm not going to look in Hack #88, "Test Two Values from a Subquery."

There's also some repeated material. That same hack repeats Hack #83, "Find the Top n in Each Group." Perhaps it's just for the sake of having a realistic example to illustrate the hack. If that's the case, I'd change my criticism to "some of the examples are about something other than the hack and distract from its purpose."

There's too much variability in the style of the SQL examples. There is no consistent coding style, which is an even better idea in a book than in real code. Query results are sometimes shown as fancy MSWord-style tables and sometimes as MySQL-style textual bars and dashes.

Finally, many of the best hacks aren't really by the listed authors, but by Rudy Limeback. But his contributions aren't edited for style and consistency, so they feel very out of place, as though they were just copied and pasted out of an email. This is fairly jarring to read. (The astute reader will have noticed that I like even technical books to be a delight to read; perhaps you won't have the same neuroses as I).

### Summary

Don't take my criticism too strongly; the book is worth reading and then keeping, as I said. I learned a lot from it and it's among the more valuable books on SQL I have read. In fact, given that most books on SQL are just regurgitations of freely available manuals, it's a standout.

 [1]: http://www.oreilly.com/catalog/sqlhks/
