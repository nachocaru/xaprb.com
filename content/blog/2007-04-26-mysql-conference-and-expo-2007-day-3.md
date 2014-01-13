---
title: MySQL Conference and Expo 2007, Day 3
date: "2007-04-26"
permalink: /blog/2007/04/26/mysql-conference-and-expo-2007-day-3/
categories:
  - Databases
---
[<img style="float:right; margin-left: 15px" src="http://conferences.oreillynet.com/images/mysqluc2007/banners/speakers/120x240.jpg" width="120" height="240" alt="Speaker at MySQLConf 2007" />][1] 
In my third day at the [MySQL Conference and Expo 2007][1], I again attended keynotes and sessions, one of which I participated in. This evening I had dinner with a fellow community member and arrived late to the Quiz Show, even though I was supposed to be on one of the teams! I blame it on the restaurant, because they took too long to figure out what I meant when I said "kÃ¶nnen wir einen Hubschrauber essen heute abend?"

Today I attended by a decent margin the best sessions I've been at all week. If you don't think they're saving the best for last, come to my [tutorial and demo on monitoring MySQL and InnoDB with innotop][2] tomorrow and see!

Just two quick notes: I am recording the sessions I attend on my iRiver when possible, and will post the audio for download after I get home. Also, you can click on the headings of each of the talks; I have linked them to the session description.

### Keynotes

There were again three keynotes this morning. Eben Moglen delivered a fantastic, thought-provoking speech with which I mostly agreed. I was working on [innotop][3] during the others, though I was in the room.

Lunch was&#8230; I forgot to write it down. A salad and mixed vegetables, a roll, tomatoes that I had to cut. I don't know. I was trying to meet some folks in the exhibit hall and it's all a blur now.

### [NitroEDB for MySQL Storage Engine][4]

This session was mostly a demo and/or sales pitch by three engineers from NitroSecurity. The technology seems well-done, but as far as I can tell the storage engine is not going to be GPL'ed. Too bad they're missing a big opportunity. On the plus side, they did write some software to ease integration with the storage engine API, and that's GPL'ed (probably because it has to be, since I guess it's going to be linked with MySQL).

### [The Declarative Power of Views][5]

This session was amazing! It was standing-room-only. Beat Vontobel started out with the classic "animals" guessing game, except it was a series of questions to figure out which programming language you were thinking of. The demo was live, running on his own server on another continent. You simply select from the questions table, and it asks you one question, which is just a single column of text. You insert your answer into the answers table, which is a single yes/no enum column. Then you select from the questions table again&#8230; and there's a different question now. As you continue, it narrows down the choices and eventually guesses what you're thinking of.

Behind the scenes, even though all you can see is the questions and answers, is a series of views. No procedures, triggers, or functions.

The idea? **SQL is a declarative language, and can -- and should -- be used as a logic language, much like Prolog or Lisp. And the basic building block of the language is the view**, which expresses a predicate. I would have said it's a functional language, and the SELECT statement is the way to express a predicate; a view is an abstraction over the SELECT. But I'm not going to argue with such eloquence.

(And for those of you who saw me raise my hand to the "do you program in Lisp" question, no, it's not because I'm an Emacs user. I'm not, I'm a Vim user. I use Lisp for artificial intelligence and expert systems).

As if his demo had not made the point forcefully, Beat then proceeded to show us Prolog and SQL code for "who is a sibling of who," side by side. The parallel is obvious. It was tremendously impressive. If you weren't there, *download the slides and read them.*

### [Transaction Processing and Durability with solidDB for MySQL][6]

This session was a very technical discussion of **how isolation, Multi-Versioning Concurrency Control, durability and locking work in solidDB**. The engine implements both pessimistic and optimistic locking models on a per-table basis, though the terms "pessimistic" and "optimistic" are somewhat misnomers, as is "locking." It has more to do with record version numbers than locks, as I understand it. Durability (the D in ACID) can also be set to relaxed or strict, at the session level. These features, and the discussion around them, brought the compromises of speed, concurrency, storage, and durability into stark clarity. I'm impressed by solidDB's range of choices for the DBA. Of course they are also going to support some notion of compatibility with InnoDB's behavior.

Interestingly, you can mix pessimistically and optimistically locked tables in a single transaction, and the behavior is not upgraded or downgraded -- you get pessimistic behavior on one table and optimistic on the other.

I have not yet learned how solidDB will be licensed.

### [MySQL Server Roadmap][7]

This session was packed. Robin Schumacher took the first part of it, showing **what's planned for the entire MySQL product line** over the next year or so. It was a talk calculated to make the audience spend the next year squirming in anticipation. *Oooh, finally I'll get enhanced replication monitoring, and subqueries will get decently optimized, and&#8230;!!!!*

Robin is a confident, eloquent speaker. The kind of person whom I imagine promises things that make the developers in the audience cringe slightly. "Replication conflict detection! Next slide."

He gave a demo of the upcoming online backup of a large table while selecting from the table in another session, but amusingly didn't seem to notice that the SELECT queries in the other window were failing with syntax errors. (Never mind, though&#8230; you can do the demo yourself if you want; he included the code you'll need on a recent article. Robin, if you're reading this: if you noticed the statements failing, you are one cool customer to continue without missing a beat!)

He followed this with a quick mention of storage engine partners and then proceeded to pitch MySQL Enterprise and MySQL Workbench. Afterwards he finished up with a quote that went something like this: "Backup is coming. It's real. It's working." ;-) Seriously, I believe him.

