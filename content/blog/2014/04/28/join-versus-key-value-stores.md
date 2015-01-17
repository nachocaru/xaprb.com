---
title: "JOIN Versus Key-Value Stores"
date: "2014-04-28"
url: /blog/2014/04/28/join-versus-key-value-stores/"
categories:
  - Databases
---

I was listening to a conversation recently and heard an experienced engineer express an interesting point of view on joins and key-value databases. I don't entirely agree with it. Here's why.

![Library Of Congress][1]

First, the opinion. If I may paraphrase, the discussion was something like this:

* With experience in building distributed systems, one learns to avoid JOIN.
* Therefore, much of the work of JOIN is done in the application instead of the database.
* Access to the database is usually reduced to simple primary-key lookups.
* Therefore, a key-value store is as good a choice as a relational database.

I'm simplifying, because the speaker actually suggested that MySQL makes a really good database for primary-key lookups as well.

The place I would differ slightly is on the last bullet point. It really depends on which key-value store you choose. The subtlety I'd suggest to consider is whether you'd like a simple key-value store that can do only simple key-value set/get operations, or whether you want something that also provides more functionality if needed. I would argue that for most use cases, there is at least occasional need for something more sophisticated, and often there's a frequent need.

The more "sophisticated" uses I'm talking about would include things such as evaluating expressions against the data, or performing operations such as `GROUP BY`. Both of these are orthogonal to use of `JOIN`. Consider how many times you've done something like the following:

```
SELECT DISTINCT status FROM posts;

SELECT author, COUNT(*), SUM(IF(status='draft'), 1, 0) FROM posts
GROUP BY author
ORDER BY COUNT(*) DESC LIMIT 50;
```

Answering such ad-hoc (or routine) questions about your data can be a lot of work if you don't have an expressive query language. It can also be very performance-intensive, requiring you to fetch potentially enormous amounts of data out of the database to be processed in-app.

This doesn't have to imply that you need a relational database. Most key-value stores provide some useful functionality. Many provide at least map-reduce to operate on sets of keys. Many treat the value as a non-opaque data structure and allow you to write arbitrary functions to operate on it in some fashion, even if it's not as terse as SQL.

Some key-value databases seem to provide a little more functionality than they really do. For example, Cassandra's CQL can lead developers to think the power of a limited form of SQL is available to them. Although they may know perfectly well that CQL is essentially a human-friendly way of specifying a set of keys, the syntactical similarity to SQL can lull smart people into acting as if they are working with a more expressive language. This could cause you to write an application as though it'll be easy to do things that, when you later need to do them and can't with CQL alone, make you kick yourself a little bit.

Of course, the way you'd want to support such a use case in a database like Cassandra is ideally to anticipate it and to store denormalized data that can answer the question quickly. Although this may seem limiting to a relational database user, it is really equivalent to creating an index, in terms of the need for foresight. Clearly, one can think of lots of ad-hoc queries against large relational tables that will not be feasible without indexes to support them. You need to do some planning either way.

To sum up: A big advantage (or foot-gun) of a relational database is that ad-hoc queries with complex expressions can be evaluated directly against the data, without moving it across the network. This is possible in some key-value stores, naturally, but not all. So I don't think it's as simple as "if you don't need joins, you aren't doing anything a key-value database can't do too." (That is, again, a paraphrase.)

[Picture Credit](https://www.flickr.com/photos/glynlowe/8494249683/)

[1]: /media/2014/04/loc.jpg
