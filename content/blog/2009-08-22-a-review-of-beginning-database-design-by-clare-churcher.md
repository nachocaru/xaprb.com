---
title: A Review of Beginning Database Design by Clare Churcher
author: Baron Schwartz
layout: post
permalink: /2009/08/22/a-review-of-beginning-database-design-by-clare-churcher/
categories:
  - PostgreSQL
  - Review
  - SQL
---
<div id="attachment_1235" class="wp-caption alignleft" style="width: 135px">
  <a href="http://www.amazon.com/gp/product/1590597699/?tag=xaprb-20"><img src="http://www.xaprb.com/blog/wp-content/uploads/2009/08/beginning_database_design.gif" alt="Beginning Database Design: From Novice to Professional" title="Beginning Database Design: From Novice to Professional" width="125" height="164" class="size-full wp-image-1235" /></a><p class="wp-caption-text">
    Beginning Database Design: From Novice to Professional
  </p>
</div>

[Beginning Database Design: From Novice to Professional][1]. By Clare Churcher, Apress, 2007. Page count: 230 pages. (Here's [a link to the publisher's site][2].)

My wife bought a copy of this book, and recently I took it off her bookshelf to give it a read myself.

I found the book very lucid and readable. The author does not drag us through a bunch of formalisms, nor does she attempt to force the book to be readable through the use of comics, pop-culture references, or other artificial devices. Instead, she draws on her real-life experience helping people design databases, and presents several examples that nearly anyone will understand without effort. She doesn't rely on hard-to-understand examples such as an employee-supervisor database, which is badly overused and really not that clear anyway in my opinion.

The book begins with a guided tour of the development process, laying the foundation for understanding relational database design and approaching some topics such as initial requirements and use cases. It doesn't spend long here, before moving on to understanding and developing a data model based on reality. Along the way, the author tackles many topics such as relationships, techniques for spotting areas where there might be ambiguities, how to explore those further and arrive at hidden requirements, and so forth.

The examples strike me as just realistic enough, just complicated enough, and just simple enough to be understandable to everyone. For example one, of the sample projects is about delivering takeout meals. Another is about sports teams. Others include taking samples of insect populations on farms. I think these examples really serve well to explain problems such as many to-many-relationships.

This book is one of the few in which I have seen chapter summaries used well. Most authors simply do not know how to summarize their own work and distill it into something that the reader will actually be able to use as a reference. This author certainly does. Her summaries are very clear and concise. They do not begin with "in this chapter, we covered&#8230;"

The book trends towards object oriented design, which is probably a good thing, considering that this model seems most suited for representing real-world concepts with which non-technical people might be familiar. However, the book does not get into elaborate explanations of UML or object notation. It explains the bare necessities of object-oriented concepts &#8212; inheritance, association, attributes, and relationships. The author also warns people away from overusing things that novices tend to rely on too much (inheritance!). I can only agree, having seen people go through this process myself.

About halfway through the book, we enter the realm of a relational schema. Up until this point in the book, everything has been about representing real-world data in the simplest and most logical model possible. Now the book shows how to go from that model to relational schema. Each of the major concepts introduced earlier in the book is explained in terms of databases, but without being tied to any particular database. The summary in this chapter is particularly useful.

The next chapter is about normalization. Again, I appreciate how she gracefully sidesteps the tired old explanations of this topic, which always seem to be copied and pasted from one book to the next. She covers functional dependencies, first normal form, second normal form, third normal form, and more advanced normal forms. Including the summary, this chapter is less than 20 pages long, and it contains everything that it needs to, in my opinion.

Chapter 9 explains a little bit more about the intricacies of keys and constraints. This is one of the topics where I think other books really fall short. They either gloss over or skip this topic, or they approach it too formally.

After this, there is a brief introduction to how to write queries, which straddles the divide between relational and everyday terminology. Next up is a chapter on user interfaces, followed by a brief look at other ways to represent the data model, such as object-oriented databases. Personally, I feel that this section adds less value to the book, because 99% of people are going to be using relational databases. However, there is a very nice section on using Excel spreadsheets, which is probably even more useful than databases for a lot of people. It is certainly less often covered in the literature elsewhere.

There is a concluding chapter, which is only four pages long. All in all, the real content in this book is about 230 highly readable pages. I think this book hits the sweet spot for people who understand a particular problem domain very well, but don't understand the technobabble that most of programmers subject them to. It should be extremely useful for professionals who have learned how to model things in Excel spreadsheets or in databases such as FileMaker. My guess is that it will help people to organize their thoughts and really understand things that they have only intuited. For those who don't understand data modeling at all, the learning curve will probably be steeper, but I think this book holds up well as an intensive study guide.

 [1]: http://www.amazon.com/gp/product/1590597699/?tag=xaprb-20
 [2]: http://www.apress.com/book/view/9781590597699