Jeffrey Pugh took the microphone at this point. He showed us a timeline of MySQL history and features, where we are today, and again what's planned. Interestingly, he made a public admission of 5.0 being released before being ready, and said this mistake will not be repeated -- but apparently sometime in the last week or so MySQL has decided to skip directly from version 5.1, omitting 5.2 and going right to 6.0. Is this version number inflation? It seems like it. Here are some semi-quotes: "We don't want bugs in 6.0. We don't want to repeat 5.0." So, how about not jumping into it? Give it some breathing room.

Someone asked if MySQL will include other programming languages like a JVM embedded, and Robin and Jeffrey made soothing noises into the microphone. My reaction, in case anyone's listening is *for the love of all that's good and pure keep those things the heck away from MySQL.* Please! It is and should be a RDBMS, or at least tries to be and ought to keep trying to. If you embed these things in it, next thing you know it'll be like Microsoft SQL Server where you can run a fricking web service from a stored procedure.

And of course, there was a discussion about the perpetual topic: what is the difference between Community and Enterprise? I was surprised to hear Robin and Jeffrey correcting each other on this!

All in all, a lively session. Nothing is boring around here.

### [Lightning Rounds with Top MySQL Community Contributors][8]

I got talking to an engineer, who shall not be named, from a Big Company we all know and love (but which shall not be named) in the hall. Thus I arrived late to the session in which I was supposed to participate. Fortunately, I was not listed first. It was a series of community contributors giving lightning-fast (well, sometimes) talks about **our experiences as community members**. While I sat listening, something strange happened; I began to think in a different way than I had prepared to speak. Thus when it was my turn, I ignored my slides and spoke extemporaneously. I suppose this is a good thing; one is not supposed to read one's slides.

### [Query Optimizer Internals and What's New in the MySQL 5.2 Optimizer][9]

Holy cow was this a great session. This was the most riveting thing I've seen all week. You could really tell who was into this kind of geekiness, because there weren't that many people in the room. I even tried to record the question and answer session during the intermission as we all crowded around Timour Katchaouno at the lectern.

