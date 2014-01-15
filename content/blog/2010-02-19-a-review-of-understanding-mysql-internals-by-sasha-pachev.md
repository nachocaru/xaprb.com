---
title: A review of Understanding MySQL Internals by Sasha Pachev
date: "2010-02-19"
url: /blog/2010/02/19/a-review-of-understanding-mysql-internals-by-sasha-pachev/
categories:
  - Databases
  - Reviews
---
<div id="attachment_1629" class="wp-caption alignleft" style="width: 190px">
  <a href="http://www.amazon.com/Understanding-MySQL-Internals-Sasha-Pachev/dp/0596009577?tag=xaprb-20"><img src="/media/2010/02/understanding-mysql-internals.gif" alt="Understanding MySQL Internals" title="Understanding MySQL Internals" width="180" height="236" class="size-full wp-image-1629" /></a><p class="wp-caption-text">
    Understanding MySQL Internals
  </p>
</div>

[Understanding MySQL Internals][1]. By Sasha Pachev, O'Reilly 2007. Page count: about 227 pages. (Here's [a link to the publisher's site][2]).

I should have read this book a long time ago, and it's my loss that I didn't. Although the title makes it sound like it should only benefit those who'll be changing the MySQL server's own code, that's not true. To the contrary, at least parts of this book should be required reading for DBAs and developers who use MySQL, after they gain a moderate level of familiarity with how to use the server.

The book does indeed start off with a few chapters on the source code, how to work with it, and the core structures that make up the MySQL server at the source code level. However, even these topics hold value for users such as DBAs. If you don't know how the server really works, you are lost when you are faced with a problem or asked to understand some behavior. Peter Zaitsev refers to this as "X-Ray Vision," something a good DBA or consultant needs. I think the first few chapters of this book are a great way to develop that X-Ray Vision into MySQL.

The next couple of chapters are on the client/server API, configuration variables, and thread-based architecture. Although the first is probably not a core competency for DBAs, the others are. I sure wish I'd had the client/server protocol chapter handy when I was working with the protocol, though. It is variously more useful than, and a good supplement to, the internals document on the MySQL wiki.

The following chapters cover the storage engine interface, the server-level lock manager and how it interacts with the storage-engine locking, and the parser and optimizer. These are absolutely core knowledge for DBAs and developers in my opinion. The server/storage-engine division is one of the things that makes MySQL different from other databases, and is mandatory to understand deeply. This applies equally well to the rest of the chapters, which cover the parser, optimizer, various storage engines (as opposed to just the server's interface to them), transactions, and replication. Mandatory, every one.

What's missing? I found that the book is kind of funny in one major way. It doesn't talk much about MySQL 5.0. Instead, it delves into 4.x and 5.1. Most of the new features in 5.0 are not mentioned at all. Stored procedures, the INFORMATION_SCHEMA, triggers, and so on are absent, as are most discussions of changes to the optimizer and so forth. Some 5.0 topics are covered: index merge, for example. But by and large, there's not a lot of coverage here. The 5.1-specific topics are those such as the new storage engine API and row-based binary logging. Events are not covered, nor are changes to other types of logging. Honestly, I feel this is appropriate in a book this size; the stuff that hasn't changed since 4.x days is more important to understand.

There's little discussion of exactly how certain features work, such as the different sorting algorithms. But that's OK. These are covered pretty well by the MySQL manual, and even by my own book *High Performance MySQL 2nd Edition*. I think some other major topics might be missing, but I can't quite think of them now.

The book is really well written. I expected it to be dry but it's not at all. It's actually engaging and interesting. I also found a curious thing happening as I read: I became more aware of how much legacy cruft there is inside MySQL, and how much that has contributed to various shortcomings. This made me actually feel sad, and made me yearn for the bright pure clean exciting vision that Drizzle strives towards. But at the same time I kind of felt nostalgic, kind of fell a little more in love with MySQL, for its strengths and for the countless hours of work and the really monumental genius that it embodies, warts and all. It was quite a cognitive dissonance experience, to tell the truth!

For those who have any inclination to reading it, I'd say: do it. It'll benefit you a lot more than you think. And if possible, do it with a copy of the MySQL source code available and actually take the time to look through it and explore the things Sasha suggests. I read this book on an airplane, far from a computer, and I need to read it again and look at source code as I do so. I am positive I'll get more than twice as much benefit from this second reading than I did from the first. I say that because I have a shin-deep exposure to the MySQL source code myself, so I knew just enough about it to recognize that I really would get a lot more from going and looking at the code Sasha cross-referenced. It was a bit like speaking Spanish without a dictionary, but having had a few weeks of intensive instruction ten years ago. I remembered some things well, other things just hazily.

Overall, this book is easily a high 4 stars on a scale of 5, and again, anyone seriously using MySQL should have it.

 [1]: http://www.amazon.com/Understanding-MySQL-Internals-Sasha-Pachev/dp/0596009577?tag=xaprb-20
 [2]: http://oreilly.com/catalog/9780596009571
