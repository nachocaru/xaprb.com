---
title: Singular vs. plural table names
date: "2005-09-28"
url: /blog/2005/09/28/singular-vs-plural-table-names/
categories:
    - Databases
---
Is it better to name SQL tables with singular or plural names? In my opinion, the most important thing to do is pick one and stick to it. Programmers will always argue about singular vs. plural, and it is possible to make a valid case for both.

My strong preference is singular. The name is the table name; it is not the name of the tuples. A bag does not become a "bags" when you put apples in it. It is still a bag.

You might take this to extremes and reply,

> According to that argument, every table should be named "table," right? If you are naming the table and not the tuples, every table should have the same name. So the table should be named after the contents, and should be plural.

There is such a strong argument for either side, I don't think you can appeal to logic to solve the problem. That's why, even though I gave my reasons for preferring singular above, when I actually get into this discussion, I simply say "there are good reasons for either side, but I just *like* singular names better." That way nobody can argue with me, because they're just arguing with my taste, not facts. It's hard to argue with taste without sounding immature, but it's easy to refute facts. This is part of my devious plan to make people seem immature when they disagree with me \*heh heh\*

Of course, I *actually do like* singular better because in my opinion, it is less confusing. This is a little hard to quantify. But especially when you extend the discussion to naming views, stored procedures, indexes and primary keys which depend on the table, and whose names should be influenced by the table name, *my personal experience* is singular table names make everything clearer.
