---
title: "MySQL falls with the decline of PHP"
date: "2014-02-26"
url: /blog/2014/02/26/mysql-fall-decline-php/
categories:
  - Databases
---
Sometimes people's perspective can be so interesting. I mean this with
absolutely no irony. Josh Berkus wrote recently in a post about upcoming [JSON
improvements in PostgreSQL 9.4][1]:

> MySQL largely rose on the success of PHP, and it fell as PHP became
> marginalized.

This is an aside in the blog post, off-topic. But it's
interesting to discuss because it reveals the completely different things people
see when they look at something. It's like the proverbial story about the blind
men describing an elephant. We have such a variety of perceptions.

![Elephant][3]

This post, by the way, is not yet another flame war about MySQL versus
PostgreSQL. To the contrary, it is very important for MySQL users and
community members to understand that there are other communities who do not
share the same assumptions, values, and beliefs at all. In my experience, many
arguments about things like MySQL versus PostgreSQL result from people (or
groups of people) holding such differences but being unaware of them, and
therefore misinterpreting words and actions from a group who doesn't share the
same worldview, believing them to be dishonest, irrational, or hostile.

Looking at Josh's statements again, we can see two assertions that are just
calmly stated as though everyone knows these things, they're true, it's stating
the obvious:

* MySQL rose on the success of PHP.
* MySQL is falling / has fallen from that success.

I've been Josh Berkus's roommate. I consider him a friend and I am not
antagonizing him. But who among the readers on Planet MySQL would agree with
those statements? In the MySQL world, we would hold these completely different
"truths" to be self-evident instead:

* MySQL rose on the success of Web 2.0, backlash against Oracle, and the
  cheapness of commodity x86 hardware. It was a classic disruptive innovation.
  It won because there wasn't another relatively simple, cheap database server
  with built-in replication.
* MySQL has not fallen; in fact its adoption has moved into enterprise and
  accelerated.

(Heads are nodding, I'm sure.) Which worldview is right?

Probably both are. From the MySQL point of view, many people see things as I
described. But if you're in the PostgreSQL world, you've seen an
explosion in popularity. Many of the new users tell you they've come from Oracle
or other proprietary databases, so regardless of what those MySQL folks believe,
obviously it is PostgreSQL that's winning in the enterprise. Besides, clearly
MySQL must be on its way out, because you hear stories every week from another
company who's switched from MySQL to PostgreSQL for a variety of reasons:
superior technology, getting away from Oracle, avoiding restrictive licensing.

But we don't see things that way in the MySQL community, do we?

I won't claim to be the single most enlightened person about these two
communities, but I've spent a lot of time in both. Funnily, at times PostgreSQL
folks were convinced I was crossing the aisle. My point is I get kaleidoscope
vision sometimes from seeing both perspectives.

Someone smarter than me can probably search through [Wikipedia's list of
biases][2] and maybe point out which of them is at play here.

What do I believe? I think we all have so much more in common than we're aware
of. I think we encounter substantially the same problems, solve them with
the same solutions, and experience both success and failure in similar ways. I
think we can learn much more from each other than we'd guess. And I think many
of our beliefs about each other are simultaneously right and wrong -- the truth
is much more nuanced and depends a lot more on perspective than on facts.

[Photo credit](http://www.flickr.com/photos/haniamir/1455076844/)

[1]: http://www.databasesoup.com/2014/02/why-hstore2jsonb-is-most-important.html
[2]: http://en.wikipedia.org/wiki/List_of_cognitive_biases
[3]: /media/2014/02/kaleidoscope.jpg
