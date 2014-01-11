---
title: Why is MySQL more popular than PostgreSQL?
date: "2008-05-18"
permalink: /2008/05/18/why-is-mysql-more-popular-than-postgresql/
categories:
  - Databases
---
There is much discussion of why [MySQL][1] is more widely adopted than [PostgreSQL][2]. The discussion I've heard is mostly among the PostgreSQL community members, who believe their favorite database server is better in many ways, and are sometimes puzzled why people would choose an inferior product.

There are also many comparison charts that show one server is better than the other in some ways. These don't really seem to help people with this question, either!

I can't answer for everyone, but I can put it in the form of a question: if I were to replace MySQL with PostgreSQL, what things do I rely on that would become painful or even force a totally different strategy? The answer turns out to be fairly simple for me: replication and upgrades.

### Replication

Love it or hate it, MySQL's built-in replication is absolutely key to much of what I do with MySQL. I can truthfully say that it has lots of problems and limitations. But I can also say this about it:

*   It's included by default with the server. PostgreSQL's have historically not been included. (I think this is about to change, but I'm not sure.)
*   It is conceptually very simple. You could call that a weakness and a limitation, but you could also say that it enables a tremendous amount of flexibility. I tend to hold with the latter view. PostgreSQL's replication technologies have a very different complexity profile. That scares me.
*   It is easy to set up (it takes just a couple of commands) and is easily scriptable. This is mostly due to its simplicity. I am happy because I know it inside and out.
*   It is generally very low overhead. PostgreSQL's main replication system is built on top of triggers and is said not to scale very well. (Disclaimer: this is only what people have told me; I haven't battle-tested it. But I'm afraid of it.)
*   There is only One Way To Do It. PostgreSQL has lots of different replication systems. That in itself is a pretty significant deterrent for me.

Regardless of the technical strengths and weaknesses of each database's replication systems, it is my perception that MySQL's ultimately lets me do incredibly flexible and useful things; in general it is Just Enough and has just the right combinations of qualities for lots of purposes. And each of its weaknesses is easily avoided or worked around, or just sidestepped &#8212; because MySQL replication's simplicity and flexibility lets me easily choose a different approach.

### In-Place Upgrades

MySQL's files are extremely portable between versions, between operating systems, and even between platforms most of the time (unless you have a system that doesn't use IEEE floating-point format, but who does these days?). That means an upgrade is dead simple.

This may not seem like a big deal, but I work with a lot of data. When you do that, you have to consider the alternatives: what if I couldn't upgrade in-place?

That's the current state of PostgreSQL. You have to dump and reload your data, and when you have a terabyte of data, that's no fun. The workarounds usually involve replicating your data to another server, switching to the other server, upgrading, and switching back. But why should you have to have another server just to upgrade your data?

I see this as a significant &#8212; even critical &#8212; sticking point. It's something I just don't have to think about most of the time with MySQL

### Are PostgreSQL's other strengths enough?

Not for the systems I work on. These two problems seem extremely difficult for me to work around. I rely so heavily on MySQL's replication and in-place upgrades that it feels too daunting to live without them.

What I'm trying to do here is give some psychological insight into what makes me feel happy with MySQL, and afraid of the thought of having to solve these problems with PostgreSQL. It may or may not apply broadly; my sense is that these are concerns for others as well, but I could be wrong.

If I were primarily a PostgreSQL user, I'm sure there would be similar feelings the other direction. This would explain why some people in the PostgreSQL camp seem to recoil away from MySQL. I'd be interested to hear why that is, too.

 [1]: http://www.mysql.com/
 [2]: http://www.postgresql.org/