This session went deep into **how the optimizer really works**. Topics included how it is similar to and different from other database systems (most of them actually generate machine code; MySQL does not), what it does and why, and what's coming in the next versions. And for the first time I really understand why MySQL's core developers think the output of EXPLAIN is somehow understandable to an ordinary mortal (by the way, I have been planning for a while to reverse translate EXPLAIN into a tree view for the rest of us. I'll get to it, really).

Timour explained MySQL's cost-based query optimization, which is built on "units of disk access." He showed its evolution from pre-5.0 where it was an exhaustive search of all possible execution plans, which is O(n!) and didn't perform well on more than a handful of tables in in a join. I never had this happen to me, but apparently you could quite easily write queries that would take hours, days, weeks just to generate a query plan -- and that's before you even started to execute! These days you can join up to 62 tables, and the algorithm uses exhaustive left-deep search up until a threshold (currently 7 tables), after which it becomes greedy and can choose a non-optimal plan. At least it'll terminate, though.

I have good news for the query optimization team, though: my brother has solved the Travelling Salesperson problem, which is N-P complete of course. Obviously left-deep search can be transformed into this; so this problem is solved as well. I'm sure it will only be a matter of time before the patents go through, so who's the highest bidder for the best query optimizer on the planet? Anyone?

This talk brought up a bunch of questions, which I need to follow up on. I'll report more in a future article.

What fun! I haven't been this excited since my days at University, scribbling notes as I struggled to understand my teacher's thick accent and predilection for thinking of everything in terms of real-time databases, sigmas, and so on.

### Dinner

I went with Martin Friebe for supper at a Thai restaurant. On the way there we got talking about table checksum algorithms to detect when a slave is or isn't in sync with its master. Martin had some great ideas, which I will implement into [MySQL Table Checksum][10] to provide another way for you to guarantee two tables have the same data. This particular method will have lower impact on the servers (no locking) and guarantee a consistent read at exactly the same point in the binlog. It will be very useful in certain circumstances. Thank you Martin for the company and the great conversation!

### Quiz Show

I stumped the judges and picked up a spare copy of *Programming Perl*. You can never have enough, eh?

Okay, I didn't really stump the judges; someone asked a question nobody knew the answer to, and I proposed an answer nobody could refute. Let's see, what does the NDB option [ndb\_report\_thresh\_binlog\_epoch_slip][11] mean? Is it really the amount of clock skew NDB will permit between the data nodes?

<blockquote cite="http://dev.mysql.com/doc/connector/j/en/server-system-variables.html#optvar_ndb_report_thresh_binlog_epoch_slip">
  <p>
    This is a threshold on the number of epochs to be behind before reporting binlog status. For example, a value of 3 (the default) means that if the difference between which epoch has been received from the storage nodes and which epoch has been applied to the binlog is 3 or more, a status message will be sent to the cluster log.
  </p>
</blockquote>

Nope. But I got the book anyway.

### Next

Well, I'm fairly slap-happy at this point with jet lag and lack of sleep, but I still want to make a plug for my [innotop][3] session tomorrow at 10:45 in Ballroom C. Even if you don't use InnoDB, you will find this tool has something to offer you. And my presentation and demo is going to be fun, with gratuitous use of stock images. Come on out.

And by the way, I just spoke to someone from another Large Company We All Know, who asked me to implement a new feature in innotop. As Monty is famous for saying, "Trivial. It's trivial." If you want to see it, be there; I'll have it done in time for the session.

Now if you'll excuse me, I have to fire up Vim&#8230;

 [1]: http://www.mysqlconf.com/
 [2]: http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/13213
 [3]: http://code.google.com/p/innotop
 [4]: http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/14304
 [5]: http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/10931
 [6]: http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/13949
 [7]: http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/12492
 [8]: http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/12911
 [9]: http://www.mysqlconf.com/cs/mysqluc2007/view/e_sess/12541
 [10]: http://code.google.com/p/maatkit
 [11]: http://dev.mysql.com/doc/connector/j/en/server-system-variables.html#optvar_ndb_report_thresh_binlog_epoch_slip
